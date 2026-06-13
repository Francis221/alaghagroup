import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import AlAghaGroup from './App.jsx'
import ViewProjects from './Projects.jsx'
import ViewServices from './Services.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AlAghaGroup />} />
        <Route path="/projects" element={<ViewProjects />} />
        <Route path="/services" element={<ViewServices />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)