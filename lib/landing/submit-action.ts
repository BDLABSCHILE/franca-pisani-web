"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactInquiry } from "@/emails/ContactInquiry";
import { CONTACT } from "@/lib/brand/contacts";
import { registrarSolicitudEnOs } from "@/lib/crm-os";
import { checkHoneypotAndTiming, looksLikeGibberish } from "@/lib/anti-spam";

/**
 * Formulario de los anuncios de Leads (27-11-2026): reemplaza la landing de
 * Mailchimp «Captación de clientes», que guardaba ~2-3 empresas al día en una
 * lista que nadie miraba. Mismos campos que esa landing. Cada envío:
 *  1. entra al CRM de la plataforma como Lead (con el anuncio de la cookie),
 *  2. le llega a Maca a hola@ropapublicitariachile.cl (Responder = el cliente),
 *  3. dispara `Lead` en el píxel (lo hace el componente al recibir ok).
 */

const PRODUCTOS = ["Poleras", "Polerones", "Chaquetas", "Camisas", "Jockeys", "Polar", "Pantalones", "Otro"] as const;

const Schema = z.object({
  name: z.string().trim().min(2, "Ingresa tu nombre").max(80),
  phone: z.string().trim().min(8, "Ingresa tu celular").max(40),
  email: z.string().trim().email("Email inválido"),
  company: z.string().trim().min(2, "Ingresa tu empresa").max(120),
  product: z.enum(PRODUCTOS, { message: "Elige qué quieres cotizar" }),
  quantity: z.coerce.number({ message: "Indica cuántas unidades" }).int().min(10, "Mínimo 10 unidades").max(100000),
  notes: z.string().trim().max(1500).optional().transform((v) => (v ? v : null)),
});

export type LandingResult =
  | { ok: true; id: string }
  | { ok: false; errors: Record<string, string>; formError?: string };

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL || "cotizaciones@ropapublicitariachile.cl";
const RESEND_INTERNAL_EMAIL = process.env.RESEND_INTERNAL_EMAIL || CONTACT.email;

export async function submitLandingAction(_prev: LandingResult | null, formData: FormData): Promise<LandingResult> {
  const signal = checkHoneypotAndTiming(formData);
  if (signal.spam) return { ok: true, id: "" };

  const parsed = Schema.safeParse({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    company: formData.get("company"),
    product: formData.get("product"),
    quantity: formData.get("quantity"),
    notes: formData.get("notes") || undefined,
  });
  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const i of parsed.error.issues) {
      const k = i.path[0];
      if (typeof k === "string" && !errors[k]) errors[k] = i.message;
    }
    return { ok: false, errors };
  }
  const d = parsed.data;
  if (looksLikeGibberish(d.name) && looksLikeGibberish(d.company)) return { ok: true, id: "" };

  const ahora = new Date();
  const id = `F-${ahora.toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const pedido = `${d.quantity} × ${d.product}`;

  await registrarSolicitudEnOs({
    tipo: "Formulario anuncio",
    numero: id,
    empresa: d.company,
    contacto: { nombre: d.name, correo: d.email, telefono: d.phone },
    detalle: `Quiere cotizar: ${pedido}.${d.notes ? ` ${d.notes}` : ""}`,
  });

  if (!RESEND_API_KEY) return { ok: true, id };
  try {
    const r = await new Resend(RESEND_API_KEY).emails.send({
      from: `Ropa Publicitaria Chile <${RESEND_FROM_EMAIL}>`,
      to: RESEND_INTERNAL_EMAIL,
      replyTo: d.email,
      subject: `[Lead] ${d.name} · ${d.company} — ${pedido}`,
      react: ContactInquiry({
        name: d.name,
        email: d.email,
        company: d.company,
        phone: d.phone,
        message: `Quiere cotizar: ${pedido}${d.notes ? `\n\n${d.notes}` : ""}\n\nLlegó por el formulario de los anuncios (ropapublicitariachile.cl/cotiza-empresa).`,
        submittedAt: ahora,
      }),
    });
    if (r.error) console.error("[submitLandingAction] resend", r.error);
  } catch (e) {
    console.error("[submitLandingAction] resend", e instanceof Error ? e.message : e);
  }
  // El lead ya quedó en el CRM aunque el correo falle: nunca se le dice al cliente que falló.
  return { ok: true, id };
}
