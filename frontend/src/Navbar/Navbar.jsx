import React, { useContext } from 'react';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const { isUserLogged, usernameGlobal } = useContext(GlobalContext);

  return (
    <nav className={styles.navbar}> 
      <div>
        <Link to="/">
          <img src='src\assets\logo.png' alt="Moje zdjęcie" className={styles.logo}/>
        </Link>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.linkContainer}>
          {isUserLogged === 1 && <Link to="Lists" className={styles.homeLink}>Stwórz listę</Link>}
          {!isUserLogged && (
            <>
              <Link to="/registration" className={styles.registerLink}>Zarejestruj</Link>
              <Link to="login" className={styles.homeLink}>login</Link>
            </>
          )}
          <Link to="Films" className={styles.homeLink}>Film</Link>
          {isUserLogged === 1 && <p className={styles.nazwaUzytkownika}>{usernameGlobal}</p>}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;