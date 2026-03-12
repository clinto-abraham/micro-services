'use strict';

const db = require('../models');

async function getAppConfig(req, res) {
  const nameOfApp = req.params.appName;
  if (!nameOfApp) {
    return res.status(400).json({ success: false, message: 'appName required' });
  }

  const row = await db.AppConfig.findOne({
    where: { nameOfApp, isActive: true },
  });

  if (!row) {
    return res.status(404).json({
      success: false,
      message: `No app config found for ${nameOfApp}`,
    });
  }

  return res.json({
    success: true,
    data: {
      nameOfApp: row.nameOfApp,
      connectedBackendName: row.connectedBackendName,
      connectedBackendPort: row.connectedBackendPort,
    },
  });
}

module.exports = { getAppConfig };

