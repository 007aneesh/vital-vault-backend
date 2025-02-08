import express from "express";
import { addEmployee } from "../../services/settings/add_employee";
import { OrganisationController } from "../../controllers/organisation";
import { InsuranceController } from "../../controllers/common";

const router = express.Router();

// employee registration routes
router.post("/add-employee", addEmployee);

// organisation service routes
router.patch("/update", OrganisationController.updateOrganisation);
router.delete("/delete", OrganisationController.deleteOrganisation);
router.patch("/change_password", OrganisationController.changePassword);

// insurance routes
router.post("/insurance/create", InsuranceController.createInsurance);

export default router;
