import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Films_Info.module.css';

const fetchAllMovies = async () => {
  try {
    const response = await fetch('http://157.230.113.110:5028/api/Movies', {
      headers: {
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};

const deleteMovie = async (title) => {
  const token = localStorage.getItem('token')?.replace(/["']/g, '');
  try {
    const response = await fetch('http://157.230.113.110:5028/api/admin/DeleteMovie', {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return true; // Deleted successfully
  } catch (error) {
    console.error('There was a problem with the delete operation:', error);
    throw error;
  }
};

function Films_Info() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchAllMovies();
        setMovies(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const handleDelete = async (title) => {
    const confirmed = window.confirm(`Are you sure you want to delete movie "${title}"?`);
    if (confirmed) {
      try {
        await deleteMovie(title);
        // After deletion, you may want to fetch movies again to update the list
        const updatedMovies = movies.filter(movie => movie.title !== title);
        setMovies(updatedMovies);
        // Optionally show a success message or update the UI
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      

      <div className="container mt-5">
        <h2 className={styles.FilmsI}>Films Information</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Avatar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {movies.map(movie => (
              <tr key={movie.movie_id}>
                <td>{movie.title}</td>
                <td>{movie.description}</td>
                <td><img src={movie.avatar} alt={movie.title} style={{ width: '100px', height: 'auto' }} /></td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(movie.title)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={`text-center ${styles.buttonadmin}`}>
  <Link to="/Admin" className={`btn btn-outline-danger ${styles.ToMovie}`}>
    Wróć
  </Link>
</div>
    </>
  );
}

export default Films_Info;