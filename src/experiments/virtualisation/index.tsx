import { useState, useRef, useMemo } from "react";

const TOTAL_ITEMS = 1000;
const CONTAINER_HEIGHT = 400;
const ITEM_HEIGHT = 40;
const ITEMS_VISIBLE = CONTAINER_HEIGHT / ITEM_HEIGHT;
const OVER_SCAN = 3;

export const Virtualised = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const rafId = useRef(null);
  const latestScrollTop = useRef(null);

  const onScroll = (e) => {
    latestScrollTop.current = e.target.scrollTop;
    console.log("latestScrollTop", latestScrollTop.current);

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(() => {
        setScrollTop(latestScrollTop.current);
        rafId.current = null;
      });
    }
  };

  const items = useMemo(() => {
    const startIndex = Math.floor(scrollTop / ITEM_HEIGHT) - OVER_SCAN;
    const endIndex =
      Math.min(startIndex + ITEMS_VISIBLE, TOTAL_ITEMS) + OVER_SCAN * 2;
    const renderList = [];
    for (let i = startIndex; i < endIndex; i++) {
      renderList.push(
        <div
          key={i}
          style={{
            position: "absolute", // Each item's Position is calculated relative to the parent container
            top: `${ITEM_HEIGHT * i}px`, // Each item's top is after other items
            border: "1px solid red",
            height: `${ITEM_HEIGHT}px`,
            width: "100%",
          }}
        >
          Item Number {i}
        </div>,
      );
    }
    return renderList;
  }, [scrollTop]);

  return (
    <>
      {scrollTop}
      <div
        onScroll={onScroll}
        style={{
          border: "1px solid black",
          height: `${CONTAINER_HEIGHT}px`,
          overflowY: "auto",
          position: "relative",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            height: `${TOTAL_ITEMS * ITEM_HEIGHT}px`,
          }}
        >
          {items}
        </div>
      </div>
    </>
  );
};
