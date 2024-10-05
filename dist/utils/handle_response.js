"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSuccess = exports.sendError = void 0;
const sendError = (res, error, status = 500) => {
    res.status(status).send({ error });
};
exports.sendError = sendError;
const sendSuccess = (res, success, status = 200) => {
    res.status(status).send(success);
};
exports.sendSuccess = sendSuccess;
