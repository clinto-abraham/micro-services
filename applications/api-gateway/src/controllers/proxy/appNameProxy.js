'use strict';

const axios = require('axios');

const APP_CONFIG_CACHE_TTL = 300; // 5 minutes
const CACHE_KEY_PREFIX = 'app_config:';

function stripTrailingSlash(s) {
  return (s || '').replace(/\/$/, '');
}

function getRedis() {
  try {
    return require('../../storage/redis')();
  } catch {
    return null;
  }
}

async function getAppConfig(appName) {
  const redis = getRedis();
  const cacheKey = `${CACHE_KEY_PREFIX}${appName}`;

  if (redis) {
    try {
      const raw = await redis.get(cacheKey);
      if (raw) {
        const cfg = JSON.parse(raw);
        if (cfg && typeof cfg.connectedBackendPort === 'number') return cfg;
      }
    } catch {
      // ignore cache errors, fall back to SQL
    }
  }

  const sqlBase = stripTrailingSlash(process.env.SQL_MICROSERVICE_URL);
  if (!sqlBase) {
    throw new Error('SQL_MICROSERVICE_URL not configured on gateway');
  }

  const lookupUrl = `${sqlBase}/internal/app-configs/${encodeURIComponent(appName)}`;
  const lookup = await axios.get(lookupUrl, {
    headers: {
      'x-internal-secret': process.env.INTERNAL_SERVICE_SECRET,
    },
    timeout: 4444,
  });

  const cfg = lookup.data?.data;
  if (redis && cfg) {
    try {
      await redis.setex(cacheKey, APP_CONFIG_CACHE_TTL, JSON.stringify(cfg));
    } catch {
      // ignore
    }
  }

  return cfg;
}

module.exports = function appNameProxy() {
  return async function proxyHandler(req, res) {
    try {
      const appName = req.headers['x-app-name'];
      if (!appName) {
        return res.status(400).json({
          success: false,
          message: 'Missing X-App-Name header',
        });
      }

      const cfg = await getAppConfig(appName);
      const port = cfg?.connectedBackendPort;
      if (!port) {
        return res.status(502).json({
          success: false,
          message: 'Invalid app config response from sql-service',
        });
      }

      const target = `http://127.0.0.1:${port}`;
      const url = `${target}${req.originalUrl}`; // keep /api prefix for backend contracts

      const response = await axios({
        method: req.method,
        url,
        headers: {
          Authorization: req.headers.authorization,
          'x-request-id': req.context?.requestId,
          'Content-Type': 'application/json',
        },
        data: req.body,
        timeout: 8000,
      });

      return res.status(response.status).json(response.data);
    } catch (err) {
      if (err.response) {
        return res.status(err.response.status).json(err.response.data);
      }
      return res.status(504).json({
        success: false,
        errorCode: 'UPSTREAM_TIMEOUT',
        message: err.message || 'Service did not respond in time',
      });
    }
  };
};

