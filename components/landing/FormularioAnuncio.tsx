"use client";

import { useActionState, useEffect, useRef } from "react";
import { medir } from "@/lib/medicion";
import { submitLandingAction, type LandingResult } from "@/lib/landing/submit-action";
import { HONEYPOT_FIELD, TIMESTAMP_FIELD } from "@/lib/anti-spam";
import { cn } from "@/lib/utils/cn";

const PRODUCTOS = ["Poleras", "Polerones", "Chaquetas", "Camisas", "Jockeys", "Polar", "Pantalones", "Otro"];

export function FormularioAnuncio() {
  const formRef = useRef<HTMLFormElement>(null);
  const tsRef = useRef<HTMLInputElement>(null);
  const [state, action, pending] = useActionState<LandingResult | null, FormData>(submitLandingAction, null);

  useEffect(() => { if (tsRef.current) tsRef.current.value = String(Date.now()); }, []);
  useEffect(() => {
    if (state?.ok) {
      void medir("contacto_enviado", { id: state.id || undefined, origen: "cotiza-empresa" });
      formRef.current?.reset();
    }
  }, [state]);

  const e = state && !state.ok ? state.errors : {};

  if (state?.ok) {
    return (
      <div role="status" className="border border-rpc-text bg-rpc-image-bg-light px-6 py-8 text-center">
        <p className="text-xs uppercase tracking-[0.22em] text-rpc-text">¡Listo! Recibimos tus datos</p>
        <p className="mt-3 font-rpc-body text-sm normal-case tracking-normal text-rpc-text/80">
          Te contactamos lo antes posible para cotizar tu proyecto. Si es urgente, escríbenos por WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form ref={formRef} action={action} className="grid gap-5 sm:grid-cols-2 sm:gap-x-8">
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
        <label>No llenes este campo<input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" /></label>
      </div>
      <input type="hidden" name={TIMESTAMP_FIELD} ref={tsRef} defaultValue="" />

      <Campo label="Nombre y apellido" name="name" required autoComplete="name" error={e.name} />
      <Campo label="Celular" name="phone" type="tel" required autoComplete="tel" placeholder="+56 9 1234 5678" error={e.phone} />
      <Campo label="Email" name="email" type="email" required autoComplete="email" error={e.email} />
      <Campo label="Empresa" name="company" required autoComplete="organization" error={e.company} />

      <label className="block">
        <span className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/60">¿Qué quieres cotizar?</span>
        <select name="product" required defaultValue="" aria-invalid={Boolean(e.product)}
          className={cn("mt-2 block w-full border-b bg-transparent py-2 font-rpc-body text-sm text-rpc-text focus:outline-none", e.product ? "border-rpc-error" : "border-rpc-border focus:border-rpc-text")}>
          <option value="" disabled>Elige una opción</option>
          {PRODUCTOS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        {e.product && <span className="mt-1 block text-[11px] text-rpc-error">{e.product}</span>}
      </label>
      <Campo label="¿Cuántas unidades? (mínimo 10)" name="quantity" type="number" required min={10} placeholder="10" error={e.quantity} />

      <label className="block sm:col-span-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/60">Algo más que debamos saber (opcional)</span>
        <textarea name="notes" rows={3} placeholder="Colores, técnica (bordado o estampado), fecha que lo necesitas…"
          className="mt-2 block w-full resize-none border border-rpc-border bg-transparent p-3 font-rpc-body text-sm text-rpc-text placeholder:text-rpc-text/30 focus:border-rpc-text focus:outline-none" />
      </label>

      {state && !state.ok && state.formError && (
        <div role="alert" className="sm:col-span-2 rounded border border-rpc-error/30 bg-rpc-error/5 px-4 py-3 text-sm text-rpc-error">{state.formError}</div>
      )}

      <div className="sm:col-span-2">
        <button type="submit" disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-rpc-button bg-rpc-accent px-8 py-4 text-xs uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {pending ? "Enviando…" : "Quiero mi cotización"}
        </button>
        <p className="mt-3 text-center text-[11px] font-rpc-body normal-case tracking-normal text-rpc-text/50">
          Te respondemos en menos de 24 horas. Sin compromiso.
        </p>
      </div>
    </form>
  );
}

function Campo({ label, name, type = "text", required, autoComplete, placeholder, min, error }: {
  label: string; name: string; type?: string; required?: boolean; autoComplete?: string; placeholder?: string; min?: number; error?: string;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-rpc-text/60">{label}</span>
      <input type={type} name={name} required={required} autoComplete={autoComplete} placeholder={placeholder} min={min}
        aria-invalid={Boolean(error)}
        className={cn("mt-2 block w-full border-b bg-transparent py-2 font-rpc-body text-sm normal-case tracking-normal text-rpc-text placeholder:text-rpc-text/30 focus:outline-none",
          error ? "border-rpc-error focus:border-rpc-error" : "border-rpc-border focus:border-rpc-text")} />
      {error && <span className="mt-1 block text-[11px] text-rpc-error">{error}</span>}
    </label>
  );
}
