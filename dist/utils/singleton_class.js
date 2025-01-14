"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingletonClass = void 0;
const SingletonClass = (constructor) => {
    return class {
        constructor() { }
        static get config() {
            var _a;
            return ((_a = this.instance) !== null && _a !== void 0 ? _a : (this.instance = new constructor()));
        }
    };
};
exports.SingletonClass = SingletonClass;
