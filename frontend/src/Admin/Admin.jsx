import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Admin.module.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Admin() {
    const { userRole } = useContext(GlobalContext);
    const history = useHistory();

    useEffect(() => {
        if (userRole !== 'Admin') {
            history.push('/'); // Przekierowanie na stronę główną, jeśli użytkownik nie jest administratorem
        }
    }, [userRole, history]);

    return (
        <div className={styles.buttonadmin}>
            <Link to="Admin/Movie_Add" className={`btn btn-outline-danger ${styles.ToMovie}`}>
            Dodaj filmy
            </Link><br />
            <Link to="Admin/Users_Info" className={`btn btn-outline-danger ${styles.ToMovi}`}>
            Informacje o użytkownikach
            </Link>
            <br />
            <Link to="Admin/Films_Info" className={`btn btn-outline-danger ${styles.ToMovi}`}>
            Informacje o Filmach
            </Link>
        </div>
    );
}

export default Admin;