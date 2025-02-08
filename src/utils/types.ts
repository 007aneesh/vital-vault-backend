// auth types
type LoginParams = {
  identifier: string;
  notRegisteredError: string;
};

type ResetPasswordParams = {
  code: string;
  password: string;
};

export { LoginParams, ResetPasswordParams };
