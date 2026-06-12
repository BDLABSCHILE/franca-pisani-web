import Link from "next/link";
import { CONTACT, CONTACT_LINKS } from "@/lib/brand/contacts";

/**
 * Cierre de la landing: CTA al catálogo + canal humano directo (WhatsApp).
 * Flujo B2B con factor humano — nunca checkout: el equipo cierra el pedido.
 */
export function CtaFooter() {
  return (
    <section className="bg-rpc-announcement text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 py-20 text-center lg:px-10 lg:py-28">
        <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info">
          Cotiza sin compromiso
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl tracking-tight sm:text-4xl lg:text-5xl">
          ¿Vestimos a tu equipo?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/75">
          Explora el catálogo, sube tu logo y envía tu cotización. Te
          respondemos en menos de 24 horas para afinar los detalles y cerrar
          tu pedido.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/catalogo"
            className="inline-flex items-center justify-center gap-2 rounded-rpc-button bg-rpc-accent px-8 py-4 text-sm font-semibold text-white transition hover:bg-rpc-accent-dark"
          >
            Explorar catálogo
            <span aria-hidden>→</span>
          </Link>
          <a
            href={CONTACT_LINKS.whatsapp}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center rounded-rpc-button border border-white/40 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-rpc-text"
          >
            Escríbenos por WhatsApp
          </a>
        </div>

        <p className="mt-7 text-sm text-white/55">
          {CONTACT.whatsappDisplay} ·{" "}
          <a href={CONTACT_LINKS.mailto} className="underline-offset-4 transition hover:text-white hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </div>
    </section>
  );
}
