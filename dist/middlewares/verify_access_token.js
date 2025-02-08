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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handle_response_1 = require("../utils/handle_response");
const verifyAccessToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers["authorization"])
        return (0, handle_response_1.sendError)(res, "Unauthorised", 401);
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    if (bearerToken.length !== 2) {
        return (0, handle_response_1.sendError)(res, "Unauthorized: Malformed token", 401);
    }
    const token = bearerToken[1];
    try {
        const payload = jsonwebtoken_1.default.verify(token, String(process.env.ACCESS_TOKEN_SECRET));
        req.payload = payload;
        next();
    }
    catch (err) {
        if (err.name === "JsonWebTokenError") {
            return (0, handle_response_1.sendError)(res, "Unauthorized: Invalid token", 401);
        }
        else if (err.name === "TokenExpiredError") {
            return (0, handle_response_1.sendError)(res, "Unauthorized: Token expired", 401);
        }
        else {
            return (0, handle_response_1.sendError)(res, `Unauthorized: ${err.message}`, 401);
        }
    }
});
exports.verifyAccessToken = verifyAccessToken;
const verifyToken = (token, options) => {
    const _a = options || {}, { secret = String(process.env.ACCESS_TOKEN_SECRET) } = _a, verifyOpts = __rest(_a, ["secret"]);
    try {
        const payload = jsonwebtoken_1.default.verify(token, secret, Object.assign({}, verifyOpts));
        return {
            payload,
        };
    }
    catch (error) {
        return {
            error: error.message,
        };
    }
};
exports.verifyToken = verifyToken;
