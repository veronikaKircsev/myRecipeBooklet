import React, { createContext, useState } from 'react';

export const  DBChangedContext= createContext();

export const DBChangedContextProvider = ({ children }) => {
  const [dBChangedContext, setDBChangedContext] = useState('');

  return (
    <DBChangedContext.Provider value={{dBChangedContext, setDBChangedContext}}>
      {children}
    </DBChangedContext.Provider>
  );
};
