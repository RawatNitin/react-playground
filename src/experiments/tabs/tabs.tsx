import { TabsProvider } from "./tabs-provider";
import { useTabsContext } from "./use-tabs-context";
import { ItemProvider } from "./item-provider";
import { useItemContext } from "./use-item-context";

const Tabs = ({ children, defaultSelectedId }) => {
  return <TabsProvider defaultSelectedId={defaultSelectedId}>{children}</TabsProvider>;
};

const Item = ({ children, id }) => {
  return <ItemProvider id={id}>{children}</ItemProvider>;
};

const Header = ({ children }) => {
  const id = useItemContext();
  const { selectedTabId, onChangeTab } = useTabsContext();

  return (
    <div
      onClick={() => onChangeTab(id)}
      className={selectedTabId === id ? "selected" : ""}
    >
      {children}
    </div>
  );
};

const Content = ({ children }) => {
  const id = useItemContext();
  const { selectedTabId } = useTabsContext();
  return selectedTabId === id ? <div>{children}</div> : null;
};

Tabs.Item = Item;
Tabs.Header = Header;
Tabs.Content = Content;

export { Tabs };
