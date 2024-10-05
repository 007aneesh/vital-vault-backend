"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_1 = __importDefault(require("./routes/auth"));
const verify_access_token_1 = require("./middlewares/verify_access_token");
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 8001;
app.use(express_1.default.urlencoded({
    extended: true,
}));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.get("/", verify_access_token_1.verifyAccessToken, (req, res) => {
    res.send({ message: "Server is Up and Running" });
});
app.use("/auth", auth_1.default);
app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`);
});
