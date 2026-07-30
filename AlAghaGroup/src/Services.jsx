import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../alaghalogo.png";
import qrCodeImg from "./certimg/QRCODE.jpeg";

/* ─── HERO BACKGROUND VIDEO (same source as App.jsx) ─────────────────────── */
const heroVideo = "https://res.cloudinary.com/iwfmnnaa/video/upload/v1784889132/0709_2_cfolje.mp4";

/* ─── GLOBAL CSS ─────────────────────────────────────────────────────────── */
const GLOBAL_CSS = `
  :root {
    --gold: #2563EB;
    --gold-dk: #1D4ED8;
    --gold-lt: #60A5FA;
    --ink: #0B1220;
    --bg-deep: #FFFFFF;
    --surface: #F5F8FF;
    --border: #DCE6FA;
    --f-display: 'Georgia', 'Times New Roman', serif;
    --f-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;
    --vh: 1vh;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body { background: var(--bg-deep); color: var(--ink); }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.3); }
    50% { box-shadow: 0 0 0 8px rgba(37,99,235,0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }
  @keyframes lineGrow {
    from { transform: scaleY(0); transform-origin: top; }
    to { transform: scaleY(1); transform-origin: top; }
  }
  @keyframes slideInLeft {
    from { opacity: 0; transform: translateX(-60px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes borderPulse {
    0%, 100% { border-color: rgba(37,99,235,0.15); }
    50% { border-color: rgba(37,99,235,0.4); }
  }
  @keyframes counterUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes glowPulse {
    0%, 100% { text-shadow: 0 0 20px rgba(37,99,235,0.12); }
    50% { text-shadow: 0 0 40px rgba(37,99,235,0.28), 0 0 80px rgba(37,99,235,0.1); }
  }
  @keyframes revealLine {
    from { width: 0; }
    to { width: 48px; }
  }
  @keyframes heroShimmerSweep {
    0%   { transform: translateX(-150%) skewX(-20deg); }
    100% { transform: translateX(250%) skewX(-20deg); }
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
  .divider-gold {
    display: block;
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, var(--gold), transparent);
    margin: 12px 0;
    animation: revealLine 0.8s ease both;
  }

  .btn-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, var(--gold-dk), var(--gold), var(--gold-lt));
    color: #fff;
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
    transition: all 0.25s ease;
    box-shadow: 0 4px 20px rgba(37,99,235,0.25);
    position: relative;
    overflow: hidden;
  }
  .btn-gold::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, var(--gold-lt), var(--gold), var(--gold-dk));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  .btn-gold:hover::before { opacity: 1; }
  .btn-gold:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(37,99,235,0.4);
  }
  .btn-gold span { position: relative; z-index: 1; }

  .btn-outline-gold {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: transparent;
    color: var(--gold);
    font-family: var(--f-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 11px 26px;
    border-radius: 8px;
    border: 1px solid rgba(37,99,235,0.4);
    cursor: pointer;
    transition: all 0.25s ease;
  }
  .btn-outline-gold:hover {
    background: var(--gold);
    color: #fff;
    border-color: var(--gold);
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(37,99,235,0.25);
  }

  .btn-outline-white {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    color: #fff;
    font-family: var(--f-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 11px 26px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.4);
    cursor: pointer;
    transition: all 0.25s ease;
    backdrop-filter: blur(10px);
  }
  .btn-outline-white:hover {
    background: rgba(255,255,255,0.2);
    border-color: #fff;
    transform: translateY(-2px);
  }

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
    transition: transform 0.25s ease;
    transform-origin: left;
  }
  .nav-btn:hover { color: var(--gold) !important; }
  .nav-btn:hover::after { transform: scaleX(1); }

  .feat-card {
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,0.14);
    border-radius: 14px;
    padding: 20px 22px;
    transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
    cursor: default;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(11,18,32,0.04);
  }
  .feat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(37,99,235,0.06) 0%, transparent 60%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }
  .feat-card:hover {
    background: var(--surface);
    border-color: rgba(37,99,235,0.4);
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(37,99,235,0.12), 0 0 0 1px rgba(37,99,235,0.15);
  }
  .feat-card:hover::before { opacity: 1; }

  .svc-pill {
    background: #FFFFFF;
    border: 1px solid rgba(37,99,235,0.3);
    border-radius: 30px;
    padding: 8px 20px;
    font-family: var(--f-body);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: rgba(11,18,32,0.6);
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.22,1,0.36,1);
    white-space: nowrap;
    flex-shrink: 0;
    box-shadow: 0 1px 6px rgba(11,18,32,0.04);
  }
  .svc-pill.active {
    background: var(--gold);
    border-color: var(--gold);
    color: #fff;
    box-shadow: 0 4px 16px rgba(37,99,235,0.35);
  }
  .svc-pill:hover:not(.active) {
    border-color: rgba(37,99,235,0.6);
    color: var(--gold);
    transform: translateY(-1px);
  }

  .pill-bar { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
  .pill-bar::-webkit-scrollbar { display: none; }
  .pill-wrap::before, .pill-wrap::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 40px;
    pointer-events: none;
    z-index: 2;
  }
  .pill-wrap::before { left: 0; background: linear-gradient(to right, rgba(255,255,255,1), transparent); }
  .pill-wrap::after  { right: 0; background: linear-gradient(to left, rgba(255,255,255,1), transparent); }

  .rp-bar {
    position: fixed; top: 0; left: 0; right: 0;
    height: 3px; z-index: 9999;
    background: rgba(37,99,235,0.1);
  }
  .rp-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt));
    transition: width 0.1s linear;
    box-shadow: 0 0 12px rgba(37,99,235,0.5);
  }

  .footer-link {
    background: none; border: none; padding: 0;
    font-family: var(--f-body);
    font-size: 13px;
    color: rgba(255,255,255,0.45);
    cursor: pointer;
    transition: all 0.25s ease;
    text-align: left;
    display: block;
    line-height: 1;
  }
  .footer-link:hover {
    color: var(--gold-lt);
    transform: translateX(4px);
  }
  .footer-social {
    width: 40px; height: 40px; border-radius: 10px;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(37,99,235,0.25);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.22,1,0.36,1);
    color: rgba(255,255,255,0.5);
    font-size: 15px;
    text-decoration: none;
  }
  .footer-social:hover {
    background: rgba(37,99,235,0.18);
    border-color: var(--gold-lt);
    color: var(--gold-lt);
    transform: translateY(-3px) rotate(5deg);
    box-shadow: 0 8px 20px rgba(37,99,235,0.25);
  }
  .footer-heading {
    font-family: var(--f-body);
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold-lt);
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .footer-heading::after {
    content: '';
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(37,99,235,0.4), transparent);
  }

  .parallax-slow { will-change: transform; }
  .parallax-fast { will-change: transform; }

  .svc-num-watermark {
    pointer-events: none;
    user-select: none;
    font-family: var(--f-display);
    font-weight: 700;
    color: rgba(37,99,235,0.045);
    line-height: 1;
    letter-spacing: -0.05em;
    transition: color 0.5s ease;
  }
  .svc-section:hover .svc-num-watermark {
    color: rgba(37,99,235,0.08);
  }

  .stat-val {
    display: inline-block;
    animation: counterUp 0.6s ease both;
  }

  .img-reveal-wrap {
    position: relative;
    overflow: hidden;
  }

  .btn-magnetic {
    display: inline-flex;
    transition: transform 0.3s cubic-bezier(0.22,1,0.36,1);
  }

  .qr-card {
    background:rgba(37,99,235,0.1);
    border: 1px solid rgba(37,99,235,0.22);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 14px;
    transition: all 0.3s ease;
    animation: borderPulse 3s ease infinite;
  }
  .qr-card:hover {
    background: var(--surface);
    border-color: rgba(37,99,235,0.5);
    animation: none;
  }

  .map-embed {
    border-radius: 12px;
    overflow: hidden;
    border: 1px solid rgba(37,99,235,0.22);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }
  .map-embed:hover {
    border-color: rgba(37,99,235,0.5);
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: transform 0.25s ease;
  }
  .contact-item:hover { transform: translateX(4px); }
  .contact-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: rgba(37,99,235,0.12);
    border: 1px solid rgba(37,99,235,0.25);
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; flex-shrink: 0;
    transition: all 0.3s ease;
  }
  .contact-item:hover .contact-icon {
    background: rgba(37,99,235,0.25);
    border-color: var(--gold-lt);
  }

  .gold-line-v {
    width: 1px;
    background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    transition: height 1.2s cubic-bezier(0.22,1,0.36,1);
  }

  .hero-video-container {
    position: absolute;
    inset: 0;
    overflow: hidden;
    z-index: 0;
    width: 100%;
    height: 100%;
  }
  .hero-video-wrap {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 100%;
  }
  .hero-video-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    will-change: opacity, transform;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    image-rendering: -webkit-optimize-contrast;
    image-rendering: crisp-edges;
  }

  @media (max-width: 900px) {
    .desktop-nav { display: none !important; }
    .mobile-btn  { display: flex !important; }
    .svc-grid    { grid-template-columns: 1fr !important; }
    .footer-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 640px) {
    .hero-title  { font-size: clamp(2.4rem, 10vw, 3.5rem) !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

/* ─── GEO BACKGROUND ─────────────────────────────────────────────────────── */
function GeoBg({ variant = "a" }) {
    const variants = {
        a: (
            <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <defs>
                    <radialGradient id="svRg1" cx="20%" cy="30%" r="60%">
                        <stop offset="0%" stopColor="#2563EB" stopOpacity="0.05" />
                        <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="svRg2" cx="85%" cy="75%" r="50%">
                        <stop offset="0%" stopColor="#DCE6FA" stopOpacity="0.6" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                    </radialGradient>
                </defs>
                <rect width="1440" height="900" fill="url(#svRg2)" />
                <rect width="1440" height="900" fill="url(#svRg1)" />
                <polygon points="160,20 310,105 310,275 160,360 10,275 10,105" fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth="1.5" />
                <polygon points="160,60 270,122 270,248 160,310 50,248 50,122" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
                <polygon points="1380,80 1430,108 1430,164 1380,192 1330,164 1330,108" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="1" />
                <line x1="0" y1="900" x2="500" y2="0" stroke="rgba(37,99,235,0.04)" strokeWidth="1" />
                <line x1="100" y1="900" x2="600" y2="0" stroke="rgba(37,99,235,0.03)" strokeWidth="1" />
                <circle cx="720" cy="450" r="380" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" strokeDasharray="6 14" />
                {[...Array(8)].map((_, row) => [...Array(12)].map((_, col) => (
                    <circle key={`${row}-${col}`} cx={col * 130 + 65} cy={row * 130 + 65} r="1.5" fill="rgba(37,99,235,0.14)" />
                )))}
            </svg>
        ),
        b: (
            <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <defs>
                    <linearGradient id="svLgb" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#F5F8FF" />
                        <stop offset="100%" stopColor="#FFFFFF" />
                    </linearGradient>
                </defs>
                <rect width="1440" height="700" fill="url(#svLgb)" />
                <line x1="0" y1="0" x2="1440" y2="700" stroke="rgba(37,99,235,0.06)" strokeWidth="60" />
                <line x1="1440" y1="0" x2="0" y2="700" stroke="rgba(37,99,235,0.04)" strokeWidth="60" />
                {[...Array(6)].map((_, row) => [...Array(9)].map((_, col) => {
                    const cx = col * 180 + (row % 2) * 90;
                    const cy = row * 120 + 60;
                    return <polygon key={`${row}-${col}`} points={`${cx},${cy - 30} ${cx + 50},${cy} ${cx},${cy + 30} ${cx - 50},${cy}`} fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1" />;
                }))}
                <path d="M 0 700 Q 720 0 1440 700" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="2" />
                <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1.5" />
                <circle cx="1440" cy="700" r="200" fill="none" stroke="rgba(37,99,235,0.06)" strokeWidth="1.5" />
            </svg>
        ),
        c: (
            <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                <rect width="1440" height="600" fill="#FFFFFF" />
                {[...Array(8)].map((_, i) => (
                    <path key={i} d={`M 0 ${i * 80 + 40} Q 360 ${i * 80 + 40 + (i % 2 ? -40 : 40)} 720 ${i * 80 + 40} T 1440 ${i * 80 + 40}`} fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
                ))}
                {[240, 480, 720, 960, 1200].map(x => (
                    <line key={x} x1={x} y1="0" x2={x} y2="600" stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="4 12" />
                ))}
                <polygon points="0,0 400,0 0,300" fill="rgba(37,99,235,0.04)" />
                <polygon points="1440,0 1040,0 1440,300" fill="rgba(37,99,235,0.04)" />
            </svg>
        ),
    };
    return (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
            {variants[variant]}
        </div>
    );
}

/* ─── HOOKS ──────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.1) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setVisible(true); },
            { threshold, rootMargin: "0px 0px -30px 0px" }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [threshold]);
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

function useParallax(speed = 0.3) {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const onScroll = () => {
            const rect = el.getBoundingClientRect();
            const center = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${center * speed}px)`;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [speed]);
    return ref;
}

