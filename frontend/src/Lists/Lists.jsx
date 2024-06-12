import React, { useState } from "react";
import styles from './Lists.module.css';

const Lists = () => {
  const [catalogName, setCatalogName] = useState(""); // State to manage the catalog name
  const [error, setError] = useState(""); // State to manage errors
  const [addSuccess, setAddSuccess] = useState(false); // State to manage success message
  const [token, setToken] = useState(""); // State to manage the authentication token

  // Function to handle adding catalogs
  const handleAddToCatalog = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    const data = {
      catalog_name: catalogName
    };

    try {
      const response = await fetch('http://localhost:5028/api/catalogs/CreateCatalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the request headers
        },
        body: JSON.stringify(data)
      });
      
      const responseData = await response.json();

      if (response.ok) {
        setAddSuccess(true);
        console.log('Catalog added successfully:', responseData);
      } else {
        setError(responseData || 'Failed to add catalog');
      }
    } catch (error) {
      console.error('niedodano:', error);
      setError('niedodano');
    }
  };

  // Function to handle catalog name change
  const handleCatalogNameChange = (event) => {
    setCatalogName(event.target.value);
  };

  return (
    <div className={styles.lists}>
      <p className={styles.add}>Stwórz listy:</p>
      <form onSubmit={handleAddToCatalog}>
        <p>Nazwa listy</p>
        <input
          className={styles.listNameInput}
          value={catalogName}
          onChange={handleCatalogNameChange}
        />
        <button type="submit" disabled={!catalogName.trim()}>Dodaj katalog</button>
      </form>
      {error && <p className={styles.error}>{error}</p>}
      {addSuccess && <p className={styles.success}>Katalog dodany pomyślnie!</p>}
    </div>
  );
}

export default Lists;