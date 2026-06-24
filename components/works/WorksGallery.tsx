"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import type { RealWork } from "@/lib/works/works";
import { cn } from "@/lib/utils/cn";

/** handle → {título, href} para enlazar la prenda desde el lightbox. */
export type ProductLink = { title: string; href: string };

type Props = {
  works: readonly RealWork[];
  productLinks: Record<string, ProductLink>;
};

/**
 * Galería masonry de trabajos reales con lightbox.
 *
 * - Masonry vía CSS columns: respeta el alto natural de cada foto (algunas son
 *   retrato, otras collage apaisado) sin recortar.
 * - Click abre un lightbox con la foto grande + detalle + las prendas del
 *   catálogo que aparecen (cruce de confianza: "esto lo puedes cotizar").
 */
export function WorksGallery({ works, productLinks }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Deep-link: /nuestros-trabajos#<slug> abre ese trabajo directo (lo usan
  // las tarjetas de la PDP para saltar al detalle exacto).
  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (!slug) return;
    const i = works.findIndex((w) => w.slug === slug);
    if (i !== -1) setOpenIndex(i);
  }, [works]);

  const close = useCallback(() => setOpenIndex(null), []);
  const go = useCallback(
    (dir: 1 | -1) =>
      setOpenIndex((i) =>
        i === null ? i : (i + dir + works.length) % works.length,
      ),
    [works.length],
  );

  return (
    <>
      <div className="[column-fill:_balance] gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
        {works.map((work, i) => (
          <WorkCard
            key={work.slug}
            id={work.slug}
            work={work}
            onOpen={() => setOpenIndex(i)}
          />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          work={works[openIndex]!}
          productLinks={productLinks}
          onClose={close}
          onPrev={() => go(-1)}
          onNext={() => go(1)}
        />
      )}
    </>
  );
}

function WorkCard({
  work,
  onOpen,
  id,
}: {
  work: RealWork;
  onOpen: () => void;
  id?: string;
}) {
  return (
    <button
      type="button"
      id={id}
      onClick={onOpen}
      className="group mb-5 block w-full scroll-mt-24 break-inside-avoid overflow-hidden rounded-rpc-card border border-rpc-border bg-rpc-surface text-left transition hover:border-rpc-accent/40 hover:shadow-md sm:mb-6"
    >
      <div className="relative overflow-hidden bg-rpc-image-bg-light">
        <Image
          src={work.image}
          alt={`${work.garments.join(", ")}${work.client ? ` para ${work.client}` : ""} — ${work.techniques.join(" + ")}`}
          width={work.width}
          height={work.height}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="h-auto w-full transition duration-500 group-hover:scale-[1.03]"
        />
        {/* Hint de zoom al hover */}
        <span className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-rpc-bg/85 text-rpc-text opacity-0 shadow-sm backdrop-blur transition group-hover:opacity-100">
          <ExpandIcon className="h-4 w-4" />
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2">
          {work.client ? (
            <span className="font-rpc-heading text-base font-bold leading-tight text-rpc-text">
              {work.client}
            </span>
          ) : (
            <span className="font-rpc-heading text-base font-bold leading-tight text-rpc-text">
              Tanda multimarca
            </span>
          )}
        </div>
        <p className="mt-1.5 font-rpc-body text-sm normal-case leading-snug tracking-normal text-rpc-text/70">
          {work.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {work.techniques.map((t) => (
            <TechniqueChip key={t} label={t} />
          ))}
        </div>
      </div>
    </button>
  );
}

function TechniqueChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-rpc-border bg-rpc-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-rpc-text/70">
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-rpc-accent" />
      {label}
    </span>
  );
}

function Lightbox({
  work,
  productLinks,
  onClose,
  onPrev,
  onNext,
}: {
  work: RealWork;
  productLinks: Record<string, ProductLink>;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  // El Lightbox solo se monta tras un click (cliente), así que document
  // siempre existe acá — no necesita guard de "mounted" para el portal.

  // Bloquear scroll + navegación con teclado mientras está abierto.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", handler);
    };
  }, [onClose, onPrev, onNext]);

  const linkedProducts = work.productHandles
    .map((h) => productLinks[h])
    .filter((p): p is ProductLink => Boolean(p));

  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8">
      {/* Backdrop */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute inset-0 bg-rpc-text/70 backdrop-blur-sm"
      />

      {/* Panel */}
      <div className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-rpc-card bg-rpc-bg shadow-2xl lg:flex-row">
        {/* Imagen */}
        <div className="relative flex items-center justify-center bg-rpc-image-bg-light lg:w-3/5">
          <Image
            src={work.image}
            alt={`${work.garments.join(", ")}${work.client ? ` para ${work.client}` : ""}`}
            width={work.width}
            height={work.height}
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="max-h-[45vh] w-auto object-contain lg:max-h-[88vh]"
          />
        </div>

        {/* Detalle */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6 sm:p-8 lg:w-2/5">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-rpc-text/55">
              Trabajo real
            </p>
            <h2 className="mt-2 font-rpc-heading text-2xl font-bold leading-tight text-rpc-text">
              {work.client ?? "Tanda multimarca"}
            </h2>
          </div>

          <p className="font-rpc-body text-sm normal-case leading-relaxed tracking-normal text-rpc-text/80">
            {work.detail}
          </p>

          <dl className="grid grid-cols-1 gap-4 border-t border-rpc-border pt-5 sm:grid-cols-2">
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/55">
                Prendas
              </dt>
              <dd className="mt-1.5 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/80">
                {work.garments.join(" · ")}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/55">
                Técnica
              </dt>
              <dd className="mt-2 flex flex-wrap gap-1.5">
                {work.techniques.map((t) => (
                  <TechniqueChip key={t} label={t} />
                ))}
              </dd>
            </div>
          </dl>

          {linkedProducts.length > 0 && (
            <div className="border-t border-rpc-border pt-5">
              <p className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/55">
                Cotiza estas prendas
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                {linkedProducts.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href as never}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-3 rounded-rpc-button border border-rpc-border bg-rpc-surface px-4 py-3 text-sm font-medium text-rpc-text transition hover:border-rpc-accent/50 hover:bg-rpc-bg"
                    >
                      <span>{p.title}</span>
                      <span
                        aria-hidden
                        className="text-rpc-accent-dark transition group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Controles */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-rpc-bg/90 text-rpc-text shadow-sm transition hover:bg-rpc-bg"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>

      {/* Prev / Next — fuera del panel, sobre el backdrop */}
      <button
        type="button"
        onClick={onPrev}
        aria-label="Anterior"
        className="absolute left-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-rpc-bg/90 text-rpc-text shadow-sm transition hover:bg-rpc-bg sm:left-4"
      >
        <ChevronIcon className="h-5 w-5 rotate-180" />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Siguiente"
        className="absolute right-2 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-rpc-bg/90 text-rpc-text shadow-sm transition hover:bg-rpc-bg sm:right-4"
      >
        <ChevronIcon className="h-5 w-5" />
      </button>
    </div>,
    document.body,
  );
}

function ExpandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M15 3h6v6M21 3l-7 7M9 21H3v-6M3 21l7-7" />
    </svg>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      aria-hidden
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
