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

  const handleLowToHigh = () => {
    const sortedProducts = Array.from(products).sort(
      (a, b) => a.price - b.price
    );
    setProducts(sortedProducts);
  };

  const handleHighToLow = () => {
    const sortedProducts = Array.from(products).sort(
      (a, b) => b.price - a.price
    );
    setProducts(sortedProducts);
  };

  const handleReset = () => {
    const sortedProducts = Array.from(products).sort((a, b) => a.id - b.id);
    setProducts(sortedProducts);
  };

  if (isLoading) return <p style={styles.loading}>Loading...</p>;

  if (error) return <p style={styles.error}>Error: {error}</p>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div style={styles.sortButtons}>
        <button style={styles.button} onClick={handleLowToHigh}>
          Low to High
        </button>{" "}
        <button style={styles.button} onClick={handleHighToLow}>
          High to Low
        </button>
        <button style={styles.button} onClick={handleReset}>
          Reset
        </button>
      </div>
      <div style={styles.container}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <h2> {product.title}</h2>
            <p> {product.description}</p>
            <p style={{ fontSize: "20px" }}>Price: ${product.price}</p>
            <img src={product.image} alt={product.title} style={styles.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  loading: {
    fontSize: "20px",
    color: "#555",
  },
  error: {
    color: "red",
  },
  sortButtons: {
    display: "flex",
    justifyContent: "center" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
  },
  container: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    justifyContent: "center" as const,
  },
  productCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    width: "320px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  image: {
    width: "50%",
    height: "auto",
    objectFit: "cover" as const,
    borderRadius: "4px",
  },
};

export default ProductsList;
