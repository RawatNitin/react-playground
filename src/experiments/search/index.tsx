import { useDebounceCallback } from "../hooks/use-debounce-callback";
import { useCallback } from "react";

const fetchProducts = async (query: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
  );
  const data = await response.json();
  console.log("response", data);
  return data.products;
};

import { useEffect, useState } from "react";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const fetchProductsAndSet = useCallback(async () => {
    const results = await fetchProducts(query);
    setResults(results);
  }, [query]);

  const { debouncedCb: debouncedSearch } = useDebounceCallback({
    cb: fetchProductsAndSet,
    delay: 2000,
  });

  useEffect(() => {
    debouncedSearch(query);
  }, [debouncedSearch, query]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <ul>
        {results.map((product) => (
          <li className="listItem" key={product.id}>
            {product.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
