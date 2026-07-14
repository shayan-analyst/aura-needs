"use client";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, CreditCard, Truck, Lock, Printer, MessageCircle } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {
  const { cart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState(null); 

  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      // Sirf Internal Order ID generate hogi
      setOrderData({
        orderId: `#AURA-${Math.floor(Math.random() * 90000) + 10000}`,
        date: new Date().toLocaleDateString(),
        total: totalPrice
      });
    }, 2000);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // ================= 1. EMPTY CART SCREEN =================
  if (cart.length === 0 && !orderData) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 relative z-10">
        <div className="bg-gray-100 dark:bg-[#1a1a1a] p-6 rounded-full mb-6">
          <Truck size={48} className="text-gray-400" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[var(--foreground)]">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">Looks like you haven't added anything to your cart yet.</p>
        <Link href="/" className="bg-[var(--primary)] text-white px-8 py-3.5 rounded-full font-semibold hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/30">
          Continue Shopping
        </Link>
      </div>
    );
  }

  // ================= 2. REAL-WORLD ORDER SUCCESS SCREEN =================
  if (orderData) {
    return (
      <div className="container mx-auto px-4 py-12 relative z-10 print:py-0">
        <div className="max-w-2xl mx-auto bg-[var(--card-bg)] rounded-3xl border border-[var(--border)] shadow-xl overflow-hidden print:shadow-none print:border-none">
          
          <div className="bg-green-500 text-white p-8 text-center print:bg-white print:text-black print:border-b">
            <ShieldCheck size={64} className="mx-auto mb-4 print:text-green-500" />
            <h1 className="text-3xl font-bold mb-2">Order Successfully Placed!</h1>
            <p className="opacity-90 print:opacity-100 print:text-gray-600">Your premium items are being prepared for shipment.</p>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center border-b border-[var(--border)] pb-6 mb-6">
              <div>
                <p className="text-gray-500 text-sm mb-1">Order Number</p>
                <p className="font-bold text-lg">{orderData.orderId}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm mb-1">Date</p>
                <p className="font-bold text-lg">{orderData.date}</p>
              </div>
            </div>

            {/* Next Steps / Tracking Info Box */}
            <div className="bg-[var(--primary)]/10 rounded-2xl p-6 mb-8 text-center border border-[var(--primary)]/20 print:bg-white print:border-gray-300">
              <h3 className="font-bold text-xl mb-3 text-[var(--foreground)]">What happens next?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Your order is currently processing. Once your items are packed and handed over to our delivery partner (Trax), we will share your official tracking slip and updates directly via WhatsApp.
              </p>
              
              <div className="inline-flex items-center justify-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-semibold">
                <MessageCircle size={18} /> WhatsApp Updates Enabled
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 print:hidden">
              <button onClick={handlePrintSlip} className="flex-1 bg-gray-100 dark:bg-white/5 border border-[var(--border)] text-[var(--foreground)] py-3.5 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Printer size={18} /> Save Order Receipt
              </button>
              <Link href="/" className="flex-1 bg-[var(--primary)] text-white text-center py-3.5 rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-[var(--primary)]/30">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= 3. CHECKOUT FORM =================
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 relative z-10">
      
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[var(--primary)] transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Store
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-[var(--foreground)]">Secure Checkout</h1>
      
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* SHIPPING FORM */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-[var(--border)] shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <Truck className="text-[var(--primary)]" size={24} /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input required type="text" placeholder="First Name" className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--primary)]" />
              <input required type="text" placeholder="Last Name" className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--primary)]" />
              <input required type="tel" placeholder="WhatsApp Number (For Tracking)" className="w-full md:col-span-2 bg-transparent border border-[var(--border)] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--primary)]" />
              <input required type="text" placeholder="Complete Street Address" className="w-full md:col-span-2 bg-transparent border border-[var(--border)] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--primary)]" />
              <input required type="text" placeholder="City" className="w-full bg-transparent border border-[var(--border)] rounded-xl px-4 py-3.5 focus:outline-none focus:border-[var(--primary)]" />
            </div>
          </div>

          <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border border-[var(--border)] shadow-sm">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 border-b border-[var(--border)] pb-4">
              <CreditCard className="text-[var(--primary)]" size={24} /> Payment Method
            </h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 p-4 border border-[var(--primary)] rounded-xl bg-[var(--primary)]/5 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="text-[var(--primary)] w-4 h-4" />
                <span className="font-medium text-[var(--foreground)]">Cash on Delivery (COD)</span>
              </label>
            </div>
          </div>
        </div>

        {/* ORDER SUMMARY */}
        <div className="lg:col-span-5">
          <div className="bg-[var(--card-bg)] p-6 md:p-8 rounded-3xl border-2 border-[var(--primary)] shadow-xl shadow-[var(--primary)]/10 sticky top-28">
            <h2 className="text-xl font-semibold mb-6 border-b border-[var(--border)] pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-bold text-sm">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-[var(--border)] pt-4 space-y-3 mb-6">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>${totalPrice.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span className="text-green-500 font-medium">Free</span></div>
              <div className="flex justify-between text-xl font-bold mt-4 pt-4 border-t border-[var(--border)] text-[var(--foreground)]">
                <span>Total</span><span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              type="submit" disabled={isProcessing}
              className="w-full bg-[var(--primary)] text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {isProcessing ? (
                <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><Lock size={20} /> Place Order - ${(totalPrice).toFixed(2)}</>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}