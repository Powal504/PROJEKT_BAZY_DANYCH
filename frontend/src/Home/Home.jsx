import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMoviesWithImages } from '../services/apiService';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Home() {
  const [movies, setMovies] = useState([]);
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

    getMovies();
  }, []);

  const handleSearch = () => {
    console.log(searchTerm);
    // If search term is empty, show all movies
    if (!searchTerm.trim()) {
      // Fetch all movies again
      getMovies();
    } else {
      // Handle search functionality
      // Maybe update the state or navigate to a search page
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
        <p>Top of the top</p>
        <div className={styles.categories}>
          {movies.map((movie) => (
            <div key={movie.movie_id} className={styles.movieItem}>
              <p className={styles.name}>{movie.title}</p>
              <img src='src\assets\maska.jpg' alt="maska" className={styles.avatar} />
            </div>
          ))}
        </div>
        <p>katalogi: </p>
      </div>
    </>
  );
}

export default Home;