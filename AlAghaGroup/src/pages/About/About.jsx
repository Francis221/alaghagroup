import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home.jsx";
import "./About.css";

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT — MAIN FRAME COMPONENT
   Single entry point representing the "About" navigation item.
═══════════════════════════════════════════════════════════════════════════ */
export default function About() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("about");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [navigate]);

  return <Home />;
}
