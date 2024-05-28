import styles from './Navbar.module.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import { Link } from 'react-router-dom';
function Navbar() {

  const { isUserLogged } = useContext(GlobalContext);

  return (
    
    <nav className={styles.navbar}> 
      <Link to="/" ><img src='src\assets\logo.png' alt="Moje zdjęcie" className={styles.logo}/></Link>
      <div className={styles.linkContainer}>
        <Link to="Movie_Add" className={styles.homeLink}>Dodaj film</Link>
        <Link to="/registration" className={styles.registerLink}>Zarejestruj</Link>
        <Link to="login" className={styles.homeLink}>login</Link>
        <Link to="Films" className={styles.homeLink}>Film</Link>
        {isUserLogged === 1 && <img src='src\assets\avatar.png' alt="Avatar" className={styles.avatar} />}
        
      </div>
    </nav>
  );
}

export default Navbar;