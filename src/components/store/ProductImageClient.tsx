"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductImageClientProps {
  images: string[];
  alt: string;
}

export default function ProductImageClient({ images = [], alt }: ProductImageClientProps) {
  // Asegurar que tengamos al menos una imagen en la lista
  const gallery = images.length > 0 ? images : ["/assets/placeholder.png"];
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Navegación de imágenes
  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSelectedIndex((prev) => (prev + 1) % gallery.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }
    setSelectedIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
  };

  // Manejar teclado para cerrar modal y navegar
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      } else if (e.key === "ArrowRight") {
        setSelectedIndex((prev) => (prev + 1) % gallery.length);
      } else if (e.key === "ArrowLeft") {
        setSelectedIndex((prev) => (prev - 1 + gallery.length) % gallery.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, gallery.length]);

  return (
    <div className="flex flex-col gap-4">
      {/* Contenedor de imagen principal */}
      <div className="relative group">
        <div
          onClick={() => setIsOpen(true)}
          className="aspect-square bg-neutral-900 border border-border rounded-lg flex items-center justify-center text-text-secondary overflow-hidden relative cursor-pointer group select-none"
        >
          <div className="relative w-full h-full">
            <Image
              src={gallery[selectedIndex]}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4"
              priority
            />
          </div>

          {/* Flechas de navegación sobre imagen principal (solo si hay más de 1) */}
          {gallery.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-bg-secondary/70 backdrop-blur-sm border border-border rounded-full text-text-primary hover:border-primary hover:text-primary transition-all opacity-0 group-hover:opacity-100 duration-300 z-10 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-bg-secondary/70 backdrop-blur-sm border border-border rounded-full text-text-primary hover:border-primary hover:text-primary transition-all opacity-0 group-hover:opacity-100 duration-300 z-10 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Siguiente imagen"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Icono indicador de expandir */}
          <div className="absolute bottom-3 right-3 p-2 bg-bg-secondary/80 backdrop-blur-sm border border-border rounded-md text-text-secondary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 duration-300">
            <Maximize2 className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Miniaturas/Carrusel de selección (solo si hay más de 1 imagen) */}
      {gallery.length > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`aspect-square bg-neutral-900 border rounded-lg flex items-center justify-center p-2 relative overflow-hidden transition-all duration-300 cursor-pointer ${
                idx === selectedIndex
                  ? "border-primary shadow-md shadow-primary/10"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <Image
                src={img}
                alt={`${alt} - Miniatura ${idx + 1}`}
                fill
                sizes="80px"
                className="object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal Zoom Fullscreen */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-fade-in select-none">
          {/* Overlay de clic para cerrar */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setIsOpen(false)}></div>
          
          {/* Botón de cerrar */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-3 bg-bg-secondary border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer text-text-primary min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
            aria-label="Cerrar ampliación"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Flecha Izquierda Modal */}
          {gallery.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-bg-secondary/50 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer text-text-primary z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* Contenedor Imagen Modal */}
          <div className="relative w-full max-w-[85vw] h-[80vh] flex items-center justify-center z-0">
            <Image
              src={gallery[selectedIndex]}
              alt={alt}
              fill
              sizes="85vw"
              className="object-contain p-2"
            />
          </div>

          {/* Flecha Derecha Modal */}
          {gallery.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-bg-secondary/50 border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer text-text-primary z-10 min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          )}

          {/* Indicador de posición */}
          {gallery.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-bg-secondary/80 border border-border rounded-full text-xs font-mono text-text-secondary select-none">
              {selectedIndex + 1} / {gallery.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
