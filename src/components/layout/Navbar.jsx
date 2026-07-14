"use client";
import { Search, ShoppingBag, Menu, Sun, Moon, X, ChevronRight, ChevronDown, Flame, Sparkles, Smartphone, Shirt, Home, MonitorPlay, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/useCartStore"; 

// ================= DYNAMIC CATEGORY DATA =================
const categoryData = [
  {
    name: "Electronics",
    icon: Smartphone,
    path: "/category/electronics",
    subcategories: [
      { name: "Mobile Phones", path: "/category/electronics/mobile-phones" },
      { name: "Laptops & Tablets", path: "/category/electronics/laptops" },
      { name: "Smart Watches", path: "/category/electronics/smart-watches" },
    ]
  },
  {
    name: "Home Appliances",
    icon: Home,
    path: "/category/home-appliances",
    subcategories: [
      { name: "Air Conditioners", path: "/category/home-appliances/ac" },
      { name: "Refrigerators", path: "/category/home-appliances/refrigerators" },
      { name: "Washing Machines", path: "/category/home-appliances/washing-machines" },
    ]
  },
  {
    name: "Fashion & Apparel",
    icon: Shirt,
    path: "/category/fashion",
    subcategories: [
      { name: "Men's Clothing", path: "/category/fashion/men" },
      { name: "Women's Clothing", path: "/category/fashion/women" },
      { name: "Bags & Accessories", path: "/category/fashion/bags" },
    ]
  },
  {
    name: "Beauty & Care",
    icon: Heart,
    path: "/category/beauty",
    subcategories: [
      { name: "Skincare", path: "/category/beauty/skincare" },
      { name: "Makeup", path: "/category/beauty/makeup" },
      { name: "Fragrances", path: "/category/beauty/fragrances" },
    ]
  },
  {
    name: "Entertainment",
    icon: MonitorPlay,
    path: "/category/entertainment",
    subcategories: [
      { name: "Gaming Consoles", path: "/category/entertainment/gaming" },
      { name: "Televisions", path: "/category/entertainment/tv" },
      { name: "Audio & Speakers", path: "/category/entertainment/audio" },
    ]
  }
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Sidebar & Accordion State
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(null); 
  
  // Zustand Cart
  const cart = useCartStore((state) => state.cart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => setMounted(true), []);

  const handleThemeToggle = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => setTheme(theme === "dark" ? "light" : "dark"), 300);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    setTimeout(() => setOpenAccordion(null), 300);
  };

  const toggleAccordion = (name) => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <>
      {/* ================= THEME TRANSITION MELT ================= */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }} 
            className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center backdrop-blur-[40px] bg-white/20 dark:bg-black/20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 2.5], opacity: [0, 0.5, 0] }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-40 h-40 md:w-72 md:h-72 rounded-full bg-[var(--primary)] blur-[50px]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= RICH SLIDE-IN SIDEBAR ================= */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeSidebar}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 z-[101] w-[300px] sm:w-[340px] bg-white dark:bg-[#0a0a0a] border-r border-gray-200 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Sidebar Header */}
              <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
                <Link href="/" onClick={closeSidebar} className="flex items-center gap-3">
                  <img src="/logo10.png" alt="AURA NEEDS" className="h-8 w-8 object-contain" onError={(e) => e.target.style.display='none'} />
                  <span className="text-xl font-black tracking-widest text-gray-900 dark:text-white">
                    AURA<span className="text-[var(--primary)]">.</span>
                  </span>
                </Link>
                <button onClick={closeSidebar} className="p-2 bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 shadow-sm">
                  <X size={18} />
                </button>
              </div>

              {/* Sidebar Content (Scrollable Categories) */}
              <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
                
                {/* 🌟 PREMIUM HIGHLIGHTS (Sidebar) 🌟 */}
                <div className="p-4 flex flex-col gap-3 border-b border-gray-100 dark:border-white/5">
                  <Link href="/sale" onClick={closeSidebar} className="relative overflow-hidden flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-[var(--primary)] text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-transform hover:scale-[1.02] font-black tracking-widest">
                    <Flame size={20} className="animate-bounce" /> LIVE SALE
                  </Link>
                  <Link href="/new-arrivals" onClick={closeSidebar} className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-500/30 text-purple-800 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-all font-bold tracking-wide">
                    <Sparkles size={18} className="animate-pulse text-purple-600 dark:text-purple-400" /> NEW ARRIVALS
                  </Link>
                </div>

                {/* Main Categories Accordion */}
                <div className="p-4 flex flex-col gap-1">
                  <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">All Categories</p>
                  
                  {categoryData.map((cat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <button 
                        onClick={() => toggleAccordion(cat.name)}
                        className={`flex items-center justify-between px-3 py-3.5 rounded-xl transition-all font-medium ${openAccordion === cat.name ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}
                      >
                        <div className="flex items-center gap-3">
                          <cat.icon size={18} className={openAccordion === cat.name ? "text-[var(--primary)]" : "opacity-70"} />
                          <span>{cat.name}</span>
                        </div>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${openAccordion === cat.name ? 'rotate-180 text-[var(--primary)]' : 'opacity-50'}`} />
                      </button>

                      <AnimatePresence>
                        {openAccordion === cat.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="flex flex-col gap-1 pl-11 pr-3 py-2">
                              <Link 
                                href={cat.path} 
                                onClick={closeSidebar}
                                className="px-3 py-2 text-sm font-semibold text-[var(--primary)] hover:underline flex items-center gap-1"
                              >
                                View All {cat.name} <ChevronRight size={14} />
                              </Link>
                              
                              {cat.subcategories.map((sub, subIdx) => (
                                <Link 
                                  key={subIdx} 
                                  href={sub.path} 
                                  onClick={closeSidebar}
                                  className="px-3 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg transition-colors"
                                >
                                  {sub.name}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ================= MAIN HEADER ================= */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/85 dark:bg-[#0a0a0a]/85 border-b border-gray-200 dark:border-white/10 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          
          <Link href="/" className="flex items-center gap-3 group">
            <img 
              src="/logo10.png" 
              alt="AURA NEEDS" 
              className="h-10 w-10 md:h-12 md:w-12 object-contain transition-transform group-hover:scale-105 drop-shadow-lg rounded-full" 
              onError={(e) => e.target.style.display='none'}
            />
            <span className="text-xl md:text-2xl font-black tracking-widest text-gray-900 dark:text-white">
              AURA NEEDS<span className="text-[var(--primary)] drop-shadow-md">.</span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-2xl items-center relative group">
            <input 
              type="text" 
              placeholder="Search premium tech, home appliances, fashion..." 
              className="w-full py-2.5 pl-5 pr-12 rounded-full bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white border border-transparent focus:border-[var(--primary)] focus:bg-white dark:focus:bg-[#121212] focus:outline-none focus:ring-4 focus:ring-[var(--primary)]/20 transition-all duration-300 shadow-inner"
            />
            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[var(--primary)] rounded-full text-white hover:scale-105 active:scale-95 transition-transform flex items-center justify-center shadow-md">
              <Search size={16} />
            </button>
          </div>

          <div className="flex items-center gap-5 text-gray-800 dark:text-gray-200">
            {mounted && (
              <button onClick={handleThemeToggle} className="hover:text-[var(--primary)] transition-colors relative z-50">
                {theme === "dark" ? <Sun size={22} /> : <Moon size={22} />}
              </button>
            )}

            <div onClick={toggleCart} className="relative cursor-pointer hover:text-[var(--primary)] transition-colors flex items-center gap-1">
              <ShoppingBag size={22} />
              {mounted && cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full shadow-lg border-2 border-white dark:border-[#0a0a0a]">
                  {cartItemCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ================= BOTTOM BAR (QUICK LINKS) ================= */}
        <div className="border-t border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-[#0a0a0a]/50">
          <div className="container mx-auto px-4 py-2 flex items-center gap-6 text-sm font-semibold overflow-x-auto text-gray-700 dark:text-gray-300 no-scrollbar">
            
            <button onClick={() => setIsSidebarOpen(true)} className="flex items-center justify-center p-1.5 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg hover:text-[var(--primary)] text-gray-900 dark:text-white transition-all">
              <Menu size={20} />
            </button>

            {/* 🌟 PREMIUM HIGHLIGHTS (Bottom Bar) 🌟 */}
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}>
              <Link href="/sale" className="flex items-center gap-1.5 whitespace-nowrap bg-[var(--primary)] text-white px-4 py-1.5 rounded-full shadow-[0_0_12px_rgba(147,51,234,0.6)] hover:shadow-[0_0_20px_rgba(147,51,234,0.8)] transition-all font-bold">
                <Flame size={16} className="animate-bounce" /> Live Sale
              </Link>
            </motion.div>

            <motion.div animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
              <Link href="/new-arrivals" className="flex items-center gap-1.5 whitespace-nowrap bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-500/40 text-purple-800 dark:text-purple-300 px-4 py-1.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-all font-bold mr-2">
                <Sparkles size={16} className="animate-pulse text-purple-600 dark:text-purple-400" /> New Arrivals
              </Link>
            </motion.div>

            {/* Quick Broad Categories */}
            <Link href="/category/electronics" className="hover:text-[var(--primary)] transition-colors whitespace-nowrap">Electronics</Link>
            <Link href="/category/home-appliances" className="hover:text-[var(--primary)] transition-colors whitespace-nowrap">Home Appliances</Link>
            <Link href="/category/fashion" className="hover:text-[var(--primary)] transition-colors whitespace-nowrap">Fashion</Link>
            <Link href="/category/beauty" className="hover:text-[var(--primary)] transition-colors whitespace-nowrap">Beauty & Care</Link>
          </div>
        </div>
      </header>
    </>
  );
}