import React, { useState, useEffect } from "react";
import styles from './Lists.module.css';
import { fetchMovies } from '../services/apiService'; // Import the fetchMovies function

const Lists = () => {
  const [catalogName, setCatalogName] = useState(""); // State to manage the catalog name
  const [error, setError] = useState(""); // State to manage errors
  const [addSuccess, setAddSuccess] = useState(false); // State to manage success message
  const [userCatalogs, setUserCatalogs] = useState([]); // State to manage user's catalogs
  const [selectedCatalogId, setSelectedCatalogId] = useState(null); // State to manage selected catalog ID for each list
  const [movies, setMovies] = useState([]); // State to manage movies
  const token = localStorage.getItem('token')?.replace(/["']/g, '');

  // Fetch user's catalogs and movies from the server
  const fetchData = async () => {
    try {
      const catalogsResponse = await fetch('http://localhost:5028/api/catalogs', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }
      });

      const moviesResponse = await fetchMovies();

      if (catalogsResponse.ok && moviesResponse) {
        const catalogsData = await catalogsResponse.json();
        const moviesData = moviesResponse;
        setUserCatalogs(catalogsData);
        setMovies(moviesData);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to handle adding catalogs
  const handleAddToCatalog = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const data = {
      catalog_name: catalogName
    };

    try {
      const response = await fetch('http://localhost:5028/api/catalogs/CreateCatalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setAddSuccess(true);
        setCatalogName(""); // Clear input field after successful addition
        console.log('Catalog added successfully');
        // Reload user's catalogs after successful addition
        fetchData();
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to add catalog');
      }
    } catch (error) {
      console.error('Error adding catalog:', error);
      setError('Error adding catalog');
    }
  };

  // Function to handle catalog name change
  const handleCatalogNameChange = (event) => {
    setCatalogName(event.target.value);
  };

  // Function to toggle movie list visibility for a specific catalog
  const toggleMovieList = (catalogId) => {
    setSelectedCatalogId(catalogId === selectedCatalogId ? null : catalogId);
  };

  // Function to handle adding movies to a catalog
  const handleAddMovieToCatalog = (movieId) => {
    // Logic to add movie to the catalog goes here
    console.log(`Movie ${movieId} added to catalog ${selectedCatalogId}`);
  };

  return (
    <div className={styles.lists}>
      <p className={styles.add}>Stwórz listy:</p>
      <form onSubmit={handleAddToCatalog}>
        <p>Nazwa listy</p>
        <input
          className={styles.listNameInput}
          value={catalogName}
          onChange={handleCatalogNameChange}
        />
        <button type="submit" disabled={!catalogName.trim()}>Dodaj katalog</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {addSuccess && <p className={styles.success}>Katalog dodany pomyślnie!</p>}
      <p>Twoje katalogi:</p>
      <div className={styles.catalogsContainer}>
        {userCatalogs.map((catalog, index) => (
          <div key={index} className={styles.catalogItem}>
            <p>{catalog.catalog_name}</p>
            <button onClick={() => toggleMovieList(catalog.id)}>Pokaż filmy</button>
            {selectedCatalogId === catalog.id && (
              <div>
                <p>Lista filmów:</p>
                <ul>
                  {movies.map((movie, index) => (
                    <li key={movie.id}>
                      <input type="checkbox" id={`movie_${index}`} />
                      <label htmlFor={`movie_${index}`}>{movie.title}</label>
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleAddMovieToCatalog(movie.id)}>Dodaj film</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Lists;