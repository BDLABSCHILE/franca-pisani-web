"use client";

import { useSyncExternalStore } from "react";
import { logoStore } from "@/lib/logo/store";

/**
 * Posición y tamaño del logo en la previsualización del catálogo según el
 * tipo de prenda. Cada producto cae naturalmente en una zona típica:
 *  - Pantalones → muslo izquierdo (más abajo y chico)
 *  - Gorros / accesorios → frente del gorro (más arriba, centrado)
 *  - Resto (poleras, polerones, camisas, softshell, pecheras, mandiles)
 *    → centro-pecho con tamaño parecido al sello real de un bordado/estampado.
 *
 * Coordenadas relativas al cuadrado de la foto, con anclaje centrado
 * (`-translate-x-1/2 -translate-y-1/2`). Pensado para fotos ghost-mannequin
 * 1:1 donde la prenda queda centrada.
 */
type LogoPos = {
  top: string;
  left: string;
  width: string;
};

function logoPositionFor(category: string): LogoPos {
  if (category === "Pantalones") {
    // Muslo izquierdo del pantalón: más arriba (cerca de la cintura) y
    // adentro de la prenda, no en el borde lateral.
    return { top: "38%", left: "44%", width: "10%" };
  }
  if (category === "Camisas y Blusas") {
    // Pecho izquierdo (como bordado de uniforme corporativo), no al centro.
    return { top: "32%", left: "40%", width: "12%" };
  }
  if (category === "Ropa Técnica y Cortavientos") {
    // Mismo criterio que camisas: pecho izquierdo.
    return { top: "32%", left: "40%", width: "12%" };
  }
  if (category === "Jockeys, Gorros y Accesorios") {
    // Frente del gorro: más arriba y centrado.
    return { top: "40%", left: "50%", width: "16%" };
  }
  // Default — poleras, polerones, pecheras, mandiles, chaqueta chef, cofia:
  // centro-pecho (donde típicamente va el estampado grande / pechera completa).
  return { top: "42%", left: "50%", width: "22%" };
}

type Props = {
  category: string;
};

/**
 * Sello del logo del visitante sobre la foto de cada producto del catálogo.
 *
 * Client island chico que se monta dentro del contenedor de imagen del
 * ProductCard (que sigue siendo server-friendly). Lee el logo global desde
 * lib/logo/store.ts vía useSyncExternalStore: si el visitante ya subió su
 * logo (en el banner del catálogo o en cualquier ficha), cada card lo muestra
 * aplicado como referencia visual + un microbadge celeste "Con tu logo".
 *
 * La posición y tamaño dependen de la categoría del producto (ver
 * logoPositionFor). El blend multiply asienta el logo sobre la foto clara
 * sin recuadro blanco. Es solo una previsualización: el mockup real lo
 * confirma el equipo antes de producir.
 */
export function LogoOverlayBadge({ category }: Props) {
  const dataUrl = useSyncExternalStore(
    logoStore.subscribe,
    logoStore.getSnapshot,
    logoStore.getServerSnapshot,
  );

  if (!dataUrl) return null;

  const pos = logoPositionFor(category);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
        style={{ top: pos.top, left: pos.left, width: pos.width }}
      >
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
