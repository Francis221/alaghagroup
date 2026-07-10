import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../alaghalogo.png";

// Automatically glob-import all project images in the directory
const projectImages = import.meta.glob("./projectimg/*.{png,jpg,jpeg,PNG,JPG,JPEG,webp}", { eager: true, import: "default" });

// Explicit imports for images in other locations (e.g. src/ or src/img/)
import imgAAAAAA from "./AAAAAA.jpg";
import qrcodeImg from "./img/QRCODE.jpeg";

// Build unified image map: key → imported asset
const imageMap = {
    ...projectImages,
    "./AAAAAA.jpg": imgAAAAAA,
    "./img/QRCODE.jpeg": qrcodeImg,
};

/* ─── HERO VIDEO URL ─────────────────────────────────────────────────────── */
// Use a smaller, more compatible video format for Android
const heroVideo = "https://res.cloudinary.com/qh3zic6r/video/upload/0709_1_opprrq.mp4";

/* ─── SVG ICONS ──────────────────────────────────────────────────────────── */
const Icons = {
    Facebook: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
    ),
    Instagram: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
        </svg>
    ),
    WhatsApp: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        </svg>
    ),
    LinkedIn: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect x="2" y="9" width="4" height="12" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    ),
    Phone: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    ),
    Email: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    Location: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    ),
    Globe: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    Fax: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="8" width="20" height="14" rx="2" />
            <path d="M8 2v4" /><path d="M16 2v4" />
            <rect x="6" y="12" width="4" height="4" />
            <rect x="14" y="12" width="4" height="4" />
        </svg>
    ),
    Menu: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    Close: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    Search: () => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    ),
    Star: () => (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
    ),
    Play: () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
            <polygon points="5,3 19,12 5,21" />
        </svg>
    ),
    Check: () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20,6 9,17 4,12" />
        </svg>
    ),
};

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

  .hero-video-bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
  }

  /* Android-specific video fix */
  @media (max-width: 768px) {
    .hero-video-bg {
      object-fit: cover !important;
      -webkit-transform: translateZ(0) !important;
      transform: translateZ(0) !important;
    }
  }

  /* Project card image wrapper */
  .proj-img-wrap {
    position: relative;
    overflow: hidden;
    height: 200px;
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
    padding: 8px 14px;
    font-family: var(--f-body);
    font-size: 9px;
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
    border-radius: 12px;
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
    padding: 14px 16px 18px;
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
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 6px 14px;
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
    padding: 10px 22px;
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

  .btn-outline-white {
    display: inline-flex;
    align-items: center; gap: 8px;
    background: transparent; color: rgba(255,255,255,0.8);
    font-family: var(--f-body); font-size: 12px; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 10px 22px; border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.25);
    cursor: pointer; transition: all 0.25s ease;
  }
  .btn-outline-white:hover {
    background: rgba(255,255,255,0.07);
    border-color: rgba(255,255,255,0.5);
    transform: translateY(-2px);
  }

  /* Filter pills */
  .cat-pill {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(201,168,76,0.2);
    font-family: var(--f-body);
    font-size: 11px;
    font-weight: 500;
    padding: 5px 12px;
    border-radius: 30px;
    cursor: pointer;
    transition: all 0.22s ease;
    white-space: nowrap;
    color: rgba(255,255,255,0.7);
    display: flex;
    align-items: center;
    gap: 4px;
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

  /* Footer Grid */
  .footer-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 40px;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px; }
    .project-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 900px) {
    .desktop-nav { display: none !important; }
    .mobile-toggle { display: flex !important; }
    .hero-grid { grid-template-columns: 1fr !important; }
    .filter-row { flex-direction: column !important; align-items: flex-start !important; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px; }
  }

  @media (max-width: 768px) {
    .project-grid { grid-template-columns: 1fr !important; }
    .proj-img-wrap { height: 180px !important; }
  }

  @media (max-width: 600px) {
    .footer-grid { grid-template-columns: 1fr !important; gap: 24px; }
    .proj-img-wrap { height: 160px !important; }
  }

  @media (max-width: 480px) {
    .proj-img-wrap { height: 140px !important; }
    .proj-name-strip { padding: 10px 12px 14px !important; }
    .proj-name-strip h3 { font-size: 14px !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .proj-img { transition: none !important; }
    .proj-card { transition: none !important; }
    .feat-badge { animation: none !important; }
    .proj-img-wrap::before, .proj-img-wrap::after { animation: none !important; }
    .stat-val { animation: none !important; -webkit-text-fill-color: var(--gold); }
    .hero-orb { animation: none !important; }
    .hero-video-bg { transition: none !important; }
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
const PROJECTS = [
    { id: 1, name: "Beach House & Villas Fujairah", category: "False Ceiling & Partition", img: "./projectimg/beach.jpg", featured: true },
    { id: 2, name: "EMAAR Beachfront — Sunrise Bay", category: "False Ceiling & Partition", img: "./projectimg/beachfront.jpg", featured: true },
    { id: 3, name: "City Engineering Office — Al Fatan Tower", category: "Interior Design & Fit-Out", img: "./projectimg/city.jpg", featured: true },
    { id: 4, name: "Park Ridge — Hadaeq Sheikh Mohammed", category: "False Ceiling & Partition", img: "./projectimg/Park-Ridge-2.jpg", featured: true },
    { id: 5, name: "Warehouse — Al Sajaa Industrial Area", category: "Civil Works", img: "./projectimg/15465160233.png" },
    { id: 6, name: "Hyati Residence 2 — Block A, B, C", category: "False Ceiling & Partition", img: "./projectimg/SITE -001.jpg" },
    { id: 7, name: "2B+G+11 Commercial & Residential", category: "Civil Works", img: "./projectimg/Project Perspective.jpg" },
    { id: 8, name: "G+3 Apartment Buildings — Al Hamriya", category: "Civil Works", img: "./projectimg/AL HAMRIYA & UM HURAIR 0138-0435.jpg" },
    { id: 9, name: "Labour Accommodation — Al Muhaisnah", category: "Civil Works", img: "./projectimg/20181003_264-0338-Labor-camp-Muhaisnah-second-1024x576.jpg", featured: true },
    { id: 10, name: "Coral Deira Hotel", category: "Interior Design & Fit-Out", img: "./projectimg/coral-dubai-deira-hotel.jpg" },
    { id: 11, name: "The Point Tower — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/the-point-14096_xl.jpg" },
    { id: 12, name: "Jumeirah Beach Residence Tower", category: "False Ceiling & Partition", img: "./projectimg/141217_366_JUMEIRAH-BEACH-RESIDENCE_AERIAL_zj-1536x1192.jpg" },
    { id: 13, name: "Marina Wharf 1", category: "False Ceiling & Partition", img: "./projectimg/marina-wharf-1618_xl.jpg" },
    { id: 14, name: "Torch Tower", category: "False Ceiling & Partition", img: "./projectimg/R.jpg" },
    { id: 15, name: "72 Villas — Hydra Village", category: "Civil Works", img: "./projectimg/Capture4.png" },
    { id: 16, name: "IV Quattro EMAAR — Business Bay", category: "Interior Design & Fit-Out", img: "./projectimg/Capture5.png" },
    { id: 17, name: "D101 G+8+HC — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/DUBAIS_1.jpg" },
    { id: 18, name: "Empire Heights", category: "False Ceiling & Partition", img: "./projectimg/1520077655140.jpg" },
    { id: 19, name: "Al Bareeq Tower", category: "False Ceiling & Partition", img: "./projectimg/01_Perspective__Al Bareeq Tower.jpg" },
    { id: 20, name: "Holiday Inn Hotel & Suites", category: "Interior Design & Fit-Out", img: "./projectimg/Holiday Inn Hotel and Suites Dubai Science Park - Photo 03.jpg", featured: true },
    { id: 21, name: "Marina Wharf 2 — 2B+G+27 Tower", category: "False Ceiling & Partition", img: "./projectimg/10208.jpg" },
    { id: 22, name: "Bobyan Tower", category: "False Ceiling & Partition", img: "./projectimg/bobyan-tower-1554_xl.jpg" },
    { id: 23, name: "Media Rotana Hotel", category: "Interior Design & Fit-Out", img: "./projectimg/424818958.jpg" },
    { id: 24, name: "2B+G+P+25 Tower — Al Nahda One", category: "False Ceiling & Partition", img: "./projectimg/Capture 1.png" },
    { id: 25, name: "Al Watani Residential Development", category: "Civil Works", img: "./projectimg/Al-Watani-Residential-Development-Project.jpg" },
    { id: 26, name: "City Seasons Hotel Burjman", category: "Interior Design & Fit-Out", img: "./projectimg/71683934.jpg" },
    { id: 27, name: "Emirates Flight Training — DWC", category: "MEP Works", img: "./projectimg/R (3).jpg", featured: true },
    { id: 28, name: "Shatha Tower Renovation — Media City", category: "Interior Design & Fit-Out", img: "./projectimg/Shatha-Tower-1.jpg" },
    { id: 29, name: "122 Villas — Mirdif", category: "Civil Works", img: "./projectimg/WhatsApp Image 2017-09-24 at 1.01.27 PM.jpg" },
    { id: 30, name: "Remraam Residential Building", category: "False Ceiling & Partition", img: "./projectimg/remraam-295214-121454.jpg" },
    { id: 31, name: "Office Building G+6 — TECOM Site A", category: "Civil Works", img: "./projectimg/3shotRecovered-Recovered.jpg" },
    { id: 32, name: "Bay Central — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/Untitled Design - 1 copy.jpg" },
    { id: 33, name: "I Rise Tower", category: "False Ceiling & Partition", img: "./projectimg/irise-tower-210391-101916.jpg" },
    { id: 34, name: "23 Marina", category: "False Ceiling & Partition", img: "./projectimg/Capture3.png" },
    { id: 35, name: "25 Villas — Falcon City", category: "Civil Works", img: "./projectimg/Eastern-Residences-Image1.jpg" },
    { id: 36, name: "Mirdiff Hills Development", category: "False Ceiling & Partition", img: "./projectimg/1225 - c5c49ae8-4e0f-49d0-8f4b-b5b457fd9339.jpg" },
    { id: 37, name: "Stella Maris — Dubai Marina", category: "False Ceiling & Partition", img: "./projectimg/1275- 140826_853_Areal_Hig_FINAL-logo.jpg", featured: true },
    { id: 38, name: "G+P+10 Residential — Al Furjan", category: "False Ceiling & Partition", img: "./projectimg/pic1 (1).jpg" },
    { id: 39, name: "Zabeel Ladies Club", category: "Interior Design & Fit-Out", img: "./projectimg/download (3).png" },
    { id: 40, name: "TH8 Hotel — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./projectimg/hotel-exterior.jpg", featured: true },
    { id: 41, name: "Eaton Place — Jumeirah Village", category: "False Ceiling & Partition", img: "./projectimg/eaton-place-10254.jpg" },
    { id: 42, name: "The Kingdom of Sheba", category: "Interior Design & Fit-Out", img: "./projectimg/sheba_03_1920x1024.jpg" },
    { id: 43, name: "Symphony Tower (Radisson Blu)", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyVUAL87651gDLZYdVLSTzwtGU4pl6jMKmcUdDohypA&s=10", featured: true },
    { id: 44, name: "Duja Tower — Trade Center First", category: "False Ceiling & Partition", img: "./projectimg/download (3) (1).png" },
    { id: 45, name: "Vantage — Jumeirah Village", category: "False Ceiling & Partition", img: "./projectimg/download (4).png" },
    { id: 46, name: "Mirdif Hills — North Avenue", category: "False Ceiling & Partition", img: "./projectimg/download (1) (2).png" },
    { id: 47, name: "MBR Dubai Hills — Mulberry at Park Heights", category: "False Ceiling & Partition", img: "./projectimg/download (2) (1).png" },
    { id: 48, name: "Town Square — Rawda 1, 2, 3 & 4", category: "False Ceiling & Partition", img: "./projectimg/download (3) (2).png" },
    { id: 49, name: "The Address Residences Dubai Opera", category: "Interior Design & Fit-Out", img: "./projectimg/the-address-residences-dubai-opera-9455_xl.jpg", featured: true },
    { id: 50, name: "Town Square — UNA Apartments", category: "False Ceiling & Partition", img: "./projectimg/1649835984RD883.jpg" },
    { id: 51, name: "Hyati Residence 2 — JVC Townhouses", category: "False Ceiling & Partition", img: "./projectimg/download (2) (2).png" },
    { id: 52, name: "Port de la Mer Phase 2", category: "False Ceiling & Partition", img: "./projectimg/download (5).png" },
    { id: 53, name: "Kalba Waterfront — Khor Kalba", category: "Civil Works", img: "./projectimg/download (6).png", featured: true },
    { id: 54, name: "Terhab Hotel & Tower", category: "Interior Design & Fit-Out", img: "./projectimg/download (1) (4).png" },
    { id: 55, name: "Gulf Tower — Um Hurair 2nd", category: "False Ceiling & Partition", img: "./projectimg/gulf-tower.jpg" },
    { id: 56, name: "Dubai Creek Harbour — Summer 1D1", category: "False Ceiling & Partition", img: "./projectimg/R (1).jpg" },
    { id: 57, name: "BADR Project Phase 1", category: "Civil Works", img: "./projectimg/download (2) (3).png" },
    { id: 58, name: "Areej 1–4 — Muwaileh, Sharjah", category: "False Ceiling & Partition", img: "./projectimg/download (3) (4).png" },
    { id: 59, name: "Grand Bleu Tower — Emaar Beachfront", category: "False Ceiling & Partition", img: "./projectimg/1620744002_grandbleu1_result.jpg", featured: true },
    { id: 60, name: "Dubai Prosecution Building", category: "MEP Works", img: "./projectimg/download (2) (4).png", featured: true },
    { id: 61, name: "Platinum 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/PLATINUM 2.jpg" },
    { id: 62, name: "Platinum 1 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "./projectimg/PLATINUM 1.jpg" },
    { id: 63, name: "Mira Oasis Townhouses — Reem Phase 2", category: "Civil Works", img: "./projectimg/3731.jpg" },
    { id: 64, name: "Sea Gate — Mina Rashid", category: "False Ceiling & Partition", img: "./projectimg/WhatsApp Image 2025-09-08 at 08.56.35_bdefc655.jpg", featured: true },
    { id: 65, name: "Kempinski Residences — Dubai Healthcare City", category: "Interior Design & Fit-Out", img: "./projectimg/download (8).png", featured: true },
    { id: 66, name: "Innovation Hub Phase 2", category: "MEP Works", img: "./projectimg/innovation-hub-4327_xl.jpg" },
    { id: 67, name: "District One Private Mansion", category: "Interior Design & Fit-Out", img: "./projectimg/download (2) (5).png" },
    { id: 68, name: "Shams Townhouses — Town Square", category: "Civil Works", img: "./projectimg/download (1) (6).png" },
    { id: 69, name: "AVA — Palm Jumeirah", category: "False Ceiling & Partition", img: "./projectimg/download (3) (5).png", featured: true },
    { id: 70, name: "Hyati H3 — Al Barsha South", category: "False Ceiling & Partition", img: "./projectimg/download (9).png" },
    { id: 71, name: "Anwa Aria Tower — Dubai Maritime City", category: "False Ceiling & Partition", img: "./projectimg/download (5) (1).png", featured: true },
    { id: 72, name: "Chic Tower — Business Bay", category: "False Ceiling & Partition", img: "./projectimg/download (7) (1).png" },
    { id: 73, name: "Elegance Tower", category: "False Ceiling & Partition", img: "./projectimg/download (8) (1).png" },
    { id: 74, name: "Greenside Residence — Dubai Hills", category: "False Ceiling & Partition", img: "./projectimg/download (9) (1).png" },
    { id: 75, name: "Prime Heart & Lung Hospital", category: "MEP Works", img: "./projectimg/download (10).png", featured: true },
    { id: 76, name: "Address The Bay — Emaar Beachfront", category: "False Ceiling & Partition", img: "./projectimg/download (11).png", featured: true },
    { id: 77, name: "Mixed Use — Al Medif, Khorfakkan", category: "Civil Works", img: "./projectimg/download (13).png" },
    { id: 78, name: "Nad Al Shiba School — Phase 1", category: "Civil Works", img: "./projectimg/download (14).png" },
    { id: 79, name: "SLS Residence — Palm Jumeirah", category: "Interior Design & Fit-Out", img: "./projectimg/download (15).png", featured: true },
    { id: 80, name: "Sky Spiral Tower (Biltmore Sufouh)", category: "False Ceiling & Partition", img: "./projectimg/Sky-Spiral-Tower-Day-View-614x1024.png", featured: true },
    { id: 81, name: "Parkside Hills — Dubai Hills Estate", category: "False Ceiling & Partition", img: "./projectimg/PARKSIDE_HILLS_IMAGE2-scaled.jpg", featured: true },
    { id: 82, name: "Marsa Al Arab L5 SPA", category: "Interior Design & Fit-Out", img: "./projectimg/Marsa-Al-Arab-Exterior.jpg", featured: true },
    { id: 84, name: "Makan Housing Project — Hatta", category: "Civil Works", img: "./projectimg/afssg.png" },
    { id: 85, name: "DP World Head Office — Expo City", category: "MEP Works", img: "./AAAAAA.jpg", featured: true },
    { id: 86, name: "Victoria International School — Kalba", category: "Civil Works", img: "./projectimg/59b0c1_3abb320e18504179a17880e6813489d0~mv2 (1).jpg" },
    { id: 87, name: "Proposed Residential Project — Plots 86–89", category: "Civil Works", img: "./projectimg/2834-ALG-86-ARC-M3-PRESPECTIVE3-3384450 (1).jpg" },
    { id: 88, name: "Techno Hub 4 — Dubai Silicon Oasis", category: "MEP Works", img: "./projectimg/large_D5_Image_8_20230714_013430_342968d0e3 (1).png", featured: true },
    { id: 89, name: "G+P+10 Residential Tower — Wadi Al Safa", category: "False Ceiling & Partition", img: "./projectimg/Screenshot 2025-10-03 084111 (1).png" },
    { id: 90, name: "Dubai Creek Harbour Bridge District", category: "Civil Works", img: "./projectimg/Screenshot 2025-10-03 102435.png", featured: true },
    { id: 91, name: "MAG JLT — Mixed Use Tower", category: "False Ceiling & Partition", img: "./projectimg/MAG JLT R3 VIEW B.jpg" },
    { id: 92, name: "South Living — Residential Building", category: "False Ceiling & Partition", img: "./projectimg/South_Living.jpg" },
    { id: 93, name: "Costa Coffee — Deira City Centre", category: "Interior Design & Fit-Out", img: "./projectimg/Screenshot 2026-03-06 105307.png", featured: true },
    { id: 94, name: "Muhaisnah Community Housing", category: "Civil Works", img: "./projectimg/SITE -001.jpg", featured: true },
    { id: 96, name: "Dubai Police Headquarters Complex", category: "Civil Works", img: "https://www.sheridanuae.com/wp-content/uploads/2020/12/D409-Al-Aweer-Police-HQ..jpg" },
    { id: 97, name: "Hungary Pavilion — EXPO 2020 Dubai", category: "Interior Design & Fit-Out", img: "https://images.adsttc.com/media/images/6203/2036/44ba/f701/6571/b72a/newsletter/20211023-dubaj-pavilon-3048.jpg?1644372080" },
    { id: 98, name: "Family House & Service Block — Rul Dibba", category: "Civil Works", img: "https://alu-glaze.com/wp-content/uploads/2025/08/85877@4x-1.jpg" },
    { id: 99, name: "Intercontinental Resort & Hotel — Mina Al Arab", category: "Interior Design & Fit-Out", img: "https://www.rakproperties.ae/wp-content/uploads/2024/06/ACEO-Intercon-Post-Web-Image.jpg" },
    { id: 100, name: "Amazon Delivery Station — Al Quoz", category: "MEP Works", img: "https://eccfitout.com/wp-content/uploads/2025/12/DDB7-Amazon-03.jpg" },
    { id: 102, name: "Mixed-Use Building — Al Muteena", category: "Civil Works", img: "https://range.ae/_next/image?url=%2Fapi%2Fmedia%2Ffile%2Fal-muteena-27255_xl.jpg&w=3840&q=75" },
    { id: 103, name: "Areej 5, 6 & 7 — Muwaileh", category: "False Ceiling & Partition", img: "https://cdn.fazwaz.com/nw/OjhjzYlOdDkJaNWGsOyUdRbIK88/375x300/project/6993/areej-apartments-by-arada.png" },
    { id: 104, name: "Residential Building — Al Satwa", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/protenders/image/upload/c_limit,d_missing,dpr_3.0,f_auto,fl_progressive:semi,q_auto:eco,w_500/fd96defbc9e43d0445feacf872f98ea2.jpg" },
    { id: 105, name: "Etihad Mosque — Al Barsha 2nd", category: "Civil Works", img: "https://iacad.gov.ae/images/e556005c/3c01x2381wFFFFFF/png.aspx" },
    { id: 107, name: "Mosque — Al Quoz 3rd", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUK3uVVBt0_qZJ_rEvH3srbWwlFjykV4u_qg&s" },
    { id: 108, name: "Residential & Commercial Building — Al Mamzar", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzFVsUC19t49HzVgSG8Dxpx0R7K9s_FHnWIA&s" },
    { id: 109, name: "Commercial Center — Al Warqa'a", category: "Civil Works", img: "https://corporate.unioncoop.ae/wp-content/uploads/2018/03/Al-Warqa%E2%80%99a-Commercial-Center.png" },
    { id: 110, name: "ACT1 / ACT2 — Burj Khalifa", category: "Interior Design & Fit-Out", featured: true, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpvOFA0_lnsQxejLZuuEFa-phXz2vF0PkgYw&s" },
    { id: 111, name: "Residential Development — Al Jadaf", category: "Civil Works", img: "https://property.constructionweekonline.com/cloud/2024/02/06/Image_Art-Bay.jpg" },
    { id: 112, name: "Vida Hotel & Residences — Dubai Creek Harbour", category: "Interior Design & Fit-Out", featured: true, img: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/268427555.jpg?k=2ded2ec6b3097586061f0b1e207fb9b3e60d6490355ed908886069a6a39b7bdf&o=" },
    { id: 113, name: "10 Villas — Mirdif", category: "Civil Works", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR1Tl-nd35weIGB0DkU1_k7gkrYQJHmTma5g&s" },
    { id: 114, name: "Mosque of Reflection — City Walk", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkIFuwE0DLTG1lAFrV4-TsrESBFj2TYjk5sg&s" },
    { id: 115, name: "French Bakery — Multiple Branches", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_XuQGwAX_uWTPvJF0LF2hgVgkFaL_G77mTw&s" },
    { id: 117, name: "The Peninsula Sales Office", category: "Interior Design & Fit-Out", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbYSjaO3qWgN5QDXqOm8ryNX9P33a-NziCg&s" },
    { id: 118, name: "Park Island — Dubai Creek Harbour", category: "Civil Works", img: "https://cloud.famproperties.com/project/large/island-park-245255-160558.jpg" },
    { id: 119, name: "Three Community Centers", category: "Civil Works", img: "https://www.hattakayaktours.com/wp-content/uploads/2024/07/Al-Khail-Gate-Community-Centre.jpg" },
    { id: 120, name: "Topaz 2 — Dubai Silicon Oasis", category: "False Ceiling & Partition", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzcqzwM7JNwXg0H3G1b_ihgw_3coCxjlYwcA&s" },
    { id: 121, name: "Jumeirah Zabeel Saray Hotel Refurbishment", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/aa8e7e5b-31c1-4b9b-9b27-68a587d2898c_ufr3q1.jpg" },
    { id: 122, name: "R3 MBL Signature Tower — JLT", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/dade3b21-6b1d-4fd4-8740-85c9083c58cf_cknp56.jpg" },
    { id: 123, name: "INNOVATION HUB — TECOM Phase 3", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/e8518bb1-4b72-41ec-b52d-692fa2318129_uxhooj.jpg" },
    { id: 124, name: "THE ACRES Phase 1 — Dubai Land", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/a278c122-fa90-48a5-8c65-35fe9e4e8e32_lqmd4k.jpg" },
    { id: 125, name: "CENTRAL BUSINESS DISTRICT — Mweileh Tejari", category: "False Ceiling & Partition", img: "https://res.cloudinary.com/qh3zic6r/image/upload/v1783691662/ca0a4189-048e-4004-a5b7-8aa43689fee8_mkeail.jpg" },
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
    const imported = imageMap[src] || src;
    return (
        <img
            src={errored || !imported ? fallback : imported}
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
                <div style={{ height: 280, position: "relative", overflow: "hidden" }}>
                    <ProjectImage
                        src={project.img}
                        alt={project.name}
                        id={project.id}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.04)", transition: "transform 6s ease" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(2,7,48,0.97) 0%, rgba(2,7,48,0.1) 55%, transparent 100%)" }} />

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

                    <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 28px 24px" }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                            <span style={{
                                display: "inline-block",
                                background: meta.bg, color: meta.color,
                                fontSize: 9, fontWeight: 700, letterSpacing: "0.13em",
                                textTransform: "uppercase", padding: "4px 12px",
                                borderRadius: 20, fontFamily: "var(--f-body)",
                            }}>
                                {project.category}
                            </span>
                            {project.featured && (
                                <span style={{
                                    display: "inline-block",
                                    background: "var(--gold)", color: "var(--ink)",
                                    fontSize: 9, fontWeight: 700, letterSpacing: "0.13em",
                                    textTransform: "uppercase", padding: "4px 12px",
                                    borderRadius: 20, fontFamily: "var(--f-body)",
                                }}>★ Featured</span>
                            )}
                        </div>
                        <h2 style={{
                            fontFamily: "var(--f-display)",
                            fontSize: "clamp(1.2rem,2.5vw,1.8rem)",
                            fontWeight: 700, color: "#fff",
                            lineHeight: 1.22, maxWidth: 580, margin: 0,
                        }}>{project.name}</h2>
                    </div>
                </div>

                <div style={{ padding: "24px 28px 28px" }}>
                    <div style={{
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: 14,
                        padding: "16px 20px",
                        display: "flex", alignItems: "center", gap: 14,
                        border: "1px solid rgba(201,168,76,0.15)",
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--gold), var(--gold-dk))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "var(--ink)", fontWeight: 700, fontSize: 14, flexShrink: 0,
                        }}>Q</div>
                        <div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>Quality Assured</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(255,255,255,0.45)" }}>ISO 9001:2015 · ISO 14001:2015 · OHSAS 18001:2007</div>
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
        card.style.transform = `translateY(-6px) rotateX(${-dy * 3.5}deg) rotateY(${dx * 3.5}deg)`;
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
                style={{ perspective: 700 }}
            >
                <div className="proj-img-wrap">
                    <ProjectImage
                        src={project.img}
                        alt={project.name}
                        id={project.id}
                        className="proj-img"
                    />
                    <div className="proj-img-overlay" />
                    <div className="proj-img-frame" />
                    <div className="proj-view-hint">View Project</div>
                    <div className="proj-cat-label">{project.category}</div>
                    {project.featured && (
                        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 5 }}>
                            <span className="feat-badge" style={{
                                display: "inline-block",
                                background: "var(--gold)", color: "var(--ink)",
                                fontSize: 8, fontWeight: 700, letterSpacing: "0.14em",
                                textTransform: "uppercase", padding: "2px 8px",
                                borderRadius: 20, fontFamily: "var(--f-body)",
                                boxShadow: "0 2px 14px rgba(201,168,76,0.45)",
                            }}>★ Featured</span>
                        </div>
                    )}
                </div>

                <div className="proj-name-strip">
                    <h3 style={{
                        fontFamily: "var(--f-display)",
                        fontSize: "clamp(14px, 1.1vw, 16px)",
                        fontWeight: 700,
                        color: "#fff",
                        lineHeight: 1.3,
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
        <div style={{ position: "relative", maxWidth: 320, width: "100%" }}>
            <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 14, opacity: 0.5, pointerEvents: "none", color: "var(--gold)" }}>🔍</span>
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
                    color: "#fff", padding: "8px 12px 8px 38px",
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

/* ─── SOCIAL BUTTON ──────────────────────────────────────────────────────── */
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
                color: hov ? "var(--ink)" : "var(--gold)",
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
            <ProjectImage src="./img/QRCODE.jpeg" alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
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
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);
    const scrollY = useScrollY();
    const scrolled = scrollY > 56;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => { window.scrollTo(0, 0); }, []);

    // Handle video loading with retry for Android
    useEffect(() => {
        if (location.pathname === '/projects') {
            const loadVideo = () => {
                if (videoRef.current) {
                    // Set a timeout to handle slow loading on Android
                    const timeoutId = setTimeout(() => {
                        if (!videoLoaded && !videoError) {
                            console.log('Video loading timeout, showing fallback');
                            setVideoLoaded(true);
                        }
                    }, 8000);

                    videoRef.current.load();
                    videoRef.current.play()
                        .then(() => {
                            setVideoLoaded(true);
                            clearTimeout(timeoutId);
                        })
                        .catch(err => {
                            console.log('Video autoplay prevented:', err);
                            // Don't set error, just show fallback after timeout
                            clearTimeout(timeoutId);
                            setVideoLoaded(true);
                        });
                }
            };

            // Small delay to ensure DOM is ready
            const timer = setTimeout(loadVideo, 200);
            return () => clearTimeout(timer);
        }
    }, [location.pathname, videoLoaded, videoError]);

    // Handle user interaction for Android autoplay
    useEffect(() => {
        const handleInteraction = () => {
            if (videoRef.current && videoRef.current.paused && !videoError) {
                videoRef.current.play().catch(err => console.log('Play on interaction failed:', err));
            }
        };
        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        document.addEventListener('scroll', handleInteraction);
        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
            document.removeEventListener('scroll', handleInteraction);
        };
    }, [videoError]);

    const goTo = (id) => {
        setMenuOpen(false);
        if (id === "Home") { navigate("/"); return; }
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
                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px", height: "clamp(64px, 6vh, 74px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => goTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: "clamp(36px, 3.5vw, 44px)", height: "clamp(36px, 3.5vw, 44px)", borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "#01044A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 19px)", color: "#fff", lineHeight: 1.15 }}>Al Agha Group</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(6px, 0.6vw, 8px)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>of Companies</div>
                        </div>
                    </button>

                    <div style={{ display: "flex", gap: "clamp(16px, 2.5vw, 32px)", alignItems: "center" }} className="desktop-nav">
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} className={`nav-btn ${l === "Projects" ? "nav-active" : ""}`} style={{ color: "rgba(255,255,255,0.8)", fontSize: "clamp(11px, 1vw, 13px)" }}>{l}</button>
                        ))}
                        <button className="btn-gold" style={{ padding: "8px 18px", fontSize: "clamp(10px, 0.8vw, 12px)" }} onClick={() => goTo("Career")}>Join Us</button>
                    </div>

                    <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer", display: "none", alignItems: "center" }} className="mobile-toggle">
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {menuOpen && (
                    <div style={{ background: "rgba(2,7,48,0.98)", borderTop: "1px solid rgba(201,168,76,0.1)" }}>
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(201,168,76,0.08)", color: l === "Projects" ? "var(--gold)" : "rgba(255,255,255,0.75)", fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 500, padding: "15px 20px", textAlign: "left", cursor: "pointer" }}>{l}</button>
                        ))}
                    </div>
                )}
            </nav>

            {/* ── HERO WITH VIDEO ── */}
            <header style={{ minHeight: "50vh", position: "relative", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
                    <video
                        ref={videoRef}
                        key={`hero-video-${location.pathname}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        onCanPlay={() => { console.log('Video can play'); setVideoLoaded(true); }}
                        onPlay={() => console.log('Video is playing')}
                        onError={(e) => {
                            console.error('Video error:', e);
                            setVideoError(true);
                            setVideoLoaded(true);
                        }}
                        className="hero-video-bg"
                        style={{
                            opacity: videoLoaded ? 1 : 0,
                            transition: "opacity 1s ease",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            position: "absolute",
                            inset: 0,
                            // Android performance optimization
                            willChange: 'transform',
                            transform: 'translateZ(0)',
                            WebkitTransform: 'translateZ(0)',
                        }}
                    >
                        <source src={heroVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {(!videoLoaded || videoError) && (
                        <div style={{
                            position: "absolute",
                            inset: 0,
                            background: "linear-gradient(135deg, #02071c 0%, #060d50 50%, #02071c 100%)",
                            zIndex: 1,
                        }} />
                    )}
                </div>

                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(115deg, rgba(2,7,48,0.6) 0%, rgba(1,4,74,0.5) 45%, rgba(6,13,80,0.4) 100%)", zIndex: 1 }} />
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(2,7,48,0.5) 100%)", zIndex: 1, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60%", background: "linear-gradient(to top, rgba(2,7,48,0.6) 0%, transparent 100%)", zIndex: 1, pointerEvents: "none" }} />

                {/* Ambient orbs */}
                <div className="hero-orb" style={{ width: 400, height: 400, top: "-15%", left: "-10%", animationDelay: "0s", zIndex: 1 }} />
                <div className="hero-orb" style={{ width: 350, height: 350, bottom: "-20%", right: "5%", animationDelay: "3s", zIndex: 1 }} />

                <Particles />

                <div style={{ position: "absolute", left: 0, top: "10%", bottom: "10%", width: 2, background: "linear-gradient(to bottom, transparent, var(--gold), transparent)", zIndex: 1, opacity: 0.6 }} />

                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "clamp(80px, 10vh, 130px) 20px clamp(40px, 5vh, 60px)", position: "relative", zIndex: 2, width: "100%" }}>
                    <div style={{ maxWidth: 650 }}>
                        <div style={{ marginBottom: 24, animation: "fadeUp 0.8s 0.1s both" }}>
                            <span style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)", backdropFilter: "blur(20px)", padding: "6px 16px", borderRadius: 40, fontSize: "clamp(8px, 0.8vw, 10px)", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", boxShadow: "0 4px 15px rgba(201,168,76,0.1)" }}>
                                Project Portfolio
                            </span>
                        </div>
                        <h1 style={{ fontFamily: "var(--f-display)", fontWeight: 700, lineHeight: 1.04, letterSpacing: "-0.02em", fontSize: "clamp(2rem, 5vw, 3.8rem)", color: "#fff", marginBottom: 20, animation: "fadeUp 0.9s 0.2s both", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                            Our Work,<br />
                            <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Built to Last.</em>
                        </h1>
                        <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(14px, 1.1vw, 16px)", color: "rgba(255,255,255,0.8)", lineHeight: 1.8, maxWidth: 480, marginBottom: 32, animation: "fadeUp 1s 0.35s both", textShadow: "0 1px 10px rgba(0,0,0,0.3)" }}>
                            Over 200 completed projects across the UAE — from landmark towers and luxury hotels to government buildings, EXPO pavilions, and community developments.
                        </p>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap", animation: "fadeUp 1s 0.45s both" }}>
                            <button className="btn-gold" style={{ padding: "clamp(10px, 1vw, 14px) clamp(18px, 2vw, 28px)", fontSize: "clamp(10px, 0.8vw, 12px)" }}>Browse Projects</button>
                            <button className="btn-outline-white" style={{ padding: "clamp(10px, 1vw, 14px) clamp(18px, 2vw, 28px)", fontSize: "clamp(10px, 0.8vw, 12px)" }} onClick={() => goTo("About")}>Our Story</button>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── FILTER BAR ── */}
            <div style={{ background: "rgba(2,7,48,0.96)", backdropFilter: "blur(22px)", borderBottom: "1px solid rgba(201,168,76,0.15)", position: "sticky", top: "clamp(64px, 6vh, 74px)", zIndex: 99 }}>
                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px" }}>
                    <div className="filter-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", padding: "12px 0" }}>
                        <div className="pill-bar" style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                            {CATEGORIES.map(cat => (
                                <button key={cat} onClick={() => setActiveCategory(cat)} className={`cat-pill ${activeCategory === cat ? "active" : ""}`}>
                                    {cat === "All" ? "All" : cat.split(" ")[0]}
                                    <span style={{ fontSize: 10, opacity: 0.6 }}>({catCounts[cat]})</span>
                                </button>
                            ))}
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                            <SearchBar value={search} onChange={setSearch} />
                            <select
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value)}
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(201,168,76,0.25)", color: "#fff", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", padding: "7px 10px", borderRadius: 10, cursor: "pointer", outline: "none" }}
                            >
                                <option value="default">Featured first</option>
                                <option value="name">A – Z</option>
                            </select>
                            <label style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.7)", whiteSpace: "nowrap" }}>
                                <input type="checkbox" checked={showFeatured} onChange={e => setShowFeatured(e.target.checked)} style={{ accentColor: "var(--gold)", width: 14, height: 14 }} />
                                Featured
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RESULT COUNT ── */}
            <div style={{ maxWidth: 1320, margin: "0 auto", padding: "16px 20px 0" }}>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", color: "rgba(255,255,255,0.4)" }}>
                    Showing <strong style={{ color: "#fff" }}>{filtered.length}</strong> of {PROJECTS.length} projects
                    {search && <> matching "<span style={{ color: "var(--gold)" }}>{search}</span>"</>}
                    {activeCategory !== "All" && <> in <span style={{ color: "var(--gold)" }}>{activeCategory}</span></>}
                </p>
            </div>

            {/* ── PROJECT GRID ── */}
            <main style={{ maxWidth: 1320, margin: "0 auto", padding: "20px 20px 60px" }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 24px" }}>
                        <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                        <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "#fff", fontWeight: 700, marginBottom: 6 }}>No projects found</div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>Try adjusting your search or filters.</div>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory("All"); setShowFeatured(false); }}
                            style={{ marginTop: 16, background: "var(--gold)", color: "var(--ink)", border: "none", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 18px", borderRadius: 8, cursor: "pointer" }}
                        >Clear All Filters</button>
                    </div>
                ) : (
                    <div
                        className="project-grid"
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "clamp(16px, 1.5vw, 24px)" }}
                    >
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} index={i} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ background: "rgba(0,2,20,0.96)", padding: "clamp(40px, 5vw, 72px) 20px clamp(24px, 2.5vw, 36px)", borderTop: "1px solid rgba(201,168,76,0.12)" }}>
                <div style={{ maxWidth: 1320, margin: "0 auto" }}>
                    <div className="footer-grid">
                        <div>
                            <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                                <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#070d5a" }}>
                                    <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                                </div>
                                <div>
                                    <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 17px)", fontWeight: 700, color: "#fff" }}>Al Agha Group</div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(7px, 0.6vw, 9px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>of Companies</div>
                                </div>
                            </div>
                            <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", color: "rgba(255,255,255,0.35)", lineHeight: 1.8, maxWidth: 260, marginBottom: 22 }}>
                                False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                            </p>
                            <div style={{ display: "flex", gap: 8, marginBottom: 26, flexWrap: "wrap" }}>
                                <SocialBtn href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook"><Icons.Facebook /></SocialBtn>
                                <SocialBtn href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram"><Icons.Instagram /></SocialBtn>
                                <SocialBtn href="https://wa.me/97142675229" label="WhatsApp"><Icons.WhatsApp /></SocialBtn>
                                <SocialBtn href="https://linkedin.com/company/alaghagroup" label="LinkedIn"><Icons.LinkedIn /></SocialBtn>
                            </div>
                            <div style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 12, padding: "12px 14px" }}>
                                <QRCode />
                                <div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>Scan to connect</div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 12px)", color: "rgba(201,168,76,0.5)", lineHeight: 1.5 }}>Point your camera to visit Al Agha Group online</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Quick Links</h4>
                            {NAV.map(l => (
                                <button key={l} onClick={() => goTo(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.35)", fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", padding: "6px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.35)"}>{l}</button>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Services</h4>
                            {["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes"].map(s => (
                                <div key={s} style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.3)", padding: "5px 0", lineHeight: 1.5 }}>{s}</div>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contact</h4>
                            {[
                                ["📍", "Office 201 & 202, Block A, Abraj Al Mamzar, Dubai, U.A.E."],
                                ["📞", "+971 4 267 5229"],
                                ["✉️", "info@alaghagroup.com"],
                            ].map(([icon, txt]) => (
                                <div key={txt} style={{ display: "flex", gap: 10, padding: "5px 0", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.35)", lineHeight: 1.55 }}>
                                    <span style={{ flexShrink: 0 }}>{icon}</span><span>{txt}</span>
                                </div>
                            ))}
                            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(201,168,76,0.15)", height: "clamp(140px, 15vw, 180px)", marginTop: 16 }}>
                                <iframe
                                    title="Al Agha Group Office"
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2764583093857!2d55.35445537600424!3d25.28574307758295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cfe11994ee1%3A0x8bdd77fec9a0e9c3!2sAbraj%20Al%20Mamzar%20-%20Al%20Mamzar%20-%20Dubai!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae"
                                    width="100%" height="100%" style={{ border: "none", display: "block", filter: "invert(90%) hue-rotate(180deg)" }}
                                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </div>
                    </div>

                    <div style={{ borderTop: "1px solid rgba(201,168,76,0.12)", paddingTop: "clamp(18px, 1.8vw, 22px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.2)" }}>© 2025 Al Agha Group of Companies · All rights reserved</span>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.2)" }}>Privacy Policy · Terms of Service</span>
                    </div>
                </div>
            </footer>

            {/* ── MODAL ── */}
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}