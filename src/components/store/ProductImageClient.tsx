"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";

interface ProductImageClientProps {
  src: string;
  alt: string;
}

export default function ProductImageClient({ src, alt }: ProductImageClientProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when pressing the Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Thumbnail image container */}
      <div
        onClick={() => setIsOpen(true)}
        className="aspect-square bg-neutral-900 border border-border rounded-lg flex items-center justify-center text-text-secondary overflow-hidden relative cursor-zoom-in group"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain p-4 group-hover:scale-102 transition-transform duration-300"
          priority
        />
        <div className="absolute bottom-3 right-3 p-2 bg-bg-secondary/80 backdrop-blur-sm border border-border rounded-md text-text-secondary group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100 duration-300">
          <ZoomIn className="w-4 h-4" />
        </div>
      </div>

      {/* Zoom Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fade-in select-none">
          {/* Close button click overlay */}
          <div className="absolute inset-0 cursor-zoom-out" onClick={() => setIsOpen(false)}></div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-3 bg-bg-secondary border border-border rounded-full hover:border-primary hover:text-primary transition-all duration-300 cursor-pointer text-text-primary min-w-[44px] min-h-[44px] flex items-center justify-center z-10"
            aria-label="Cerrar ampliación"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-[90vw] h-[80vh] flex items-center justify-center z-0">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="90vw"
              className="object-contain p-2"
            />
          </div>
        </div>
      )}
    </>
  );
}
