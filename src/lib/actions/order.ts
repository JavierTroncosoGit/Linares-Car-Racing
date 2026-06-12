"use server";

import { checkoutSchema, CheckoutInput } from "@/lib/schemas";
import { CartItem } from "@/types/product";
import siteConfig from "@/lib/config";
import { formatCLP } from "@/lib/format";

export async function sendOrderEmail(buyerData: CheckoutInput, items: CartItem[], totalPrice: number) {
  const result = checkoutSchema.safeParse(buyerData);
  if (!result.success) {
    return {
      success: false,
      error: "Datos del comprador inválidos: " + result.error.issues.map((e) => e.message).join(", "),
    };
  }

  if (!items || items.length === 0) {
    return {
      success: false,
      error: "El carrito está vacío. No se puede generar un pedido.",
    };
  }

  const { nombre, telefono, email, mensaje } = result.data;
  const destinationEmail = siteConfig.store.cart.formDestinationEmail || "linaresracingcars@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "re_placeholder") {
    console.warn("RESEND_API_KEY is placeholder or not configured. Simulating order email dispatch.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, simulated: true };
  }

  try {
    // Generate HTML rows for products
    const productRows = items
      .map((item) => {
        const subtotal = item.product.price * item.quantity;
        return `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 10px; font-size: 0.9em; font-family: sans-serif;">${item.product.sku}</td>
            <td style="padding: 10px; font-size: 0.9em; font-family: sans-serif;">
              <strong>${item.product.brand}</strong> - ${item.product.name}
            </td>
            <td style="padding: 10px; text-align: center; font-size: 0.9em; font-family: sans-serif;">${item.quantity}</td>
            <td style="padding: 10px; text-align: right; font-size: 0.9em; font-family: sans-serif;">${formatCLP(item.product.price)}</td>
            <td style="padding: 10px; text-align: right; font-size: 0.9em; font-weight: bold; color: #111827; font-family: sans-serif;">${formatCLP(subtotal)}</td>
          </tr>
        `;
      })
      .join("");

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 650px; color: #1f2937; line-height: 1.6;">
        <h2 style="color: #E8A824; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 20px; font-family: sans-serif;">
          Nuevo Pedido de Cotización — Racing Cars
        </h2>
        
        <h3 style="color: #111827; margin-top: 25px; border-bottom: 1px solid #f3f4f6; padding-bottom: 5px; font-family: sans-serif;">
          Datos del Comprador
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; font-family: sans-serif;">
          <tbody>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; width: 140px;">Nombre:</td>
              <td style="padding: 6px 0;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Teléfono:</td>
              <td style="padding: 6px 0;">
                <a href="tel:${telefono}" style="color: #E8A824; text-decoration: none;">${telefono}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold;">Email:</td>
              <td style="padding: 6px 0;">${email || "No especificado"}</td>
            </tr>
            <tr>
              <td style="padding: 6px 0; font-weight: bold; vertical-align: top;">Notas / Vehículo:</td>
              <td style="padding: 6px 0; white-space: pre-line;">${mensaje || "Sin notas adicionales."}</td>
            </tr>
          </tbody>
        </table>

        <h3 style="color: #111827; margin-top: 25px; border-bottom: 1px solid #f3f4f6; padding-bottom: 5px; font-family: sans-serif;">
          Productos Solicitados
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-family: sans-serif;">
          <thead>
            <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;">
              <th style="padding: 10px; text-align: left; font-size: 0.85em; text-transform: uppercase; color: #4b5563;">SKU</th>
              <th style="padding: 10px; text-align: left; font-size: 0.85em; text-transform: uppercase; color: #4b5563;">Descripción</th>
              <th style="padding: 10px; text-align: center; font-size: 0.85em; text-transform: uppercase; color: #4b5563;">Cant.</th>
              <th style="padding: 10px; text-align: right; font-size: 0.85em; text-transform: uppercase; color: #4b5563;">Unitario</th>
              <th style="padding: 10px; text-align: right; font-size: 0.85em; text-transform: uppercase; color: #4b5563;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${productRows}
            <tr style="background-color: #f9fafb; font-weight: bold; border-top: 2px solid #e5e7eb;">
              <td colspan="3" style="padding: 12px 10px;"></td>
              <td style="padding: 12px 10px; text-align: right; font-size: 0.95em; font-family: sans-serif;">Total Estimado:</td>
              <td style="padding: 12px 10px; text-align: right; font-size: 1.1em; color: #E8A824; font-family: sans-serif;">${formatCLP(totalPrice)}</td>
            </tr>
          </tbody>
        </table>

        <div style="margin-top: 20px; background-color: #fef3c7; border: 1px solid #fde68a; border-radius: 6px; padding: 15px; font-size: 0.9em; color: #78350f; font-family: sans-serif;">
          <strong>Nota de Despacho / Retiro:</strong><br />
          Retiro en nuestro local ubicado en Av. Presidente Ibáñez #630, Linares. Le confirmaremos al cliente cuando su pedido esté listo para retirar.
        </div>

        <div style="margin-top: 40px; font-size: 0.8em; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px; font-family: sans-serif;">
          Pedido enviado automáticamente desde el carro de cotizaciones de Racing Cars Linares.
        </div>
      </div>
    `;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Racing Cars Pedidos <onboarding@resend.dev>",
        to: destinationEmail,
        subject: `Nuevo Pedido de Cotización - ${nombre}`,
        html: htmlContent,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error((resData as any).message || "Error al enviar el correo a través de Resend.");
    }

    return { success: true, id: (resData as any).id };
  } catch (error: any) {
    console.error("Error sending order email:", error);
    return {
      success: false,
      error: error.message || "Error interno al procesar el correo de tu pedido.",
    };
  }
}
