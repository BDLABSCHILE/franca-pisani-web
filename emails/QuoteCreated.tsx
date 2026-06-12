/* eslint-disable @next/next/no-head-element -- HTML email, no es una página Next */
import type { CartLine } from "@/lib/quote/storage";
import { formatCLP, IVA_RATE } from "@/lib/utils/money";
import { CONTACT, CONTACT_LINKS } from "@/lib/brand/contacts";

/**
 * Email transaccional al cliente cuando termina su cotización.
 *
 * Diseño: tabla simple, sin grids ni flex (Outlook los rompe). Estilos inline,
 * paleta RPC (tinta #101418, coral #f07848, celeste #18c0f0). El PDF formal
 * va como attachment en la request a Resend; este mail es la cara visible
 * que llega al inbox.
 */

export type QuoteCreatedProps = {
  quoteNumber: string;
  createdAt: Date;
  customer: {
    companyName: string;
    contactName: string;
    contactEmail: string;
  };
  lines: CartLine[];
};

const palette = {
  text: "#101418",
  textMuted: "#5b6168",
  border: "#e6e8ea",
  bg: "#ffffff",
  bgMuted: "#f6f7f8",
  accent: "#f07848",
  info: "#18c0f0",
};

const fontStack = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export function QuoteCreated({
  quoteNumber,
  customer,
  lines,
}: QuoteCreatedProps) {
  const subtotalNet = lines.reduce((s, l) => s + l.pricing.subtotalNet, 0);
  const iva = subtotalNet * IVA_RATE;
  const totalGross = subtotalNet + iva;
  const totalUnits = lines.reduce((s, l) => s + l.quantity, 0);

  return (
    <html lang="es-CL">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Cotización {quoteNumber} · Ropa Publicitaria Chile</title>
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: palette.bgMuted,
          fontFamily: fontStack,
          color: palette.text,
        }}
      >
        <table
          role="presentation"
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          style={{ backgroundColor: palette.bgMuted, padding: "32px 16px" }}
        >
          <tbody>
            <tr>
              <td align="center">
                <table
                  role="presentation"
                  width="600"
                  cellPadding={0}
                  cellSpacing={0}
                  style={{
                    maxWidth: 600,
                    width: "100%",
                    backgroundColor: palette.bg,
                    border: `1px solid ${palette.border}`,
                    borderTop: `4px solid ${palette.accent}`,
                  }}
                >
                  <tbody>
                    {/* Header marca */}
                    <tr>
                      <td
                        style={{
                          padding: "32px 32px 16px",
                          borderBottom: `1px solid ${palette.border}`,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 18,
                            letterSpacing: "0.1em",
                            fontWeight: 700,
                            color: palette.text,
                          }}
                        >
                          <span style={{ color: palette.accent }}>◆</span>{" "}
                          ROPA PUBLICITARIA CHILE
                        </p>
                        <p
                          style={{
                            margin: "4px 0 0",
                            fontSize: 10,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: palette.textMuted,
                          }}
                        >
                          Vestuario corporativo · Cotización
                        </p>
                      </td>
                    </tr>

                    {/* Saludo */}
                    <tr>
                      <td style={{ padding: "28px 32px 8px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: palette.textMuted,
                          }}
                        >
                          Cotización {quoteNumber}
                        </p>
                        <h1
                          style={{
                            margin: "12px 0 0",
                            fontSize: 24,
                            fontWeight: 700,
                            lineHeight: 1.2,
                            color: palette.text,
                          }}
                        >
                          Hola {customer.contactName.split(" ")[0]}, recibimos tu
                          cotización.
                        </h1>
                        <p
                          style={{
                            margin: "16px 0 0",
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: palette.text,
                          }}
                        >
                          Gracias por cotizar con Ropa Publicitaria Chile el
                          vestuario corporativo de{" "}
                          <strong>{customer.companyName}</strong>. Adjuntamos el
                          PDF con el detalle de los productos y las condiciones
                          comerciales.
                        </p>
                        <p
                          style={{
                            margin: "12px 0 0",
                            fontSize: 14,
                            lineHeight: 1.55,
                            color: palette.text,
                          }}
                        >
                          Nuestro equipo revisará tu requerimiento y te
                          contactará en menos de 24 horas hábiles para confirmar
                          precios, stock y plazos, y coordinar contigo los
                          siguientes pasos.
                        </p>
                      </td>
                    </tr>

                    {/* Resumen */}
                    <tr>
                      <td style={{ padding: "24px 32px 8px" }}>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: palette.textMuted,
                          }}
                        >
                          Resumen
                        </p>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding={0}
                          cellSpacing={0}
                          style={{
                            borderTop: `1px solid ${palette.border}`,
                            borderBottom: `1px solid ${palette.border}`,
                          }}
                        >
                          <tbody>
                            <SummaryRow
                              label={`${lines.length} ${lines.length === 1 ? "línea" : "líneas"} · ${totalUnits} unidades`}
                              value=""
                              muted
                            />
                            <SummaryRow
                              label="Subtotal neto"
                              value={formatCLP(subtotalNet)}
                            />
                            <SummaryRow
                              label="IVA 19%"
                              value={formatCLP(iva)}
                              muted
                            />
                            <SummaryRow
                              label="Total bruto"
                              value={formatCLP(totalGross)}
                              emphasis
                            />
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Carácter referencial */}
                    <tr>
                      <td style={{ padding: "16px 32px 8px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 12,
                            lineHeight: 1.55,
                            color: palette.textMuted,
                          }}
                        >
                          Esta cotización es{" "}
                          <strong style={{ color: palette.text }}>
                            referencial
                          </strong>{" "}
                          y será confirmada por nuestro equipo en menos de 24
                          horas hábiles.
                        </p>
                      </td>
                    </tr>

                    {/* Próximos pasos */}
                    <tr>
                      <td style={{ padding: "24px 32px" }}>
                        <p
                          style={{
                            margin: "0 0 12px",
                            fontSize: 11,
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: palette.textMuted,
                          }}
                        >
                          Próximos pasos
                        </p>
                        <ol
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            fontSize: 13,
                            lineHeight: 1.7,
                            color: palette.text,
                          }}
                        >
                          <li>
                            Revisamos disponibilidad: stock express en Chile o
                            fabricación a medida.
                          </li>
                          <li>Confirmamos precios y plazo de entrega.</li>
                          <li>Te enviamos el mockup digital con tu logo aplicado.</li>
                          <li>
                            Apruebas y coordinamos la producción con nuestro
                            equipo.
                          </li>
                        </ol>
                      </td>
                    </tr>

                    {/* CTA secundario */}
                    <tr>
                      <td style={{ padding: "0 32px 32px" }}>
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13,
                            lineHeight: 1.55,
                            color: palette.text,
                          }}
                        >
                          ¿Necesitas ajustar algo? Responde este correo y nos
                          coordinamos directamente. También puedes escribir a{" "}
                          <a
                            href={`mailto:${CONTACT.email}`}
                            style={{ color: palette.accent, textDecoration: "none" }}
                          >
                            {CONTACT.email}
                          </a>{" "}
                          o por WhatsApp al{" "}
                          <a
                            href={CONTACT_LINKS.whatsapp}
                            style={{ color: palette.accent, textDecoration: "none" }}
                          >
                            {CONTACT.whatsappDisplay}
                          </a>
                          .
                        </p>
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td
                        style={{
                          padding: "20px 32px",
                          borderTop: `1px solid ${palette.border}`,
                          backgroundColor: palette.bgMuted,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 10,
                            letterSpacing: "0.15em",
                            textTransform: "uppercase",
                            color: palette.textMuted,
                          }}
                        >
                          Ropa Publicitaria Chile · ropapublicitariachile.cl
                        </p>
                        <p
                          style={{
                            margin: "6px 0 0",
                            fontSize: 10,
                            color: palette.textMuted,
                          }}
                        >
                          Este correo se envió a {customer.contactEmail} porque
                          solicitaste una cotización en ropapublicitariachile.cl.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

function SummaryRow({
  label,
  value,
  muted,
  emphasis,
}: {
  label: string;
  value: string;
  muted?: boolean;
  emphasis?: boolean;
}) {
  const labelStyle: React.CSSProperties = {
    padding: emphasis ? "14px 0" : "8px 0",
    fontSize: emphasis ? 12 : 13,
    textTransform: emphasis ? "uppercase" : "none",
    letterSpacing: emphasis ? "0.18em" : "normal",
    color: muted ? palette.textMuted : palette.text,
  };
  const valueStyle: React.CSSProperties = {
    padding: emphasis ? "14px 0" : "8px 0",
    textAlign: "right",
    fontSize: emphasis ? 18 : 13,
    fontWeight: emphasis ? 700 : 400,
    color: muted ? palette.textMuted : palette.text,
  };
  return (
    <tr
      style={
        emphasis ? { borderTop: `1px solid ${palette.border}` } : undefined
      }
    >
      <td style={labelStyle}>{label}</td>
      <td style={valueStyle}>{value}</td>
    </tr>
  );
}
