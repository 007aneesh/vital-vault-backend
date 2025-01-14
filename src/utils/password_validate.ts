import bcrypt from "bcrypt";

export const isValidPassword = async (
  password: string,
  user_password: string,
) => {
  return await bcrypt.compare(password, user_password);
};
