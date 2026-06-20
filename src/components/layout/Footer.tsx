import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";
import siteConfig from "@/lib/config";
import CopyButton from "@/components/ui/CopyButton";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerSection = siteConfig.pages.landing.sections.find((s) => s.type === "footer");
  if (!footerSection) return null;

  const social = footerSection.social || {};
  const navigation = footerSection.navigation || [];
  const links = footerSection.links || [];

  return (
    <footer className="w-full bg-bg-secondary border-t border-border/50 pt-16 pb-8 mt-auto">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link href="/" className="hover:scale-[1.02] transition-transform duration-200 block py-1">
              <Image
                src={siteConfig.brand.logo.src}
                alt={siteConfig.brand.logo.alt}
                width={siteConfig.brand.logo.width}
                height={siteConfig.brand.logo.height}
                className="h-5 sm:h-6 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-text-secondary font-light leading-relaxed">
              {footerSection.tagline}
            </p>
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-border/50 hover:border-primary hover:text-primary rounded-full transition-colors flex items-center justify-center w-9 h-9 cursor-pointer"
                aria-label="Instagram Racing Cars"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
                </svg>
              </a>
            )}
          </div>
 
          {/* Page Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary font-heading mb-4">
              Navegación
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="text-text-secondary hover:text-primary transition-colors">
                  Inicio
                </Link>
              </li>
              {navigation.map((nav, i) => (
                <li key={i}>
                  <Link href={nav.href} className="text-text-secondary hover:text-primary transition-colors">
                    {nav.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact Details */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary font-heading mb-4">
              Contacto
            </h4>
            <ul className="space-y-3 text-xs text-text-secondary font-light">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Av. Presidente Ibáñez #630, Linares, Chile</span>
                <CopyButton text="Av. Presidente Ibáñez #630, Linares, Chile" label="Dirección" />
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary transition-colors">
                  {siteConfig.contact.email}
                </a>
                <CopyButton text={siteConfig.contact.email} label="Correo" />
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href={`https://wa.me/${siteConfig.contact.whatsapp[0]?.number}`} className="hover:text-primary transition-colors">
                  +{siteConfig.contact.whatsapp[0]?.number}
                </a>
                <CopyButton text={`+${siteConfig.contact.whatsapp[0]?.number}`} label="WhatsApp" />
              </li>
            </ul>
          </div>

          {/* Hours and Authorized badge */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-primary font-heading mb-4">
              Horario de Atención
            </h4>
            <p className="text-xs text-text-secondary font-light leading-relaxed">
              Lunes a Viernes: 09:00 - 18:00 <br />
              Sábado: 10:00 - 14:00
            </p>
            <div className="border border-primary/20 bg-primary/5 p-3 rounded-lg text-center">
              <span className="text-[10px] uppercase font-bold tracking-widest text-primary font-heading">
                Garantía y Calidad Original
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <div className="flex flex-wrap gap-4 text-xs text-text-secondary">
            <span>&copy; {currentYear} {siteConfig.brand.name}. Todos los derechos reservados.</span>
            {links.map((link, i) => (
              <Link key={i} href={link.href} className="hover:text-primary transition-colors">
                {link.text}
              </Link>
            ))}
          </div>

          {/* OBLIGATORY Firma de Agencia */}
          <div className="text-xs text-text-secondary font-light">
            Hecho por{" "}
            <a
              href="https://www.darw.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-primary font-bold transition-colors duration-200 decoration-primary/50 underline-offset-4 hover:underline"
            >
              Darw
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
