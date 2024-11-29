import React, { createContext, useState } from 'react';

export const CategoryContext = createContext();

export const CategoryContextProvider = ({ children }) => {
  const [categoryContext, setCategoryContext] = useState('');

  return (
    <CategoryContext.Provider value={{ categoryContext, setCategoryContext }}>
      {children}
    </CategoryContext.Provider>
  );
};
