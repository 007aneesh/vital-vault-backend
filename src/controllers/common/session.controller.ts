import { z } from "zod";
import { NOT_FOUND } from "../../utils/http";
import { prisma } from "../../utils/db";
import catchErrors from "../../utils/catchErrors";
import appAssert from "../../utils/appAssert";
import { sendSuccess } from "../../utils/handle_response";

export const getSessionsHandler = catchErrors(async (req: any, res: any) => {
  const user_id = req?.payload?.user_id;

  const sessions = await prisma.session.findMany({
    where: {
      user_id,
      expires_at: {
        gt: new Date(),
      },
    },
    select: {
      id: true,
      user_agent: true,
      created_at: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return sendSuccess(res, {
    message: "Sessions retrieved",
    data: sessions.map((session) => ({
      ...session,
      is_current_session: session.id === req.payload.session_id,
    })),
  });
});

export const deleteSessionHandler = catchErrors(async (req: any, res: any) => {
  const sessionId = z.string().parse(req.params.id);

  const deletedSession = await prisma.session.deleteMany({
    where: {
      id: sessionId,
      user_id: req?.payload?.user_id,
    },
  });

  appAssert(deletedSession.count > 0, NOT_FOUND, "Session not found");

  return sendSuccess(res, { message: "Session removed" });
});
