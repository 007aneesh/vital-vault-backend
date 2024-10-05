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
exports.register = void 0;
const db_1 = require("../../utils/db");
const handle_response_1 = require("../../utils/handle_response");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_helper_1 = require("../../utils/jwt_helper");
const auth_validation_1 = require("../../validations/auth_validation");
const schema_vaidation_1 = require("../../middlewares/schema_vaidation");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = auth_validation_1.registerSchema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return (0, handle_response_1.sendError)(res, error, 500);
        }
        const { userName, email, contactNo, secContact, password, orgName, address, pinCode, city, state, planSelected, } = result.data;
        const uniqueErrors = yield (0, schema_vaidation_1.checkUniqueFields)("organisation", {
            userName,
            email,
            contactNo,
            orgName,
        });
        if (uniqueErrors) {
            return (0, handle_response_1.sendError)(res, uniqueErrors.join(", "), 400);
        }
        const hash_password = yield bcrypt_1.default.hash(password, 10);
        const newOrganisation = yield db_1.prisma.organisation.create({
            data: {
                userName,
                email,
                contactNo,
                secContact,
                password: hash_password,
                orgName,
                address,
                pinCode,
                city,
                state,
                planSelected,
            },
        });
        const accessTokenPromise = (0, jwt_helper_1.signAccessToken)(newOrganisation.id);
        const refreshTokenPromise = (0, jwt_helper_1.signRefreshToken)(newOrganisation.id);
        const [accessToken, refreshToken] = yield Promise.all([
            accessTokenPromise,
            refreshTokenPromise,
        ]);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return (0, handle_response_1.sendSuccess)(res, {
            message: "Organization registered successfully",
            accessToken,
        }, 201);
    }
    catch (error) {
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.register = register;
