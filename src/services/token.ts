import config from "@/config";
import * as jwt from "jsonwebtoken";
import type { User } from "@prisma/client";

export type Token = {
  email: string;
};


async function generateAccessToken(user: User) {
  const accessToken = jwt.sign(
    { email: user.email },
    config.jwt.secret.accessToken,
    { expiresIn: config.jwt.validity.accessToken },
  );

  return accessToken;
}

async function generateRefreshToken(user: User) {
  const refreshToken = jwt.sign(
    { email: user.email },
    config.jwt.secret.refreshToken,
    { expiresIn: config.jwt.validity.refreshToken },
  );

  return refreshToken;
}

function generateResetPasswordOtp() {
  return Math.floor(1000 + Math.random() * 9000);
}

function verifyAccessToken(accessToken: string) {
  try {
    return jwt.verify(accessToken, config.jwt.secret.accessToken) as Token;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) return null;
    else if (err instanceof jwt.JsonWebTokenError) return null;
    throw err;
  }
}

function verifyRefreshToken(refreshToken: string) {
  try {
    return jwt.verify(refreshToken, config.jwt.secret.refreshToken) as Token;
  } catch (err) {
    if (err instanceof jwt.TokenExpiredError) return null;
    else if (err instanceof jwt.JsonWebTokenError) return null;
    throw err;
  }
}

const TokenService = {
  generateAccessToken,
  generateRefreshToken,
  generateResetPasswordOtp,
  verifyAccessToken,
  verifyRefreshToken,
};

export default TokenService;
