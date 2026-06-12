# Ropa Publicitaria Chile — Web corporativa B2B

Sitio de cotización corporativa para **Ropa Publicitaria Chile** (Comercial Franca Pisani Ltda.), fabricantes de vestuario corporativo y merchandising con más de 40 años de experiencia. Dominio objetivo: `ropapublicitariachile.cl`.

El flujo es 100% B2B con factor humano: la empresa arma su cotización en línea (catálogo, cantidades, logo, técnica de impresión) y **el equipo la contacta para cerrar** — nunca hay checkout ni pago online. Promesa del cliente: respuesta en menos de 24 horas.

## Modelo del negocio (lo que el sitio comunica)

- **Stock express en Chile**: respuesta rápida y mínimos bajos sobre inventario local.
- **Fabricación a medida**: proyectos especiales producidos en sus fábricas en Oriente, con asesoría de diseño.
- Técnicas: bordado, serigrafía (1 color y full color), transfer DTF, sublimación.
- Categorías: Poleras · Polerones y Polar · Camisas · Pantalones y Ropa Técnica · Jockeys y Gorros · Merchandising.

## Stack

- **Next.js 16** (App Router, Server Components, Server Actions) + **React 19**
- **TypeScript estricto** (`strict`, `noUncheckedIndexedAccess`)
- **Tailwind v4** con tokens RPC declarados en `@theme` (`app/globals.css`, espejo en `lib/brand/rpc-tokens.ts`)
- **next/font** para Archivo (headings) e Inter (body)
- **Resend** para envío de cotizaciones por correo (modo log sin API key)
- Catálogo demo activable con `USE_MOCK_PRODUCTS=true` (sin depender de Shopify)

## Setup local

```bash
npm install
cp .env.example .env.local   # deja USE_MOCK_PRODUCTS=true para el catálogo demo
npm run dev                   # http://localhost:4600
```

Con `USE_MOCK_PRODUCTS=true` todo funciona sin credenciales: el catálogo usa los mocks de `lib/shopify/mock.ts` (precios de referencia, NO precios reales del cliente).

## Pasar a datos reales (Shopify)

1. Crear la app en el Shopify Dev Dashboard de la tienda del cliente y completar en `.env.local`: `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_API_TOKEN`, `SHOPIFY_ADMIN_CLIENT_ID`, `SHOPIFY_ADMIN_CLIENT_SECRET`.
2. Crear las metafield definitions `corporate.*`: `npm run setup:shopify` (idempotente).
3. Configurar los valores producto por producto en Shopify Admin (ejemplos de JSON en `docs/SHOPIFY_SETUP.md`).
4. Cambiar `USE_MOCK_PRODUCTS=false` y reiniciar el dev server.

Para correos reales: crear la cuenta Resend del cliente, verificar el dominio y completar `RESEND_API_KEY`.

## Estructura

```
app/                    Rutas App Router (/, /catalogo, /cotizador, /como-funciona,
                        /casos-de-exito, /contacto, /mis-cotizaciones)
app/robots.ts           robots.txt generado
app/sitemap.ts          Sitemap (estáticas + fichas de producto)
components/
  brand/                Logo, BrandHeader, BrandFooter
lib/
  brand/                rpc-tokens.ts, contacts.ts — single source of truth de marca
  shopify/              Clientes Storefront + Admin, tipos, mock data
  quote/                Cotizador (storage, pricing)
  logo/                 Store global del logo subido (useSyncExternalStore)
public/
  brand/                Assets de marca (rpc-logo.webp, rpc-favicon.png)
  og/                   Open Graph placeholder (hasta tener arte real)
docs/
  CHANGELOG.md          Bitácora del build
```

## Deploy

Pendiente: el cliente debe apuntar el dominio `ropapublicitariachile.cl` (o el subdominio que defina) al hosting. Mientras tanto, `NEXT_PUBLIC_SITE_URL` controla la URL canónica usada en metadata, robots y sitemap.

## Reglas del proyecto

- **Idioma:** español Chile, siempre tú (puedes, cotiza, sube), nunca voseo.
- **No inventar datos del negocio**: cifras, plazos y precios reales los entrega el cliente. Claims permitidos: "más de 40 años", "respuesta en menos de 24 horas", el modelo dual stock express + fabricación a medida.
- **Factor humano:** sin checkout ni pago online; toda cotización termina en contacto del equipo.
- **Push y deploy** los hace Benja manualmente — los commits locales sí los puede hacer el agente.
