import { createContext, useContext, useState } from "react";
import { useAccordionContext } from "./accordion-provider";
/**Accordion Item Context */

const AccordionItemContext = createContext(null);

export const AccordionItemProvider = ({ children, id }) => {
  const { openItems } = useAccordionContext();

  const isOpen = openItems.includes(id);

  return (
    <AccordionItemContext.Provider value={{ isOpen, id }}>
      {children}
    </AccordionItemContext.Provider>
  );
};

export const useAccordionItemContext = () => useContext(AccordionItemContext);
