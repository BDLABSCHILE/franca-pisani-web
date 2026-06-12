# Changelog — RPC Corporativo

## RPC v1 — base brutal (2026-06-12)

**Objetivo:** convertir el kit corporativo base en la web B2B de **Ropa Publicitaria Chile** (Comercial Franca Pisani Ltda.) — fabricantes de vestuario corporativo y merchandising con más de 40 años, modelo dual stock express en Chile + fabricación a medida en Oriente.

### Hecho
- **Identidad RPC** completa: tokens en `lib/brand/rpc-tokens.ts` + `app/globals.css` (coral `#f07848` para acción, celeste `#18c0f0` informativo, Archivo headings + Inter body), logo del cliente en `public/brand/rpc-logo.webp` y contacto real en `lib/brand/contacts.ts`.
- **Catálogo demo** con productos mock de las categorías reales (poleras, polerones, polar, camisas, pantalones, jockeys, merchandising) y precios de referencia — `USE_MOCK_PRODUCTS=true` hasta conectar el Shopify del cliente.
- **Flujo B2B con factor humano**: cotización en línea sin checkout ni pago; el equipo contacta para cerrar (promesa: respuesta en menos de 24 horas).
- **SEO técnico + infra**:
  - `app/robots.ts` (allow all + sitemap) y `app/sitemap.ts` (rutas estáticas + fichas de producto vía `listCorporateProducts()`), ambos respetando `NEXT_PUBLIC_SITE_URL` con default `https://ropapublicitariachile.cl`.
  - Iconos del sitio (`app/icon.png`, `app/apple-icon.png`) con el rombo coral del cliente.
  - Open Graph placeholder en `public/og/` (1200×630, rombo + wordmark + banda celeste "Cotiza con tu logo") hasta tener arte real.
  - `README.md` y `CLAUDE.md` reescritos para RPC; comentarios BOLG limpiados en `scripts/` y `lib/shopify/`.

### Pendiente
- Dominio del cliente apuntado al hosting (deploy).
- Conexión al Shopify real: credenciales + `npm run setup:shopify` + metafields por producto + `USE_MOCK_PRODUCTS=false`.
- Cuenta Resend del cliente con dominio verificado para correos reales.
- Arte OG real (hoy es placeholder generado).

> **Nota:** las entradas siguientes (Fase 0 y Fase 1) son la historia del **kit base BOLG Corporativo** sobre el que se construyó este proyecto. Se conservan como referencia técnica.

---

## Fase 1 — Landing + Catálogo (2026-05-25)

**Objetivo:** primera capa visible de la plataforma — landing B2B aspiracional, catálogo filtrable y stub de PDP para validar routing y mocks de punta a punta.

### Hecho
- **Landing `/`** con 6 secciones:
  - Hero con headline aspiracional + dual CTA + mosaico tipográfico de productos (placeholder hasta tener foto real).
  - 3 pilares (cotización instantánea, stock + re-order, preview de logo).
  - Logo wall de clientes (6 slots placeholder).
  - Métricas de track record (4 cifras placeholder con "—" — sin inventar).
  - FAQ B2B con 7 preguntas (mínimos, plazos, técnicas, facturación, IVA, despachos, link público).
  - CTA footer sobre fondo oscuro.
- **`/catalogo`** server component que lee del mock vía `listCorporateProducts()`, con filtros URL-synced (categoría, técnica, stock inmediato, ordenamiento) y grid responsivo.
- **`ProductCard`**, **`ProductGrid`**, **`StockBadge`** con heurística temporal de stock vía variant.id.
- **`CatalogFilters`** + `applyFilters()` puro y testeable, sin estado cliente.
- **`/catalogo/[handle]`** PDP stub que muestra info básica del mock (imagen, precio desde, mínimo, lead time, técnicas) con mensaje de "configurador llega en Fase 2".
- **Stubs** elegantes en `/cotizador`, `/mis-cotizaciones`, `/como-funciona`, `/casos-de-exito`, `/contacto` para que no haya 404 desde el header/footer.
- **Fix infra**: limpieza de cache de Next.js 16 que estaba devolviendo error de RSC manifest. `experimental.typedRoutes` deshabilitado temporal (re-enable en Fase 7).

### Decisiones cerradas
- Body font = **Inter** permanente (no Basic Commercial). La identidad de corporativo diverge ligeramente del retail por esto, intencional.
- Repo GitHub + push los hace Benja manual. El agente solo commitea local.

### Pendiente para Benja
- Foto hero real (mochila BOLG con logo corporativo en contexto premium).
- Logos reales de empresas para `LogoWall`.
- Cifras reales para `SuccessMetrics`.
- Email + WhatsApp del equipo corporativo para `/contacto`.
- Revisar copy del FAQ y ajustar a la realidad operacional.
- Pasar email BOLG para amend del autor de los commits si corresponde.

### Próximo
- Fase 2: PDP completa con configurador Konva, engine de pricing por volumen, análisis de stock + Gantt, timeline. El bloque pesado.

---

## Fase 0 — Setup (2026-05-25)

**Objetivo:** dejar el proyecto andando con identidad visual de BOLG, tipos del dominio y mock data para desarrollar el resto sin depender del Shopify real todavía.

### Hecho
- Scaffolding Next.js 16 (App Router) + TypeScript estricto con `noUncheckedIndexedAccess` + Tailwind v4.
- Tokens de marca extraídos del theme export oficial de bolg.cl (Impulse v7.6.2):
  - Paleta monocromática negro/blanco, burgundy `#682d2d` como único acento.
  - Mona Sans (light, uppercase) para headings; Inter para body.
  - `button_style: round-slight` → radius 3px.
- `lib/brand/bolg-tokens.ts` como single source of truth, espejado en `app/globals.css` con `@theme`.
- Tipos del dominio: `CorporateProduct`, `ProductVariant`, `PrintArea`, `PrintTechnique`, `VolumeBreak`, `Quote`, `QuoteLine`, `LinePricing`.
- Clientes Shopify stub (`storefront.ts`, `admin.ts`) con feature flag `USE_MOCK_PRODUCTS=true`.
- Mock data realista de 3 productos (mochila, botella, polera) con metafields corporate.* completos.
- Layout base con `BrandHeader` + `BrandFooter` + Logo wordmark.
- Utilidades base: `cn`, `formatCLP`, `isValidRut`.
