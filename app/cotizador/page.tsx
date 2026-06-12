import type { Metadata } from "next";
import { QuoteBuilder } from "@/components/quote/QuoteBuilder";

export const metadata: Metadata = {
  title: "Tu cotización",
};

export default function CotizadorPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-16">
      <header className="max-w-3xl">
        <p className="text-[10px] uppercase tracking-[0.25em] text-rpc-text/60 sm:text-xs">
          Tu cotización
        </p>
        <h1 className="mt-3 text-2xl font-light leading-[1.1] sm:mt-4 sm:text-3xl lg:text-5xl">
          Arma tu pedido, nosotros lo cerramos contigo.
        </h1>
        <p className="mt-3 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/70 sm:mt-4 sm:text-base">
          Revisa tu selección, ajusta cantidades y envíanos la cotización.
          Recibes el PDF al instante y te contactamos en menos de 24 horas
          hábiles para confirmar precios, stock y plazos — aquí no hay checkout:
          el cierre lo hacemos persona a persona.
        </p>
      </header>

      <QuoteBuilder />
    </div>
  );
}
