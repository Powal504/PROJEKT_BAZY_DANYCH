import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(0);
  const [usernameGlobal, setUsernameGlobal] = useState("");
  const [movieNameGlobal, setMovieNameGlobal] = useState("");
  const [movieIdGlobal, setMovieIdGlobal] = useState(null);
  const [currentReviewIdGlobal, setCurrentReviewIdGlobal] = useState("");

  return (
    <GlobalContext.Provider value={{ isUserLogged, setIsUserLogged, usernameGlobal, setUsernameGlobal,  movieNameGlobal, setMovieNameGlobal, currentReviewIdGlobal, setCurrentReviewIdGlobal}}>
      {children}
    </GlobalContext.Provider>
  );
};
