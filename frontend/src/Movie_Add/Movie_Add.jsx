import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import styles from './Movie_Add.module.css';
import { GlobalContext } from '../GlobalContext/GlobalContext';

function Movie_Add() {
    const { userRole } = useContext(GlobalContext);
    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [avatar, setAvatar] = useState("");
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [addSuccess, setAddSuccess] = useState(false);
    const [release_date, setRelease_Date] = useState("");

    useEffect(() => {
        if (userRole !== 'Admin') {
            history.push('/'); // Redirect to home if not an admin
            return;
        }

        fetchGenres();
    }, [userRole, history]);

    function handleTitle(event) {
        setTitle(event.target.value);
    }

    function handleDescription(event) {
        setDescription(event.target.value);
    }

    function handleAvatar(event) {
        setAvatar(event.target.value);
    }

    function handleGenre(event) {
        const options = event.target.options;
        let selectedGenres = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selectedGenres.push(options[i].value);
            }
        }
        setSelectedGenres(selectedGenres);
    }

    function handleDate(event){
        setRelease_Date(event.target.value);
    }

    const fetchGenres = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/films/AllGenres', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setGenres(data);
            setLoading(false);

        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    const handleAddMovie = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://157.230.113.110:5028/api/films', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title,
                    release_date: release_date,
                    description: description,
                    avatar: avatar,
                    genres: selectedGenres
                })
            });

            if (!response.ok) {
                throw new Error(`Error adding movie: ${response.status} ${response.statusText}`);
            }

            setAddSuccess(true);

        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.movie_add}>
            <h1 className={styles.header}>DODAJ FILM</h1>
            <input type='text' className={styles.input_component} value={title} onChange={handleTitle} placeholder="Podaj tytuł filmu" />
            <label className={styles.label_component}>Podaj tytuł filmu</label>
            <textarea className={styles.textarea_component_description} value={description} onChange={handleDescription} placeholder="Dodaj opis" />
            <label className={styles.label_component}>Dodaj opis</label>
            <input type="text" className={styles.input_component} value={avatar} onChange={handleAvatar} placeholder="Dodaj link do okładki" />
            <label className={styles.label_component}>Dodaj link do okładki</label>
            <input type="text" className={styles.input_component} value={release_date} onChange={handleDate} placeholder="Podaj date" />
            <label className={styles.label_component}>Podaj date dodania DD.MM.YYYY.</label>
            <select className={styles.select_component_am} value={selectedGenres} onChange={handleGenre} multiple>
                <option value="" disabled>Wybierz gatunek</option>
                {genres.map((genre) => (
                    <option key={genre.genre_id} value={genre.genre_name}>
                        {genre.genre_name}
                    </option>
                ))}
            </select>
            <label className={styles.label_component}>Wybierz gatunek filmu</label>
            <button className={styles.confirm_button} onClick={handleAddMovie}>Dodaj film</button>
            {error && <p className={styles.error}>{error}</p>}
            {addSuccess && <p className={styles.success}>Film dodany pomyślnie!</p>}
        </div>
    );
}

export default Movie_Add;