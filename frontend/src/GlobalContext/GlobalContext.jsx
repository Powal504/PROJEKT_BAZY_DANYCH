// GlobalContext.js

import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(0); // 0 - niezalogowany, 1 - zalogowany
  const [usernameGlobal, setUsernameGlobal] = useState("");
  const [movieNameGlobal, setMovieNameGlobal] = useState("");
  const [movieIdGlobal, setMovieIdGlobal] = useState(null);

  return (
    <GlobalContext.Provider value={{ isUserLogged, setIsUserLogged, usernameGlobal, setUsernameGlobal,  movieNameGlobal, setMovieNameGlobal}}>
      {children}
    </GlobalContext.Provider>
  );
};
