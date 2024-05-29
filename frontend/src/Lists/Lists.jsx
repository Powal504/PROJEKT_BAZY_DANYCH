import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './Lists.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Lists() {
    return(
        <> 
        <p className={styles.Add}>Twoje listy: </p>
            <div className={styles.lists}>
               
                <p className={styles.plus}>+</p> 
            
            </div>
        </>

    );
}
export default Lists;