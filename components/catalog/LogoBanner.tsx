"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import {
  clearStoredLogo,
  fileToStoredLogo,
  logoStore,
  setStoredLogo,
} from "@/lib/logo/store";
import { cn } from "@/lib/utils/cn";

/**
 * Banner sobre el catálogo: la puerta de entrada a la feature estrella.
 *
 * Sin logo → CTA para subirlo inline (sin salir del catálogo, sin registro).
 * Con logo → confirmación "Viendo el catálogo con tu marca" + quitar/cambiar.
 *
 * Usa el store global de lib/logo/store.ts, así el logo subido aquí también
 * queda precargado en el configurador de cada ficha (y viceversa).
 */

const ACCEPTED_TYPES = ["image/png", "image/svg+xml", "image/jpeg"] as const;
const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export function LogoBanner() {
  const dataUrl = useSyncExternalStore(
    logoStore.subscribe,
    logoStore.getSnapshot,
    logoStore.getServerSnapshot,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const openPicker = () => inputRef.current?.click();

  async function handleFile(file: File) {
    setError(null);

    if (!ACCEPTED_TYPES.includes(file.type as (typeof ACCEPTED_TYPES)[number])) {
      setError("Formato no compatible. Sube tu logo en PNG, SVG o JPG.");
      return;
    }
    if (file.size > MAX_SIZE_BYTES) {
      setError(
        `Archivo muy pesado (${Math.round(file.size / 1024 / 1024)} MB). Máximo 10 MB.`,
      );
      return;
    }

    setBusy(true);
    try {
      const stored = await fileToStoredLogo(file);
      const persisted = setStoredLogo(stored);
      if (!persisted) {
        setError(
          "No pudimos guardar tu logo en este navegador. Prueba con un archivo más liviano.",
        );
      }
    } catch {
      setError("No pudimos leer el archivo. Prueba con otro PNG, SVG o JPG.");
    } finally {
      setBusy(false);
      // Permite re-seleccionar el mismo archivo después de quitar el logo.
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPTED_TYPES.join(",")}
      className="hidden"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) void handleFile(file);
      }}
    />
  );

  // --- Con logo: confirmación + acciones -----------------------------------
  if (dataUrl) {
    return (
      <section
        aria-label="Catálogo personalizado con tu logo"
        className="rounded-rpc-card border border-rpc-info/40 bg-rpc-info/5 px-4 py-3 sm:px-5 sm:py-4"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
            <div className="h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-rpc-border bg-rpc-bg p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={dataUrl}
                alt="Tu logo"
                className="h-full w-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="font-rpc-heading text-sm text-rpc-text sm:text-base">
                Viendo el catálogo con tu marca{" "}
                <span aria-hidden className="text-rpc-info-dark">
                  ✓
                </span>
              </p>
              <p className="mt-0.5 font-rpc-body text-xs normal-case tracking-normal text-rpc-text/60">
                Es una referencia visual: el equipo te confirma el mockup final
                antes de producir.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4 pl-14 sm:pl-0">
            <button
              type="button"
              onClick={openPicker}
              className="text-[10px] uppercase tracking-[0.18em] text-rpc-text/60 underline-offset-4 transition hover:text-rpc-text hover:underline"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => clearStoredLogo()}
              className="text-[10px] uppercase tracking-[0.18em] text-rpc-text/60 underline-offset-4 transition hover:text-rpc-error hover:underline"
            >
              Quitar logo
            </button>
          </div>
        </div>

        {error && <p className="mt-2 text-xs text-rpc-error">{error}</p>}
        {fileInput}
      </section>
    );
  }

  // --- Sin logo: CTA de subida inline --------------------------------------
  return (
    <section aria-label="Sube tu logo para personalizar el catálogo">
      <div
        role="button"
        tabIndex={0}
        onClick={openPicker}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPicker();
          }
        }}
        className={cn(
          "flex cursor-pointer flex-col gap-3 rounded-rpc-card border-2 border-dashed border-rpc-info/50 bg-rpc-info/5 px-5 py-5 transition sm:flex-row sm:items-center sm:justify-between sm:gap-6",
          "hover:border-rpc-info hover:bg-rpc-info/10",
        )}
      >
        <div>
          <p className="font-rpc-heading text-base text-rpc-text sm:text-lg">
            Sube tu logo aquí y mira todo el catálogo con tu marca
          </p>
          <p className="mt-1 font-rpc-body text-xs normal-case tracking-normal text-rpc-text/60 sm:text-sm">
            PNG, SVG o JPG. Se aplica al instante sobre cada producto — solo en
            tu navegador, sin registro.
          </p>
        </div>
        <span className="inline-flex shrink-0 items-center justify-center gap-2 rounded-rpc-button bg-rpc-accent px-6 py-3 text-xs uppercase tracking-[0.18em] text-white transition hover:bg-rpc-accent-dark">
          {busy ? "Cargando…" : "Subir mi logo"}
        </span>
      </div>

      {error && <p className="mt-2 text-xs text-rpc-error">{error}</p>}
      {fileInput}
    </section>
  );
}
