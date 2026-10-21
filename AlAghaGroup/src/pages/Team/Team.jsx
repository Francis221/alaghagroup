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
    navigate("/#team", { replace: true });
  }, [navigate]);

  return <Home />;
}
