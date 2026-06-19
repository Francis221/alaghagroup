import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../alaghalogo.png";

// Automatically glob-import all project images in the directory

const projectImages = import.meta.glob("./projectimg/*.{png,jpg,jpeg,PNG,JPG,JPEG,webp}", { eager: true, import: "default" });

// ─── EXPLICIT IMAGE IMPORTS ──────────────────────────────────────────────────
import logo from "../alaghalogo.png";
import imgAAAAAA from "./AAAAAA.jpg";
import qrcodeImg from "./img/QRCODE.jpeg";

// ─── PROJECT IMAGE IMPORTS ───────────────────────────────────────────────────
import imgBeach from "./projectimg/beach.jpg";
import imgBeachfront from "./projectimg/beachfront.jpg";
import imgCity from "./projectimg/city.jpg";
import imgParkRidge from "./projectimg/Park-Ridge-2.jpg";
import imgWarehouse from "./projectimg/15465160233.png";
import imgHyati from "./projectimg/SITE -001.jpg";
import imgOudMetha from "./projectimg/Project Perspective.jpg";
import imgAlHamriya from "./projectimg/AL HAMRIYA & UM HURAIR 0138-0435.jpg";
import imgLabourAccom from "./projectimg/20181003_264-0338-Labor-camp-Muhaisnah-second-1024x576.jpg";
import imgCoralDeira from "./projectimg/coral-dubai-deira-hotel.jpg";
import imgPointTower from "./projectimg/the-point-14096_xl.jpg";
import imgJBR from "./projectimg/141217_366_JUMEIRAH-BEACH-RESIDENCE_AERIAL_zj-1536x1192.jpg";
import imgMarinaWharf1 from "./projectimg/marina-wharf-1618_xl.jpg";
import imgTorch from "./projectimg/R.jpg";
import img72Villas from "./projectimg/Capture4.png";
import imgIVQuattro from "./projectimg/Capture5.png";
import imgD101 from "./projectimg/DUBAIS_1.jpg";
import imgEmpireHeights from "./projectimg/1520077655140.jpg";
import imgAlBareeq from "./projectimg/01_Perspective__Al Bareeq Tower.jpg";
import imgHolidayInn from "./projectimg/Holiday Inn Hotel and Suites Dubai Science Park - Photo 03.jpg";
import imgMarinaWharf2 from "./projectimg/10208.jpg";
import imgBobyan from "./projectimg/bobyan-tower-1554_xl.jpg";
import imgMediaRotana from "./projectimg/424818958.jpg";
import imgAlNahda from "./projectimg/Capture 1.png";
import imgAlWatani from "./projectimg/Al-Watani-Residential-Development-Project.jpg";
import imgCitySeasons from "./projectimg/71683934.jpg";
import imgEFTO from "./projectimg/R (3).jpg";
import imgShatha from "./projectimg/Shatha-Tower-1.jpg";
import img122Villas from "./projectimg/WhatsApp Image 2017-09-24 at 1.01.27 PM.jpg";
import imgRemraam from "./projectimg/remraam-295214-121454.jpg";
import imgUoWD from "./projectimg/3shotRecovered-Recovered.jpg";
import imgBayCentral from "./projectimg/Untitled Design - 1 copy.jpg";
import imgIRise from "./projectimg/irise-tower-210391-101916.jpg";
import img23Marina from "./projectimg/Capture3.png";
import img25VillasFalcon from "./projectimg/Eastern-Residences-Image1.jpg";
import imgMirdiffHills from "./projectimg/1225 - c5c49ae8-4e0f-49d0-8f4b-b5b457fd9339.jpg";
import imgStellaMaris from "./projectimg/1275- 140826_853_Areal_Hig_FINAL-logo.jpg";
import imgAlFurjan from "./projectimg/pic1 (1).jpg";
import imgZabeel from "./projectimg/download (3).png";
import imgTH8 from "./projectimg/hotel-exterior.jpg";
import imgEatonPlace from "./projectimg/eaton-place-10254.jpg";
import imgKingdomSheba from "./projectimg/sheba_03_1920x1024.jpg";
import imgDujaTower from "./projectimg/download (3) (1).png";
import imgVantage from "./projectimg/download (4).png";
import imgMirdifHillsNorth from "./projectimg/download (1) (2).png";
import imgMulberry from "./projectimg/download (2) (1).png";
import imgRawda from "./projectimg/download (3) (2).png";
import imgAddressOpera from "./projectimg/the-address-residences-dubai-opera-9455_xl.jpg";
import imgUNA from "./projectimg/1649835984RD883.jpg";
import imgHyatiJVC from "./projectimg/download (2) (2).png";
import imgPortDeLaMer from "./projectimg/download (5).png";
import imgKalba from "./projectimg/download (6).png";
import imgTerhab from "./projectimg/download (1) (4).png";
import imgGulfTower from "./projectimg/gulf-tower.jpg";
import imgCreekHarbour from "./projectimg/R (1).jpg";
import imgBADR from "./projectimg/download (2) (3).png";
import imgAreej14 from "./projectimg/download (3) (4).png";
import imgGrandBleu from "./projectimg/1620744002_grandbleu1_result.jpg";
import imgDubaiProsecution from "./projectimg/download (2) (4).png";
import imgPlatinum2 from "./projectimg/PLATINUM 2.jpg";
import imgPlatinum1 from "./projectimg/PLATINUM 1.jpg";
import imgMiraOasis from "./projectimg/3731.jpg";
import imgSeaGate from "./projectimg/WhatsApp Image 2025-09-08 at 08.56.35_bdefc655.jpg";
import imgKempinski from "./projectimg/download (8).png";
import imgInnovationHub from "./projectimg/innovation-hub-4327_xl.jpg";
import imgDistrictOne from "./projectimg/download (2) (5).png";
import imgShamsTownhouses from "./projectimg/download (1) (6).png";
import imgAVA from "./projectimg/download (3) (5).png";
import imgHyatiH3 from "./projectimg/download (9).png";
import imgAnwaAria from "./projectimg/download (5) (1).png";
import imgChicTower from "./projectimg/download (7) (1).png";
import imgElegance from "./projectimg/download (8) (1).png";
import imgGreenside from "./projectimg/download (9) (1).png";
import imgPrimeHospital from "./projectimg/download (10).png";
import imgAddressBay from "./projectimg/download (11).png";
import imgAlMedif from "./projectimg/download (13).png";
import imgNadAlShiba from "./projectimg/download (14).png";
import imgSLS from "./projectimg/download (15).png";
import imgSkySpiral from "./projectimg/Sky-Spiral-Tower-Day-View-614x1024.png";
import imgParksideHills from "./projectimg/PARKSIDE_HILLS_IMAGE2-scaled.jpg";
import imgMarsaAlArab from "./projectimg/Marsa-Al-Arab-Exterior.jpg";
import imgMakan from "./projectimg/afssg.png";
import imgDPWorld from "./AAAAAA.jpg";
import imgVictoriaSchool from "./projectimg/59b0c1_3abb320e18504179a17880e6813489d0~mv2 (1).jpg";
import imgPlots8689 from "./projectimg/2834-ALG-86-ARC-M3-PRESPECTIVE3-3384450 (1).jpg";
import imgTechnoHub4 from "./projectimg/large_D5_Image_8_20230714_013430_342968d0e3 (1).png";
import imgWadiAlSafa from "./projectimg/Screenshot 2025-10-03 084111 (1).png";
import imgCreekBridge from "./projectimg/Screenshot 2025-10-03 102435.png";
import imgMAGJLT from "./projectimg/MAG JLT R3 VIEW B.jpg";
import imgSouthLiving from "./projectimg/South_Living.jpg";
import imgCostaCoffee from "./projectimg/Screenshot 2026-03-06 105307.png";
import imgMuhaisnahHousing from "./projectimg/SITE -001.jpg";
/* ─── SHARED CSS ─────────────────────────────────────────────────────────── */
const PAGE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&display=swap');

  :root {
    --gold: #C9A84C;
    --gold-dk: #a8883c;
    --gold-lt: #e0c068;
    --ink: #02071c;
    --bg-deep: #02071c;
    --bg-mid: #040b3a;
    --surface: #f5f3ef;
    --border: #e0d9cc;
    --f-display: 'Cormorant Garamond', 'Georgia', 'Times New Roman', serif;
    --f-body: 'DM Sans', 'Inter', 'Helvetica Neue', Arial, sans-serif;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg-deep); color: #fff; }
  ::selection { background: rgba(201,168,76,0.25); }

  /* ── Core animations ── */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes modalIn {
    from { opacity: 0; transform: scale(0.94) translateY(16px); }
    to   { opacity: 1; transform: none; }
  }
  @keyframes spin {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 8px #10b981; }
    50%       { opacity: 0.5; box-shadow: 0 0 16px #10b981; }
  }

  /* ── Image shimmer sweep ── */
  @keyframes shimmerSweep {
    0%   { transform: translateX(-120%) skewX(-15deg); }
    100% { transform: translateX(220%) skewX(-15deg); }
  }

  /* ── Gold pulse ring ── */
  @keyframes goldPulseRing {
    0%   { box-shadow: 0 0 0 0 rgba(201,168,76,0.55); }
    70%  { box-shadow: 0 0 0 10px rgba(201,168,76,0); }
    100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
  }

  /* ── Floating badge ── */
  @keyframes floatUp {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-5px); }
  }

  /* ── Particle drift ── */
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
    33%  { transform: translateY(-18px) translateX(8px) scale(1.1); opacity: 1; }
    66%  { transform: translateY(-8px) translateX(-6px) scale(0.9); opacity: 0.7; }
    100% { transform: translateY(0) translateX(0) scale(1); opacity: 0.6; }
  }

  /* ── Gradient border rotate ── */
  @keyframes borderRotate {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* ── Category pill pop ── */
  @keyframes pillPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.12); }
    100% { transform: scale(1); }
  }

  /* ── Card scan line ── */
  @keyframes scanLine {
    0%   { transform: translateY(-100%); opacity: 0.5; }
    100% { transform: translateY(400%); opacity: 0; }
  }

  /* ── Hero orb pulse ── */
  @keyframes orbPulse {
    0%, 100% { transform: scale(1); opacity: 0.05; }
    50%       { transform: scale(1.15); opacity: 0.09; }
  }

  /* ── Number count-up shimmer ── */
  @keyframes statShimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  /* ── Modal backdrop ripple ── */
  @keyframes backdropIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ── Stagger reveal ── */
  @keyframes staggerReveal {
    from { opacity: 0; transform: translateY(20px) scale(0.97); }
    to   { opacity: 1; transform: none; }
  }

  /* ── Underline draw ── */
  @keyframes underlineDraw {
    from { width: 0; opacity: 0; }
    to   { width: 100%; opacity: 1; }
  }

  /* Project card image wrapper */
  .proj-img-wrap {
    position: relative;
    overflow: hidden;
    height: 260px;
    background: #01044A;
  }

  /* Shimmer sweep overlay */
  .proj-img-wrap::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 35%,
      rgba(201,168,76,0.22) 50%,
      transparent 65%
    );
    transform: translateX(-120%) skewX(-15deg);
    z-index: 3;
    pointer-events: none;
  }
  .proj-card:hover .proj-img-wrap::before {
    animation: shimmerSweep 0.8s ease forwards;
  }

  /* Scan line effect on hover */
  .proj-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(201,168,76,0.08) 50%,
      transparent 100%
    );
    height: 40%;
    z-index: 4;
    pointer-events: none;
    transform: translateY(-100%);
    opacity: 0;
  }
  .proj-card:hover .proj-img-wrap::after {
    animation: scanLine 1.2s ease 0.1s forwards;
  }

  /* Gold pulse ring on hover */
  .proj-card:hover .proj-img-wrap {
    animation: goldPulseRing 0.75s ease;
  }

  /* Image itself */
  .proj-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition:
      transform 0.85s cubic-bezier(0.22,1,0.36,1),
      filter 0.5s ease;
    transform-origin: center center;
    will-change: transform;
  }
  .proj-card:hover .proj-img {
    transform: scale(1.1) translateY(-4px);
    filter: brightness(0.72) contrast(1.1) saturate(1.12);
  }

  /* Dark gradient overlay */
  .proj-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to top,
      rgba(2,7,48,0.94) 0%,
      rgba(2,7,48,0.3) 50%,
      transparent 75%
    );
    transition: opacity 0.45s ease;
    z-index: 2;
  }
  .proj-card:hover .proj-img-overlay {
    opacity: 0.97;
  }

  /* Gold frame corners that slide in from edges */
  .proj-img-frame {
    position: absolute;
    inset: 0;
    z-index: 4;
    pointer-events: none;
  }
  /* Top-left corner */
  .proj-img-frame::before {
    content: '';
    position: absolute;
    top: 12px; left: 12px;
    width: 0; height: 0;
    border-top: 2px solid var(--gold);
    border-left: 2px solid var(--gold);
    opacity: 0;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s,
                height 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s,
                opacity 0.3s ease 0.05s;
  }
  /* Bottom-right corner */
  .proj-img-frame::after {
    content: '';
    position: absolute;
    bottom: 12px; right: 12px;
    width: 0; height: 0;
    border-bottom: 2px solid var(--gold);
    border-right: 2px solid var(--gold);
    opacity: 0;
    transition: width 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s,
                height 0.4s cubic-bezier(0.22,1,0.36,1) 0.05s,
                opacity 0.3s ease 0.05s;
  }
  .proj-card:hover .proj-img-frame::before,
  .proj-card:hover .proj-img-frame::after {
    width: 28px;
    height: 28px;
    opacity: 0.9;
  }

  /* Category label that slides up from bottom on hover */
  .proj-cat-label {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    padding: 12px 16px;
    font-family: var(--f-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--gold);
    background: linear-gradient(to top, rgba(2,7,48,0.92), transparent);
    transform: translateY(100%);
    opacity: 0;
    transition: transform 0.4s cubic-bezier(0.22,1,0.36,1),
                opacity 0.3s ease;
    pointer-events: none;
  }
  .proj-card:hover .proj-cat-label {
    transform: translateY(0);
    opacity: 1;
  }

  /* Featured badge float */
  .feat-badge {
    animation: floatUp 3s ease-in-out infinite;
  }

  /* Card */
  .proj-card {
    border-radius: 16px;
    overflow: hidden;
    cursor: pointer;
    transition:
      box-shadow 0.45s cubic-bezier(0.22,1,0.36,1),
      border-color 0.3s ease,
      transform 0.45s cubic-bezier(0.22,1,0.36,1);
    border: 1px solid rgba(201,168,76,0.12);
    background: rgba(255,255,255,0.03);
    transform-style: preserve-3d;
    position: relative;
  }
  .proj-card:hover {
    box-shadow:
      0 32px 72px rgba(0,0,0,0.55),
      0 0 0 1px rgba(201,168,76,0.45),
      0 0 40px rgba(201,168,76,0.08);
    border-color: rgba(201,168,76,0.55);
    transform: translateY(-8px) rotateX(1.5deg);
  }

  /* Name strip */
  .proj-name-strip {
    padding: 18px 20px 22px;
    background: rgba(255,255,255,0.025);
    position: relative;
    overflow: hidden;
  }

  /* Animated gold underline */
  .proj-name-strip::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    height: 2px;
    width: 0;
    background: linear-gradient(90deg, var(--gold-dk), var(--gold-lt), var(--gold-dk));
    background-size: 200% 100%;
    transition: width 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .proj-card:hover .proj-name-strip::after {
    width: 100%;
    animation: statShimmer 1.5s linear infinite;
  }

  /* View overlay that appears on card hover */
  .proj-view-hint {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.7);
    z-index: 6;
    background: rgba(201,168,76,0.9);
    color: var(--ink);
    font-family: var(--f-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 8px 18px;
    border-radius: 30px;
    opacity: 0;
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      transform 0.4s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
  }
  .proj-card:hover .proj-view-hint {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  /* Nav */
  .nav-btn {
    background: none;
    border: none;
    font-family: var(--f-body);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    padding: 6px 2px;
    position: relative;
    transition: color 0.2s;
    letter-spacing: 0.03em;
  }
  .nav-btn::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transition: transform 0.28s ease;
    transform-origin: left;
  }
  .nav-btn:hover { color: var(--gold) !important; }
  .nav-btn:hover::after, .nav-btn.nav-active::after { transform: scaleX(1); }
  .nav-btn.nav-active { color: var(--gold) !important; }

  /* Buttons */
  .btn-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--gold-dk), var(--gold), var(--gold-lt));
    color: var(--ink);
    font-family: var(--f-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 12px 28px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.28s ease;
    box-shadow: 0 4px 20px rgba(201,168,76,0.25);
  }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 36px rgba(201,168,76,0.42);
  }

  /* Filter pills */
  .cat-pill {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    font-family: var(--f-body);
    font-size: 12px;
    font-weight: 500;
    padding: 7px 15px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.22s ease;
    white-space: nowrap;
    color: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .cat-pill:hover { border-color: var(--gold); color: var(--gold); transform: translateY(-1px); }
  .cat-pill.active {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    animation: pillPop 0.3s ease;
  }

  /* Pill scrollbar hide */
  .pill-bar { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
  .pill-bar::-webkit-scrollbar { display: none; }

  /* Hero orbs */
  .hero-orb {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201,168,76,0.12), transparent 70%);
    animation: orbPulse 6s ease-in-out infinite;
    pointer-events: none;
  }

  /* Floating particles */
  .particle {
    position: absolute;
    width: 3px;
    height: 3px;
    border-radius: 50%;
    background: var(--gold);
    pointer-events: none;
  }

  /* Stat shimmer text */
  .stat-val {
    background: linear-gradient(
      90deg,
      var(--gold-dk) 0%,
      var(--gold-lt) 40%,
      var(--gold) 60%,
      var(--gold-dk) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: statShimmer 3s linear infinite;
  }

  /* Responsive */
  @media (max-width: 900px) {
    .desktop-nav { display: none !important; }
    .mobile-toggle { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .filter-row { flex-direction: column !important; align-items: flex-start !important; }
    .project-grid { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .proj-img { transition: none !important; }
    .proj-card { transition: none !important; }
    .feat-badge { animation: none !important; }
    .proj-img-wrap::before, .proj-img-wrap::after { animation: none !important; }
    .stat-val { animation: none !important; -webkit-text-fill-color: var(--gold); }
    .hero-orb { animation: none !important; }
  }
`;

/* ─── CATEGORIES ─────────────────────────────────────────────────────────── */
const CATEGORIES = [
    "All",
    "False Ceiling & Partition",
    "Interior Design & Fit-Out",
    "MEP Works",
    "Civil Works",
];

/* ─── FALLBACK IMAGES ────────────────────────────────────────────────────── */
const FALLBACKS = [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=700&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=700&q=80",
    "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=700&q=80",
];

/* ─── PROJECTS ───────────────────────────────────────────────────────────── */
// NOTE: All image paths normalised to use "./" prefix consistently.
// id 83 was missing from original — slot intentionally skipped; no project data exists for it.
const PROJECTS = [
    { id: 1, name: "Beach House & Villas Fujairah", category: "False Ceiling & Partition", img: "./src/projectimg/beach.jpg", featured: true },
    { id: 2, name: "EMAAR Beachfront — Sunrise Bay, Dubai Harbour", category: "False Ceiling & Partition", img: "./src/projectimg/beachfront.jpg", featured: true },
    { id: 3, name: "City Engineering Office — Al Fatan Tower", category: "Interior Design & Fit-Out", img: "./src/projectimg/city.jpg", featured: true },
    { id: 4, name: "Park Ridge — Hadaeq Sheikh Mohammed Bin Rashid", category: "False Ceiling & Partition", img: "./src/projectimg/Park-Ridge-2.jpg", featured: true },
    { id: 5, name: "Warehouse — Al Sajaa Industrial Area", category: "Civil Works", img: "./src/projectimg/15465160233.png" },
    { id: 6, name: "Hyati Residence 2 — Block A, B, C", category: "False Ceiling & Partition", img: "./src/projectimg/SITE -001.jpg" },
    { id: 7, name: "2B+G+11 Commercial & Residential — Oud Metha", category: "Civil Works", img: "./src/projectimg/Project Perspective.jpg" },
    { id: 8, name: "G+3 Apartment Buildings — Al Hamriya", category: "Civil Works", img: "./src/projectimg/AL HAMRIYA & UM HURAIR 0138-0435.jpg" },
    { id: 9, name: "Labour Accommodation — Al Muhaisnah 2nd", category: "Civil Works", img: "./src/projectimg/20181003_264-0338-Labor-camp-Muhaisnah-second-1024x576.jpg", featured: true },
    { id: 10, name: "Coral Deira Hotel", category: "Interior Design & Fit-Out", img: "./src/projectimg/coral-dubai-deira-hotel.jpg" },
    { id: 11, name: "The Point Tower — Dubai Marina", category: "False Ceiling & Partition", img: "./src/projectimg/the-point-14096_xl.jpg" },
    { id: 12, name: "Jumeirah Beach Residence Tower", category: "False Ceiling & Partition", img: "./src/projectimg/141217_366_JUMEIRAH-BEACH-RESIDENCE_AERIAL_zj-1536x1192.jpg" },
    { id: 13, name: "Marina Wharf 1", category: "False Ceiling & Partition", img: "./src/projectimg/marina-wharf-1618_xl.jpg" },
    { id: 14, name: "Torch Tower", category: "False Ceiling & Partition", img: "./src/projectimg/R.jpg" },
    { id: 15, name: "72 Villas — Hydra Village, Shahama", category: "Civil Works", img: "./src/projectimg/Capture4.png" },
    { id: 16, name: "IV Quattro EMAAR — Business Bay", category: "Interior Design & Fit-Out", img: "./src/projectimg/Capture5.png" },
    { id: 17, name: "D101 G+8+HC — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./src/projectimg/DUBAIS_1.jpg" },
    { id: 18, name: "Empire Heights", category: "False Ceiling & Partition", img: "./src/projectimg/1520077655140.jpg" },
    { id: 19, name: "Al Bareeq Tower", category: "False Ceiling & Partition", img: "./src/projectimg/01_Perspective__Al Bareeq Tower.jpg" },
    { id: 20, name: "Holiday Inn Hotel & Suites — Dubai Science Park", category: "Interior Design & Fit-Out", img: "./src/projectimg/Holiday Inn Hotel and Suites Dubai Science Park - Photo 03.jpg", featured: true },
    { id: 21, name: "Marina Wharf 2 — 2B+G+27 Tower", category: "False Ceiling & Partition", img: "./src/projectimg/10208.jpg" },
    { id: 22, name: "Bobyan Tower", category: "False Ceiling & Partition", img: "./src/projectimg/bobyan-tower-1554_xl.jpg" },
    { id: 23, name: "Media Rotana Hotel", category: "Interior Design & Fit-Out", img: "./src/projectimg/424818958.jpg" },
    { id: 24, name: "2B+G+P+25 Tower — Al Nahda One", category: "False Ceiling & Partition", img: "./src/projectimg/Capture 1.png" },
    { id: 25, name: "Al Watani Residential Development", category: "Civil Works", img: "./src/projectimg/Al-Watani-Residential-Development-Project.jpg" },
    { id: 26, name: "City Seasons Hotel Burjman", category: "Interior Design & Fit-Out", img: "./src/projectimg/71683934.jpg" },
    { id: 27, name: "Emirates Flight Training Organization — DWC", category: "MEP Works", img: "./src/projectimg/R (3).jpg", featured: true },
    { id: 28, name: "Shatha Tower Renovation — Media City", category: "Interior Design & Fit-Out", img: "./src/projectimg/Shatha-Tower-1.jpg" },
    { id: 29, name: "122 Villas — Mirdif", category: "Civil Works", img: "./src/projectimg/WhatsApp Image 2017-09-24 at 1.01.27 PM.jpg" },
    { id: 30, name: "Remraam Residential Building", category: "False Ceiling & Partition", img: "./src/projectimg/remraam-295214-121454.jpg" },
    { id: 31, name: "Office Building G+6 — TECOM Site A (UoWD)", category: "Civil Works", img: "./src/projectimg/3shotRecovered-Recovered.jpg" },
    { id: 32, name: "Bay Central — Dubai Marina", category: "False Ceiling & Partition", img: "./src/projectimg/Untitled Design - 1 copy.jpg" },
    { id: 33, name: "I Rise Tower", category: "False Ceiling & Partition", img: "./src/projectimg/irise-tower-210391-101916.jpg" },
    { id: 34, name: "23 Marina", category: "False Ceiling & Partition", img: "./src/projectimg/Capture3.png" },
    { id: 35, name: "25 Villas — Falcon City", category: "Civil Works", img: "./src/projectimg/Eastern-Residences-Image1.jpg" },
    { id: 36, name: "Mirdiff Hills Development", category: "False Ceiling & Partition", img: "./src/projectimg/1225 - c5c49ae8-4e0f-49d0-8f4b-b5b457fd9339.jpg" },
    { id: 37, name: "Stella Maris — Dubai Marina", category: "False Ceiling & Partition", img: "./src/projectimg/1275- 140826_853_Areal_Hig_FINAL-logo.jpg", featured: true },
    { id: 38, name: "G+P+10 Residential — Al Furjan", category: "False Ceiling & Partition", img: "./src/projectimg/pic1 (1).jpg" },
    { id: 39, name: "Zabeel Ladies Club", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (3).png" },
    { id: 40, name: "TH8 Hotel — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./src/projectimg/hotel-exterior.jpg", featured: true },
    { id: 41, name: "Eaton Place — Jumeirah Village Circle", category: "False Ceiling & Partition", img: "./src/projectimg/eaton-place-10254.jpg" },
    { id: 42, name: "The Kingdom of Sheba", category: "Interior Design & Fit-Out", img: "./src/projectimg/sheba_03_1920x1024.jpg" },
    { id: 43, name: "Symphony Tower (Radisson Blu Waterfront)", category: "Interior Design & Fit-Out", img: "https://static.propsearch.ae/photos/dubai/buildings/symphony-towers-10803_xl.jpg", featured: true },
    { id: 44, name: "Duja Tower — Trade Center First", category: "False Ceiling & Partition", img: "./src/projectimg/download (3) (1).png" },
    { id: 45, name: "Vantage — Jumeirah Village Community", category: "False Ceiling & Partition", img: "./src/projectimg/download (4).png" },
    { id: 46, name: "Mirdif Hills — North Avenue", category: "False Ceiling & Partition", img: "./src/projectimg/download (1) (2).png" },
    { id: 47, name: "MBR Dubai Hills — Mulberry at Park Heights", category: "False Ceiling & Partition", img: "./src/projectimg/download (2) (1).png" },
    { id: 48, name: "Town Square — Rawda 1, 2, 3 & 4", category: "False Ceiling & Partition", img: "./src/projectimg/download (3) (2).png" },
    { id: 49, name: "The Address Residences Dubai Opera", category: "Interior Design & Fit-Out", img: "./src/projectimg/the-address-residences-dubai-opera-9455_xl.jpg", featured: true },
    { id: 50, name: "Town Square — UNA Apartments", category: "False Ceiling & Partition", img: "./src/projectimg/1649835984RD883.jpg" },
    { id: 51, name: "Hyati Residence 2 — JVC Townhouses", category: "False Ceiling & Partition", img: "./src/projectimg/download (2) (2).png" },
    { id: 52, name: "Port de la Mer Phase 2 — Jumeirah First", category: "False Ceiling & Partition", img: "./src/projectimg/download (5).png" },
    { id: 53, name: "Kalba Waterfront — Khor Kalba", category: "Civil Works", img: "./src/projectimg/download (6).png", featured: true },
    { id: 54, name: "Terhab Hotel & Tower", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (1) (4).png" },
    { id: 55, name: "Gulf Tower — Um Hurair 2nd", category: "False Ceiling & Partition", img: "./src/projectimg/gulf-tower.jpg" },
    { id: 56, name: "Dubai Creek Harbour — Summer 1D1", category: "False Ceiling & Partition", img: "./src/projectimg/R (1).jpg" },
    { id: 57, name: "BADR Project Phase 1 — Muhaisnah First", category: "Civil Works", img: "./src/projectimg/download (2) (3).png" },
    { id: 58, name: "Areej 1–4 — Muwaileh, Sharjah", category: "False Ceiling & Partition", img: "./src/projectimg/download (3) (4).png" },
    { id: 59, name: "Grand Bleu Tower — Emaar Beachfront", category: "False Ceiling & Partition", img: "./src/projectimg/1620744002_grandbleu1_result.jpg", featured: true },
    { id: 60, name: "Dubai Prosecution Building — Um Hurair", category: "MEP Works", img: "./src/projectimg/download (2) (4).png", featured: true },
    { id: 61, name: "Platinum 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./src/projectimg/PLATINUM 2.jpg" },
    { id: 62, name: "Platinum 1 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./src/projectimg/PLATINUM 1.jpg" },
    { id: 63, name: "Mira Oasis Townhouses — Reem Phase 2", category: "Civil Works", img: "./src/projectimg/3731.jpg" },
    { id: 64, name: "Sea Gate — Mina Rashid", category: "False Ceiling & Partition", img: "./src/projectimg/WhatsApp Image 2025-09-08 at 08.56.35_bdefc655.jpg", featured: true },
    { id: 65, name: "Kempinski Residences — Dubai Healthcare City", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (8).png", featured: true },
    { id: 66, name: "Innovation Hub Phase 2 — Silicon Oasis", category: "MEP Works", img: "./src/projectimg/innovation-hub-4327_xl.jpg" },
    { id: 67, name: "District One Private Mansion — Meydan", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (2) (5).png" },
    { id: 68, name: "Shams Townhouses — Town Square", category: "Civil Works", img: "./src/projectimg/download (1) (6).png" },
    { id: 69, name: "AVA — Palm Jumeirah", category: "False Ceiling & Partition", img: "./src/projectimg/download (3) (5).png", featured: true },
    { id: 70, name: "Hyati H3 — Al Barsha South Fourth", category: "False Ceiling & Partition", img: "./src/projectimg/download (9).png" },
    { id: 71, name: "Anwa Aria Tower — Dubai Maritime City", category: "False Ceiling & Partition", img: "./src/projectimg/download (5) (1).png", featured: true },
    { id: 72, name: "Chic Tower — Business Bay", category: "False Ceiling & Partition", img: "./src/projectimg/download (7) (1).png" },
    { id: 73, name: "Elegance Tower", category: "False Ceiling & Partition", img: "./src/projectimg/download (8) (1).png" },
    { id: 74, name: "Greenside Residence — Dubai Hills Estate", category: "False Ceiling & Partition", img: "./src/projectimg/download (9) (1).png" },
    { id: 75, name: "Prime Heart & Lung Hospital — Al Jadaf", category: "MEP Works", img: "./src/projectimg/download (10).png", featured: true },
    { id: 76, name: "Address The Bay — Emaar Beachfront", category: "False Ceiling & Partition", img: "./src/projectimg/download (11).png", featured: true },
    { id: 77, name: "Mixed Use — Al Medif, Khorfakkan", category: "Civil Works", img: "./src/projectimg/download (13).png" },
    { id: 78, name: "Nad Al Shiba School — Phase 1", category: "Civil Works", img: "./src/projectimg/download (14).png" },
    { id: 79, name: "SLS Residence — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (15).png", featured: true },
    { id: 80, name: "Sky Spiral Tower (Biltmore Sufouh)", category: "False Ceiling & Partition", img: "./src/projectimg/Sky-Spiral-Tower-Day-View-614x1024.png", featured: true },
    { id: 81, name: "Parkside Hills — Dubai Hills Estate", category: "False Ceiling & Partition", img: "./src/projectimg/PARKSIDE_HILLS_IMAGE2-scaled.jpg", featured: true },
    { id: 82, name: "Marsa Al Arab L5 SPA", category: "Interior Design & Fit-Out", img: "./src/projectimg/Marsa-Al-Arab-Exterior.jpg", featured: true },
    // id 83 was never defined in the original source — no project data exists for it
    { id: 84, name: "Makan Housing Project — Hatta", category: "Civil Works", img: "./src/projectimg/afssg.png" },
    { id: 85, name: "DP World Head Office — Expo City", category: "MEP Works", img: "./src/AAAAAA.jpg", featured: true },
    { id: 86, name: "Victoria International School — Kalba Branch", category: "Civil Works", img: "./src/projectimg/59b0c1_3abb320e18504179a17880e6813489d0~mv2 (1).jpg" },
    { id: 87, name: "Proposed Residential Project — Plots 86–89", category: "Civil Works", img: "./src/projectimg/2834-ALG-86-ARC-M3-PRESPECTIVE3-3384450 (1).jpg" },
    { id: 88, name: "Techno Hub 4 — Dubai Silicon Oasis", category: "MEP Works", img: "./src/projectimg/large_D5_Image_8_20230714_013430_342968d0e3 (1).png", featured: true },
    { id: 89, name: "G+P+10 Residential Tower — Wadi Al Safa 5", category: "False Ceiling & Partition", img: "./src/projectimg/Screenshot 2025-10-03 084111 (1).png" },
    { id: 90, name: "Dubai Creek Harbour Bridge District", category: "Civil Works", img: "./src/projectimg/Screenshot 2025-10-03 102435.png", featured: true },
    { id: 91, name: "MAG JLT — Mixed Use Tower", category: "False Ceiling & Partition", img: "./src/projectimg/MAG JLT R3 VIEW B.jpg" },
    { id: 92, name: "South Living — Residential Building", category: "False Ceiling & Partition", img: "./src/projectimg/South_Living.jpg" },
    { id: 93, name: "Costa Coffee — Deira City Centre", category: "Interior Design & Fit-Out", img: "./src/projectimg/Screenshot 2026-03-06 105307.png", featured: true },
    { id: 94, name: "Muhaisnah Community Housing — Al Muhaisnah 4th Area", category: "Civil Works", img: "./src/projectimg/SITE -001.jpg", featured: true },
    // id 95 removed — duplicate of id 7 (same Oud Metha Plot 319 project, same image)

    /* ── Newly added projects from the company register. No photography on file yet,
       so these render with the gold placeholder tile (see <ProjectImage/>) until images are supplied. ── */
    { id: 96, name: "Dubai Police Headquarters Complex — Al Awir", category: "Civil Works", img: "https://www.sheridanuae.com/wp-content/uploads/2020/12/D409-Al-Aweer-Police-HQ..jpg" },
    { id: 97, name: "Hungary Pavilion — EXPO 2020 Dubai", category: "Interior Design & Fit-Out", img: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080" },
    { id: 98, name: "Family House & Service Block — Rul Dibba, Fujairah", category: "Civil Works", img: "https://alu-glaze.com/wp-content/uploads/2025/08/85877@4x-1.jpg" },
    { id: 99, name: "Intercontinental Resort & Hotel — Mina Al Arab, RAK", category: "Interior Design & Fit-Out", img: "https://www.rakproperties.ae/wp-content/uploads/2024/06/ACEO-Intercon-Post-Web-Image.jpg" },
    { id: 100, name: "Amazon Delivery Station — Al Quoz", category: "MEP Works", img: "https://eccfitout.com/wp-content/uploads/2025/12/DDB7-Amazon-03.jpg" },
    { id: 101, name: "Villa, Majlis & Club House — Al Khawaneej Second", category: "Civil Works", img: "data:image/jpeg;base64,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" },
    { id: 102, name: "Mixed-Use Building — Al Muteena", category: "Civil Works", img: "https://range.ae/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fal-muteena-27255_xl.jpg&w=3840&q=75" },
    { id: 103, name: "Areej 5, 6 & 7 — Muwaileh, Sharjah", category: "False Ceiling & Partition", img: "https://cdn.fazwaz.com/nw/OjhjzYlOdDkJaNWGsOyUdRbIK88/375x300/project/6993/areej-apartments-by-arada.png" },
    { id: 104, name: "Residential Building — Al Satwa", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/protenders/image/upload/c_limit,d_missing,dpr_3.0,f_auto,fl_progressive:semi,q_auto:eco,w_500/fd96defbc9e43d0445feacf872f98ea2.jpg" },
    { id: 105, name: "Etihad Mosque — Al Barsha 2nd", category: "Civil Works", img: "https://iacad.gov.ae/images/e556005c/3c01x2381wFFFFFF/png.aspx" },
    { id: 106, name: "Five Villas — Jumeirah Park", category: "Civil Works", img: "data:image/jpeg;base64,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" },
    { id: 107, name: "Mosque — Al Quoz 3rd", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK3uVVBt0_qZJ_rEvH3srbWwlFjykV4u_qg&s" },
    { id: 108, name: "Residential & Commercial Building — Al Mamzar", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFVsUC19t49HzVgSG8Dxpx0R7K9s_FHnWIA&s" },
    { id: 109, name: "Commercial Center — Al Warqa'a", category: "Civil Works", img: "https://corporate.unioncoop.ae/wp-content/uploads/2018/03/Al-Warqa%E2%80%99a-Commercial-Center.png" },
    { id: 110, name: "ACT1 / ACT2 — Burj Khalifa", category: "Interior Design & Fit-Out", featured: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvOFA0_lnsQxejLZuuEFa-phXz2vF0PkgYw&s" },
    { id: 111, name: "Residential Development — Al Jadaf", category: "Civil Works", img: "https://property.constructionweekonline.com/cloud/2024/02/06/Image_Art-Bay.jpg" },
    { id: 112, name: "Vida Hotel & Residences — Dubai Creek Harbour", category: "Interior Design & Fit-Out", featured: true, img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/268427555.jpg?k=2ded2ec6b3097586061f0b1e207fb9b3e60d6490355ed908886069a6a39b7bdf&o=" },
    { id: 113, name: "10 Villas — Mirdif", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR1Tl-nd35weIGB0DkU1_k7gkrYQJHmTma5g&s" },
    { id: 114, name: "Mosque of Reflection — City Walk", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIFuwE0DLTG1lAFrV4-TsrESBFj2TYjk5sg&s" },
    { id: 115, name: "French Bakery — Multiple Branches", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XuQGwAX_uWTPvJF0LF2hgVgkFaL_G77mTw&s" },
    { id: 116, name: "UAEU Pavilion — Dubai EXPO 2020", category: "Interior Design & Fit-Out", img: "data:image/jpeg;base64,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" },
    { id: 117, name: "The Peninsula Sales Office — Business Bay", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbYSjaO3qWgN5QDXqOm8ryNX9P33a-NziCg&s" },
    { id: 118, name: "Park Island — Dubai Creek Harbour", category: "Civil Works", img: "https://cloud.famproperties.com/project/large/island-park-245255-160558.jpg" },
    { id: 119, name: "Three Community Centers — Mirdif, Al Khail Gate & Remraam", category: "Civil Works", img: "https://www.hattakayaktours.com/wp-content/uploads/2024/07/Al-Khail-Gate-Community-Centre.jpg" },
    { id: 120, name: "Topaz 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcqzwM7JNwXg0H3G1b_ihgw_3coCxjlYwcA&s" },
];

const STATS = [
    { val: "2008", label: "Established" },
    { val: "200+", label: "Projects Completed" },
    { val: "47", label: "Major Landmarks" },
    { val: "100+", label: "Clients Served" },
];

const CAT_META = {
    "All": { color: "#C9A84C", bg: "#01044A" },
    "False Ceiling & Partition": { color: "#C9A84C", bg: "#01044A" },
    "Interior Design & Fit-Out": { color: "#01044A", bg: "#C9A84C" },
    "MEP Works": { color: "#C9A84C", bg: "#1a3a5c" },
    "Civil Works": { color: "#C9A84C", bg: "#3d2408" },
};

const NAV = ["Home", "Services", "Projects", "Career", "Clients", "Team", "About"];

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.06) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function useScrollY() {
    const [y, setY] = useState(0);
    useEffect(() => {
        const fn = () => setY(window.scrollY);
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return y;
}

function useReadingProgress() {
    const [p, setP] = useState(0);
    useEffect(() => {
        const fn = () => {
            const h = document.documentElement.scrollHeight - window.innerHeight;
            setP(h ? (window.scrollY / h) * 100 : 0);
        };
        window.addEventListener("scroll", fn, { passive: true });
        return () => window.removeEventListener("scroll", fn);
    }, []);
    return p;
}

/* ─── REVEAL ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = "up" }) {
    const [ref, visible] = useInView();
    const map = {
        up: "translateY(30px)",
        left: "translateX(-30px)",
        right: "translateX(30px)",
        fade: "none",
        zoom: "scale(0.95)",
    };
    return (
        <div
            ref={ref}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : (map[dir] || "translateY(30px)"),
                transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

/* ─── READING PROGRESS ───────────────────────────────────────────────────── */
function ReadingProgress() {
    const p = useReadingProgress();
    return (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(201,168,76,0.1)" }}>
            <div style={{ height: "100%", width: `${p}%`, background: "linear-gradient(90deg,#a8883c,#C9A84C,#e0c068)", transition: "width 0.12s linear", boxShadow: "0 0 10px rgba(201,168,76,0.55)" }} />
        </div>
    );
}

/* ─── FLOATING PARTICLES (hero) ──────────────────────────────────────────── */
function Particles() {
    const pts = useRef(
        Array.from({ length: 14 }, (_, i) => ({
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            delay: `${Math.random() * 5}s`,
            dur: `${4 + Math.random() * 4}s`,
            size: 1.5 + Math.random() * 2,
            op: 0.2 + Math.random() * 0.4,
        }))
    ).current;

    return (
        <>
            {pts.map((p, i) => (
                <div
                    key={i}
                    className="particle"
                    style={{
                        position: "absolute",
                        top: p.top,
                        left: p.left,
                        width: p.size,
                        height: p.size,
                        borderRadius: "50%",
                        background: "var(--gold)",
                        opacity: p.op,
                        animation: `particleDrift ${p.dur} ease-in-out ${p.delay} infinite`,
                        pointerEvents: "none",
                    }}
                />
            ))}
        </>
    );
}

/* ─── FALLBACK IMAGE ─────────────────────────────────────────────────────── */
function ProjectImage({ src, alt, className, id, style }) {
    const [errored, setErrored] = useState(false);
    const fallback = FALLBACKS[id % FALLBACKS.length];
    return (
        <img
            src={errored ? fallback : src}
            alt={alt}
            className={className}
            style={style}
            onError={() => setErrored(true)}
        />
    );
}

/* ─── PROJECT MODAL ──────────────────────────────────────────────────────── */
function ProjectModal({ project, onClose }) {
    useEffect(() => {
        const fn = (e) => e.key === "Escape" && onClose();
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", fn);
        return () => {
            document.body.style.overflow = "";
            document.removeEventListener("keydown", fn);
        };
    }, [onClose]);

    const meta = CAT_META[project.category] || CAT_META["False Ceiling & Partition"];

    return (
        <div
            onClick={onClose}
            style={{
                position: "fixed", inset: 0, zIndex: 2000,
                background: "rgba(0,2,20,0.92)",
                backdropFilter: "blur(14px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px",
                animation: "backdropIn 0.25s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "linear-gradient(160deg, #040b3a 0%, #02071c 100%)",
                    borderRadius: 22,
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 720,
                    maxHeight: "88vh",
                    overflowY: "auto",
                    boxShadow: "0 60px 120px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.25)",
                    border: "1px solid rgba(201,168,76,0.2)",
                    animation: "modalIn 0.35s cubic-bezier(0.22,1,0.36,1)",
                }}
            >
                {/* Hero image */}
                <div style={{ height: 340, position: "relative", overflow: "hidden" }}>
                    <ProjectImage
                        src={project.img}
                        alt={project.name}
                        id={project.id}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.04)", transition: "transform 6s ease" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,7,48,0.97) 0%, rgba(2,7,48,0.1) 55%, transparent 100%)" }} />

                    {/* Close button */}
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            position: "absolute", top: 18, right: 18,
                            width: 40, height: 40, borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
                            border: "1px solid rgba(255,255,255,0.2)",
                            color: "#fff", fontSize: 17, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backdropFilter: "blur(10px)",
                            transition: "background 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.65)"; e.currentTarget.style.transform = "rotate(90deg)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.transform = "none"; }}
                    >✕</button>

                    {/* Category + featured badges */}
                    <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 32px 30px" }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap" }}>
                            <span style={{
                                display: "inline-block",
                                background: meta.bg, color: meta.color,
                                fontSize: 10, fontWeight: 700, letterSpacing: "0.13em",
                                textTransform: "uppercase", padding: "5px 13px",
                                borderRadius: 20, fontFamily: "var(--f-body)",
                            }}>
                                {project.category}
                            </span>
                            {project.featured && (
                                <span style={{
                                    display: "inline-block",
                                    background: "var(--gold)", color: "var(--ink)",
                                    fontSize: 10, fontWeight: 700, letterSpacing: "0.13em",
                                    textTransform: "uppercase", padding: "5px 13px",
                                    borderRadius: 20, fontFamily: "var(--f-body)",
                                }}>★ Featured</span>
                            )}
                        </div>
                        <h2 style={{
                            fontFamily: "var(--f-display)",
                            fontSize: "clamp(1.4rem,3vw,2.1rem)",
                            fontWeight: 700, color: "#fff",
                            lineHeight: 1.22, maxWidth: 580, margin: 0,
                        }}>{project.name}</h2>
                    </div>
                </div>

                {/* Quality badge only — no detail fields */}
                <div style={{ padding: "28px 36px 36px" }}>
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 14,
                        padding: "18px 24px",
                        display: "flex", alignItems: "center", gap: 16,
                        border: "1px solid rgba(201,168,76,0.15)",
                    }}>
                        <div style={{
                            width: 42, height: 42, borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--gold), var(--gold-dk))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--ink)", fontWeight: 700, fontSize: 16, flexShrink: 0,
                        }}>Q</div>
                        <div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 3 }}>Quality Assured</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>ISO 9001:2015 · ISO 14001:2015 · OHSAS 18001:2007</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
function ProjectCard({ project, onOpen, index }) {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        card.style.transform = `translateY(-8px) rotateX(${-dy * 4.5}deg) rotateY(${dx * 4.5}deg)`;
    };

    const handleMouseLeave = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transform = "";
        card.style.transition = "transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.45s, border-color 0.3s";
    };

    const handleMouseEnter = () => {
        const card = cardRef.current;
        if (!card) return;
        card.style.transition = "transform 0.1s ease, box-shadow 0.45s, border-color 0.3s";
    };

    return (
        <Reveal delay={(index % 4) * 60} dir="up">
            <article
                ref={cardRef}
                className="proj-card"
                onClick={() => onOpen(project)}
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{ perspective: 900 }}
            >
                {/* Image area */}
                <div className="proj-img-wrap">
                    <ProjectImage
                        src={project.img}
                        alt={project.name}
                        id={project.id}
                        className="proj-img"
                    />
                    <div className="proj-img-overlay" />
                    <div className="proj-img-frame" />

                    {/* "View Project" hint that appears on hover */}
                    <div className="proj-view-hint">View Project</div>

                    {/* Category label slides up from bottom */}
                    <div className="proj-cat-label">{project.category}</div>

                    {/* Featured badge */}
                    {project.featured && (
                        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 5 }}>
                            <span className="feat-badge" style={{
                                display: "inline-block",
                                background: "var(--gold)", color: "var(--ink)",
                                fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
                                textTransform: "uppercase", padding: "3px 10px",
                                borderRadius: 20, fontFamily: "var(--f-body)",
                                boxShadow: "0 2px 14px rgba(201,168,76,0.45)",
                            }}>★ Featured</span>
                        </div>
                    )}
                </div>

                {/* Name strip — name only */}
                <div className="proj-name-strip">
                    <h3 style={{
                        fontFamily: "var(--f-display)",
                        fontSize: 17,
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.35,
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                    }}>
                        {project.name}
                    </h3>
                </div>
            </article>
        </Reveal>
    );
}

/* ─── SEARCH BAR ─────────────────────────────────────────────────────────── */
function SearchBar({ value, onChange }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: "relative", maxWidth: 380, width: "100%" }}>
            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.5, pointerEvents: "none", color: "var(--gold)" }}>🔍</span>
            <input
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search projects…"
                style={{
                    width: "100%",
                    background: focused ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)",
                    border: `1.5px solid ${focused ? "var(--gold)" : "rgba(201,168,76,0.25)"}`,
                    color: "#fff", padding: "9px 12px 9px 38px",
                    fontFamily: "var(--f-body)", fontSize: 13,
                    outline: "none", borderRadius: 10,
                    transition: "all 0.22s", boxSizing: "border-box",
                }}
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: 14, lineHeight: 1 }}
                >✕</button>
            )}
        </div>
    );
}

/* ─── SOCIAL ICONS ───────────────────────────────────────────────────────── */
const FBIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>;
const IGIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1.2" fill="#C9A84C" stroke="none" /></svg>;
const WAIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" /></svg>;
const LIIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>;

function SocialBtn({ href, label, children }) {
    const [hov, setHov] = useState(false);
    return (
        <a
            href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{
                width: 40, height: 40, borderRadius: 10,
                background: hov ? "var(--gold)" : "rgba(201,168,76,0.08)",
                border: `1px solid ${hov ? "var(--gold)" : "rgba(201,168,76,0.25)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.22s",
                transform: hov ? "translateY(-3px)" : "none",
                flexShrink: 0,
            }}
        >
            {children}
        </a>
    );
}

