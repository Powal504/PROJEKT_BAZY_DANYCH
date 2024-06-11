import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './Lists.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Lists() {
    return(
        <> 
        <div className={styles.lists}>
        <p className={styles.Add}>Stworz listy: </p>
           
               <input className={styles.list}></input>
                 
            
           </div>
        </>

    );
}
export default Lists;