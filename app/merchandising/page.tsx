import type { Metadata } from "next";
import Image from "next/image";
import { CONTACT, CONTACT_LINKS } from "@/lib/brand/contacts";

export const metadata: Metadata = {
  title: "Merchandising personalizado",
  description:
    "Además de ropa, hacemos merchandising con tu logo: botellas, tazones, vasos térmicos, lápices, libretas, bolsas, lanyards, chapitas y más. Cotiza directo por WhatsApp o correo.",
};

/**
 * /merchandising — productos que Ropa Publicitaria hace pero que NO pasan por
 * el cotizador (pedido de Macarena, 23-10-2026): se muestran para que se sepa
 * que existen y cada uno se cotiza directo por WhatsApp o correo, con el
 * mensaje ya escrito. Los clics a wa.me y mailto los mide el listener global
 * de components/medicion (clic_whatsapp / clic_correo), así que estas
 * consultas quedan en Google Ads y Meta igual que las del resto del sitio.
 *
 * Sin precios, plazos ni técnicas por producto: la marca no los entregó y no
 * se inventan. TODAS las fotos son trabajos reales que mandó Macarena el
 * 23-10-2026 (public/merch/, sin metadatos del teléfono). Gorros y bandanas
 * no van acá: ya están en el catálogo de ropa.
 */

type Foto = { src: string; alt: string; ancho: number; alto: number };
type ProductoMerch = { nombre: string; plural: string; femenino?: boolean; texto: string; foto: Foto };

const PRODUCTOS: ProductoMerch[] = [
  { nombre: "Botellas", plural: "botellas", femenino: true, texto: "Botellas con tu logo para equipos, eventos y regalos corporativos.",
    foto: { src: "/merch/botellas-ef.webp", alt: "Botellas negras personalizadas para EF", ancho: 1200, alto: 868 } },
  { nombre: "Tazones", plural: "tazones", texto: "Tazones con tu marca para la oficina, bienvenidas o fin de año.",
    foto: { src: "/merch/tazones-kreston.webp", alt: "Tazones blancos personalizados para Kreston ATC Chile", ancho: 1065, alto: 1200 } },
  { nombre: "Vasos y mugs térmicos", plural: "vasos o mugs térmicos", texto: "Vasos y mugs térmicos con tu logo, en varios colores.",
    foto: { src: "/merch/vasos-termicos.webp", alt: "Vasos térmicos azul, rojo y verde con logo grabado", ancho: 957, alto: 1200 } },
  { nombre: "Lápices", plural: "lápices", texto: "Lápices con tu logo para ferias, reuniones y kits de bienvenida.",
    foto: { src: "/merch/kit-fracttal.webp", alt: "Kit Fracttal con lápices, tazones, mug térmico y pendrive personalizados", ancho: 1200, alto: 1055 } },
  { nombre: "Libretas y cuadernos", plural: "libretas o cuadernos", texto: "Libretas y cuadernos con tu diseño, de tapa a tapa.",
    foto: { src: "/merch/libretas-lapices-newenkelen.webp", alt: "Libretas negras y lápices personalizados para Newenkelen", ancho: 894, alto: 1200 } },
  { nombre: "Bolsas", plural: "bolsas", femenino: true, texto: "Bolsas y morrales con tu logo para eventos, tiendas o kits de regalo.",
    foto: { src: "/merch/bolsas-ilustradas.webp", alt: "Bolsas de tela con ilustraciones personalizadas", ancho: 924, alto: 1200 } },
  { nombre: "Lanyards", plural: "lanyards", texto: "Lanyards con tu marca para credenciales de equipo y eventos.",
    foto: { src: "/merch/lanyards-recotec.webp", alt: "Lanyards azules personalizados para Recotec", ancho: 823, alto: 1200 } },
  { nombre: "Chapitas", plural: "chapitas", femenino: true, texto: "Chapitas con tu logo para campañas, eventos y regalos.",
    foto: { src: "/merch/chapitas-fundacion-los-leones.webp", alt: "Chapitas personalizadas para Fundación Los Leones", ancho: 1181, alto: 1200 } },
];

