"use server";

import { contactSchema } from "@/lib/schemas/contact";
import nodemailer from "nodemailer";

const parse = (input: unknown) => {
  const r = contactSchema.safeParse(input);
  if (!r.success) {
    const issues = r.error.issues.map(i => `${i.path.join(".")}: ${i.message}`);
    throw new Error(`ValidationError: ${issues.join(" | ")}`);
  }
  return r.data;
};

const abortableFetch = async (url: string, init: RequestInit, ms = 10_000) => {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), ms);
  try {
    const res = await fetch(url, { ...init, signal: ac.signal, cache: "no-store" });
    return res;
  } finally {
    clearTimeout(t);
  }
};

const esc = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");


export async function sendDiscordWebhookAction(raw: unknown) {
  const data = parse(raw);

  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) throw new Error("Missing DISCORD_WEBHOOK_URL");

  // Opcional: branding
  const username = process.env.DISCORD_WEBHOOK_USERNAME || "Contacto Web";
  const avatar_url = process.env.DISCORD_WEBHOOK_AVATAR || undefined;
  const color = 0x5865F2; // Discord blurple

  // Utilidades
  const escMd = (s: string) =>
    s.replaceAll("<", "\\<").replaceAll(">", "\\>").replaceAll("|", "\\|");
  const trunc = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
  const nowIso = new Date().toISOString();

  // Cuerpo “bonito” y legible
  const embeds = [
    {
      title: trunc(`📩 ${data.asunto}`, 256),
      description: trunc(
        [
          `> ${escMd(data.message).split("\n").join("\n> ")}`,
          "",
          `**Remitente:** ${escMd(data.names)}`,
        ].join("\n"),
        4000
      ),
      color,
      timestamp: nowIso,
      author: {
        name: `${data.names}  •  ${data.email}`,
      },
      fields: [
        { name: "Email", value: escMd(data.email), inline: true },
        { name: "Teléfono", value: escMd(data.phone ?? "N/D"), inline: true },
        { name: "Fecha", value: nowIso, inline: false },
      ],
      footer: {
        text: "Formulario de contacto",
      },
    },
  ];

  // Evita @here/@everyone
  const allowed_mentions = { parse: [] as string[] };

  const body = {
    username,
    avatar_url,
    content: "", // vacío; todo en el embed
    embeds,
    allowed_mentions,
  };

  // Envío con manejo simple de rate limit (reintento único)
  const sendOnce = () =>
    abortableFetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

  let res = await sendOnce();
  if (res.status === 429) {
    const j = await res.json().catch(() => ({} as unknown));
    const wait = Math.min(Number(j?.retry_after ?? 1_000) * 1000, 5_000);
    await new Promise((r) => setTimeout(r, isFinite(wait) ? wait : 1_000));
    res = await sendOnce();
  }

  if (!res.ok && res.status !== 204) {
    const text = await res.text().catch(() => "");
    throw new Error(`DiscordWebhookError: ${res.status} ${res.statusText} ${text}`);
  }

  return { ok: true as const, via: "discord" as const };
}

export async function sendEmailAction(raw: unknown) {
  const data = parse(raw);

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_FROM,
    SMTP_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !SMTP_FROM || !SMTP_TO) {
    throw new Error("Missing SMTP envs: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, SMTP_TO");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const subject = `Contacto: ${data.asunto} — ${data.names}`;
  const text = [
    `Nuevo mensaje de contacto`,
    `Fecha: ${new Date().toISOString()}`,
    `Nombre: ${data.names}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone ?? "N/D"}`,
    `Asunto: ${data.asunto}`,
    `Mensaje:`,
    data.message,
  ].join("\n");

  const html = `
    <h2>Nuevo mensaje de contacto</h2>
    <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
    <p><strong>Nombre:</strong> ${esc(data.names)}</p>
    <p><strong>Email:</strong> ${esc(data.email)}</p>
    <p><strong>Teléfono:</strong> ${esc(data.phone ?? "N/D")}</p>
    <p><strong>Asunto:</strong> ${esc(data.asunto)}</p>
    <p><strong>Mensaje:</strong></p>
    <pre style="white-space:pre-wrap">${esc(data.message)}</pre>
  `;

  const info = await transporter.sendMail({
    from: SMTP_FROM,
    to: SMTP_TO,
    replyTo: data.email,
    subject,
    text,
    html,
  });

  if (!info.messageId) throw new Error("EmailError: messageId vacío");

  return { ok: true as const, via: "smtp" as const, id: info.messageId };
}
