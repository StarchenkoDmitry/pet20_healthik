import { Request, Response } from 'express';
import { hash, compare } from 'bcrypt';
import { randomBytes } from 'crypto';
import { COOKIE_SESSION_TOKEN_KEY } from 'src/common/constants/session';
import {
  PASSWORD_SALT_ROUNDS,
  SESSION_TOKEN_LENGTH,
} from 'src/config/auth';

export function setCookieSession(res: Response, value: string) {
  res.cookie(COOKIE_SESSION_TOKEN_KEY, value, {
    signed: true,
  });
}

export function clearCookieSession(res: Response) {
  res.clearCookie(COOKIE_SESSION_TOKEN_KEY);
}

export function getCookieSession(req: Request) {
  const str = req.signedCookies[COOKIE_SESSION_TOKEN_KEY];
  if (typeof str === 'string') {
    return str;
  } else return null;
}

export function generateRandomSessionToken(): string {
  return randomBytes(SESSION_TOKEN_LENGTH).toString('hex');
}

export async function hashPassword(
  plaintextPassword: string,
): Promise<string> {
  return await hash(plaintextPassword, PASSWORD_SALT_ROUNDS);
}

export async function comparePassword(
  plaintextPassword: string,
  hash: string,
): Promise<boolean> {
  return await compare(plaintextPassword, hash);
}