/** El resto de los trabajos reales, para la galería del final. */
const GALERIA: Foto[] = [
  { src: "/merch/kit-todo-terreno.webp", alt: "Bolsa, botella y jockey personalizados para Todo Terreno", ancho: 1194, alto: 1200 },
  { src: "/merch/libretas-howdy.webp", alt: "Cuadernos, libreta y lápices personalizados para Howdy", ancho: 1122, alto: 1200 },
  { src: "/merch/botellas-old-boys.webp", alt: "Botellas de aluminio grabadas para Old Boys", ancho: 1033, alto: 1200 },
  { src: "/merch/tazones-dr-reddys.webp", alt: "Tazones personalizados con nombres para Dr. Reddy's", ancho: 1200, alto: 878 },
  { src: "/merch/bolsas-atacama-kozan.webp", alt: "Bolsas personalizadas para Atacama Kozan", ancho: 1107, alto: 1200 },
  { src: "/merch/lanyards-comery.webp", alt: "Lanyard negro personalizado para Comery", ancho: 719, alto: 1200 },
  { src: "/merch/bolsas-lapices-mussa.webp", alt: "Bolsas y lápices personalizados para Mussa Vending", ancho: 1052, alto: 1200 },
  { src: "/merch/morrales-natura.webp", alt: "Morrales de tela personalizados para Natura", ancho: 1089, alto: 1200 },
  { src: "/merch/bolsa-gorro-plan-explora.webp", alt: "Bolsa y jockey personalizados para Plan Explora", ancho: 1040, alto: 1200 },
  { src: "/merch/bolsa-dr-reddys.webp", alt: "Bolsa personalizada para Dr. Reddy's", ancho: 1057, alto: 1200 },
  { src: "/merch/bolsitas-natura-ekos.webp", alt: "Bolsitas de tela personalizadas para Natura Ekos", ancho: 963, alto: 1200 },
  { src: "/merch/bolsa-bordachar-meneses.webp", alt: "Bolsa de tela personalizada para Bordachar & Meneses", ancho: 1200, alto: 910 },
  { src: "/merch/morral-natura.webp", alt: "Morral azul personalizado para Natura", ancho: 1014, alto: 1200 },
  { src: "/merch/morral-cicletada.webp", alt: "Morral personalizado para una cicletada familiar", ancho: 909, alto: 1200 },
  { src: "/merch/bolsa-bulldog.webp", alt: "Bolsa de tela con ilustración personalizada", ancho: 931, alto: 1200 },
];

const personalizados = (femenino?: boolean) => (femenino ? "personalizadas" : "personalizados");

const mensajeWhatsApp = (plural: string, femenino?: boolean) =>
  `Hola, quiero cotizar ${plural} ${personalizados(femenino)} con mi logo. Cantidad aproximada: `;

