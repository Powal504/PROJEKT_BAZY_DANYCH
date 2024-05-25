    import React, { useState } from "react";
    import styles from "./Reviews.module.css";

    function Reviews() {
        const [rating, setRating] = useState(0);
        const [description, setDescription] = useState("");

        const [error, setError] = useState("");
        const [addSuccess, setAddSuccess] = useState(false);

        function handleDescription(event){
            setDescription(event.target.value)
            //console.log(description)
            //console.log(rating)
        }

        const handleStarClick = (starIndex) => {
            setRating(starIndex + 1);
        };

        return (
            <div className={styles.container_reviews}>
                <div className={styles.header}>Dodaj ocenę!</div>
                <div className={styles.stars}>
                    {[...Array(6)].map((_, index) => (
                        <Star
                            key={index}
                            filled={index < rating}
                            onClick={() => handleStarClick(index)}
                        />
                    ))}
                </div>
                <textarea type='text' className={styles.text_component} value={description} onChange={handleDescription}></textarea>
                <button>Dodaj recenzję!</button>
            </div>
        );
    }

    const Star = ({ filled, onClick }) => {
        return (
            <span className={filled ? styles.starFilled : styles.star} onClick={onClick}>
                &#9733;
            </span>
        );
    };

    export default Reviews;
