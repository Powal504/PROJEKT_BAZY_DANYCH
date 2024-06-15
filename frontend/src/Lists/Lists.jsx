import React, { useState, useEffect } from "react";
import styles from './Lists.module.css';
import { fetchMovies } from '../services/apiService'; // Import the fetchMovies function

const Lists = () => {
  const [catalogName, setCatalogName] = useState("");
  const [error, setError] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [userCatalogs, setUserCatalogs] = useState([]);
  const [selectedCatalogId, setSelectedCatalogId] = useState(null);
  const [movies, setMovies] = useState([]);
  const token = localStorage.getItem('token')?.replace(/["']/g, '');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const catalogsResponse = await fetch('http://157.230.113.110:5028/api/catalogs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const moviesData = await fetchMovies(); // Assuming fetchMovies returns the array of movies

      if (catalogsResponse.ok && moviesData) {
        const catalogsData = await catalogsResponse.json();

        // Map through catalogsData and add a list of predefined movies for each new catalog
        const catalogsWithMovies = catalogsData.map(catalog => ({
          ...catalog,
          movies: catalog.addMovies || [] // Assuming addMovies is an array of movie titles
        }));

        setUserCatalogs(catalogsWithMovies);
        setMovies(moviesData);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data');
    }
  };

  const handleAddToCatalog = async (e) => {
    e.preventDefault();

    const data = {
      catalog_name: catalogName,
      addMovies: ["Avatar"] // Example of adding movies when creating a catalog
    };

    try {
      const response = await fetch('http://157.230.113.110:5028/api/catalogs/CreateCatalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setAddSuccess(true);
        setCatalogName("");
        fetchData(); // Refresh catalogs after addition
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to add catalog');
      }
    } catch (error) {
      console.error('Error adding catalog:', error);
      setError('Error adding catalog');
    }
  };

  const handleCatalogNameChange = (event) => {
    setCatalogName(event.target.value);
  };

  const toggleMovieList = (catalogId) => {
    setSelectedCatalogId(selectedCatalogId === catalogId ? null : catalogId);
  };

  const handleAddMovieToCatalog = (movieId) => {
    // Implement logic to add movie to catalog based on selectedCatalogId
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
        {userCatalogs.map((catalog) => (
          <div key={catalog.id} className={styles.catalogItem}>
            <p>{catalog.catalog_name}</p>
            <button onClick={() => toggleMovieList(catalog.id)}>Pokaż filmy</button>
            {selectedCatalogId === catalog.id && (
              <div>
                <p>Lista filmów:</p>
                <ul>
                  {catalog.movies.map((movieTitle, index) => (
                    <li key={index}>
                      <input type="checkbox" id={`movie_${index}`} />
                      <label htmlFor={`movie_${index}`}>{movieTitle}</label>
                      <button onClick={() => handleAddMovieToCatalog(movieTitle)}>Dodaj film</button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Lists;