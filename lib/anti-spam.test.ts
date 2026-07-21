import { describe, it, expect } from "vitest";
import {
  checkHoneypotAndTiming,
  looksLikeGibberish,
  HONEYPOT_FIELD,
  TIMESTAMP_FIELD,
  MIN_FILL_MS,
} from "./anti-spam";

function fd(entries: Record<string, string>): FormData {
  const f = new FormData();
  for (const [k, v] of Object.entries(entries)) f.append(k, v);
  return f;
}

describe("checkHoneypotAndTiming", () => {
  const NOW = 1_700_000_000_000;

  it("marca spam si el honeypot viene lleno", () => {
    const res = checkHoneypotAndTiming(fd({ [HONEYPOT_FIELD]: "http://bot" }), NOW);
    expect(res).toEqual({ spam: true, reason: "honeypot" });
  });

  it("ignora honeypot vacío o con espacios", () => {
    expect(checkHoneypotAndTiming(fd({ [HONEYPOT_FIELD]: "   " }), NOW).spam).toBe(false);
    expect(checkHoneypotAndTiming(fd({}), NOW).spam).toBe(false);
  });

  it("marca spam si el envío llega demasiado rápido", () => {
    const rendered = NOW - 500; // medio segundo
    const res = checkHoneypotAndTiming(fd({ [TIMESTAMP_FIELD]: String(rendered) }), NOW);
    expect(res).toEqual({ spam: true, reason: "too-fast" });
  });

  it("acepta envíos que tardaron un tiempo humano", () => {
    const rendered = NOW - (MIN_FILL_MS + 5_000);
    const res = checkHoneypotAndTiming(fd({ [TIMESTAMP_FIELD]: String(rendered) }), NOW);
    expect(res.spam).toBe(false);
  });

  it("no bloquea por timing si falta el timestamp o es basura", () => {
    expect(checkHoneypotAndTiming(fd({}), NOW).spam).toBe(false);
    expect(checkHoneypotAndTiming(fd({ [TIMESTAMP_FIELD]: "abc" }), NOW).spam).toBe(false);
  });
});

describe("looksLikeGibberish", () => {
  it("detecta cadenas aleatorias reales de spam", () => {
    expect(looksLikeGibberish("lnaUrtmHVoMQrWRsykafLshD")).toBe(true);
    expect(looksLikeGibberish("aKpJdsXMEfnSwLPqF")).toBe(true);
    expect(looksLikeGibberish("cJalBTwrDRvUsBSO")).toBe(true);
  });

  it("no marca texto en español legítimo", () => {
    expect(looksLikeGibberish("Hola, necesito 200 poleras con nuestro logo")).toBe(false);
    expect(looksLikeGibberish("Juan Pérez")).toBe(false);
    expect(looksLikeGibberish("Queremos personalización para responsabilidad social")).toBe(false);
    expect(looksLikeGibberish("Comercial Franca Pisani Ltda")).toBe(false);
  });

  it("no marca palabras cortas aunque tengan pocas vocales", () => {
    expect(looksLikeGibberish("BDLABS")).toBe(false);
    expect(looksLikeGibberish("RPC SpA")).toBe(false);
  });

  it("no marca dominios ni emails legítimos", () => {
    expect(looksLikeGibberish("ropapublicitariachile.cl")).toBe(false);
    expect(looksLikeGibberish("contacto@ropapublicitariachile.cl")).toBe(false);
  });
});
