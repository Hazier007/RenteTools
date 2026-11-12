// Dunne wrapper rond de Resend REST API (https://resend.com/docs/api-reference).
// Bewust zonder SDK: één fetch per call houdt de Vercel-functie klein.
//
// Omgevingsvariabelen (Vercel-project interesten-be, zie README.md):
//   RESEND_API_KEY      verplicht om te mailen; ontbreekt hij, dan antwoordt de
//                       lead-route netjes met 503 en blijft de PDF lokaal downloadbaar.
//   RESEND_AUDIENCE_ID  id van de Resend-"audience" (sinds 2025 "segment" genoemd)
//                       waarin nieuwe leads terechtkomen; RESEND_SEGMENT_ID is een alias.
//   RESEND_FROM         afzender, bv. "Interesten.be <aanmaning@interesten.be>" (domein
//                       moet in Resend geverifieerd zijn).
//   RESEND_REPLY_TO     antwoordadres (standaard info@interesten.be).

// RESEND_API_URL is enkel bedoeld voor lokale tests met een nep-Resend (zie docs); laat hem in productie leeg.
const RESEND_API = process.env.RESEND_API_URL?.trim() || "https://api.resend.com";
const TIMEOUT_MS = 10_000;

export interface ResendConfig {
  apiKey: string;
  segmentId: string | null;
  from: string;
  replyTo: string;
}

export function getResendConfig(): ResendConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  return {
    apiKey,
    segmentId: process.env.RESEND_AUDIENCE_ID?.trim() || process.env.RESEND_SEGMENT_ID?.trim() || null,
    from: process.env.RESEND_FROM?.trim() || "Interesten.be <aanmaning@interesten.be>",
    replyTo: process.env.RESEND_REPLY_TO?.trim() || "info@interesten.be",
  };
}

export function isResendGeconfigureerd(): boolean {
  return getResendConfig() !== null;
}

export interface ResendResultaat {
  ok: boolean;
  status: number;
  id?: string;
  error?: string;
}

async function resendPost(config: ResendConfig, pad: string, body: unknown): Promise<ResendResultaat> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const res = await fetch(`${RESEND_API}${pad}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const tekst = await res.text();
    let data: any = null;
    try {
      data = tekst ? JSON.parse(tekst) : null;
    } catch {
      data = null;
    }
    if (!res.ok) {
      return { ok: false, status: res.status, error: data?.message || data?.name || tekst.slice(0, 200) || res.statusText };
    }
    return { ok: true, status: res.status, id: data?.id };
  } catch (error: any) {
    return { ok: false, status: 0, error: error?.name === "AbortError" ? "timeout" : error?.message || "netwerkfout" };
  } finally {
    clearTimeout(timer);
  }
}

export interface NieuwContact {
  email: string;
  firstName?: string;
  lastName?: string;
  properties?: Record<string, string>;
}

/**
 * Maakt het contact aan en voegt het meteen toe aan het segment (audience).
 * Een bestaand e-mailadres levert bij Resend een 4xx op; dat behandelen we als
 * "al ingeschreven" en niet als fout voor de gebruiker.
 */
export async function voegContactToe(config: ResendConfig, contact: NieuwContact): Promise<ResendResultaat> {
  const body: Record<string, unknown> = {
    email: contact.email,
    unsubscribed: false,
  };
  if (contact.firstName) body.first_name = contact.firstName;
  if (contact.lastName) body.last_name = contact.lastName;
  if (contact.properties && Object.keys(contact.properties).length > 0) body.properties = contact.properties;
  if (config.segmentId) body.segments = [{ id: config.segmentId }];

  const resultaat = await resendPost(config, "/contacts", body);
  if (!resultaat.ok && resultaat.status === 409) {
    return { ok: true, status: 409, error: "bestaat al" };
  }
  return resultaat;
}

export interface EmailBijlage {
  filename: string;
  /** Base64-gecodeerde inhoud. */
  content: string;
  contentType?: string;
}

export interface TeVersturenEmail {
  to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailBijlage[];
  tags?: Array<{ name: string; value: string }>;
}

export async function verstuurEmail(config: ResendConfig, mail: TeVersturenEmail): Promise<ResendResultaat> {
  const body: Record<string, unknown> = {
    from: config.from,
    to: [mail.to],
    reply_to: config.replyTo,
    subject: mail.subject,
    html: mail.html,
    text: mail.text,
  };
  if (mail.attachments?.length) {
    body.attachments = mail.attachments.map((a) => ({
      filename: a.filename,
      content: a.content,
      ...(a.contentType ? { content_type: a.contentType } : {}),
    }));
  }
  if (mail.tags?.length) body.tags = mail.tags;
  return resendPost(config, "/emails", body);
}
