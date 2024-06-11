import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMoviesWithImages } from '../services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; // Importujemy Link z React Router

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Zmienna globalna przechowująca wartość wyszukiwania

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMoviesWithImages();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError("");
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  const handleSearch = () => {
    // Tutaj możesz dodać logikę wyszukiwania, np. przekierowanie do nowej ścieżki zawierającej wyszukiwany termin
    console.log("Searched for:", searchTerm);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className={styles.searchContainer}>
        <div className="input-group">
          <input
            type="search"
            className={`form-control ${styles.searchInput}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link to={`/search/${searchTerm}`} className={styles.searchButton} onClick={handleSearch}>
            <div className={styles.searchIcon}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.home}>
        <p>Top of the top</p>
        <div className={styles.categories}>
          {movies.map((movie) => (
            <div key={movie.movie_id} className={styles.movieItem}>
              <p className={styles.name}>{movie.title}</p>
              <img src='src\assets\maska.jpg' alt="maska" className={styles.avatar} />
            </div>
          ))}
        </div>
        <p>katalogi:</p>
      </div>
    </>
  );
}

export default Home;