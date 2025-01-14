import express from "express";
import { register } from "../../services/auth-services/register";
import { refreshToken } from "../../services/auth-services/refresh_token";
import { LoginController } from "../../controllers/auth";

const router = express.Router();

// registration routes
router.post("/register", register);

// login routes
router.post("/admin-login", LoginController.adminLogin);
router.post("/user-login", LoginController.patientLogin);
router.post("/employee-login", LoginController.employeeLogin);

// refresh token route
router.post("/refresh-token", refreshToken);

//logout route
router.delete("/logout", async (req, res) => {
  res.send("logout route");
});

export default router;
