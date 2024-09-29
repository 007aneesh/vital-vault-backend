import express from "express";
import { register } from "../services/auth-services/register";
import { adminLogin } from "../services/auth-services/admin_login";

const router = express.Router();

router.post("/register", register);
router.post("/admin-login-v1", adminLogin);
router.post("/refresh-token", async (req, res, next) => {
  res.send("refresh token route");
});
router.post("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;
