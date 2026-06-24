import Image from "next/image";
import Link from "next/link";
import { worksForProduct } from "@/lib/works/works";

/**
 * Sección de la PDP: trabajos REALES en los que aparece este producto.
 *
 * Da confianza mostrando la prenda ya personalizada para una marca real.
 * Cada tarjeta enlaza a /nuestros-trabajos#<slug>, que abre ese trabajo en
 * el lightbox de la galería. Si el producto no aparece en ningún trabajo,
 * la sección no se renderiza.
 */
export function ProductWorks({ handle }: { handle: string }) {
  const works = worksForProduct(handle);
  if (works.length === 0) return null;

  return (
    <section className="mt-20 border-t border-rpc-border pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.25em] text-rpc-text/60">
            Trabajos reales
          </p>
          <h2 className="mt-3 text-2xl leading-[1.1] sm:text-3xl">
            Así se ve esta prenda con un logo puesto.
          </h2>
          <p className="mt-3 max-w-xl font-rpc-body text-sm normal-case tracking-normal text-rpc-text/70">
            Fotos reales de pedidos que personalizamos para marcas chilenas con
            esta misma prenda.
          </p>
        </div>
        <Link
          href="/nuestros-trabajos"
          className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-semibold text-rpc-accent-dark transition hover:text-rpc-accent"
        >
          Ver todos los trabajos
          <span aria-hidden>→</span>
        </Link>
      </div>

      <ul className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {works.map((work) => (
          <li key={work.slug}>
            <Link
              href={`/nuestros-trabajos#${work.slug}` as never}
              className="group block overflow-hidden rounded-rpc-card border border-rpc-border bg-rpc-surface transition hover:border-rpc-accent/40 hover:shadow-md"
            >
              <div className="overflow-hidden bg-rpc-image-bg-light">
                <Image
                  src={work.image}
                  alt={`${work.garments.join(", ")}${work.client ? ` para ${work.client}` : ""} — ${work.techniques.join(" + ")}`}
                  width={work.width}
                  height={work.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="h-56 w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-5">
                <span className="font-rpc-heading text-base font-bold leading-tight text-rpc-text">
                  {work.client ?? "Tanda multimarca"}
                </span>
                <p className="mt-1.5 font-rpc-body text-sm normal-case leading-snug tracking-normal text-rpc-text/70">
                  {work.summary}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {work.techniques.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1.5 rounded-full border border-rpc-border bg-rpc-bg px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-rpc-text/70"
                    >
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-rpc-accent"
                      />
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
