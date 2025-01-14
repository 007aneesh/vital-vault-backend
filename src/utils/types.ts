import { Models } from "./constant";

// schema types
type ModelType = (typeof Models)[keyof typeof Models];

// auth types
type LoginParams = {
  model: ModelType;
  identifier: string;
  notRegisteredError: string;
};

export { ModelType, LoginParams };
