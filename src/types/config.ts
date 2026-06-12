export interface BrandConfig {
  name: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  favicon: string;
}

export interface ColorsConfig {
  primary: string;
  primaryDark: string;
  accent: string;
  bgPrimary: string;
  bgSecondary: string;
  textPrimary: string;
  textSecondary: string;
  success: string;
  danger: string;
}

export interface FontsConfig {
  heading: string;
  body: string;
}

export interface SeoConfig {
  title: string;
  title_max?: string;
  description: string;
  description_max?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  locale: string;
}

export interface WhatsAppConfig {
  number: string;
  label: string;
  message: string;
}

export interface ScheduleDay {
  open: string;
  close: string;
  label: string;
}

export interface ScheduleConfig {
  weekday: ScheduleDay;
  saturday: ScheduleDay;
  sunday: ScheduleDay;
}

export interface ContactConfig {
  whatsapp: WhatsAppConfig[];
  email: string;
  social: {
    instagram: string;
  };
  schedule?: ScheduleConfig;
}

export interface CategoryConfig {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

export interface SheetsConfig {
  productsSheetUrl: string;
  revalidateSeconds: number;
}

export interface FeaturedSectionConfig {
  enabled: boolean;
  title: string;
  subtitle: string;
  maxProducts: number;
}

export interface ProductDetailConfig {
  showComplementary: boolean;
  maxComplementary: number;
  showBrand: boolean;
  showSku: boolean;
}

export interface CartConfig {
  enabled: boolean;
  orderMethod: "whatsapp" | "form" | "both";
  whatsappOrderNumber: string;
  whatsappOrderMessage: string;
  formDestinationEmail: string;
}

export interface ShippingConfig {
  type: "pickup" | "delivery" | "both";
  pickupNote?: string;
}

export interface StoreConfig {
  enabled: boolean;
  currency: string;
  currencySymbol: string;
  sheetsConfig: SheetsConfig;
  categories: CategoryConfig[];
  featuredSection: FeaturedSectionConfig;
  productDetail: ProductDetailConfig;
  cart: CartConfig;
  shipping: ShippingConfig;
}

export interface SectionLink {
  text: string;
  href: string;
}

export interface SectionCta {
  text: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface SectionMedia {
  type: "image" | "video";
  src: string;
  alt: string;
}

export interface StatItem {
  value: string;
  label: string;
  icon: string;
}

export interface BrandItem {
  name: string;
  logo: string;
  note?: string;
}

export interface ServiceItem {
  name: string;
  description: string;
}

export interface ServiceCategory {
  name: string;
  icon: string;
  services: ServiceItem[];
}

export interface StepItem {
  number: string;
  title: string;
  body: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormField {
  id: string;
  type: "text" | "tel" | "email" | "select" | "textarea";
  label: string;
  required: boolean;
  options?: string[];
}

export interface PageSection {
  id: string;
  type: string;
  // Common properties
  sectionLabel?: string;
  headline?: string;
  subheadline?: string;
  
  // Navbar specific
  links?: SectionLink[];
  cta?: SectionLink;
  showCart?: boolean;
  
  // Hero specific
  badge?: string;
  ctas?: SectionCta[];
  media?: SectionMedia;
  
  // Stats, Brands and FAQ specific
  items?: (StatItem | BrandItem | FaqItem)[];
  
  // Services specific
  columns?: number;
  categories?: ServiceCategory[];
  
  // Featured products specific
  ctaCatalog?: SectionLink;
  
  // Steps specific
  style?: "numbered" | "simple";
  steps?: StepItem[];
  
  // FAQ specific
  schema?: boolean;
  
  // MapEmbed specific
  googleMapsEmbedUrl?: string;
  address?: string;
  mapHeight?: number;
  
  // Contact Form specific
  destinationEmail?: string;
  fields?: FormField[];
  submitLabel?: string;
  successMessage?: string;
  errorMessage?: string;
  successAction?: string;
  
  // Footer specific
  tagline?: string;
  navigation?: SectionLink[];
  social?: {
    instagram?: string;
  };
}

export interface PageConfig {
  slug: string;
  seo?: {
    title: string;
    description: string;
  };
  sections: PageSection[];
}

export interface SiteConfig {
  _meta?: {
    version: string;
    project: string;
    type: string;
  };
  brand: BrandConfig;
  colors: ColorsConfig;
  fonts: FontsConfig;
  seo: SeoConfig;
  contact: ContactConfig;
  animations: {
    level: number;
  };
  store: StoreConfig;
  pages: {
    landing: PageConfig;
    catalogo: {
      slug: string;
      seo?: {
        title: string;
        description: string;
      };
    };
  };
}
