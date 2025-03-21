"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_DAY_MS = exports.thirtyDaysFromNow = exports.oneYearFromNow = exports.oneHourFromNow = exports.fifteenMinutesFromNow = exports.fiveMinutesAgo = void 0;
const fiveMinutesAgo = () => new Date(Date.now() - 5 * 60 * 1000);
exports.fiveMinutesAgo = fiveMinutesAgo;
const fifteenMinutesFromNow = () => new Date(Date.now() + 15 * 60 * 1000);
exports.fifteenMinutesFromNow = fifteenMinutesFromNow;
const oneHourFromNow = () => new Date(Date.now() + 60 * 60 * 1000);
exports.oneHourFromNow = oneHourFromNow;
const oneYearFromNow = () => new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);
exports.oneYearFromNow = oneYearFromNow;
const thirtyDaysFromNow = () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
exports.thirtyDaysFromNow = thirtyDaysFromNow;
exports.ONE_DAY_MS = 24 * 60 * 60 * 1000;
//# sourceMappingURL=date.js.map