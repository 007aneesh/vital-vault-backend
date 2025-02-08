"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const verify_access_token_1 = require("./middlewares/verify_access_token");
const routes_1 = __importDefault(require("./routes"));
const env_1 = require("./utils/env");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", verify_access_token_1.verifyAccessToken, (req, res) => {
    res.send({ message: "Server is Up and Running" });
});
app.get("/status", (req, res) => {
    res.status(200).send({ message: "Server is Up and Running" });
});
app.use("/api", routes_1.default);
app.listen(env_1.PORT, () => {
    console.log(`Server started at PORT: ${env_1.PORT}`);
});
