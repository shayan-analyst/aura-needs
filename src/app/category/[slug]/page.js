import { products } from "@/data/dummyData";
import ProductCard from "@/components/product/ProductCard";

// Note: Yahan "use client" NAHI aayega.
export default async function CategoryPage({ params }) {
  // URL se slug nikalna (Next.js 15+ support ke sath)
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  // URL wale naam ko text main badalna (e.g. "vanity-boxes" -> "Vanity Boxes")
  const categoryName = slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  // Category ke mutabiq products filter karna
  const categoryProducts = products.filter(
    (product) => product.category.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
      
      {/* Category Heading */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] mb-4">
          {categoryName} Collection
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore our exclusive range of premium {categoryName.toLowerCase()} crafted for perfection.
        </p>
      </div>

      {/* Product Grid */}
      {categoryProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {categoryProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">No products found</h2>
          <p className="text-gray-500 mb-6">We are currently restocking this category. Check back soon!</p>
          <a href="/" className="bg-[var(--primary)] text-white px-8 py-3 rounded-full hover:opacity-90 transition-opacity font-medium">
            Continue Shopping
          </a>
        </div>
      )}
      
    </div>
  );
}