import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import { fetchMoviesWithImages } from '../services/apiService';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <div className={styles.sas}>
        <p className={styles.wyszukaj}>Wyszukaj</p>
        <input type="text" id="form12" className="form-control" />
        <label className="form-label" htmlFor="form12">Example label</label>
      </div>
      <div className={styles.home}>
        <p>Witamy w świecie filmów</p>
        <p>Top of the top</p>

        <div className={styles.categories}>
          {movies.map((movie) => (
            <div key={movie.movie_id} className={styles.movieItem}>
              <p>{movie.title}</p>
              {movie.imageUrl ? (
                <img src={movie.imageUrl} alt={movie.title} />
              ) : (
                <p>No image available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;