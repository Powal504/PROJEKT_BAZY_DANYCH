import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
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
  const [searchResults, setSearchResults] = useState([]);
  const { setMovieNameGlobal } = useContext(GlobalContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesResponse = await fetchMovies();
        const catalogsResponse = await fetchCatalogs();

        setMovies(moviesResponse);
        setSearchResults(moviesResponse); // Set search results initially to all movies
        setCatalogs(catalogsResponse);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://157.230.113.110:5028/api/Movies');
      if (!response.ok) {
        throw new Error('Error fetching movies');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  };

  const fetchCatalogs = async () => {
    try {
      const response = await fetch('http://157.230.113.110:5028/api/catalogs/AllCatalogs');
      if (!response.ok) {
        throw new Error('Error fetching catalogs');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      throw error;
    }
  };

  const fetchMoviesByTitle = async (title) => {
    try {
      const response = await fetch(`http://157.230.113.110:5028/api/Movies/searchTitle/${title}`);
      if (!response.ok) {
        throw new Error('Error fetching search results');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching search results:', error);
      throw error;
    }
  };

  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        setSearchResults(movies); // Show all movies if search term is empty
      } else {
        const results = await fetchMoviesByTitle(searchTerm); // Fetch movies by title from the backend
        setSearchResults(results);
      }
    } catch (error) {
      setError("Error fetching search results.");
    }
  };

  const handleGlobalName = (movieTitle) => {
    setMovieNameGlobal(movieTitle);
    console.log("Nazwa filmu globalnie ustawiona na:", movieTitle);
  };

  const categories = [...new Set(movies.map((movie) => movie.categories).flat())];

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
          <button className={styles.searchButton} onClick={handleSearch}>
            <div className={styles.searchIcon}>
              <FontAwesomeIcon icon={faSearch} />
            </div>
          </button>
        </div>
      </div>

      <div className={styles.home}>
        <p>Wszystkie filmy</p>
        <div className="row">
          {searchResults.map((movie) => (
            <div className="col-md-4 mb-4 px-5" key={movie.movie_id}>
              <div className="card h-100 w-5">
                <Link
                  to={{
                    pathname: "/Films",
                    state: { movie_id: movie.movie_id, title: movie.title }
                  }}
                  onClick={() => handleGlobalName(movie.title)}
                >
                  <img
                    className="card-img-top"
                    src={movie.avatar || 'https://via.placeholder.com/150'}
                    alt={movie.title}
                    style={{ objectFit: 'contain', height: '286px' }}
                  />
                </Link>

                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <h5 className="card-title" style={{ fontSize: '2rem' }}>{movie.title}</h5>
                  <p className="card-text" style={{ fontSize: '1rem' }}> {movie.mov} </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p>Katalogi filmów</p>
        <div className="row">
          {catalogs.map((catalog) => (
            <div className="col-md-4 mb-4 px-5" key={catalog.movie_catalog_id}>
              <div className="card h-100 w-5">
                <div className="card-body">
                  <h5 className="card-title" style={{ fontSize: '2rem' }}>{catalog.catalog_name}</h5>
                  <ul className="card-text" style={{ fontSize: '1rem' }}>
                    {catalog.movieMovieCatalogs.map((movieCatalog) => {
                      const movie = movies.find(m => m.movie_id === movieCatalog.movie_id);
                      return (
                        <li key={movieCatalog.movie_id}>
                          {movie ? (
                            <Link
                              to={{
                                pathname: "/Films",
                                state: { movie_id: movie.movie_id, title: movie.title }
                              }}
                              onClick={() => handleGlobalName(movie.title)}
                            >
                              {movie.title}
                            </Link>
                          ) : (
                            'Unknown Movie'
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;