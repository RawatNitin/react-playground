import { forwardRef, useState, useRef, useEffect } from "react";

import "./slide.css";

/*
- Rail is position: relative
- Picker is position: absolute inside the rail
  - Uses transform: translateX(x)
  - x is updated from mouse events

- mousedown on picker sets isDragging = true

- While dragging:
  - mousemove and mouseup listeners are attached to window
  - mousemove calculates picker position relative to the rail
  - position is clamped to stay within rail bounds
  - mouseup sets isDragging = false

- Rail bounds are obtained using getBoundingClientRect()
  - left = viewport x-coordinate of rail's left edge
  - right = viewport x-coordinate of rail's right edge

- Picker x position is:
  clientX - railLeft - pickerOffset

- If cursor goes:
  - before rail left -> x = 0
  - after rail right -> x = railWidth - pickerWidth
*/

export const Slide = () => {
  const [x, setX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const railRef = useRef(null);

  const onDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const railRect = railRef.current.getBoundingClientRect();
    const railStartX = railRect.left;
    const railEndX = railRect.right;

    const onMove = (e) => {
      if (isDragging) {
        if (e.clientX < railStartX) {
          setX(0);
          return;
        }
        if (e.clientX > railEndX) {
          setX(railEndX - railStartX - 20);
          return;
        }
        setX(e.clientX - railStartX - 20);
      }
    };

    const onUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [isDragging]);

  return (
    <div className="container">
      <Rail ref={railRef}>
        <Picker x={x} onDown={onDown} />
      </Rail>
    </div>
  );
};

const Rail = forwardRef(({ children }, ref) => {
  return (
    <div className="rail" ref={ref}>
      {children}
    </div>
  );
});

const Picker = ({ x, onDown }) => {
  return (
    <div
      className="picker"
      onMouseDown={onDown}
      style={{
        transform: `translateX(${x}px)`,
      }}
    ></div>
  );
};
