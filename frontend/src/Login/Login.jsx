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
        <div className={styles.login_page}>
            <h1 className={styles.header}>ZALOGUJ SIĘ</h1>
            <form className={styles.form_style} onSubmit={handleSubmit}>
                <input type="text" className={styles.input_component} value={username} onChange={handleUsername} />
                <label className={styles.label_component}>Nazwa użytkownika</label>
                <input type="password" className={styles.input_component} value={password} onChange={handlePassword} />
                <label className={styles.label_component}>Hasło</label>
                <button type="submit" className={styles.login_button}>LOGOWANIE</button>
            </form>
            {loginSuccess && <p className={styles.message}>Logowanie udane!</p>}
            {error && <p className={styles.message}>{error}</p>}
        </div>
    );
}

export default Login;