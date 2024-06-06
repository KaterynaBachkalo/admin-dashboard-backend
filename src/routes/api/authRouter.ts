import express from "express";
import { authMiddleware } from "../../middlewares";
import { authControllers } from "../../controllers";

const router = express.Router();

router.post(
  "/register",
  authMiddleware.checkRegistrationData,
  authControllers.registration
);

router.post("/login", authMiddleware.checkLoginData, authControllers.login);

router.use(authMiddleware.protect);

router.post("/logout", authControllers.logout);

router.get("/user-info", authControllers.getCurrentUser);

router.patch(
  "/",
  authMiddleware.checkSubscriptionExist,
  authControllers.updateSubscription
);

export default router;
