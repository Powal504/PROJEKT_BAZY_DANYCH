import React, { useState, useEffect } from "react";
import styles from './Lists.module.css';
import { fetchMovies } from '../services/apiService'; // Import the fetchMovies function

const Lists = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [catalogName, setCatalogName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch('http://157.230.113.110:5028/api/Movies');
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError("Error fetching movies.");
      }
    };

    fetchMoviesData();
  }, []);

  const handleCheckboxChange = (movieId) => {
    const updatedSelectedMovies = selectedMovies.includes(movieId)
      ? selectedMovies.filter(id => id !== movieId)
      : [...selectedMovies, movieId];

    setSelectedMovies(updatedSelectedMovies);
  };

  const handleCreateCatalog = async () => {
    setLoading(true);
    try {
      const url = 'http://157.230.113.110:5028/api/catalogs/CreateCatalog';
      const requestBody = {
        catalog_name: catalogName,
        addMovies: selectedMovies.map(movieId => String(movieId)) // Zamień ID filmów na stringi, jeśli potrzeba
      };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to create catalog');
      }

      setLoading(false);
      setCatalogName(""); 
      setSelectedMovies([]); 
      alert('Katalog został pomyślnie utworzony!'); 
    } catch (error) {
      console.error('Error creating catalog:', error);
      setError("Error creating catalog.");
      setLoading(false);
    }
  };

  return (
    <>
      <h4 className="mt-1 mb-5 pb-1">Stwórz listę</h4>
      <input
        type="text"
        id="form2Example11"
        className="form-control"
        placeholder="Nazwa listy"
        value={catalogName}
        onChange={(e) => setCatalogName(e.target.value)}
      />
      <br />

      {catalogName && (
        <div className={styles.moviesList}>
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.movie_id}>
                <div className={`form-check ${styles.customPurpleCheckbox}`}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={movie.movie_id}
                    id={`movieCheckbox_${movie.movie_id}`}
                    checked={selectedMovies.includes(movie.movie_id)}
                    onChange={() => handleCheckboxChange(movie.movie_id)}
                  />
                  <label className="form-check-label" htmlFor={`movieCheckbox_${movie.movie_id}`}>
                    {movie.title}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <p>Brak dostępnych filmów.</p>
          )}
        </div>
      )}

      <div className={styles.buttoncenter}>
        <button
          className={`btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 ${styles.createbutton}`}
          onClick={handleCreateCatalog}
          disabled={loading || selectedMovies.length === 0 || !catalogName.trim()}
        >
          {loading ? 'Tworzenie...' : 'Stwórz listę'}
        </button>
        {error && <div className="text-danger">{error}</div>}
      </div>
    </>
  );
};

export default Lists;