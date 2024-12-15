import React, { createContext, useState } from 'react';

export const  LikeContext= createContext();

export const LikeContextProvider = ({ children }) => {
  const [likeContext, setLikeContext] = useState(false);

  return (
    <LikeContext.Provider value={{likeContext, setLikeContext}}>
      {children}
    </LikeContext.Provider>
  );
};
