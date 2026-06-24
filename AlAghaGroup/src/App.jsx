import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";


/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE IMPORTS — Vite-bundled, production-safe
═══════════════════════════════════════════════════════════════════════════ */

/* ── Brand ── */
import logo from "../alaghalogo.png";

/* ── Project portfolio images ── */
import projDubaiCreek from "./projectimg/Screenshot 2025-10-03 102435.png";
import projTownSquare from "./projectimg/1649835984RD883.jpg";
import projBeach from "./projectimg/beach.jpg";
import projBeachfront from "./projectimg/beachfront.jpg";
import projCity from "./projectimg/city.jpg";

/* ── Leadership / Management / Engineers photos ── */
import chairmanPhoto from "./img/CHAIRMAN.jpeg";
import projectsDirectorPhoto from "./img/Projectdirector.jpeg";
import technicalManagerPhoto from "./img/Technicalmanager.jpeg";
import hrManagerPhoto from "./img/Hrmanager.jpeg";
import projectManagerPhoto from "./img/Projectmanager.jpeg";
import hrOfficerPhoto from "./img/HrOffice.jpeg";
import proManagerPhoto from "./img/ProManager.jpeg";
import proposalManagerPhoto from "./img/ProposalManager.jpeg";
import accountingManagerPhoto from "./img/AccountingManager.jpeg";
import accountantPhoto from "./img/Accountant.jpeg";
import seniorPurchasingOfficerPhoto from "./img/SeniorPurchasingOfficer.png";
import proPhoto from "./img/Pro.jpeg";
import qsPhoto1 from "./img/Qs.jpeg";
import qsPhoto2 from "./img/Qs2.jpeg";
import qsPhoto3 from "./img/Qs3.jpeg";
import qsPhoto4 from "./img/Qs4.jpeg";
import qsPhoto5 from "./img/Qs5.jpeg";
import technicalEngineerPhoto from "./img/Technical.jpeg";
import architectureDesignerPhoto from "./img/ArchitectureDesigner.png";
import mepPhoto from "./img/MEP.jpeg";
import electricalEngineerPhoto from "./img/ElectricalEngineer.jpeg";
import mechanicalEngineerPhoto from "./img/MechanicalEngineer.jpeg";
import siteEngineerPhoto1 from "./img/ProjectSiteEngineer.jpeg";
import siteEngineerPhoto2 from "./img/ProjectSiteEngineer2.jpeg";
import siteEngineerPhoto3 from "./img/ProjectSiteEngineer3.jpeg";
import siteEngineerPhoto4 from "./img/ProjectSiteEngineer4.jpeg";

/* ── Client logos ── */
import clientEmaar from "./Clientimg/01.png";
import clientDamac from "./Clientimg/image (4).png";
import clientDubaiProperties from "./Clientimg/3PhBZf70.jpg";
import clientEmirates from "./Clientimg/2ee8f07cf98ec8ef0875a0d2e24f27e8.png";
import clientFrenchBakery from "./Clientimg/image.png";
import clientDubaiMunicipality from "./Clientimg/8780326-1759402541.jpg";
import clientAurora from "./Clientimg/image (6).png";
import clientAbanos from "./Clientimg/image (1).png";
import clientNaffco from "./Clientimg/Naffcologo.png";
import clientIdama from "./Clientimg/images.png";
import clientHorton from "./Clientimg/Horton-Tech-Interiors.jpg";
import clientJcMaclean from "./Clientimg/download.jpg";
import clientNexus from "./Clientimg/R.png";
import clientFamHolding from "./Clientimg/fam-holding.png";
import clientBinHam from "./Clientimg/image (2).png";
import clientDubaiInvestments from "./Clientimg/image (3).png";
import clientDib from "./Clientimg/hqdefault.jpg";
import clientMbrHousing from "./Clientimg/image (5).png";

/* ── Consultant logos ── */
import consultantAlShandagha from "./Consultantimg/1542594727588.jpg";
import consultantRenders from "./Consultantimg/Renders-Engineering-Consultants.jpg";
import consultantAecom from "./Consultantimg/aecom-gets-101m-army-prepositioned-stock-logistics-contract-modification.png";
import consultantSaffarini from "./Consultantimg/Eng.-Adnan-Saffarini-Office-Architects-And-Engineering-Consultants.jpg";
import consultantShadid from "./Consultantimg/Shadid-Engineering-Consultant-SEC.jpg";
import consultantAlGurg from "./Consultantimg/OIP.webp";
import consultantKmc from "./Consultantimg/1520950331901.png";
import consultantRmjm from "./Consultantimg/b-NTG3AH_400x400.jpg";
import consultantSsh from "./Consultantimg/njnzqbuobvqfuyg2.jpg";
import consultantNeb from "./Consultantimg/Screenshot 2025-09-12 114748.png";

/* ── Contractor logos ── */
import contractorDubaiProperties from "./Contractorimg/3PhBZf70 (1).jpg";
import contractorBhcUae from "./Contractorimg/1617805231454.jpg";
import contractorEcc from "./Contractorimg/OIP (1).webp";
import contractorDubaiCivilEng from "./Contractorimg/Dubai-Civil-Engineering.jpg";
import contractorReemCapital from "./Contractorimg/1520863299415.jpg";
import contractorArchgroup from "./Contractorimg/unnamed (1).jpg";
import contractorUnec from "./Contractorimg/R (2).jpg";
import contractorLacasa from "./Contractorimg/images (1).png";
import contractorA2z from "./Contractorimg/a2z_logo-20180404065306.jpg";
import contractorMbrHousing from "./Contractorimg/18102015211355775.jpg";
import contractorAbdulRahim from "./Contractorimg/unnamed (1).png";
import contractorBhg from "./Contractorimg/images (1).jpg";
import contractorCscec from "./Contractorimg/CSCEC-Egypt-28116-1522062944.jpg";
import contractorDewan from "./Contractorimg/dewan-logo-retina.png";
import contractorEngConsortium from "./Contractorimg/ENGG-Consortium.png";
import contractorConin from "./Contractorimg/images (1) (1).jpg";
import contractorCityEngineering from "./Contractorimg/download_edited.jpg";
import contractorExpo2020 from "./Contractorimg/283-2830293_transparent-dubai-png-expo-2020-logo-png-png.png";
import contractorTav from "./Contractorimg/ga9t1p6cwfz82yaf (1).jpg";
import contractorAlTurath from "./Contractorimg/LOGO-ATC-972_278-White (1).png";
/* ── Certification images ── */
import cert1 from "./certimg/AL AGHA DECORATION WORKS - ISO 9001-2015.png";
import cert2 from "./certimg/AL AGHA DECORATION WORKS - ISO 14001-2015.png";
import cert3 from "./certimg/AL AGHA DECORATION WORKS - ISO 45001-2018.png";
import cert4 from "./certimg/AL AGHA TECHNICAL SERVICES - ISO 9001-2015.png";
import cert5 from "./certimg/AL AGHA TECHNICAL SERVICES - ISO 14001-2015.png";
import cert6 from "./certimg/AL AGHA TECHNICAL SERVICES - ISO 45001-2018.png";
/* ── Footer / misc  ── */
import qrCodeImg from "./certimg/QRCODE.jpeg";

/* ── Certification images ── */
// Map each cert name to its image import.
// Add your actual cert image imports here, e.g.:
// import certIso9001 from "./certimg/iso9001.jpg";
// For now we fall back to a placeholder if no image is supplied.

/* ─── EMAILJS CONFIG ─────────────────────────────────────────────────────── */
const EMAILJS_SERVICE_ID = "service_8ezhvn9";
const EMAILJS_TEMPLATE_ID = "template_e7zjtkk";
const EMAILJS_PUBLIC_KEY = "KccrSYU3an3UhnK3F";

