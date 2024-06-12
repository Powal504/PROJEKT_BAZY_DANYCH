import React from "react";
import styles from "./ReviewsBox.module.css";

function ReviewsBox() { return (
  <div className={styles.mainBox}>
    {/* Treść komponentu ReviewsBox */}
    <div className={styles.commentsContainer}>
      {/* Dodaj komentarze tutaj */}
      <div className={styles.comment}>Komentarz 1</div>
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