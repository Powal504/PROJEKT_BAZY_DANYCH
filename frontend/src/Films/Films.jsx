import React from "react";
import styles from "./Films.module.css";
import Reviews from "../Reviews/Reviews";
import ReviewsBox from "../ReviewsBox/ReviewsBox";


function Films() {
    return (
        <div>
            <h1 className={styles.title}>Tu będzie tytuł</h1>
            <div className={styles.container}>
                <img src='src/assets/Films.jpg' alt="Poster" className={styles.poster} />
                <div className={styles.content}>
                    <p className={styles.description}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, animi inventore! Delectus autem dolorem ex, qui dolorum provident veritatis minima incidunt a corrupti sapiente ea odit exercitationem, nisi iusto. Dicta.
                    </p>
                    <div className={styles.reviews_component}>
                        <Reviews /> {/* Dodaj sekcję recenzji */}
                    </div>
                </div>
                <div className={styles.Comments}></div>
            </div>{/* Dodaj komponent ReviewsBox poniżej sekcji recenzji */}
            <div className={styles.reviewBox_container}>
            <ReviewsBox />
            </div>
        </div>
    );
}


export default Films;
