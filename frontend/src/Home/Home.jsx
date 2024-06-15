import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css'; // Предполагается, что в этом файле заданы стили для компонента
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
  const [category, setCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { setMovieNameGlobal } = useContext(GlobalContext);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch('http://157.230.113.110:5028/api/Movies');
        const moviesData = await response.json();
        setMovies(moviesData);
        setSearchResults(moviesData); // Set search results initially to all movies
        setLoading(false);
      } catch (error) {
        setError("Error fetching movies.");
        setLoading(false);
      }
    };

    const getCatalogs = async () => {
      try {
        // Assuming fetchUserCatalogs() is a function that fetches catalogs
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
    if (!searchTerm.trim()) {
      setSearchResults(movies);
    } else {
      const filteredMovies = movies.filter((movie) => {
        const titleMatch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
        const categoryMatch = category ? movie.categories.includes(category) : true;
        return titleMatch && categoryMatch;
      });
      setSearchResults(filteredMovies);
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
          <Link to="/search" className={styles.searchButton} onClick={handleSearch}>
            <div className={styles.searchIcon}>
              <FontAwesomeIcon icon={faSearch}  />
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.home}>
        <p>Wszystkie filmy</p>
        <div className="row">
          {searchResults.map((movie) => (
            <div className="col-md-4 mb-4" key={movie.movie_id}>
              <div className="card h-100 w-5">
              <Link to={{
                pathname: "/Films",
                  state: { movie_id: movie.movie_id }
                }}>
                 <img
                    className="card-img-top"
                    src={movie.avatar || 'https://via.placeholder.com/150'}
                    alt={movie.title}
                   style={{ objectFit: 'contain', height: '286px' }}
                />
              </Link>

                <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  <h5 className="card-title" style={{ fontSize: '2rem' }}>{movie.title}</h5>
                  <p className="card-text" style={{ fontSize: '1rem' }}></p>
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
