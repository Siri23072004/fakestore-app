import type { Product } from '../types/product';
import { Link } from 'react-router-dom';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 hover:scale-105">
      {/* Product Image */}
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden rounded-md transition-all duration-300 group-hover:opacity-90">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-1">{product.category}</p>
        </div>

        <div className="mt-2 flex flex-col gap-2">
          <span className="text-lg font-bold text-blue-600">${product.price}</span>
          <Link
            to={`/products/${product.id}`}
            className="w-full text-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
        New
      </span>
    </div>
  );
};

export default ProductCard;