import { createContext, useContext, useState } from "react";

/**Accordion Conext */
const AccordionContext = createContext(null);

export const AccordionProvider = ({ children }) => {
  const [openItems, setOpenItems] = useState([]);

  const toggleItem = (item) => {
    setOpenItems((prev) => {
      return prev.includes(item)
        ? prev.filter((openItem) => openItem !== item)
        : [...prev, item];
    });
  };

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordionContext = () => useContext(AccordionContext);
