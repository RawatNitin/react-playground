import { createContext } from "react";

export type TabsContextType = {
  selectedTabId: number | null;
  onChangeTab: (id: number) => void;
};

export const TabsContext = createContext<TabsContextType>({
  selectedTabId: null,
  onChangeTab: () => {},
});
