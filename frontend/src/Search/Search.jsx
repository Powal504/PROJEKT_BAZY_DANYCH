import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from './search.module.css';
import { searchMoviesByTitle } from '../services/apiService'; // Importuj funkcję do wyszukiwania filmów

function Search() {
    const [searchedMovies, setSearchedMovies] = useState([]); // Stan przechowujący znalezione filmy
    const [searchTerm, setSearchTerm] = useState(""); // Stan przechowujący wyszukiwany termin

    useEffect(() => {
        const searchMovies = async () => {
            try {
                if (searchTerm.trim() !== "") { // Upewnij się, że searchTerm nie jest pusty
                    const foundMovies = await searchMoviesByTitle(searchTerm);
                    setSearchedMovies(foundMovies);
                } else {
                    setSearchedMovies([]); // Wyczyść searchedMovies, jeśli searchTerm jest pusty
                }
            } catch (error) {
                console.error("Wystąpił problem podczas wyszukiwania filmów:", error);
            }
        };

        searchMovies();
    }, [searchTerm]); 

    return (
        <div className={styles.searchResults}>
            <h2>Znalezione filmy:</h2>
            <ul>
                {searchedMovies.map((movie) => (
                    <li key={movie.id}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search;