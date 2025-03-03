"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verify_access_token_1 = require("../../middlewares/verify_access_token");
const auth_1 = __importDefault(require("./auth"));
const admin_1 = __importDefault(require("./admin"));
const employee_1 = __importDefault(require("./employee"));
const patient_1 = __importDefault(require("./patient"));
const medication_1 = __importDefault(require("./medication"));
const prescription_1 = __importDefault(require("./prescription"));
const report_1 = __importDefault(require("./report"));
const session_1 = __importDefault(require("./session"));
const users_1 = __importDefault(require("./users"));
const upload_1 = __importDefault(require("./upload"));
const appointment_1 = __importDefault(require("./appointment"));
const handle_response_1 = require("../../utils/handle_response");
const router = (0, express_1.Router)();
router.use("/auth", auth_1.default);
router.use("/admin", verify_access_token_1.verifyAccessToken, admin_1.default);
router.use("/employee", verify_access_token_1.verifyAccessToken, employee_1.default);
router.use("/patient", verify_access_token_1.verifyAccessToken, patient_1.default);
router.use("/medication", verify_access_token_1.verifyAccessToken, medication_1.default);
router.use("/prescription", verify_access_token_1.verifyAccessToken, prescription_1.default);
router.use("/report", verify_access_token_1.verifyAccessToken, report_1.default);
router.use("/session", verify_access_token_1.verifyAccessToken, session_1.default);
router.use("/user", verify_access_token_1.verifyAccessToken, users_1.default);
router.use("/upload", verify_access_token_1.verifyAccessToken, upload_1.default);
router.use("/appointment", verify_access_token_1.verifyAccessToken, appointment_1.default);
router.get("/status", (req, res) => {
    return (0, handle_response_1.sendSuccess)(res, "The API route is working fine");
});
exports.default = router;
//# sourceMappingURL=index.js.map