import styles from './Home.module.css';
import React from 'react';
import { Link } from 'react-router-dom'; 

function Home() {
  return (
    <div className={styles.home}> 
      <p>Strona główna</p>
      <Link to="/registration" > <div className={styles.registerLink}>Registration </div> </Link>
    </div>
  );
}

export default Home;