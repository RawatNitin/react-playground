import { useState } from "react";
import { TabsContext } from "./tabs-context";

export const TabsProvider = ({ children, defaultSelectedId }: { children: React.ReactNode; defaultSelectedId?: number }) => {
  const [selectedTabId, setSelectedTabId] = useState<number | null>(defaultSelectedId ?? null);

  const onChangeTab = (id: number) => {
    setSelectedTabId(id);
  };

  return (
    <TabsContext.Provider value={{ onChangeTab, selectedTabId }}>
      {children}
    </TabsContext.Provider>
  );
};


