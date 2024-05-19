import React, { useState } from "react";
import styles from './Login.module.css';
import { Link } from "react-router-dom"; 

function Login(){

    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState(false);

   function handleUsername(event){
    setUsername(event.target.value)
   }

   function handlePassword(event){
    setPassword(event.target.value)
   }

   const handleSubmit = async(e)=>{
    e.preventDefault();
    try{

        const loginData = {
            username: handleUsername,
            password: handlePassword
        };

        const response = await fetch ("http://localhost:5028/api/Login/LoginPOST",{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(loginData)
        });
        
        const responseData = await response.text();

        if(response.ok){
            setLoginSuccess(true);
            console.log("Logowanie udane!", responseData);
        }
        else{
            setError(responseData || "Wystąpił nieznany błąd!");
        }
    }
    catch(error){
        console.error("Wystąpił problem z logowaniem!", error.message);
        setError("Wystąpił problem z logowaniem!");
    }
   }

    return(
        <div className={styles.login_page}>
            <h1 className={styles.header}>ZALOGUJ SIĘ</h1>
            <input type="text" className={styles.input_component} value={username} onChange={handleUsername}/>
            <label className={styles.label_component}>Nazwa użytkownika</label>
            <input type="password" className={styles.input_component} value={password} onChange={handlePassword}/>
            <label className={styles.label_component}>Hasło</label>
            <button className={styles.login_button} onClick={handleSubmit}>LOGOWANIE</button>
        </div>
    );
}

export default Login;