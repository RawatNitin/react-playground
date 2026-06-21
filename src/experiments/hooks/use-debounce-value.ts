import { useEffect, useState, useRef } from "react";

export const useDebounceValue = ({ value, delay }) => {
  const [debounceValue, setDebounceValue] = useState(null);
  const timeout = useRef(null);

  useEffect(() => {
    timeout.current = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout.current);
    };
  }, [value, delay]);

  return { debounceValue };
};
