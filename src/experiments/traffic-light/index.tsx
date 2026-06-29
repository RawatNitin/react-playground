import { useEffect, useState } from "react";
import "./traffic-light.css";

type LightColor = "red" | "yellow" | "green";

const DURATIONS: Record<LightColor, number> = {
  red: 5000,
  yellow: 1000,
  green: 6000,
};

const NEXT_COLOR: Record<LightColor, LightColor> = {
  red: "yellow",
  yellow: "green",
  green: "red",
};

export const TrafficLight = () => {
  const [color, setColor] = useState<LightColor>("red");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setColor((current) => NEXT_COLOR[current]);
    }, DURATIONS[color]);

    return () => {
      clearTimeout(timeout);
    };
  }, [color]);

  return (
    <div className="traffic-light">
      <div className={`light red ${color === "red" ? "active" : ""}`} />
      <div className={`light yellow ${color === "yellow" ? "active" : ""}`} />
      <div className={`light green ${color === "green" ? "active" : ""}`} />
    </div>
  );
};
