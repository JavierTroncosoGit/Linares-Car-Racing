"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import siteConfig from "@/lib/config";
import { contactSchema, ContactInput } from "@/lib/schemas";
import { sendContactEmail } from "@/lib/actions/contact";

export default function ContactForm() {
  const formSection = siteConfig.pages.landing.sections.find((s) => s.type === "contact-form");
  if (!formSection || !formSection.fields) return null;

  const [success, setSuccess] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      servicio: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setErrorMessage(null);
    try {
      const response = await sendContactEmail(data);
      if (response.success) {
        setSuccess(true);
        reset();
      } else {
        setSuccess(false);
        setErrorMessage(response.error || "Hubo un error al enviar el formulario.");
      }
    } catch {
      setSuccess(false);
      setErrorMessage("Error de conexión. Por favor, intenta de nuevo.");
    }
  };

  return (
    <section id="contacto" className="w-full bg-bg-primary py-20 lg:py-28 border-b border-border/50">
      <div className="mx-auto max-w-[650px] px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          {formSection.sectionLabel && (
            <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/20 pb-1">
              {formSection.sectionLabel}
            </span>
          )}
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            {formSection.headline}
          </h2>
          {formSection.subheadline && (
            <p className="text-text-secondary mt-3 text-sm sm:text-base font-light">
              {formSection.subheadline}
            </p>
          )}
        </div>

        {/* Contact Form card */}
        <motion.div
          className="border border-border bg-bg-primary p-6 sm:p-8 rounded-xl shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {success === true ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 rounded-full bg-success/10 border border-success/30 text-success flex items-center justify-center mx-auto text-xl font-bold">
                ✓
              </div>
              <h3 className="font-extrabold font-heading text-lg text-text-primary uppercase tracking-wide">
                ¡ENVÍO EXITOSO!
              </h3>
              <p className="text-sm text-text-secondary max-w-sm mx-auto font-light leading-relaxed">
                {formSection.successMessage || "Hemos recibido tus datos y te contactaremos en breve."}
              </p>
              <button
                onClick={() => setSuccess(null)}
                className="mt-4 px-4 py-2 border border-border text-xs font-bold font-heading uppercase tracking-wider rounded hover:bg-border/20 transition-colors cursor-pointer"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {formSection.fields.map((field) => {
                const isTextarea = field.type === "textarea";
                const isSelect = field.type === "select";
                const error = errors[field.id as keyof ContactInput];
                
                return (
                  <div key={field.id} className="space-y-1.5">
                    <label htmlFor={field.id} className="block text-xs font-bold uppercase tracking-wider text-text-secondary">
                      {field.label} {field.required && <span className="text-primary">*</span>}
                    </label>

                    {isSelect ? (
                      <select
                        id={field.id}
                        {...register(field.id as keyof ContactInput)}
                        className={`w-full text-base bg-bg-secondary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors cursor-pointer ${
                          error ? "border-danger" : "border-border"
                        }`}
                      >
                        <option value="">Seleccione una opción...</option>
                        {field.options?.map((opt, oIdx) => (
                          <option key={oIdx} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : isTextarea ? (
                      <textarea
                        id={field.id}
                        {...register(field.id as keyof ContactInput)}
                        rows={4}
                        className={`w-full text-base bg-bg-secondary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors resize-none ${
                          error ? "border-danger" : "border-border"
                        }`}
                      />
                    ) : (
                      <input
                        id={field.id}
                        type={field.type}
                        {...register(field.id as keyof ContactInput)}
                        className={`w-full text-base bg-bg-secondary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors ${
                          error ? "border-danger" : "border-border"
                        }`}
                      />
                    )}

                    {error && (
                      <span className="text-xs text-danger font-medium block mt-1">
                        {error.message}
                      </span>
                    )}
                  </div>
                );
              })}

              {success === false && errorMessage && (
                <p className="text-xs text-danger font-semibold text-center">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-primary text-bg-primary font-black font-heading text-base tracking-wider rounded-md hover:bg-primary-dark transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed uppercase shadow-lg shadow-primary/10 mt-2"
              >
                {isSubmitting ? "PROCESANDO..." : formSection.submitLabel?.toUpperCase() || "CONFIRMAR COTIZACIÓN"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
