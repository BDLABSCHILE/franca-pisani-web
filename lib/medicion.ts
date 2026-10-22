/**
 * Medición de lo que importa en el sitio: cotizaciones y contactos, no visitas.
 *
 * Cada evento sale por tres lados, y cada uno se enciende solo si existe su ID:
 *  - dataLayer (siempre): lo lee cualquier contenedor de GTM que tenga el sitio.
 *  - Google Ads (NEXT_PUBLIC_GOOGLE_ADS_ID + la etiqueta de conversión de cada
 *    evento): la cuenta nueva que administra BDLABS desde nov-2026.
 *  - Meta Pixel (NEXT_PUBLIC_META_PIXEL_ID): Lead o Contact, para la pauta de Meta.
 * Sin IDs no se carga nada externo: los eventos quedan solo en el dataLayer.
 */

export type EventoMedido = "cotizacion_enviada" | "contacto_enviado" | "clic_whatsapp" | "clic_correo";

export const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";

/** Etiqueta de conversión de Google Ads por evento (la parte después de la barra en «AW-123/abc»). */
const ETIQUETAS_ADS: Record<EventoMedido, string> = {
  cotizacion_enviada: process.env.NEXT_PUBLIC_ADS_ETIQUETA_COTIZACION ?? "",
  contacto_enviado: process.env.NEXT_PUBLIC_ADS_ETIQUETA_CONTACTO ?? "",
  clic_whatsapp: process.env.NEXT_PUBLIC_ADS_ETIQUETA_WHATSAPP ?? "",
  clic_correo: process.env.NEXT_PUBLIC_ADS_ETIQUETA_CORREO ?? "",
};

/** Las dos que de verdad son una cotización pedida; los clics son intención, no lead. */
const EVENTO_META: Record<EventoMedido, string> = {
  cotizacion_enviada: "Lead",
  contacto_enviado: "Lead",
  clic_whatsapp: "Contact",
  clic_correo: "Contact",
};

type Ventana = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
};

/** `id` evita contar dos veces la misma cotización (Google la deduplica por transaction_id). */
export function medir(evento: EventoMedido, datos: { id?: string; origen?: string } = {}): void {
  if (typeof window === "undefined") return;
  const w = window as Ventana;
  (w.dataLayer ||= []).push({ event: evento, ...datos });
  const etiqueta = ETIQUETAS_ADS[evento];
  if (GOOGLE_ADS_ID && etiqueta && w.gtag) {
    w.gtag("event", "conversion", { send_to: `${GOOGLE_ADS_ID}/${etiqueta}`, ...(datos.id ? { transaction_id: datos.id } : {}) });
  }
  if (META_PIXEL_ID && w.fbq) {
    w.fbq("track", EVENTO_META[evento], { content_name: evento }, datos.id ? { eventID: datos.id } : undefined);
  }
}
