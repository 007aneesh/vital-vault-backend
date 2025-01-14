"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const organisation_services_1 = __importDefault(require("../../services/settings/organisation_services"));
const singleton_class_1 = require("../../utils/singleton_class");
class OrganisationController {
    updateOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const data = req.body;
                const updatedOrganisation = yield organisation_services_1.default.updateOrganisation(id, data);
                res.status(200).json(updatedOrganisation);
            }
            catch (error) {
                res.status(500).json({ error, message: "Failed to update organisation" });
            }
        });
    }
    deleteOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                yield organisation_services_1.default.deleteOrganisation(id);
                res.status(200).json({ message: "Organisation deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ error, message: "Failed to delete organisation" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const { new_password } = req.body;
                const updated = yield organisation_services_1.default.changePassword(id, new_password);
                if (updated) {
                    res.json({ message: "Password updated successfully" });
                }
                else {
                    res.status(404).json({ message: "Organisation not found" });
                }
            }
            catch (error) {
                res.status(500).json({ error, message: "Failed to update password" });
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(OrganisationController);
exports.default = methods;
