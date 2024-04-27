import styles from './Home.module.css'

import React from 'react';

function Home({ onNavigate }) {
  return (
    <>
      <p>Strona główna</p>
      <button onClick={() => onNavigate('Registration')}>Przejdź do rejestracji</button>
    </>
  );
}

export default Home;