import React from "react";
import styles from "./Films.module.css";
import Reviews from "../Reviews/Reviews";
import ReviewsBox from "../ReviewsBox/ReviewsBox";
import { useState, useEffect } from "react";

function Films() {

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    const fetchData = async () =>{
        try {
            const token = localStorage.getItem('token');
            
            const response = await fetch('http://localhost:5028/api/Movies', {
                method: 'GET',
                headers:{
                    "Contet-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if(!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setMovies(data);
            setLoading(false);
            console.log("pobbrane filmy:", movies)
        }
        catch(error){
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(()=> {
        fetchData();
    }, []);

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
