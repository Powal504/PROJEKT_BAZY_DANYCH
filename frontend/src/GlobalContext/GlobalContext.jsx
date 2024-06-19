import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(0); // 0 - niezalogowany, 1 - zalogowany
  const [usernameGlobal, setUsernameGlobal] = useState("");
  const [movieNameGlobal, setMovieNameGlobal] = useState("");
  const [movieIdGlobal, setMovieIdGlobal] = useState(null);
  const [currentReviewIdGlobal, setCurrentReviewIdGlobal] = useState("");
  const [userRole, setUserRole] = useState(""); // Dodaj stan dla roli użytkownika

  return (
    <GlobalContext.Provider value={{ isUserLogged, setIsUserLogged, usernameGlobal, setUsernameGlobal,  movieNameGlobal, setMovieNameGlobal, currentReviewIdGlobal, setCurrentReviewIdGlobal, userRole, setUserRole}}>
      {children}
    </GlobalContext.Provider>
  );
};