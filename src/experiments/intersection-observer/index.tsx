import { useCallback, useEffect, useState } from "react";

export const InterSection = () => {
  const [el, setEl] = useState(null);

  const onIntersection = useCallback((el) => {
    console.log(el.textContent);
  }, []);

  useIntersectionObserver({
    el,
    cb: onIntersection,
  });

  const items = [];
  for (let i = 0; i < 100; i++) {
    items.push(<Row key={i} val={i} />);
  }

  items.push(
    <div
      ref={setEl}
      style={{ border: "1px dashed gray", textAlign: "center", height: "50px" }}
    >
      Anchor
    </div>,
  );

  return items;
};

const Row = ({ val }) => {
  return (
    <div style={{ border: "1px dashed gray", textAlign: "center" }}>{val}</div>
  );
};

const useIntersectionObserver = ({ el, cb }) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      console.log(entries[0].target.textContent);
      cb(entries[0]);
    });

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [el, cb]);
};
