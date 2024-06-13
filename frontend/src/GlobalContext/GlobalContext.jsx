// GlobalContext.js

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(0); // 0 - niezalogowany, 1 - zalogowany
  const [usernameGlobal, setUsernameGlobal] = useState(""); // Dodajemy stan na nazwę użytkownika
  comst [movieNameGlobal]

  return (
    <GlobalContext.Provider value={{ isUserLogged, setIsUserLogged, usernameGlobal, setUsernameGlobal }}>
      {children}
    </GlobalContext.Provider>
  );
};


//Są tu zmienne globalne