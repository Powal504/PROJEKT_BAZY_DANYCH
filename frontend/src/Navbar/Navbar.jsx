import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const { isUserLogged, usernameGlobal, setIsUserLogged, userRole } = useContext(GlobalContext); // Pobierz userRole z kontekstu
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;

  const handleLogout = () => {
    setIsUserLogged(0);
    localStorage.clear();
  };

  return (
    <nav className={styles.navbar}> 
      <div>
        <Link to="/">
          <img src='src/assets/logo.png' alt="Moje zdjęcie" className={styles.logo}/>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.linkContainer}>
          
          {!isAuthenticated && (
            <>
              <Link to="/registration" className={styles.registerLink}>Zarejestruj</Link>
              <Link to="/login" className={styles.homeLink}>login</Link>
            </>
          )}
          
          {isAuthenticated && <Link to="/profile"><img src='src/assets/avatar.jpg' alt="Avatar" className={styles.avatar} /></Link>}
          {isAuthenticated && <p className={styles.nazwaUzytkownika}>{usernameGlobal}</p>}
          {isAuthenticated && userRole === 'Admin' && <Link to="/admin" className={styles.registerLink}>Admin</Link>} {/* Dodaj przycisk Admin */}
          {isAuthenticated && <button className={styles.registerLink} onClick={handleLogout}>Wyloguj się</button>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;