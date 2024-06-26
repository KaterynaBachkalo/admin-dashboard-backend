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

router.post("/refresh-token", authControllers.refreshToken);

router.use(authMiddleware.protect);

router.post("/logout", authControllers.logout);

router.get("/user-info", authControllers.getCurrentUser);

export default router;
