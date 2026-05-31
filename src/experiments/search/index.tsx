import { useState, useEffect, useCallback } from "react";
import { useDebounce } from "./use-debounce";

const Languages = [
  "java",
  "javascript",
  "python",
  "r",
  "swift",
  "kotlin",
  "typescript",
  "go",
];

const fetchProducts = async (query: string) => {
  const response = await fetch(
    `https://dummyjson.com/products/search?q=${query}`,
  );
  const data = await response.json();
  console.log("response", data);
  return data.products;
};

export const Search = () => {
  const [search, setSearch] = useState("");
  const [productList, setProductList] = useState([]);

  const fetchAndSetProducts = useCallback(async (search) => {
    const result = await fetchProducts(search);
    console.log("search ", result);
    setProductList(result);
  }, []);

  // const debouncedFetchList = useCallback(
  //   debounce(fetchAndSetProducts, 1000),
  //   [],
  // );

  const debouncedFetchList = useDebounce(fetchAndSetProducts, 1000);

  useEffect(() => {
    debouncedFetchList(search);
  }, [search]);

  useEffect(() => {
    const num = Math.random();
    if (num < 0.1) {
      throw "err";
    }
  }, [search]);

  return (
    <div className="App">
      <h1>TypeAhead</h1>
      <h2>Start Searching!</h2>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {productList?.map((item) => (
          <li key={item.id} className={"listItem"}>
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

const debounce = (fn, time) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn(...args);
    }, time);
  };
};
