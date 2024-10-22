import React, { createContext, useState, useContext } from 'react';

const XPContext = createContext();

export const XPProvider = ({ children }) => {
  const [xp, setXP] = useState(0);  

  return (
    <XPContext.Provider value={{ xp, setXP }}>
      {children}
    </XPContext.Provider>
  );
};

export const useXP = () => {
  return useContext(XPContext);
};
