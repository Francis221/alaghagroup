import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import Services from "./pages/Services/Services.jsx";
import About from "./pages/About/About.jsx";
import Clients from "./pages/Clients/Clients.jsx";
import Career from "./pages/Career/Career.jsx";
import Team from "./pages/Team/Team.jsx";
import ScrollToSection from "./components/ScrollToSection.jsx";

export default function AppRoutes() {
    return (
        <>
            {/* Handles /#hash navigation on every route change */}
            <ScrollToSection />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/services" element={<Services />} />
                <Route path="/about" element={<About />} />
                <Route path="/clients" element={<Clients />} />
                <Route path="/career" element={<Career />} />
                <Route path="/team" element={<Team />} />
            </Routes>
        </>
    );
}