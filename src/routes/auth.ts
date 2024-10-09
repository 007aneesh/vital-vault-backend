import express from "express";
import { register } from "../services/auth-services/register";
import { adminLogin } from "../services/auth-services/admin_login";
import { refreshToken } from "../services/auth-services/refresh_token";
import { patientLogin } from "../services/auth-services/user_login";
import { employeeLogin } from "../services/auth-services/employee_login";

const router = express.Router();

// registration routes
router.post("/register", register);

// login routes
router.post("/admin-login-v1", adminLogin);
router.post("/user-login-v1", patientLogin);
router.post("/employee-login-v1", employeeLogin);

// refresh token route
router.post("/refresh-token", refreshToken);

//logout route
router.delete("/logout", async (req, res, next) => {
  res.send("logout route");
});

export default router;