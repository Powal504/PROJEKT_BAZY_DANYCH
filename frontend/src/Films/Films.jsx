import React, { useState, useEffect } from "react";
import styles from "./Films.module.css";
import Reviews from "../Reviews/Reviews";
import ReviewsBox from "../ReviewsBox/ReviewsBox";
import { useLocation } from "react-router-dom";

function Films() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    
    // Użycie useLocation do otrzymania movie_id
    const location = useLocation();
    const { movie_id } = location.state || {}; // Pobieranie movie_id z state

    const fetchMovie = async () => {
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch(`http://157.230.113.110:5028/api/Movies/${movie_id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const movieData = await response.json();
            setMovie(movieData);
            setLoading(false);
            console.log("Pobrany film:", movieData);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (movie_id) {
            fetchMovie();
        }
    }, [movie_id]);

    useEffect(() => {
        console.log("Aktualne movie_id:", movie_id);
    }, [movie_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.container}>
                <img src={movie.avatar || 'https://via.placeholder.com/150'} alt="Poster" style={{width:"200px", height:"auto", minHeight:"300px"}}/>
                <div className={styles.content}>
                    <p className={styles.description}>
                        {movie.description}
                    </p>
                    <div className={styles.reviews_component}>
                        <Reviews movie_id={movie_id} /> {/* Przekazywanie movie_id jako prop */}
                    </div>
                </div>
                <div className={styles.Comments}></div>
            </div>
            <div className={styles.reviewBox_container}>
                <ReviewsBox movie_id={movie_id} /> {/* Przekazywanie movie_id jako prop */}
            </div>
        </div>
    );
}

export default Films;