/* Animated counter hook */
function useCounter(target, duration = 1200, start = false) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        if (!start) return;
        const isFloat = String(target).includes(".");
        let startTime = null;
        const step = (ts) => {
            if (!startTime) startTime = ts;
            const progress = Math.min((ts - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setVal(isFloat ? (eased * parseFloat(target)).toFixed(1) : Math.round(eased * parseFloat(target)));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return val;
}

/* ─── REVEAL ─────────────────────────────────────────────────────────────── */
function Reveal({ children, delay = 0, dir = "up", style = {}, className = "" }) {
    const [ref, visible] = useInView(0.08);
    const transforms = {
        up: "translateY(50px)",
        down: "translateY(-50px)",
        left: "translateX(-50px)",
        right: "translateX(50px)",
        zoom: "scale(0.88)",
        fade: "none",
    };
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : (transforms[dir] || "translateY(50px)"),
                transition: `opacity 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

/* ─── READING PROGRESS ───────────────────────────────────────────────────── */
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
        <div className="rp-bar">
            <div className="rp-fill" style={{ width: `${p}%` }} />
        </div>
    );
}

/* ─── ANIMATED STAT ──────────────────────────────────────────────────────── */
function AnimatedStat({ val, label, visible }) {
    const numMatch = val.match(/^([0-9.]+)(.*)$/);
    const numPart = numMatch ? numMatch[1] : "";
    const suffix = numMatch ? numMatch[2] : val;
    const counted = useCounter(numPart, 1400, visible);

    return (
        <div>
            <div style={{
                fontFamily: "var(--f-display)",
                fontSize: "clamp(2rem, 3.5vw, 2.6rem)",
                fontWeight: 700, color: "var(--gold)",
                lineHeight: 1, letterSpacing: "-0.02em",
                animation: visible ? "glowPulse 2s ease infinite" : "none",
            }}>
                {numPart ? `${counted}${suffix}` : val}
            </div>
            <div style={{
                fontFamily: "var(--f-body)", fontSize: 10,
                fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "rgba(11,18,32,0.4)", marginTop: 6,
            }}>
                {label}
            </div>
        </div>
    );
}

/* ─── DATA ───────────────────────────────────────────────────────────────── */
const NAV = ["Home", "About", "Services", "Projects", "Clients", "Career", "Team"];

const SERVICES = [
    {
        id: 1, slug: "paint-works", icon: "🎨",
        title: "Paint Works", tagline: "Every surface, flawlessly finished.",
        description: "We provide all kinds of decorative and standard paint works — from base coats and primers through to final finish coats. Whether it's flat, eggshell, satin, or high-gloss, water-based or solvent-based, we have the experience and precision equipment to coat every wall and ceiling to the highest standard.",
        features: [
            { label: "Base Coats & Primers", desc: "Correct surface preparation for lasting adhesion and uniform coverage." },
            { label: "Finish Coats", desc: "Flat, eggshell, gloss, and satin — matched to the exact sheen and tone specified." },
            { label: "Specialty Paints", desc: "Bathroom, kitchen, floor, metal, and traditional paints for every environment." },
            { label: "Full-Room Painting", desc: "Woodwork, walls, ceilings, and floors completed to the highest trade standard." },
            { label: "Water & Solvent-Based", desc: "Complete product knowledge across all modern and legacy paint systems." },
            { label: "Decorative Finishes", desc: "Textured coatings, faux finishes, and specialist feature-wall treatments." },
        ],
        image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=1200&q=85",
        stat1: { val: "15+", label: "Years Experience" },
        stat2: { val: "500K+", label: "Sq.m Painted" },
    },
    {
        id: 2, slug: "cladding-partition", icon: "🏛️",
        title: "Cladding & Partition Works", tagline: "Structure, beauty, and precision in every panel.",
        description: "We offer complete Cladding & Partition Gypsum Works for villas, mosques, commercial buildings, and landmark towers. Our scope covers interior and exterior decorative systems — gypsum drywall, GRG ceiling panels, GRG walls, GRG domes, GRC mouldings, decorative panels, and ornate columns — all executed to approved layouts and elevation details.",
        features: [
            { label: "Gypsum Drywall Systems", desc: "Precision-fit lightweight partitions for residential, hospitality, and commercial projects." },
            { label: "GRG Ceiling Panels", desc: "Glass-fibre reinforced gypsum ceiling solutions for curved, feature, and flat applications." },
            { label: "GRG Walls & Domes", desc: "Monolithic and segmental GRG for grand atriums, mosques, and signature interiors." },
            { label: "GRC Mouldings", desc: "Cornices, architraves, and custom profiles in glass-fibre reinforced concrete." },
            { label: "GRC Decorative Panels", desc: "Bespoke façade and interior panels, patterned to any approved elevation design." },
            { label: "Decorative Columns", desc: "Fluted, smooth, and ornate columns in GRC for lobbies, entrances, and exteriors." },
        ],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85",
        stat1: { val: "200+", label: "Projects Delivered" },
        stat2: { val: "38+", label: "Major Developments" },
    },
    {
        id: 3, slug: "interior-works", icon: "✨",
        title: "Interior Works", tagline: "Spaces that inspire — designed around you.",
        description: "We deliver innovative and creative interior design solutions tailored to every client's brief and vision. Our service covers total project management — from concept design through coordination, procurement, delivery, and installation of all finishes and furnishings — ensuring every detail is delivered on programme and to the highest standard.",
        features: [
            { label: "Concept & Design", desc: "Client-centred design development from mood board through to full construction drawings." },
            { label: "Project Management", desc: "End-to-end oversight of schedules, budgets, contractors, and quality checkpoints." },
            { label: "Floor & Wall Coverings", desc: "Specification, sourcing, and installation of all floor and wall finishes." },
            { label: "Furniture & Lighting", desc: "Full FF&E coordination — procurement, tracking, delivery, and installation." },
            { label: "Contractor Coordination", desc: "Seamless interface with civil, MEP, and specialist subcontractors." },
            { label: "Aftercare & Maintenance", desc: "Post-handover support and maintenance guidance for all installed elements." },
        ],
        image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85",
        stat1: { val: "100+", label: "Happy Clients" },
        stat2: { val: "500+", label: "Team Members" },
    },
    {
        id: 4, slug: "mep-works", icon: "⚙️",
        title: "MEP Works", tagline: "Full-scope building services, seamlessly coordinated.",
        description: "Al Agha Group delivers full Mechanical, Electrical, and Plumbing installations across residential towers, villas, commercial buildings, government facilities, and industrial warehouses. Our MEP division is backed by certified engineers, a dedicated MEP Operations Manager, and a track record of on-programme delivery on some of Dubai's most recognised developments.",
        features: [
            { label: "HVAC & Ductwork", desc: "Supply, install, and commission air-handling units, FCUs, VRF systems, and full ductwork." },
            { label: "Plumbing & Drainage", desc: "Complete water supply, drainage, and sanitary installations to DEWA and DM standards." },
            { label: "Electrical Installations", desc: "LV power, lighting, containment, DB boards, and cable tray systems." },
            { label: "Fire Fighting Systems", desc: "Sprinkler networks, fire hose reels, and suppression systems per DCDA codes." },
            { label: "BMS & Controls", desc: "Building management system integration, CCTV, access control, and data cabling." },
            { label: "Testing & Commissioning", desc: "Full T&C protocols, pressure testing, and handover documentation packages." },
        ],
        image: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=85",
        stat1: { val: "50+", label: "MEP Projects" },
        stat2: { val: "3", label: "UAE Emirates" },
    },
];

const MEP_PROJECTS = [
    { name: "Jewel of the Creek Development", location: "Dubai, UAE", client: "M/s Dubai Investment", consultant: "M/s. Al Hashemi", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Residential & Commercial" },
    { name: "Fatima Villa G+1", location: "Nadd Al Shiba, Dubai, UAE", client: "Ms. Fatma Mohd. Abdulla", consultant: "M/s Naga Architects", contractor: "M/S Gulf Modern Contracting LLC", type: "Villa" },
    { name: "Dubai Prosecution New Building", location: "Um Hurair Second, Dubai, UAE", client: "M/s Dubai Municipality", consultant: "M/s Archdome Consulting Engineers", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Government" },
    { name: "G+2P+6F+R Residential & Commercial", location: "Oud Metha, Dubai, UAE", client: "M/s Unicon Investment", consultant: "M/s Ozone Cool Electromechanical Works LLC", contractor: "M/s Synchro Electromechanical", type: "Mixed-Use" },
    { name: "B+G+17+R Residential Building", location: "Business Bay, Dubai, UAE", client: "Mr. Ahmed Ali Abdullah Al Alsari", consultant: "M/s Rimal Engineering Consultant", contractor: "M/s Technomech L.L.C.", type: "Residential Tower" },
    { name: "Warehouse Blocks A-2 & B-3", location: "Al Sajaa Industrial, Sharjah, UAE", client: "M/s Dubai Investment", consultant: "M/s. Al Hashemi", contractor: "M/s Prime Star Electrical & Mechanical Works LLC", type: "Industrial" },
    { name: "DHRE: Myrtyle Residence — City Walk", location: "Phase 5, City Walk, Dubai, UAE", client: "M/s MEERAS", consultant: "M/s. Arif & Bintoak", contractor: "M/s. Conversion Electromechanical Company LLC", type: "Residential" },

];

const QUICK_LINKS = ["Home", "Services", "Projects", "Career", "Clients", "Team", "About"];
const FOOTER_SERVICES = ["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes", "Architectural Design & Planning"];

/* ─── FEATURE CARD ───────────────────────────────────────────────────────── */
function FeatureCard({ feature, index }) {
    const cardRef = useRef(null);
    const onMove = (e) => {
        const el = cardRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${mx}%`);
        el.style.setProperty("--my", `${my}%`);
    };
    return (
        <Reveal delay={index * 60} dir="up">
            <div ref={cardRef} className="feat-card" onMouseMove={onMove}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
                    <div style={{
                        width: 8, height: 8, borderRadius: "50%",
                        background: "var(--gold)", flexShrink: 0, marginTop: 6,
                        animation: "pulse-gold 2.5s ease infinite",
                        animationDelay: `${index * 200}ms`,
                    }} />
                    <div>
                        <div style={{
                            fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 700,
                            color: "var(--ink)", marginBottom: 6, lineHeight: 1.3,
                        }}>
                            {feature.label}
                        </div>
                        <div style={{
                            fontFamily: "var(--f-body)", fontSize: 13,
                            color: "rgba(11,18,32,0.55)", lineHeight: 1.7,
                        }}>
                            {feature.desc}
                        </div>
                    </div>
                </div>
            </div>
        </Reveal>
    );
}

