// GlobalContext.js
import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);

  return (
    <GlobalContext.Provider value={{ isUserLogged, setIsUserLogged }}>
      {children}
    </GlobalContext.Provider>
  );
};
