"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const verify_access_token_1 = require("./middlewares/verify_access_token");
const routes_1 = __importDefault(require("./routes"));
const appError_1 = __importDefault(require("./utils/appError"));
const globalErrorMiddleware_1 = require("./middlewares/globalErrorMiddleware");
const app = (0, express_1.default)();
// const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.get("/", verify_access_token_1.verifyAccessToken, (req, res) => {
    res.send({ message: "Server is Up and Running" });
});
app.get("/status", (req, res) => {
    res.status(200).send({ message: "Server is Up and Running" });
});
app.use("/api", routes_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(404, "Can't find ${req.originalUrl} on this server!"));
});
app.use(globalErrorMiddleware_1.globalErrorHandler);
exports.default = app;
//# sourceMappingURL=index.js.map