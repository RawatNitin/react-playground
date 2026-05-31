import { useCallback, useRef } from "react";

export const useDebounce = (callback, delay) => {
  const timeout = useRef(null);
  const debounced = useCallback(
    (...props) => {
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        callback(...props);
      }, delay);
    },
    [callback, delay],
  );
  return debounced;
};
