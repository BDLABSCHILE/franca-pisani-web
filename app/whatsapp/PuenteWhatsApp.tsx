"use client";

import { useEffect, useState } from "react";
import { CONTACT_LINKS } from "@/lib/brand/contacts";
import { medir } from "@/lib/medicion";
import { guardarOrigenDeLaVisita, linkWhatsAppConReferencia, nuevoCodigoWhatsApp, origenGuardado } from "@/lib/origen-visita";

const MENSAJE = "Hola, vengo del anuncio y quiero cotizar";

export function PuenteWhatsApp() {
  const [link, setLink] = useState(CONTACT_LINKS.whatsappWithMessage(MENSAJE));

  useEffect(() => {
    // Primero la cookie del clic (los efectos del layout corren después que los de la página).
    guardarOrigenDeLaVisita();
    const codigo = nuevoCodigoWhatsApp();
    const destino = linkWhatsAppConReferencia(CONTACT_LINKS.whatsappWithMessage(MENSAJE), origenGuardado(), codigo);
    setLink(destino);
    try {
      navigator.sendBeacon("/api/whatsapp-ref", new Blob([JSON.stringify({ ref: codigo })], { type: "application/json" }));
    } catch { /* la medición nunca frena el WhatsApp */ }
    medir("whatsapp_anuncio", { id: codigo, origen: "/whatsapp" });
    // Un respiro para que salgan el píxel y el registro, y al chat.
    const t = window.setTimeout(() => { window.location.href = destino; }, 700);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-rpc-bg px-6">
      <div className="max-w-md text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-rpc-text/60 sm:text-xs">Ropa Publicitaria Chile</p>
        <h1 className="mt-4 text-3xl leading-tight sm:text-4xl">Te estamos llevando a WhatsApp…</h1>
        <p className="mt-4 text-rpc-text/70">Te responde Maca, de nuestro equipo de ventas. Cuéntale qué necesitas y te cotiza.</p>
        <a
          href={link}
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-rpc-accent px-8 py-3 font-medium text-white"
        >
          Abrir WhatsApp
        </a>
      </div>
    </section>
  );
}
