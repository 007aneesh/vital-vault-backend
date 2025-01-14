"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_employee_1 = require("../../services/settings/add_employee");
const organisation_1 = require("../../controllers/organisation");
const verify_access_token_1 = require("../../middlewares/verify_access_token");
const common_1 = require("../../controllers/common");
const router = express_1.default.Router();
// employee registration routes
router.post("/add-employee", add_employee_1.addEmployee);
// organisation service routes
router.patch("/update", verify_access_token_1.verifyAccessToken, organisation_1.OrganisationController.updateOrganisation);
router.delete("/delete", verify_access_token_1.verifyAccessToken, organisation_1.OrganisationController.deleteOrganisation);
router.patch("/change_password", verify_access_token_1.verifyAccessToken, organisation_1.OrganisationController.changePassword);
// insurance routes
router.post("/insurance/create", common_1.InsuranceController.createInsurance);
exports.default = router;
