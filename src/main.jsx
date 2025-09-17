import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Dmca from './pages/Dmca'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/dmca" element={<Dmca />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
