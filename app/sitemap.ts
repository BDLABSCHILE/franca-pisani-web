import type { MetadataRoute } from "next";
import { listCorporateProducts } from "@/lib/shopify/storefront";

/**
 * Sitemap del sitio: rutas estáticas + una entrada por ficha de producto.
 *
 * Las fichas salen de listCorporateProducts() — con USE_MOCK_PRODUCTS=true
 * usa el catálogo demo; con Shopify real refleja los productos publicados.
 * /mis-cotizaciones queda fuera a propósito: es contenido personal por
 * token, sin valor para buscadores.
 */

const SITE_URL =
  process.env["NEXT_PUBLIC_SITE_URL"] ?? "https://ropapublicitariachile.cl";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/catalogo", priority: 0.9 },
  { path: "/cotizador", priority: 0.8 },
  { path: "/como-funciona", priority: 0.7 },
  { path: "/casos-de-exito", priority: 0.6 },
  { path: "/contacto", priority: 0.6 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path, priority }) => ({
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "weekly",
      priority,
    }),
  );

  const products = await listCorporateProducts();
  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/catalogo/${product.handle}`,
    lastModified,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticEntries, ...productEntries];
}
