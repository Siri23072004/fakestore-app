import { useProducts } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, loading, error } = useProducts();

  // Loading State
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-red-600">Error!</h2>
          <p className="text-gray-600 mt-2">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Our Store
          </h1>
          <p className="mt-3 text-lg text-gray-500">
            Explore our latest collection of premium products.
          </p>
        </div>

        {/* Responsive Product Grid */}
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;