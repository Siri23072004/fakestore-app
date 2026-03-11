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

const sizes = ["S", "M", "L", "XL"];
const colors = ["Red", "Blue", "Green", "Black"];

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-10 text-center">Loading product...</p>;
  if (!product) return <p className="p-10 text-center">Product not found</p>;

  const addToCart = () => {
    alert(`${product.title} added to cart! Size: ${selectedSize || "-"} Color: ${selectedColor || "-"}`);
    // Later: integrate with cart API
  };

  return (
    <div className="max-w-6xl mx-auto p-6 md:flex gap-8 bg-gray-50">
      {/* Image */}
      <div className="flex-1 flex items-center justify-center bg-gray-100 p-4 rounded-lg">
        <img src={product.image} alt={product.title} className="h-80 object-contain" />
      </div>

      {/* Details */}
      <div className="flex-1 space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-xl text-blue-600 font-semibold">${product.price}</p>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-sm text-gray-500">Category: {product.category}</p>

        {/* Rating */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < Math.round(product.rating.rate) ? "text-yellow-400" : "text-gray-300"}>
              ★
            </span>
          ))}
          <span className="text-gray-600 text-sm">({product.rating.count} reviews)</span>
        </div>

        {/* Size Selection (only for clothes) */}
        {(product.category === "men's clothing" || product.category === "women's clothing") && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-1">Size:</p>
            <div className="flex gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 border rounded ${
                    selectedSize === size
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Color Selection */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Color:</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1 border rounded ${
                  selectedColor === color
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button onClick={addToCart} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Add to Cart
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Buy Now
          </button>
        </div>

        {/* Reviews & Comments */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Reviews & Comments</h2>
          <div className="space-y-3">
            <div className="bg-gray-100 p-3 rounded">
              <p className="font-medium">Alice</p>
              <p>Great product, works exactly as expected!</p>
            </div>
            <div className="bg-gray-100 p-3 rounded">
              <p className="font-medium">Bob</p>
              <p>Good value for money, would buy again.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;