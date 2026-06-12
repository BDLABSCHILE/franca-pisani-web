import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mis cotizaciones",
};

/**
 * Stub. El seguimiento online de cotizaciones llega en una fase posterior;
 * por ahora el flujo es el real del negocio: la cotización llega al correo
 * del cliente y el equipo lo contacta para cerrar.
 */
export default function MisCotizacionesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10 lg:py-32">
      <p className="text-xs uppercase tracking-[0.25em] text-rpc-text/60">
        Mis cotizaciones
      </p>
      <h1 className="mt-4 text-3xl leading-[1.1] sm:text-4xl">
        Próximamente: el estado de tus cotizaciones en un solo lugar.
      </h1>
      <p className="mt-6 font-rpc-body text-base normal-case tracking-normal text-rpc-text/75">
        Por ahora, tu cotización llega a tu correo apenas la envías y el
        equipo te contacta en menos de 24 horas para confirmar detalles y
        cerrar el pedido.
      </p>
      <Link
        href="/catalogo"
        className="mt-10 inline-flex items-center gap-2 rounded-rpc-button bg-rpc-accent px-7 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:bg-rpc-accent-dark"
      >
        Ir al catálogo
        <span aria-hidden>→</span>
      </Link>
    </div>
  );
}
