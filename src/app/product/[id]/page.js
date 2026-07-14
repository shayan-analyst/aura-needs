"use client";
import { useParams } from "next/navigation";
import { products } from "@/data/dummyData";
import { useCartStore } from "@/store/useCartStore";
import { Star, Truck, ShieldCheck, ShoppingBag, Check, Heart, Share2, ThumbsUp } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

// Dummy Reviews Data specific to product page
const productReviews = [
  { id: 1, name: "Emily R.", date: "October 12, 2023", rating: 5, title: "Absolutely Love It!", text: "The quality is exactly as described. It feels very premium and the packaging was top-notch. Highly recommended for anyone looking for something durable." },
  { id: 2, name: "Jessica T.", date: "September 28, 2023", rating: 4, title: "Great value for money", text: "I've been using this for a week now. The material is great. Knocked off one star because delivery took a day longer than expected, but the product itself is flawless." },
  { id: 3, name: "Sarah M.", date: "September 15, 2023", rating: 5, title: "Exceeded my expectations", text: "Looks even better in person. I will definitely be ordering more products from Aura. Thank you!" }
];

export default function ProductPage() {
  const params = useParams(); // URL se ID nikalne ka tareeqa (Client Component main)
  const productId = Number(params.id);
  const product = products.find((p) => p.id === productId);

  // Zustand Cart Store
  const { addToCart, toggleCart } = useCartStore();
  const [isAdding, setIsAdding] = useState(false);

  if (!product) {
    return <div className="min-h-[70vh] flex items-center justify-center text-3xl font-bold">Product Not Found</div>;
  }

  // Add to Cart Logic
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product);
    
    // Thora sa delay de kar drawer open karna taake button animation feel ho
    setTimeout(() => {
      setIsAdding(false);
      toggleCart();
    }, 300);
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
      
      {/* ================= 1. BREADCRUMBS ================= */}
      <div className="text-sm text-gray-500 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
        <span>/</span>
        <Link href={`/category/${product.category.toLowerCase()}`} className="hover:text-[var(--primary)] transition-colors">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[var(--foreground)] font-medium truncate w-48 sm:w-auto">{product.name}</span>
      </div>

      {/* ================= 2. MAIN PRODUCT SECTION (AMAZON STYLE) ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16">
        
        {/* Left: Product Image */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-28 bg-[var(--card-bg)] rounded-3xl p-4 border border-[var(--border)] shadow-sm">
            <div className="absolute top-6 left-6 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10 shadow-lg">
              Save 20%
            </div>
            <div className="absolute top-6 right-6 flex flex-col gap-3 z-10">
              <button className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:text-red-500 hover:scale-110 transition-all shadow-md">
                <Heart size={20} />
              </button>
              <button className="bg-white/80 dark:bg-black/80 backdrop-blur-md p-2.5 rounded-full hover:text-blue-500 hover:scale-110 transition-all shadow-md">
                <Share2 size={20} />
              </button>
            </div>
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover rounded-2xl cursor-crosshair hover:scale-[1.02] transition-transform duration-300" 
            />
          </div>
        </div>

        {/* Center/Right: Product Details */}
        <div className="lg:col-span-7 flex flex-col">
          <Link href={`/category/${product.category.toLowerCase()}`} className="text-[var(--primary)] font-semibold tracking-wider uppercase text-sm mb-2 hover:underline">
            Visit the AURA Store
          </Link>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight text-[var(--foreground)]">
            {product.name}
          </h1>
          
          {/* Ratings & Reviews Count */}
          <div className="flex flex-wrap items-center gap-4 mb-4 pb-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-1 text-yellow-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
              ))}
              <span className="text-[var(--foreground)] font-bold ml-2">{product.rating}</span>
            </div>
            <span className="text-[var(--primary)] hover:underline cursor-pointer">{product.reviews} ratings</span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-500">100+ bought in past month</span>
          </div>

          {/* Pricing Block */}
          <div className="mb-6">
            <div className="flex items-end gap-3 mb-2">
              <p className="text-4xl md:text-5xl font-extrabold text-[var(--foreground)]">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-lg text-gray-500 line-through mb-1">
                ${(product.price * 1.2).toFixed(2)}
              </p>
            </div>
            <p className="text-green-600 dark:text-green-400 font-medium text-lg">In Stock.</p>
          </div>
          
          {/* Action Box / Add to Cart (Mobile & Desktop) */}
          <div className="bg-[var(--card-bg)] p-6 rounded-2xl border border-[var(--border)] mb-8 shadow-sm">
            <div className="flex items-center gap-3 text-sm mb-4">
              <Truck size={20} className="text-[var(--primary)]" />
              <span>Fast Delivery by <strong>3 Days</strong></span>
            </div>
            <button 
              onClick={handleAddToCart} 
              disabled={isAdding}
              className="w-full bg-[var(--primary)] text-white py-4 rounded-full font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all flex justify-center items-center gap-3 shadow-lg shadow-[var(--primary)]/30 disabled:opacity-70 disabled:scale-100"
            >
              {isAdding ? (
                <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShoppingBag /> Add to Cart
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-2 mt-4 text-xs text-gray-500">
              <ShieldCheck size={16} /> Secure transaction
            </div>
          </div>

          {/* About this Item (Amazon Style Bullets) */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">About this item</h3>
            <ul className="space-y-3 text-gray-600 dark:text-gray-300">
              <li className="flex gap-3"><Check size={20} className="text-[var(--primary)] shrink-0" /> <span><strong>Premium Quality:</strong> Crafted with high-grade materials to ensure maximum durability and a luxurious feel.</span></li>
              <li className="flex gap-3"><Check size={20} className="text-[var(--primary)] shrink-0" /> <span><strong>Modern Aesthetic:</strong> Designed specifically for modern trends, making it a perfect addition to your lifestyle.</span></li>
              <li className="flex gap-3"><Check size={20} className="text-[var(--primary)] shrink-0" /> <span><strong>Travel Friendly:</strong> Lightweight and perfectly sized to carry anywhere without hassle.</span></li>
              <li className="flex gap-3"><Check size={20} className="text-[var(--primary)] shrink-0" /> <span><strong>The Perfect Gift:</strong> Comes in beautiful, secure packaging making it an ideal gift for loved ones.</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* ================= 3. REVIEWS SECTION ================= */}
      <div className="mt-20 pt-12 border-t border-[var(--border)]">
        <h2 className="text-3xl font-bold mb-10">Customer Reviews</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Review Summary (Left) */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-6xl font-bold">{product.rating}</div>
              <div>
                <div className="flex text-yellow-500 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                  ))}
                </div>
                <p className="text-gray-500 text-sm">Based on {product.reviews} reviews</p>
              </div>
            </div>
            
            {/* Fake Progress Bars */}
            <div className="space-y-3">
              {[ { star: 5, pct: "85%" }, { star: 4, pct: "10%" }, { star: 3, pct: "3%" }, { star: 2, pct: "1%" }, { star: 1, pct: "1%" } ].map((bar) => (
                <div key={bar.star} className="flex items-center gap-3 text-sm">
                  <span className="w-12 text-gray-600 dark:text-gray-400">{bar.star} star</span>
                  <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 rounded-full" style={{ width: bar.pct }}></div>
                  </div>
                  <span className="w-8 text-right text-gray-500">{bar.pct}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Reviews (Right) */}
          <div className="lg:col-span-8 space-y-8">
            {productReviews.map((review) => (
              <div key={review.id} className="pb-8 border-b border-[var(--border)] last:border-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <span className="text-xs text-gray-500">Verified Purchase • {review.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-yellow-500 my-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                  ))}
                  <span className="font-bold text-[var(--foreground)] ml-2 text-sm">{review.title}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                  {review.text}
                </p>
                <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors">
                  <ThumbsUp size={16} /> Helpful
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}