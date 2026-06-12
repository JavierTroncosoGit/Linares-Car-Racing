import siteConfig from "./config";

/**
 * Formats a number to Chilean Peso currency (e.g. 15000 -> $15.000)
 */
export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Builds a WhatsApp URL for submitting a cart order
 */
export function buildWhatsAppOrderLink(orderDetails: string, total: string): string {
  const number = siteConfig.store.cart.whatsappOrderNumber || "56949340772";
  const template = siteConfig.store.cart.whatsappOrderMessage || "Hola, quiero hacer un pedido en Linares Racing Cars:\n\n{orderDetails}\n\nTotal: {total}";
  
  const formattedMsg = template
    .replace("{orderDetails}", orderDetails)
    .replace("{total}", total);
    
  return `https://wa.me/${number}?text=${encodeURIComponent(formattedMsg)}`;
}
