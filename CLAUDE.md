@AGENTS.md

# RPC Corporativo — notas para agentes

Web corporativa B2B de **Ropa Publicitaria Chile** (Comercial Franca Pisani Ltda.), fabricantes de vestuario corporativo y merchandising con más de 40 años. Dominio objetivo `ropapublicitariachile.cl`. Base: kit corporativo headless (Next.js 16 + React 19 + TS estricto + Tailwind v4) re-tematizado para RPC.

## Reglas duras

- **Voz:** chileno neutro, SIEMPRE tú (puedes, cotiza, sube), NUNCA voseo. Tono cercano y directo, orgullo de fábrica — sin tono lujo.
- **No inventar datos del negocio** (cifras, plazos exactos, precios). Claims permitidos: "más de 40 años", "respuesta en menos de 24 horas", modelo dual (stock express en Chile + fabricación a medida en Oriente), los clientes reales listados en el sitio.
- **Catálogo demo:** los precios de los mocks son de referencia, no del cliente. `USE_MOCK_PRODUCTS=true` hasta conectar su Shopify.
- **Factor humano:** flujo B2B sin checkout ni pago online. Todo termina en "el equipo te contacta para cerrar".
- **Marca:** tokens en `lib/brand/rpc-tokens.ts` + `app/globals.css` (coral `rpc-accent` = acción, celeste `rpc-info` = informativo). Contacto real en `lib/brand/contacts.ts`. Logo en `public/brand/rpc-logo.webp` y favicon en `public/brand/rpc-favicon.png`. No inventar otra identidad.
- **Contratos estables:** tipos en `lib/shopify/types.ts`, `CartLine` en `lib/quote/storage.ts` (no cambiar su shape), store del logo en `lib/logo/store.ts`.
- **Push y deploy** los hace Benja manualmente; commits locales sí.
