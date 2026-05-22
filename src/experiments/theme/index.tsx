/* eslint-disable react-refresh/only-export-components */
import { useTheme } from "./use-theme";
import "./theme.css";

export { ThemeProvider } from "./theme-provider";
export { useTheme } from "./use-theme";
export type { ThemeContextValue } from "./theme-context";

export const Theme = () => {
  const { theme, changeTheme } = useTheme();
  return (
    <div>
      <label htmlFor="theme-selector">Dark Theme</label>
      <input
        id="theme-selector"
        type="checkbox"
        checked={theme === "dark"}
        onChange={changeTheme}
      />
      <div className="theme-description">Current Theme is: {theme}</div>
    </div>
  );
};