/* ─── MEP PROJECT ROW ────────────────────────────────────────────────────── */
function MepProjectRow({ project }) {
    const [hov, setHov] = useState(false);
    return (
        <div
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
                background: hov ? "var(--surface)" : "#FFFFFF",
                border: `1px solid ${hov ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.12)"}`,
                borderRadius: 14, padding: "14px 18px",
                display: "flex", alignItems: "flex-start", gap: 14,
                transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                transform: hov ? "translateX(6px)" : "none",
                cursor: "default",
                boxShadow: hov ? "0 4px 24px rgba(37,99,235,0.1)" : "0 1px 6px rgba(11,18,32,0.03)",
            }}
        >
            <div style={{
                flexShrink: 0, marginTop: 2,
                background: hov ? "rgba(37,99,235,0.18)" : "rgba(37,99,235,0.1)",
                border: "1px solid rgba(37,99,235,0.25)",
                borderRadius: 6, padding: "3px 9px",
                fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)",
                whiteSpace: "nowrap", transition: "background 0.3s ease",
            }}>
                {project.type}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                    fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700,
                    color: "var(--ink)", marginBottom: 4, lineHeight: 1.3,
                }}>
                    {project.name}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(11,18,32,0.45)", lineHeight: 1.6 }}>
                    📍 {project.location} &nbsp;·&nbsp; Client: {project.client}
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(37,99,235,0.75)", marginTop: 3 }}>
                    Contractor: {project.contractor}
                </div>
            </div>
        </div>
    );
}

