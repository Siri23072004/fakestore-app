import { useState, useEffect } from 'react';
import {Product} from '../types/product';

export const useProducts = () => {
  // Storing the product list in a state
  const [productList, setProductList] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching data from Fake Store API
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProductList(data);
        setLoading(false);
      })
      .catch((err) => {
        // Handling API errors
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  return { productList, loading };
};