"use client";

import { useState } from "react";
import Image from "next/image";

interface VehicleBrand {
  name: string;
  logo: string;
  isMissing: boolean;
}

const vehicleBrandsList: VehicleBrand[] = [
  { name: "Toyota", logo: "/images/logos-marcas-vehiculos/Toyota.png", isMissing: false },
  { name: "Suzuki", logo: "/images/logos-marcas-vehiculos/Suzuki.png", isMissing: false },
  { name: "Nissan", logo: "/images/logos-marcas-vehiculos/Nissan.png", isMissing: false },
  { name: "Mazda", logo: "/images/logos-marcas-vehiculos/mazda.png", isMissing: false },
  { name: "Mitsubishi", logo: "/images/logos-marcas-vehiculos/Mitsubishi.png", isMissing: false },
  { name: "Honda", logo: "/images/logos-marcas-vehiculos/Honda.png", isMissing: false },
  { name: "Subaru", logo: "/images/logos-marcas-vehiculos/Subaru.png", isMissing: false },
  { name: "GWM", logo: "/images/logos-marcas-vehiculos/GWM.png", isMissing: false },
  { name: "Changan", logo: "/images/logos-marcas-vehiculos/Changan.png", isMissing: false },
  { name: "MG", logo: "/images/logos-marcas-vehiculos/MG.png", isMissing: false },
  { name: "Maxus", logo: "/images/logos-marcas-vehiculos/Maxus.png", isMissing: false },
  { name: "Chery", logo: "/images/logos-marcas-vehiculos/Chery.png", isMissing: false },
  { name: "Jetour", logo: "/images/logos-marcas-vehiculos/Jetour.png", isMissing: false },
  { name: "JAC", logo: "/images/logos-marcas-vehiculos/JAC.png", isMissing: false },
  { name: "Haval", logo: "/images/logos-marcas-vehiculos/Haval.png", isMissing: true },
  { name: "DFSK", logo: "/images/logos-marcas-vehiculos/DFSK.png", isMissing: true },
  { name: "Geely", logo: "/images/logos-marcas-vehiculos/Geely.png", isMissing: true },
  { name: "Omoda", logo: "/images/logos-marcas-vehiculos/Omoda.png", isMissing: false },
  { name: "Chevrolet", logo: "/images/logos-marcas-vehiculos/Chevrolet.png", isMissing: false },
  { name: "Ford", logo: "/images/logos-marcas-vehiculos/Ford.png", isMissing: false },
  { name: "Dodge", logo: "/images/logos-marcas-vehiculos/Dodge.png", isMissing: true },
  { name: "RAM", logo: "/images/logos-marcas-vehiculos/RAM.png", isMissing: false },
  { name: "Jeep", logo: "/images/logos-marcas-vehiculos/Jeep.png", isMissing: true },
  { name: "Chrysler", logo: "/images/logos-marcas-vehiculos/Chrysler.png", isMissing: true },
  { name: "Peugeot", logo: "/images/logos-marcas-vehiculos/Peugeot.png", isMissing: false },
  { name: "Volkswagen", logo: "/images/logos-marcas-vehiculos/Volkswagen.png", isMissing: false },
  { name: "Renault", logo: "/images/logos-marcas-vehiculos/Renault.png", isMissing: true },
  { name: "Fiat", logo: "/images/logos-marcas-vehiculos/Fiat.png", isMissing: true },
  { name: "Citroën", logo: "/images/logos-marcas-vehiculos/Citroën.png", isMissing: false },
  { name: "BMW", logo: "/images/logos-marcas-vehiculos/BMW.png", isMissing: false },
  { name: "Mercedes-Benz", logo: "/images/logos-marcas-vehiculos/Mercedes benz.png", isMissing: false },
  { name: "Audi", logo: "/images/logos-marcas-vehiculos/Audi.png", isMissing: false },
  { name: "Volvo", logo: "/images/logos-marcas-vehiculos/Volvo.png", isMissing: false },
  { name: "Porsche", logo: "/images/logos-marcas-vehiculos/Porsche.png", isMissing: true }
];

function BrandCard({ brand }: { brand: VehicleBrand }) {
  const [hasError, setHasError] = useState(brand.isMissing);

  return (
    <div 
      className="bg-white border border-gray-150 rounded-xl py-3 px-5 flex items-center justify-center h-[72px] w-[130px] sm:w-[160px] sm:h-[90px] shrink-0 relative group transition-all duration-300 hover:scale-105 hover:border-primary/45 hover:shadow-[0_0_15px_rgba(232,168,36,0.35)] select-none"
      title={brand.name}
    >
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(232,168,36,0.03)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />

      {hasError ? (
        <span className="font-heading font-black text-[10px] sm:text-xs text-neutral-800 text-center tracking-widest uppercase leading-tight select-none px-1 group-hover:text-primary transition-colors">
          {brand.name}
        </span>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={brand.logo}
            alt={`Logotipo de ${brand.name}`}
            fill
            sizes="(max-width: 640px) 25vw, 15vw"
            className="object-contain p-1 select-none group-hover:scale-105 transition-transform duration-300"
            onError={() => setHasError(true)}
          />
        </div>
      )}
    </div>
  );
}

export default function VehicleBrandsGrid() {
  // Split 34 brands evenly for the double marquee
  const half = Math.ceil(vehicleBrandsList.length / 2);
  const row1Brands = vehicleBrandsList.slice(0, half);
  const row2Brands = vehicleBrandsList.slice(half);

  return (
    <section id="marcas-vehiculos" className="w-full bg-bg-primary py-16 lg:py-20 border-b border-border/40 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
        
        {/* Header (Enhanced typography & contrast) */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary font-heading border-b border-primary/25 pb-1">
            Marcas de Vehículos
          </span>
          <h2 className="text-2xl sm:text-4xl font-black font-heading text-text-primary mt-4 tracking-tight uppercase">
            Servicio Técnico y Repuestos Multimarca
          </h2>
          <p className="mt-3 text-sm sm:text-base text-text-primary/75 font-light max-w-2xl mx-auto">
            Realizamos mantenimiento preventivo y reparación para las marcas automotrices más importantes del mercado.
          </p>
        </div>

        {/* Double Marquee Container (No white gaps, infinitely scrolling) */}
        <div className="flex flex-col gap-4 overflow-hidden w-full py-1">
          
          {/* Row 1: Moving Left */}
          <div className="flex w-max gap-4 animate-marquee-left hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {row1Brands.map((brand) => (
              <BrandCard key={`r1-${brand.name}`} brand={brand} />
            ))}
            {/* Duplicate for infinite loop */}
            {row1Brands.map((brand) => (
              <BrandCard key={`r1-dup-${brand.name}`} brand={brand} />
            ))}
          </div>

          {/* Row 2: Moving Right */}
          <div className="flex w-max gap-4 animate-marquee-right hover:[animation-play-state:paused] active:[animation-play-state:paused]">
            {row2Brands.map((brand) => (
              <BrandCard key={`r2-${brand.name}`} brand={brand} />
            ))}
            {/* Duplicate for infinite loop */}
            {row2Brands.map((brand) => (
              <BrandCard key={`r2-dup-${brand.name}`} brand={brand} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
