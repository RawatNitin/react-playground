import { useEffect, useState } from "react";

export type TProduct = {
  title: string;
  id: number;
  description: string;
  price: number;
};

export const useProducts = ({
  limit,
  skip = 0,
}: {
  limit: number;
  skip: number;
}) => {
  const [products, setProducts] = useState<TProduct[]>([]);
  const [total, setTotal] = useState<number>();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("useProducts");
    const fetData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit}&skip=${skip}`,
        );
        const { products, total } = await response.json();
        console.log("useProducts response", products, total);
        setProducts(products);
        setTotal(total);
        setError(null);
      } catch (e) {
        setProducts([]);
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetData();
  }, [skip, limit]);

  return { products, total, error, isLoading };
};
