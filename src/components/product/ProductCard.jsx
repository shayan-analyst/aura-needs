"use client";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";

export default function ProductCard({ product, index }) {
  // Zustand se Cart functions import kiye
  const { addToCart, toggleCart } = useCartStore();

  const handleAddToCart = (e) => {
    e.preventDefault(); // Click karne par page change hone se rokega
    addToCart(product);
    toggleCart(); // Cart drawer open karega
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group bg-[var(--card-bg)] border border-[var(--border)] rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-[var(--primary)]/20 transition-all duration-300 flex flex-col bg-opacity-80 backdrop-blur-sm"
    >
      {/* ================= 1. CLICKABLE LINK AREA ================= */}
      <Link href={`/product/${product.id}`} className="flex flex-col flex-1 cursor-pointer">
        
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-[#1a1a1a]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute top-3 left-3 bg-[var(--primary)]/90 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {product.category}
          </div>
        </div>

        {/* Product Details (Title & Rating) */}
        <div className="p-5 flex flex-col flex-1 pb-2">
          <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[var(--primary)] transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-1 mt-2 mb-3 text-yellow-500 text-sm">
            <Star size={16} fill="currentColor" />
            <span className="text-[var(--foreground)] font-medium ml-1">{product.rating}</span>
            <span className="text-gray-500 dark:text-gray-400">({product.reviews})</span>
          </div>
        </div>
      </Link>

      {/* ================= 2. PRICE & CART BUTTON ================= */}
      {/* Yeh hissa Link ke bahar hai taake Cart button par click karne se Detail page open na ho jaye */}
      <div className="p-5 pt-4 mt-auto flex items-center justify-between border-t border-[var(--border)] relative z-10">
        <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
        
        <button 
          onClick={handleAddToCart}
          className="bg-black dark:bg-white text-white dark:text-black p-3 rounded-full hover:bg-[var(--primary)] hover:dark:bg-[var(--primary)] hover:text-white dark:hover:text-white hover:scale-110 active:scale-95 transition-all shadow-md cursor-pointer"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
      
    </motion.div>
  );
}