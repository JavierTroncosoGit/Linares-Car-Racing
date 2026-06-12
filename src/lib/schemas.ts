import { z } from "zod";

export const contactSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  telefono: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .max(20, "El teléfono es demasiado largo"),
  email: z
    .string()
    .email("Dirección de correo electrónico inválida")
    .optional()
    .or(z.literal("")),
  servicio: z
    .string()
    .optional()
    .or(z.literal("")),
  mensaje: z
    .string()
    .max(1000, "El mensaje no puede exceder los 1000 caracteres")
    .optional()
    .or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const checkoutSchema = z.object({
  nombre: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  telefono: z
    .string()
    .min(8, "El teléfono debe tener al menos 8 dígitos")
    .max(20, "El teléfono es demasiado largo"),
  email: z
    .string()
    .email("Dirección de correo electrónico inválida")
    .optional()
    .or(z.literal("")),
  mensaje: z
    .string()
    .max(1000, "Las notas no pueden exceder los 1000 caracteres")
    .optional()
    .or(z.literal("")),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;
