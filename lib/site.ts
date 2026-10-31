export const site = {
  brand: "DEVRUBY",
  legalName: "DEVRUBY LLC",
  email: "soporte@devruby.org",
  phone: "+58 416 411 8747",
  linkedInUrl: "https://www.linkedin.com/company/devruby",
  /** Cita en inglés de Cal.com para las rutas /us; la española es el valor por defecto de bookingUrl(). */
  usBookingUrl: "https://cal.com/devruby/discovery-call",
  whatsAppUrl:
    "https://wa.me/584164118747?text=Hola%20DEVRUBY%2C%20quiero%20hablar%20sobre%20un%20proyecto.",
  /** Mismo número con el mensaje en inglés, para las rutas /us. */
  usWhatsAppUrl:
    "https://wa.me/584164118747?text=Hello%20DEVRUBY%2C%20I%20would%20like%20to%20talk%20about%20a%20project.",
  /** Datos registrales del aviso legal. Solo datos de documentos oficiales: no inventar. */
  registry: {
    // Fuente: Docs/Empresa_LLC/Ficha_Identificacion_DEVRUBY_LLC.pdf
    jurisdiction: "Nuevo México, EE. UU. (Limited Liability Company, 21 de julio de 2026)",
    address: "8206 Louisiana Blvd NE, Ste A #10199, Albuquerque, NM 87113, EE. UU.",
    number: "NM SOS Business ID 0008118174 (Secretario de Estado de Nuevo México)",
  },
} as const;

export function bookingUrl(
  value = process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/devruby/30min"
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