/* ─── SERVICE SECTION ────────────────────────────────────────────────────── */
function ServiceSection({ service, index }) {
    const isEven = index % 2 === 0;
    const geoVariants = ["a", "b", "c", "a"];
    const [imgHov, setImgHov] = useState(false);
    const [statRef, statsVisible] = useInView(0.2);
    const parallaxRef = useParallax(0.12);

    return (
        <section
            id={service.slug}
            className="svc-section"
            style={{
                position: "relative", overflow: "hidden",
                padding: "clamp(80px, 10vw, 120px) clamp(20px, 5vw, 60px)",
            }}
        >
            <GeoBg variant={geoVariants[index % 3]} />

            {/* Watermark number with parallax */}
            <div
                ref={parallaxRef}
                className="svc-num-watermark"
                style={{
                    position: "absolute",
                    top: "50%",
                    [isEven ? "right" : "left"]: "-0.02em",
                    transform: "translateY(-50%)",
                    fontSize: "clamp(10rem, 20vw, 18rem)",
                }}
            >
                {String(index + 1).padStart(2, "0")}
            </div>

            {/* Gold accent line */}
            <Reveal dir="fade" style={{
                position: "absolute",
                [isEven ? "left" : "right"]: 0,
                top: "20%", bottom: "20%", width: 2,
                background: "linear-gradient(to bottom, transparent, rgba(37,99,235,0.35), transparent)",
            }} />

            <div style={{
                maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                gap: "clamp(40px, 6vw, 90px)",
                alignItems: "center",
            }}>
                {/* Text Column */}
                <div style={{ order: isEven ? 1 : 2 }}>
                    <Reveal dir={isEven ? "left" : "right"}>
                        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                            <div style={{
                                width: 52, height: 52, borderRadius: 14,
                                background: "linear-gradient(135deg, var(--gold-dk), var(--gold))",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 24, flexShrink: 0,
                                boxShadow: "0 8px 28px rgba(37,99,235,0.3)",
                                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            }}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(10deg) scale(1.08)"; e.currentTarget.style.boxShadow = "0 12px 36px rgba(37,99,235,0.45)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(37,99,235,0.3)"; }}
                            >
                                {service.icon}
                            </div>
                            <span className="eyebrow">Service {String(index + 1).padStart(2, "0")}</span>
                        </div>

                        <h2 style={{
                            fontFamily: "var(--f-display)", fontWeight: 700,
                            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
                            color: "var(--ink)", lineHeight: 1.1,
                            letterSpacing: "-0.015em", marginBottom: 8,
                        }}>
                            {service.title}
                        </h2>

                        <p style={{
                            fontFamily: "var(--f-display)",
                            fontSize: "clamp(1rem, 1.8vw, 1.25rem)",
                            fontStyle: "italic", color: "var(--gold)",
                            marginBottom: 16, fontWeight: 500,
                        }}>
                            {service.tagline}
                        </p>

                        <span className="divider-gold" style={{ marginBottom: 20 }} />

                        <p style={{
                            fontFamily: "var(--f-body)",
                            fontSize: "clamp(14px, 1.4vw, 15px)",
                            color: "rgba(11,18,32,0.62)", lineHeight: 1.85, marginBottom: 32,
                        }}>
                            {service.description}
                        </p>

                        {/* Animated stats */}
                        <div ref={statRef} style={{
                            display: "flex", gap: "clamp(24px, 4vw, 48px)",
                            padding: "22px 0",
                            borderTop: "1px solid rgba(37,99,235,0.15)",
                            borderBottom: "1px solid rgba(37,99,235,0.15)",
                            marginBottom: 32, flexWrap: "wrap",
                        }}>
                            {[service.stat1, service.stat2].map((s) => (
                                <AnimatedStat key={s.label} val={s.val} label={s.label} visible={statsVisible} />
                            ))}
                        </div>
                    </Reveal>

                    {/* Features grid */}
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))",
                        gap: 12,
                    }}>
                        {service.features.map((f, i) => (
                            <FeatureCard key={f.label} feature={f} index={i} />
                        ))}
                    </div>

                    {/* MEP project table */}
                    {service.id === 4 && (
                        <div style={{ marginTop: 40 }}>
                            <Reveal dir="up" delay={100}>
                                <div style={{ marginBottom: 20 }}>
                                    <span className="eyebrow" style={{ marginBottom: 10, display: "block" }}>MEP Project References</span>
                                    <h3 style={{
                                        fontFamily: "var(--f-display)", fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                                        fontWeight: 700, color: "var(--ink)",
                                    }}>
                                        Delivered across Dubai & Sharjah
                                    </h3>
                                </div>
                            </Reveal>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {MEP_PROJECTS.map((proj, i) => (
                                    <Reveal key={proj.name} delay={i * 45} dir="left">
                                        <MepProjectRow project={proj} />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Image Column */}
                <div style={{ order: isEven ? 2 : 1 }}>
                    <Reveal dir={isEven ? "right" : "left"} delay={100}>
                        <div
                            className="img-reveal-wrap"
                            onMouseEnter={() => setImgHov(true)}
                            onMouseLeave={() => setImgHov(false)}
                            style={{
                                position: "relative", borderRadius: 20, overflow: "hidden",
                                boxShadow: imgHov
                                    ? "0 56px 100px rgba(37,99,235,0.28), 0 0 0 1px rgba(37,99,235,0.35)"
                                    : "0 24px 64px rgba(11,18,32,0.15), 0 0 0 1px rgba(37,99,235,0.12)",
                                transition: "box-shadow 0.6s cubic-bezier(0.22,1,0.36,1)",
                                aspectRatio: "4/5",
                            }}
                        >
                            <img
                                src={service.image}
                                alt={service.title}
                                style={{
                                    width: "100%", height: "100%", objectFit: "cover", display: "block",
                                    transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
                                    transform: imgHov ? "scale(1.06)" : "scale(1)",
                                }}
                            />
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to top, rgba(11,18,32,0.85) 0%, rgba(11,18,32,0.08) 50%, transparent 100%)",
                            }} />

                            {/* Top badge */}
                            <div style={{
                                position: "absolute", top: 20, left: 20,
                                background: "rgba(11,18,32,0.7)", backdropFilter: "blur(12px)",
                                border: "1px solid rgba(37,99,235,0.4)", borderRadius: 40,
                                padding: "6px 16px",
                                fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700,
                                letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold-lt)",
                                transition: "all 0.3s ease",
                            }}>
                                Al Agha Group
                            </div>

                            {/* Hover overlay content */}
                            <div style={{
                                position: "absolute", top: 20, right: 20,
                                opacity: imgHov ? 1 : 0,
                                transform: imgHov ? "scale(1)" : "scale(0.8)",
                                transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                                background: "rgba(37,99,235,0.22)", backdropFilter: "blur(12px)",
                                border: "1px solid rgba(37,99,235,0.5)", borderRadius: "50%",
                                width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 20,
                            }}>
                                {service.icon}
                            </div>

                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                padding: "40px 24px 24px",
                                transform: imgHov ? "translateY(0)" : "translateY(8px)",
                                transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
                            }}>
                                <div style={{
                                    fontFamily: "var(--f-display)",
                                    fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)",
                                    fontWeight: 700, color: "#fff", lineHeight: 1.25,
                                }}>
                                    {service.title}
                                </div>
                                <div style={{
                                    fontFamily: "var(--f-body)", fontSize: 11,
                                    color: "rgba(96,165,250,0.9)", marginTop: 6, fontWeight: 500,
                                }}>
                                    {service.features.length} specialisations
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

