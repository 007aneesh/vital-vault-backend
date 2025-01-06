"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_patient_1 = require("../services/employee-services/add_patient");
const employee_1 = require("../controllers/employee");
const verify_access_token_1 = require("../middlewares/verify_access_token");
const router = express_1.default.Router();
// app registration routes
router.post("/add-patient", verify_access_token_1.verifyAccessToken, add_patient_1.addPatient);
router.patch("/update", verify_access_token_1.verifyAccessToken, employee_1.updateDetails);
router.post("/change-password", verify_access_token_1.verifyAccessToken, employee_1.changePassword);
exports.default = router;
