import type { Metadata } from "next";
import Script from "next/script";
import { Archivo, Inter } from "next/font/google";
import { BrandHeader } from "@/components/brand/BrandHeader";
import { BrandFooter } from "@/components/brand/BrandFooter";
import { WhatsAppFloat } from "@/components/brand/WhatsAppFloat";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

// Google Tag Manager. ID overrideable por env sin tocar código.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-T64WP5S";

export const metadata: Metadata = {
  title: {
    default:
      "Ropa Publicitaria Chile — Vestuario corporativo y merchandising con tu logo",
    template: "%s · Ropa Publicitaria Chile",
  },
  description:
    "Más de 40 años de experiencia. Cotiza poleras, polerones, camisas y merchandising personalizados con tu logo: precios por volumen, stock en Chile listo para personalizar y línea propia de ropa de cocina y uniformes.",
  metadataBase: new URL(
    process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ropapublicitariachile.cl",
  ),
  // OpenGraph + Twitter cards para previews al compartir el link (WhatsApp,
  // LinkedIn, etc.). Declarado acá para que TODAS las rutas hijas lo hereden.
  openGraph: {
    type: "website",
    locale: "es_CL",
    siteName: "Ropa Publicitaria Chile",
    title: "Ropa Publicitaria Chile — Vestuario corporativo con tu logo",
    description:
      "Cotiza en línea vestuario corporativo y merchandising personalizado: sube tu logo, míralo sobre los productos y recibe tu cotización en menos de 24 horas.",
    images: [
      {
        url: "/og/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Ropa Publicitaria Chile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ropa Publicitaria Chile — Vestuario corporativo con tu logo",
    description:
      "Cotiza en línea vestuario corporativo y merchandising personalizado: sube tu logo, míralo sobre los productos y recibe tu cotización en menos de 24 horas.",
    images: ["/og/twitter-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CL"
      className={`${archivo.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-rpc-bg text-rpc-text">
        {/* Google Tag Manager — carga el contenedor GTM. */}
        <Script id="gtm-base" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        {/* Google Tag Manager (noscript) — debe ir apenas abierto el <body>. */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <BrandHeader />
        <main className="flex-1">{children}</main>
        <BrandFooter />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
