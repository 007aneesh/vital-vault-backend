import { Response } from "express";
import { UserType } from "../../utils/constant";
import { prisma } from "../../utils/db";
import { sendError, sendSuccess } from "../../utils/handle_response";

export const getMe = async (req: any, res: Response) => {
  try {
    const { user_id } = req.payload;

    const user = await prisma.entity_Mapping.findUnique({
      where: { ref_id: user_id },
      include: {
        organisation: true,
        employee: true,
        patient: true,
      },
    });

    if (!user) return sendError(res, "User not found", 404);

    let user_details = {};
    if (user.type === UserType.ORGANISATION && user.organisation) {
      user_details = { ...user.organisation };
    } else if (user.type === UserType.EMPLOYEE && user.employee) {
      user_details = { ...user.employee };
    } else if (user.type === UserType.PATIENT && user.patient) {
      user_details = { ...user.patient };
    }

    const response_data = {
      id: user.id,
      email: user.email,
      username: user.username,
      type: user.type,
      is_active: user.is_active,
      verified: user.verified,
      last_login_at: user.last_login_at,
      ...user_details,
    };

    return sendSuccess(res, response_data, 200);
  } catch (error) {
    console.error("Error while fetching user data:", error);
    return sendError(res, "Internal Server Error", 500);
  }
};
