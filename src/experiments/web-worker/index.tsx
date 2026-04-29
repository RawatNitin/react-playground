import { useEffect, useRef } from "react";

export const WebWorker = () => {
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    // Vite needs workers to be referenced via an URL so the dev server can serve JS (not HTML).
    workerRef.current = new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    });

    workerRef.current.onmessage = (e) => {
      console.log("message in comp", e.data);
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const post = () => {
    workerRef.current?.postMessage({});
  };

  return (
    <button className="w-52 bg-red-200" type="button" onClick={post}>
      calculate
    </button>
  );
};
