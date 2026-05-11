import {
  AccordionItemProvider,
  useAccordionItemContext,
} from "./accordion-item-provider";
import { AccordionProvider, useAccordionContext } from "./accordion-provider";
const Accordion = ({ children }) => {
  return <AccordionProvider>{children}</AccordionProvider>;
};

const Item = ({ children, id }) => {
  return <AccordionItemProvider id={id}>{children}</AccordionItemProvider>;
};

const Header = ({ children }) => {
  const { id, isOpen } = useAccordionItemContext();
  const { toggleItem } = useAccordionContext();

  return (
    <button onClick={() => toggleItem(id)} aria-expanded={isOpen}>
      {children}
    </button>
  );
};

const Content = ({ children }) => {
  const { isOpen } = useAccordionItemContext();

  if (!isOpen) {
    return null;
  }

  return <div>{children}</div>;
};

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export { Accordion };