/* ─── GLOBAL STYLES ──────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  :root {
    --gold: #C9A84C;
    --gold-dk: #a8883c;
    --gold-lt: #e0c068;
    --ink: #02071c;
    --bg-deep: #02071c;
    --surface: #f5f3ef;
    --border: #e0d9cc;
    --f-display: 'Georgia', 'Times New Roman', serif;
    --f-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg-deep); color: #fff; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes floatBg {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(30px, -20px) scale(1.04); }
    66%       { transform: translate(-20px, 30px) scale(0.97); }
  }
  @keyframes floatBgReverse {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%       { transform: translate(-30px, 20px) scale(1.03); }
    66%       { transform: translate(20px, -30px) scale(0.98); }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
    50%       { opacity: 0.5; box-shadow: 0 0 16px #10b981; }
  }
  @keyframes shimmerSweep {
    0%   { transform: translateX(-120%) skewX(-15deg); }
    100% { transform: translateX(220%) skewX(-15deg); }
  }
  @keyframes logoBreath {
    0%, 100% { transform: scale(1) rotate(0deg); filter: drop-shadow(0 0 8px rgba(201,168,76,0.3)); }
    50%       { transform: scale(1.06) rotate(1deg); filter: drop-shadow(0 0 18px rgba(201,168,76,0.6)); }
  }
  @keyframes borderRotate {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-8px); }
  }
  @keyframes arabicFade {
    from { opacity: 0; letter-spacing: 0.3em; }
    to   { opacity: 1; letter-spacing: normal; }
  }
  @keyframes orb {
    0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.6; }
    33%       { transform: scale(1.15) translate(10px, -8px); opacity: 0.9; }
    66%       { transform: scale(0.9) translate(-6px, 10px); opacity: 0.4; }
  }
  @keyframes scanLine {
    from { top: 0%; }
    to   { top: 100%; }
  }
  @keyframes modalFadeIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  /* ── Bidirectional reveal transition ── */
  .reveal-el {
    will-change: opacity, transform;
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-el.is-hidden-up    { opacity: 0; transform: translateY(44px); }
  .reveal-el.is-hidden-down  { opacity: 0; transform: translateY(-44px); }
  .reveal-el.is-hidden-left  { opacity: 0; transform: translateX(-44px); }
  .reveal-el.is-hidden-right { opacity: 0; transform: translateX(44px); }
  .reveal-el.is-hidden-zoom  { opacity: 0; transform: scale(0.92); }
  .reveal-el.is-hidden-fade  { opacity: 0; }
  .reveal-el.is-visible      { opacity: 1; transform: none; }

  @media (prefers-reduced-motion: reduce) {
    .reveal-el { transition: none !important; }
    .reveal-el.is-hidden-up, .reveal-el.is-hidden-down,
    .reveal-el.is-hidden-left, .reveal-el.is-hidden-right,
    .reveal-el.is-hidden-zoom, .reveal-el.is-hidden-fade {
      opacity: 1; transform: none;
    }
  }

  .eyebrow {
    font-family: var(--f-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold);
    display: inline-block;
  }
  .section-title {
    font-family: var(--f-display);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
  .divider-gold {
    display: block;
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin: 12px 0;
  }

  /* Buttons */
  .btn-gold {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, var(--gold-dk), var(--gold), var(--gold-lt));
    color: var(--ink); font-family: var(--f-body); font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase; padding: 12px 28px;
    border-radius: 8px; border: none; cursor: pointer; text-decoration: none;
    transition: all 0.25s ease; box-shadow: 0 4px 20px rgba(201,168,76,0.25);
  }
  .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,168,76,0.4); }

  /* ④ FIX: btn-outline-gold hover — solid gold fill with dark text for clear feedback */
  .btn-outline-gold {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: var(--gold); font-family: var(--f-body);
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 11px 26px; border-radius: 8px; border: 1px solid rgba(201,168,76,0.5);
    cursor: pointer; transition: background 0.22s ease, color 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s ease;
  }
  .btn-outline-gold:hover {
    background: var(--gold);
    color: var(--ink);
    border-color: var(--gold);
    box-shadow: 0 6px 24px rgba(201,168,76,0.35);
    transform: translateY(-2px);
  }

  .btn-outline-white {
    display: inline-flex; align-items: center; gap: 8px;
    background: transparent; color: rgba(255,255,255,0.8); font-family: var(--f-body);
    font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 14px 28px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer; transition: all 0.25s ease;
  }
  .btn-outline-white:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.5); transform: translateY(-2px); }

  /* Nav */
  .nav-btn {
    background: none; border: none; font-family: var(--f-body); font-size: 13px;
    font-weight: 500; cursor: pointer; padding: 6px 2px; position: relative;
    transition: color 0.25s cubic-bezier(0.22,1,0.36,1); letter-spacing: 0.03em;
  }
  .nav-btn::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 1.5px;
    background: linear-gradient(90deg, var(--gold), var(--gold-lt));
    transform: scaleX(0); transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
    transform-origin: left;
  }
  .nav-btn:hover { color: var(--gold) !important; }
  .nav-btn:hover::after { transform: scaleX(1); }
  .nav-active { color: var(--gold) !important; }
  .nav-active::after { transform: scaleX(1); }

  /* Cards */
  .svc-card {
    border: 1px solid rgba(201,168,76,0.12); border-radius: 18px; padding: 36px 30px;
    background: rgba(255,255,255,0.03); transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    backdrop-filter: blur(8px); height: 100%;
  }
  .svc-card:hover {
    border-color: rgba(201,168,76,0.4); background: rgba(255,255,255,0.06);
    transform: translateY(-4px); box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  }
  .proj-card {
    position: relative; border-radius: 16px; overflow: hidden; cursor: pointer;
    border: 1px solid rgba(201,168,76,0.1); transition: all 0.35s ease;
  }
  .proj-card img { width: 100%; object-fit: cover; display: block; transition: transform 0.6s ease; }
  .proj-card:hover { border-color: rgba(201,168,76,0.35); box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
  .proj-card:hover img { transform: scale(1.04); }

  .career-row {
    border: 1px solid rgba(201,168,76,0.12); border-radius: 14px; padding: 20px 22px;
    background: rgba(255,255,255,0.03); display: flex; justify-content: space-between;
    align-items: center; transition: all 0.3s ease; backdrop-filter: blur(6px);
  }
  .career-row:hover { border-color: rgba(201,168,76,0.35); background: rgba(255,255,255,0.06); transform: translateX(4px); }

  .client-img-card {
    position: relative; border-radius: 14px; overflow: hidden;
    border: 1px solid rgba(201,168,76,0.12); aspect-ratio: 3/2;
    background: rgba(255,255,255,0.03); transition: all 0.3s ease;
    display: flex; align-items: center; justify-content: center;
  }
  .client-img-card:hover { border-color: rgba(201,168,76,0.4); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(0,0,0,0.35); }
  .client-img-card img { width: 100%; height: 100%; object-fit: contain; padding: 12px; display: block; }
  .client-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(1,4,74,0.7) 0%, transparent 50%); opacity: 0; transition: opacity 0.3s; }
  .client-img-card:hover .client-overlay { opacity: 1; }
  .client-name {
    position: absolute; bottom: 0; left: 0; right: 0; padding: 12px 12px 10px;
    font-family: var(--f-body); font-size: 10px; font-weight: 700; letter-spacing: 0.06em;
    color: #fff; text-align: center; transform: translateY(4px); opacity: 0; transition: all 0.3s;
  }
  .client-img-card:hover .client-name { opacity: 1; transform: translateY(0); }
  .img-placeholder {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 8px; width: 100%; height: 100%; padding: 16px; position: relative;
  }

  /* Group card */
  .group-card-wrap { position: relative; border-radius: 22px; overflow: hidden; }
  .group-card-wrap::before {
    content: ''; position: absolute; inset: -1px; border-radius: 22px;
    background: linear-gradient(120deg, transparent 30%, rgba(201,168,76,0.35) 50%, transparent 70%);
    opacity: 0; transition: opacity 0.4s ease; z-index: 0; pointer-events: none;
  }
  .group-card-wrap:hover::before { opacity: 1; animation: shimmerSweep 1.2s ease forwards; }
  .group-card-inner { position: relative; z-index: 1; }

  .logo-ring { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
  .logo-ring::before {
    content: ''; position: absolute; inset: -3px; border-radius: 50%;
    background: conic-gradient(var(--gold), var(--gold-lt), transparent, var(--gold-dk), var(--gold));
    animation: borderRotate 4s linear infinite; opacity: 0; transition: opacity 0.4s ease;
  }
  .group-card-wrap:hover .logo-ring::before { opacity: 1; }
  .logo-ring-inner {
    position: absolute; inset: 2px; border-radius: 50%; background: var(--bg-deep);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .logo-ring-inner img { width: 88%; height: 88%; object-fit: contain; animation: logoBreath 4s ease-in-out infinite; }

  /* ③ Certification badge button */
  .cert-badge-btn {
    display: flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(201,168,76,0.2);
    border-radius: 10px; padding: 7px 12px; backdrop-filter: blur(6px);
    cursor: pointer; transition: all 0.22s ease; text-align: left;
  }
  .cert-badge-btn:hover {
    background: rgba(201,168,76,0.12);
    border-color: rgba(201,168,76,0.55);
    transform: translateY(-1px);
    box-shadow: 0 4px 14px rgba(201,168,76,0.18);
  }

  /* ③ Cert modal */
  .cert-modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.82);
    backdrop-filter: blur(10px); display: flex; align-items: center;
    justify-content: center; z-index: 9000; padding: 20px;
  }
  .cert-modal-box {
    background: #080d38; border: 1px solid rgba(201,168,76,0.3);
    border-radius: 20px; padding: 32px; max-width: 540px; width: 100%;
    position: relative; animation: modalFadeIn 0.28s cubic-bezier(0.22,1,0.36,1) both;
    box-shadow: 0 40px 100px rgba(0,0,0,0.7);
  }
  .cert-modal-close {
    position: absolute; top: 14px; right: 16px; background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7);
    width: 34px; height: 34px; border-radius: 50%; font-size: 16px;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all 0.2s; line-height: 1;
  }
  .cert-modal-close:hover { background: rgba(201,168,76,0.2); color: var(--gold); border-color: var(--gold); }

  @media (max-width: 900px) {
    .grid-2 { grid-template-columns: 1fr !important; }
    .desktop-nav { display: none !important; }
    .mobile-menu-btn { display: block !important; }
  }
  @media (max-width: 600px) {
    .grid-6 { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════════════
   GEOMETRIC BACKGROUNDS
═══════════════════════════════════════════════════════════════════════════ */
function GeoBg({ variant = "a" }) {
  const variants = {
    a: (
      <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <radialGradient id="rg1a" cx="20%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg2a" cx="85%" cy="75%" r="50%">
            <stop offset="0%" stopColor="#1a2f6a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#020730" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#rg2a)" />
        <rect width="1440" height="900" fill="url(#rg1a)" />
        <polygon points="160,20 310,105 310,275 160,360 10,275 10,105" fill="none" stroke="rgba(201,168,76,0.07)" strokeWidth="1.5" />
        <polygon points="160,60 270,122 270,248 160,310 50,248 50,122" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1" />
        <polygon points="1380,80 1430,108 1430,164 1380,192 1330,164 1330,108" fill="none" stroke="rgba(201,168,76,0.1)" strokeWidth="1" />
        <polygon points="1340,40 1420,85 1420,175 1340,220 1260,175 1260,85" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1" />
        <line x1="0" y1="900" x2="500" y2="0" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
        <line x1="100" y1="900" x2="600" y2="0" stroke="rgba(201,168,76,0.03)" strokeWidth="1" />
        <line x1="900" y1="0" x2="1440" y2="600" stroke="rgba(201,168,76,0.03)" strokeWidth="1" />
        <circle cx="720" cy="450" r="380" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1" strokeDasharray="6 14" />
        <circle cx="720" cy="450" r="280" fill="none" stroke="rgba(201,168,76,0.03)" strokeWidth="1" />
        <polygon points="0,900 280,600 0,600" fill="rgba(201,168,76,0.025)" />
        <polygon points="1440,900 1160,620 1440,620" fill="rgba(10,24,110,0.3)" />
        {[...Array(8)].map((_, row) => [...Array(12)].map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 130 + 65} cy={row * 130 + 65} r="1.5" fill="rgba(201,168,76,0.12)" />
        )))}
      </svg>
    ),
    b: (
      <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="lgb1b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#060d50" />
            <stop offset="100%" stopColor="#020730" />
          </linearGradient>
        </defs>
        <rect width="1440" height="700" fill="url(#lgb1b)" />
        <line x1="0" y1="0" x2="1440" y2="700" stroke="rgba(201,168,76,0.05)" strokeWidth="60" />
        <line x1="1440" y1="0" x2="0" y2="700" stroke="rgba(10,24,110,0.5)" strokeWidth="60" />
        {[...Array(6)].map((_, row) => [...Array(9)].map((_, col) => {
          const cx = col * 180 + (row % 2) * 90;
          const cy = row * 120 + 60;
          return <polygon key={`${row}-${col}`} points={`${cx},${cy - 30} ${cx + 50},${cy} ${cx},${cy + 30} ${cx - 50},${cy}`} fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />;
        }))}
        <path d="M 0 700 Q 720 0 1440 700" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="2" />
        <path d="M 0 700 Q 720 100 1440 700" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
        <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
        <circle cx="1440" cy="700" r="200" fill="none" stroke="rgba(201,168,76,0.06)" strokeWidth="1.5" />
      </svg>
    ),
    c: (
      <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <rect width="1440" height="600" fill="#020730" />
        {[...Array(8)].map((_, i) => (
          <path key={i} d={`M 0 ${i * 80 + 40} Q 360 ${i * 80 + 40 + (i % 2 ? -40 : 40)} 720 ${i * 80 + 40} T 1440 ${i * 80 + 40}`} fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
        ))}
        {[240, 480, 720, 960, 1200].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="600" stroke="rgba(201,168,76,0.05)" strokeWidth="1" strokeDasharray="4 12" />
        ))}
        <polygon points="0,0 400,0 0,300" fill="rgba(201,168,76,0.03)" />
        <polygon points="1440,0 1040,0 1440,300" fill="rgba(201,168,76,0.03)" />
      </svg>
    ),
  };
  return <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>{variants[variant]}</div>;
}

