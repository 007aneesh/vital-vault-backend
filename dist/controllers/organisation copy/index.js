"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDetails = exports.changePassword = exports.deleteOrganisation = exports.updateOrganisation = void 0;
const organisation_controller_1 = __importDefault(require("./organisation_controller"));
exports.updateOrganisation = organisation_controller_1.default.updateOrganisation;
exports.deleteOrganisation = organisation_controller_1.default.deleteOrganisation;
exports.changePassword = organisation_controller_1.default.changePassword;
exports.updateDetails = organisation_controller_1.default.updateDetails;
