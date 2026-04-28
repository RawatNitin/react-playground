import { useEffect, useState, useRef, useCallback } from "react";

const fetchResponse = async ({ query, signal }) => {
  try {
    const res = await fetch(`https://dummyjson.com/todos/${query}`, {
      signal,
    });
    return await res.json();
  } catch (e) {
    return e;
  }
};

export const AbortControllerComp = () => {
  const ref = useRef(null);
  const [query, setQuery] = useState("");
  const [item, setItem] = useState(null);

  const onFetch = useCallback(
    async (query) => {
      const contoller = new AbortController();
      ref.current = contoller;
      const res = await fetchResponse({ query, signal: ref.current.signal });
      if (res) {
        setItem(res);
      }
    },
    [fetchResponse, setItem],
  );

  const onCancel = useCallback(() => {
    if (ref.current) ref.current?.abort();
  }, []);

  useEffect(() => {
    if (query) onFetch(query);

    return () => {
      onCancel();
    };
  }, [query, onFetch]);

  return (
    <div className="flex justify-around w-full">
      <input
        type="text"
        className="w-52 border border-gray-400 px-2 py-1"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {JSON.stringify(item)}
    </div>
  );
};