/* ═══════════════════════════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════════════════════════ */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const fn = () => setY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return y;
}

function useCountUp(target, active, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const num = parseFloat(target);
    const raf = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 4);
      setCount(Math.floor(ease * num));
      if (p < 1) requestAnimationFrame(raf);
      else setCount(num);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

/* ═══════════════════════════════════════════════════════════════════════════
   BIDIRECTIONAL REVEAL
═══════════════════════════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, dir = "up", exitDir, className = "", style = {} }) {
  const ref = useRef(null);
  const [state, setState] = useState("hidden-down");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenBelow = `hidden-${dir}`;
    const hiddenAbove = exitDir
      ? `hidden-${exitDir}`
      : dir === "up" ? "hidden-down"
        : dir === "down" ? "hidden-up"
          : dir === "left" ? "hidden-right"
            : dir === "right" ? "hidden-left"
              : `hidden-${dir}`;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top < 0) {
            setState(hiddenAbove);
          } else {
            setState(hiddenBelow);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [dir, exitDir]);

  return (
    <div
      ref={ref}
      className={`reveal-el is-${state} ${className}`}
      style={{
        transitionDelay: state === "visible" ? `${delay}ms` : "0ms",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   READING PROGRESS BAR
═══════════════════════════════════════════════════════════════════════════ */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(201,168,76,0.12)" }}>
      <div style={{ height: "100%", width: `${p}%`, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))", transition: "width 0.2s ease", boxShadow: "0 0 12px rgba(201,168,76,0.6)" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED STAT
═══════════════════════════════════════════════════════════════════════════ */
function AnimatedStat({ val, label }) {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const suffix = val.replace(/[0-9.]/g, "");
  const num = parseFloat(val.replace(/[^0-9.]/g, "")) || 0;
  const count = useCountUp(num, active);
  const isText = isNaN(parseFloat(val));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ textAlign: "center", padding: "0 16px" }}>
      <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.8rem,4.5vw,4rem)", color: "var(--gold)", lineHeight: 1, fontWeight: 700, letterSpacing: "-0.02em" }}>
        {isText ? val : `${count}${suffix}`}
      </div>
      <div style={{ fontFamily: "var(--f-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(201,168,76,0.65)", marginTop: 10, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE SLIDER
═══════════════════════════════════════════════════════════════════════════ */
function ImageSlider({ images, height = 520 }) {
  const [cur, setCur] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setCur(p => (p + 1) % images.length), 4500);
    return () => clearInterval(t);
  }, [hover, images.length]);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.45)", height, border: "1px solid rgba(201,168,76,0.2)" }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 0.9s ease" }}>
          <img src={img.url} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(1,4,74,0.88) 0%, rgba(0,0,0,0.08) 55%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 28px 24px" }}>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)", marginBottom: 8 }}>{img.year} · {img.cat}</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: 21, color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>{img.caption}</div>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 22, right: 22, display: "flex", gap: 7, zIndex: 10 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} style={{ width: i === cur ? 26 : 7, height: 7, borderRadius: 4, background: i === cur ? "var(--gold)" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", transition: "all 0.35s", padding: 0 }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 18, right: 18, background: "rgba(1,4,74,0.8)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: 20, fontSize: 11, color: "var(--gold)", fontFamily: "var(--f-body)", fontWeight: 700, border: "1px solid rgba(201,168,76,0.25)" }}>
        {String(cur + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4D BUILDING VISUALIZATION
═══════════════════════════════════════════════════════════════════════════ */
function Building4D() {
  const containerRef = useRef(null);
  const buildingRef = useRef(null);
  const floorsRef = useRef([]);
  const hudRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const vh = window.innerHeight;
          const p = Math.min(Math.max((vh * 0.8 - rect.top) / (vh * 0.7), 0), 1);
          if (buildingRef.current) {
            buildingRef.current.style.transform = `scale(${0.95 + p * 0.05})`;
            buildingRef.current.style.opacity = String(0.2 + p * 0.8);
          }
          floorsRef.current.forEach((floor, i) => {
            if (!floor) return;
            const fp = Math.min(Math.max((p - i * 0.0667) / 0.2, 0), 1);
            const ease = 1 - Math.pow(1 - fp, 4);
            floor.style.opacity = String(ease);
            floor.style.transform = `translateY(${(1 - ease) * 80}px)`;
          });
          if (hudRef.current) hudRef.current.textContent = `${Math.round(p * 100)}%`;
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const cx = 200, cy = 440, floorCount = 12;

  return (
    <div ref={containerRef} style={{ maxWidth: 1320, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 60, flexWrap: "wrap" }}>
      <div style={{ flex: 1, minWidth: 300, color: "#fff" }}>
        <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>3D Architectural Visualization</span>
        <h2 className="section-title" style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)", marginTop: 16, color: "#fff" }}>
          Building the <em style={{ color: "var(--gold)", fontStyle: "italic" }}>future</em>,<br />floor by floor.
        </h2>
        <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "rgba(255,255,255,0.65)", lineHeight: 1.85, marginTop: 22, maxWidth: 480 }}>
          Experience our construction process through advanced 3D visualization. Scroll to watch the structure rise in real-time — reflecting our commitment to precision, safety, and timely delivery on every project.
        </p>
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 30, color: "var(--gold)", fontWeight: 700 }}>ISO</div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>Certified Quality</div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 300, position: "relative", height: 580, display: "flex", alignItems: "center", justifyContent: "center" }}>
        { }

        {/* % COMPLETE HUD — kept (bottom right) */}
        <div style={{ position: "absolute", bottom: 20, right: 20, textAlign: "right", fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", letterSpacing: "0.15em", opacity: 0.8, zIndex: 2 }}>
          <div style={{ fontSize: 40, fontFamily: "var(--f-display)", fontWeight: 700, lineHeight: 1, color: "#fff" }}><span ref={hudRef}>0%</span></div>
          <div style={{ marginTop: 4 }}>COMPLETE</div>
        </div>

        <div ref={buildingRef} style={{ width: "100%", height: "100%", opacity: 0.2, transition: "opacity 0.1s, transform 0.1s" }}>
          <svg viewBox="0 0 400 580" width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e0c068" /><stop offset="100%" stopColor="#C9A84C" />
              </linearGradient>
              <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1a2f4a" /><stop offset="100%" stopColor="#01044A" />
              </linearGradient>
              <linearGradient id="rightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2a4060" /><stop offset="100%" stopColor="#142540" />
              </linearGradient>
              <linearGradient id="winGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.9" /><stop offset="100%" stopColor="#a8883c" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.4" /><stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
              </radialGradient>
              <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="cb" /><feMerge><feMergeNode in="cb" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <ellipse cx={cx} cy={cy + 20} rx="140" ry="60" fill="url(#baseGlow)" />
            {Array.from({ length: floorCount }).map((_, i) => {
              const y_b = cy - i * 30;
              const y_t = cy - (i + 1) * 30;
              const topPts = `${cx},${y_t} ${cx - 60},${y_t - 30} ${cx},${y_t - 60} ${cx + 60},${y_t - 30}`;
              const leftPts = `${cx},${y_t} ${cx - 60},${y_t - 30} ${cx - 60},${y_b - 30} ${cx},${y_b}`;
              const rightPts = `${cx},${y_t} ${cx + 60},${y_t - 30} ${cx + 60},${y_b - 30} ${cx},${y_b}`;
              const uRanges = [[0.15, 0.35], [0.45, 0.55], [0.65, 0.85]];
              const leftWins = [], rightWins = [];
              for (const [u1, u2] of uRanges) {
                leftWins.push(`${cx - 60 + u1 * 60},${y_t - 30 + u1 * 30} ${cx - 60 + u2 * 60},${y_t - 30 + u2 * 30} ${cx - 60 + u2 * 60},${y_b - 30 + u2 * 30} ${cx - 60 + u1 * 60},${y_b - 30 + u1 * 30}`);
                rightWins.push(`${cx + u1 * 60},${y_t - u1 * 30} ${cx + u2 * 60},${y_t - u2 * 30} ${cx + u2 * 60},${y_b - u2 * 30} ${cx + u1 * 60},${y_b - u1 * 30}`);
              }
              return (
                <g key={i} ref={el => floorsRef.current[i] = el} style={{ opacity: 0, transition: "opacity 0.1s, transform 0.1s" }}>
                  <polygon points={leftPts} fill="url(#leftGrad)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
                  <polygon points={rightPts} fill="url(#rightGrad)" stroke="rgba(201,168,76,0.2)" strokeWidth="0.5" />
                  <polygon points={topPts} fill="url(#topGrad)" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />
                  {leftWins.map((pts, wi) => <polygon key={`lw-${wi}`} points={pts} fill="url(#winGrad)" filter="url(#glow)" />)}
                  {rightWins.map((pts, wi) => <polygon key={`rw-${wi}`} points={pts} fill="url(#winGrad)" filter="url(#glow)" />)}
                </g>
              );
            })}
            <g ref={el => floorsRef.current[floorCount] = el} style={{ opacity: 0, transition: "opacity 0.1s, transform 0.1s" }}>
              <line x1={cx} y1={cy - floorCount * 30 - 60} x2={cx} y2={cy - floorCount * 30 - 100} stroke="var(--gold)" strokeWidth="2" filter="url(#glow)" />
              <circle cx={cx} cy={cy - floorCount * 30 - 100} r="3" fill="#fff" filter="url(#glow)" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AVATAR
═══════════════════════════════════════════════════════════════════════════ */
function initials(n) { return n.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase(); }
function avatarBg(name) {
  const colors = ["#1D3A5C", "#2D4A1A", "#4A2D1A", "#1A2D4A", "#3A1A4A", "#1A4A2D", "#4A1A1A"];
  return colors[name.charCodeAt(0) % colors.length];
}
function Avatar({ name, photo, size = 64 }) {
  const [err, setErr] = useState(false);
  if (photo && !err) {
    return (
      <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
        <img src={photo} alt={name} onError={() => setErr(true)} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }} />
      </div>
    );
  }
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarBg(name), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--f-display)", fontSize: size * 0.33, color: "var(--gold)", fontWeight: 700 }}>
      {initials(name)}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CLIENT IMAGE CARD