const mailtoProducto = (nombre: string, plural: string, femenino?: boolean) =>
  `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Cotización merchandising: ${nombre}`)}&body=${encodeURIComponent(
    `Hola, quiero cotizar ${plural} ${personalizados(femenino)} con mi logo.\n\nCantidad aproximada:\nFecha en que lo necesito:\nEmpresa:\n`,
  )}`;

const MAILTO_GENERAL = `mailto:${CONTACT.email}?subject=${encodeURIComponent("Cotización merchandising")}&body=${encodeURIComponent(
  "Hola, quiero cotizar merchandising personalizado con mi logo.\n\nProducto:\nCantidad aproximada:\nFecha en que lo necesito:\nEmpresa:\n",
)}`;

export default function MerchandisingPage() {
  return (
    <>
      <section className="border-b border-rpc-border bg-rpc-bg">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
          <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">Merchandising</p>
          <h1 className="mt-4 max-w-3xl text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
            Además de ropa, hacemos merchandising con tu logo.
          </h1>
          <p className="mt-6 max-w-2xl font-rpc-body text-base normal-case tracking-normal text-rpc-text/75 sm:text-lg">
            Botellas, tazones, vasos térmicos, lápices, libretas, bolsas, lanyards, chapitas y más, todo personalizado. Estos productos no
            están en el cotizador en línea: escríbenos y te cotizamos directo, según cantidad y diseño.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={CONTACT_LINKS.whatsappWithMessage("Hola, quiero cotizar merchandising personalizado con mi logo.")}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center gap-3 rounded-rpc-button bg-rpc-button px-7 py-4 text-xs uppercase tracking-[0.2em] text-rpc-button-text transition hover:opacity-90"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Cotizar por WhatsApp
            </a>
            <a
              href={MAILTO_GENERAL}
              className="inline-flex items-center justify-center gap-3 rounded-rpc-button border border-rpc-text px-7 py-4 text-xs uppercase tracking-[0.2em] text-rpc-text transition hover:bg-rpc-text hover:text-rpc-button-text"
            >
              Cotizar por correo
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-rpc-border bg-rpc-surface">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <h2 className="max-w-2xl text-2xl tracking-tight sm:text-3xl">¿Qué quieres personalizar?</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTOS.map((p) => (
              <article key={p.nombre} className="flex flex-col overflow-hidden rounded-rpc-card border border-rpc-border bg-rpc-bg">
                <Image
                  src={p.foto.src}
                  alt={p.foto.alt}
                  width={p.foto.ancho}
                  height={p.foto.alto}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[4/3] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6">
                <h3 className="font-rpc-heading text-lg font-bold tracking-tight">{p.nombre}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-rpc-text/70">{p.texto}</p>
                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a
                    href={CONTACT_LINKS.whatsappWithMessage(mensajeWhatsApp(p.plural, p.femenino))}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`Cotizar ${p.plural} por WhatsApp`}
                    className="inline-flex items-center justify-center gap-2 rounded-rpc-button bg-rpc-button px-3 py-3 text-[11px] uppercase tracking-[0.15em] text-rpc-button-text transition hover:opacity-90"
                  >
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={mailtoProducto(p.nombre, p.plural, p.femenino)}
                    aria-label={`Cotizar ${p.plural} por correo`}
                    className="inline-flex items-center justify-center rounded-rpc-button border border-rpc-text px-3 py-3 text-[11px] uppercase tracking-[0.15em] text-rpc-text transition hover:bg-rpc-text hover:text-rpc-button-text"
                  >
                    Correo
                  </a>
                </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-8 text-sm text-rpc-text/70">
            ¿Buscas otro producto?{" "}
            <a
              href={CONTACT_LINKS.whatsappWithMessage("Hola, quiero cotizar un producto de merchandising personalizado: ")}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-rpc-accent-dark underline-offset-4 hover:underline"
            >
              Pregúntanos por WhatsApp
            </a>{" "}
            o escríbenos a{" "}
            <a href={CONTACT_LINKS.mailto} className="font-semibold text-rpc-accent-dark underline-offset-4 hover:underline">
              {CONTACT.email}
            </a>
            .
          </p>
        </div>
      </section>

      <section className="border-b border-rpc-border bg-rpc-bg">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">Trabajos reales</p>
          <h2 className="mt-3 max-w-2xl text-2xl tracking-tight sm:text-3xl">Merchandising que ya hicimos para nuestros clientes.</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {GALERIA.map((f) => (
              <Image
                key={f.src}
                src={f.src}
                alt={f.alt}
                width={f.ancho}
                height={f.alto}
                sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                className="aspect-square w-full rounded-rpc-card border border-rpc-border object-cover"
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.51-5.26c0-5.445 4.455-9.885 9.94-9.885a9.87 9.87 0 0 1 7.022 2.91 9.88 9.88 0 0 1 2.913 7.02c-.004 5.444-4.455 9.885-9.945 9.885" />
    </svg>
  );
}
