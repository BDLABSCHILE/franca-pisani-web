/**
 * De qué anuncio llegó la visita (pedido de Benja, 02-11-2026: trazabilidad
 * real de la pauta de Ropa Publicitaria).
 *
 * Al llegar al sitio con un clic de anuncio (gclid/gbraid/wbraid de Google,
 * fbclid de Meta) o con parámetros UTM, se guarda una cookie propia por 90
 * días. Las cotizaciones y los contactos la leen en el servidor y la mandan al
 * CRM de la plataforma junto con el lead: cuando Laudus factura a ese RUT, la
 * venta vuelve al anuncio que la trajo.
 *
 * Regla de reemplazo: el ÚLTIMO clic de anuncio manda (como cuenta Google), y
 * una visita sin parámetros nunca borra un clic guardado.
 */

export const COOKIE_ORIGEN = "rpc_origen";
const DIAS = 90;

export type OrigenVisita = {
  gclid?: string; gbraid?: string; wbraid?: string; fbclid?: string;
  utmSource?: string; utmMedium?: string; utmCampaign?: string; utmTerm?: string; utmContent?: string;
  pagina?: string; referente?: string; clicEn: string;
};

const PARAMETROS: Array<[string, keyof OrigenVisita]> = [
  ["gclid", "gclid"], ["gbraid", "gbraid"], ["wbraid", "wbraid"], ["fbclid", "fbclid"],
  ["utm_source", "utmSource"], ["utm_medium", "utmMedium"], ["utm_campaign", "utmCampaign"],
  ["utm_term", "utmTerm"], ["utm_content", "utmContent"],
];

/** Lee la URL de llegada; `null` si no trae nada de pauta. */
export function origenDeUrl(url: URL, referente: string, ahora = new Date()): OrigenVisita | null {
  const o: OrigenVisita = { clicEn: ahora.toISOString() };
  let algo = false;
  for (const [param, campo] of PARAMETROS) {
    const v = url.searchParams.get(param)?.trim();
    if (v) { (o as Record<string, string>)[campo] = v.slice(0, 300); algo = true; }
  }
  if (!algo) return null;
  o.pagina = `${url.origin}${url.pathname}`.slice(0, 500);
  if (referente && !referente.startsWith(url.origin)) o.referente = referente.slice(0, 500);
  return o;
}

/** Solo en el navegador: guarda el clic de la URL actual, si lo hay. */
export function guardarOrigenDeLaVisita(): void {
  try {
    const o = origenDeUrl(new URL(location.href), document.referrer);
    if (!o) return;
    const valor = encodeURIComponent(JSON.stringify(o));
    document.cookie = `${COOKIE_ORIGEN}=${valor}; Max-Age=${DIAS * 86_400}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  } catch { /* Sin cookies el sitio funciona igual; solo se pierde el origen. */ }
}

/** Servidor: valor crudo de la cookie → origen, o `null` si no sirve. */
export function leerOrigen(crudo: string | undefined): OrigenVisita | null {
  if (!crudo) return null;
  try {
    const o = JSON.parse(decodeURIComponent(crudo)) as OrigenVisita;
    if (!o || typeof o !== "object" || typeof o.clicEn !== "string") return null;
    return o;
  } catch { return null; }
}

/**
 * Referencia que viaja escrita en el mensaje de WhatsApp (pedido de Benja,
 * 09-11-2026). WhatsApp no deja pasar UTM, así que el origen va en el texto:
 * Maca lo ve en el primer mensaje y marca el canal correcto en el cotizador
 * («¿Cómo llegó?»). Solo dice lo que trae la URL de llegada; nunca adivina.
 */
export function referenciaWhatsApp(o: OrigenVisita | null): string {
  const canal = canalDeOrigen(o);
  if (canal === "Web / formulario") return "(Ref. web)";
  const campana = (o?.utmCampaign ?? "").replace(/[^\p{L}\p{N} _.|-]/gu, "").slice(0, 40).trim();
  return `(Ref. web · ${canal}${campana ? ` · ${campana}` : ""})`;
}

/** Agrega la referencia al texto del link de WhatsApp (o lo crea si el link no traía mensaje). */
export function linkWhatsAppConReferencia(href: string, o: OrigenVisita | null): string {
  try {
    const url = new URL(href);
    const texto = url.searchParams.get("text") ?? "Hola, quiero cotizar.";
    if (/\(Ref\. web/.test(texto)) return href;
    url.searchParams.set("text", `${texto}\n\n${referenciaWhatsApp(o)}`);
    return url.toString();
  } catch { return href; }
}

/** Navegador: lee la cookie del clic guardado (o `null`). */
export function origenGuardado(): OrigenVisita | null {
  try {
    const par = document.cookie.split("; ").find((c) => c.startsWith(`${COOKIE_ORIGEN}=`));
    return leerOrigen(par?.slice(COOKIE_ORIGEN.length + 1));
  } catch { return null; }
}

/** El canal del CRM (mismos nombres que el cotizador de Maca). Nunca adivina más allá de lo que dice la URL. */
export function canalDeOrigen(o: OrigenVisita | null): string {
  if (!o) return "Web / formulario";
  const fuente = (o.utmSource ?? "").toLowerCase();
  if (o.gclid || o.gbraid || o.wbraid || (fuente === "google" && /cpc|ppc|paid/i.test(o.utmMedium ?? ""))) return "Google Ads";
  if (o.fbclid || ["facebook", "fb", "instagram", "ig", "meta"].includes(fuente)) return "Meta Ads";
  return "Web / formulario";
}
