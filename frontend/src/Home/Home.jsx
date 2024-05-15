import styles from './Home.module.css';
import React from 'react';
import { Link } from 'react-router-dom'; 


function Home() {
  return (
    <div className={styles.home}> 
      <p>Witamy w świecie filmów</p>
      <p>Top of the top</p>
    

      <div className={styles.categories}>
      
      <img src='src\assets\fifa12.jpg' alt="Moje zdjęcie" />
      <img src='src\assets\fifa13.jpg' alt="Moje zdjęcie" />
      <img src='src\assets\fifa14.jpeg' alt="Moje zdjęcie" />
      <img src='src\assets\fifa15.jpg' alt="Moje zdjęcie" />
      <img src='src\assets\maska.jpg' alt="Moje zdjęcie" />
      <img src='src\assets\fifa16.jpg' alt="Moje zdjęcie" />


      </div>
    </div>
  );
}

export default Home;