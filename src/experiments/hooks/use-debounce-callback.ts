import { useCallback, useRef } from "react";

export const useDebounceCallback = ({ cb, delay }) => {
  const timeoutRef = useRef(null);

  const debouncedCb = useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        cb(...args);
      }, delay);
    },
    [cb, delay],
  );

  return { debouncedCb };
};

// ****************
export const debounce = (cb, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
