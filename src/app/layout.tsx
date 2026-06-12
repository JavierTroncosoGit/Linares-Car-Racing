import type { Metadata } from "next";
import { Inter, Rajdhani } from "next/font/google";
import "./globals.css";
import siteConfig from "@/lib/config";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import CartSidebar from "@/components/store/CartSidebar";
import Toaster from "@/components/ui/Toaster";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const rajdhani = Rajdhani({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.seo.canonicalUrl || "http://localhost:3000"),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  openGraph: {
    title: siteConfig.seo.ogTitle,
    description: siteConfig.seo.ogDescription,
    images: [{ url: siteConfig.seo.ogImage }],
    locale: siteConfig.seo.locale,
    type: "website",
  },
  alternates: {
    canonical: siteConfig.seo.canonicalUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${rajdhani.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary selection:bg-primary selection:text-bg-primary">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow flex flex-col pt-[72px] sm:pt-[88px]">{children}</main>
          <Footer />
          <WhatsAppButton />
          <CartSidebar />
          <Toaster />
        </SmoothScroll>
      </body>
    </html>
  );
}
