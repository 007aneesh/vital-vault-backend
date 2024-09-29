import jwt from "jsonwebtoken";

export const signAccessToken = async (id: any) => {
  return new Promise<any>((resolve, reject) => {
    const payload = {
      id
    };
    const secret = String(process.env.ACCESS_TOKEN_SECRET);
    const options = {
      expiresIn: "1h",
      issuer: "vital-vault",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(new Error("Internal Server Error"));
      resolve(token);
    });
  });
};

export const signRefreshToken = async (id: any) => {
  return new Promise<any>((resolve, reject) => {
    const payload = {
      id,
    };
    const secret = String(process.env.REFRESH_TOKEN_SECRET);
    const options = {
      expiresIn: "1y",
      issuer: "vital-vault",
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) return reject(new Error("Internal Server Error"));
      resolve(token);
    });
  });
};
