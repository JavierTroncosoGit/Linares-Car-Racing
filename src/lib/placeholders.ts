export interface ImagePlaceholder {
  src: string;
  fallback: string;
  width: number;
  height: number;
  alt: string;
}

export const PLACEHOLDERS: Record<string, ImagePlaceholder> = {
  heroMain: {
    src: '/images/hero/hero-main.webp',
    fallback: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=1920&h=1080&fit=crop',
    width: 1920,
    height: 1080,
    alt: 'Taller mecánico Racing Cars con herramientas y vehículos'
  },
  logo: {
    src: '/assets/logo-principal.png',
    fallback: '/assets/logo-principal.png',
    width: 180,
    height: 60,
    alt: 'Logo oficial de Racing Cars — Lubricentro y Accesorios'
  },
  favicon: {
    src: '/favicon.ico',
    fallback: '/favicon.ico',
    width: 32,
    height: 32,
    alt: 'Favicon Racing Cars'
  },
  ogImage: {
    src: '/images/brand/og-image.jpg',
    fallback: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1200&h=630&fit=crop',
    width: 1200,
    height: 630,
    alt: 'Racing Cars Lubricentro y Accesorios Linares'
  },
  // Servicios
  srvMecanicaRapida: {
    src: '/images/services/srv-mecanica-rapida.webp',
    fallback: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Servicio de mecánica rápida y reparaciones generales'
  },
  srvDiagnosticoElectronica: {
    src: '/images/services/srv-diagnostico-electronica.webp',
    fallback: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Escáner automotriz profesional y lectura de códigos DTC'
  },
  srvMotorDistribucion: {
    src: '/images/services/srv-motor-distribucion.webp',
    fallback: 'https://images.unsplash.com/photo-1517524206127-48bbd363f3d7?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Cambio de correa de distribución, accesorios y mantenimiento de motor'
  },
  srvFrenos: {
    src: '/images/services/srv-frenos.webp',
    fallback: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Reemplazo de pastillas y discos de freno para conducción segura'
  },
  srvSuspensionDireccion: {
    src: '/images/services/srv-suspension-direccion.webp',
    fallback: 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Inspección de tren delantero y reemplazo de amortiguadores'
  },
  srvMantenimiento: {
    src: '/images/services/srv-mantenimiento.webp',
    fallback: 'https://images.unsplash.com/photo-1552656967-7a0991a13906?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Mantenimiento preventivo, cambio de filtros y aceite de motor'
  },
  srvTransmision: {
    src: '/images/services/srv-transmision.webp',
    fallback: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Cambio de kit de embrague y mantenimiento de transmisión'
  },
  srvElectricoIluminacion: {
    src: '/images/services/srv-electrico-iluminacion.webp',
    fallback: 'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=600&h=400&fit=crop',
    width: 600,
    height: 400,
    alt: 'Reemplazo de baterías y ampolletas LED/halógenas'
  },
  // Catálogo Fallback
  productPlaceholder: {
    src: '/images/products/product-placeholder.webp',
    fallback: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&h=600&fit=crop',
    width: 600,
    height: 600,
    alt: 'Insumo automotriz Racing Cars'
  }
};

/**
 * Retorna la ruta de imagen real o su fallback (Unsplash de alta calidad o placeholder)
 */
export function getImageOrPlaceholder(key: keyof typeof PLACEHOLDERS): string {
  const item = PLACEHOLDERS[key];
  if (!item) return 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&h=600&fit=crop';
  return item.src || item.fallback;
}

/**
 * Retorna la información completa de la imagen (src, fallback, alt, dimensiones)
 */
export function getImageMetadata(key: keyof typeof PLACEHOLDERS): ImagePlaceholder {
  return PLACEHOLDERS[key] || {
    src: '',
    fallback: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=600&h=600&fit=crop',
    width: 600,
    height: 600,
    alt: 'Imagen de repuesto'
  };
}
