# Mongo User Service – Architecture Overview

## Overview
This service is an internal microservice responsible for user persistence.
It is NOT public-facing and only accepts traffic from the API Gateway.

## Architecture Principles
- Gateway-trusted model
- HMAC-signed internal requests
- Result-driven services
- Stateless controllers
- Redis-first protection
- Database last resort

## Security Layers
1. IP Allowlist
2. HMAC verification
3. Replay attack protection (timestamp + nonce)
4. Idempotency keys
5. Adaptive rate limiting
6. Circuit breaker

## Request Contract
All requests must follow the standard envelope:

```json
{
  "payload": { 
    "...business data..." 
  },
  "metadata": {
    "requestId": "req_abc123",
    "route": "/users",
    "timestamp": "2026-01-14T10:30:00Z",
    "ip": "49.xx.xx.xx",
    "userAgent": "Mozilla/5.0",
    "deviceId": "device_123",
    "userContext": {
      "userId": "507f1f77bcf86cd799439011",
      "roles": ["ADMIN"]
    }
  }
}
```