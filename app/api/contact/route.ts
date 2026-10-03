// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 min
const RATE_LIMIT_MAX = 10; // 10 envíos / 10 min por IP (ajusta)

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getIp(req: NextRequest) {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(ip: string) {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now > b.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { ok: true };
  }
  if (b.count >= RATE_LIMIT_MAX) return { ok: false, retryInMs: b.resetAt - now };
  b.count += 1;
  return { ok: true };
}

function mustEnv(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Falta variable de entorno: ${name}`);
  return v;
}

function safe(s: string) {
  return s.replace(/[<>]/g, "");
}

export async function POST(req: NextRequest) {
  const ip = getIp(req);
  const rl = rateLimit(ip);
  if (!rl.ok) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas solicitudes. Intenta más tarde." },
      { status: 429 }
    );
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot anti-bots: si viene lleno, fingimos OK (no enviamos nada)
  if (body?.hp) {
    return NextResponse.json({ ok: true });
  }

  if (body?.consent !== true) {
    return NextResponse.json(
      { ok: false, error: "Debes aceptar la Política de Privacidad para enviar el formulario." },
      { status: 400 }
    );
  }

  const name = safe(String(body?.name ?? "")).trim().slice(0, 120);
  const email = safe(String(body?.email ?? "")).trim().slice(0, 254);
  const company = safe(String(body?.company ?? "")).trim().slice(0, 120);
  const phone = safe(String(body?.phone ?? "")).trim().slice(0, 40);
  const message = safe(String(body?.message ?? "")).trim().slice(0, 5000);
  const consentAt = new Date().toISOString();
  const origin = safe(String(body?.origin ?? "sitio-web")).trim().slice(0, 80);

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Nombre, Email y Mensaje son obligatorios." },
      { status: 400 }
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ ok: false, error: "Email no válido." }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "El mensaje es muy corto (mínimo 10 caracteres)." },
      { status: 400 }
    );
  }

  try {
    const host = mustEnv("SMTP_HOST");
    const port = Number(mustEnv("SMTP_PORT"));
    const user = mustEnv("SMTP_USER");
    const pass = mustEnv("SMTP_PASS");
    const from = mustEnv("SMTP_FROM");
    const to = mustEnv("CONTACT_TO");

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    const sourceLabel = origin === "espana" ? " [España]" : origin === "us" ? " [U.S.]" : "";
    const subject = `Nuevo contacto${sourceLabel} — ${name}${company ? ` (${company})` : ""}`;

    const text = [
      `Nombre: ${name}`,
      `Email: ${email}`,
      `Empresa: ${company || "-"}`,
      `Teléfono: ${phone || "-"}`,
      `Origen: ${origin || "sitio-web"}`,
      `Consentimiento de privacidad: aceptado (${consentAt})`,
      "",
      "Mensaje:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Arial">
        <h2 style="margin:0 0 12px">Nuevo contacto</h2>
        <p><b>Nombre:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Empresa:</b> ${company || "-"}</p>
        <p><b>Teléfono:</b> ${phone || "-"}</p>
        <p><b>Origen:</b> ${origin || "sitio-web"}</p>
        <p><b>Consentimiento de privacidad:</b> aceptado (${consentAt})</p>
        <hr style="border:none;border-top:1px solid #eee;margin:16px 0" />
        <p style="white-space:pre-wrap">${message}</p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact] envío fallido:", e);
    return NextResponse.json(
      { ok: false, error: "No se pudo enviar el mensaje. Escríbenos a soporte@devruby.org o por WhatsApp." },
      { status: 500 }
    );
  }
}
