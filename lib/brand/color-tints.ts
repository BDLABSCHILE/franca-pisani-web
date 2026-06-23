/**
 * Mapeo nombre de color (los que usa la marca en `selectedOptions.value`)
 * → hex CSS, para teñir la foto del producto cuando el usuario selecciona
 * una variante en el configurador. El tinte se aplica como overlay con
 * `mix-blend-mode: color`: preserva la luminosidad y sombras de la foto
 * original y reemplaza solo el matiz, así la prenda toma el color y el
 * fondo gris claro queda casi intacto.
 *
 * Calibración: hex elegidos para que el resultado visual sea reconocible,
 * no necesariamente Pantone exacto. Es una aproximación — la marca va a
 * suministrar fotos reales por color en el futuro y este map se elimina.
 *
 * Si el color del producto seleccionado no está en el map (porque es un
 * nombre nuevo), devolvemos null y la foto queda sin tinte (fallback
 * seguro: el usuario ve la foto hero del producto).
 */

const NORMALIZE = (s: string): string =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const COLOR_HEX: Record<string, string> = {
  // Neutros
  negro: "#1a1a1c",
  blanco: "#f4f4f1",
  gris: "#9aa0a6",
  "gris oscuro": "#4d5258",
  beige: "#c9b89a",
  cafe: "#6b4a2b",

  // Azules
  azul: "#2563eb",
  "azul marino": "#1a2b59",
  azulino: "#4e80c9",
  celeste: "#7cb9e8",
  calypso: "#3f7c8a",

  // Rojos y rosados
  rojo: "#c0182b",
  rosado: "#f0a4b8",
  rosa: "#f29bb5",
  fucsia: "#d4327a",
  burdeo: "#7b1f2b",
  morado: "#5c3a8e",
  lila: "#b497d6",

  // Amarillos / naranjos
  amarillo: "#f2c83a",
  naranjo: "#e87a2a",

  // Verdes
  verde: "#3a8a3f",
  "verde militar": "#4a5a3a",
  "verde botella": "#2a4a36",
  "verde agua": "#7fc1b3",
  "verde manzana": "#a3c443",

  // Especiales (pantalones / camisas)
  "azul jeans": "#3a5a7c",
  "interior color": "#c0182b",
  crudo: "#e8dfc7",
};

/**
 * Devuelve el hex para teñir un producto según el nombre del color. Null si
 * el nombre no está mapeado (la foto base se muestra sin tinte).
 */
export function tintForColor(colorName: string | null | undefined): string | null {
  if (!colorName) return null;
  const key = NORMALIZE(colorName);
  return COLOR_HEX[key] ?? null;
}
