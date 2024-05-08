import React, { useState } from "react";
import './Movie_Add.css'
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
        <div className='movie_add'>
            <h1 className='header-ma'>DODAJ FILM</h1>
            <input type='text' className='input-component' value={title} onChange={handleTitle}></input>
            <label className='label-component'>Podaj tytuł filmu</label>
            <textarea type='text' className='textarea-component-description' value={description} onChange={handleDescription}></textarea>
            <label className='label-component'>Dodaj opis</label>
            <button className='default-button' onClick={handlePoster}>Dodaj plik</button>
            <label className='label-component'>Dodaj okładkę</label>
            <input type='text' className='input-component' value={director} onChange={handleDirector}></input>
            <label className='label-component' >Podaj imie i nazwisko reżysera</label>
            <input type='text' className='input-component' value={company} onChange={handleCompany}></input>
            <label className='label-component' >Podaj nazwę wytwórni</label>
            <select className='select-component-am'>
                <option value="">Wybierz gatunek</option>
                    {movie_genre.map((category, index)=>
                    (<option className='option-component-am' key={index} value={category}>{category}</option>))}
            </select>
            <label className='label-component'>Podaj gatunek filmu</label>
            <button className='confirm-button-ma'>Dodaj film</button>
            
        </div>
    );
}
export default Movie_Add;