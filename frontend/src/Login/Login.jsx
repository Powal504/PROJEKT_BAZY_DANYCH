import React, { useState } from "react";
import styles from './Login.module.css';
import { Link } from "react-router-dom"; 


function Login(){

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

   function handleUsername(event){
    setUsername(event.target.value)
   }

   function handlePassword(event){
    setPassword(event.target.value)
   }

   function handleLogin(){
    const loginData = {
        username: username,
        password: password
    };

    axios.post('zarz\zarz\api\Dto\LoginDto.cs', loginData)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error('Błąd logowania:', error);
        });
}

    return(
        <div className={styles.login_page}>
            <h1 className={styles.header}>ZALOGUJ SIĘ</h1>
            <input type="text" className={styles.input_component} value={username} onChange={handleUsername}/>
            <label className={styles.label_component}>Nazwa użytkownika</label>
            <input type="password" className={styles.input_component} value={password} onChange={handlePassword}/>
            <label className={styles.label_component}>Hasło</label>
            <button className={styles.login_button} onClick={handleLogin}>LOGOWANIE</button>
        </div>
    );
}

export default Login;