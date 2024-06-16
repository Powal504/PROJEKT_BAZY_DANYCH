import React, { useContext, useState, useEffect } from 'react';
import styles from './Profile.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';
import Lists from '../Lists/Lists';

function Profile({ showBackground }) {
    const { isUserLogged, usernameGlobal } = useContext(GlobalContext);
    const [userData, setUserData] = useState(null);
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
            setUserData(user);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isUserLogged === 1) {
            fetchUserData();
        }
    }, [isUserLogged]);

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
                        <Lists></Lists>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            {loading && <p>Loading user data...</p>}
                            {error && <p>Error loading user data: {error}</p>}
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
                </div>
            </div>
        </section>
    );
}

export default Profile;