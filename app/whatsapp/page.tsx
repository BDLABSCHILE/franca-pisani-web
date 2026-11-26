import type { Metadata } from "next";
import { PuenteWhatsApp } from "./PuenteWhatsApp";

export const metadata: Metadata = {
  title: "Cotiza por WhatsApp",
  robots: { index: false, follow: false },
};

/**
 * /whatsapp — puente de los anuncios de Leads (26-11-2026, pedido de Benja:
 * «que le hablen directo a WhatsApp, diciéndole hola vengo de este anuncio y
 * quiero cotizar»). Pasa un instante por el sitio para guardar el clic del
 * anuncio y su código RPC (atribución en el CRM) y abre el WhatsApp de Maca con
 * el mensaje escrito. Los anuncios llegan con utm_* de su campaña.
 */
export default function WhatsAppPage() {
  return <PuenteWhatsApp />;
}
