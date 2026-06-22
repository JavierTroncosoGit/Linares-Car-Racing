import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, Database, Info } from "lucide-react";
import siteConfig from "@/lib/config";

export const metadata: Metadata = {
  title: `Política de Privacidad — ${siteConfig.brand.name}`,
  description: `Política de Privacidad y tratamiento de datos personales de ${siteConfig.brand.name} en Linares.`,
  openGraph: {
    title: `Política de Privacidad — ${siteConfig.brand.name}`,
    description: `Conoce cómo protegemos y gestionamos tus datos personales en Racing Cars Linares.`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-[850px] px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-primary transition-colors duration-200 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
          Volver al Inicio
        </Link>
      </div>

      {/* Header section */}
      <div className="mb-12 text-center sm:text-left border-b border-border/50 pb-8">
        <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4 text-primary animate-pulse-stock">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading text-text-primary uppercase">
          Política de Privacidad
        </h1>
        <p className="text-text-secondary mt-3 text-sm sm:text-base max-w-xl font-light leading-relaxed">
          En <span className="text-text-primary font-medium">{siteConfig.brand.name}</span> valoramos tu confianza. Aquí te explicamos de manera transparente y detallada cómo recopilamos, tratamos y protegemos tu información.
        </p>
        <p className="text-xs text-primary/70 mt-4 font-mono font-semibold uppercase tracking-wider">
          Última actualización: Junio 2026
        </p>
      </div>

      {/* Content clauses */}
      <div className="space-y-8">
        {/* Section 1 */}
        <section className="bg-bg-secondary border border-border/50 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-primary/5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-primary/5 rounded-lg text-primary flex-shrink-0">
              <Eye className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-primary uppercase tracking-wide mb-3">
                1. Recopilación Automática de Datos y Comportamiento (Analíticas)
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 font-light">
                Al acceder y navegar por el sitio web de <span className="font-semibold text-text-primary">{siteConfig.brand.name}</span>, nos reservamos el derecho de utilizar herramientas de analítica web para registrar y analizar las acciones de los usuarios. Esta recopilación automática puede incluir:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-text-secondary font-light list-disc pl-5 mb-4 leading-relaxed">
                <li>
                  <strong className="text-text-primary font-normal">Patrones de navegación:</strong> Páginas visitadas, secciones más consultadas y tiempo de permanencia en el sitio.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Interacciones específicas:</strong> Clics en enlaces, botones o imágenes de los vehículos e insumos del catálogo.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Información técnica del dispositivo:</strong> Tipo de navegador, sistema operativo y dirección IP anonimizada (que no permite la identificación individual del usuario).
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border/40">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Finalidad del Uso de Analíticas
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                  La información de comportamiento capturada no se utiliza para identificar a los usuarios de manera individual sin su consentimiento. El propósito de estas métricas es estrictamente operativo y comercial, enfocado en:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary font-light list-disc pl-5 mt-2 leading-relaxed">
                  <li>Optimizar la interfaz y mejorar continuamente la experiencia de usuario en nuestra plataforma.</li>
                  <li>Evaluar el rendimiento del contenido y el interés en modelos específicos o servicios automotrices.</li>
                  <li>Garantizar la seguridad del sitio y prevenir actividades fraudulentas o ataques maliciosos.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-bg-secondary border border-border/50 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-primary/5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-primary/5 rounded-lg text-primary flex-shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-primary uppercase tracking-wide mb-3">
                2. Recopilación de Datos Personales (Formularios y WhatsApp)
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 font-light">
                Cuando interactúas de forma activa con nuestra plataforma, recopilamos información personal a través de los siguientes métodos:
              </p>
              <ul className="space-y-3 text-sm sm:text-base text-text-secondary font-light list-disc pl-5 mb-4 leading-relaxed">
                <li>
                  <strong className="text-text-primary font-normal">Formulario de Contacto y Cotización:</strong> Capturamos tu nombre completo, número de teléfono, correo electrónico (opcional), el tipo de servicio que requieres (mecánica rápida, escáner, frenos, lubricación, etc.) y los detalles de tu consulta o del vehículo para ofrecerte un servicio preciso.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Contacto y Reservas vía WhatsApp:</strong> Al usar los botones de chat directo o agendamiento técnico, serás redirigido a la aplicación externa de WhatsApp. Recibiremos tu número de teléfono y el mensaje predefinido o personalizado que decidas enviar con el fin de coordinar tu requerimiento.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Persistencia del Carrito de Compras:</strong> Para facilitar la cotización de repuestos y aceites de nuestro catálogo, guardamos de forma técnica y local en tu navegador (*localStorage*) los artículos agregados al carrito, impidiendo que se pierdan al recargar la web.
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-border/40">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                  Finalidad de los Datos Personales
                </h3>
                <p className="text-text-secondary text-xs sm:text-sm leading-relaxed font-light">
                  Utilizamos esta información únicamente para:
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-text-secondary font-light list-disc pl-5 mt-2 leading-relaxed">
                  <li>Coordinar y agendar horas para servicios mecánicos en nuestro local de Linares.</li>
                  <li>Confirmar la disponibilidad de repuestos y aceites de tu carrito de compras y preparar cotizaciones formales.</li>
                  <li>Brindar soporte técnico y responder a dudas sobre compatibilidad de piezas.</li>
                  <li>Cumplir con las obligaciones legales y de facturación vigentes en Chile (emisión de boletas o facturas).</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-bg-secondary border border-border/50 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-primary/5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-primary/5 rounded-lg text-primary flex-shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-primary uppercase tracking-wide mb-3">
                3. Seguridad y Compartición de Datos
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 font-light">
                Nos tomamos muy en serio la seguridad de tu información.
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-text-secondary font-light list-disc pl-5 leading-relaxed">
                <li>
                  <strong className="text-text-primary font-normal">Confidencialidad absoluta:</strong> No vendemos, alquilamos ni transferimos tus datos personales a terceras empresas con fines comerciales o de marketing ajenos a nuestra operación.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Colaboradores Técnicos:</strong> Tus datos solo son accesibles por nuestro personal autorizado y, eventualmente, por nuestro socio tecnológico de confianza (<span className="text-text-primary font-medium">Darw</span>) para fines exclusivos de soporte técnico y mantenimiento web.
                </li>
                <li>
                  <strong className="text-text-primary font-normal">Requerimientos Legales:</strong> Compartiremos información únicamente si es ordenado por un tribunal o autoridad competente en el marco de la legislación chilena aplicable.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="bg-bg-secondary border border-border/50 rounded-xl p-6 sm:p-8 hover:border-primary/20 transition-all duration-300 shadow-sm hover:shadow-primary/5">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="p-2.5 bg-primary/5 rounded-lg text-primary flex-shrink-0">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-text-primary uppercase tracking-wide mb-3">
                4. Derechos del Usuario (ARCO)
              </h2>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed mb-4 font-light">
                De conformidad con la <strong className="text-text-primary font-medium">Ley N° 19.628 sobre Protección de la Vida Privada</strong> en la República de Chile, tienes pleno derecho a:
              </p>
              <ul className="space-y-2 text-sm sm:text-base text-text-secondary font-light list-disc pl-5 mb-4 leading-relaxed">
                <li>Conocer qué datos personales tenemos almacenados sobre ti (Acceso).</li>
                <li>Solicitar la rectificación o modificación de datos inexactos o incompletos (Rectificación).</li>
                <li>Solicitar la eliminación o cancelación de tus datos de nuestras bases de datos cuando ya no sean necesarios para los fines que fueron recopilados (Cancelación).</li>
              </ul>
              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-light">
                Para ejercer cualquiera de estos derechos, o si tienes dudas sobre esta política, puedes enviarnos un correo electrónico detallando tu solicitud a <a href={`mailto:${siteConfig.contact.email}`} className="text-primary hover:text-primary-dark transition-colors font-medium underline underline-offset-4">{siteConfig.contact.email}</a> o visitarnos directamente en nuestro local comercial ubicado en <strong className="text-text-primary font-medium">Av. Presidente Ibáñez #630, Linares, Chile</strong>.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom disclaimer */}
      <div className="mt-12 text-center text-xs text-text-secondary/60 font-light border-t border-border/50 pt-8">
        <p>
          Este sitio web y sus términos de privacidad se rigen bajo las leyes vigentes de la República de Chile.
        </p>
        <p className="mt-1">
          &copy; {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.
        </p>
      </div>
    </div>
  );
}
