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
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = auth_validation_1.registerSchema.safeParse(req.body);
        if (!result.success) {
            const error = result.error.issues
                .map((issue) => issue.message)
                .join(", ");
            return (0, handle_response_1.sendError)(res, error, 422);
        }
        const { username, email, contact, secondary_contact, password, name, address, state, city, pincode, plan, access_level = "ADMIN" } = result.data;
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const existingAdmin = yield db_1.prisma.organisation.findFirst({
            where: {
                username,
            },
        });
        if (existingAdmin) {
            return (0, handle_response_1.sendError)(res, "Organisation already registered!!");
        }
        const newOrganisation = yield db_1.prisma.organisation.create({
            data: {
                username,
                name,
                email,
                contact,
                secondary_contact,
                password: hashedPassword,
                address,
                state,
                city,
                pincode,
                plan,
                access_level
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
            accessToken,
        }, 201);
    }
    catch (error) {
        console.error(error);
        return (0, handle_response_1.sendError)(res, "Internal server error", 500);
    }
});
exports.register = register;
