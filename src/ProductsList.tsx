import { useEffect, useState } from "react";
import type { Product } from "./types";

const ProductsList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products?limit=30"
        );
        if (response.status === 200) {
          const data: Product[] = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return <div></div>;
};

export default ProductsList;
