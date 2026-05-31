import { useState } from "react";

const input = [5, 2, 8, 1, 4];

export const Sort = () => {
  const [bars, setBars] = useState(input);
  const [isSorting, setIsSorting] = useState(false);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const bubbleSort = async () => {
    if (isSorting) return;

    setIsSorting(true);

    const arr = [...bars];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          // Create a new array reference so React re-renders
          setBars([...arr]);

          // Pause so the user can see the change
          await sleep(500);
        }
      }
    }

    setIsSorting(false);
  };

  return (
    <div>
      <button onClick={bubbleSort} disabled={isSorting}>
        Sort
      </button>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: "10px",
          marginTop: "20px",
          height: "250px",
        }}
      >
        {bars.map((value, index) => (
          <div
            key={index}
            style={{
              width: "50px",
              height: `${value * 20}px`,
              background: "green",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};
