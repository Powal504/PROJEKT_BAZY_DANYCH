import React, { useState } from "react";
import styles from './Registration.module.css';
import { Link } from "react-router-dom"; 
function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassword: "",
    phoneNumber: "",
    dateOfBirth: "2024-04-22"
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
      const response = await fetch("http://localhost:5028/api/Registration/RegistrationPOST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const responseData = await response.json();

      if (response.ok) {
        setRegistrationSuccess(true);
        console.log("Rejestracja udana!", responseData);
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Wystąpił nieznany błąd");
      }
    } catch (error) {
      console.error("Wystąpił problem z rejestracją:", error.message);
      setError("Wystąpił problem z rejestracją.");
    }
  };

  return (
    <div className="container"> {/* Używamy głównego kontenera */}
      <div className="background"></div> {/* Tło jako div tła */}
      <div className="registration-section"> {/* Sekcja rejestracji */}
        {registrationSuccess ? (
          <div className="success-message">Rejestracja udana! Możesz teraz zalogować się na swoje konto.</div>
        ) : (
          <div className={styles.full}>
            <p>Rejestracja</p>
            <Link to=""><div className={styles.homeButton}>Home</div></Link> {/* Poprawiamy klasę przycisku */}
            <p>Nick:</p>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
            <p>E-mail:</p>
            <input type="text" name="email" value={formData.email} onChange={handleChange} />
            <p>Hasło:</p>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
            <p>Powtórz hasło:</p>
            <input type="password" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
            <p>Numer telefonu:</p>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            <button onClick={handleSubmit}>Zarejestruj</button>
            <div className="error">
              {error && <label>{error}</label>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;