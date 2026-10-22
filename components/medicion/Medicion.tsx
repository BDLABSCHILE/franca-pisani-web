"use client";

import Script from "next/script";
import { useEffect } from "react";
import { GOOGLE_ADS_ID, META_PIXEL_ID, medir } from "@/lib/medicion";

/**
 * Carga las etiquetas de Google Ads y Meta (solo si tienen ID) y mide los clics
 * a WhatsApp y correo en todo el sitio con un único listener, así ningún botón
 * nuevo queda sin medir por olvidarse de llamar a `medir`.
 */
export function Medicion() {
  useEffect(() => {
    const alClic = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a[href]");
      const href = a?.getAttribute("href") ?? "";
      const origen = location.pathname;
      if (/^https?:\/\/(wa\.me|api\.whatsapp\.com)\//i.test(href)) medir("clic_whatsapp", { origen });
      else if (href.startsWith("mailto:")) medir("clic_correo", { origen });
    };
    document.addEventListener("click", alClic, { capture: true });
    return () => document.removeEventListener("click", alClic, { capture: true });
  }, []);

  return (
    <>
      {GOOGLE_ADS_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} strategy="afterInteractive" />
          <Script id="google-ads" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GOOGLE_ADS_ID}');`}
          </Script>
        </>
      ) : null}
      {META_PIXEL_ID ? (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`}
        </Script>
      ) : null}
    </>
  );
}
