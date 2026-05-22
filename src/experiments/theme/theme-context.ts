import { createContext } from "react";

export interface ThemeContextValue {
  theme: "light" | "dark";
  changeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);
