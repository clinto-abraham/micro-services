Request
  ↓
[1] Logging & tracing
  ↓
[2] Spike protection (sudden floods)
  ↓
[3] Rate limiting (steady abuse)
  ↓
[4] AI traffic guard (pattern / bot detection)
  ↓
[5] JWT validation
  ↓
[6] Proxy to service


## Middlewares to protect whole micro-services from api gateway:
| Scenario            | Blocked by        |
| ------------------- | ----------------- |
| Sudden 200 req/sec  | spikeProtector    |
| 1000 req in 10 mins | rateLimiter       |
| Curl / bot          | aiTrafficGuard    |
| Invalid token       | auth.middleware   |
| Dead service        | health.middleware |


src/
├── middlewares/
│   ├── replay/
│   │   └── replay.middleware.js
│   ├── rateLimit/
│   │   └── rateLimit.middleware.js
│   ├── rbac/
│   │   └── rbac.middleware.js
│   ├── schema/
│   │   └── schema.middleware.js
│   ├── device/
│   │   └── fingerprint.middleware.js
│   ├── aiFirewall/
│   │   └── aiFirewall.middleware.js
│   ├── hmac/
│   │   └── hmac.middleware.js



x-internal-secret
x-hmac-signature
x-hmac-timestamp
x-request-id
x-gateway-context


┌────────────┐
│ React App  │
└─────┬──────┘
      │ HTTPS
      ▼
┌──────────────────────────┐
│ API Gateway (Zero-Trust) │
│  - Auth (JWT)            │
│  - RBAC                  │
│  - Rate limiting (Redis) │
│  - Replay protection     │
│  - Device fingerprint    │
│  - Threat scoring        │
│  - HMAC signing          │
│  - Custom proxy          │
└─────┬────────────────────┘
      │ Internal HTTPS
      │ (x-internal-secret + HMAC)
      ▼
┌───────────────────────────────────────┐
│ Microservices (Mongo, AI, Payment…)   │
│  - Internal auth guard                 │
│  - Gateway context verification        │
│  - Replay protection (service-level)   │
│  - Business validation only            │
└───────────────────────────────────────┘

FRONTEND => API GATEWAY
req.body:
{
  "payload": {
    "...business data..."
  }
}


req.headers:
Authorization: Bearer <JWT>
Content-Type: application/json


API => MICRO-SERVICES: 

req.body:
{
  "payload": {
    "...business data..."
  }
}


req.headers : GATEWAY GENERATED
Authorization: Bearer <JWT>
x-internal-secret: <shared-secret>
x-request-id: req_xxx
x-gateway-context: <base64-json>
x-hmac-signature: <sha256>
x-hmac-timestamp: <epoch-ms>
Content-Type: application/json

x-gateway-context (Decoded):
{
  "requestId": "req_48c68069...",
  "timestamp": "2026-01-15T17:43:22.684Z",
  "ip": "127.0.0.1",
  "userAgent": "PostmanRuntime/7.36.1",
  "userContext": {
    "userId": "507f1f77bcf86cd799439011",
    "roles": ["PARTICIPANT"]
  },
  "deviceFingerprint": "88e093b1..."
}

RESPONSE:

SUCCESS:
{
  "success": true,
  "statusCode": 200,
  "message": "Operation successful",
  "data": {},
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T17:43:22.684Z"
  }
}

ERROR:
{
  "success": false,
  "statusCode": 403,
  "errorCode": "FORBIDDEN",
  "message": "Access denied",
  "meta": {
    "requestId": "req_abc123",
    "timestamp": "2026-01-15T17:43:22.684Z"
  }
}


🔐 Layered security model (in order)
1️⃣ CORS (Frontend boundary)
Blocks unauthorized browsers
Does NOT provide security alone
2️⃣ JWT Authentication (Gateway)
Identity proof
Stateless
Short-lived access token
3️⃣ RBAC (Gateway)
Route → allowed roles
No role trust from client
4️⃣ Rate Limiting (Gateway, Redis)
userId + IP
Prevents abuse
5️⃣ Spike Protection (Gateway)
Sudden traffic burst detection
Temporary bans
6️⃣ IP Protection
Blocklisted countries / IPs
TOR / VPN heuristics (optional)
7️⃣ Device Fingerprinting
Detects token misuse
Used in threat scoring
8️⃣ Replay Protection
Timestamp drift (±5 min)
requestId uniqueness (Redis)
9️⃣ Threat Scoring
Combines signals
Auto-block high-risk requests
🔟 HMAC (Gateway → Service)
Prevents tampering
Prevents service spoofing
1️⃣1️⃣ Internal Secret
Guarantees gateway identity


