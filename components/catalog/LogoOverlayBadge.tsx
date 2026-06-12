"use client";

import { useSyncExternalStore } from "react";
import { logoStore } from "@/lib/logo/store";

/**
 * Sello del logo del visitante sobre la foto de cada producto del catálogo.
 *
 * Client island chico que se monta dentro del contenedor de imagen del
 * ProductCard (que sigue siendo server-friendly). Lee el logo global desde
 * lib/logo/store.ts vía useSyncExternalStore: si el visitante ya subió su
 * logo (en el banner del catálogo o en cualquier ficha), cada card lo muestra
 * aplicado como referencia visual + un microbadge celeste "Con tu logo".
 *
 * El blend multiply asienta el logo sobre la foto clara del producto sin
 * recuadro blanco. Es solo una previsualización: el mockup real lo confirma
 * el equipo antes de producir.
 */
export function LogoOverlayBadge() {
  const dataUrl = useSyncExternalStore(
    logoStore.subscribe,
    logoStore.getSnapshot,
    logoStore.getServerSnapshot,
  );

  if (!dataUrl) return null;

  return (
    <>
      {/* Logo posicionado a la altura del pecho (levemente sobre el centro),
          máx ~22% del ancho de la foto para que se lea como aplicación real
          y no como marca de agua. pointer-events-none: el card sigue siendo
          un link clickeable completo. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] w-[22%] -translate-x-1/2 -translate-y-1/2"
      >
        {/* Data URL local → <img> nativo (next/image no aplica aquí). */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt=""
          className="h-auto max-h-full w-full object-contain opacity-85 mix-blend-multiply"
        />
      </div>

      <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-rpc-info px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-white">
        Con tu logo
      </span>
    </>
  );
}
