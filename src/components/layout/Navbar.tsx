"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sun, Moon } from "lucide-react";
import siteConfig from "@/lib/config";
import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import StatusBadge from "@/components/ui/StatusBadge";

export default function Navbar() {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const { totalItems, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Theme Toggler Initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (systemPrefersDark ? "dark" : "light");
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const navSection = siteConfig.pages.landing.sections.find((s) => s.type === "navbar");
  if (!navSection) return null;

  const links = navSection.links || [];
  const cta = navSection.cta;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 border-b ${
        scrolled
          ? "bg-bg-secondary/95 backdrop-blur-md border-border py-3"
          : "bg-transparent border-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Name / Logo with Schedule Status */}
        <div className="flex flex-col items-start">
          <Link 
            href="/" 
            className="text-lg sm:text-2xl font-black tracking-wider text-primary font-heading uppercase italic hover:scale-[1.02] transition-transform duration-200"
          >
            {siteConfig.brand.name}
          </Link>
          <div className="hidden sm:block mt-0.5">
            <StatusBadge />
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase font-heading">
          {links.map((link, i) => {
            const href = isLanding && link.href.startsWith("#") ? link.href : `/${link.href}`;
            return (
              <Link
                key={i}
                href={href}
                className="text-text-primary hover:text-primary transition-colors duration-200 relative group py-2"
              >
                {link.text}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
              </Link>
            );
          })}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-bg-secondary/50 border border-border/50 hover:border-primary hover:text-primary rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center text-text-primary"
            aria-label="Cambiar tema de color"
          >
            {theme === "dark" ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Cart Icon Button (triggers sidebar) */}
          {navSection.showCart && (
            <button
              onClick={openDrawer}
              className="relative p-2.5 bg-bg-secondary/50 border border-border/50 hover:border-primary hover:text-primary rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center text-text-primary min-w-[44px] min-h-[44px]"
              aria-label="Ver carrito de compras"
            >
              <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span 
                  key={totalItems} 
                  className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-black text-text-primary font-heading shadow-md"
                >
                  {totalItems}
                </span>
              )}
            </button>
          )}

          {/* Desktop CTA Button */}
          {cta && (
            <Link
              href={cta.href}
              className="hidden sm:inline-block px-5 py-2.5 bg-primary text-bg-primary font-extrabold font-heading text-xs tracking-wider rounded hover:bg-primary-dark transition-all duration-300 shadow hover:shadow-primary/10 hover:-translate-y-0.5"
            >
              {cta.text.toUpperCase()}
            </Link>
          )}

          {/* Mobile Sandwich menu trigger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="lg:hidden p-3 bg-bg-secondary/50 border border-border/50 rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px] text-text-primary"
              aria-label="Abrir menú"
            >
              <Menu className="w-5 h-5" />
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="w-full sm:max-w-md bg-bg-secondary border-l border-border p-6 flex flex-col justify-between"
            >
              <div>
                <SheetHeader className="flex flex-row items-center justify-between border-b border-border/50 pb-4 mb-6">
                  <div className="flex flex-col items-start">
                    <SheetTitle className="text-xl font-black font-heading text-primary uppercase italic tracking-wider">
                      {siteConfig.brand.name}
                    </SheetTitle>
                    <div className="mt-1">
                      <StatusBadge />
                    </div>
                  </div>
                  <SheetClose className="p-2.5 text-text-secondary hover:text-primary transition-colors cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px]" aria-label="Cerrar menú">
                    <X className="w-6 h-6" />
                  </SheetClose>
                </SheetHeader>

                {/* Mobile menu link list */}
                <nav className="flex flex-col gap-3">
                  {links.map((link, i) => {
                    const href = isLanding && link.href.startsWith("#") ? link.href : `/${link.href}`;
                    return (
                      <Link
                        key={i}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="w-full py-4 text-center font-bold font-heading text-base uppercase tracking-wider text-text-primary bg-bg-primary/50 hover:bg-primary/5 border border-border/50 hover:border-primary/50 rounded-xl transition-all duration-300 block shadow-sm"
                      >
                        {link.text}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile CTA Button inside Menu */}
              {cta && (
                <div className="border-t border-border/50 pt-6 mt-6">
                  <Link
                    href={cta.href}
                    onClick={() => setOpen(false)}
                    className="w-full py-4 bg-accent hover:bg-red-700 text-text-primary font-black font-heading text-sm text-center uppercase tracking-widest rounded-xl transition-all duration-300 block shadow-lg cursor-pointer"
                  >
                    {cta.text}
                  </Link>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
