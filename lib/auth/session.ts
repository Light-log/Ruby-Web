// ─── Session & Auth Utilities ─────────────────────────────────────────────────

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET ?? "change-this-secret-in-production-min-32-chars"
);

const COOKIE_NAME = "platform_session";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface SessionPayload {
  userId: string;
  email: string;
  isSuperAdmin: boolean;
  companyId?: string;
  companySlug?: string;
  role?: "SUPER_ADMIN" | "ADMIN" | "AGENT" | "VIEWER";
  expiresAt: string;
}

export async function createSession(payload: Omit<SessionPayload, "expiresAt">): Promise<string> {
  const expiresAt = new Date(Date.now() + COOKIE_MAX_AGE * 1000).toISOString();
  const token = await new SignJWT({ ...payload, expiresAt })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
  return token;
}

export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export function buildSetCookieHeader(token: string): string {
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Lax${
    process.env.NODE_ENV === "production" ? "; Secure" : ""
  }`;
}

export function buildClearCookieHeader(): string {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`;
}
