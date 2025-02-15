import jwt from "jsonwebtoken";

export const signAccessToken = async (user_id: any, session_id: any) => {
  return new Promise<any>((resolve, reject) => {
    const payload = {
      user_id,
      session_id,
    };
    const secret = String(process.env.ACCESS_TOKEN_SECRET);
    const options = {
      expiresIn: "1h",
      issuer: "vital-vault",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error("JWT Signing Error:", err);
        return reject(new Error("Internal Server Error"));
      }
      resolve(token);
    });
  });
};

export const signRefreshToken = async (user_id: any, session_id: any) => {
  return new Promise<any>((resolve, reject) => {
    const payload = {
      user_id,
      session_id,
    };
    const secret = String(process.env.REFRESH_TOKEN_SECRET);
    const options = {
      expiresIn: "30d",
      issuer: "vital-vault",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error("JWT Signing Error:", err);
        return reject(new Error("Internal Server Error"));
      }
      resolve(token);
    });
  });
};
