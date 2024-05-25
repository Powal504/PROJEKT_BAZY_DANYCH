import styles from './Navbar.module.css';
import React from 'react';
import { Link } from 'react-router-dom'; 

function Navbar() {
  return (
    
    <nav className={styles.navbar}> 
      <Link to="/" ><img src='src\assets\logo.png' alt="Moje zdjęcie" className={styles.logo}/></Link>
      <div className={styles.linkContainer}>
        
        <Link to="Movie_Add" className={styles.homeLink}>Dodaj film</Link>
        <Link to="/registration" className={styles.registerLink}>Zarejestruj</Link>
        <Link to="login" className={styles.homeLink}>login</Link>
        <Link to="Films" className={styles.homeLink}>Film</Link>
        
      </div>
    </nav>
  );
}

export default Navbar;