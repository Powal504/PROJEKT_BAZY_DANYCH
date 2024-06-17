import React, { useContext, useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import Lists from '../Lists/Lists';
import { Link } from 'react-router-dom';

function Profile({ showBackground }) {
    const { isUserLogged, usernameGlobal } = useContext(GlobalContext);
    const [userData, setUserData] = useState(null);
    const [userCatalogs, setUserCatalogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        }
        setLoading(false);
    };

    const handleDeleteCatalog = async (catalogName) => {
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

            // Update the state to remove the deleted catalog
            setUserCatalogs(prevCatalogs => prevCatalogs.filter(catalog => catalog.catalog_name !== catalogName));
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        if (isUserLogged === 1) {
            fetchUserData();
            fetchUserCatalogs();
        }
    }, [isUserLogged]);

    const handleGlobalName = (title) => {
        // Define your global state handling logic here if needed
        console.log(`Handling global name for ${title}`);
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
                                            <p className="mb-0">Full Name</p>
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
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{userData.phoneNumber}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Date of Birth</p>
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
                            <h5>Your Catalogs</h5>
                            {userCatalogs.length > 0 ? (
                                userCatalogs.map((catalog) => (
                                    <div key={catalog.movie_catalog_id} className="card mb-2">
                                        <div className="card-body d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>{catalog.catalog_name}</h5>
                                                {catalog.movieMovieCatalogs && catalog.movieMovieCatalogs.length > 0 ? (
                                                    <ul>
                                                        {catalog.movieMovieCatalogs.map((movie) => (
                                                            <li key={movie.movie_id}>
                                                                <Link
                                                                    to={{
                                                                        pathname: `/films/${movie.movie_id}`,
                                                                        state: { movie_id: movie.movie_id, title: movie.title }
                                                                    }}
                                                                    onClick={() => handleGlobalName(movie.title)}
                                                                >
                                                                    {movie.title}
                                                                </Link>
                                                            </li>
                                                        ))}
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
                                <p>No catalogs available.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;