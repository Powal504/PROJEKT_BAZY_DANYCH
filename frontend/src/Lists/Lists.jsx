import React, { useState } from "react";
import styles from './Lists.module.css';

const Lists = () => {
  const [catalogName, setCatalogName] = useState(""); // State to manage the catalog name
  const [token, setToken] = useState(""); // State to manage the authentication token

  // Function to handle adding items to the catalog
  const handleAddToCatalog = async () => {
    try {
      const response = await fetch('http://localhost:5028/api/catalogs/CreateCatalog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include token in the request headers
        },
        body: JSON.stringify({ catalog_name: catalogName })
      });
      
      if (response.ok) {
        // Handle success
        console.log('Catalog added successfully');
      } else {
        // Handle errors
        console.error('Failed to add catalog');
      }
    } catch (error) {
      console.error('Error adding catalog:', error);
    }
  };

  // Function to handle catalog name change
  const handleCatalogNameChange = (event) => {
    setCatalogName(event.target.value);
  };

  return (
    <div className={styles.lists}>
      <p className={styles.add}>Stwórz listy:</p>
      <p>Nazwa listy</p>
      <input
        className={styles.listNameInput}
        value={catalogName}
        onChange={handleCatalogNameChange}
      />
      <button onClick={handleAddToCatalog} disabled={!catalogName.trim()}>Dodaj katalog</button>
    </div>
  );
}

export default Lists;