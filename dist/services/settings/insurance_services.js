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
const db_1 = require("../../utils/db");
class InsuranceService {
    /**
     * Create a new insurance policy.
     * @param data - Insurance data
     * @returns Created insurance policy
     * @throws Error if required fields are missing or validation fails
     */
    createInsurance(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { policy_number, provider, valid_till, coverage_amount, owner_type, owner_id, } = data;
                if (!policy_number ||
                    !provider ||
                    !valid_till ||
                    !coverage_amount ||
                    !owner_type ||
                    !owner_id) {
                    throw new Error("All required fields (policy_number, provider, valid_till, coverage_amount, owner_type, owner_id) must be provided.");
                }
                if (!["patient", "employee"].includes(owner_type)) {
                    throw new Error("Invalid owner_type. It must be either 'patient' or 'employee'.");
                }
                const ownerExists = owner_type === "patient"
                    ? yield db_1.prisma.patient.findUnique({ where: { id: owner_id } })
                    : yield db_1.prisma.employee.findUnique({ where: { id: owner_id } });
                if (!ownerExists) {
                    throw new Error(`Owner with ID ${owner_id} not found in ${owner_type === "patient" ? "Patient" : "Employee"} database.`);
                }
                const policyExists = yield db_1.prisma.insuranceDetails.findUnique({
                    where: { policy_number },
                });
                if (policyExists) {
                    throw new Error("A policy with the given policy_number already exists.");
                }
                const validTill = new Date(valid_till);
                const insurance = yield db_1.prisma.insuranceDetails.create({
                    data: Object.assign(Object.assign({}, data), { valid_till: validTill }),
                });
                return insurance;
            }
            catch (error) {
                console.error("Error while adding insurance:", error);
                throw error;
            }
        });
    }
    /**
     * Get all insurance policies.
     * @returns List of all insurance policies
     */
    getAllInsuranceDetails() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield db_1.prisma.insuranceDetails.findMany();
            }
            catch (error) {
                console.error("Error in getAllInsuranceDetails:", error);
                throw error;
            }
        });
    }
    /**
     * Get insurance policy by ID.
     * @param id - Policy number
     * @returns Insurance policy or null
     */
    getInsuranceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const insurance = yield db_1.prisma.insuranceDetails.findUnique({
                    where: { policy_number: id },
                });
                if (!insurance) {
                    throw new Error(`Insurance policy with ID ${id} not found.`);
                }
                return insurance;
            }
            catch (error) {
                console.error("Error in getInsuranceById:", error);
                throw error;
            }
        });
    }
    /**
     * Update insurance policy.
     * @param id - Policy number
     * @param data - Updated insurance data
     * @returns Updated insurance policy
     */
    updateInsurance(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedInsurance = yield db_1.prisma.insuranceDetails.update({
                    where: { policy_number: id },
                    data,
                });
                return updatedInsurance;
            }
            catch (error) {
                console.error("Error in updateInsurance:", error);
                throw error;
            }
        });
    }
    /**
     * Delete an insurance policy by ID.
     * @param id - Policy ID
     * @returns Deleted insurance policy
     */
    deleteInsurance(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedInsurance = yield db_1.prisma.insuranceDetails.delete({
                    where: { id },
                });
                return deletedInsurance;
            }
            catch (error) {
                console.error("Error in deleteInsurance:", error);
                throw error;
            }
        });
    }
}
const insuranceService = new InsuranceService();
exports.default = insuranceService;
//# sourceMappingURL=insurance_services.js.map