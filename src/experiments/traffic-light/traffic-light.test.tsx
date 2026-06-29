import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { TrafficLight } from "./index";

const getActiveColor = (container: HTMLElement) =>
  container.querySelector(".light.active")?.classList.contains("red")
    ? "red"
    : container.querySelector(".light.active")?.classList.contains("yellow")
      ? "yellow"
      : "green";

describe("TrafficLight", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("cycles red -> yellow -> green -> red on the configured durations", () => {
    const { container } = render(<TrafficLight />);

    expect(getActiveColor(container)).toBe("red");

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(getActiveColor(container)).toBe("yellow");

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(getActiveColor(container)).toBe("green");

    act(() => {
      vi.advanceTimersByTime(6000);
    });
    expect(getActiveColor(container)).toBe("red");
  });
});
