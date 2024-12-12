import React, { createContext, useState } from 'react';

export const CameraContext = createContext();

export const CameraContextProvider = ({ children }) => {
  const [cameraContext, setCameraContext] = useState(false);

  return (
    <CameraContext.Provider value={{ cameraContext, setCameraContext }}>
      {children}
    </CameraContext.Provider>
  );
};