═══════════════════════════════════════════════════════════════════════════ */
function ClientImgCard({ name, src, badge }) {
  const [err, setErr] = useState(false);
  const hasImg = src && !err;
  return (
    <div className="client-img-card">
      {hasImg ? (
        <>
          <img src={src} alt={name} onError={() => setErr(true)} />
          <div className="client-overlay" />
          <div className="client-name">{name}</div>
          {badge && (
            <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(1,4,74,0.85)", backdropFilter: "blur(6px)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20, padding: "3px 10px", fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{badge}</div>
          )}
        </>
      ) : (
        <div className="img-placeholder">
          {badge && <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(1,4,74,0.85)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: 20, padding: "3px 10px", fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold)" }}>{badge}</div>}
          <div style={{ fontSize: 28, opacity: 0.3 }}>🏢</div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 600, color: "rgba(201,168,76,0.6)", textAlign: "center", padding: "0 12px", lineHeight: 1.4 }}>{name}</div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Add logo image</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOCIAL ICONS
═══════════════════════════════════════════════════════════════════════════ */
const FBIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const IGIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" /></svg>;
const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const LIIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="2" /></svg>;

function SocialBtn({ href, label, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 40, height: 40, borderRadius: 10, background: hov ? "var(--gold)" : "rgba(255,255,255,0.06)", border: `1px solid ${hov ? "var(--gold)" : "rgba(201,168,76,0.25)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: hov ? "var(--ink)" : "var(--gold)", textDecoration: "none", transition: "all 0.25s", transform: hov ? "translateY(-2px)" : "none", flexShrink: 0 }}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM CARDS
═══════════════════════════════════════════════════════════════════════════ */
function LeadershipCard({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", borderRadius: 20, overflow: "hidden", width: 280, flexShrink: 0, boxShadow: hov ? "0 24px 60px rgba(0,0,0,0.4)" : "0 4px 16px rgba(0,0,0,0.2)", border: `1px solid ${hov ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.15)"}`, transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", transform: hov ? "translateY(-6px)" : "none", cursor: "default", backdropFilter: "blur(8px)" }}>
      <div style={{ height: 200, background: "linear-gradient(135deg, #01044A, #0c1870)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.06, backgroundImage: "radial-gradient(circle at 30% 70%, #C9A84C 0%, transparent 60%)" }} />
        <div style={{ width: 150, height: 175, overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative" }}>
          <Avatar name={member.name} photo={member.photo} size={150} />
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 4 }}>{member.role}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{member.note}</div>
      </div>
    </div>
  );
}

function ManagementCard({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: `1px solid ${hov ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.12)"}`, transition: "all 0.3s ease", transform: hov ? "translateY(-4px)" : "none", cursor: "default", backdropFilter: "blur(8px)" }}>
      <div style={{ height: 130, background: "linear-gradient(135deg, #01044A, #142540)", display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.07, backgroundImage: "radial-gradient(circle at 70% 30%, #C9A84C 0%, transparent 60%)" }} />
        <div style={{ width: 96, height: 110, overflow: "hidden", borderRadius: "10px 10px 0 0", position: "relative" }}>
          <Avatar name={member.name} photo={member.photo} size={96} />
        </div>
      </div>
      <div style={{ padding: "14px 14px 16px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 15, fontWeight: 700, color: "#fff", marginBottom: 4, lineHeight: 1.3 }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{member.role}</div>
        <div style={{ display: "inline-block", background: "rgba(201,168,76,0.1)", borderRadius: 20, padding: "2px 10px", fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(255,255,255,0.45)", fontWeight: 500, border: "1px solid rgba(201,168,76,0.2)" }}>{member.dept}</div>
      </div>
    </div>
  );
}

function EngineerRow({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)", border: `1px solid ${hov ? "rgba(201,168,76,0.4)" : "rgba(201,168,76,0.1)"}`, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 13, transition: "all 0.3s ease", transform: hov ? "translateX(5px)" : "none", cursor: "default", backdropFilter: "blur(6px)" }}>
      <div style={{ position: "relative" }}>
        <Avatar name={member.name} photo={member.photo} size={48} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: "#10b981", border: "2px solid var(--bg-deep)" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(201,168,76,0.7)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.role}</div>
      </div>
      <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", flexShrink: 0, opacity: hov ? 1 : 0.25, transition: "opacity 0.3s" }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CAREER FORM
═══════════════════════════════════════════════════════════════════════════ */
function CareerForm({ careers }) {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", position: "", cvLink: "", startDate: "" });
  const [errors, setErrors] = useState({});
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  const isValidUrl = s => { try { new URL(s); return true; } catch { return false; } };
  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (!form.phone.trim()) e.phone = "Required";
    if (!form.position) e.position = "Select a position";
    if (!form.cvLink.trim()) e.cvLink = "Paste your CV link";
    else if (!isValidUrl(form.cvLink)) e.cvLink = "Must be a valid URL";
    if (!form.startDate) e.startDate = "Required";
    return e;
  };
  const submit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSending(true); setSendError("");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        firstName: form.firstName, lastName: form.lastName,
        fullName: `${form.firstName} ${form.lastName}`,
        email: form.email, phone: form.phone, position: form.position,
        cvLink: form.cvLink, startDate: form.startDate, reply_to: form.email,
      }, EMAILJS_PUBLIC_KEY);
      setSubmitted(true);
    } catch { setSendError("Failed to send. Email us directly: hr@alaghagroup.com"); }
    finally { setSending(false); }
  };
  const set = (k, v) => { setForm(p => ({ ...p, [k]: v })); setErrors(p => ({ ...p, [k]: "" })); };

  if (submitted) return (
    <div style={{ textAlign: "center", padding: "48px 24px" }}>
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-dk))", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "var(--ink)" }}>✓</div>
      <div style={{ fontFamily: "var(--f-display)", fontSize: 24, color: "var(--ink)", fontWeight: 700, marginBottom: 8 }}>Application Received</div>
      <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "#888", lineHeight: 1.7 }}>Our HR team will respond within 5 business days.</div>
    </div>
  );

  const IS = k => ({ width: "100%", background: focused === k ? "#fff" : "#f9f8f5", border: `1px solid ${errors[k] ? "#e74c3c" : focused === k ? "var(--gold)" : "#e8e3d8"}`, color: "#111", padding: "11px 13px", fontFamily: "var(--f-body)", fontSize: 14, outline: "none", borderRadius: 8, transition: "all 0.2s", boxSizing: "border-box" });
  const LS = { display: "block", fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 6 };
  const ES = { fontFamily: "var(--f-body)", fontSize: 11, color: "#e74c3c", marginTop: 5 };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div><label style={LS}>First name</label><input value={form.firstName} onChange={e => set("firstName", e.target.value)} onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")} placeholder="John" style={IS("firstName")} />{errors.firstName && <div style={ES}>{errors.firstName}</div>}</div>
        <div><label style={LS}>Last name</label><input value={form.lastName} onChange={e => set("lastName", e.target.value)} onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")} placeholder="Doe" style={IS("lastName")} />{errors.lastName && <div style={ES}>{errors.lastName}</div>}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div><label style={LS}>Email</label><input type="email" value={form.email} onChange={e => set("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} placeholder="john@example.com" style={IS("email")} />{errors.email && <div style={ES}>{errors.email}</div>}</div>
        <div><label style={LS}>Phone</label><input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)} onFocus={() => setFocused("phone")} onBlur={() => setFocused("")} placeholder="+971 5X XXX XXXX" style={IS("phone")} />{errors.phone && <div style={ES}>{errors.phone}</div>}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
        <div>
          <label style={LS}>Position</label>
          <select value={form.position} onChange={e => set("position", e.target.value)} onFocus={() => setFocused("position")} onBlur={() => setFocused("")} style={{ ...IS("position"), cursor: "pointer" }}>
            <option value="">Select a role…</option>
            {careers.map(c => <option key={c.role} value={c.role}>{c.role}</option>)}
          </select>
          {errors.position && <div style={ES}>{errors.position}</div>}
        </div>
        <div><label style={LS}>Available from</label><input type="date" value={form.startDate} onChange={e => set("startDate", e.target.value)} onFocus={() => setFocused("startDate")} onBlur={() => setFocused("")} style={IS("startDate")} />{errors.startDate && <div style={ES}>{errors.startDate}</div>}</div>
      </div>
      <div style={{ marginBottom: 22 }}>
        <label style={LS}>CV / Resume Link (Google Drive, Dropbox, etc.)</label>
        <input type="url" value={form.cvLink} onChange={e => set("cvLink", e.target.value)} onFocus={() => setFocused("cvLink")} onBlur={() => setFocused("")} placeholder="https://drive.google.com/file/d/your-cv" style={IS("cvLink")} />
        {errors.cvLink && <div style={ES}>{errors.cvLink}</div>}
        {form.cvLink && isValidUrl(form.cvLink) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, background: "#f4f1eb", borderRadius: 8, padding: "7px 12px" }}>
            <span style={{ fontSize: 14 }}>📎</span>
            <a href={form.cvLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--gold-dk)", fontWeight: 600, textDecoration: "none", wordBreak: "break-all" }}>{form.cvLink.length > 55 ? form.cvLink.slice(0, 55) + "…" : form.cvLink}</a>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "#10b981", marginLeft: "auto", flexShrink: 0 }}>✓ Valid</span>
          </div>
        )}
      </div>
      {sendError && <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontFamily: "var(--f-body)", fontSize: 12, color: "#e74c3c" }}>{sendError}</div>}
      <button onClick={submit} disabled={sending} className="btn-gold" style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
        {sending ? <><span style={{ width: 13, height: 13, border: "2px solid var(--ink)", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Sending…</> : "Submit Application →"}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   GROUP COMPANY CARD
═══════════════════════════════════════════════════════════════════════════ */
function GroupCard({ company, index = 0 }) {
  const [hov, setHov] = useState(false);
  const ref = useRef(null);
  const [cardState, setCardState] = useState("hidden-zoom");
  const [logoErr, setLogoErr] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardState("visible");
        } else {
          setCardState("hidden-zoom");
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-el is-${cardState} group-card-wrap`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        transitionDelay: cardState === "visible" ? `${index * 130}ms` : "0ms",
        boxShadow: hov
          ? "0 32px 70px rgba(0,0,0,0.55), 0 0 40px rgba(201,168,76,0.18), inset 0 1px 0 rgba(201,168,76,0.2)"
          : "0 8px 32px rgba(0,0,0,0.3)",
        cursor: "default",
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 22, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: hov ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.22) 0%, transparent 70%)", top: -40, right: -40, animation: "orb 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)", bottom: 20, left: -20, animation: "orb 8s ease-in-out 1s infinite reverse" }} />
      </div>

      {hov && (
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)", zIndex: 2, pointerEvents: "none", animation: "scanLine 1.8s linear infinite" }} />
      )}

      <div className="group-card-inner"
        style={{ border: `1px solid ${hov ? "rgba(201,168,76,0.55)" : "rgba(201,168,76,0.18)"}`, borderRadius: 22, padding: "36px 30px", background: hov ? "rgba(10,16,60,0.95)" : "rgba(4,8,36,0.88)", backdropFilter: "blur(14px)", transition: "border-color 0.4s ease, background 0.4s ease", position: "relative", overflow: "hidden" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div className="logo-ring">
            <div className="logo-ring-inner">
              {!logoErr ? (
                <img src={logo} alt="Al Agha Group Logo" onError={() => setLogoErr(true)}
                  style={{ width: "88%", height: "88%", objectFit: "contain", filter: hov ? "drop-shadow(0 0 10px rgba(201,168,76,0.7)) brightness(1.1)" : "drop-shadow(0 0 5px rgba(201,168,76,0.3))", transition: "filter 0.4s ease" }} />
              ) : (
                <div style={{ fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 800, color: "var(--gold)", letterSpacing: "0.04em" }}>{company.abbr}</div>
              )}
            </div>
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.28)", borderRadius: 20, padding: "5px 14px" }}>
            Est. {company.year}
          </div>
        </div>

        <div style={{ fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 700, color: hov ? "#fff" : "rgba(255,255,255,0.92)", marginBottom: 10, lineHeight: 1.3, transition: "color 0.35s ease" }}>{company.name}</div>

        <div style={{ overflow: "hidden", marginBottom: 14, height: 2 }}>
          <div style={{ height: 2, background: hov ? "linear-gradient(90deg, var(--gold), var(--gold-lt), transparent)" : "linear-gradient(90deg, rgba(201,168,76,0.45), transparent)", borderRadius: 2, width: "100%", transition: "background 0.4s ease" }} />
        </div>

        <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: hov ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.48)", marginBottom: 20, lineHeight: 1.75, transition: "color 0.35s ease" }}>{company.focus}</div>

        <div style={{ fontFamily: "var(--f-display)", fontSize: 15, color: hov ? "rgba(201,168,76,0.8)" : "rgba(201,168,76,0.45)", fontStyle: "italic", direction: "rtl", textAlign: "right", transition: "color 0.4s ease", paddingTop: 16, borderTop: `1px solid rgba(201,168,76,${hov ? "0.2" : "0.1"})` }}>
          {company.arabic}
        </div>

        <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, background: "linear-gradient(135deg, transparent 50%, rgba(201,168,76,0.08) 50%)", borderRadius: "0 0 22px 0", opacity: hov ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ③ CERTIFICATION MODAL
═══════════════════════════════════════════════════════════════════════════ */
function CertModal({ cert, onClose }) {
  // Close on overlay click or Escape key
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-box" onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div style={{ marginBottom: 24, paddingRight: 40 }}>
          <span className="eyebrow" style={{ marginBottom: 6, display: "block" }}>Certification</span>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
            {cert.name}
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 6 }}>
            {cert.desc}
          </div>
        </div>

        {/* Certificate image area */}
        <div style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(201,168,76,0.2)",
          borderRadius: 14,
          overflow: "hidden",
          minHeight: 280,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}>
          {cert.image ? (
            <img
              src={cert.image}
              alt={`${cert.name} certificate`}
              style={{ width: "100%", height: "auto", display: "block", maxHeight: 400, objectFit: "contain" }}
            />
          ) : (
            /* Placeholder when no image is provided */
            <div style={{ textAlign: "center", padding: "48px 32px" }}>
              <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.4 }}>📜</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>
                {cert.name}
              </div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>
                Certificate image will appear here.<br />
                Add the image path to the CERTIFICATIONS data array.
              </div>
              {/* Gold divider */}
              <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "20px auto 0" }} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--gold)", fontSize: 18 }}>✓</span>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.5 }}>
            Al Agha Group holds valid {cert.name} certification, demonstrating our commitment to {cert.desc.toLowerCase()}.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION / SECTION HEADER
═══════════════════════════════════════════════════════════════════════════ */
function Section({ id, children, geoVariant, lightBg = false, style = {} }) {
  return (
    <section id={id} style={{ position: "relative", overflow: "hidden", background: lightBg ? "var(--surface)" : "transparent", ...style }}>
      {!lightBg && geoVariant && <GeoBg variant={geoVariant} />}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, light = false, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 64 }}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title"
        style={{ fontSize: "clamp(2rem,4vw,3.4rem)", marginTop: 14, color: light ? "var(--ink)" : "#fff", maxWidth: center ? 700 : "none", margin: center ? "14px auto 0" : "14px 0 0" }}
        dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: light ? "#888" : "rgba(255,255,255,0.55)", maxWidth: 540, margin: "16px auto 0", lineHeight: 1.8 }}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */
const NAV = ["Home", "Services", "Projects", "Career", "Clients", "Team", "About"];

const ALL_SERVICES = [
  { icon: "🏛️", title: "GYPSUM FALSE CEILING", desc: "We are offering services for Gypsum false ceiling works such as, regular false ceiling works (Wet and Dry Areas), partitions, bulkheads, 60 x 60 cm false ceiling tiles, Suspended ceiling works that are lightweight, sound insulated, fire resistance, soft and thermally insulated. We are experienced in the field of False Ceiling and we are focused on achieving professional goals and customer's satisfactions." },
  { icon: "✨", title: "GRC & GRG DECORATIVE", desc: "We are offering GRC & GRG Decorative Works for Villas, Mosque, Buildings, etc. That used for interior and exterior decorations such as GRG ceiling panels, GRG walls, GRG domes, GRC Moldings, GRC Decorative Panels, GRC Decorative Column etc. Based on our Main Contractor / client's approved layouts, designs and elevations details." },
  { icon: "🧱", title: "CLADDING & PARTITION", desc: "We are offering Cladding & Partition Gypsum Works for Villas, Mosque, Buildings, etc. That used for interior and exterior decorations such as gypsum dry wall, GRG ceiling panels, GRG walls, GRG domes, GRC Moldings, GRC Decorative Panels, GRC Decorative Column etc. Based on our Main Contractor / client's approved layouts, designs and elevation details." },
  { icon: "🏠", title: "INTERIOR WORKS", desc: "We offer Innovative and creative designs for Interior Works according to client needs and satisfactions. We also provide an exceptional service at every level of the project including overall project management of your interior design changes and a very strong attention to details." },
  { icon: "🎨", title: "PAINT WORKS", desc: "We are providing all kinds of decorative and standard paint works such as base coats; primer, first coat, Finish Coat; flat, eggshell, gloss and satin, Water-based and solvent-based paints, Specialty paints; bath room or kitchen paints, floor paint, metal paint, traditional paints, Painting a room; woodwork, walls and ceilings, floors." },
];

const ALL_PROJECTS = [
  { img: projDubaiCreek, title: "Dubai Creek Harbour Bridge District" },
  { img: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080", title: "Hungary Pavilion — Expo 2020 Dubai" },
  { img: projTownSquare, title: "Town Square — UNA Apartments" },
  { img: projBeach, title: "EMAAR Beachfront — Sunrise Bay" },
  { img: projBeachfront, title: "Al Fatan Tower" },
  { img: projCity, title: "Park Ridge" },
];

const STATS = [
  { val: "2008", label: "ESTABLISHED" },
  { val: "500+", label: "EMPLOYEES" },
  { val: "100+", label: "MAJOR PROJECTS" },
  { val: "15+", label: "YEARS EXCELLENCE" },
];

// ③ Each cert can optionally have an `image` property pointing to an imported cert image.
// e.g. import certIso9001 from "./certimg/iso9001.jpg"; then add: image: certIso9001
const CERTIFICATIONS = [
  { name: "ISO 9001:2015", desc: "Quality Management", image: cert1 },
  { name: "ISO 14001:2015", desc: "Environmental Mgmt", image: cert2 },
  { name: "ISO 45001-2018", desc: "Occupational Safety", image: cert3 },
  { name: "ISO 9001-2015", desc: "Quality Assurance", image: cert4 },
  { name: "ISO 14001-2015", desc: "Business Excellence", image: cert5 },
  { name: "ISO 45001-2018", desc: "Best Practices", image: cert6 },
];

const SLIDER_IMAGES = [
  { url: "https://cloud.famproperties.com/project/large/mulberry-at-park-heights-342681-124728.jpg", caption: "Mulberry at Park Heights — Dubai Hills" },
  { url: "https://www.299.com/images/858872grand-bleu-tower-hero.jpg", caption: "Grand Bleu Tower — Dubai Marina" },
  { url: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080", caption: "Hungary Pavilion — Expo 2020 Dubai" },
];

const CLIENTS_DATA = {
  clients: [
    { name: "EMAAR Properties", src: clientEmaar },
    { name: "DAMAC Development", src: clientDamac },
    { name: "Dubai Properties", src: clientDubaiProperties },
    { name: "Emirates Airlines", src: clientEmirates },
    { name: "French Bakery", src: clientFrenchBakery },
    { name: "Dubai Municipality", src: clientDubaiMunicipality },
    { name: "Aurora Real Estate", src: clientAurora },
    { name: "Abanos Interior Fit-Out & Joinery", src: clientAbanos },
    { name: "NAFFCO", src: clientNaffco },
    { name: "IDAMA Facilities Management Solutions", src: clientIdama },
    { name: "Horton Tech Interiors", src: clientHorton },
    { name: "JC MACLEAN", src: clientJcMaclean },
    { name: "Nexus Intelligence", src: clientNexus },
    { name: "FAM HOLDING", src: clientFamHolding },
    { name: "Bin Ham Group", src: clientBinHam },
    { name: "Dubai Investments Real Estate", src: clientDubaiInvestments },
    { name: "Dubai Islamic Bank", src: clientDib },
    { name: "Mohammed Bin Rashid Housing Est.", src: clientMbrHousing },
  ],
  consultants: [
    { name: "AL SHANDAGHA MUSEUM", src: consultantAlShandagha },
    { name: "Renders Engineering Consultants", src: consultantRenders },
    { name: "AECOM", src: consultantAecom },
    { name: "Eng. Adnan Saffarini Office", src: consultantSaffarini },
    { name: "Shadid Engineering Consultants", src: consultantShadid },
    { name: "Al Gurg Consultants", src: consultantAlGurg },
    { name: "KMC Management Consultants", src: consultantKmc },
    { name: "RMJM", src: consultantRmjm },
    { name: "SSH", src: consultantSsh },
    { name: "NEB", src: consultantNeb },
  ],
  contractors: [
    { name: "Dubai Properties", src: contractorDubaiProperties },
    { name: "BHC UAE National Company", src: contractorBhcUae },
    { name: "ECC", src: contractorEcc },
    { name: "Dubai Civil Engineering", src: contractorDubaiCivilEng },
    { name: "Reem Capital Contracting LLC", src: contractorReemCapital },
    { name: "ARCHGROUP", src: contractorArchgroup },
    { name: "UNEC United Engineering Construction", src: contractorUnec },
    { name: "LACASA Architects & Engineering Consultants", src: contractorLacasa },
    { name: "A2Z Architectural Engineering Consultancies", src: contractorA2z },
    { name: "Mohammed Bin Rashid Housing Est.", src: contractorMbrHousing },
    { name: "ABDUL RAHIM ARCHITECTURE CONSULTANTS", src: contractorAbdulRahim },
    { name: "BHG", src: contractorBhg },
    { name: "CSCEC", src: contractorCscec },
    { name: "Dewan Architects + Engineers", src: contractorDewan },
    { name: "ENGINEERING CONSORTIUM", src: contractorEngConsortium },
    { name: "CONIN INCORPORATED CONSULTANT", src: contractorConin },
    { name: "CITY ENGINEERING", src: contractorCityEngineering },
    { name: "EXPO 2020 DUBAI UAE", src: contractorExpo2020 },
    { name: "TAV CONSTRUCTION", src: contractorTav },
    { name: "AL TURATH AL ASEEL CONTRACTING LLC", src: contractorAlTurath },
  ],
};

const CAREERS = [
  { role: "Developer", loc: "Dubai, UAE", type: "Full-time", dept: "Operations" },
  { role: "Product Manager", loc: "Dubai, UAE", type: "Full-time", dept: "Engineering" },
  { role: "Graphic Designer", loc: "Dubai, UAE", type: "Full-time", dept: "Design" },
  { role: "UX Expert", loc: "Dubai, UAE", type: "Contract", dept: "HSE" },
];

const CHAIRMAN_MESSAGE = {
  name: "Engr. Abdul Karim Ali Agha",
  role: "Chairman",
  message: "When you care about your team, show them love and treat them as your own family; they will never let you down and will always give their best. This is the secret of our success.",
  photo: chairmanPhoto,
};

const LEADERSHIP = [
  { name: "Abdul Karim Ali Agha", role: "Managing Director", note: "Founder & Group Chairman", photo: chairmanPhoto },
  { name: "Khalid Ali Agha", role: "Projects Director", note: "Strategic Operations Lead", photo: projectsDirectorPhoto },
];

const MANAGEMENT = [
  { name: "Abdulhamid AlAbrch", role: "Technical Manager", dept: "Engineering", photo: technicalManagerPhoto },
  { name: "Irashad Ahmad Islam", role: "HR Manager", dept: "Human Resources", photo: hrManagerPhoto },
  { name: "Sayedur Rahman", role: "Project Manager", dept: "Operations", photo: projectManagerPhoto },
  { name: "Hesham Abouzeid", role: "HR Officer", dept: "Human Resources", photo: hrOfficerPhoto },
  { name: "M Taha Ali Agha", role: "P.R.O. Manager", dept: "Administration", photo: proManagerPhoto },
];

const ENGINEERS = [
  { name: "Olga Regala", role: "Proposal & Estimating Engineer", dept: "Commercial", photo: proposalManagerPhoto },
  { name: "Omar Ibrahim", role: "Accounting Manager", dept: "Finance", photo: accountingManagerPhoto },
  { name: "Abdelkader Mouine", role: "Accountant", dept: "Finance", photo: accountantPhoto },
  { name: "Fayaz Hyder Ali", role: "Senior Purchasing Officer", dept: "Procurement", photo: seniorPurchasingOfficerPhoto },
  { name: "Nour Al Hayek", role: "P.R.O.", dept: "Administration", photo: proPhoto },
  { name: "Jannath TP", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto1 },
  { name: "Vishnupriya Mohan", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto2 },
  { name: "Waseem Arumanichola", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto3 },
  { name: "Aneesa Noushad", role: "Senior QS Engineer", dept: "Quantity Surveying", photo: qsPhoto4 },
  { name: "Mohamed Sana", role: "QS Engineer", dept: "Quantity Surveying", photo: qsPhoto5 },
  { name: "Shanoob Rasheed", role: "Senior Technical Engineer", dept: "Engineering", photo: technicalEngineerPhoto },
  { name: "Muhammed Irfan", role: "Architectural Designer", dept: "Design", photo: architectureDesignerPhoto },
  { name: "Vijesh Vijayan", role: "MEP Operations Manager", dept: "MEP", photo: mepPhoto },
  { name: "Shahzad Ahmad", role: "Electrical Engineer", dept: "MEP", photo: electricalEngineerPhoto },
  { name: "Sathish Jayaraman", role: "Mechanical Engineer", dept: "MEP", photo: mechanicalEngineerPhoto },
  { name: "Mohamed Javeed", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto1 },
  { name: "Muhammed Suhair", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto2 },
  { name: "Mohammed Firoz R.", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto3 },
  { name: "MUHAMMED FAYIZ N.P", role: "Project Site Engineer", dept: "Operations", photo: siteEngineerPhoto4 },
];

const GROUP_COMPANIES = [
  { abbr: "ADW", name: "Al Agha Decoration Works LLC", year: "2001", focus: "False Ceiling & Gypsum Decoration", arabic: "الآغا لأعمال الديكور" },
  { abbr: "ATS", name: "Al Agha Technical Services LLC", year: "2008", focus: "Interior Design & Fit-Out", arabic: "الآغا للخدمات الفنية" },
  { abbr: "ABC", name: "Al Agha Building Contracting LLC", year: "2008", focus: "Civil & MEP Works", arabic: "الآغا لمقاولات البناء" },
];

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function AlAghaGroup() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;

  // ③ Certification modal state
  const [activeCert, setActiveCert] = useState(null);

  // Scroll to section from Projects page
  useEffect(() => {
    if (!location.state?.scrollTo) return;
    const id = location.state.scrollTo;
    const attempt = (tries = 0) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else if (tries < 10) {
        setTimeout(() => attempt(tries + 1), 80);
      }
    };
    attempt();
  }, [location.state]);

  const scrollTo = id => {
    setMenu(false);
    setActive(id);
    const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const sections = NAV.map(label => ({
      label,
      el: document.getElementById(label.toLowerCase().replace(/\s+/g, "-")),
    })).filter(s => s.el);
    const onScroll = () => {
      const scrollMid = window.scrollY + window.innerHeight * 0.4;
      let current = "Home";
      for (const { label, el } of sections) {
        if (el.offsetTop <= scrollMid) current = label;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [clientTab, setClientTab] = useState("clients");
  const clientTabData = {
    clients: { label: "Clients (18)", data: CLIENTS_DATA.clients, badge: "CLIENT" },
    consultants: { label: "Consultants (10)", data: CLIENTS_DATA.consultants, badge: "CONSULTANT" },
    contractors: { label: "Contractors (20)", data: CLIENTS_DATA.contractors, badge: "CONTRACTOR" },
  };

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* ③ Certification modal portal */}
      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}

      <div style={{ color: "#fff", fontFamily: "var(--f-body)", background: "var(--bg-deep)", overflowX: "hidden" }}>
        <ReadingProgress />

        {/* Ambient floating shapes */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 600, height: 600, top: "-200px", left: "-200px", background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)", animation: "floatBg 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, bottom: "10%", right: "-100px", background: "radial-gradient(circle, rgba(12,24,112,0.6) 0%, transparent 70%)", animation: "floatBgReverse 22s ease-in-out infinite" }} />
        </div>

        {/* ══ NAV ══ */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(2,7,48,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 1px 0 rgba(201,168,76,0.1)" : "none", transition: "all 0.4s ease" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => scrollTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
              <img src={logo} alt="Al Agha Group Logo" style={{ width: 44, height: 44, objectFit: "contain", borderRadius: 8, flexShrink: 0 }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none", width: 44, height: 44, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, var(--gold-dk), var(--gold))", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 18, color: "var(--ink)" }}>AG</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 19, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.15 }}>Al Agha Group</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.8)" }}>of Companies</div>
              </div>
            </button>
            <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
              {NAV.map(l => (
                <button key={l} onClick={() => scrollTo(l)} className={`nav-btn${active === l ? " nav-active" : ""}`} style={{ color: active === l ? "var(--gold)" : "rgba(255,255,255,0.8)" }}>{l}</button>
              ))}
              <button className="btn-gold" style={{ padding: "10px 22px" }} onClick={() => scrollTo("Career")}>Join Us</button>
            </div>
            <button onClick={() => setMenu(o => !o)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", display: "none" }} className="mobile-menu-btn">
              {menu ? "✕" : "☰"}
            </button>
          </div>
          {menu && (
            <div style={{ background: "rgba(2,7,48,0.98)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
              {NAV.map(l => (
                <button key={l} onClick={() => scrollTo(l)} style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(201,168,76,0.08)", color: active === l ? "var(--gold)" : "rgba(255,255,255,0.75)", fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 500, padding: "15px 32px", textAlign: "left", cursor: "pointer" }}>{l}</button>
              ))}
            </div>
          )}
        </nav>

        {/* ══ HERO ══ */}
        <section id="home" style={{ minHeight: "100vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1800&q=80')", backgroundSize: "cover", backgroundPosition: "center" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(2,7,48,0.95) 0%, rgba(1,4,74,0.85) 45%, rgba(6,13,80,0.6) 100%)" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            <svg viewBox="0 0 1440 900" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="0" x2="400" y2="900" stroke="rgba(201,168,76,0.06)" strokeWidth="1" />
              <line x1="80" y1="0" x2="480" y2="900" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
              <polygon points="1100,0 1440,0 1440,480 1100,240" fill="rgba(201,168,76,0.03)" />
              <circle cx="1200" cy="200" r="300" fill="none" stroke="rgba(201,168,76,0.05)" strokeWidth="1" strokeDasharray="8 18" />
              <circle cx="1200" cy="200" r="200" fill="none" stroke="rgba(201,168,76,0.04)" strokeWidth="1" />
            </svg>
          </div>
          <div style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: 3, background: "linear-gradient(to bottom, transparent, var(--gold), transparent)" }} />
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "130px 36px 90px", position: "relative", zIndex: 1, width: "100%" }}>
            <div style={{ maxWidth: 700 }}>
              <div style={{ marginBottom: 28, animation: "fadeUp 0.8s 0.1s both" }}>
                <span style={{ background: "rgba(201,168,76,0.12)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(10px)", padding: "7px 18px", borderRadius: 40, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)" }}>
                  Est. 2008 · Dubai, UAE · Three Companies, One Vision
                </span>
              </div>
              <h1 style={{ fontFamily: "var(--f-display)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.02em", fontSize: "clamp(3rem,7.5vw,5.5rem)", color: "#fff", marginBottom: 28, animation: "fadeUp 0.9s 0.2s both" }}>
                BUILDING THE<br />
                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>FUTURE TOGETHER.</em>
              </h1>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 17, color: "rgba(255,255,255,0.7)", lineHeight: 1.8, maxWidth: 520, marginBottom: 44, animation: "fadeUp 1s 0.35s both" }}>
                Al Agha Group delivers world-class false ceiling, gypsum works, interior fit-out, and MEP services across the UAE — with trust and quality at the core of every project.
              </p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 1s 0.45s both" }}>
                <button className="btn-gold" style={{ padding: "14px 32px" }} onClick={() => navigate("/projects")}>View Our Projects</button>
                <button className="btn-outline-white" onClick={() => scrollTo("About")}>Our Story</button>
              </div>
            </div>
          </div>
          {/* ① SCROLL INDICATOR REMOVED — "Scroll" text + vertical line gone */}
        </section>

        {/* ══ STATS BAND ══ */}
        <Section geoVariant="b" style={{ padding: "70px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 24, alignItems: "center" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} dir="zoom">
                <AnimatedStat val={s.val} label={s.label} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ══ 4D BUILDING ══ */}
        <Section geoVariant="a" style={{ padding: "120px 36px" }}>
          <Building4D />
        </Section>

        {/* ══ GROUP COMPANIES ══ */}
        <Section id="group" geoVariant="c" style={{ padding: "100px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Three Companies, One Vision" title='The <em style="color:var(--gold);font-style:italic">Al Agha Group</em>' subtitle="A unified group delivering excellence across decoration, technical services, and building contracting." />
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
              {GROUP_COMPANIES.map((c, i) => <GroupCard key={c.abbr} company={c} index={i} />)}
            </div>
          </div>
        </Section>

        {/* ══ ABOUT ══ */}
        <Section id="about" geoVariant="b" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="grid-2">
            <Reveal dir="left">
              <span className="eyebrow">Who We Are</span>
              <h2 className="section-title" style={{ fontSize: "clamp(2.2rem,4vw,3.6rem)", margin: "16px 0 20px", color: "#fff" }}>
                A legacy built on<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>trust &amp; quality</em>
              </h2>
              <span className="divider-gold" style={{ marginBottom: 28 }} />
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 18, fontSize: 15 }}>
                Established in 2008 as a small gypsum false ceiling workshop, we have grown through the priceless efforts of our team to form the Al Agha Group of Companies — offering false ceiling, partition works, interior design, full fit-out, and MEP services.
              </p>
              <p style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.9, marginBottom: 40, fontSize: 14 }}>
                Our aim was to prove we can finalise any work without mistake or delay. Client satisfaction is our top priority; accuracy and dedication in execution is what distinguishes us from others.
              </p>

              {/* ③ Certifications — now clickable buttons that open a modal with certificate image */}
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 16 }}>
                  Certifications &amp; Accreditations
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <button
                      key={i}
                      className="cert-badge-btn"
                      onClick={() => setActiveCert(cert)}
                      title={`View ${cert.name} certificate`}
                    >
                      <span style={{ color: "var(--gold)", fontSize: 12 }}>✓</span>
                      <div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.04em" }}>{cert.name}</div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(255,255,255,0.35)" }}>{cert.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={120}>
              <ImageSlider images={SLIDER_IMAGES} height={500} />
            </Reveal>
          </div>
        </Section>

        {/* ══ SERVICES ══ */}
        <Section id="services" geoVariant="a" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="eyebrow">What We Build</span>
                  <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", marginTop: 14, color: "#fff" }}>
                    Our <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Services</em>
                  </h2>
                </div>
                {/* ④ btn-outline-gold hover FIXED via CSS — fills solid gold on hover */}
                <button className="btn-outline-gold" onClick={() => navigate("/services")}>View All Services →</button>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 20 }}>
              {ALL_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={(i % 3) * 55} dir="up">
                  <div className="svc-card">
                    <div style={{ fontSize: 36, marginBottom: 18 }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "var(--f-display)", fontSize: 22, fontWeight: 700, color: "#fff", marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ══ PROJECTS ══ */}
        <Section id="projects" geoVariant="c" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="eyebrow">Our Portfolio</span>
                  <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", marginTop: 14, color: "#fff" }}>
                    Featured <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Projects</em>
                  </h2>
                </div>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(360px,1fr))", gap: 20 }}>
              {ALL_PROJECTS.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 50} dir="zoom">
                  <div className="proj-card" style={{ height: 300 }}>
                    <img src={p.img} alt={p.title} style={{ height: "100%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,7,48,0.92) 0%, transparent 55%)", borderRadius: 16 }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 22px 20px" }}>
                      <div style={{ fontFamily: "var(--f-display)", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.title}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: 40 }}>
              <button className="btn-gold" style={{ padding: "14px 36px" }} onClick={() => navigate("/projects")}>Browse All 90+ Projects →</button>
            </div>
          </div>
        </Section>

        {/* ══ CLIENTS ══ */}
        <Section id="clients" geoVariant="a" style={{ padding: "110px 36px 80px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Trusted By" title='Our <em style="color:var(--gold);font-style:italic">Clients, Consultants &amp; Contractors</em>' />
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
                {Object.entries(clientTabData).map(([key, { label }]) => (
                  <button key={key} onClick={() => setClientTab(key)}
                    style={{ fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 24px", borderRadius: 8, border: `1px solid ${clientTab === key ? "var(--gold)" : "rgba(201,168,76,0.2)"}`, background: clientTab === key ? "var(--gold)" : "rgba(255,255,255,0.04)", color: clientTab === key ? "var(--ink)" : "rgba(255,255,255,0.6)", cursor: "pointer", transition: "all 0.25s", backdropFilter: "blur(6px)" }}>
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 16 }} className="grid-6">
              {clientTabData[clientTab].data.map((item, i) => (
                <Reveal key={`${clientTab}-${i}`} delay={(i % 6) * 40} dir="zoom">
                  <ClientImgCard name={item.name} src={item.src} badge={clientTabData[clientTab].badge} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ══ CAREER ══ */}
        <Section id="career" geoVariant="b" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Join Our Team" title='Build your <em style="color:var(--gold);font-style:italic">Career</em>' subtitle="Join a team where your skills drive landmark developments across the UAE." />
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "start" }} className="grid-2">
              <div>
                <Reveal dir="left">
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite", boxShadow: "0 0 8px #10b981" }} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" }}>{CAREERS.length} open positions</span>
                  </div>
                </Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {CAREERS.map((c, i) => (
                    <Reveal key={c.role} delay={i * 65} dir="left">
                      <div className="career-row">
                        <div>
                          <div style={{ fontFamily: "var(--f-display)", fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{c.role}</div>
                          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>📍 {c.loc}</span>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)" }}>{c.type}</span>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.07)", padding: "2px 8px", borderRadius: 4 }}>{c.dept}</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal delay={100} dir="right">
                <div style={{ border: "1px solid var(--border)", padding: "40px", borderRadius: 20, background: "#fff", boxShadow: "0 4px 40px rgba(0,0,0,0.3)" }}>
                  <span className="eyebrow" style={{ marginBottom: 8, display: "block" }}>Submit your application</span>
                  <h3 style={{ fontFamily: "var(--f-display)", fontSize: 28, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Apply Now</h3>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "#888", marginBottom: 28, lineHeight: 1.6 }}>Our HR team will respond within 5 business days.</p>
                  <CareerForm careers={CAREERS} />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ══ TEAM ══ */}
        <Section id="team" geoVariant="a" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="The People Behind Our Work" title='Meet the <em style="color:var(--gold);font-style:italic">Team</em>' subtitle="Dedicated professionals committed to excellence across every discipline." />
            </Reveal>

            <div style={{ marginBottom: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Leadership</span>
                <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.1)" }} />
              </div>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
                {LEADERSHIP.map((m, i) => (
                  <Reveal key={m.name} delay={i * 100} dir="zoom">
                    <LeadershipCard member={m} />
                  </Reveal>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Management</span>
                <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.1)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(190px,1fr))", gap: 18 }}>
                {MANAGEMENT.map((m, i) => (
                  <Reveal key={m.name} delay={(i % 4) * 55} dir="up">
                    <ManagementCard member={m} />
                  </Reveal>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Engineering &amp; Operations</span>
                <div style={{ flex: 1, height: 1, background: "rgba(201,168,76,0.1)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", gap: 12 }}>
                {ENGINEERS.map((m, i) => (
                  <Reveal key={m.name} delay={(i % 6) * 35} dir="up">
                    <EngineerRow member={m} />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══ CHAIRMAN'S MESSAGE ══ */}
        <Section geoVariant="c" style={{ padding: "110px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Chairman's Message" title='A Word From Our <em style="color:var(--gold);font-style:italic">Chairman</em>' />
            </Reveal>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <Reveal>
                <div style={{ border: "1px solid rgba(201,168,76,0.2)", padding: "52px", position: "relative", borderRadius: 20, background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)" }}>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 110, lineHeight: 0.8, color: "rgba(201,168,76,0.08)", position: "absolute", top: 20, left: 28, fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>"</div>
                  <p style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.15rem,2vw,1.6rem)", fontWeight: 500, fontStyle: "italic", color: "rgba(255,255,255,0.88)", lineHeight: 1.65, textAlign: "center", position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
                    "{CHAIRMAN_MESSAGE.message}"
                  </p>
                  <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(201,168,76,0.12)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18 }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(201,168,76,0.4)", flexShrink: 0 }}>
                      <Avatar name={CHAIRMAN_MESSAGE.name} photo={CHAIRMAN_MESSAGE.photo} size={60} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--f-display)", fontSize: 19, color: "#fff", fontWeight: 700 }}>{CHAIRMAN_MESSAGE.name}</div>
                      <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{CHAIRMAN_MESSAGE.role} · Al Agha Group</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ══ CTA ══ */}
        <Section geoVariant="b" style={{ padding: "90px 36px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
            <Reveal dir="zoom">
              <span className="eyebrow" style={{ marginBottom: 14, display: "block" }}>Ready to Build?</span>
              <h2 style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(2rem,4vw,3.2rem)", color: "#fff", marginBottom: 18 }}>
                Let's bring your vision to <em style={{ color: "var(--gold)", fontStyle: "italic" }}>life</em>
              </h2>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.75 }}>
                From false ceiling concepts to complete interior fit-out, Al Agha Group delivers results with integrity, craftsmanship, and a commitment to finishing on time.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+97142675229" className="btn-gold" style={{ padding: "14px 36px" }}>Call +971 4 267 5229</a>
                <button className="btn-outline-gold" style={{ padding: "14px 36px" }} onClick={() => scrollTo("Career")}>Join Our Team</button>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══ FOOTER ══ */}
        <footer style={{ background: "rgba(0,2,20,0.95)", borderTop: "1px solid rgba(201,168,76,0.1)", padding: "72px 36px 36px", position: "relative" }}>
          <GeoBg variant="c" />
          <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 48, marginBottom: 56 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <img src={logo} alt="Al Agha Group Logo" style={{ width: 50, height: 50, objectFit: "contain", borderRadius: 8, flexShrink: 0 }}
                    onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
                  <div style={{ display: "none", width: 42, height: 42, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, var(--gold-dk), var(--gold))", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 16, color: "var(--ink)" }}>AG</div>
                  <div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, color: "#fff" }}>Al Agha Group</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(201,168,76,0.7)" }}>of Companies</div>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.85, maxWidth: 260, marginBottom: 22 }}>
                  False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                </p>
                <div style={{ display: "flex", gap: 9 }}>
                  <SocialBtn href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook"><FBIcon /></SocialBtn>
                  <SocialBtn href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram"><IGIcon /></SocialBtn>
                  <SocialBtn href="https://wa.me/97142675229" label="WhatsApp"><WAIcon /></SocialBtn>
                  <SocialBtn href="https://linkedin.com/company/alaghagroup" label="LinkedIn"><LIIcon /></SocialBtn>
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Quick Links</h4>
                {NAV.map(l => (
                  <button key={l} onClick={() => scrollTo(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontFamily: "var(--f-body)", fontSize: 13, padding: "6px 0", cursor: "pointer", transition: "color 0.2s", textAlign: "left" }} onMouseEnter={e => e.target.style.color = "var(--gold)"} onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}>{l}</button>
                ))}
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Our Services</h4>
                {ALL_SERVICES.map(s => (
                  <div key={s.title} style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.3)", padding: "5px 0", lineHeight: 1.5 }}>{s.title}</div>
                ))}
              </div>

              {/* ⑤ Contact column — QR code moved to left side, side-by-side with map */}
              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contact</h4>
                {[
                  ["📍", "Office No. 201 & 202, Block A, Abraj Al Mamzar, Al Mamzar Area, Dubai, U.A.E. P.O.Box: 99525"],
                  ["📞", "+971 4 267 5229"],
                  ["📠", "+971 4 267 6629"],
                  ["✉️", "info@alaghagroup.com"],
                  ["🌐", "www.alaghagroup.com"],
                ].map(([icon, txt]) => (
                  <div key={txt} style={{ display: "flex", gap: 10, padding: "5px 0", fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>
                    <span style={{ flexShrink: 0 }}>{icon}</span><span>{txt}</span>
                  </div>
                ))}

                {/* ⑤ QR code LEFT + Map RIGHT — side-by-side layout */}
                <div style={{ marginTop: 18, display: "flex", gap: 14, alignItems: "flex-start" }}>
                  {/* QR code — LEFT side */}
                  <div style={{ flexShrink: 0 }}>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>SCAN QR CODE</div>
                    <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                      <img src={qrCodeImg} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                    </div>
                  </div>


                </div>

                {/* Full-width map below — larger view */}
                <div style={{ marginTop: 12, borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,168,76,0.15)", height: 120 }}>
                  <iframe
                    title="Al Agha Group Office Map Large"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115536.95256710752!2d55.19120299696603!3d25.18535093670777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5c89fbf4c7bf%3A0xeb51121eac30f9a!2sAbraj%20Al%20Mamzar%2C%20Block%20A!5e0!3m2!1sen!2sph!4v1781382895149!5m2!1sen!2sph"
                    width="100%" height="100%" style={{ border: "none", display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
              <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>© 2024 Al Agha Group of Companies · All rights reserved</span>
              <span style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,255,255,0.2)" }}>Privacy Policy · Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}