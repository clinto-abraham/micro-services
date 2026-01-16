"use strict";

const axios = require("axios");
const SERVICE_MAP = require("./service-map");

module.exports = function customProxy(serviceKey) {
    const service = SERVICE_MAP[serviceKey];

    return async function proxyHandler(req, res, next) {
        try {
            const gatewayContext = {
                requestId: req.context.requestId,
                timestamp: req.context.timestamp,
                ip: req.context.ip,
                userAgent: req.context.userAgent,
                userContext: req.context.userContext,
                deviceFingerprint: req.context.deviceFingerprint
            };

            const encodedContext = Buffer.from(
                JSON.stringify(gatewayContext)
            ).toString("base64");

            const url =
                service.target +
                req.originalUrl.replace(`/api/${service.publicPrefix}`, "");

            console.log(process.env.INTERNAL_SERVICE_SECRET, 15)

            const response = await axios({
                method: req.method,
                url,
                headers: {
                    Authorization: req.headers.authorization,
                    "x-internal-secret": process.env.INTERNAL_SERVICE_SECRET,
                    "x-request-id": req.context.requestId,
                    "x-gateway-context": encodedContext,
                    "Content-Type": "application/json"
                },
                data: req.body,
                timeout: 6000
            });

            return res.status(response.status).json(response.data);
        } catch (err) {
            console.error("❌ Custom proxy error:", err.message);

            if (err.response) {
                return res.status(err.response.status).json(err.response.data);
            }

            return res.status(504).json({
                success: false,
                errorCode: "UPSTREAM_TIMEOUT",
                message: "Service did not respond in time"
            });
        }
    };
};
