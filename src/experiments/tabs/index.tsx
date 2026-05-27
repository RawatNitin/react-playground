import { Tabs } from "./tabs";

export const TryTabs = () => {
  return (
    <Tabs>
      <Tabs.Item id={0}>
        <Tabs.Header>First Header</Tabs.Header>
        <Tabs.Content>First Content</Tabs.Content>
      </Tabs.Item>
      <Tabs.Item id={1}>
        <Tabs.Header>Second Header</Tabs.Header>
        <Tabs.Content>Second Content</Tabs.Content>
      </Tabs.Item>
      <Tabs.Item id={2}>
        <Tabs.Header>Third Header</Tabs.Header>
        <Tabs.Content>Third Content</Tabs.Content>
      </Tabs.Item>
    </Tabs>
  );
};
