import React, { createContext, useState } from "react";

export const MenuContext = createContext(null);

export const MenuProvider = ({ children }) => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <MenuContext.Provider value={{ openMenu, setOpenMenu }}>
      {children}
    </MenuContext.Provider>
  );
};