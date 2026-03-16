import { type NextRequest, NextResponse } from "next/server";
import { createSession, buildSetCookieHeader } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = loginSchema.parse(body);

    // In production: look up user in DB, verify bcrypt hash
    // For now, stub with demo accounts
    const DEMO_USERS = [
      { email: "superadmin@platform.com", password: "admin123", isSuperAdmin: true, userId: "sa-1", name: "Super Admin" },
      { email: "admin@techcorp.com", password: "admin123", isSuperAdmin: false, userId: "a-1", companyId: "comp-1", companySlug: "techcorp", role: "ADMIN" as const, name: "Admin TechCorp" },
      { email: "agent@techcorp.com", password: "agent123", isSuperAdmin: false, userId: "ag-1", companyId: "comp-1", companySlug: "techcorp", role: "AGENT" as const, name: "Agente TechCorp" },
    ];

    const user = DEMO_USERS.find((u) => u.email === email && u.password === password);
    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await createSession({
      userId: user.userId,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      companyId: "companyId" in user ? user.companyId : undefined,
      companySlug: "companySlug" in user ? user.companySlug : undefined,
      role: "role" in user ? user.role : user.isSuperAdmin ? "SUPER_ADMIN" : undefined,
    });

    const response = NextResponse.json({
      ok: true,
      isSuperAdmin: user.isSuperAdmin,
      name: user.name,
    });

    response.headers.set("Set-Cookie", buildSetCookieHeader(token));
    return response;
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
    }
    console.error("[auth/login]", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
