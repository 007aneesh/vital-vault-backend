"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const add_patient_1 = require("../services/employee-services/add_patient");
const router = express_1.default.Router();
// patient registration routes
router.post("/add-patient", add_patient_1.addPatient);
exports.default = router;
