import React, { useContext, useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import Lists from '../Lists/Lists';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';

function Profile({ showBackground }) {
    const { isUserLogged, usernameGlobal, setMovieNameGlobal } = useContext(GlobalContext);
    const [userData, setUserData] = useState(null);
    const [userCatalogs, setUserCatalogs] = useState([]);
    const [movies, setMovies] = useState([]); // State to store all movies
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCatalogName, setNewCatalogName] = useState('');
    const [newMovieTitle, setNewMovieTitle] = useState('');
    const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/userinfo/All', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const user = data.find(user => user.userName === usernameGlobal);
            if (!user) {
                throw new Error('User not found');
            }
            setUserData(user);
        } catch (error) {
            setError(error.message);
        }
    };

    const fetchUserCatalogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/catalogs/UserCatalogs', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const catalogs = await response.json();
            setUserCatalogs(catalogs);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://157.230.113.110:5028/api/Movies');
            const moviesData = await response.json();
            setMovies(moviesData);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };
    const handleAddToCatalog = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/catalogs/AddToCatalog', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ catalog_name: newCatalogName, title: newMovieTitle })
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
    
            // Update the catalogs after adding a new movie
            fetchUserCatalogs();
        } catch (error) {
            setError(error.message);
        }
    };
    const handleRemoveFromCatalog = async (catalogName, movieTitle) => {
        const confirm = window.confirm(`Are you sure you want to remove ${movieTitle} from ${catalogName}?`);
        if (!confirm) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/catalogs/RemoveFromCatalog', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ catalog_name: catalogName, title: movieTitle })
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
    
            // Update the catalogs after removing a movie
            fetchUserCatalogs();
        } catch (error) {
            setError(error.message);
        }
    };
    const handleDeleteCatalog = async (catalogName) => {
        const confirm = window.confirm(`Are you sure you want to delete the catalog ${catalogName}?`);
        if (!confirm) return;
    
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/catalogs/RemoveCatalog', {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ catalog_name: catalogName })
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
    
            setUserCatalogs(prevCatalogs => prevCatalogs.filter(catalog => catalog.catalog_name !== catalogName));
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (isUserLogged === 1) {
            fetchUserData();
            fetchUserCatalogs();
            fetchMovies();
        }
    }, [isUserLogged]);

    const handleGlobalName = (movieTitle) => {
        setMovieNameGlobal(movieTitle);
        console.log("Nazwa filmu globalnie ustawiona na:", movieTitle);
    };

    return (
        <section className={styles.background}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src='src/assets/avatar.jpg' alt="avatar" className="rounded-circle img-fluid" style={{ width: '100px' }} />
                            <h5 className="my-3">
                                {isUserLogged === 1 && <p className={styles.nazwaUzytkownika}>{usernameGlobal}</p>}
                            </h5>
                            <div className="d-flex justify-content-center mb-2">
                                {/* Buttons or other content */}
                            </div>
                        </div>
                    </div>
                    <div className={`card mb-4 mb-lg-0 ${styles.cre}`}>
                        <Lists />
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5>Dodaj do katalogu</h5>
                            <div className="mb-3">
                                <label htmlFor="catalogName" className="form-label">Nazwa katalogu</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="catalogName" 
                                    value={newCatalogName}
                                    onChange={(e) => setNewCatalogName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="movieTitle" className="form-label">Tytuł filmu</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="movieTitle" 
                                    value={newMovieTitle}
                                    onChange={(e) => setNewMovieTitle(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary btn-purple" onClick={handleAddToCatalog}>Dodaj do katalogów</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            {loading && <p>Loading...</p>}
                            {error && <p>{error}</p>}
                            {userData && (
                                <>
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Nazwa</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className={`text-muted mb-0 ${styles.nazwaUzytkownika}`}>{userData.userName}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{userData.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Telefon</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{userData.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Data urodzenia</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{userData.birth_date}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5>Twoje katalogi</h5>
                            {userCatalogs.length > 0 ? (
                                userCatalogs.map((catalog) => (
                                    <div key={catalog.movie_catalog_id} className="card mb-2">
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{catalog.catalog_name}</h5>
                                                {catalog.movieMovieCatalogs && catalog.movieMovieCatalogs.length > 0 ? (
                                                    <ul>
                                                        {catalog.movieMovieCatalogs.map((movie) => {
                                                            const movieDetails = movies.find(m => m.movie_id === movie.movie_id);
                                                            return (
                                                                <li key={movie.movie_id} className="d-flex justify-content-between align-items-center">
                                                                    <Link
                                                                        to={{
                                                                            pathname: "/Films",
                                                                            state: { movie_id: movie.movie_id, title: movieDetails?.title }
                                                                        }}
                                                                        onClick={() => handleGlobalName(movieDetails?.title)}
                                                                    >
                                                                        {movieDetails?.title || 'Unknown Movie'}
                                                                    </Link>
                                                                    <div className={styles.remove}>
                                                                        <button className="btn btn-danger btn-sm" onClick={() => handleRemoveFromCatalog(catalog.catalog_name, movieDetails?.title)}>X</button>
                                                                    </div> 
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                ) : (
                                                    <p>No movies in this catalog.</p>
                                                )}
                                            </div>
                                            <button className="btn btn-danger" onClick={() => handleDeleteCatalog(catalog.catalog_name)}>x</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>NIe ma katalogów.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;