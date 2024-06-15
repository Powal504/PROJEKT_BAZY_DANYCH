import React, { useState, useEffect } from "react";
import styles from "./Reviews.module.css";
import ReviewsBox from "../ReviewsBox/ReviewsBox";

function Reviews({ movie_id }) {
    const [rating, setRating] = useState(0);
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);
    const token = localStorage.getItem('token')?.replace(/["']/g, ''); // Usunięcie cudzysłowów
    const review_date = new Date().toISOString();  // Aktualna data w formacie ISO
    const date = "";

    const [user, setUser] = useState([]);
    const [loadingFetch, setLoadingFetch] = useState(true);
    const [errorFetch, setErrorFetch] = useState(null);

    const handleDescription = (event) => {
        setDescription(event.target.value);
    };

    const handleStarClick = (starIndex) => {
        setRating(starIndex + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Token:", token);

        try {
            const reviewData = {
                review_text: description,
                review_mark: rating,
                movie_id: movie_id,
                review_date: date,
                userId: "c5966b04-e408-42a9-8a0e-c92da120bdea"
            };

            console.log("Wysyłane dane:", reviewData);

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
                console.log("Recenzja dodana!");
            } else {
                const errorText = await response.text();
                setError(`Wystąpił błąd podczas dodawania recenzji: ${errorText}`);
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch(error) {
            console.error("Wystąpił problem z dodaniem recenzji!", error.message);
            setError("Wystąpił problem z dodaniem recenzji!");
        }
    };

    const fetchData = async () => {
        try {
            const token = localStorage.getItem('token')
            
            const response = await fetch ('http://157.230.113.110:5028/api/userinfo/All',{
                methode: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Dodaj nagłówek autoryzacyjny
                  }
            });

            if(!response.ok){
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setUser(data);
            setLoadingFetch(false);
            console.log('uzytkownicy: ', data);
        }
        catch (error) {
            setError(error.message);
            setLoading(false);
          }
    }

      useEffect(() => {
    fetchData();
  }, []);

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
