import { Accordion } from "./accordion";

export const AccordionTest = () => {
  return (
    <Accordion>
      <Accordion.Item id="html">
        <Accordion.Header>What is HTML?</Accordion.Header>
        <Accordion.Content>
          HTML is the structure of a webpage.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item id="css">
        <Accordion.Header>What is CSS?</Accordion.Header>
        <Accordion.Content>CSS is used for styling.</Accordion.Content>
      </Accordion.Item>
    </Accordion>
  );
};
