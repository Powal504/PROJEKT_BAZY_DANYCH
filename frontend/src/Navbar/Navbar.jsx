import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const { isUserLogged, usernameGlobal, setIsUserLogged } = useContext(GlobalContext);
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    setIsUserLogged(0);
    localStorage.clear();
    isAuthenticated = !!token;
  };

  const isAuthenticated = !!token;

  return (
    <nav className={styles.navbar}> 
      <div>
        <Link to="/">
          <img src='src\assets\logo.png' alt="Moje zdjęcie" className={styles.logo}/>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.linkContainer}>
          {isAuthenticated === 1 && <Link to="Lists" className={styles.registerLink}>Stwórz listę</Link>}
          {!isAuthenticated && (
            <>
              <Link to="/registration" className={styles.registerLink}>Zarejestruj</Link>
              <Link to="login" className={styles.homeLink}>login</Link>
            </>
          )}
          <Link to="Films" className={styles.homeLink}>Film</Link>
          {isAuthenticated &&  <Link to="profile"><img src='src\assets\avatar.png' alt="Avatar" className={styles.avatar} /></Link>}
          {isAuthenticated && <p className={styles.nazwaUzytkownika}>{usernameGlobal}</p>}
          {isAuthenticated && <button className={styles.registerLink}  onClick={handleLogout}>Wyloguj się</button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;