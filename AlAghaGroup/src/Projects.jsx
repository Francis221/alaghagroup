import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../alaghalogo.png";

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
    { id: 43, name: "Symphony Tower (Radisson Blu Waterfront)", category: "Interior Design & Fit-Out", img: "./src/projectimg/download (2).png", featured: true },
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
    { id: 95, name: "Proposed 2B+G+11 Commercial & Residential — Oud Metha Plot 319-310", category: "Civil Works", img: "./src/projectimg/Project Perspective.jpg", featured: true },
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