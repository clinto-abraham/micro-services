// import crypto from 'crypto';

// export function verifySignature(req, res, next) {
//   const signature = req.headers['x-signature'];
//   if (!signature) {
//     return res.status(401).json({ message: 'Missing signature' });
//   }

//   const { requestId, timestamp, payload } = req.body;

//   const data = `${requestId}.${timestamp}.${JSON.stringify(payload)}`;

//   const expected = crypto
//     .createHmac('sha256', process.env.REQUEST_SIGNING_KEY)
//     .update(data)
//     .digest('base64');

//   if (expected !== signature) {
//     return res.status(401).json({ message: 'Invalid signature' });
//   }

//   next();
// }
