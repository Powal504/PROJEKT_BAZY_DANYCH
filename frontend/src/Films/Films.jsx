import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Films.module.css";
import Reviews from "../Reviews/Reviews";
import ReviewsBox from "../ReviewsBox/ReviewsBox";

function Films() {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [movieAll, setMovieAll] = useState(null);

    const location = useLocation();
    const { movie_id } = location.state || {};
    const { title } = location.state || {};

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
            console.log("tytuł: ", title)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    const fetchMovieAll = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://157.230.113.110:5028/api/Movies/searchTitle/${title}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const movieDataAll = await response.json();
            setMovieAll(movieDataAll);
            setLoading(false);
            console.log("Dane filmu:", movieDataAll);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (movie_id) {
            fetchMovie();
        }
        if (title) {
            fetchMovieAll();
        }
    }, [movie_id, title]);

    if (loading) {
        return <div>Ładowanie...</div>;
    }

    if (error) {
        return <div>Błąd: {error}</div>;
    }

    return (
        <div>
            <h1 className={styles.title}>{movie.title}</h1>
            <div className={styles.container}>
                <img src={movie.avatar || 'https://via.placeholder.com/150'} alt="Plakat" style={{ width:"200px", height:"auto", minHeight:"300px" }}/>
                <div className={styles.content}>
                    <p className={styles.description}>
                        {movie.description}
                    </p>
                    <div className={styles.reviews_component}>
                        <Reviews movie_id={movie_id} />
                    </div>
                </div>
                <div className={styles.comments}></div>
            </div>
            <div className={styles.reviewBox_container}>
                <ReviewsBox movie_id={movie_id} />
            </div>
        </div>
    );
}

export default Films;
