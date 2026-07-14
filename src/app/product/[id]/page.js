import { products } from "@/data/dummyData";
import ProductClient from "./ProductClient";

// 1. Yeh function GitHub Pages ke liye lazmi hai (Saare products pehle hi bana dega)
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

// 2. Main Page Component
export default function ProductPage({ params }) {
  // params se 'id' nikal kar hamare Client Component ko bhej raha hai
  return <ProductClient id={params.id} />;
}
