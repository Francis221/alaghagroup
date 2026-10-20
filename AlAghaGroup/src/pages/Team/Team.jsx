import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home.jsx";
import "./Team.css";

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM — MAIN FRAME COMPONENT
   Single entry point representing the "Team" navigation item.
═══════════════════════════════════════════════════════════════════════════ */
export default function Team() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("team");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 150);
  }, [navigate]);

  return <Home />;
}
