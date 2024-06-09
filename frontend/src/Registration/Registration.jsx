import React, { useState } from "react";
import styles from './Registration.module.css';
import { Link } from "react-router-dom"; 
import Home from "../Home/Home";
function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassowrd: "",
    phone_number: "",
    birth_date: "20.05.2002"
  });

  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Wysyłanie żądania do serwera
      const response = await fetch("http://localhost:5028/api/Registration/RegistrationPOST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
  
      const responseData = await response.text();
  
      if (response.ok) {
        setRegistrationSuccess(true);
        console.log("Rejestracja udana!", responseData);
      } else {
        setError(responseData || "Wystąpił nieznany błąd");
      }
    } catch (error) {
      console.error("Wystąpił problem z rejestracją:", error.message);
      setError("Wystąpił problem z rejestracją.");
    }
  };

  return (
    <>
    
        {registrationSuccess ? (
          <div className="success-message">Rejestracja udana! Mcdożesz teraz zalogować się na swoje konto.</div>
        ) : (
          <div className={styles.full}>
            <p className={styles.pp}>Rejestracja</p>
            <p className={styles.pp}>Nick:</p>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <p className={styles.pp}>E-mail:</p>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <p className={styles.pp}>Data urodzenia:</p>
            <input type="date" name="date" value={formData.birth_date} onChange={handleChange} /><br/>
            <p className={styles.pp}>Numer telefonu:</p>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} /><br/>
            <p className={styles.pp}>Hasło:</p>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <p className={styles.pp}>Powtórz hasło:</p>
            <input type="password" name="repeatPassowrd" value={formData.repeatPassowrd} onChange={handleChange} />
            
            <button onClick={handleSubmit}>Zarejestruj</button>
            <br />
            <label></label><br/>
            <div className="error">
              {error && <label>{error}</label>}
            </div>
          </div>
        )}
      
      
      </>
  );
}

export default Registration;