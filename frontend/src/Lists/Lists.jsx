import React, { useState } from "react";
import styles from './Lists.module.css';

const Lists = () => {
  const [catalogName, setCatalogName] = useState(""); // State to manage the catalog name
  const [error, setError] = useState(""); // State to manage errors
  const [addSuccess, setAddSuccess] = useState(false); // State to manage success message
  const token = localStorage.getItem('token')?.replace(/["']/g, '');

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
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        setAddSuccess(true);
        setCatalogName(""); // Clear input field after successful addition
        console.log('Catalog added successfully');
      } else {
        const errorText = await response.text();
        setError(errorText || 'Failed to add catalog');
      }
    } catch (error) {
      console.error('Error adding catalog:', error);
      setError('Error adding catalog');
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
      <p>Twoje katalogi</p>
    </div>
  );
}

export default Lists;