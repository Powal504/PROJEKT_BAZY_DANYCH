import React, { useState } from "react";
import styles from './Movie_Add.module.css';
import { Link } from "react-router-dom"; 

function Movie_Add(){

    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [poster,setPoster] = useState("");
    const [director,setDirector] = useState("");
    const [company,setCompany] = useState("");

    function handleTitle(event){
        setTitle(event.target.value)
    }

    function handleDescription(event){
        setDescription(event.target.value)
    }

    function handlePoster() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (event) => {
            const selectedFile = event.target.files[0];
            setPoster(selectedFile);
        };
        input.click();
    }
    

    function handleDirector(event){
        setDirector(event.target.value)
    }

    function handleCompany(event){
        setCompany(event.target.value)
    }

    const movie_genre = ['Akcji','Horror','Animowany','Dramat','Komedia']

    return(
        <div className={styles.movie_add}>
            <h1 className={styles.header}>DODAJ FILM</h1>
            <input type='text' className={styles.input_component} value={title} onChange={handleTitle}></input>
            <label className={styles.label_component}>Podaj tytuł filmu</label>
            <textarea type='text' className={styles.textarea_component_description} value={description} onChange={handleDescription}></textarea>
            <label className={styles.label_component}>Dodaj opis</label>
            <button className={styles.default_button} onClick={handlePoster}>Dodaj plik</button>
            <label className={styles.label_component}>Dodaj okładkę</label>
            <input type='text' className={styles.input_component} value={director} onChange={handleDirector}></input>
            <label className={styles.label_component} >Podaj imie i nazwisko reżysera</label>
            <input type='text' className={styles.input_component} value={company} onChange={handleCompany}></input>
            <label className={styles.label_component} >Podaj nazwę wytwórni</label>
            <select className={styles.select_component_am}>
                <option value="">Wybierz gatunek</option>
                    {movie_genre.map((category, index)=>
                    (<option className={styles.option_component_am} key={index} value={category}>{category}</option>))}
            </select>
            <label className={styles.label_component}>Podaj gatunek filmu</label>
            <button className={styles.confirm_button}>Dodaj film</button>
            
        </div>
    );
}

export default Movie_Add;