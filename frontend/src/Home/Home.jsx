import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMovies } from '../services/apiService';
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const moviesData = await fetchMovies();
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
    <div className={styles.home}> 
      <p>Witamy w świecie filmów</p>
      <p>Top of the top</p>
      
      <div className={styles.categories}>
        {movies.map((movie) => (
          <div key={movie.movie_id} className={styles.movieItem}>
            <img src={movie.avatar} alt={movie.title} />
            <p>{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;