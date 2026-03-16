import { NextResponse } from "next/server";
import { buildClearCookieHeader } from "@/lib/auth/session";

export async function POST() {
  const response = NextResponse.redirect(new URL("/platform/auth/login", process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000"));
  response.headers.set("Set-Cookie", buildClearCookieHeader());
  return response;
}
