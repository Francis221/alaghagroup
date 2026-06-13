// routes.jsx
import { Routes, Route } from 'react-router-dom'
import AlAghaGroup from './App.jsx'
import ViewProjects from '.Projects.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<AlAghaGroup />} />
            <Route path="/Projects" element={<ViewProjects />} />
        </Routes>
    )
}