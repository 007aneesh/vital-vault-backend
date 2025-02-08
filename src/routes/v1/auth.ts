import express from "express";
import { register } from "../../services/auth-services/auth.service";
import { refreshToken } from "../../services/auth-services/refresh_token";
import { LoginController } from "../../controllers/auth";
import {
  resetPasswordHandler,
  sendPasswordResetHandler,
  verify,
} from "../../controllers/auth/verify.controller";
import { logoutHandler } from "../../controllers/auth/logout_controller";
import { verifyAccessToken } from "../../middlewares/verify_access_token";

const router = express.Router();

// registration routes
router.post("/register", register);

// login routes
router.post("/login", LoginController.Login);

router.post("/email/verify/:code", verify);
router.post("/password/forgot", sendPasswordResetHandler);
router.post("/password/reset", resetPasswordHandler);

// refresh token route
router.post("/refresh", refreshToken);

//logout route
router.delete("/logout", verifyAccessToken, logoutHandler);

export default router;
