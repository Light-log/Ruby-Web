export const site = {
  brand: "DEVRUBY",
  legalName: "DEVRUBY LLC",
  email: "soporte@devruby.org",
  phone: "+58 416 411 8747",
  whatsAppUrl:
    "https://wa.me/584164118747?text=Hola%20DEVRUBY%2C%20quiero%20hablar%20sobre%20un%20proyecto.",
} as const;

export function bookingUrl(
  value = process.env.NEXT_PUBLIC_BOOKING_URL
): string | null {
  if (!value) return null;

  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : null;
  } catch {
    return null;
  }
}
