import type { Metadata } from "next";
import { FormularioAnuncio } from "@/components/landing/FormularioAnuncio";

export const metadata: Metadata = {
  title: "Cotiza ropa corporativa para tu equipo",
  description: "Poleras, polerones, chaquetas, camisas y jockeys con tu logo bordado o estampado. Déjanos tus datos y te cotizamos.",
};

/**
 * /cotiza-empresa — destino de los anuncios de Leads (27-11-2026), reemplazo de
 * la landing de Mailchimp «Captación de clientes». Formulario arriba, corto,
 * con los mismos campos; el resto apoya sin distraer.
 */
export default function CotizaEmpresaPage() {
  return (
    <>
      <section className="border-b border-rpc-border bg-rpc-bg">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-20">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-rpc-text/60 sm:text-xs">Ropa corporativa</p>
            <h1 className="mt-4 text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">Es hora de renovar la imagen de tu equipo</h1>
            <p className="mt-6 max-w-md font-rpc-body text-base normal-case tracking-normal text-rpc-text/75">
              Déjanos tus datos y te cotizamos tu proyecto: uniformes y prendas con tu logo bordado o estampado, para que tu marca se luzca.
            </p>
            <ul className="mt-8 space-y-3 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/80">
              <li>✓ Más de 40 años vistiendo equipos de trabajo</li>
              <li>✓ Más de 500 empresas han confiado en nosotros</li>
              <li>✓ Stock en Chile listo para personalizar con tu logo</li>
              <li>✓ Te respondemos en menos de 24 horas</li>
            </ul>
          </div>
          <div className="border border-rpc-border bg-white/60 p-6 sm:p-8">
            <h2 className="text-xl">Cotiza ahora</h2>
            <p className="mt-2 mb-6 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/60">Te contactamos lo antes posible.</p>
            <FormularioAnuncio />
          </div>
        </div>
      </section>
      <section className="bg-rpc-bg">
        <div className="mx-auto max-w-6xl px-6 py-14 lg:px-10">
          <h2 className="text-2xl">Lo que más nos piden</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Poleras", "Cuello redondo o piqué, en varios colores, con tu marca estampada o bordada."],
              ["Polerones y polar", "Cómodos y versátiles, listos para bordar."],
              ["Cortavientos y chaquetas", "Ideales para el trabajo en exterior."],
              ["Jockeys", "Estampados o bordados, en muchos colores."],
              ["Uniformes de cocina", "Pecheras, chaquetas de chef, gorros y todo para equipar tu cocina."],
              ["Regalos corporativos", "Cuadernos, lápices, botellas, mugs y más, con tu logo."],
            ].map(([t, d]) => (
              <div key={t} className="border border-rpc-border p-5">
                <h3 className="text-base">{t}</h3>
                <p className="mt-2 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
