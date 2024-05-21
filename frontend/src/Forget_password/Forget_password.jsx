import React, { useState } from "react";
import styles from './Forget_password.module.css';
import { Link } from "react-router-dom"; 

function Forget_password() {
    return (
        <div className={styles.forget}>
            <h1>PRZYPOMNIJ HASŁO</h1>
            <form>
                <div className={styles.formGroup}>
                    <label htmlFor="usernameOrEmail">Nazwa użytkownika lub mail</label>
                    <input type="text" id="usernameOrEmail" className={styles.inputField} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Hasło</label>
                    <input type="password" id="password" className={styles.inputField} />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="confirmPassword">Powtórz hasło</label>
                    <input type="password" id="confirmPassword" className={styles.inputField} />
                </div>
                <button type="submit" className={styles.submitButton}>Resetuj hasło</button>
            </form>
        </div>
    );
}

export default Forget_password;