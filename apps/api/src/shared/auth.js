import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

function requireJwtSecret() {
  const secret = env?.jwt?.secret;
  if (!secret) throw new Error("JWT secret is missing. Set env.jwt.secret (JWT_SECRET).");
  return secret;
}

function getExpiresIn() {
  return env?.jwt?.expiresIn || "7d";
}

export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password, hash) {
  return bcrypt.compare(password, hash);
}

export function generateToken(payloadOrUserId) {
  const secret = requireJwtSecret();
  const expiresIn = getExpiresIn();

  const payload =
    typeof payloadOrUserId === "object"
      ? payloadOrUserId
      : { id: payloadOrUserId };

  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token) {
  try {
    const secret = requireJwtSecret();
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}

export function decodeToken(token) {
  try {
    return jwt.decode(token);
  } catch {
    return null;
  }
}
