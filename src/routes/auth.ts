import express from "express";
import { register } from "../services/auth-services/register";
import { adminLogin } from "../services/auth-services/admin_login";
import { refreshToken } from "../services/auth-services/refresh_token";

const router = express.Router();

router.post("/register", register);
router.post("/admin-login-v1", adminLogin);
router.post("/refresh-token", refreshToken);
router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;
