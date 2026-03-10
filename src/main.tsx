import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Check if it's './App' or './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)