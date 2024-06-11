import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Lists.module.css';
import { searchMoviesByTitle } from '../services/apiService'; // Importujemy funkcję wyszukującą filmy

function Search() {
    const [searchedMovies, setSearchedMovies] = useState([]); // Stan przechowujący znalezione filmy
    const [searchTerm, setSearchTerm] = useState(""); // Stan przechowujący wyszukiwany termin

    useEffect(() => {
        // W momencie zmiany searchTerm, wyszukujemy filmy i ustawiamy je w stanie searchedMovies
        const searchMovies = async () => {
            try {
                const foundMovies = await searchMoviesByTitle(searchTerm);
                setSearchedMovies(foundMovies);
            } catch (error) {
                console.error("There was a problem searching movies:", error);
            }
        };

        searchMovies();
    }, [searchTerm]); // useEffect wywoływany jest za każdym razem, gdy zmienia się searchTerm

    return (
        <> 
            <p className={styles.Add}>Znalezione filmy: </p>
            <div className={styles.lists}>
                {/* Mapujemy znalezione filmy i wyświetlamy je */}
                {searchedMovies.map((movie) => (
                    <div key={movie.id} className={styles.movieLink}>
                        <p className={styles.movieTitle}>{movie.title}</p>
                        {movie.imageUrl && <img src={movie.imageUrl} alt={movie.title} className={styles.movieImage} />}
                    </div>
                ))}
            </div>
        </>
    );
}

export default Search;