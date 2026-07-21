/**
 * Anti-spam para formularios públicos (contacto, cotizador).
 *
 * Tres señales, de más a menos confiable:
 *   1. Honeypot — campo oculto que un humano nunca ve ni llena, pero los bots
 *      que rellenan todo el DOM sí. Si viene con contenido → bot. Cero falsos
 *      positivos.
 *   2. Timing — un bot envía en milisegundos; una persona tarda segundos en
 *      escribir. Si el envío llega antes de MIN_FILL_MS desde que cargó el
 *      form → bot.
 *   3. Gibberish — texto aleatorio tipo "aKpJdsXMEfnSwLPqF". Es la red de
 *      seguridad para bots que igual pasan las dos anteriores. Se usa con
 *      criterio estricto en el llamador (exigir que VARIOS campos sean basura)
 *      para no descartar jamás un lead real.
 *
 * Ante spam la estrategia es "silencioso": el llamador devuelve éxito falso
 * (el bot cree que envió) pero NO se manda el correo interno.
 */

/** Nombre del campo trampa. Debe coincidir entre el form y el server action. */
export const HONEYPOT_FIELD = "website";

/** Campo oculto con el timestamp de carga del form (ms epoch). */
export const TIMESTAMP_FIELD = "_ts";

/** Un envío legítimo tarda al menos esto en llegar desde que cargó el form. */
export const MIN_FILL_MS = 3_000;

export type SpamCheck = { spam: false } | { spam: true; reason: string };

/**
 * Chequea honeypot + timing sobre el FormData crudo, antes de validar el
 * esquema. `now` es inyectable para tests.
 */
export function checkHoneypotAndTiming(
  formData: FormData,
  now: number = Date.now(),
): SpamCheck {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return { spam: true, reason: "honeypot" };
  }

  const tsRaw = formData.get(TIMESTAMP_FIELD);
  const ts = typeof tsRaw === "string" ? Number(tsRaw) : NaN;
  // Si el timestamp es válido y el envío llegó demasiado rápido → bot.
  // (Si el campo falta o es basura, no bloqueamos por timing.)
  if (Number.isFinite(ts) && ts > 0 && now - ts < MIN_FILL_MS) {
    return { spam: true, reason: "too-fast" };
  }

  return { spam: false };
}

/**
 * Heurística de texto aleatorio. Marca una "palabra" larga (≥12 letras) con
 * muy pocas vocales — patrón de spam generado al azar. El español real, incluso
 * palabras largas ("personalización", "responsabilidad"), tiene ~40-50% de
 * vocales, muy por encima del umbral.
 */
export function looksLikeGibberish(text: string): boolean {
  const words = text.split(/\s+/).filter(Boolean);
  for (const word of words) {
    const letters = word.replace(/[^a-zA-ZáéíóúñüÁÉÍÓÚÑÜ]/g, "");
    if (letters.length < 12) continue;
    const vowels = (letters.match(/[aeiouyáéíóúAEIOUYÁÉÍÓÚ]/g) || []).length;
    if (vowels / letters.length < 0.22) return true;
  }
  return false;
}
