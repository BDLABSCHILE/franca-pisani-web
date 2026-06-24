import Link from "next/link";
import { Hero } from "@/components/marketing/Hero";
import { Pillars } from "@/components/marketing/Pillars";
import { WorksTeaser } from "@/components/marketing/WorksTeaser";
import { LogoWall } from "@/components/marketing/LogoWall";
import { SuccessMetrics } from "@/components/marketing/SuccessMetrics";
import { FaqB2B } from "@/components/marketing/FaqB2B";
import { CtaFooter } from "@/components/marketing/CtaFooter";
import { HandshakeIcon, PencilIcon, QuoteIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <Hero />
      <Pillars />
      <HowItWorks />
      <WorksTeaser />
      <LogoWall />
      <SuccessMetrics />
      <FaqB2B />
      <CtaFooter />
    </>
  );
}

/**
 * "Así funciona" — resumen del flujo B2B en 3 pasos, con link a la página
 * completa /como-funciona. Cierra siempre en factor humano: el equipo
 * contacta para cerrar, nunca checkout online.
 */
const STEPS = [
  {
    n: "1",
    icon: PencilIcon,
    title: "Sube tu logo",
    body: "Cárgalo una vez y míralo aplicado sobre cualquier producto del catálogo, antes de decidir.",
  },
  {
    n: "2",
    icon: QuoteIcon,
    title: "Cotiza con precios por volumen",
    body: "Eliges cantidades, tallas y técnica de personalización, y el precio se ajusta según el volumen.",
  },
  {
    n: "3",
    icon: HandshakeIcon,
    title: "El equipo te contacta",
    body: "Te respondemos en menos de 24 horas para afinar detalles, validar el arte y cerrar tu pedido.",
  },
] as const;

function HowItWorks() {
  return (
    <section className="border-b border-rpc-border bg-rpc-surface">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">
          Así funciona
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl tracking-tight sm:text-4xl">
          De tu logo a la ropa de tu equipo, en tres pasos.
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.n}
                className="relative rounded-rpc-card border border-rpc-border bg-rpc-bg p-6"
              >
                {/* Rombo numerado — motivo del logo como marcador de paso */}
                <span
                  aria-hidden
                  className="absolute right-5 top-5 flex h-9 w-9 rotate-45 items-center justify-center rounded-lg bg-rpc-accent"
                >
                  <span className="-rotate-45 font-rpc-heading text-sm font-bold text-white">
                    {step.n}
                  </span>
                </span>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-rpc-button bg-rpc-info/10 text-rpc-info-dark">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 max-w-[85%] font-rpc-heading text-lg font-bold leading-snug tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-rpc-text/70">
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>

        <Link
          href="/como-funciona"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-rpc-accent-dark transition hover:text-rpc-accent"
        >
          Ver el proceso completo
          <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
