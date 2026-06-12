"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatCLP } from "@/lib/format";
import AddToCartButton from "../store/AddToCartButton";

interface FeaturedProductsClientProps {
  products: Product[];
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FeaturedProductsClient({ products }: FeaturedProductsClientProps) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      {products.map((product) => (
        <motion.div
          key={product.sku}
          className="border border-border bg-bg-secondary p-4 rounded-xl flex flex-col justify-between hover:shadow-xl hover:border-primary/30 transition-all duration-300 relative group"
          variants={cardVariants}
        >
          <Link href={`/catalogo/${product.slug}`} className="block flex-grow">
            {/* Image container */}
            <div className="aspect-square bg-bg-primary border border-border/50 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden group-hover:border-primary/50 transition-colors">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-primary font-heading uppercase tracking-widest">
                {product.brand}
              </span>
              <h3 className="font-extrabold text-sm text-text-primary mt-1 line-clamp-2 min-h-[40px] uppercase font-heading tracking-wide">
                {product.name}
              </h3>
              <p className="text-[10px] text-text-secondary font-mono mt-0.5">
                SKU: {product.sku}
              </p>
            </div>
          </Link>
          <div className="mt-4 pt-4 border-t border-border/50 flex justify-between items-center gap-2">
            <span className="font-black text-primary font-heading text-lg">
              {formatCLP(product.price)}
            </span>
            <AddToCartButton product={product} />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
