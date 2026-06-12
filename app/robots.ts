import type { MetadataRoute } from "next";

/**
 * robots.txt generado por Next. Sitio 100% público: se permite todo y se
 * apunta al sitemap. NEXT_PUBLIC_SITE_URL permite apuntar a un dominio de
 * staging sin tocar código (default: dominio productivo del cliente).
 */

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ropapublicitariachile.cl";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
