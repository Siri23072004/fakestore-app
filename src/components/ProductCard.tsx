import type { Product } from '../types/product';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-lg">
      <div className="aspect-square overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-4"
        />
      </div>
      <div className="mt-4 flex flex-1 flex-col space-y-2">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1">{product.category}</p>
        <div className="flex flex-1 flex-col justify-end">
          <p className="text-lg font-bold text-blue-600">${product.price}</p>
          <button className="mt-4 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;