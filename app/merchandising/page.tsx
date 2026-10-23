import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { CONTACT, CONTACT_LINKS } from "@/lib/brand/contacts";

export const metadata: Metadata = {
  title: "Merchandising personalizado",
  description:
    "Además de ropa, hacemos merchandising con tu logo: botellas, tazones, lápices, libretas, bolsas, lanyards y más. Cotiza directo por WhatsApp o correo.",
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
 * se inventan. La foto es un trabajo real (Howdy, lib/works/works.ts).
 */

type ProductoMerch = { nombre: string; plural: string; femenino?: boolean; texto: string; icono: ReactNode };

const PRODUCTOS: ProductoMerch[] = [
  { nombre: "Botellas", plural: "botellas", femenino: true, texto: "Botellas con tu logo para equipos, eventos y regalos corporativos.", icono: <IconBotella /> },
  { nombre: "Tazones", plural: "tazones", texto: "Tazones con tu marca para la oficina, bienvenidas o fin de año.", icono: <IconTazon /> },
  { nombre: "Lápices", plural: "lápices", texto: "Lápices con tu logo para ferias, reuniones y kits de bienvenida.", icono: <IconLapiz /> },
  { nombre: "Libretas y cuadernos", plural: "libretas o cuadernos", texto: "Libretas y cuadernos con tu diseño, de tapa a tapa.", icono: <IconLibreta /> },
  { nombre: "Bolsas", plural: "bolsas", femenino: true, texto: "Bolsas con tu logo para eventos, tiendas o kits de regalo.", icono: <IconBolsa /> },
  { nombre: "Lanyards", plural: "lanyards", texto: "Lanyards con tu marca para credenciales de equipo y eventos.", icono: <IconLanyard /> },
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
            Botellas, tazones, lápices, libretas, bolsas, lanyards y más, todo personalizado. Estos productos no
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
              <article key={p.nombre} className="flex flex-col rounded-rpc-card border border-rpc-border bg-rpc-bg p-6">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-rpc-button bg-rpc-info/10 text-rpc-info-dark">
                  {p.icono}
                </span>
                <h3 className="mt-4 font-rpc-heading text-lg font-bold tracking-tight">{p.nombre}</h3>
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
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-20">
          <Image
            src="/trabajos/howdy-cuadernos.webp"
            alt="Cuaderno, libreta y lápices personalizados para Howdy"
            width={1200}
            height={1311}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="h-auto w-full max-w-md rounded-rpc-card border border-rpc-border"
          />
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-rpc-info-dark">Trabajo real</p>
            <h2 className="mt-3 text-2xl tracking-tight sm:text-3xl">Cuadernos, libretas y lápices para Howdy.</h2>
            <p className="mt-4 text-sm leading-relaxed text-rpc-text/70 sm:text-base">
              Cuaderno con resorte ilustrado a todo color, libreta y lápices con la marca. El mismo cuidado que
              ponemos en la ropa, en todo lo que lleva tu logo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Icono({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
      {children}
    </svg>
  );
}
function IconBotella() {
  return <Icono><path d="M10 2h4v3l1.5 2.5V20a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V7.5L10 5z" /><path d="M8.5 11h7" /></Icono>;
}
function IconTazon() {
  return <Icono><path d="M4 8h12v7a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z" /><path d="M16 10h1.5a2.5 2.5 0 0 1 0 5H16" /><path d="M8 3v2M12 3v2" /></Icono>;
}
function IconLapiz() {
  return <Icono><path d="M4 20l1.2-4.2L16 5l3 3L8.2 18.8z" /><path d="M14 7l3 3" /></Icono>;
}
function IconLibreta() {
  return <Icono><rect x="6" y="3" width="13" height="18" rx="1.5" /><path d="M4 7h3M4 12h3M4 17h3M10 8h6" /></Icono>;
}
function IconBolsa() {
  return <Icono><path d="M5 8h14l-1 13H6z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></Icono>;
}
function IconLanyard() {
  return <Icono><path d="M7 2l5 9 5-9" /><rect x="8" y="11" width="8" height="10" rx="1.5" /><path d="M10 15h4" /></Icono>;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.195 2.105 3.195 5.1 4.485.714.3 1.27.48 1.704.629.714.227 1.365.195 1.88.121.574-.091 1.767-.721 2.016-1.426.255-.705.255-1.29.18-1.425-.074-.135-.27-.21-.57-.345m-5.446 7.443h-.016c-1.77 0-3.524-.48-5.055-1.38l-.36-.214-3.75.975 1.005-3.645-.239-.375a9.869 9.869 0 0 1-1.51-5.26c0-5.445 4.455-9.885 9.94-9.885a9.87 9.87 0 0 1 7.022 2.91 9.88 9.88 0 0 1 2.913 7.02c-.004 5.444-4.455 9.885-9.945 9.885" />
    </svg>
  );
}
