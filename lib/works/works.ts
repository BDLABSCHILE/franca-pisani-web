/**
 * "Nuestros trabajos" — galería de trabajos REALES de Ropa Publicitaria Chile.
 *
 * Cada entrada corresponde a una foto real de producción entregada por la
 * marca (public/trabajos/*.webp). La copy describe SOLO lo que se ve en la
 * foto —prenda, color, técnica y la marca cuyo logo aparece— sin inventar
 * cantidades, plazos ni historias. Es prueba social honesta.
 *
 * `productHandles` cruza cada trabajo con los productos del catálogo que
 * aparecen en la foto, para mostrarlo en la PDP ("así se ve con tu logo").
 * Solo se listan handles que existen en el catálogo (mock.ts).
 */

export type WorkTechnique = "Bordado" | "Serigrafía" | "Transfer DTF" | "Estampado";

export type RealWork = {
  /** Slug estable = nombre del archivo en public/trabajos/. */
  slug: string;
  /** Marca cuyo logo aparece en la prenda. `null` cuando es una tanda multimarca. */
  client: string | null;
  /** Etiqueta corta para la tarjeta (sin la marca, se muestra aparte). */
  summary: string;
  /** 1–2 frases describiendo lo que se ve. Chileno neutro, "tú". */
  detail: string;
  /** Prendas visibles en la foto. */
  garments: readonly string[];
  /** Técnicas de personalización aplicadas. */
  techniques: readonly WorkTechnique[];
  /** Imagen en public/trabajos/. */
  image: string;
  width: number;
  height: number;
  /** Handles del catálogo que aparecen en la foto (para cruce en la PDP). */
  productHandles: readonly string[];
};

/**
 * Orden curado de la galería: parte por marcas reconocibles y variedad de
 * técnica, para dar confianza apenas se entra a la página.
 */
