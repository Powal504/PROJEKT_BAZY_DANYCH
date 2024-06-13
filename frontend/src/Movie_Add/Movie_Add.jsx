import React, { useState } from "react";
import styles from './Movie_Add.module.css';
import { Link } from "react-router-dom";

function Movie_Add() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [poster, setPoster] = useState(null);
    const [director, setDirector] = useState("");
    const [company, setCompany] = useState("");
    const [genre, setGenre] = useState("");
    const [error, setError] = useState("");
    const [addSuccess, setAddSuccess] = useState(false);

    const movie_genre = [
        'Akcja', 'Animacja', 'Biograficzny', 'Dokumentalny', 'Dramat', 'Familijny', 'Fantasy',
        'Historyczny', 'Horror', 'Komedia', 'Kryminał', 'Obyczajowy', 'Przygodowy', 'Sci-Fi', 'Sensacyjny', 'Thriller', 'Wojenny'
    ];

    function handleTitle(event) {
        setTitle(event.target.value);
    }

    function handleDescription(event) {
        setDescription(event.target.value);
    }

    function handlePoster(event) {
        const file = event.target.files[0];
        if (file) {
            setPoster(file);
        }
    }

    function handleDirector(event) {
        setDirector(event.target.value);
    }

    function handleCompany(event) {
        setCompany(event.target.value);
    }

    function handleGenre(event) {
        setGenre(event.target.value);
    }

///////////////////////////////////////////////////////Dane o filmie

    async function handleSubmitData(e) {
        e.preventDefault();
    
        const data = {
            title: title,
            description: description,
            avatar: avatar,
            director: director,
            company: company,
            genre: genre
        };
    
        try {
            const response = await fetch("http://localhost:5028/api/Movies", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
    
            const responseData = await response.json();
    
            if (response.ok) {
                setAddSuccess(true);
                console.log("Film dodany!", responseData);
            } else {
                setError(responseData || "Wystąpił nieznany błąd!");
            }
        } catch (error) {
            console.error("Wystąpił problem z dodaniem filmu!", error.message);
            setError("Wystąpił problem z dodaniem filmu!");
        }
    }
    /////////////////////////////////////////////////////////////////// Plakat

    async function handleSubmitImage(e) {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("image", poster);
    
        try {
            const response = await fetch("http://localhost:5028/api/LoadImage", {
                method: "POST",
                body: formData
            });
    
            const responseData = await response.text(); // Tutaj możesz użyć text(), ponieważ oczekujesz tekstu zwrotnego, a nie JSON
    
            if (response.ok) {
                setAddSuccess(true);
                console.log("Plakat dodany!", responseData);
            } else {
                setError(responseData || "Wystąpił nieznany błąd!");
            }
        } catch (error) {
            console.error("Wystąpił problem z dodaniem Plakatu!", error.message);
            setError("Wystąpił problem z dodaniem Plakatu!");
        }
    }
    
    function handleSubmitAll(e) {
        e.preventDefault();
        handleSubmitData(e);
        handleSubmitImage(e);
    }
    
    return (
        <div className={styles.movie_add}>
            <h1 className={styles.header}>DODAJ FILM</h1>
            <input type='text' className={styles.input_component} value={title} onChange={handleTitle} />
            <label className={styles.label_component}>Podaj tytuł filmu</label>
            <textarea type='text' className={styles.textarea_component_description} value={description} onChange={handleDescription} />
            <label className={styles.label_component}>Dodaj opis</label>
            <input type="file" className={styles.file_upload_button} onChange={handlePoster} />
            <label className={styles.label_component}>Dodaj okładkę</label>
            <input type='text' className={styles.input_component} value={director} onChange={handleDirector} />
            <label className={styles.label_component}>Podaj imię i nazwisko reżysera</label>
            <input type='text' className={styles.input_component} value={company} onChange={handleCompany} />
            <label className={styles.label_component}>Podaj nazwę wytwórni</label>
            <select className={styles.select_component_am} value={genre} onChange={handleGenre}>
                <option value="">Wybierz gatunek</option>
                {movie_genre.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <label className={styles.label_component}>Podaj gatunek filmu</label>
            <button className={styles.confirm_button} onClick={handleSubmitAll }>Dodaj film</button>
            {error && <p className={styles.error}>{error}</p>}
            {addSuccess && <p className={styles.success}>Film dodany pomyślnie!</p>}
        </div>
    );
}

export default Movie_Add;
