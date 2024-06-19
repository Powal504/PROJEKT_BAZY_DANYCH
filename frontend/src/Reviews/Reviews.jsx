import React, { useState, useEffect } from "react";
import styles from "./Reviews.module.css";

function Reviews({ movie_id }) {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);
    const token = localStorage.getItem('token')?.replace(/["']/g, '');
    const [loading, setLoading] = useState(true);

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            alert("Zaloguj się!");
            return;
        }

        if (rating === 0) {
            alert("Wybierz ocenę!");
            return;
        }

        try {
            const reviewData = {
                review_text: description,
                review_mark: rating,
                movie_id: movie_id,
                review_date: "",
                userId: "c5966b04-e408-42a9-8a0e-c92da120bdea"  // przykładowe
            };

            const response = await fetch("http://157.230.113.110:5028/api/Reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(reviewData)
            });

            if (response.ok) {
                setError("");
                setAddSuccess(true);
                setDescription(""); 
                setRating(0);
                console.log("Recenzja dodana!");
            } else {
                const errorText = await response.text();
                setError(`Wystąpił błąd podczas dodawania recenzji: ${errorText}`);
                console.error(`Error: ${response.status} ${response.statusText}`);
                setLoading(false);
            }
            
        } catch(error) {
            console.error("Wystąpił problem z dodaniem recenzji!", error.message);
            setError("Wystąpił problem z dodaniem recenzji!");
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!token) {
            setError("Zaloguj się, aby dodać recenzję.");
        }
    }, [token]);

    return (
        <div className={styles.container_reviews}>
            <div className={styles.header}>Dodaj ocenę!</div>
            <div className={styles.stars}>
                {[...Array(5)].map((_, index) => (
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
                disabled={!token} // Wyłączone pole, jeśli brak tokenu
                placeholder={!token ? "Musisz być zalogowany, aby dodać recenzję" : "Napisz swoją recenzję..."}
            />
            <button onClick={handleSubmit} disabled={!token || rating === 0}>Dodaj recenzję!</button>
            {addSuccess && <p className={styles.message}>Recenzja została dodana pomyślnie!</p>}
            {error && <p className={styles.error_message}>{error}</p>}
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
