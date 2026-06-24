import { Routes, Route } from 'react-router-dom'
import AlAghaGroup from './App.jsx'
import ViewProjects from './Projects.jsx'
import ViewServices from './Services.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AlAghaGroup />} />
            <Route path="/projects" element={<ViewProjects />} />
            <Route path="/services" element={<ViewServices />} />
        </Routes>
    )
}