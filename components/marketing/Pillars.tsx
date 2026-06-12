import type { ComponentType } from "react";
import {
  BoltIcon,
  ConfigureIcon,
  PencilIcon,
  QuoteIcon,
} from "@/components/icons";

/**
 * Los 4 pilares de la propuesta RPC: cotización online, preview del logo,
 * stock express y fabricación propia. Copy sin cifras inventadas — solo los
 * claims permitidos (40+ años, modelo dual).
 */
const PILLARS: readonly {
  icon: ComponentType<{ className?: string }>;
  title: string;
  body: string;
}[] = [
  {
    icon: QuoteIcon,
    title: "Cotiza online al instante",
    body: "Arma tu cotización con precios por volumen transparentes, sin esperar correos de ida y vuelta. Eliges producto, cantidad y técnica, y ves el precio en el momento.",
  },
  {
    icon: PencilIcon,
    title: "Sube tu logo y míralo puesto",
    body: "Carga tu logo una vez y previsualízalo aplicado sobre cada producto antes de comprar. Apruebas sobre seguro, no a ciegas.",
  },
  {
    icon: BoltIcon,
    title: "Stock express en Chile",
    body: "Mantenemos stock listo en Chile para pedidos con poco plazo y mínimos bajos. Respuesta rápida cuando la fecha aprieta.",
  },
  {
    icon: ConfigureIcon,
    title: "Fabricación propia a medida",
    body: "Más de 40 años fabricando. Para proyectos especiales producimos a medida en nuestras fábricas en Oriente, con asesoría de diseño incluida.",
  },
];

export function Pillars() {
  return (
    <section className="border-b border-rpc-border bg-rpc-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">
          Por qué con nosotros
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">
          Lo mejor de dos mundos: fábrica propia y respuesta express.
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                className="flex flex-col gap-4 rounded-rpc-card border border-rpc-border bg-rpc-bg p-6 transition hover:border-rpc-accent/40 hover:shadow-sm"
              >
                <span
                  className={
                    i % 2 === 0
                      ? "inline-flex h-11 w-11 items-center justify-center rounded-rpc-button bg-rpc-accent/10 text-rpc-accent-dark"
                      : "inline-flex h-11 w-11 items-center justify-center rounded-rpc-button bg-rpc-info/10 text-rpc-info-dark"
                  }
                >
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="font-rpc-heading text-lg font-bold leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed text-rpc-text/70">
                  {p.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
