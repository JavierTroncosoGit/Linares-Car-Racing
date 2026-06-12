"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/hooks/useCart";
import { formatCLP, buildWhatsAppOrderLink } from "@/lib/format";
import siteConfig from "@/lib/config";
import { checkoutSchema, CheckoutInput } from "@/lib/schemas";
import { sendOrderEmail } from "@/lib/actions/order";

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems, clearCart } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      mensaje: "",
    },
  });

  const onSubmit = async (data: CheckoutInput) => {
    setErrorMessage(null);
    const cartConfig = siteConfig.store.cart;
    const orderMethod = cartConfig.orderMethod || "both";

    try {
      // 1. If method is both or form, send email notification via Server Action
      if (orderMethod === "both" || orderMethod === "form") {
        const emailResponse = await sendOrderEmail(data, items, totalPrice);
        if (!emailResponse.success) {
          setErrorMessage(emailResponse.error || "Hubo un error al registrar el pedido por correo.");
          return;
        }
      }

      // 2. If method is both or whatsapp, open WhatsApp order details link
      if (orderMethod === "both" || orderMethod === "whatsapp") {
        const orderDetailsText = items
          .map(
            (item) =>
              `- ${item.product.name} (SKU: ${item.product.sku}) x${item.quantity} - ${formatCLP(
                item.product.price * item.quantity
              )}`
          )
          .join("\n");

        const buyerInfoText = `\nComprador: ${data.nombre}\nTeléfono: ${data.telefono}${data.email ? `\nEmail: ${data.email}` : ""}${data.mensaje ? `\nVehículo / Notas: ${data.mensaje}` : ""}`;
        const fullDetails = `${orderDetailsText}\n${buyerInfoText}`;
        const totalStr = formatCLP(totalPrice);

        const url = buildWhatsAppOrderLink(fullDetails, totalStr);
        window.open(url, "_blank");
      }

      // 3. Clear cart and show success state
      clearCart();
      setOrderCompleted(true);
    } catch {
      setErrorMessage("Error de conexión al procesar el pedido. Por favor intenta nuevamente.");
    }
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading text-text-primary">
          Carrito de Compras
        </h1>
        <p className="text-text-secondary mt-2">
          Revisa tus productos y finaliza tu pedido.
        </p>
      </div>

      {orderCompleted ? (
        <div className="border border-dashed border-border p-12 text-center rounded-lg max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-success/10 border border-success/30 text-success flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h3 className="font-extrabold text-text-primary text-xl font-heading uppercase tracking-wider">
            ¡Pedido Recibido!
          </h3>
          <p className="text-sm text-text-secondary mt-1 max-w-sm mx-auto font-light leading-relaxed">
            Tu cotización se ha registrado y enviado correctamente.
            {siteConfig.store.cart.orderMethod !== "form" && (
              <span> Nos pondremos en contacto contigo por teléfono o WhatsApp para confirmar la disponibilidad y coordinar tu retiro.</span>
            )}
          </p>
          <div className="pt-4">
            <Link
              href="/catalogo"
              className="px-5 py-2.5 bg-primary text-bg-primary font-bold rounded-md hover:bg-primary-dark transition-colors font-heading tracking-wide"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="border border-dashed border-border p-12 text-center rounded-lg max-w-xl mx-auto">
          <h3 className="font-bold text-text-primary text-lg">Tu carrito está vacío</h3>
          <p className="text-sm text-text-secondary mt-1">
            Agrega productos desde nuestro catálogo para realizar una cotización.
          </p>
          <Link
            href="/catalogo"
            className="mt-6 inline-block px-5 py-2.5 bg-primary text-bg-primary font-bold rounded-md hover:bg-primary-dark transition-colors font-heading tracking-wide cursor-pointer"
          >
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* List of Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold font-heading text-primary border-b border-border pb-2">
              Productos seleccionados ({totalItems})
            </h2>
            <div className="divide-y divide-border border border-border rounded-lg overflow-hidden bg-bg-secondary">
              {items.map((item) => (
                <div key={item.product.sku} className="p-4 flex gap-4 items-center">
                  <div className="w-16 h-16 bg-neutral-900 border border-border rounded-md overflow-hidden flex items-center justify-center relative flex-shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <span className="text-xs font-semibold text-primary font-heading uppercase">
                      {item.product.brand}
                    </span>
                    <h3 className="font-bold text-text-primary text-sm line-clamp-1">
                      {item.product.name}
                    </h3>
                    <p className="text-xs text-text-secondary font-mono mt-0.5">
                      SKU: {item.product.sku}
                    </p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-border rounded bg-bg-primary h-11 overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.sku, item.quantity - 1)}
                          className="w-11 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-semibold text-text-primary h-full flex items-center justify-center border-x border-border">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.sku, item.quantity + 1)}
                          className="w-11 h-full text-text-secondary hover:text-text-primary hover:bg-border/20 transition-colors flex items-center justify-center font-bold"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.sku)}
                        className="text-xs text-danger hover:underline font-heading font-semibold cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="font-bold text-text-primary text-sm block">
                      {formatCLP(item.product.price * item.quantity)}
                    </span>
                    <span className="text-[10px] text-text-secondary block">
                      {formatCLP(item.product.price)} c/u
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {confirmClear ? (
              <div className="flex gap-3 items-center mt-2">
                <span className="text-xs text-danger font-bold uppercase">¿Confirmas vaciar el carro?</span>
                <button
                  onClick={() => {
                    clearCart();
                    setConfirmClear(false);
                  }}
                  className="text-xs text-danger hover:underline font-bold cursor-pointer uppercase py-1"
                >
                  Sí, vaciar
                </button>
                <span className="text-text-secondary text-xs">|</span>
                <button
                  onClick={() => setConfirmClear(false)}
                  className="text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer uppercase font-semibold py-1"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmClear(true)}
                className="text-xs text-text-secondary hover:text-primary transition-colors underline cursor-pointer mt-2"
              >
                Vaciar carrito
              </button>
            )}
          </div>

          {/* Checkout / Order Summary */}
          <div className="space-y-6">
            <h2 className="text-lg font-bold font-heading text-primary border-b border-border pb-2">
              Resumen del Pedido
            </h2>
            <div className="border border-border bg-bg-secondary p-6 rounded-lg space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Subtotal ({totalItems} items)</span>
                <span className="text-text-primary font-semibold">{formatCLP(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Despacho</span>
                <span className="text-success font-medium">Retiro en local (Gratis)</span>
              </div>
              <div className="border-t border-border pt-4 flex justify-between">
                <span className="font-bold text-text-primary">Total Estimado</span>
                <span className="font-black text-primary text-xl font-heading">{formatCLP(totalPrice)}</span>
              </div>

              {/* Checkout Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="border-t border-border pt-4 space-y-3">
                <h3 className="text-sm font-bold font-heading text-primary uppercase">Datos de Contacto</h3>
                
                <div>
                  <label htmlFor="nombre" className="block text-xs font-semibold text-text-secondary mb-1">
                    Nombre Completo <span className="text-primary">*</span>
                  </label>
                  <input
                    id="nombre"
                    type="text"
                    {...register("nombre")}
                    placeholder="Ej. Juan Pérez"
                    className={`w-full text-base bg-bg-primary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors ${
                      errors.nombre ? "border-danger" : "border-border"
                    }`}
                  />
                  {errors.nombre && (
                    <span className="text-xs text-danger font-medium block mt-1">
                      {errors.nombre.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="telefono" className="block text-xs font-semibold text-text-secondary mb-1">
                    Teléfono de Contacto <span className="text-primary">*</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    {...register("telefono")}
                    placeholder="Ej. +56912345678"
                    className={`w-full text-base bg-bg-primary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors ${
                      errors.telefono ? "border-danger" : "border-border"
                    }`}
                  />
                  {errors.telefono && (
                    <span className="text-xs text-danger font-medium block mt-1">
                      {errors.telefono.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-text-secondary mb-1">
                    Correo Electrónico <span className="text-text-secondary text-[10px]">(Opcional)</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="Ej. juan@correo.com"
                    className={`w-full text-base bg-bg-primary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors ${
                      errors.email ? "border-danger" : "border-border"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-xs text-danger font-medium block mt-1">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div>
                  <label htmlFor="mensaje" className="block text-xs font-semibold text-text-secondary mb-1">
                    Detalles del Vehículo o Notas <span className="text-text-secondary text-[10px]">(Opcional)</span>
                  </label>
                  <textarea
                    id="mensaje"
                    {...register("mensaje")}
                    placeholder="Ej. Chevrolet Sail 2017, repuestos para mantención básica."
                    rows={3}
                    className={`w-full text-base bg-bg-primary border p-3 rounded text-text-primary focus:outline-none focus:border-primary transition-colors resize-none ${
                      errors.mensaje ? "border-danger" : "border-border"
                    }`}
                  />
                  {errors.mensaje && (
                    <span className="text-xs text-danger font-medium block mt-1">
                      {errors.mensaje.message}
                    </span>
                  )}
                </div>

                {errorMessage && (
                  <p className="text-xs text-danger font-semibold text-center mt-2">
                    {errorMessage}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[44px] py-3.5 bg-primary text-bg-primary font-bold rounded-md hover:bg-primary-dark transition-colors font-heading tracking-wide mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center uppercase"
                >
                  {isSubmitting ? "PROCESANDO..." : siteConfig.store.cart.orderMethod === "form" ? "Enviar cotización" : "Enviar pedido por WhatsApp"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
