import React, { useState } from "react";
import { Link } from 'react-router-dom';
import styles from './Registration.module.css';

function Registration() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    repeatPassowrd: "",
    phone_number: "",
    birth_date: ""  
  });

  const [error, setError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const convertDateFormat = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formattedData = {
        ...formData,
        birth_date: convertDateFormat(formData.birth_date),
      };

      const response = await fetch("http://localhost:5028/api/Registration/RegistrationPOST", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formattedData)
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
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div className="card shadow-2-strong card-registration" style={{ borderRadius: '15px' }}>
              <div className="card-body p-4 p-md-5">
                
                <h3 className={`mb-4 pb-2 pb-md-0 mb-md-5 ${styles.registr}`}>Rejestracja</h3>
                
                <form onSubmit={handleSubmit}>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="text" id="username" className="form-control form-control-lg" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="email" id="email" className="form-control form-control-lg" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="password" id="password" className="form-control form-control-lg" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="password" id="repeatPassowrd" className="form-control form-control-lg" name="repeatPassowrd" value={formData.repeatPassowrd} onChange={handleChange} placeholder="Repeat Password" />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="tel" id="phoneNumber" className="form-control form-control-lg" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="Phone Number" />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4">
                      <div className="form-outline">
                        <input type="date" id="birthDate" className="form-control form-control-lg" name="birth_date" value={formData.birth_date} onChange={handleChange} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                  <div className="d-flex align-items-center justify-content-center pb-4">
                    <button className="btn btn-primary btn-lg" type="submit">Zarejestruj</button>
                  </div></div>
                  <br />
                  <div className="d-flex align-items-center justify-content-center pb-4">
                  <p className="mb-0 me-2">Masz już konto?</p>
                  <Link to="/login" className={`btn btn-outline-danger ${styles.logins}`}>
                    Zaloguj się
                  </Link>                           
                  </div>
                  {error && <div className="alert alert-danger mt-4" role="alert">{error}</div>}
                  {registrationSuccess && <div className="alert alert-success mt-4" role="alert">Registration successful!</div>}

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Registration;