/* ─── QR CODE ────────────────────────────────────────────────────────────── */
function QRCode() {
    return (
        <div style={{ width: 72, height: 72, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
            <img src="./src/img/QRCODE.jpeg" alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }}
                onError={e => { e.target.style.display = "none"; e.target.parentElement.innerHTML = '<div style="font-size:10px;color:#C9A84C;font-family:monospace;text-align:center">QR</div>'; }} />
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function ViewProjects() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [showFeatured, setShowFeatured] = useState(false);
    const [sortBy, setSortBy] = useState("default");
    const [menuOpen, setMenuOpen] = useState(false);
    const scrollY = useScrollY();
    const scrolled = scrollY > 56;
    const navigate = useNavigate();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const goTo = (id) => {
        setMenuOpen(false);
        if (id === "Home") { navigate("/"); return; }
        if (id === "Services") { navigate("/services"); return; }
        if (id === "Projects") { window.scrollTo({ top: 0, behavior: "smooth" }); return; }
        navigate("/");
        setTimeout(() => {
            const el = document.getElementById(id.toLowerCase().replace(/\s+/g, "-"));
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const filtered = PROJECTS.filter(p => {
        if (activeCategory !== "All" && p.category !== activeCategory) return false;
        if (showFeatured && !p.featured) return false;
        if (search) {
            const q = search.toLowerCase();
            return [p.name, p.category].some(f => f.toLowerCase().includes(q));
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (b.featured && !a.featured) return 1;
        if (a.featured && !b.featured) return -1;
        return 0;
    });

    const catCounts = {};
    CATEGORIES.forEach(c => {
        catCounts[c] = c === "All" ? PROJECTS.length : PROJECTS.filter(p => p.category === c).length;
    });

    return (
        <div style={{ background: "var(--bg-deep)", color: "#fff", minHeight: "100vh", overflowX: "hidden" }}>
            <style>{PAGE_CSS}</style>
            <ReadingProgress />

            {/* ── NAVIGATION ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                background: scrolled ? "rgba(2,7,48,0.97)" : "transparent",
                backdropFilter: scrolled ? "blur(22px)" : "none",
                boxShadow: scrolled ? "0 1px 0 rgba(201,168,76,0.1)" : "none",
                transition: "all 0.4s ease",
            }}>
                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px", height: 74, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => goTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#01044A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 19, color: "#fff", lineHeight: 1.15 }}>Al Agha Group</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>of Companies</div>
                        </div>
                    </button>

                    <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} className={`nav-btn ${l === "Projects" ? "nav-active" : ""}`} style={{ color: "rgba(255,255,255,0.8)" }}>{l}</button>
                        ))}
                        <button className="btn-gold" style={{ padding: "10px 22px" }} onClick={() => goTo("Career")}>Join Us</button>
                    </div>

                    <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", display: "none", alignItems: "center" }} className="mobile-toggle">
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {menuOpen && (
                    <div style={{ background: "rgba(2,7,48,0.98)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(201,168,76,0.08)", color: l === "Projects" ? "var(--gold)" : "rgba(255,255,255,0.75)", fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 500, padding: "15px 32px", textAlign: "left", cursor: "pointer" }}>{l}</button>
                        ))}
                    </div>
                )}
            </nav>

            {/* ── HERO ── */}
            <header style={{ background: "linear-gradient(160deg, var(--bg-deep) 55%, var(--bg-mid))", padding: "100px 36px 80px", position: "relative", overflow: "hidden" }}>
                {/* Ambient orbs */}
                <div className="hero-orb" style={{ width: 600, height: 600, top: "-15%", left: "-10%", animationDelay: "0s" }} />
                <div className="hero-orb" style={{ width: 450, height: 450, bottom: "-20%", right: "5%", animationDelay: "3s" }} />

                {/* Floating particles */}
                <Particles />

                {/* Left accent bar */}
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: "linear-gradient(to bottom, transparent, var(--gold) 30%, var(--gold) 70%, transparent)" }} />

                <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
                    <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "flex-end", gap: "48px 64px" }}>
                        <div>
                            <Reveal dir="left">
                                <span style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>Project Portfolio</span>
                                <h1 style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(2.8rem,7vw,5rem)", color: "#fff", lineHeight: 1.06, letterSpacing: "-0.02em", marginBottom: 24 }}>
                                    Our Work,<br /><em style={{ color: "var(--gold)", fontStyle: "italic" }}>Built to Last.</em>
                                </h1>
                                <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "rgba(255,255,255,0.58)", lineHeight: 1.82, maxWidth: 520 }}>
                                    Over 200 completed projects across the UAE — from landmark towers and luxury hotels to government buildings, EXPO pavilions, and community developments.
                                </p>
                            </Reveal>
                        </div>

                        <Reveal dir="right" delay={110}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "1fr 1fr",
                                gap: "28px 52px",
                                border: "1px solid rgba(201,168,76,0.18)",
                                borderRadius: 18, padding: "30px 36px",
                                background: "rgba(255,255,255,0.025)",
                                backdropFilter: "blur(14px)",
                                flexShrink: 0, minWidth: 260,
                            }}>
                                {STATS.map(({ val, label }) => (
                                    <div key={label} style={{ textAlign: "center" }}>
                                        <div className="stat-val" style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.8rem,3.5vw,2.8rem)", fontWeight: 700, lineHeight: 1 }}>{val}</div>
                                        <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(201,168,76,0.5)", marginTop: 6 }}>{label}</div>
                                    </div>
                                ))}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </header>

            {/* ── FILTER BAR ── */}
            <div style={{ background: "rgba(2,7,48,0.96)", backdropFilter: "blur(22px)", borderBottom: "1px solid rgba(201,168,76,0.15)", position: "sticky", top: 74, zIndex: 99 }}>
                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 36px" }}>
                    <div className="filter-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", padding: "16px 0" }}>
                        <div className="pill-bar" style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? "active" : ""}`}>
                                    {cat === "All" ? "All" : cat.split(" ")[0]}
                                    <span style={{ fontSize: 11, opacity: 0.6 }}>({catCounts[cat]})</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                            <SearchBar value={search} onChange={setSearch} />
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.25)", color: "#fff", fontFamily: "var(--f-body)", fontSize: 13, padding: "9px 12px", borderRadius: 10, cursor: "pointer", outline: "none" }}
                            >
                                <option value="default">Featured first</option>
                                <option value="name">A – Z</option>
                            </select>
                            <label style={{ display: "flex", alignItems: "center", gap: 7, cursor: "pointer", fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                                <input type="checkbox" checked={showFeatured} onChange={e => setShowFeatured(e.target.checked)} style={{ accentColor: "var(--gold)", width: 15, height: 15 }} />
                                Featured only
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RESULT COUNT ── */}
            <div style={{ maxWidth: 1320, margin: "0 auto", padding: "24px 36px 0" }}>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                    Showing <strong style={{ color: "#fff" }}>{filtered.length}</strong> of {PROJECTS.length} projects
                    {search && <> matching "<span style={{ color: "var(--gold)" }}>{search}</span>"</>}
                    {activeCategory !== "All" && <> in <span style={{ color: "var(--gold)" }}>{activeCategory}</span></>}
                </p>
            </div>

            {/* ── PROJECT GRID ── */}
            <main style={{ maxWidth: 1320, margin: "0 auto", padding: "28px 36px 100px" }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "80px 24px" }}>
                        <div style={{ fontSize: 42, marginBottom: 16 }}>🔍</div>
                        <div style={{ fontFamily: "var(--f-display)", fontSize: 26, color: "#fff", fontWeight: 700, marginBottom: 8 }}>No projects found</div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "rgba(255,255,255,0.4)" }}>Try adjusting your search or filters.</div>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory("All"); setShowFeatured(false); }}
                            style={{ marginTop: 20, background: "var(--gold)", color: "var(--ink)", border: "none", fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "10px 22px", borderRadius: 8, cursor: "pointer" }}
                        >Clear All Filters</button>
                    </div>
                ) : (
                    <div
                        className="project-grid"
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}
                    >
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} index={i} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ background: "rgba(0,2,20,0.96)", padding: "72px 36px 36px", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                <div style={{ maxWidth: 1320, margin: "0 auto" }}>
                    <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 48, marginBottom: 52 }}>
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#070d5a" }}>
                                    <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--f-display)", fontSize: 17, fontWeight: 700, color: "#fff" }}>Al Agha Group</div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>of Companies</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: 260, marginBottom: 22 }}>
                                False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                            </p>
                            <div style={{ display: "flex", gap: 8, marginBottom: 26 }}>
                                <SocialBtn href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook"><FBIcon /></SocialBtn>
                                <SocialBtn href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram"><IGIcon /></SocialBtn>
                                <SocialBtn href="https://wa.me/97142675229" label="WhatsApp"><WAIcon /></SocialBtn>
                                <SocialBtn href="https://linkedin.com/company/alaghagroup" label="LinkedIn"><LIIcon /></SocialBtn>
                            </div>
                            <div style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: "12px 14px" }}>
                                <QRCode />
                                <div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>Scan to connect</div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(201,168,76,0.5)", lineHeight: 1.5 }}>Point your camera to visit Al Agha Group online</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Quick Links</h4>
                            {NAV.map(l => (
                                <button key={l} onClick={() => goTo(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontFamily: "var(--f-body)", fontSize: 13, padding: "7px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>{l}</button>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Services</h4>
                            {["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes", "Architectural Design & Planning"].map(s => (
                                <div key={s} style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.3)", padding: "6px 0", lineHeight: 1.5 }}>{s}</div>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: 18, fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contact</h4>
                            {[
                                ["📍", "Office 201 & 202, Block A, Abraj Al Mamzar, Al Mamzar, Dubai, U.A.E."],
                                ["📞", "+971 4 267 5229"],
                                ["✉️", "info@alaghagroup.com"],
                            ].map(([icon, txt]) => (
                                <div key={txt} style={{ display: "flex", gap: 10, padding: "6px 0", fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>
                                    <span style={{ flexShrink: 0 }}>{icon}</span><span>{txt}</span>
                                </div>
                            ))}
                            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,168,76,0.15)", height: 180, marginTop: 18 }}>
                                <iframe
                                    title="Al Agha Group Office"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2764583093857!2d55.35445537600424!3d25.28574307758295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cfe11994ee1%3A0x8bdd77fec9a0e9c3!2sAbraj%20Al%20Mamzar%20-%20Al%20Mamzar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                                    width="100%" height="100%" style={{ border: "none", display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: 22, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>© 2025 Al Agha Group of Companies · All rights reserved</span>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.2)" }}>Privacy Policy · Terms of Service</span>
                    </div>
                </div>
            </footer>

            {/* ── MODAL ── */}
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}