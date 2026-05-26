import { useEffect, useRef, useState } from "react";
import "./progress-bar.css";

type BarStatus = "idle" | "running" | "completed";

interface Bar {
  id: number;
  progress: number;
  status: BarStatus;
}

export const ProgressBar = () => {
  const [bars, setBars] = useState<Bar[]>([]);
  const nextId = useRef(1);

  const addBar = () => {
    setBars((prev) => {
      const runningCount = prev.filter((b) => b.status === "running").length;
      const status: BarStatus = runningCount < 3 ? "running" : "idle";
      return [...prev, { id: nextId.current++, progress: 0, status }];
    });
  };

  useEffect(() => {
    const id = setInterval(() => {
      setBars((prev) => {
        let hasRunning = false;
        let completedInTick = false;

        const updated = prev.map((bar) => {
          if (bar.status !== "running") return bar;
          hasRunning = true;
          const next = bar.progress + 1;
          if (next >= 100) {
            completedInTick = true;
            return { ...bar, progress: 100, status: "completed" };
          }
          return { ...bar, progress: next };
        });

        if (!hasRunning) return prev;

        if (completedInTick) {
          const runningCount = updated.filter(
            (b) => b.status === "running"
          ).length;
          const slots = 3 - runningCount;
          if (slots > 0) {
            let started = 0;
            return updated.map((bar) => {
              if (bar.status === "idle" && started < slots) {
                started++;
                return { ...bar, status: "running" };
              }
              return bar;
            });
          }
        }

        return updated;
      });
    }, 50);

    return () => clearInterval(id);
  }, []);

  const statusLabel: Record<BarStatus, string> = {
    idle: "Waiting...",
    running: "In progress",
    completed: "Completed",
  };

  return (
    <div className="container">
      <button onClick={addBar} className="add-btn">
        Add Progress Bar
      </button>

      <div className="list">
        {bars.map((bar) => (
          <div key={bar.id} className="bar-card">
            <div className="bar-header">
              <span>
                Bar #{bar.id} —{" "}
                <span className={`bar-status${bar.status === "completed" ? " completed" : ""}`}>
                  {statusLabel[bar.status]}
                </span>
              </span>
              <span className="bar-label">{bar.progress}%</span>
            </div>
            <div className="track">
              <div
                className={`fill ${bar.status}`}
                style={{ width: `${bar.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
