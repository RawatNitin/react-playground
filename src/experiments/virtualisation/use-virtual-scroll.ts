// items
// itemHeight
// containerHeight

import { useState } from "react";

// onScroll
// visibileItems

const offSet = 2;

const useVirtualScroll = <T>({
  items,
  itemHeight,
  containerHeight,
}: {
  items: Array<T>;
  itemHeight: number;
  containerHeight: number;
}) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalItems = items.length;
  const numberOfVisibileItems = containerHeight / itemHeight;

  const start = scrollTop / itemHeight - offSet;
  const end = start + numberOfVisibileItems + offSet;

  const onScroll = (e) => {
    const top = e.target.scrollTop;
    setScrollTop(top);
  };

  return { onScroll, visibleItems: items.slice(start, end + 1) };
};
