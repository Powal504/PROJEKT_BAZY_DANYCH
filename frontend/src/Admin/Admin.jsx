import React, { useContext, useEffect, useState } from 'react';
import styles from './Admin.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Admin() {
    return(
        <>
        <div className={styles.buttonadmin}>
            <Link to="Admin/Movie_Add" className={`btn btn-outline-danger ${styles.ToMovie}`}>
            Dodaj filmy
            </Link><br></br>
            <Link to="Admin/Users_Info" className={`btn btn-outline-danger ${styles.ToMovi}`}>
            Informacje o uzytkownikach
            </Link>
            <br></br>
            <Link to="Admin/Films_Info" className={`btn btn-outline-danger ${styles.ToMovi}`}>
            Informacje o Filmach
            </Link>
            
            
        </div>

        </>
    )
}
export default Admin;