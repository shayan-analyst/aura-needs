import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer"; 

// ================= GLOBAL COMPONENTS IMPORTS ================= //
import CartDrawer from "@/components/cart/CartDrawer";
// Koi naya component import karna ho toh yahan karein
// ============================================================ //

import "./globals.css";

export const metadata = {
  title: "Aura Needs | Premium Cosmetics & Bags",
  description: "Your ultimate destination for luxury vanity boxes, cosmetics, and bags.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
  <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          {/* ================= 1. TOP HEADER ================= */}
          <Navbar />

          {/* ================= 2. MAIN PAGE CONTENT ================= */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* ================= 3. OVERLAYS & DRAWERS ================= */}
          <CartDrawer /> 
          {/* FUTURE ADDITIONS: Koi bhi modal, popup, ya toast alert yahan paste karein */}


          {/* ================= 4. BOTTOM FOOTER ================= */}
          <Footer />

        </ThemeProvider>
      </body>
    </html>
  );
}