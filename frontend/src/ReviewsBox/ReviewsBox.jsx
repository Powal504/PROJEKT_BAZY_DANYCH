import React, { useState, useEffect } from "react";
import styles from "./ReviewsBox.module.css";

function ReviewsBox() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  let zmienna = 12;

  // Funkcja pobierająca dane z API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5028/api/Reviews/2', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // Dodaj nagłówek autoryzacyjny
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setData(data);
      setLoading(false);
      console.log("Token:", token);
      console.log("Pobrane dane: ", data);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // useEffect, który wywołuje fetchData przy pierwszym renderze komponentu
  useEffect(() => {
    fetchData();
  }, []);

  return (

  <div className={styles.mainBox}>
    {/* Treść komponentu ReviewsBox */}
    <div className={styles.commentsContainer}>
      <div className={styles.comment}> 
      <button onClick={fetchData}>kliknij</button>
      <p>Nazwa użytkownika ocenił film na:</p>
      <img src = 'src/assets/avatar.png' alt="avatar" className={styles.avatar}></img>
      <p className={styles.comment_text}></p>
      </div>
      <div className={styles.comment}>Komentarz 2</div>
      <div className={styles.comment}>Komentarz 3</div>
      <div className={styles.comment}>Komentarz 4</div>
      <div className={styles.comment}>Komentarz 5</div>
      <div className={styles.comment}>Komentarz 6</div>
      {/* Możesz dodać więcej komentarzy tutaj */}
    </div>
  </div>
);
}

export default ReviewsBox;