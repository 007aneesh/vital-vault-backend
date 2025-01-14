import jwt from "jsonwebtoken";

export const verifyRefreshToken = async (refreshToken: string) => {
  return new Promise<any>((resolve, reject) => {
    jwt.verify(
      refreshToken,
      String(process.env.REFRESH_TOKEN_SECRET),
      (err, payload) => {
        if (err) {
          return reject(new Error("Unauthorised"));
        }
        const userId = (payload as jwt.JwtPayload)?.aud;
        resolve(userId);
      },
    );
  });
};
