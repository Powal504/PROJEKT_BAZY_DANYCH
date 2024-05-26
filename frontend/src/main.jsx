import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { GlobalProvider } from './GlobalContext/GlobalContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <GlobalProvider> {/* Wrap App with GlobalProvider */}
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  </GlobalProvider>,
)
