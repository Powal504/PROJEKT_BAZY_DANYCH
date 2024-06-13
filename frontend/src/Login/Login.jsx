import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './Login.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);
    const { setIsUserLogged } = useContext(GlobalContext);
    const { setUsernameGlobal } = useContext(GlobalContext);

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const loginData = {
                username: username,
                password: password
            };

            const response = await fetch("http://localhost:5028/api/Login/LoginPost", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginData)
            });

            const responseData = await response.json();

            if (response.ok) {
                setLoginSuccess(true);
                setError("");   
                setIsUserLogged(1);
                setUsernameGlobal(username);
                console.log("Logowanie udane!", responseData);
                console.log(responseData.token)
                localStorage.setItem('token', responseData.token);

            } else {
                setLoginSuccess(false);
                setError(responseData || "Wystąpił nieznany błąd!");
                console.error(responseData);
            }
        } catch (error) {
            console.error("Wystąpił problem z logowaniem!", error.message);
            setLoginSuccess(false);
            setError("Wystąpił problem z logowaniem!");
        }
    }

    return (
        <section className={`h-100 ${styles.fulllogin}`}>
            <div className={`py-5 h-100 ${styles.container}`}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-xl-10">
                        <div className={`card rounded-3 text-black ${styles.card}`}>
                            <div className="row g-0">
                                <div className="col-lg-6 order-lg-1">
                                    <div className={`card-body p-md-5 mx-md-4 ${styles.cardbody}`}>
                                        <div className="text-center">
                                        <img src='src\assets\logo.png' style={{ width: '100px', height: '100px'}} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-1">Zaloguj się</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-outline mb-4 w-100">
                                                
                                                <input
                                                    type="text"
                                                    id="form2Example11"
                                                    className="form-control"
                                                    placeholder="login"
                                                    value={username}
                                                    onChange={handleUsername}
                                                />
                                            </div>
                                            <div className="form-outline mb-4 w-100">
                                               
                                                <input
                                                    type="password"
                                                    id="form2Example22"
                                                    className="form-control"
                                                    placeholder="hasło"
                                                    value={password}
                                                    onChange={handlePassword}
                                                />
                                            </div>
                                            <div className="text-center pt-1 mb-5 pb-1">
                                                <button
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3"
                                                    type="submit">
                                                    Zaloguj
                                                </button><br></br>
                                                <a className="text-muted" href="#!">Forgot password?</a>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center pb-4">
                                                <p className="mb-0 me-2">Don't have an account?</p>
                                                <button
                                                    type="button"
                                                    data-mdb-button-init
                                                    data-mdb-ripple-init
                                                    className="btn btn-outline-danger"
                                                >
                                                    Create new
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className={`col-lg-6 order-lg-2 ${styles.gradient}`}>
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">Baza filmów</h4>
                                        <p className="mb-0">
                                           Odkryj świat rozrywki dzięki naszej obszernej kolekcji filmów różnych gatunków i epok. Nasza platforma została zaprojektowana tak, aby zapewnić płynne i przyjemne doświadczenie dla wszystkich miłośników kina. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;