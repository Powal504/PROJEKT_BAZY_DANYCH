import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMoviesWithImages } from '../services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMoviesWithImages();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movies");
        setLoading(false);
      }
    };

    getMovies();
  }, []);

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
          <input type="search" className={`form-control ${styles.searchInput}`} />
          <button type="button" className={styles.searchButton}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
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