import express from "express";
import { addEmployee } from "../../services/settings/add_employee";
import { OrganisationController } from "../../controllers/organisation";
import { verifyAccessToken } from "../../middlewares/verify_access_token";
import { InsuranceController } from "../../controllers/common";

const router = express.Router();

// employee registration routes
router.post("/add-employee", addEmployee);

// organisation service routes
router.patch(
  "/update",
  verifyAccessToken,
  OrganisationController.updateOrganisation,
);
router.delete(
  "/delete",
  verifyAccessToken,
  OrganisationController.deleteOrganisation,
);
router.patch(
  "/change_password",
  verifyAccessToken,
  OrganisationController.changePassword,
);

// insurance routes
router.post("/insurance/create", InsuranceController.createInsurance);

export default router;
