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
exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signAccessToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = {
            id
        };
        const secret = String(process.env.ACCESS_TOKEN_SECRET);
        const options = {
            expiresIn: "1h",
            issuer: "vital-vault",
        };
        jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
            if (err)
                return reject(new Error("Internal Server Error"));
            resolve(token);
        });
    });
});
exports.signAccessToken = signAccessToken;
const signRefreshToken = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const payload = {
            id,
        };
        const secret = String(process.env.REFRESH_TOKEN_SECRET);
        const options = {
            expiresIn: "1y",
            issuer: "vital-vault",
        };
        jsonwebtoken_1.default.sign(payload, secret, options, (err, token) => {
            if (err)
                return reject(new Error("Internal Server Error"));
            resolve(token);
        });
    });
});
exports.signRefreshToken = signRefreshToken;
