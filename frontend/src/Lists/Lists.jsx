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

  // Fetch movies on component mount
  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch('http://157.230.113.110:5028/api/Movies');
        if (!response.ok) {
          throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError("Error fetching movies.");
      }
    };

    fetchMoviesData();
  }, []);

  // Handle checkbox change for selecting movies
  const handleCheckboxChange = (movie) => {
    const updatedSelectedMovies = selectedMovies.includes(movie.title)
      ? selectedMovies.filter(title => title !== movie.title)
      : [...selectedMovies, movie.title];

    setSelectedMovies(updatedSelectedMovies);
  };

  // Handle catalog creation
  const handleCreateCatalog = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    const requestBody = {
      catalog_name: catalogName,
      addMovies: selectedMovies // Directly use selectedMovies which now contains movie titles
    };

    console.log("Request Body:", JSON.stringify(requestBody)); // Log the request body

    try {
      const url = 'http://157.230.113.110:5028/api/catalogs/CreateCatalog';
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.text(); // Use .text() to get raw response for logging
      console.log('Response Data:', responseData); // Log the raw response data

      if (!response.ok) {
        console.error('Error response:', responseData); // Log the error response from the server
        throw new Error('Failed to create catalog');
      }

      setLoading(false);
      setCatalogName(""); 
      setSelectedMovies([]); 
      alert('Catalog created successfully!'); 
    } catch (error) {
      console.error('Error creating catalog:', error);
      setError(error.message || "Error creating catalog.");
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
                    value={movie.title} 
                    id={`movieCheckbox_${movie.movie_id}`}
                    checked={selectedMovies.includes(movie.title)} 
                    onChange={() => handleCheckboxChange(movie)}
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