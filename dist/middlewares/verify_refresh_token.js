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
exports.verifyRefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../utils/env");
const verifyRefreshToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.verify(refreshToken, env_1.REFRESH_TOKEN_SECRET, (err, payload) => {
            if (err) {
                return reject(new Error("Unauthorised"));
            }
            const userId = payload === null || payload === void 0 ? void 0 : payload.aud;
            resolve(userId);
        });
    });
});
exports.verifyRefreshToken = verifyRefreshToken;
