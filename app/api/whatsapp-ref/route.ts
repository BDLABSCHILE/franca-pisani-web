import { registrarClicWhatsAppEnOs } from "@/lib/crm-os";

/** Recibe el código del clic al WhatsApp (sendBeacon) y lo registra en el CRM con el origen de la cookie. */
export async function POST(req: Request): Promise<Response> {
  try {
    const texto = await req.text();
    if (texto.length > 200) return new Response(null, { status: 413 });
    const ref = String((JSON.parse(texto) as { ref?: unknown }).ref ?? "");
    await registrarClicWhatsAppEnOs(ref);
  } catch { /* nunca bota nada: el WhatsApp ya se abrió */ }
  return new Response(null, { status: 204 });
}
