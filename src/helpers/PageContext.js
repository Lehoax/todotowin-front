import React, { createContext, useContext, useState } from 'react';

const PageContext = createContext();

export const usePage = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PageContext.Provider>
  );
};
