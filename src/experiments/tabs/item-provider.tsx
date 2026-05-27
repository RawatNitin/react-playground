import { Itemcontext } from "./item-context";

export const ItemProvider = ({ children, id }) => {
  return <Itemcontext.Provider value={id}>{children}</Itemcontext.Provider>;
};
