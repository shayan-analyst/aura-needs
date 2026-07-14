import Link from "next/link";

// Custom SVG Icons (Kyunke Lucide ne brand icons remove kar diye hain)
const Facebook = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const Instagram = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
);

const Twitter = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const Youtube = ({ size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 1.46 5.33 2.78 2.78 0 0 0 1.94 2C8.12 19.5 15 19.5 15 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 1.46-5.33 29 29 0 0 0-1.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-[#0a0a0a] border-t border-[var(--border)] pt-16 pb-8 mt-20 relative z-10">
      <div className="container mx-auto px-4">
        
        {/* Amazon-Style 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div>
            <span className="text-2xl font-bold tracking-widest text-[var(--foreground)] mb-6 block">
              A U R A <span className="text-[var(--primary)] drop-shadow-md">.</span>
            </span>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
              Elevating your daily aesthetic with premium vanity boxes, luxury cosmetics, and elegant bags.
            </p>
            <div className="flex items-center gap-5 text-gray-400">
              <Link href="#" className="hover:text-[var(--primary)] hover:scale-110 transition-all"><Instagram size={20} /></Link>
              <Link href="#" className="hover:text-[var(--primary)] hover:scale-110 transition-all"><Facebook size={20} /></Link>
              <Link href="#" className="hover:text-[var(--primary)] hover:scale-110 transition-all"><Twitter size={20} /></Link>
              <Link href="#" className="hover:text-[var(--primary)] hover:scale-110 transition-all"><Youtube size={20} /></Link>
            </div>
          </div>

          {/* Shop Categories */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4">Shop Categories</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/category/vanity-boxes" className="hover:text-[var(--primary)] transition-colors">Vanity Boxes</Link></li>
              <li><Link href="/category/cosmetics" className="hover:text-[var(--primary)] transition-colors">Luxury Cosmetics</Link></li>
              <li><Link href="/category/handbags" className="hover:text-[var(--primary)] transition-colors">Elegant Handbags</Link></li>
              <li><Link href="/category/skincare" className="hover:text-[var(--primary)] transition-colors">Skincare Essentials</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4">Customer Service</h4>
            <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Track Your Order</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Shipping Information</Link></li>
              <li><Link href="#" className="hover:text-[var(--primary)] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-[var(--foreground)] mb-4">Stay in the Loop</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Get exclusive offers and beauty tips delivered directly to your inbox.
            </p>
            <div className="flex border border-gray-300 dark:border-[var(--border)] rounded-full overflow-hidden bg-white dark:bg-black/20">
              <input type="email" placeholder="Your email address" className="w-full bg-transparent px-4 py-2 text-sm focus:outline-none text-[var(--foreground)]" />
              <button className="bg-[var(--primary)] text-white px-5 py-2 text-sm font-medium hover:opacity-90 transition-opacity">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-gray-200 dark:border-[var(--border)] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Aura Needs. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-[var(--primary)] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}