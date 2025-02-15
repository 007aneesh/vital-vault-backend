import AppError from "./appError";
import { HttpStatusCode } from "./http";
import AppErrorCode from "./appErrorCode";
import assert from "node:assert";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;
/**
 * Asserts a condition and throws an AppError if the condition is falsy.
 */
const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
