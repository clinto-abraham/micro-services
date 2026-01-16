// services/featureFlag.service.js
const FeatureFlag = require("../../models/FeatureFlag");

exports.isEnabled = async (key, redis) => {
  // 1️⃣ Redis (fast)
  if (redis) {
    const cached = await redis.get(`FEATURE:${key}`);
    if (cached !== null) return cached === "true";
  }

  // 2️⃣ DB fallback
  const flag = await FeatureFlag.findOne({ key });
  console.log("reaching db fallback")
  // if (!flag) return false;     //PROD
    if (!flag) return true;

  // 3️⃣ Cache
  if (redis) {
    await redis.setex(`FEATURE:${key}`, 60, String(flag.enabled));
  }

  console.log("reaching setex")
  return flag.enabled;
};
