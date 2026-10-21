import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home.jsx";
import "./Career.css";

/* ═══════════════════════════════════════════════════════════════════════════
   CAREER — MAIN FRAME COMPONENT
   Single entry point representing the "Career" navigation item.
═══════════════════════════════════════════════════════════════════════════ */
export default function Career() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/#career", { replace: true });
  }, [navigate]);

  return <Home />;
}
