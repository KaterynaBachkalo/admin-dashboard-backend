"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../../middlewares");
const controllers_1 = require("../../controllers");
const router = express_1.default.Router();
router.post("/register", middlewares_1.authMiddleware.checkRegistrationData, controllers_1.authControllers.registration);
router.post("/login", middlewares_1.authMiddleware.checkLoginData, controllers_1.authControllers.login);
router.use(middlewares_1.authMiddleware.protect);
router.patch("/avatars", middlewares_1.authMiddleware.uploadAvatar, controllers_1.authControllers.updateAvatar);
router.post("/logout", controllers_1.authControllers.logout);
router.get("/current", controllers_1.authControllers.getCurrentUser);
router.patch("/", middlewares_1.authMiddleware.checkSubscriptionExist, controllers_1.authControllers.updateSubscription);
exports.default = router;
//# sourceMappingURL=authRouter.js.map