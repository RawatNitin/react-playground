import { useEffect, useState, useRef } from "react";
import "./grid.css";

export const NByNGrid = ({ rows = 3, cols = 3 }) => {
  const [history, setHistory] = useState<Array<Array<boolean>>>([
    new Array(rows * cols).fill(false),
  ]);

  const timeout = useRef(null);

  const [isClearing, setIsClearing] = useState(false);

  const cells = history[history.length - 1];

  const onClick = (index) => {
    const newCells = [...cells];
    newCells[index] = true;

    setHistory([...history, newCells]);
  };

  useEffect(() => {
    if (!isClearing || history.length <= 1) return;

    timeout.current = setTimeout(() => {
      setHistory((history) => history.slice(0, -1));
    }, 1000);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [isClearing, history]);

  useEffect(() => {
    if (history.length === 6 && !isClearing) {
      setIsClearing(true);
    }
  }, [history.length, setIsClearing, isClearing]);

  return (
    <div
      className="grid"
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
    >
      {cells.map((cell, index) => {
        return (
          <div
            key={index}
            onClick={cell || isClearing ? undefined : () => onClick(index)}
            className={`grid-cell ${cell ? "selected" : ""}`}
          >
            {index}
          </div>
        );
      })}
    </div>
  );
};
