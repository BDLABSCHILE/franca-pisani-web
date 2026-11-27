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
    /*
     * ⚠️ 26-11-2026: al cambiar los anuncios a esta página, el revisor de Meta la
     * abrió ~190 veces en 25 min (incluso desde anuncios PAUSADOS): cada visita
     * creaba un código y un «Lead» falso que Meta usa para optimizar. Un clic
     * real de un anuncio de Meta llega en el navegador de Instagram o Facebook;
     * un robot no. Solo se cuenta a quien sí parece persona.
     */
    const ua = navigator.userAgent;
    const params = new URLSearchParams(location.search);
    const desdeMeta = params.has("fbclid") || /^(meta|fb|facebook|ig|instagram)$/i.test(params.get("utm_source") ?? "");
    const enAppMeta = /Instagram|FBAN|FBAV|FB_IAB|FBIOS|Messenger/i.test(ua);
    const robot = navigator.webdriver || /bot|crawl|spider|facebookexternalhit|facebookcatalog|Headless|Lighthouse|Preview/i.test(ua);
    const contar = !robot && (!desdeMeta || enAppMeta);
    if (robot) return;

    /*
     * 27-11-2026: Instagram precarga la página antes de que la persona toque el
     * anuncio (ráfagas de 6 registros en el mismo minuto, nadie escribiendo).
     * Se cuenta y se abre WhatsApp SOLO cuando la página está de verdad en
     * pantalla, y una sola vez por pestaña.
     */
    let hecho = false;
    let t: number | undefined;
    const arrancar = () => {
      const doc = document as Document & { prerendering?: boolean };
      if (hecho || doc.prerendering || document.visibilityState !== "visible") return;
      hecho = true;
      let codigo: string | undefined;
      try { codigo = sessionStorage.getItem("rpc_wa_codigo") ?? undefined; } catch { /* sin storage */ }
      const nuevo = contar && !codigo;
      if (nuevo) {
        codigo = nuevoCodigoWhatsApp();
        try { sessionStorage.setItem("rpc_wa_codigo", codigo); } catch { /* sin storage */ }
      }
      const destino = linkWhatsAppConReferencia(CONTACT_LINKS.whatsappWithMessage(MENSAJE), origenGuardado(), contar ? codigo : undefined);
      setLink(destino);
      if (nuevo && codigo) {
        try {
          navigator.sendBeacon("/api/whatsapp-ref", new Blob([JSON.stringify({ ref: codigo })], { type: "application/json" }));
        } catch { /* la medición nunca frena el WhatsApp */ }
      }
      // Primero que el píxel reciba el Lead (espera a que cargue), después un respiro y al chat.
      const medido = nuevo && codigo ? medir("whatsapp_anuncio", { id: codigo, origen: "/whatsapp" }) : Promise.resolve();
      void medido.then(() => { t = window.setTimeout(() => { window.location.href = destino; }, 400); });
    };
    arrancar();
    document.addEventListener("visibilitychange", arrancar);
    document.addEventListener("prerenderingchange", arrancar);
    return () => {
      document.removeEventListener("visibilitychange", arrancar);
      document.removeEventListener("prerenderingchange", arrancar);
      if (t) window.clearTimeout(t);
    };
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
