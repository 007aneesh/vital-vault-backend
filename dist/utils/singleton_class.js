"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonClass = void 0;
const catchErrors_1 = __importDefault(require("../utils/catchErrors"));
const SingletonClass = (Constructor) => {
    return class {
        constructor() { }
        static get config() {
            if (!this.instance) {
                this.instance = new Constructor();
                // Wrap all async methods with catchErrors
                Object.getOwnPropertyNames(Constructor.prototype).forEach((method) => {
                    if (method !== "constructor") {
                        const originalMethod = this.instance[method];
                        if (typeof originalMethod === "function") {
                            this.instance[method] = (0, catchErrors_1.default)(originalMethod);
                        }
                    }
                });
            }
            return this.instance;
        }
    };
};
exports.SingletonClass = SingletonClass;
//# sourceMappingURL=singleton_class.js.map