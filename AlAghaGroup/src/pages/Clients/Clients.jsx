import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Home from "../Home/Home.jsx";
import "./Clients.css";

/* ═══════════════════════════════════════════════════════════════════════════
   CLIENTS — MAIN FRAME COMPONENT
   Single entry point representing the "Clients" navigation item.
═══════════════════════════════════════════════════════════════════════════ */
export default function Clients() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/#clients", { replace: true });
  }, [navigate]);

  return <Home />;
}
