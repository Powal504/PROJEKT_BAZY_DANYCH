import React, { useState } from "react";
import styles from './Login.module.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

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

            const responseData = await response.text();

            if (response.ok) {
                setLoginSuccess(true);
                setError(""); // Resetowanie błędu po udanym logowaniu
                console.log("Logowanie udane!", responseData);
            } else {
                setLoginSuccess(false); // Resetowanie sukcesu po nieudanym logowaniu
                setError(responseData || "Wystąpił nieznany błąd!");
                console.error(responseData); // Logowanie dokładnego komunikatu błędu z backendu
            }
        } catch (error) {
            console.error("Wystąpił problem z logowaniem!", error.message);
            setLoginSuccess(false); // Resetowanie sukcesu po nieudanym logowaniu
            setError("Wystąpił problem z logowaniem!");
        }
    }

    return (
        <div className={styles.login_page}>
            <h1 className={styles.header}>ZALOGUJ SIĘ</h1>
<<<<<<< HEAD
            <input type="text" className={styles.input_component} value={username} onChange={handleUsername}/>
            <label className={styles.label_component}>Nazwa użytkownika</label>
            <input type="password" className={styles.input_component} value={password} onChange={handlePassword}/>
            <label className={styles.label_component}>Hasło</label>
            <Link to="Forget_password" >zapomniałem hasła</Link>
            <button className={styles.login_button} onClick={handleSubmit}>LOGOWANIE</button>
           
=======
            <form className={styles.form_style} onSubmit={handleSubmit}>
                <input type="text" className={styles.input_component} value={username} onChange={handleUsername} />
                <label className={styles.label_component}>Nazwa użytkownika</label>
                <input type="password" className={styles.input_component} value={password} onChange={handlePassword} />
                <label className={styles.label_component}>Hasło</label>
                <button type="submit" className={styles.login_button}>LOGOWANIE</button>
            </form>
            {loginSuccess && <p className={styles.message}>Logowanie udane!</p>}
            {error && <p className={styles.message}>{error}</p>}
>>>>>>> 56d048da88449d267d44bff52a8de54f91a0ebd0
        </div>
    );
}

export default Login;
