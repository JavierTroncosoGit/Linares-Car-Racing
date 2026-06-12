"use server";

import { contactSchema, ContactInput } from "@/lib/schemas";
import siteConfig from "@/lib/config";

export async function sendContactEmail(data: ContactInput) {
  const result = contactSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      error: "Datos inválidos: " + result.error.issues.map((e) => e.message).join(", "),
    };
  }

  const { nombre, telefono, email, servicio, mensaje } = result.data;
  const destinationEmail = siteConfig.contact.email || "linaresracingcars@gmail.com";
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "re_placeholder") {
    console.warn("RESEND_API_KEY is placeholder or not configured. Simulating contact email dispatch.");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, simulated: true };
  }

  try {
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; color: #1f2937;">
        <h2 style="color: #E8A824; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Nuevo Mensaje de Contacto — Racing Cars</h2>
        <p>Se ha recibido una nueva consulta desde el formulario de la landing page:</p>
        <table style="border-collapse: collapse; width: 100%; margin-top: 15px;">
          <tbody>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; width: 150px;">Nombre:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${nombre}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Teléfono:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">
                <a href="tel:${telefono}" style="color: #E8A824; text-decoration: none;">${telefono}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6;">${email || "No especificado"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Servicio:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-weight: 500;">${servicio || "Consulta general"}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6; vertical-align: top;">Mensaje:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; white-space: pre-line;">${mensaje || "Sin mensaje."}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; border-bottom: 1px solid #f3f4f6;">Fecha y Hora:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #f3f4f6; font-size: 0.9em; color: #6b7280;">
                ${new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" })}
              </td>
            </tr>
          </tbody>
        </table>
        <div style="margin-top: 30px; font-size: 0.8em; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px;">
          Mensaje enviado automáticamente desde el sitio web oficial de Racing Cars Linares.
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
        from: "Racing Cars Contacto <onboarding@resend.dev>",
        to: destinationEmail,
        subject: `Consulta: ${servicio || "Contacto General"} - ${nombre}`,
        html: htmlContent,
      }),
    });

    const resData = await response.json();

    if (!response.ok) {
      throw new Error((resData as any).message || "Error al enviar el correo a través de Resend.");
    }

    return { success: true, id: (resData as any).id };
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return {
      success: false,
      error: error.message || "Error interno al enviar el correo. Por favor intenta de nuevo.",
    };
  }
}
