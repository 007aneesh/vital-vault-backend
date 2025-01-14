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
Object.defineProperty(exports, "__esModule", { value: true });
const patient_1 = require("../../services/visit_services/patient");
const handle_response_1 = require("../../utils/handle_response");
const singleton_class_1 = require("../../utils/singleton_class");
class VisitHistoryController {
    constructor() {
        this.visitHistoryService = new patient_1.VisitHistoryService();
        this.createVisit = this.createVisit.bind(this);
        this.getAllByPatientId = this.getAllByPatientId.bind(this);
        this.getById = this.getById.bind(this);
        this.getByDate = this.getByDate.bind(this);
        this.update = this.update.bind(this);
    }
    createVisit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = req.body;
                const visit = yield this.visitHistoryService.createVisitData(data);
                return (0, handle_response_1.sendSuccess)(res, visit, 200);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    getAllByPatientId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const visits = yield this.visitHistoryService.getAllByPatientId(id);
                if (!visits.length) {
                    return (0, handle_response_1.sendError)(res, "No visit histories found for the given patient ID", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, visits);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const visit = yield this.visitHistoryService.getById(id);
                if (!visit) {
                    return (0, handle_response_1.sendError)(res, "Visit history not found", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, visit);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    getByDate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const id = (_a = req === null || req === void 0 ? void 0 : req.payload) === null || _a === void 0 ? void 0 : _a.id;
                const { date } = req.query;
                const visits = yield this.visitHistoryService.getByDate(date, id);
                if (!visits.length) {
                    return (0, handle_response_1.sendError)(res, "No visits found for the given date and patient ID", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, visits);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const data = req.body;
                const updatedVisit = yield this.visitHistoryService.update(id, data);
                if (!updatedVisit) {
                    return (0, handle_response_1.sendError)(res, "Failed to update visit history", 404);
                }
                return (0, handle_response_1.sendSuccess)(res, updatedVisit);
            }
            catch (error) {
                return (0, handle_response_1.sendError)(res, error.message, 500);
            }
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(VisitHistoryController);
exports.default = methods;
