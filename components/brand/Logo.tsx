import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Props = {
  className?: string;
  /** true en el header (above the fold) para evitar flash del logo. */
  priority?: boolean;
};

/**
 * Logo oficial de Ropa Publicitaria Chile.
 *
 * Source: /public/brand/rpc-logo.webp (283×81) — wordmark con rombo coral
 * y banda celeste, entregado por el cliente. Diseñado para fondos claros;
 * en secciones oscuras usar texto plano o el wordmark sobre superficie blanca.
 */
export function Logo({ className, priority = false }: Props) {
  return (
    <Image
      src="/brand/rpc-logo.webp"
      alt="Ropa Publicitaria Chile"
      width={283}
      height={81}
      priority={priority}
      className={cn("h-10 w-auto", className)}
    />
  );
}
