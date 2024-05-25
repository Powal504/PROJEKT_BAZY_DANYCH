import React from "react";
import styles from "./Films.module.css";
import Reviews from "../Reviews/Reviews";


function Films() {
    return (
        <div className={styles.container}>
            <img src='src/assets/Films.jpg' alt="Poster" className={styles.poster} />
            <div className={styles.content}>
                <p className={styles.description}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, animi inventore! Delectus autem dolorem ex, qui dolorum provident veritatis minima incidunt a corrupti sapiente ea odit exercitationem, nisi iusto. Dicta.
                </p>
                <div className={styles.reviews_component}><Reviews /></div>
            </div>
        </div>
    );
}


export default Films;
