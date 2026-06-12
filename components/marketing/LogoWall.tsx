/**
 * "Confían en nosotros" — muro tipográfico de clientes reales.
 *
 * Nombres relevados del muro de clientes del sitio actual del cliente
 * (ropapublicitariachile.cl). Sin imágenes de logos: grid tipográfico
 * elegante con hairlines. El id="clientes" es el anchor del nav.
 */

const CLIENTS = [
  "Banco de Chile",
  "Entel",
  "LATAM",
  "Ripley",
  "Copec",
  "Mercado Libre",
  "Natura",
  "LEGO",
  "Red de Salud UC Christus",
  "Viña Santa Carolina",
  "Betterfly",
  "TECHO",
  "Mega",
  "Carozzi",
  "Turbus",
  "Land Rover",
] as const;

export function LogoWall() {
  return (
    <section id="clientes" className="scroll-mt-24 border-b border-rpc-border bg-rpc-bg">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">
          Confían en nosotros
        </p>
        <h2 className="mx-auto mt-3 max-w-2xl text-center text-3xl tracking-tight sm:text-4xl">
          Marcas que ya visten con nosotros.
        </h2>

        {/* Grid con hairlines: gap-px sobre fondo border simula la grilla */}
        <div className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-rpc-card border border-rpc-border bg-rpc-border sm:grid-cols-3 lg:grid-cols-4">
          {CLIENTS.map((name) => (
            <div
              key={name}
              className="flex h-24 items-center justify-center bg-rpc-bg px-4 text-center"
            >
              <span className="font-rpc-heading text-sm font-bold tracking-tight text-rpc-text/45 transition hover:text-rpc-text sm:text-base">
                {name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-rpc-text/55">
          …y muchas marcas más.
        </p>
      </div>
    </section>
  );
}
