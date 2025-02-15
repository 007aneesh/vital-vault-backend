import { prisma } from "../../utils/db";
import { sendSuccess } from "../../utils/handle_response";
import { clearAuthCookies } from "../../utils/cookies";

export const logoutHandler = async (req: any, res: any) => {
  await prisma.session.delete({
    where: {
      id: req.payload.session_id,
    },
  });
  clearAuthCookies(res);
  return sendSuccess(res, "Logout successful");
};
