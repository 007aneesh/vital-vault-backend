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
class OrganisationController {
    updateOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedOrganisation = yield organisation_services_1.default.updateOrganisation(id, data);
                res.json(updatedOrganisation);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update organisation" });
            }
        });
    }
    deleteOrganisation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield organisation_services_1.default.deleteOrganisation(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ error: "Failed to delete organisation" });
            }
        });
    }
    changePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { newPassword } = req.body;
                const updated = yield organisation_services_1.default.changePassword(id, newPassword);
                if (!updated) {
                    return res.status(404).json({ error: "Organisation not found" });
                }
                res.json({ message: "Password updated successfully" });
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update password" });
            }
        });
    }
    updateDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const details = req.body;
                const updatedOrganisation = yield organisation_services_1.default.updateDetails(id, details);
                if (!updatedOrganisation) {
                    return res.status(404).json({ error: "Organisation not found" });
                }
                res.json(updatedOrganisation);
            }
            catch (error) {
                res.status(500).json({ error: "Failed to update organisation details" });
            }
        });
    }
}
exports.default = new OrganisationController();
