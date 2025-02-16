// src/context/GlobalContext.js
import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const GlobalProvider = ({ children }) => {
  const [objectId, setObjectId] = useState(null);

  const setObjectIdHandler = (id) => {
    setObjectId(id);
  };

  return (
    <GlobalContext.Provider value={{ objectId, setObjectIdHandler }}>
      {children}
    </GlobalContext.Provider>
  );
};
