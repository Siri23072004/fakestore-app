// src/pages/ProductDetail.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [selectedColor, setSelectedColor] = useState<string>("Black");

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading product...</p>;
  if (!product) return <p className="p-10 text-center">Product not found</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 md:flex gap-12">
      <div className="flex-1 flex justify-center bg-gray-50 p-6 rounded-xl">
        <img src={product.image} alt={product.title} className="h-96 object-contain" />
      </div>

      <div className="flex-1 space-y-6">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl text-blue-600 font-bold">${product.price}</p>
        
        {/* Rating Section */}
        <div className="text-yellow-500">
          {'★'.repeat(Math.round(product.rating.rate))} 
          <span className="text-gray-500 ml-2">({product.rating.count} reviews)</span>
        </div>

        <p className="text-gray-600">{product.description}</p>

        {/* Wishlist & Delivery Info */}
        <div className="flex items-center gap-4">
          <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50 transition">
            ♥ Wishlist
          </button>
          <div className={`px-4 py-2 rounded-lg ${product.price > 50 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
            {product.price > 50 ? "✓ Free Delivery" : "Delivery Charge: $5.00"}
          </div>
        </div>

        {/* Conditional Category Sections */}
        <div className="border-t pt-4 space-y-4">
          {(product.category.includes("clothing")) && (
            <div>
              <p className="font-semibold">Size:</p>
              <div className="flex gap-2">
                {["S", "M", "L", "XL"].map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} className={`px-4 py-1 border ${selectedSize === s ? 'bg-black text-white' : ''}`}>{s}</button>
                ))}
              </div>
              <p className="font-semibold mt-2">Color:</p>
              <div className="flex gap-2">
                {["Red", "Blue", "Black"].map(c => (
                  <button key={c} onClick={() => setSelectedColor(c)} className={`px-4 py-1 border ${selectedColor === c ? 'bg-black text-white' : ''}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {product.category === "jewelery" && (
            <div className="bg-gray-100 p-4 rounded text-sm space-y-1">
              <p><strong>Base Metal:</strong> Sterling Silver / Gold Plated</p>
              <p><strong>Net Quantity:</strong> 1 Unit</p>
              <p><strong>Size:</strong> Free Size (Adjustable)</p>
            </div>
          )}

          {product.category === "electronics" && (
            <div className="bg-gray-100 p-4 rounded text-sm space-y-1">
              <p className="font-bold">Product Highlights:</p>
              <ul className="list-disc ml-4">
                <li>Best-in-class performance</li>
                <li>Energy efficient design</li>
              </ul>
              <p className="mt-2 text-red-600 font-semibold">Warranty: 1 Year Manufacturer Warranty</p>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-bold mb-2">Customer Reviews</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p><strong>Rahul:</strong> ⭐⭐⭐⭐⭐ "Very satisfied with the quality!"</p>
            <p><strong>Sneha:</strong> ⭐⭐⭐⭐ "Good product, fast shipping."</p>
          </div>
        </div>

        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 w-full md:w-auto">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;