import Link from "next/link";

/**
 * Hero de Ropa Publicitaria Chile.
 *
 * Izquierda: titular grande Archivo bold + modelo dual (stock express +
 * fabricación a medida) + CTA dual. Derecha: composición CSS con el rombo
 * coral del logo como motivo gráfico — sin fotos inventadas; cuando el
 * cliente entregue fotografía real de fábrica/productos se reemplaza.
 *
 * Abajo: strip de categorías reales del cliente linkeando al catálogo.
 */

// Categorías reales del sitio del cliente — mismos strings que usa
// lib/shopify/mock.ts y el filtro ?category= de /catalogo.
const CATEGORIES = [
  "Poleras",
  "Polerones y Polar",
  "Camisas",
  "Pantalones y Ropa Técnica",
  "Jockeys y Gorros",
  "Merchandising",
] as const;

const TECHNIQUES = ["Bordado", "Serigrafía", "Transfer DTF", "Sublimación"] as const;

export function Hero() {
  return (
    <section className="border-b border-rpc-border bg-rpc-bg">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:py-24">
        {/* Columna de texto */}
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-rpc-info/10 px-4 py-1.5 text-xs font-semibold text-rpc-info-dark">
            <span aria-hidden className="inline-block h-2 w-2 rotate-45 bg-rpc-accent" />
            Fabricantes desde 1982 · Recoleta, Santiago
          </p>

          <h1 className="mt-6 max-w-xl text-4xl leading-[1.02] tracking-tight sm:text-5xl lg:text-6xl">
            Tu marca, puesta en la ropa de{" "}
            <span className="text-rpc-accent-dark">tu equipo</span>.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-rpc-text/75 sm:text-lg">
            Más de 40 años fabricando vestuario corporativo y merchandising.
            Stock express en Chile para pedidos con poco plazo, y fabricación
            a medida en nuestras fábricas en Oriente para proyectos especiales,
            con asesoría de diseño.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center gap-2 rounded-rpc-button bg-rpc-accent px-8 py-4 text-sm font-semibold text-white transition hover:bg-rpc-accent-dark"
            >
              Explorar catálogo
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-rpc-button border border-rpc-text px-8 py-4 text-sm font-semibold text-rpc-text transition hover:bg-rpc-text hover:text-white"
            >
              Sube tu logo y pruébalo
            </Link>
          </div>

          <p className="mt-6 text-sm text-rpc-text/55">
            Cotiza sin compromiso · Te respondemos en menos de 24 horas
          </p>
        </div>

        {/* Composición gráfica: rombo coral del logo como protagonista */}
        <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-md lg:block">
          {/* Disco de superficie de fondo */}
          <div className="absolute inset-8 rounded-full bg-rpc-surface" />

          {/* Rombo outline celeste, atrás a la izquierda */}
          <div className="absolute left-[8%] top-[14%] h-24 w-24 rotate-45 rounded-2xl border-2 border-rpc-info" />

          {/* Rombo coral central con los 40+ años */}
          <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-[56%] rotate-45 items-center justify-center rounded-[28px] bg-rpc-accent shadow-xl shadow-rpc-accent/25">
            <p className="-rotate-45 text-center font-rpc-heading leading-none text-white">
              <span className="block text-5xl font-bold">40+</span>
              <span className="mt-2 block text-sm font-semibold">años fabricando</span>
            </p>
          </div>

          {/* Banda celeste — guiño a la banda CHILE del logo */}
          <div className="absolute bottom-[21%] left-1/2 h-3 w-60 -translate-x-1/2 rounded-full bg-rpc-info" />

          {/* Rombo chico relleno, abajo a la derecha */}
          <div className="absolute bottom-[8%] right-[12%] h-12 w-12 rotate-45 rounded-lg bg-rpc-text" />

          {/* Chips flotantes con las técnicas reales */}
          <span className="absolute right-[2%] top-[10%] rounded-full border border-rpc-border bg-rpc-bg px-4 py-1.5 text-xs font-semibold text-rpc-text shadow-sm">
            {TECHNIQUES[0]}
          </span>
          <span className="absolute -left-[2%] top-[52%] rounded-full border border-rpc-border bg-rpc-bg px-4 py-1.5 text-xs font-semibold text-rpc-text shadow-sm">
            {TECHNIQUES[1]}
          </span>
          <span className="absolute right-[0%] top-[48%] rounded-full border border-rpc-border bg-rpc-bg px-4 py-1.5 text-xs font-semibold text-rpc-text shadow-sm">
            {TECHNIQUES[2]}
          </span>
          <span className="absolute bottom-[4%] left-[16%] rounded-full border border-rpc-border bg-rpc-bg px-4 py-1.5 text-xs font-semibold text-rpc-text shadow-sm">
            {TECHNIQUES[3]}
          </span>
        </div>
      </div>

      {/* Strip de categorías reales → catálogo filtrado */}
      <div className="border-t border-rpc-border bg-rpc-surface">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-6 py-5 lg:px-10">
          <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-rpc-text/50">
            Catálogo
          </span>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/catalogo?category=${encodeURIComponent(cat)}` as never}
              className="rounded-full border border-rpc-border bg-rpc-bg px-4 py-1.5 text-sm font-medium text-rpc-text/75 transition hover:border-rpc-accent hover:text-rpc-accent-dark"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
