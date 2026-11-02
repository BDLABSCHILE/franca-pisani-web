import { createHash, createHmac } from "node:crypto";
import { cookies } from "next/headers";

import { canalDeOrigen, COOKIE_ORIGEN, leerOrigen } from "./origen-visita";

/**
 * Lleva cada cotización y contacto del sitio al CRM de Ropa Publicitaria en la
 * plataforma (plataforma.bdlabs.cl), con el anuncio que trajo la visita.
 *
 * Misma puerta y misma firma que el cotizador de Maca (bdlabs.cl):
 * `Rovle-Firma: t=…,v1=HMAC-SHA256(secreto, "rovle-cotizacion\n" + t + "\n" +
 * sha256(cuerpo))`, con `etapa: "lead"` para que la tarjeta nazca en Lead.
 * Env en Vercel: `RPC_OS_URL` y `RPC_OS_SECRETO`. Sin ellas no se registra nada
 * y el formulario funciona igual: la medición nunca bota un lead.
 */
export type SolicitudSitio = {
  tipo: "Solicitud web" | "Contacto web";
  numero: string;
  empresa: string;
  rut?: string;
  contacto: { nombre: string; correo: string; telefono?: string | null };
  montoNeto?: number;
  detalle?: string;
};

export async function registrarSolicitudEnOs(s: SolicitudSitio): Promise<void> {
  const url = process.env.RPC_OS_URL?.trim();
  const secreto = process.env.RPC_OS_SECRETO?.trim();
  if (!url || !secreto) return;
  try {
    const origen = leerOrigen((await cookies()).get(COOKIE_ORIGEN)?.value);
    const cuerpo = JSON.stringify({
      etapa: "lead",
      tipo: s.tipo,
      numero: s.numero.slice(0, 40),
      empresa: s.empresa.slice(0, 160),
      rut: s.rut ?? "",
      contacto: { nombre: s.contacto.nombre, correo: s.contacto.correo, telefono: s.contacto.telefono ?? "" },
      montoNeto: Math.max(0, Math.round(s.montoNeto ?? 0)),
      canal: canalDeOrigen(origen),
      detalle: (s.detalle ?? "").slice(0, 1500),
      origen,
    });
    const t = String(Date.now());
    const huella = createHash("sha256").update(cuerpo).digest("hex");
    const v1 = createHmac("sha256", secreto).update(`rovle-cotizacion\n${t}\n${huella}`).digest("hex");
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Rovle-Firma": `t=${t},v1=${v1}` },
      body: cuerpo,
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) console.error("[crm-os]", s.numero, res.status, ((await res.json().catch(() => ({}))) as { error?: string }).error ?? "");
  } catch (e) {
    console.error("[crm-os]", s.numero, e instanceof Error ? e.message : "error");
  }
}
