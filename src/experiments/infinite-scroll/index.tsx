import { useState, useEffect, type UIEvent, useRef, useCallback } from "react";
import { useProducts, type TProduct } from "../../resources/use-products";

export const InfiniteScroll = () => {
  // IntersectionObserver
  // Sentinel div
  // Proper guards (loading, hasMore)
  // Cleanup
  const sentinelRef = useRef(null);
  const [productItems, setProductItems] = useState<TProduct[]>([]);
  const limit = 50;
  const [skip, setSkip] = useState(0);

  const { products, isLoading, error, total } = useProducts({ limit, skip });

  const loadMore = useCallback(() => {
    if (!isLoading && productItems.length < total) {
      setSkip(skip + limit);
    }
  }, [isLoading, productItems.length, total, skip]);

  useEffect(() => {
    setProductItems((prev) => [...prev, ...products]);
  }, [products]);

  useEffect(() => {
    const interSectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadMore();
      }
    });

    if (sentinelRef.current) {
      interSectionObserver.observe(sentinelRef.current);
    }

    return () => {
      interSectionObserver.disconnect();
    };
  }, [loadMore]);

  return (
    <div className="w-full flex flex-col justify-between">
      <div className="border w-full border-1 bg-gray-100">
        <h1>Infinite Scroll</h1>
        <span className="flex justify-around">
          <span>Loading: {isLoading ? "loading..." : "No"}</span>
          <span>IsError: {error ? "Yes" : "No"}</span>
          <span>Total: {total}</span>
        </span>
      </div>
      <div className="flex justify-around border-1 border-gray-200 bg-gray-200">
        <span className="w-full">Title</span>
        <span className="w-full">ID</span>
        <span className="w-full">Price</span>
      </div>
      <div className="w-full h-150 border-2 overflow-auto">
        <div>
          {productItems.map(({ title, id, price }) => {
            return (
              <div className="flex justify-around border-1 border-gray-200">
                <span className="w-full">${title}</span>
                <span className="w-full">${id}</span>
                <span className="w-full">${price}</span>
              </div>
            );
          })}
          <div ref={sentinelRef}></div>
        </div>
      </div>
    </div>
  );
};
