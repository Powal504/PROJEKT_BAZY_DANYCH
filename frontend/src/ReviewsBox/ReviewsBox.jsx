import React, { useState, useEffect } from "react";
import styles from "./ReviewsBox.module.css";

function ReviewsBox() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Funkcja pobierająca recenzje z API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await fetch('http://localhost:5028/api/Reviews/movie/2', {
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
      setReviews(data); // Ustawiamy pobrane recenzje
      setLoading(false);
      console.log("Token:", token);
      console.log("Pobrane recenzje: ", data);
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
      <div className={styles.commentsContainer}>
        {loading && <p>Ładowanie...</p>}
        {error && <p>Błąd: {error}</p>}
        {!loading && !error && reviews.length === 0 && <p>Brak recenzji do wyświetlenia.</p>}
        {!loading && !error && reviews.map((review, index) => (
          <div key={index} className={styles.comment}>
            <p>Użytkownik ocenił film na: {review.review_mark}</p>
            <img src='src/assets/avatar.png' alt="avatar" className={styles.avatar}></img>
            <div className={styles.comment_text}>{review.review_text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsBox;
