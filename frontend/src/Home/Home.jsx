import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMoviesWithImages, fetchUserCatalogs } from '../services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Home() {
  const [movies, setMovies] = useState([]);
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMoviesWithImages();
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        setError("Error fetching movies.");
        setLoading(false);
      }
    };

    const getCatalogs = async () => {
      try {
        const catalogsData = await fetchUserCatalogs();
        setCatalogs(catalogsData);
      } catch (error) {
        console.error('Error fetching catalogs:', error);
      }
    };

    getMovies();
    getCatalogs();
  }, []);

  const handleSearch = () => {
    console.log(searchTerm);
    if (!searchTerm.trim()) {
      getMovies();
    } else {
      // Handle search functionality
    }
  };

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
          <Link to="/search" className={styles.searchButton} onClick={handleSearch}>
            <div className={styles.searchIcon}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.home}>
        <p>Wszystkie filmy</p>
        <div className={styles.categories}>
          {movies.map((movie) => (
            <div key={movie.movie_id} className={styles.movieItem}>
              <p className={styles.name}>{movie.title}</p>
              <img src='src/assets/maska.jpg' alt="maska" className={styles.avatar} />
            </div>
          ))}
        </div>
        <p className={styles.katalogs}>Katalogi:</p>
        <div className={styles.catalogsContainer}>
          {catalogs.map((catalog) => (
            <div key={catalog.id} className={styles.catalogItem}>
              <p className={styles.catalogTitle}>{catalog.catalog_name}</p>
              <ul>
                {catalog.movies?.map((movieId) => {
                  const movie = movies.find((m) => m.id === movieId);
                  return (
                    <li key={movieId}>
                      {movie ? movie.title : "Unknown"}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;