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
const singleton_class_1 = require("../../utils/singleton_class");
const user_service_1 = require("../../services/user-services/user.service");
class UsersController {
    getData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, user_service_1.getMe)(req, res);
        });
    }
}
const methods = (0, singleton_class_1.SingletonClass)(UsersController);
exports.default = methods;
