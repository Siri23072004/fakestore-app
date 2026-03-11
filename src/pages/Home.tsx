// src/pages/Home.tsx
import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';

const Home = () => {
  const { products, loading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    "all",
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing"
  ];

  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 p-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-64 bg-white/30 animate-pulse rounded-xl shadow-md"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100">
        <div className="text-center p-8 bg-white shadow-lg rounded-xl">
          <h2 className="text-2xl font-bold text-red-600">Error!</h2>
          <p className="text-gray-700 mt-2">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 overflow-hidden">
      {/* Glowing blurred shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-blue-300 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl drop-shadow-md">
            Our Store
          </h1>
          <p className="mt-2 text-lg text-gray-700">
            Explore our latest collection of premium products.
          </p>
        </div>

        {/* Search + Product Count */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xs px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
          />
          <div className="text-gray-800 text-sm font-medium">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition
                ${
                  selectedCategory === cat
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
