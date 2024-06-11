import React, { useState } from "react";
import styles from "./Reviews.module.css";

function Reviews({ token }) {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const reviewData = {
                review_text: description,
                review_mark: rating
            };

            const response = await fetch("http://localhost:5028/api/Reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `${token}`
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                setError("");
                setAddSuccess(true);
                console.log("Recenzja dodana!");
            } else {
                setError("Wystąpił błąd podczas dodawania recenzji.");
            }
        } catch(error) {
            console.error("Wystąpił problem z dodaniem recenzji!", error.message);
            setError("Wystąpił problem z dodaniem recenzji!");
        }
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
            <textarea 
                type='text' 
                className={styles.text_component} 
                value={description} 
                onChange={handleDescription} 
            />
            <button onClick={handleSubmit}>Dodaj recenzję!</button>
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