/* ─── FOOTER SOCIAL ICON ─────────────────────────────────────────────────── */
function SocialIcon({ href, label, children }) {
    return (
        <a href={href || "#"} target="_blank" rel="noopener noreferrer"
            className="footer-social" aria-label={label} title={label}>
            {children}
        </a>
    );
}

/* ─── RICH FOOTER (dark for contrast against light body; matches App.jsx QR code) ── */
function Footer({ goHome, goProjects, scrollToService, navigateTo }) {
    const [ref, visible] = useInView(0.05);

    return (
        <footer ref={ref} style={{
            background: "#0B1220",
            borderTop: "1px solid rgba(37,99,235,0.2)",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Geo bg */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
                <svg viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice"
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.4 }}>
                    <defs>
                        <radialGradient id="fRg1" cx="10%" cy="50%" r="40%">
                            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="fRg2" cx="90%" cy="50%" r="40%">
                            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
                        </radialGradient>
                    </defs>
                    <rect width="1440" height="600" fill="url(#fRg2)" />
                    <rect width="1440" height="600" fill="url(#fRg1)" />
                    {[...Array(5)].map((_, i) => (
                        <line key={i} x1={i * 360} y1="0" x2={i * 360} y2="600"
                            stroke="rgba(37,99,235,0.06)" strokeWidth="1" strokeDasharray="4 12" />
                    ))}
                </svg>
            </div>

            {/* Main footer grid */}
            <div style={{
                maxWidth: 1320, margin: "0 auto",
                padding: "clamp(48px, 7vw, 80px) clamp(20px, 5vw, 60px) clamp(32px, 4vw, 48px)",
                position: "relative", zIndex: 1,
            }}>
                <div className="footer-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "1.4fr 1fr 1fr 1.3fr",
                    gap: "clamp(32px, 5vw, 60px)",
                }}>

                    {/* Col 1 — Brand */}
                    <div style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(30px)",
                        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 0ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0ms",
                    }}>
                        {/* Logo */}
                        <button onClick={goHome} style={{
                            background: "none", border: "none", cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 12, marginBottom: 20, padding: 0,
                        }}>
                            <img
                                src={logo}
                                alt="Al Agha Group"
                                style={{
                                    height: 52, width: "auto", objectFit: "contain",
                                    filter: "drop-shadow(0 4px 12px rgba(37,99,235,0.3))",
                                    transition: "filter 0.3s ease, transform 0.3s ease",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.filter = "drop-shadow(0 6px 20px rgba(37,99,235,0.55))"; e.currentTarget.style.transform = "scale(1.05)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.filter = "drop-shadow(0 4px 12px rgba(37,99,235,0.3))"; e.currentTarget.style.transform = "none"; }}
                            />
                            <div style={{ textAlign: "left" }}>
                                <div style={{
                                    fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 17,
                                    color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.2,
                                }}>
                                    Al Agha Group
                                </div>
                                <div style={{
                                    fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700,
                                    letterSpacing: "0.18em", textTransform: "uppercase",
                                    color: "var(--gold-lt)",
                                }}>
                                    of Companies
                                </div>
                            </div>
                        </button>

                        <p style={{
                            fontFamily: "var(--f-body)", fontSize: 13,
                            color: "rgba(255,255,255,0.4)", lineHeight: 1.75,
                            marginBottom: 24, maxWidth: 280,
                        }}>
                            False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                        </p>

                        {/* Social icons */}
                        <div style={{ display: "flex", gap: 10, marginBottom: 28 }}>
                            <SocialIcon href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                </svg>
                            </SocialIcon>
                            <SocialIcon href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </SocialIcon>
                        </div>

                        {/* QR card — same QR image asset as App.jsx */}
                        <div className="qr-card">
                            <div style={{
                                width: 56, height: 56, borderRadius: 8,
                                background: "rgba(37,99,235,0.25)", flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                                padding: 4, overflow: "hidden",
                            }}>
                                <img
                                    src={qrCodeImg}
                                    alt="QR Code"
                                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                />
                            </div>
                            <div>
                                <div style={{
                                    fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                                    letterSpacing: "0.16em", textTransform: "uppercase",
                                    color: "var(--gold-lt)", marginBottom: 4,
                                }}>
                                    Scan to Connect
                                </div>
                                <div style={{
                                    fontFamily: "var(--f-body)", fontSize: 11,
                                    color: "rgba(96,165,250,0.6)", lineHeight: 1.5,
                                }}>
                                    Point your camera to visit<br />Al Agha Group online
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Col 2 — Quick Links */}
                    <div style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(30px)",
                        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 100ms",
                    }}>
                        <div className="footer-heading">Quick Links</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {QUICK_LINKS.map((l, i) => (
                                <button
                                    key={l}
                                    className="footer-link"
                                    style={{
                                        transitionDelay: `${i * 40}ms`,
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? "none" : "translateX(-16px)",
                                        transition: `opacity 0.6s ease ${i * 50 + 150}ms, transform 0.6s ease ${i * 50 + 150}ms, color 0.2s ease`,
                                    }}
                                    onClick={() => {
                                        if (l === "Projects") goProjects();
                                        else if (l === "Services") scrollToService(0);
                                        else if (l === "About") navigateTo("About");
                                        else if (l === "Home") goHome();
                                        else navigateTo(l);
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Col 3 — Services */}
                    <div style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(30px)",
                        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 200ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 200ms",
                    }}>
                        <div className="footer-heading">Services</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {FOOTER_SERVICES.map((s, i) => (
                                <button
                                    key={s}
                                    className="footer-link"
                                    style={{
                                        opacity: visible ? 1 : 0,
                                        transform: visible ? "none" : "translateX(-16px)",
                                        transition: `opacity 0.6s ease ${i * 50 + 250}ms, transform 0.6s ease ${i * 50 + 250}ms, color 0.2s ease`,
                                    }}
                                    onClick={() => scrollToService(0)}
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Col 4 — Contact */}
                    <div style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(30px)",
                        transition: "opacity 0.8s cubic-bezier(0.22,1,0.36,1) 300ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 300ms",
                    }}>
                        <div className="footer-heading">Contact</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 18, marginBottom: 24 }}>

                            {/* Address */}
                            <div className="contact-item">
                                <div className="contact-icon">📍</div>
                                <div>
                                    <div style={{
                                        fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        color: "rgba(96,165,250,0.65)", marginBottom: 4,
                                    }}>
                                        Office
                                    </div>
                                    <div style={{
                                        fontFamily: "var(--f-body)", fontSize: 12,
                                        color: "rgba(255,255,255,0.55)", lineHeight: 1.6,
                                    }}>
                                        Office 201 & 202, Block A, Abraj Al Mamzar,<br />
                                        Al Mamzar, Dubai, U.A.E.
                                    </div>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="contact-item">
                                <div className="contact-icon">📞</div>
                                <div>
                                    <div style={{
                                        fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        color: "rgba(96,165,250,0.65)", marginBottom: 4,
                                    }}>
                                        Phone
                                    </div>
                                    <a href="tel:+97142675229" style={{
                                        fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600,
                                        color: "rgba(255,255,255,0.75)", textDecoration: "none",
                                        transition: "color 0.2s ease",
                                        letterSpacing: "0.02em",
                                    }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-lt)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
                                    >
                                        +971 4 267 5229
                                    </a>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="contact-item">
                                <div className="contact-icon">✉️</div>
                                <div>
                                    <div style={{
                                        fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        color: "rgba(96,165,250,0.65)", marginBottom: 4,
                                    }}>
                                        Email
                                    </div>
                                    <a href="mailto:info@alaghagroup.com" style={{
                                        fontFamily: "var(--f-body)", fontSize: 13,
                                        color: "rgba(255,255,255,0.55)", textDecoration: "none",
                                        transition: "color 0.2s ease",
                                    }}
                                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-lt)")}
                                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
                                    >
                                        info@alaghagroup.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map embed */}
                        <div className="map-embed" style={{ height: 160, overflow: "hidden" }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2764583093857!2d55.35445537600424!3d25.28574307758295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cfe11994ee1%3A0x8bdd77fec9a0e9c3!2sAbraj%20Al%20Mamzar%20-%20Al%20Mamzar%20-%20Dubai!5e0!3m2!1en!2sae!4v1700000000000!5m2!1sen!2sae"
                                width="100%"
                                height="160"
                                style={{ border: 0, display: "block" }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Al Agha Group Location"
                            />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div style={{
                    height: 1,
                    background: "linear-gradient(to right, transparent, rgba(37,99,235,0.25), transparent)",
                    margin: "clamp(32px, 4vw, 48px) 0 clamp(24px, 3vw, 32px)",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "scaleX(1)" : "scaleX(0)",
                    transition: "opacity 0.8s ease 400ms, transform 0.8s ease 400ms",
                    transformOrigin: "center",
                }} />

                {/* Bottom bar */}
                <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", flexWrap: "wrap", gap: 16,
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.8s ease 500ms",
                }}>
                    {/* Logo small */}
                    <button onClick={goHome} style={{
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", gap: 10, padding: 0,
                    }}>
                        <img
                            src={logo}
                            alt="Al Agha Group"
                            style={{ height: 32, width: "auto", objectFit: "contain", opacity: 0.85 }}
                        />
                        <span style={{
                            fontFamily: "var(--f-display)", fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.6)",
                        }}>
                            Al Agha Group
                        </span>
                    </button>

                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(96,165,250,0.4)" }}>
                        © 2025 Al Agha Group · All rights reserved
                    </div>

                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                        {["Home", "Services", "Projects"].map((l) => (
                            <button
                                key={l}
                                onClick={() => {
                                    if (l === "Projects") goProjects();
                                    else if (l === "Services") scrollToService(0);
                                    else goHome();
                                }}
                                style={{
                                    background: "none", border: "none",
                                    fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 500,
                                    color: "rgba(96,165,250,0.45)", cursor: "pointer",
                                    transition: "color 0.2s ease", padding: 0,
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold-lt)")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(96,165,250,0.45)")}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

/* ─── LOGO COMPONENT ─────────────────────────────────────────────────────── */
function LogoMark({ size = 44, onClick, dark = false }) {
    return (
        <button onClick={onClick} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", gap: 12, padding: 0,
        }}>
            <img
                src={logo}
                alt="Al Agha Group"
                style={{
                    height: size, width: "auto", objectFit: "contain",
                    filter: "drop-shadow(0 2px 8px rgba(37,99,235,0.3))",
                    transition: "filter 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.filter = "drop-shadow(0 4px 16px rgba(37,99,235,0.5))"; e.currentTarget.style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.filter = "drop-shadow(0 2px 8px rgba(37,99,235,0.3))"; e.currentTarget.style.transform = "none"; }}
            />
            <div style={{ textAlign: "left" }}>
                <div style={{
                    fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 19,
                    color: dark ? "var(--ink)" : "#fff", letterSpacing: "-0.01em", lineHeight: 1.15,
                    transition: "color 0.3s ease",
                }}>
                    Al Agha Group
                </div>
                <div style={{
                    fontFamily: "var(--f-body)", fontSize: 8, fontWeight: 700,
                    letterSpacing: "0.18em", textTransform: "uppercase",
                    color: "var(--gold)",
                }}>
                    of Companies
                </div>
            </div>
        </button>
    );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────────────────── */
export default function ViewServices() {
    const navigate = useNavigate();
    const scrollY = useScrollY();
    const scrolled = scrollY > 60;
    const [menu, setMenu] = useState(false);
    const [activePill, setActivePill] = useState(0);

    // Hero video state
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const videoRef = useRef(null);

    // IMPORTANT: This function handles navigation from Services page
    // When "About" is clicked, it navigates to home and scrolls to the about section
    const navigateTo = (section) => {
        if (section === "Home") {
            navigate("/");
            return;
        }
        if (section === "Projects") {
            navigate("/projects");
            return;
        }
        if (section === "Services") {
            // Already on services page, scroll to service section
            scrollToService(0);
            return;
        }
        // For About, Clients, Career, Team - navigate home then scroll
        navigate("/");
        setTimeout(() => {
            const el = document.getElementById(section.toLowerCase().replace(/\s+/g, "-"));
            if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 150);
    };

    useEffect(() => {
        const loadVideo = () => {
            if (videoRef.current) {
                const timeoutId = setTimeout(() => {
                    if (!videoLoaded && !videoError) setVideoLoaded(true);
                }, 8000);
                videoRef.current.load();
                videoRef.current.play()
                    .then(() => { setVideoLoaded(true); clearTimeout(timeoutId); })
                    .catch(() => { clearTimeout(timeoutId); setVideoLoaded(true); });
            }
        };
        const timer = setTimeout(loadVideo, 200);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const scrollToService = (index) => {
        setActivePill(index);
        const el = document.getElementById(SERVICES[index].slug);
        if (el) {
            const offset = 140;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    const goHome = () => navigate("/");
    const goProjects = () => navigate("/projects");

    // Sync active pill with scroll
    useEffect(() => {
        const onScroll = () => {
            let current = 0;
            SERVICES.forEach((s, i) => {
                const el = document.getElementById(s.slug);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 200) current = i;
                }
            });
            setActivePill(current);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Magnetic button effect on btn-gold
    useEffect(() => {
        const btns = document.querySelectorAll(".btn-magnetic");
        const handlers = [];
        btns.forEach(btn => {
            const onMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const dx = (e.clientX - rect.left - rect.width / 2) * 0.18;
                const dy = (e.clientY - rect.top - rect.height / 2) * 0.18;
                btn.style.transform = `translate(${dx}px, ${dy}px)`;
            };
            const onLeave = () => { btn.style.transform = "none"; };
            btn.addEventListener("mousemove", onMove);
            btn.addEventListener("mouseleave", onLeave);
            handlers.push({ btn, onMove, onLeave });
        });
        return () => {
            handlers.forEach(({ btn, onMove, onLeave }) => {
                btn.removeEventListener("mousemove", onMove);
                btn.removeEventListener("mouseleave", onLeave);
            });
        };
    }, []);

    return (
        <>
            <style>{GLOBAL_CSS}</style>
            <div style={{
                background: "var(--bg-deep)", color: "var(--ink)",
                fontFamily: "var(--f-body)", overflowX: "hidden",
            }}>
                <ReadingProgress />

                {/* Ambient shapes */}
                <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                    <div style={{
                        position: "absolute", width: 700, height: 700,
                        top: "-250px", left: "-250px",
                        background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)",
                        animation: "float 8s ease-in-out infinite",
                    }} />
                    <div style={{
                        position: "absolute", width: 500, height: 500,
                        bottom: "10%", right: "-100px",
                        background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
                        animation: "float 10s ease-in-out infinite reverse",
                    }} />
                    <div style={{
                        position: "absolute", width: 300, height: 300,
                        top: "40%", right: "25%",
                        background: "radial-gradient(circle, rgba(37,99,235,0.035) 0%, transparent 70%)",
                        animation: "float 12s ease-in-out infinite",
                        animationDelay: "2s",
                    }} />
                </div>

                {/* ── NAV ── */}
                <nav style={{
                    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
                    background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
                    backdropFilter: scrolled ? "blur(20px)" : "none",
                    boxShadow: scrolled ? "0 1px 0 rgba(37,99,235,0.12)" : "none",
                    transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                }}>
                    <div style={{
                        maxWidth: 1320, margin: "0 auto",
                        padding: "0 clamp(16px, 4vw, 36px)",
                        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}>
                        <LogoMark size={42} onClick={goHome} dark={scrolled} />

                        {/* Desktop nav */}
                        <div style={{ display: "flex", gap: 32, alignItems: "center" }} className="desktop-nav">
                            {NAV.map((l) => (
                                <button
                                    key={l}
                                    onClick={() => {
                                        if (l === "Projects") navigateTo("Projects");
                                        else if (l === "Services") scrollToService(0);
                                        else navigateTo(l);
                                    }}
                                    className="nav-btn"
                                    style={{ color: l === "Services" ? "var(--gold)" : (scrolled ? "rgba(11,18,32,0.75)" : "rgba(255,255,255,0.92)") }}
                                >
                                    {l}
                                </button>
                            ))}
                            <button className="btn-gold btn-magnetic" style={{ padding: "10px 22px" }} onClick={() => navigateTo("Projects")}>
                                <span>View Projects →</span>
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenu((o) => !o)}
                            style={{
                                background: "none", border: "none", color: scrolled ? "var(--ink)" : "#fff",
                                fontSize: 22, cursor: "pointer", display: "none",
                                transition: "transform 0.3s ease, color 0.3s ease",
                                transform: menu ? "rotate(90deg)" : "none",
                            }}
                            className="mobile-btn"
                        >
                            {menu ? "✕" : "☰"}
                        </button>
                    </div>

                    {/* Mobile menu */}
                    {menu && (
                        <div style={{
                            background: "rgba(255,255,255,0.98)",
                            borderTop: "1px solid rgba(37,99,235,0.12)",
                            animation: "fadeDown 0.3s ease both",
                        }}>
                            {NAV.map((l, i) => (
                                <button
                                    key={l}
                                    onClick={() => {
                                        setMenu(false);
                                        if (l === "Projects") navigateTo("Projects");
                                        else if (l === "Services") scrollToService(0);
                                        else navigateTo(l);
                                    }}
                                    style={{
                                        display: "block", width: "100%", background: "none",
                                        border: "none", borderBottom: "1px solid rgba(37,99,235,0.08)",
                                        color: l === "Services" ? "var(--gold)" : "rgba(11,18,32,0.75)",
                                        fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 500,
                                        padding: "15px 32px", textAlign: "left", cursor: "pointer",
                                        animation: `slideInLeft 0.3s ease ${i * 40}ms both`,
                                    }}
                                >
                                    {l}
                                </button>
                            ))}
                        </div>
                    )}
                </nav>

                {/* ── HERO VIDEO SECTION (FIXED) ── */}
                <section style={{
                    minHeight: "100vh",
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                    padding: "clamp(110px, 14vw, 140px) clamp(20px, 5vw, 60px) clamp(80px, 10vw, 100px)",
                    background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)",
                }}>
                    {/* Video Container with proper aspect ratio */}
                    <div className="hero-video-container">
                        <div className="hero-video-wrap">
                            <video
                                ref={videoRef}
                                autoPlay
                                muted
                                loop
                                playsInline
                                webkit-playsinline="true"
                                preload="metadata"
                                onCanPlay={() => setVideoLoaded(true)}
                                onError={() => { setVideoError(true); setVideoLoaded(true); }}
                                className="hero-video-bg"
                                style={{
                                    opacity: videoLoaded ? 1 : 0,
                                    transition: "opacity 1.2s ease-in-out",
                                }}
                            >
                                <source src={heroVideo} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>

                        {/* Fallback gradient - visible while video loads */}
                        {(!videoLoaded || videoError) && (
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)",
                                zIndex: 1,
                                transition: "opacity 0.8s ease-in-out",
                                opacity: videoLoaded ? 0 : 1,
                            }} />
                        )}
                    </div>

                    {/* ══ SHIMMER SWEEP OVERLAY (DELAYED) ══ */}
                    <div style={{
                        position: "absolute", inset: 0, overflow: "hidden", zIndex: 1,
                        pointerEvents: "none",
                        opacity: videoLoaded ? 1 : 0,
                        transition: "opacity 1.5s ease-in-out 0.6s",
                    }}>
                        <div style={{
                            position: "absolute",
                            top: "-20%",
                            left: 0,
                            width: "35%",
                            height: "140%",
                            background: "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.06) 35%, rgba(147,197,253,0.35) 50%, rgba(255,255,255,0.06) 65%, transparent 100%)",
                            animation: "heroShimmerSweep 6s ease-in-out 1.5s infinite",
                            filter: "blur(2px)",
                        }} />
                    </div>

                    {/* Overlays for legibility over video - delayed */}
                    <div style={{
                        position: "absolute", inset: 0,
                        background: "linear-gradient(115deg, rgba(11,18,32,0.62) 0%, rgba(30,58,138,0.5) 45%, rgba(37,99,235,0.4) 100%)",
                        zIndex: 1,
                        opacity: videoLoaded ? 1 : 0.5,
                        transition: "opacity 1.2s ease-in-out 0.3s",
                    }} />

                    <div style={{
                        position: "absolute", inset: 0,
                        background: "radial-gradient(ellipse at center, transparent 35%, rgba(11,18,32,0.55) 100%)",
                        zIndex: 1, pointerEvents: "none",
                        opacity: videoLoaded ? 1 : 0.5,
                        transition: "opacity 1.2s ease-in-out 0.5s",
                    }} />

                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: "55%",
                        background: "linear-gradient(to top, rgba(11,18,32,0.6) 0%, transparent 100%)",
                        zIndex: 1, pointerEvents: "none",
                        opacity: videoLoaded ? 1 : 0.5,
                        transition: "opacity 1.2s ease-in-out 0.7s",
                    }} />

                    {/* Geometric accents - delayed */}
                    <div style={{
                        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
                        opacity: videoLoaded ? 1 : 0,
                        transition: "opacity 1.5s ease-in-out 0.9s",
                    }}>
                        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice"
                            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
                            <polygon points="160,20 310,105 310,275 160,360 10,275 10,105" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                            <polygon points="1380,80 1430,108 1430,164 1380,192 1330,164 1330,108" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                            <circle cx="720" cy="450" r="380" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="6 14" />
                        </svg>
                    </div>

                    {/* Left accent line - delayed */}
                    <div style={{
                        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
                        background: "linear-gradient(to bottom, transparent 0%, var(--gold-lt) 30%, var(--gold-lt) 70%, transparent 100%)",
                        animation: videoLoaded ? "lineGrow 1.2s cubic-bezier(0.22,1,0.36,1) 0.3s both" : "none",
                        zIndex: 2,
                    }} />

                    <div style={{
                        maxWidth: 1320, margin: "0 auto", width: "100%", position: "relative", zIndex: 2,
                        opacity: videoLoaded ? 1 : 0.6,
                        transition: "opacity 1s ease-in-out 0.4s, transform 1s ease-in-out 0.4s",
                        transform: videoLoaded ? "translateY(0)" : "translateY(20px)",
                    }}>
                        {/* Breadcrumb */}
                        <div style={{
                            marginBottom: 48,
                            animation: videoLoaded ? "fadeUp 0.7s 0.6s both" : "none",
                        }}>
                            <button
                                onClick={goHome}
                                style={{
                                    background: "none", border: "none", cursor: "pointer",
                                    fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 600,
                                    letterSpacing: "0.12em", textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.65)", padding: 0,
                                    display: "inline-flex", alignItems: "center", gap: 8,
                                    transition: "color 0.2s, transform 0.2s",
                                }}
                                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--gold-lt)"; e.currentTarget.style.transform = "translateX(-4px)"; }}
                                onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.65)"; e.currentTarget.style.transform = "none"; }}
                            >
                                ← Al Agha Group
                            </button>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.35)", margin: "0 10px" }}>/</span>
                            <span style={{
                                fontFamily: "var(--f-body)", fontSize: 12, fontWeight: 600,
                                letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--gold-lt)",
                            }}>
                                Our Services
                            </span>
                        </div>

                        <div style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))",
                            gap: "clamp(40px, 6vw, 80px)", alignItems: "center",
                        }}>
                            {/* Left — headline */}
                            <div>
                                <div style={{
                                    animation: videoLoaded ? "fadeUp 0.8s 0.8s both" : "none",
                                }}>
                                    <span style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.35)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: 40, padding: "7px 18px",
                                        fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 600,
                                        letterSpacing: "0.14em", textTransform: "uppercase",
                                        color: "#fff", marginBottom: 28,
                                    }}>
                                        <span style={{
                                            width: 6, height: 6, borderRadius: "50%",
                                            background: "var(--gold-lt)", animation: "shimmer 2s infinite",
                                        }} />
                                        What We Offer
                                    </span>
                                </div>

                                <h1
                                    className="hero-title"
                                    style={{
                                        fontFamily: "var(--f-display)", fontWeight: 700,
                                        lineHeight: 1.05, letterSpacing: "-0.02em",
                                        fontSize: "clamp(3rem, 8vw, 5rem)",
                                        color: "#fff", marginBottom: 28,
                                        animation: videoLoaded ? "fadeUp 0.9s 1s both" : "none",
                                        textShadow: "0 2px 24px rgba(11,18,32,0.35)",
                                    }}
                                >
                                    Crafted to<br />
                                    <em style={{ color: "#93C5FD", fontStyle: "italic", animation: "glowPulse 3s ease infinite" }}>perfection,</em><br />
                                    every time.
                                </h1>

                                <p style={{
                                    fontFamily: "var(--f-body)",
                                    fontSize: "clamp(15px, 1.8vw, 17px)",
                                    color: "rgba(255,255,255,0.88)", lineHeight: 1.8,
                                    maxWidth: 520, marginBottom: 44,
                                    animation: videoLoaded ? "fadeUp 1s 1.2s both" : "none",
                                    textShadow: "0 1px 10px rgba(11,18,32,0.3)",
                                }}>
                                    From the first coat of paint to a fully fitted-out luxury interior — Al Agha Group delivers each service with the same obsession for quality that has defined our name since 2008.
                                </p>

                                <div style={{
                                    display: "flex", gap: 14, flexWrap: "wrap",
                                    animation: videoLoaded ? "fadeUp 1s 1.4s both" : "none",
                                }}>
                                    <button className="btn-gold btn-magnetic" style={{ padding: "13px 30px" }} onClick={() => scrollToService(0)}>
                                        <span>Explore Services</span>
                                    </button>
                                    <button className="btn-outline-white" style={{ padding: "13px 30px" }} onClick={() => navigateTo("Projects")}>
                                        View Projects →
                                    </button>
                                </div>
                            </div>

                            {/* Right — service cards */}
                            <div style={{
                                display: "flex", flexDirection: "column", gap: 14,
                                animation: videoLoaded ? `fadeUp 1s ${1.5}s both` : "none",
                            }}>
                                {SERVICES.map((s, i) => (
                                    <button
                                        key={s.id}
                                        onClick={() => scrollToService(i)}
                                        style={{
                                            background: "rgba(255,255,255,0.12)",
                                            backdropFilter: "blur(10px)",
                                            border: "1px solid rgba(255,255,255,0.28)",
                                            borderRadius: 16, padding: "18px 22px",
                                            display: "flex", alignItems: "center", gap: 18,
                                            cursor: "pointer", transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                                            textAlign: "left", width: "100%",
                                            opacity: videoLoaded ? 1 : 0,
                                            transform: videoLoaded ? "none" : "translateY(20px)",
                                            transition: `opacity 0.6s ease ${i * 80 + 1600}ms, transform 0.6s ease ${i * 80 + 1600}ms, background 0.35s ease, border-color 0.35s ease, transform 0.35s ease, box-shadow 0.35s ease`,
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = "rgba(37,99,235,0.28)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
                                            e.currentTarget.style.transform = "translateX(6px)";
                                            e.currentTarget.style.boxShadow = "0 8px 32px rgba(11,18,32,0.3)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                                            e.currentTarget.style.borderColor = "rgba(255,255,255,0.28)";
                                            e.currentTarget.style.transform = "none";
                                            e.currentTarget.style.boxShadow = "none";
                                        }}
                                    >
                                        <div style={{
                                            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
                                            background: "rgba(255,255,255,0.18)",
                                            border: "1px solid rgba(255,255,255,0.3)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 20, transition: "all 0.3s ease",
                                        }}>
                                            {s.icon}
                                        </div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{
                                                fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.8vw, 19px)",
                                                fontWeight: 700, color: "#fff", marginBottom: 3, lineHeight: 1.2,
                                            }}>
                                                {s.title}
                                            </div>
                                            <div style={{
                                                fontFamily: "var(--f-body)", fontSize: 11,
                                                color: "rgba(255,255,255,0.7)",
                                            }}>
                                                {s.features.length} specialisations
                                            </div>
                                        </div>
                                        <span style={{
                                            color: "rgba(255,255,255,0.55)", fontSize: 18, flexShrink: 0,
                                            transition: "transform 0.3s ease",
                                        }}>→</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator - delayed */}
                    <div style={{
                        position: "absolute", bottom: 36, left: "50%",
                        transform: "translateX(-50%)",
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 6, zIndex: 2,
                        opacity: videoLoaded ? 1 : 0,
                        transition: "opacity 1.5s ease-in-out 1.6s",
                    }}>
                        <span style={{
                            fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700,
                            letterSpacing: "0.22em", textTransform: "uppercase",
                            color: "rgba(255,255,255,0.55)",
                        }}>
                            Scroll
                        </span>
                        <div style={{
                            width: 1, height: 48,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)",
                            animation: videoLoaded ? "lineGrow 1s ease 1.8s both" : "none",
                        }} />
                    </div>
                </section>

                {/* ── STICKY PILL BAR ── */}
                <div style={{
                    position: "sticky", top: 72, zIndex: 100,
                    background: "rgba(255,255,255,0.97)",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 4px 24px rgba(11,18,32,0.08), 0 1px 0 rgba(37,99,235,0.12)",
                    transition: "box-shadow 0.3s ease",
                }}>
                    <div
                        className="pill-wrap"
                        style={{
                            maxWidth: 1320, margin: "0 auto",
                            padding: "12px clamp(16px, 4vw, 36px)",
                            display: "flex", alignItems: "center",
                            justifyContent: "space-between", gap: 24,
                            position: "relative",
                        }}
                    >
                        <div className="pill-bar" style={{ display: "flex", gap: 10, flex: 1 }}>
                            {SERVICES.map((s, i) => (
                                <button
                                    key={s.id}
                                    className={`svc-pill${activePill === i ? " active" : ""}`}
                                    onClick={() => scrollToService(i)}
                                >
                                    {s.icon} {s.title.split(" ").slice(0, 2).join(" ")}
                                </button>
                            ))}
                        </div>
                        <button
                            className="btn-gold"
                            style={{ padding: "9px 20px", fontSize: 11, flexShrink: 0, whiteSpace: "nowrap" }}
                            onClick={() => navigateTo("Projects")}
                        >
                            Projects →
                        </button>
                    </div>
                </div>

                {/* ── SERVICE SECTIONS ── */}
                {SERVICES.map((service, index) => (
                    <ServiceSection key={service.id} service={service} index={index} />
                ))}

                {/* ── CTA BAND ── */}
                <section style={{
                    position: "relative", overflow: "hidden",
                    padding: "clamp(72px, 10vw, 110px) clamp(20px, 5vw, 60px)",
                }}>
                    <GeoBg variant="b" />
                    <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                        <Reveal dir="zoom">
                            <span className="eyebrow" style={{ marginBottom: 20, display: "block" }}>See It Built</span>
                            <h2 style={{
                                fontFamily: "var(--f-display)", fontWeight: 700,
                                fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                                color: "var(--ink)", marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.015em",
                            }}>
                                Over 200 projects delivered —<br />
                                <em style={{ color: "var(--gold)", fontStyle: "italic" }}>browse our portfolio.</em>
                            </h2>
                            <p style={{
                                fontFamily: "var(--f-body)",
                                fontSize: "clamp(14px, 1.6vw, 16px)",
                                color: "rgba(11,18,32,0.55)", lineHeight: 1.8,
                                maxWidth: 580, margin: "0 auto 48px",
                            }}>
                                From luxury hotels and EXPO pavilions to landmark towers and community residences — every service we offer is visible in our growing portfolio of completed works across the UAE.
                            </p>
                            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                                <button
                                    className="btn-gold btn-magnetic"
                                    style={{ padding: "15px 34px", fontSize: 13 }}
                                    onClick={() => navigateTo("Projects")}
                                >
                                    <span>View All Projects →</span>
                                </button>
                                <a
                                    href="mailto:info@alaghagroup.com"
                                    className="btn-outline-gold"
                                    style={{ padding: "15px 34px", fontSize: 13, textDecoration: "none" }}
                                >
                                    Get in Touch
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </section>

                {/* ── RICH FOOTER ── */}
                <Footer goHome={goHome} goProjects={goProjects} scrollToService={scrollToService} navigateTo={navigateTo} />
            </div>
        </>
    );
}