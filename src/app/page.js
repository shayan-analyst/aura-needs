"use client";
import { useEffect, useState } from "react";
import { products } from "@/data/dummyData";
import ProductCard from "@/components/product/ProductCard";
import { motion } from "framer-motion";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: -500, y: -500 });
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // 1. Super-fast mouse tracking
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 2. Generate Particles
    const generatedParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      size: Math.random() * 15 + 5, 
      left: Math.random() * 100, 
      duration: Math.random() * 10 + 10, // Faster floating
      delay: Math.random() * 5, 
      sway: Math.random() * 50 - 25, 
    }));
    setParticles(generatedParticles);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    // Note: Removed 'bg-[var(--background)]' so it doesn't hide the -z-10 animations
    <div className="relative min-h-screen overflow-hidden">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      
      {/* Interactive Mouse Aura (Visible & Smooth) */}
      <motion.div
        className="fixed top-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none -z-20 blur-[100px]"
        style={{ backgroundColor: "var(--aura-color)", opacity: 0.4 }}
        animate={{
          x: mousePosition.x - 250, 
          y: mousePosition.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.1 }}
      />

      {/* Floating Cosmetic Particles */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-[var(--primary)] blur-[2px]"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              left: `${p.left}vw`,
              bottom: "-30px",
              opacity: "var(--particle-opacity)",
            }}
            animate={{
              y: ["0vh", "-120vh"], 
              x: [0, p.sway, 0], 
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          />
        ))}
      </div>

      {/* ================= PAGE CONTENT ================= */}
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-24 flex flex-col items-center justify-center text-center relative z-10"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-[var(--foreground)]">
          Discover Your <span className="text-[var(--primary)] drop-shadow-md">AURA.</span>
        </h1>
        <p className="text-lg text-[var(--foreground)] opacity-70 max-w-2xl mb-10">
          Premium vanity boxes, luxury cosmetics, and elegant bags crafted for the modern aesthetic.
        </p>
        <button className="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[var(--primary)]/30">
          Explore Collection
        </button>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 pb-24 relative z-10"
      >
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold tracking-tight text-[var(--foreground)]">Trending Now</h2>
          <button className="text-[var(--primary)] font-medium hover:underline hover:underline-offset-4 transition-all">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </motion.div>
    </div>
  );

  
}