export const REAL_WORKS: readonly RealWork[] = [
  {
    slug: "claro-poleras-pique",
    client: "Claro",
    summary: "Poleras piqué rojas con logo bordado",
    detail:
      "Polera piqué en rojo corporativo con el logo de Claro bordado al pecho. El bordado aguanta lavados y uso diario sin perder definición — ideal para equipos en terreno y atención a público.",
    garments: ["Polera piqué cuello y botones"],
    techniques: ["Bordado"],
    image: "/trabajos/claro-poleras-pique.webp",
    width: 1200,
    height: 1235,
    productHandles: ["polera-pique-cuello-botones-manga-corta"],
  },
  {
    slug: "funpark-mix",
    client: "Funpark",
    summary: "Softshell y blusa bordadas + polerones estampados",
    detail:
      "Programa de vestuario completo para Funpark: softshell azul marino y blusa celeste con el logo bordado, más polerones canguro naranjo y morado con estampado full color. Una misma identidad, consistente en prendas y técnicas distintas.",
    garments: ["Softshell", "Blusa Oxford", "Polerón canguro"],
    techniques: ["Bordado", "Estampado"],
    image: "/trabajos/funpark-mix.webp",
    width: 1200,
    height: 1033,
    productHandles: ["softshell-hombre", "blusa-oxford", "poleron-canguro"],
  },
  {
    slug: "ibm-transportes",
    client: "IBM Transportes",
    summary: "Uniforme de equipo: polar, polera y chaleco bordados",
    detail:
      "Set completo para IBM Transportes: polar con cierre, polera piqué gris y chaleco multibolsillos, todo con el logo bordado en el mismo lugar. Un equipo entero vestido parejo, prenda por prenda.",
    garments: ["Polar manga larga", "Polera piqué", "Chaleco de trabajo"],
    techniques: ["Bordado"],
    image: "/trabajos/ibm-transportes.webp",
    width: 1200,
    height: 1811,
    productHandles: ["polar-manga-larga", "polera-pique-cuello-botones-manga-corta"],
  },
  {
    slug: "edenred-poleron-polo",
    client: "Edenred",
    summary: "Polerón rojo con estampado al pecho y espalda",
    detail:
      "Polerón polo rojo para Edenred con doble serigrafía: logo al pecho y mensaje de campaña a la espalda («Impulsamos la alegría de vivir»). Ropa corporativa que además comunica.",
    garments: ["Polerón polo cuello redondo"],
    techniques: ["Serigrafía"],
    image: "/trabajos/edenred-poleron-polo.webp",
    width: 1200,
    height: 1588,
    productHandles: ["poleron-polo-cuello-redondo"],
  },
  {
    slug: "natura-jockey-cortavientos",
    client: "Natura",
    summary: "Jockeys y cortavientos con el isotipo estampado",
    detail:
      "Jockeys blanco y naranjo y cortavientos para Natura, con el isotipo de la flor estampado —a gran tamaño en la prenda y en versión chica al frente del jockey. Una marca que se reconoce de lejos.",
    garments: ["Jockey", "Cortavientos"],
    techniques: ["Estampado"],
    image: "/trabajos/natura-jockey-cortavientos.webp",
    width: 1200,
    height: 1059,
    productHandles: ["jockey", "cortavientos"],
  },
  {
    slug: "dtf-canguros-colores",
    client: null,
    summary: "Polerones canguro en seis colores, estampado DTF",
    detail:
      "Una misma tanda de polerones canguro en seis colores con estampado DTF full color en espalda y pecho. El transfer DTF rinde degradés e ilustraciones con muchos colores sin recargo por tono.",
    garments: ["Polerón canguro"],
    techniques: ["Transfer DTF"],
    image: "/trabajos/dtf-canguros-colores.webp",
    width: 1200,
    height: 1833,
    productHandles: ["poleron-canguro"],
  },
  {
    slug: "maihue-cortavientos",
    client: "Maihue",
    summary: "Cortavientos deportivo azulino con logo bordado",
    detail:
      "Conjunto cortavientos para Maihue en azul, con el logo bordado al pecho y en la pierna. Liviano, plegable y resistente al viento para uso deportivo y de terreno.",
    garments: ["Cortavientos", "Pantalón cortaviento"],
    techniques: ["Bordado"],
    image: "/trabajos/maihue-cortavientos.webp",
    width: 1200,
    height: 1794,
    productHandles: ["cortavientos"],
  },
  {
    slug: "chile-hockey-cortavientos",
    client: "Chile Hockey",
    summary: "Cortavientos y jockeys rojos para los Panamericanos Junior",
    detail:
      "Cortavientos y jockeys rojos para la delegación de Chile Hockey en los Junior Pan American Cups 2020, Santiago. Estampado nítido del logo del equipo y del evento sobre rojo.",
    garments: ["Cortavientos", "Jockey"],
    techniques: ["Estampado"],
    image: "/trabajos/chile-hockey-cortavientos.webp",
    width: 1200,
    height: 924,
    productHandles: ["cortavientos", "jockey"],
  },
  {
    slug: "bluey-canguro-serigrafia",
    client: "Bluey's Playground",
    summary: "Polerón canguro celeste, serigrafía pecho y espalda",
    detail:
      "Polerón canguro celeste con serigrafía en la espalda (logo grande + «STAFF») y al pecho. Para uniformar a un equipo de evento, la serigrafía rinde mejor el costo por unidad en tiradas grandes.",
    garments: ["Polerón canguro"],
    techniques: ["Serigrafía"],
    image: "/trabajos/bluey-canguro-serigrafia.webp",
    width: 1200,
    height: 1630,
    productHandles: ["poleron-canguro"],
  },
  {
    slug: "del-cerro-polar-sin-manga",
    client: "Hotel y Restaurante del Cerro",
    summary: "Chaleco polar negro con dos bordados dorados",
    detail:
      "Chaleco polar sin mangas para Hotel y Restaurante del Cerro, con dos logos bordados en hilo dorado al pecho. Dos marcas de una misma casa, juntas en una sola prenda.",
    garments: ["Polar sin mangas"],
    techniques: ["Bordado"],
    image: "/trabajos/del-cerro-polar-sin-manga.webp",
    width: 1200,
    height: 1585,
    productHandles: ["polar-sin-manga"],
  },
  {
    slug: "dunalastair-polera-dryfit",
    client: "Dunalastair School",
    summary: "Polera dry-fit jaspeada con escudo y nombre estampados",
    detail:
      "Polera dry-fit celeste jaspeada para Dunalastair School, con el escudo del colegio al pecho y el rol del equipo («Coach», «Dobs & Dunners») estampado. Pensada para deportes y educación física.",
    garments: ["Polera dry-fit cuello redondo"],
    techniques: ["Estampado"],
    image: "/trabajos/dunalastair-polera-dryfit.webp",
    width: 1200,
    height: 1588,
    productHandles: ["polera-dry-fit-cuello-redondo"],
  },
  {
    slug: "family-festival-canguro",
    client: "Family Festival",
    summary: "Polerón canguro verde pistacho estampado",
    detail:
      "Polerón canguro en verde pistacho con el logo de Family Festival estampado full color al frente. Un color de prenda fuera de lo común, elegido a tono con la identidad del evento.",
    garments: ["Polerón canguro"],
    techniques: ["Estampado"],
    image: "/trabajos/family-festival-canguro.webp",
    width: 1200,
    height: 1694,
    productHandles: ["poleron-canguro"],
  },
] as const;

/** Trabajos reales que incluyen un producto dado (para mostrar en su PDP). */
export function worksForProduct(handle: string): RealWork[] {
  return REAL_WORKS.filter((w) => w.productHandles.includes(handle));
}

/** Lista única de técnicas presentes en la galería, en orden de aparición. */
export function allWorkTechniques(): WorkTechnique[] {
  const seen = new Set<WorkTechnique>();
  for (const w of REAL_WORKS) {
    for (const t of w.techniques) seen.add(t);
  }
  return [...seen];
}
