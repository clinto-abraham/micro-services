"use strict";

const router = require("express").Router();

const auth = require("../middlewares/auth.middleware");
const rateLimit = require("../middlewares/rateLimit.middleware");
const validate = require("../middlewares/validate.middleware");

const {
  chatgptSchema,
  geminiSchema,
  compareSchema
} = require("../validators/ai.validator");

const chatgptController = require("../controllers/ai.chatgpt.controller");
const geminiController = require("../controllers/ai.gemini.controller");
const compareController = require("../controllers/ai.compare.controller");
const geminiDirectController = require("../controllers/ai.gemini.direct.controller");
/**
 * OpenAI only
 */
router.post("/chatgpt", auth, rateLimit, validate(chatgptSchema), chatgptController.chat);

/**
 * Gemini only
 */
router.post("/gemini", auth, rateLimit, validate(geminiSchema), geminiController.chat);

/**
 * Compare / Multi-provider
 */
router.post("/chat", auth, rateLimit, validate(compareSchema), compareController.chat);



router.post("/gemini/direct",auth, rateLimit, validate(geminiSchema), geminiDirectController.chat);


module.exports = router;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoiYXBpLWdhdGV3YXkiLCJpYXQiOjE3NjU5NjM1MjMsImV4cCI6MTc2NTk2NzEyM30.T5VSCXfLbenaDsGcuLznF5FERNoTcdQvFCEg2CJVqX8
// "use strict";

// const router = require("express").Router();
// const aiRoutes = require("./ai.routes");
// const chatgptcontroller = require("../controllers/ai.chat.controller");
// const controller = require("../controllers/ai.controller");
// const auth = require("../middlewares/auth.middleware");
// const rateLimit = require("../middlewares/rateLimit.middleware");
// const validate = require("../middlewares/validate.middleware");
// const { chatSchema } = require("../validators/ai.validator");

// router.post("/chat", auth, rateLimit, validate(chatSchema), chatgptcontroller.chat);
// router.use("/ai", aiRoutes);
// router.post("/chatgpt", auth, rateLimit, controller.chat);

// module.exports = router;

