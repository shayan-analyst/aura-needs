"use client";
import { useCartStore } from "@/store/useCartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export default function CartDrawer() {
  const { cart, isCartOpen, toggleCart, removeFromCart, updateQuantity } = useCartStore();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Drawer Sidebar */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-[var(--background)] z-[101] shadow-2xl flex flex-col border-l border-[var(--border)]"
          >
            {/* Header */}
            <div className="p-5 border-b border-[var(--border)] flex justify-between items-center bg-[var(--card-bg)]">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingBag size={24} className="text-[var(--primary)]" /> Your Cart
              </h2>
              <button onClick={toggleCart} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-[var(--card-bg)] p-3 rounded-2xl border border-[var(--border)]">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-[var(--primary)] font-bold mt-1">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                          <span className="text-sm font-medium">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Checkout */}
            {cart.length > 0 && (
              <div className="p-5 border-t border-[var(--border)] bg-[var(--card-bg)]">
                <div className="flex justify-between mb-4 text-lg font-bold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <Link href="/checkout" onClick={toggleCart} className="block w-full bg-[var(--primary)] text-white text-center py-3.5 rounded-full font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[var(--primary)]/30">
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}