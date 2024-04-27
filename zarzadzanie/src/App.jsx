import React, { useState } from 'react';
import Registration from './Registration/Registration';
import Home from './Home/Home';

function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const handleNavigation = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <>
      {currentScreen === 'Home' && (
        <Home onNavigate={() => handleNavigation('Registration')} />
      )}
      {currentScreen === 'Registration' && (
        <Registration onNavigate={() => handleNavigation('Home')} />
      )}
    </>
  );
}

export default App;