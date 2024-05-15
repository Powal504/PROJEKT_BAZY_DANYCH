import React, { useState } from "react";
import styles from './Registration.module.css';
import { Link } from "react-router-dom"; 
import Home from "../Home/Home";
function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    roleid: 0,
    email: "",
    password: "",
    repeatPassowrd: "",
    phone_number: "",
    birth_date: "2024-05-15T19:52:00.690"
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
      // Konwertuj datę na format UTC
      const utcBirthDate = new Date(formData.birth_date).toISOString();
  
      // Aktualizuj formData z datą w formacie UTC
      setFormData({ ...formData, birth_date: utcBirthDate });
  
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
          <div className="success-message">Rejestracja udana! Możesz teraz zalogować się na swoje konto.</div>
        ) : (
          <div className={styles.full}>
            <p>Rejestracja</p>
            <p>Nick:</p>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <p>E-mail:</p>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <p>Hasło:</p>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <p>Powtórz hasło:</p>
            <input type="password" name="repeatPassowrd" value={formData.repeatPassowrd} onChange={handleChange} />
            <p>Numer telefonu:</p>
            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} /><br/>
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