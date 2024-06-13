import React from 'react';
import styles from './Profile.module.css';

function Profile() {
    return (
        <section className={styles.background}>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4">
                        <div className="card-body text-center">
                            <img src='src\assets\avatar.png' alt="avatar" className="rounded-circle img-fluid" style={{ width: '100px' }} />
                            <h5 className="my-3">Piotr Kowal</h5>
                            <div className="d-flex justify-content-center mb-2">
                                {/* Buttons or other content */}
                            </div>
                        </div>
                    </div>
                    <div className={`card mb-4 mb-lg-0 ${styles.cre}`}>
                        <div className={styles.cre}>
                            <h3>Stwórz listę:</h3>
                            <hr />
                            <div className="form-group">
                                <label htmlFor="nazwaListy" className="mb-1">Nazwa listy:</label>
                                <input type="text" className="form-control" id="nazwaListy" placeholder="Nazwa listy" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Full Name</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">Piotr</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">pepeko2002@o2.pl</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Phone</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">882000000</p>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-3">
                                    <p className="mb-0">Data urodzenia</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">06.03.2002</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;