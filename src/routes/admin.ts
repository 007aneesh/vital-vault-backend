import express from "express";
import { addEmployee } from "../services/settings/add_employee";
import {
  updateOrganisation,
  deleteOrganisation,
  changePassword,
} from "../controllers/organisation";
import { verifyAccessToken } from "../middlewares/verify_access_token";

const router = express.Router();

// employee registration routes
router.post("/add-employee", addEmployee);

// organisation service routes
router.patch("/update", verifyAccessToken, updateOrganisation);
router.delete("/delete", verifyAccessToken, deleteOrganisation);
router.patch("/change_password", verifyAccessToken, changePassword);

export default router;
