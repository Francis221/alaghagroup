import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "./Home.css";
import {
  logo,
  heroVideo,
  PROJECT_VIDEOS,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  NAV,
  ALL_SERVICES,
  ALL_PROJECTS,
  STATS,
  CERTIFICATIONS,
  SLIDER_IMAGES,
  CLIENTS_DATA,
  CAREERS,
  CHAIRMAN_MESSAGE,
  LEADERSHIP,
  MANAGEMENT,
  ENGINEERS,
  GROUP_COMPANIES,
  qrCodeImg,
} from "../../constants";
import { Icons } from "../../components";

function useViewport() {
  const [vp, setVp] = useState(() => ({
    width: typeof window !== "undefined" ? window.innerWidth : 1280,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  }));

  useEffect(() => {
    let raf = null;
    const update = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setVp({ width: window.innerWidth, height: window.innerHeight });
      });
    };
    window.addEventListener("resize", update, { passive: true });
    window.addEventListener("orientationchange", update);
    const orientationSettle = () => setTimeout(update, 250);
    window.addEventListener("orientationchange", orientationSettle);
    update();
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
      window.removeEventListener("orientationchange", orientationSettle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return {
    ...vp,
    isMobile: vp.width < 600,
    isTablet: vp.width >= 600 && vp.width < 1024,
    isDesktop: vp.width >= 1024,
  };
}

/* ─── FLOATING PARTICLES ── */
function FloatingParticles() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);
  const sizeRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedParticles = (width, height) => {
      const particleCount = Math.min(80, Math.floor((width * height) / 15000));
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 3 + 1.5,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: Math.random() * 0.6 + 0.2,
          opacity: Math.random() * 0.5 + 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        });
      }
      return particles;
    };

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      sizeRef.current = { width, height };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (
        particlesRef.current.length === 0 ||
        Math.abs(width - (particlesRef.current._lastWidth || width)) > 200
      ) {
        const particles = seedParticles(width, height);
        particles._lastWidth = width;
        particlesRef.current = particles;
      }
    };
    resize();

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('orientationchange', resize);
    const orientationSettle = () => setTimeout(resize, 250);
    window.addEventListener('orientationchange', orientationSettle);

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (!isVisible && animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      } else if (isVisible && !animationRef.current) {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const animate = () => {
      if (document.hidden) {
        animationRef.current = null;
        return;
      }

      const { width, height } = sizeRef.current;
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.x > width + 10) p.x = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = '#2563EB';

        const s = p.size;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.lineTo(s * 0.6, 0);
        ctx.lineTo(0, s);
        ctx.lineTo(-s * 0.6, 0);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('orientationchange', resize);
      window.removeEventListener('orientationchange', orientationSettle);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}

/* ─── GLOBAL STYLES ── */

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
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rg2a" cx="85%" cy="75%" r="50%">
            <stop offset="0%" stopColor="#DCE6FA" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="900" fill="url(#rg2a)" />
        <rect width="1440" height="900" fill="url(#rg1a)" />
        <polygon points="160,20 310,105 310,275 160,360 10,275 10,105" fill="none" stroke="rgba(37,99,235,0.08)" strokeWidth="1.5" />
        <polygon points="160,60 270,122 270,248 160,310 50,248 50,122" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
        <polygon points="1380,80 1430,108 1430,164 1380,192 1330,164 1330,108" fill="none" stroke="rgba(37,99,235,0.1)" strokeWidth="1" />
        <polygon points="1340,40 1420,85 1420,175 1340,220 1260,175 1260,85" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
        <line x1="0" y1="900" x2="500" y2="0" stroke="rgba(37,99,235,0.04)" strokeWidth="1" />
        <line x1="100" y1="900" x2="600" y2="0" stroke="rgba(37,99,235,0.03)" strokeWidth="1" />
        <line x1="900" y1="0" x2="1440" y2="600" stroke="rgba(37,99,235,0.03)" strokeWidth="1" />
        <circle cx="720" cy="450" r="380" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" strokeDasharray="6 14" />
        <circle cx="720" cy="450" r="280" fill="none" stroke="rgba(37,99,235,0.04)" strokeWidth="1" />
        <polygon points="0,900 280,600 0,600" fill="rgba(37,99,235,0.03)" />
        <polygon points="1440,900 1160,620 1440,620" fill="rgba(37,99,235,0.04)" />
        {[...Array(8)].map((_, row) => [...Array(12)].map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 130 + 65} cy={row * 130 + 65} r="1.5" fill="rgba(37,99,235,0.14)" />
        )))}
      </svg>
    ),
    b: (
      <svg viewBox="0 0 1440 700" preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
        <defs>
          <linearGradient id="lgb1b" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5F8FF" />
            <stop offset="100%" stopColor="#FFFFFF" />
          </linearGradient>
        </defs>
        <rect width="1440" height="700" fill="url(#lgb1b)" />
        <line x1="0" y1="0" x2="1440" y2="700" stroke="rgba(37,99,235,0.06)" strokeWidth="60" />
        <line x1="1440" y1="0" x2="0" y2="700" stroke="rgba(37,99,235,0.04)" strokeWidth="60" />
        {[...Array(6)].map((_, row) => [...Array(9)].map((_, col) => {
          const cx = col * 180 + (row % 2) * 90;
          const cy = row * 120 + 60;
          return <polygon key={`${row}-${col}`} points={`${cx},${cy - 30} ${cx + 50},${cy} ${cx},${cy + 30} ${cx - 50},${cy}`} fill="none" stroke="rgba(37,99,235,0.07)" strokeWidth="1" />;
        }))}
        <path d="M 0 700 Q 720 0 1440 700" fill="none" stroke="rgba(37,99,235,0.07)" strokeWidth="2" />
        <path d="M 0 700 Q 720 100 1440 700" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
        <circle cx="0" cy="0" r="200" fill="none" stroke="rgba(37,99,235,0.07)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="140" fill="none" stroke="rgba(37,99,235,0.05)" strokeWidth="1" />
        <circle cx="1440" cy="700" r="200" fill="none" stroke="rgba(37,99,235,0.07)" strokeWidth="1.5" />
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
  const [state, setState] = useState(`hidden-${dir}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hiddenClass = `hidden-${dir}`;
    const exitClass = exitDir ? `exit-${exitDir}` : dir === "up" ? "exit-down" : dir === "down" ? "exit-up" : dir === "left" ? "exit-right" : dir === "right" ? "exit-left" : "exit-fade";

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
        } else {
          const rect = entry.boundingClientRect;
          if (rect.top < 0) {
            setState(exitClass);
          } else {
            setState(hiddenClass);
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
    window.addEventListener("resize", fn, { passive: true });
    return () => {
      window.removeEventListener("scroll", fn);
      window.removeEventListener("resize", fn);
    };
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(37,99,235,0.12)" }}>
      <div style={{ height: "100%", width: `${p}%`, background: "linear-gradient(90deg, var(--gold-dk), var(--gold), var(--gold-lt))", transition: "width 0.2s ease", boxShadow: "0 0 12px rgba(37,99,235,0.6)" }} />
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
      <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2.4rem,4.5vw,4rem)", color: "var(--gold)", lineHeight: 1, fontWeight: 700, letterSpacing: "-0.02em" }}>
        {isText ? val : `${count}${suffix}`}
      </div>
      <div style={{ fontFamily: "var(--f-body)", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(37,99,235,0.7)", marginTop: 10, fontWeight: 600 }}>{label}</div>
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
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={() => setHover(true)}
      onTouchEnd={() => setTimeout(() => setHover(false), 3000)}
      style={{ position: "relative", borderRadius: 20, overflow: "hidden", boxShadow: "0 40px 80px rgba(37,99,235,0.18)", height, border: "1px solid rgba(37,99,235,0.25)" }}>
      {images.map((img, i) => (
        <div key={i} style={{ position: "absolute", inset: 0, opacity: i === cur ? 1 : 0, transition: "opacity 0.9s ease" }}>
          <img src={img.url} alt={img.caption} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,18,32,0.85) 0%, rgba(11,18,32,0.08) 55%, transparent 100%)" }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 22px 22px" }}>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(96,165,250,0.9)", marginBottom: 8 }}>{img.year} · {img.cat}</div>
            <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 2vw, 21px)", color: "#fff", fontWeight: 600, lineHeight: 1.3 }}>{img.caption}</div>
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", bottom: 22, right: 22, display: "flex", gap: 7, zIndex: 10 }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCur(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === cur ? 26 : 7, height: 7, borderRadius: 4, background: i === cur ? "var(--gold)" : "rgba(255,255,255,0.55)", border: "none", cursor: "pointer", transition: "all 0.35s", padding: 0, touchAction: "manipulation" }} />
        ))}
      </div>
      <div style={{ position: "absolute", top: 18, right: 18, background: "rgba(11,18,32,0.75)", backdropFilter: "blur(8px)", padding: "4px 12px", borderRadius: 20, fontSize: 11, color: "var(--gold-lt)", fontFamily: "var(--f-body)", fontWeight: 700, border: "1px solid rgba(37,99,235,0.3)" }}>
        {String(cur + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   4D BUILDING VISUALIZATION
═══════════════════════════════════════════════════════════════════════════ */
function Building4D({ isMobile }) {
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
      <div style={{ flex: 1, minWidth: 280, color: "var(--ink)" }}>
        <span className="eyebrow" style={{ marginBottom: 16, display: "block" }}>3D Architectural Visualization</span>
        <h2 className="section-title" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", marginTop: 16, color: "var(--ink)" }}>
          Building the <em style={{ color: "var(--gold)", fontStyle: "italic" }}>future</em>,<br />floor by floor.
        </h2>
        <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(13px, 1.1vw, 15px)", color: "rgba(11,18,32,0.65)", lineHeight: 1.85, marginTop: 22, maxWidth: 480 }}>
          Experience our construction process through advanced 3D visualization. Scroll to watch the structure rise in real-time — reflecting our commitment to precision, safety, and timely delivery on every project.
        </p>
        <div style={{ marginTop: 40 }}>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 30, color: "var(--gold)", fontWeight: 700 }}>ISO</div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "rgba(11,18,32,0.45)", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 4 }}>Certified Quality</div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 280, position: "relative", height: isMobile ? 420 : 580, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ position: "absolute", bottom: 20, right: 20, textAlign: "right", fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", letterSpacing: "0.15em", opacity: 0.9, zIndex: 2 }}>
          <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontFamily: "var(--f-display)", fontWeight: 700, lineHeight: 1, color: "var(--ink)" }}><span ref={hudRef}>0%</span></div>
          <div style={{ marginTop: 4 }}>COMPLETE</div>
        </div>

        <div ref={buildingRef} style={{ width: "100%", height: "100%", opacity: 0.2, transition: "opacity 0.1s, transform 0.1s" }}>
          <svg viewBox="0 0 400 580" width="100%" height="100%" style={{ overflow: "visible" }}>
            <defs>
              <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
              <linearGradient id="leftGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" /><stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="rightGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#BFDBFE" /><stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id="winGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.9" /><stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="baseGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.35" /><stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
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
                  <polygon points={leftPts} fill="url(#leftGrad)" stroke="rgba(37,99,235,0.3)" strokeWidth="0.5" />
                  <polygon points={rightPts} fill="url(#rightGrad)" stroke="rgba(37,99,235,0.3)" strokeWidth="0.5" />
                  <polygon points={topPts} fill="url(#topGrad)" stroke="rgba(255,255,255,0.5)" strokeWidth="0.5" />
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
  const colors = ["#1E3A8A", "#1E40AF", "#1D4ED8", "#2563EB", "#3B82F6", "#0C4A6E", "#075985"];
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
    <div style={{ width: size, height: size, borderRadius: "50%", background: avatarBg(name), display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--f-display)", fontSize: size * 0.33, color: "#93C5FD", fontWeight: 700 }}>
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
          <img src={src} alt={name} onError={() => setErr(true)} style={{ padding: 8 }} />
          <div className="client-overlay" />
          <div className="client-name">{name}</div>
          {badge && (
            <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(37,99,235,0.9)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "3px 10px", fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{badge}</div>
          )}
        </>
      ) : (
        <div className="img-placeholder">
          {badge && <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(37,99,235,0.9)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 20, padding: "3px 10px", fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>{badge}</div>}
          <div style={{ fontSize: 28, opacity: 0.3 }}>🏢</div>
          <div style={{ fontFamily: "var(--f-display)", fontSize: 13, fontWeight: 600, color: "rgba(37,99,235,0.6)", textAlign: "center", padding: "0 12px", lineHeight: 1.4 }}>{name}</div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(11,18,32,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>Add logo image</div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SOCIAL BUTTON
═══════════════════════════════════════════════════════════════════════════ */
function SocialBtn({ href, label, children }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ width: 40, height: 40, borderRadius: 10, background: hov ? "var(--gold)" : "rgba(37,99,235,0.08)", border: `1px solid ${hov ? "var(--gold)" : "rgba(37,99,235,0.3)"}`, display: "flex", alignItems: "center", justifyContent: "center", color: hov ? "#fff" : "var(--gold)", textDecoration: "none", transition: "all 0.25s", transform: hov ? "translateY(-2px)" : "none", flexShrink: 0, touchAction: "manipulation" }}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURED VIDEO CARD
═══════════════════════════════════════════════════════════════════════════ */
function FeaturedVideoCard({ videoUrl, title, subtitle, posterImg, onClick, isTouchDevice }) {
  const videoRef = useRef(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleMouseEnter = () => {
    if (isTouchDevice) return;
    if (videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlayingPreview(true))
        .catch(() => { });
    }
  };

  const handleMouseLeave = () => {
    if (isTouchDevice) return;
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayingPreview(false);
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        border: "1px solid rgba(37, 99, 235, 0.2)",
        background: "#FFFFFF",
        boxShadow: "0 10px 30px rgba(11,18,32,0.1)",
        transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        cursor: "pointer",
        aspectRatio: "16/9",
        touchAction: "manipulation",
      }}
      className="video-showcase-card"
    >
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        loop
        playsInline
        preload="none"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.6s ease",
          opacity: isPlayingPreview ? 1 : 0,
          position: "absolute",
          inset: 0,
          zIndex: 1,
        }}
      />

      <img
        src={posterImg}
        alt={title}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "all 0.6s ease",
          opacity: isPlayingPreview ? 0 : 1,
          transform: isPlayingPreview ? "scale(1.05)" : "scale(1)",
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(115deg, rgba(11,18,32,0.35) 0%, rgba(37,99,235,0.2) 45%, rgba(11,18,32,0.1) 100%)",
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(11, 18, 32, 0.55)",
          border: "2px solid var(--gold)",
          backdropFilter: "blur(4px)",
          boxShadow: "0 0 20px rgba(37, 99, 235, 0.5)",
          transition: "all 0.3s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        className="play-btn-circle"
      >
        <Icons.Play />
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "24px",
          zIndex: 3,
          textAlign: "left",
        }}
      >
        <span
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.35)",
            backdropFilter: "blur(6px)",
            padding: "4px 10px",
            borderRadius: 4,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#fff",
            display: "inline-block",
            marginBottom: 8,
          }}
        >
          {isPlayingPreview ? "Previewing" : "Watch Video"}
        </span>
        <h3
          style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(1.05rem, 2vw, 1.4rem)",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 6,
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontFamily: "var(--f-body)",
            fontSize: 12,
            color: "rgba(255, 255, 255, 0.8)",
            lineHeight: 1.5,
            margin: 0,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {subtitle}
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TEAM CARDS
═══════════════════════════════════════════════════════════════════════════ */
function LeadershipCard({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#F5F8FF" : "#FFFFFF", borderRadius: 20, overflow: "hidden", width: 280, maxWidth: "100%", flexShrink: 0, boxShadow: hov ? "0 24px 60px rgba(37,99,235,0.18)" : "0 4px 16px rgba(11,18,32,0.08)", border: `1px solid ${hov ? "rgba(37,99,235,0.45)" : "rgba(37,99,235,0.15)"}`, transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)", transform: hov ? "translateY(-6px)" : "none", cursor: "default" }}>
      <div style={{ height: 200, background: "linear-gradient(135deg, #EFF4FF, #DCE6FA)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 30% 70%, #2563EB 0%, transparent 60%)" }} />
        <div style={{ width: 150, height: 175, overflow: "hidden", borderRadius: "12px 12px 0 0", position: "relative" }}>
          <Avatar name={member.name} photo={member.photo} size={150} />
        </div>
      </div>
      <div style={{ padding: "20px 22px 22px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 19, fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 4 }}>{member.role}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(11,18,32,0.45)" }}>{member.note}</div>
      </div>
    </div>
  );
}

function ManagementCard({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#F5F8FF" : "#FFFFFF", borderRadius: 16, overflow: "hidden", border: `1px solid ${hov ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.15)"}`, transition: "all 0.3s ease", transform: hov ? "translateY(-4px)" : "none", cursor: "default", boxShadow: hov ? "0 16px 40px rgba(37,99,235,0.14)" : "0 2px 10px rgba(11,18,32,0.05)" }}>
      <div style={{ height: 130, background: "linear-gradient(135deg, #EFF4FF, #BFDBFE)", display: "flex", alignItems: "flex-end", justifyContent: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.1, backgroundImage: "radial-gradient(circle at 70% 30%, #2563EB 0%, transparent 60%)" }} />
        <div style={{ width: 96, height: 110, overflow: "hidden", borderRadius: "10px 10px 0 0", position: "relative" }}>
          <Avatar name={member.name} photo={member.photo} size={96} />
        </div>
      </div>
      <div style={{ padding: "14px 14px 16px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 15, fontWeight: 700, color: "var(--ink)", marginBottom: 4, lineHeight: 1.3 }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>{member.role}</div>
        <div style={{ display: "inline-block", background: "rgba(37,99,235,0.08)", borderRadius: 20, padding: "2px 10px", fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(11,18,32,0.5)", fontWeight: 500, border: "1px solid rgba(37,99,235,0.2)" }}>{member.dept}</div>
      </div>
    </div>
  );
}

function EngineerRow({ member }) {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: hov ? "#F5F8FF" : "#FFFFFF", border: `1px solid ${hov ? "rgba(37,99,235,0.4)" : "rgba(37,99,235,0.12)"}`, borderRadius: 14, padding: "12px 16px", display: "flex", alignItems: "center", gap: 13, transition: "all 0.3s ease", transform: hov ? "translateX(5px)" : "none", cursor: "default", boxShadow: "0 2px 8px rgba(11,18,32,0.04)" }}>
      <div style={{ position: "relative" }}>
        <Avatar name={member.name} photo={member.photo} size={48} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 12, height: 12, borderRadius: "50%", background: "#10b981", border: "2px solid #FFFFFF" }} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "var(--f-display)", fontSize: 12, fontWeight: 800, color: "var(--ink)", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.name}</div>
        <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(37,99,235,0.75)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{member.role}</div>
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
      <div style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-dk))", margin: "0 auto 18px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, color: "#fff" }}>✓</div>
      <div style={{ fontFamily: "var(--f-display)", fontSize: 24, color: "var(--ink)", fontWeight: 700, marginBottom: 8 }}>Application Received</div>
      <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "#888", lineHeight: 1.7 }}>Our HR team will respond within 5 business days.</div>
    </div>
  );

  const IS = k => ({ width: "100%", background: focused === k ? "#fff" : "#F5F8FF", border: `1px solid ${errors[k] ? "#e74c3c" : focused === k ? "var(--gold)" : "#DCE6FA"}`, color: "#111", padding: "11px 13px", fontFamily: "var(--f-body)", fontSize: 16, outline: "none", borderRadius: 8, transition: "all 0.2s", boxSizing: "border-box" });
  const LS = { display: "block", fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink)", marginBottom: 6 };
  const ES = { fontFamily: "var(--f-body)", fontSize: 11, color: "#e74c3c", marginTop: 5 };

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="grid-2">
        <div><label style={LS}>First name</label><input value={form.firstName} onChange={e => set("firstName", e.target.value)} onFocus={() => setFocused("firstName")} onBlur={() => setFocused("")} placeholder="John" style={IS("firstName")} />{errors.firstName && <div style={ES}>{errors.firstName}</div>}</div>
        <div><label style={LS}>Last name</label><input value={form.lastName} onChange={e => set("lastName", e.target.value)} onFocus={() => setFocused("lastName")} onBlur={() => setFocused("")} placeholder="Doe" style={IS("lastName")} />{errors.lastName && <div style={ES}>{errors.lastName}</div>}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="grid-2">
        <div><label style={LS}>Email</label><input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={e => set("email", e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused("")} placeholder="john@example.com" style={IS("email")} />{errors.email && <div style={ES}>{errors.email}</div>}</div>
        <div><label style={LS}>Phone</label><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={e => set("phone", e.target.value)} onFocus={() => setFocused("phone")} onBlur={() => setFocused("")} placeholder="+971 5X XXX XXXX" style={IS("phone")} />{errors.phone && <div style={ES}>{errors.phone}</div>}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }} className="grid-2">
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
        <input type="url" inputMode="url" value={form.cvLink} onChange={e => set("cvLink", e.target.value)} onFocus={() => setFocused("cvLink")} onBlur={() => setFocused("")} placeholder="https://drive.google.com/file/d/your-cv" style={IS("cvLink")} />
        {errors.cvLink && <div style={ES}>{errors.cvLink}</div>}
        {form.cvLink && isValidUrl(form.cvLink) && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8, background: "#EFF4FF", borderRadius: 8, padding: "7px 12px", flexWrap: "wrap" }}>
            <span style={{ fontSize: 14 }}>📎</span>
            <a href={form.cvLink} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--gold-dk)", fontWeight: 600, textDecoration: "none", wordBreak: "break-all" }}>{form.cvLink.length > 55 ? form.cvLink.slice(0, 55) + "…" : form.cvLink}</a>
            <span style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "#10b981", marginLeft: "auto", flexShrink: 0 }}>✓ Valid</span>
          </div>
        )}
      </div>
      {sendError && <div style={{ background: "#fff5f5", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 14px", marginBottom: 14, fontFamily: "var(--f-body)", fontSize: 12, color: "#e74c3c" }}>{sendError}</div>}
      <button onClick={submit} disabled={sending} className="btn-gold" style={{ width: "100%", justifyContent: "center", opacity: sending ? 0.6 : 1, cursor: sending ? "not-allowed" : "pointer" }}>
        {sending ? <><span style={{ width: 13, height: 13, border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.7s linear infinite" }} /> Sending…</> : "Submit Application →"}
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
          ? "0 32px 70px rgba(37,99,235,0.2), 0 0 40px rgba(37,99,235,0.14), inset 0 1px 0 rgba(37,99,235,0.15)"
          : "0 8px 32px rgba(11,18,32,0.08)",
        cursor: "default",
      }}
    >
      <div style={{ position: "absolute", inset: 0, borderRadius: 22, overflow: "hidden", pointerEvents: "none", zIndex: 0, opacity: hov ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", top: -40, right: -40, animation: "orb 6s ease-in-out infinite" }} />
        <div style={{ position: "absolute", width: 100, height: 100, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.1) 0%, transparent 70%)", bottom: 20, left: -20, animation: "orb 8s ease-in-out 1s infinite reverse" }} />
      </div>

      {hov && (
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)", zIndex: 2, pointerEvents: "none", animation: "scanLine 1.8s linear infinite" }} />
      )}

      <div className="group-card-inner"
        style={{ border: `1px solid ${hov ? "rgba(37,99,235,0.5)" : "rgba(37,99,235,0.18)"}`, borderRadius: 22, padding: "clamp(26px, 3vw, 36px) clamp(20px, 2.5vw, 30px)", background: hov ? "#F5F8FF" : "#FFFFFF", transition: "border-color 0.4s ease, background 0.4s ease", position: "relative", overflow: "hidden" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div className="logo-ring">
            <div className="logo-ring-inner">
              {!logoErr ? (
                <img src={logo} alt="Al Agha Group Logo" onError={() => setLogoErr(true)}
                  style={{ width: "88%", height: "88%", objectFit: "contain", filter: hov ? "drop-shadow(0 0 10px rgba(37,99,235,0.5)) brightness(1.05)" : "drop-shadow(0 0 5px rgba(37,99,235,0.2))", transition: "filter 0.4s ease" }} />
              ) : (
                <div style={{ fontFamily: "var(--f-display)", fontSize: 16, fontWeight: 800, color: "var(--gold)", letterSpacing: "0.04em" }}>{company.abbr}</div>
              )}
            </div>
          </div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.3)", borderRadius: 20, padding: "5px 14px" }}>
            Est. {company.year}
          </div>
        </div>

        <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(18px, 1.8vw, 20px)", fontWeight: 700, color: hov ? "var(--ink)" : "rgba(11,18,32,0.9)", marginBottom: 10, lineHeight: 1.3, transition: "color 0.35s ease" }}>{company.name}</div>

        <div style={{ overflow: "hidden", marginBottom: 14, height: 2 }}>
          <div style={{ height: 2, background: hov ? "linear-gradient(90deg, var(--gold), var(--gold-lt), transparent)" : "linear-gradient(90deg, rgba(37,99,235,0.45), transparent)", borderRadius: 2, width: "100%", transition: "background 0.4s ease" }} />
        </div>

        <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: hov ? "rgba(11,18,32,0.75)" : "rgba(11,18,32,0.5)", marginBottom: 20, lineHeight: 1.75, transition: "color 0.35s ease" }}>{company.focus}</div>

        <div style={{ fontFamily: "var(--f-display)", fontSize: 15, color: hov ? "rgba(37,99,235,0.9)" : "rgba(37,99,235,0.55)", fontStyle: "italic", direction: "rtl", textAlign: "right", transition: "color 0.4s ease", paddingTop: 16, borderTop: `1px solid rgba(37,99,235,${hov ? "0.25" : "0.12"})` }}>
          {company.arabic}
        </div>

        <div style={{ position: "absolute", bottom: 0, right: 0, width: 60, height: 60, background: "linear-gradient(135deg, transparent 50%, rgba(37,99,235,0.08) 50%)", borderRadius: "0 0 22px 0", opacity: hov ? 1 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CERTIFICATION MODAL
═══════════════════════════════════════════════════════════════════════════ */
function CertModal({ cert, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-box" onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ marginBottom: 24, paddingRight: 40 }}>
          <span className="eyebrow" style={{ marginBottom: 6, display: "block" }}>Certification</span>
          <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(19px, 2vw, 22px)", fontWeight: 700, color: "var(--ink)", lineHeight: 1.2 }}>{cert.name}</div>
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(11,18,32,0.5)", marginTop: 6 }}>{cert.desc}</div>
        </div>
        <div style={{ background: "#F5F8FF", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 14, overflow: "hidden", minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
          {cert.image ? (
            <img src={cert.image} alt={`${cert.name} certificate`} style={{ width: "100%", height: "auto", display: "block", maxHeight: 400, objectFit: "contain" }} />
          ) : (
            <div style={{ textAlign: "center", padding: "48px 32px" }}>
              <div style={{ fontSize: 52, marginBottom: 16, opacity: 0.4 }}>📜</div>
              <div style={{ fontFamily: "var(--f-display)", fontSize: 18, color: "var(--gold)", fontWeight: 700, marginBottom: 8 }}>{cert.name}</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(11,18,32,0.35)", lineHeight: 1.6 }}>Certificate image will appear here.<br />Add the image path to the CERTIFICATIONS data array.</div>
              <div style={{ width: 48, height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)", margin: "20px auto 0" }} />
            </div>
          )}
        </div>
        <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 10 }}>
          <Icons.Check />
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(11,18,32,0.5)", lineHeight: 1.5 }}>
            Al Agha Group holds valid {cert.name} certification, demonstrating our commitment to {cert.desc.toLowerCase()}.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   VIDEO MODAL
═══════════════════════════════════════════════════════════════════════════ */
function VideoModal({ video, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) document.body.style.paddingRight = `${scrollBarWidth}px`;
    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    };
  }, []);

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-box" style={{ maxWidth: 880, padding: 24, background: "#0B1220" }} onClick={e => e.stopPropagation()}>
        <button className="cert-modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div style={{ marginBottom: 16, paddingRight: 40 }}>
          <span className="eyebrow" style={{ marginBottom: 4, display: "block", color: "#60A5FA" }}>Project Tour</span>
          <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(19px, 2vw, 22px)", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{video.title}</div>
        </div>
        <div style={{ position: "relative", width: "100%", paddingBottom: "56.25%", borderRadius: 14, overflow: "hidden", background: "#000", border: "1px solid rgba(37,99,235,0.4)" }}>
          <video
            src={video.url}
            controls
            autoPlay
            playsInline
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
          />
        </div>
        <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 10 }}>
          <Icons.Play />
          <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>
            Watch the full video walkthrough showcasing our dedicated decoration, interior design, and contracting engineering.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   YOUTUBE VIDEO PLAYER COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
function YouTubeVideoPlayer({ videoId, title }) {
  return (
    <div className="video-player-wrapper">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&modestbranding=1&playsinline=1`}
        title={title || "Al Agha Group Video"}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        loading="lazy"
      />
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

function SectionHeader({ eyebrow, title, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: 64 }}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="section-title"
        style={{ fontSize: "clamp(1.8rem,4vw,3.4rem)", marginTop: 14, color: "var(--ink)", maxWidth: center ? 700 : "none", margin: center ? "14px auto 0" : "14px 0 0" }}
        dangerouslySetInnerHTML={{ __html: title }} />
      {subtitle && <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "rgba(11,18,32,0.6)", maxWidth: 540, margin: "16px auto 0", lineHeight: 1.8 }}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════════════════════════ */













/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */
export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("Home");
  const scrollY = useScrollY();
  const scrolled = scrollY > 60;
  const { height: vh, isMobile } = useViewport();
  const isTouchDevice = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  const [activeCert, setActiveCert] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const YOUTUBE_VIDEO_ID = "-69VznBquek";

  useEffect(() => {
    const setVhVar = () => {
      document.documentElement.style.setProperty("--vh", `${window.innerHeight * 0.01}px`);
    };
    setVhVar();
    window.addEventListener("resize", setVhVar, { passive: true });
    window.addEventListener("orientationchange", setVhVar);
    return () => {
      window.removeEventListener("resize", setVhVar);
      window.removeEventListener("orientationchange", setVhVar);
    };
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      const loadVideo = () => {
        if (videoRef.current) {
          const timeoutId = setTimeout(() => {
            if (!videoLoaded && !videoError) {
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
              clearTimeout(timeoutId);
              setVideoLoaded(true);
            });
        }
      };
      const timer = setTimeout(loadVideo, 200);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, videoLoaded, videoError]);

  useEffect(() => {
    const handleInteraction = () => {
      if (videoRef.current && videoRef.current.paused && !videoError) {
        videoRef.current.play().catch(err => console.log('Play failed:', err));
      }
    };
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction, { passive: true });
    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [videoError]);

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

  useEffect(() => {
    if (menu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  const [clientTab, setClientTab] = useState("clients");
  const clientTabData = {
    clients: { label: "Clients (18)", data: CLIENTS_DATA.clients, badge: "CLIENT" },
    consultants: { label: "Consultants (10)", data: CLIENTS_DATA.consultants, badge: "CONSULTANT" },
    contractors: { label: "Contractors (20)", data: CLIENTS_DATA.contractors, badge: "CONTRACTOR" },
  };

  const sliderHeight = Math.min(500, Math.max(320, vh * 0.6));

  return (
    <>
      
      <FloatingParticles />

      {activeCert && <CertModal cert={activeCert} onClose={() => setActiveCert(null)} />}
      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}

      <div style={{ color: "var(--ink)", fontFamily: "var(--f-body)", background: "var(--bg-deep)", overflowX: "hidden", position: "relative", zIndex: 1, width: "100%", maxWidth: "100vw" }}>
        <ReadingProgress />

        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", width: 600, height: 600, top: "-200px", left: "-200px", background: "radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)", animation: "floatBg 18s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 500, height: 500, bottom: "10%", right: "-100px", background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)", animation: "floatBgReverse 22s ease-in-out infinite" }} />
        </div>

        {/* ══ NAV ══ */}
        <nav className="safe-area-top" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: scrolled ? "rgba(255,255,255,0.97)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", boxShadow: scrolled ? "0 1px 0 rgba(37,99,235,0.12)" : "none", transition: "all 0.4s ease" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px", height: "clamp(60px, 6vh, 72px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <button onClick={() => scrollTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, touchAction: "manipulation" }}>
              <img src={logo} alt="Al Agha Group Logo" style={{ width: "clamp(34px, 3.5vw, 40px)", height: "clamp(34px, 3.5vw, 40px)", objectFit: "contain", borderRadius: 8, flexShrink: 0 }}
                onError={e => { e.target.style.display = "none"; e.target.nextSibling.style.display = "flex"; }} />
              <div style={{ display: "none", width: 40, height: 40, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, var(--gold-dk), var(--gold))", alignItems: "center", justifyContent: "center", fontFamily: "var(--f-display)", fontWeight: 800, fontSize: 16, color: "#fff" }}>AG</div>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(14px, 2vw, 19px)", color: scrolled ? "var(--ink)" : "#fff", letterSpacing: "-0.01em", lineHeight: 1.15, whiteSpace: "nowrap" }}>Al Agha Group</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(6px, 0.8vw, 8px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", whiteSpace: "nowrap" }}>of Companies</div>
              </div>
            </button>
            <div style={{ display: "flex", gap: "clamp(14px, 2.5vw, 32px)", alignItems: "center" }} className="desktop-nav">
              {NAV.map(l => (
                <button key={l} onClick={() => scrollTo(l)} className={`nav-btn${active === l ? " nav-active" : ""}`} style={{ color: active === l ? "var(--gold)" : (scrolled ? "rgba(11,18,32,0.75)" : "rgba(255,255,255,0.9)"), fontSize: "clamp(11px, 1.1vw, 13px)" }}>{l}</button>
              ))}
              <button className="btn-gold" style={{ padding: "10px 22px", fontSize: "clamp(10px, 0.9vw, 12px)" }} onClick={() => scrollTo("Career")}>Join Us</button>
            </div>
            <button onClick={() => setMenu(o => !o)} aria-label={menu ? "Close menu" : "Open menu"} style={{ background: "none", border: "none", color: scrolled ? "var(--ink)" : "#fff", fontSize: 22, cursor: "pointer", display: "none", padding: 8, touchAction: "manipulation" }} className="mobile-menu-btn">
              {menu ? <Icons.Close /> : <Icons.Menu />}
            </button>
          </div>
          {menu && (
            <div className="safe-area-bottom" style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid rgba(37,99,235,0.12)", maxHeight: "calc(100dvh - 60px)", overflowY: "auto", WebkitOverflowScrolling: "touch" }}>
              {NAV.map(l => (
                <button key={l} onClick={() => scrollTo(l)} style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid rgba(37,99,235,0.1)", color: active === l ? "var(--gold)" : "rgba(11,18,32,0.75)", fontFamily: "var(--f-body)", fontSize: 15, fontWeight: 500, padding: "16px 20px", textAlign: "left", cursor: "pointer", touchAction: "manipulation" }}>{l}</button>
              ))}
            </div>
          )}
        </nav>

        {/* ══ HERO VIDEO SECTION (FIXED) ══ */}
        <section id="home" style={{
          minHeight: "calc(var(--vh, 1vh) * 100)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)"
        }}>
          {/* Video Container with proper aspect ratio */}
          <div style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 0,
            width: "100%",
            height: "100%",
          }}>
            {/* Video wrapper with maintain aspect ratio */}
            <div style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "100%",
              height: "100%",
              minWidth: "100%",
              minHeight: "100%",
              objectFit: "cover",
              transition: "opacity 1.2s ease-in-out",
            }}>
              <video
                ref={videoRef}
                key={`hero-video-${location.pathname}`}
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                preload="metadata"
                onCanPlay={() => {
                  setVideoLoaded(true);
                  console.log('Video loaded successfully');
                }}
                onError={(e) => {
                  setVideoError(true);
                  setVideoLoaded(true);
                  console.error('Video load error:', e);
                }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  opacity: videoLoaded ? 1 : 0,
                  transition: "opacity 1.2s ease-in-out",
                  willChange: 'opacity, transform',
                  imageRendering: '-webkit-optimize-contrast',
                  backfaceVisibility: 'hidden',
                  WebkitBackfaceVisibility: 'hidden',
                }}
              >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Fallback gradient - visible while video loads */}
            {(!videoLoaded || videoError) && (
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)",
                zIndex: 1,
                transition: "opacity 0.8s ease-in-out",
                opacity: videoLoaded ? 0 : 1,
              }} />
            )}
          </div>

          {/* ══ SHIMMER SWEEP OVERLAY (DELAYED) ══ */}
          <div style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            zIndex: 1,
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

          {/* Gradients - delayed fade in */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(115deg, rgba(11,18,32,0.5) 0%, rgba(30,58,138,0.4) 45%, rgba(37,99,235,0.35) 100%)",
            zIndex: 1,
            opacity: videoLoaded ? 1 : 0.5,
            transition: "opacity 1.2s ease-in-out 0.3s",
          }} />

          <div style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,18,32,0.5) 100%)",
            zIndex: 1,
            pointerEvents: "none",
            opacity: videoLoaded ? 1 : 0.5,
            transition: "opacity 1.2s ease-in-out 0.5s",
          }} />

          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "60%",
            background: "linear-gradient(to top, rgba(11,18,32,0.55) 0%, transparent 100%)",
            zIndex: 1,
            pointerEvents: "none",
            opacity: videoLoaded ? 1 : 0.5,
            transition: "opacity 1.2s ease-in-out 0.7s",
          }} />

          {/* Noise texture */}
          <div style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E\")",
            opacity: 0.35,
            zIndex: 1,
            pointerEvents: "none",
            transition: "opacity 1.2s ease-in-out 0.8s",
          }} />

          {/* Geometric accents - delayed */}
          <div style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            zIndex: 1,
            opacity: videoLoaded ? 1 : 0,
            transition: "opacity 1.5s ease-in-out 0.9s",
          }}>
            <svg viewBox="0 0 1440 900" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} preserveAspectRatio="xMidYMid slice">
              <line x1="0" y1="0" x2="400" y2="900" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <line x1="80" y1="0" x2="480" y2="900" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <polygon points="1100,0 1440,0 1440,480 1100,240" fill="rgba(255,255,255,0.03)" />
              <circle cx="1200" cy="200" r="300" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="8 18" />
              <circle cx="1200" cy="200" r="200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            </svg>
          </div>

          {/* Left accent line - delayed */}
          <div style={{
            position: "absolute",
            left: 0,
            top: "10%",
            bottom: "10%",
            width: 2,
            background: "linear-gradient(to bottom, transparent, var(--gold-lt), transparent)",
            zIndex: 1,
            opacity: videoLoaded ? 0.7 : 0,
            transition: "opacity 1.5s ease-in-out 1s",
          }} />

          {/* Content - staggered delay */}
          <div className="safe-area-top" style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "clamp(110px, 16vw, 130px) 20px clamp(60px, 8vw, 90px)",
            position: "relative",
            zIndex: 2,
            width: "100%",
            opacity: videoLoaded ? 1 : 0.6,
            transition: "opacity 1s ease-in-out 0.4s, transform 1s ease-in-out 0.4s",
            transform: videoLoaded ? "translateY(0)" : "translateY(20px)",
          }}>
            <div style={{ maxWidth: 700 }}>
              <div style={{
                marginBottom: 28,
                animation: videoLoaded ? "fadeUp 0.8s 0.6s both" : "none",
              }}>
                <span style={{
                  background: "rgba(255,255,255,0.18)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  backdropFilter: "blur(20px)",
                  padding: "8px 20px",
                  borderRadius: 40,
                  fontSize: "clamp(9px, 1vw, 10px)",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#fff",
                  boxShadow: "0 4px 15px rgba(11,18,32,0.15)",
                  display: "inline-block"
                }}>
                  Est. 2008 · Dubai, UAE
                </span>
              </div>

              <h1 style={{
                fontFamily: "var(--f-display)",
                fontWeight: 700,
                lineHeight: 1.04,
                letterSpacing: "-0.02em",
                fontSize: "clamp(2.2rem, 7.5vw, 5.5rem)",
                color: "#fff",
                marginBottom: 28,
                animation: videoLoaded ? "fadeUp 0.9s 0.8s both" : "none",
                textShadow: "0 2px 20px rgba(11,18,32,0.3)"
              }}>
                BUILDING THE<br />
                <em style={{ color: "#93C5FD", fontStyle: "italic" }}>FUTURE TOGETHER.</em>
              </h1>

              <p style={{
                fontFamily: "var(--f-body)",
                fontSize: "clamp(14px, 1.3vw, 17px)",
                color: "rgba(255,255,255,0.9)",
                lineHeight: 1.8,
                maxWidth: 520,
                marginBottom: 44,
                animation: videoLoaded ? "fadeUp 1s 1s both" : "none",
                textShadow: "0 1px 10px rgba(11,18,32,0.3)"
              }}>
                Al Agha Group delivers world-class false ceiling, gypsum works, interior fit-out, and MEP services across the UAE — with trust and quality at the core of every project.
              </p>

              <div style={{
                display: "flex",
                gap: 14,
                flexWrap: "wrap",
                animation: videoLoaded ? "fadeUp 1s 1.2s both" : "none"
              }}>
                <button className="btn-gold" style={{
                  padding: "clamp(12px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
                  fontSize: "clamp(11px, 1vw, 13px)"
                }} onClick={() => navigate("/projects")}>
                  View Our Projects
                </button>
                <button className="btn-outline-white" style={{
                  padding: "clamp(12px, 1.2vw, 16px) clamp(20px, 2.5vw, 36px)",
                  fontSize: "clamp(11px, 1vw, 13px)",
                  color: "#fff",
                  borderColor: "rgba(255,255,255,0.4)"
                }} onClick={() => scrollTo("About")}>
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══ STATS BAND ══ */}
        <Section geoVariant="b" style={{ padding: "clamp(36px, 5vw, 70px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "clamp(14px, 2vw, 24px)", alignItems: "center" }}>
            {STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 80} dir="zoom">
                <AnimatedStat val={s.val} label={s.label} />
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ══ 4D BUILDING ══ */}
        <Section geoVariant="a" style={{ padding: "clamp(50px, 8vw, 120px) 20px" }}>
          <Building4D isMobile={isMobile} />
        </Section>

        {/* ══ GROUP COMPANIES ══ */}
        <Section id="group" geoVariant="c" style={{ padding: "clamp(50px, 8vw, 100px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader title='The <em style="color:var(--gold);font-style:italic">Al Agha Group</em>' subtitle="A unified group delivering excellence across decoration, technical services, and building contracting." />
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: "clamp(18px, 2vw, 28px)" }}>
              {GROUP_COMPANIES.map((c, i) => <GroupCard key={c.abbr} company={c} index={i} />)}
            </div>
          </div>
        </Section>

        {/* ══ ABOUT ══ */}
        <Section id="about" geoVariant="b" style={{ padding: "clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(36px, 5vw, 80px)", alignItems: "center" }} className="grid-2">
            <Reveal dir="left">
              <span className="eyebrow">Who We Are</span>
              <h2 className="section-title" style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)", margin: "16px 0 20px", color: "var(--ink)" }}>
                A legacy of <em style={{ color: "var(--gold)", fontStyle: "italic" }}>trust &amp; quality</em>
              </h2>
              <span className="divider-gold" style={{ marginBottom: 28 }} />
              <p style={{ color: "rgba(11,18,32,0.7)", lineHeight: 1.9, marginBottom: 18, fontSize: "clamp(14px, 1.1vw, 15px)" }}>
                Established in 2008 as a small gypsum false ceiling workshop, we have grown through the priceless efforts of our team to form the Al Agha Group of Companies — offering false ceiling, partition works, interior design, full fit-out, and MEP services.
              </p>
              <p style={{ color: "rgba(11,18,32,0.5)", lineHeight: 1.9, marginBottom: 40, fontSize: "clamp(13px, 1vw, 14px)" }}>
                Our aim was to prove we can finalise any work without mistake or delay. Client satisfaction is our top priority; accuracy and dedication in execution is what distinguishes us from others.
              </p>
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(11,18,32,0.35)", marginBottom: 16 }}>
                  Certifications &amp; Accreditations
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  {CERTIFICATIONS.map((cert, i) => (
                    <button key={i} className="cert-badge-btn" onClick={() => setActiveCert(cert)} title={`View ${cert.name} certificate`}>
                      <Icons.Check />
                      <div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 600, color: "var(--gold)", letterSpacing: "0.04em" }}>{cert.name}</div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 9, color: "rgba(11,18,32,0.4)" }}>{cert.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal dir="right" delay={120}>
              <ImageSlider images={SLIDER_IMAGES} height={sliderHeight} />
            </Reveal>
          </div>
        </Section>

        {/* ══ SERVICES ══ */}
        <Section id="services" geoVariant="a" style={{ padding: "clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="eyebrow">What We Build</span>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,3.4rem)", marginTop: 14, color: "var(--ink)" }}>
                    Our <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Services</em>
                  </h2>
                </div>
                <button className="btn-outline-gold" style={{ padding: "clamp(10px, 1vw, 14px) clamp(18px, 2vw, 36px)", fontSize: "clamp(10px, 0.9vw, 12px)" }} onClick={() => navigate("/services")}>View All Services</button>
              </div>
            </Reveal>
            <div className="services-grid">
              {ALL_SERVICES.map((s, i) => (
                <Reveal key={s.title} delay={(i % 5) * 55} dir="up">
                  <div className="svc-card" style={{ padding: "clamp(24px, 2.5vw, 36px) clamp(20px, 2vw, 30px)" }}>
                    <div style={{ fontSize: "clamp(28px, 3vw, 36px)", marginBottom: 18 }}>{s.icon}</div>
                    <h3 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(18px, 1.6vw, 22px)", fontWeight: 700, color: "var(--ink)", marginBottom: 10, lineHeight: 1.25 }}>{s.title}</h3>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 1vw, 13px)", color: "rgba(11,18,32,0.55)", lineHeight: 1.75 }}>{s.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ══ PROJECTS ══ */}
        <Section id="projects" geoVariant="c" style={{ padding: "clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
                <div>
                  <span className="eyebrow">Our Portfolio</span>
                  <h2 className="section-title" style={{ fontSize: "clamp(1.8rem,4vw,3.4rem)", marginTop: 14, color: "var(--ink)" }}>
                    Featured <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Projects</em>
                  </h2>
                </div>
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
              {ALL_PROJECTS.map((p, i) => (
                <Reveal key={p.title} delay={(i % 3) * 50} dir="zoom">
                  <div className="proj-card" style={{ height: "clamp(220px, 25vw, 300px)" }}>
                    <img src={p.img} alt={p.title} loading="lazy" style={{ height: "100%" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,18,32,0.9) 0%, transparent 55%)", borderRadius: 16 }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, padding: "0 22px 20px" }}>
                      <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.4vw, 20px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.title}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div style={{ marginTop: 56 }}>
              <Reveal>
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                  <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,18,32,0.65)" }}>Project Video Showcases</span>
                  <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)" }} />
                </div>
              </Reveal>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 28 }}>
                {PROJECT_VIDEOS.map((v, i) => (
                  <Reveal key={v.title} delay={i * 60} dir="up">
                    <FeaturedVideoCard videoUrl={v.url} title={v.title} subtitle={v.subtitle} posterImg={v.poster} isTouchDevice={isTouchDevice} onClick={() => setActiveVideo({ url: v.url, title: v.title })} />
                  </Reveal>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center", marginTop: 56 }}>
              <button className="btn-gold" style={{ padding: "clamp(12px, 1vw, 14px) clamp(24px, 2.5vw, 36px)", fontSize: "clamp(10px, 0.9vw, 12px)" }} onClick={() => navigate("/projects")}>Browse All 90+ Projects</button>
            </div>
          </div>
        </Section>

        {/* ══ CLIENTS ══ */}
        <Section id="clients" geoVariant="a" style={{ padding: "clamp(50px, 8vw, 110px) 20px 80px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Trusted By" title='Our <em style="color:var(--gold);font-style:italic">Clients, Consultants &amp; Contractors</em>' />
            </Reveal>
            <Reveal delay={60}>
              <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginBottom: 48 }}>
                {Object.entries(clientTabData).map(([key, { label }]) => (
                  <button key={key} onClick={() => setClientTab(key)}
                    style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.9vw, 12px)", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "clamp(8px, 0.8vw, 10px) clamp(16px, 1.5vw, 24px)", borderRadius: 8, border: `1px solid ${clientTab === key ? "var(--gold)" : "rgba(37,99,235,0.25)"}`, background: clientTab === key ? "var(--gold)" : "#FFFFFF", color: clientTab === key ? "#fff" : "rgba(11,18,32,0.65)", cursor: "pointer", transition: "all 0.25s", boxShadow: clientTab === key ? "0 4px 14px rgba(37,99,235,0.3)" : "0 2px 8px rgba(11,18,32,0.05)", touchAction: "manipulation" }}>
                    {label}
                  </button>
                ))}
              </div>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "clamp(10px, 1.2vw, 16px)" }} className="grid-6">
              {clientTabData[clientTab].data.map((item, i) => (
                <Reveal key={`${clientTab}-${i}`} delay={(i % 6) * 40} dir="zoom">
                  <ClientImgCard name={item.name} src={item.src} badge={clientTabData[clientTab].badge} />
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ══ CAREER ══ */}
        <Section id="career" geoVariant="b" style={{ padding: "clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="Join Our Team" title='Build your <em style="color:var(--gold);font-style:italic">Career</em>' subtitle="Join a team where your skills drive landmark developments across the UAE." />
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(28px, 4vw, 52px)", alignItems: "start" }} className="grid-2">
              <div>
                <Reveal dir="left">
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 28 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse 2s infinite", boxShadow: "0 0 8px #10b981" }} />
                    <span style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(11,18,32,0.65)" }}>{CAREERS.length} open positions</span>
                  </div>
                </Reveal>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {CAREERS.map((c, i) => (
                    <Reveal key={c.role} delay={i * 65} dir="left">
                      <div className="career-row" style={{ padding: "clamp(16px, 1.5vw, 20px) clamp(16px, 1.5vw, 22px)" }}>
                        <div>
                          <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(17px, 1.4vw, 19px)", fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>{c.role}</div>
                          <div style={{ display: "flex", gap: "clamp(8px, 1vw, 12px)", alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.9vw, 12px)", color: "rgba(11,18,32,0.5)" }}>📍 {c.loc}</span>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--gold)" }}>{c.type}</span>
                            <span style={{ fontFamily: "var(--f-body)", fontSize: 9, fontWeight: 600, color: "rgba(11,18,32,0.45)", background: "rgba(37,99,235,0.08)", padding: "2px 8px", borderRadius: 4 }}>{c.dept}</span>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal delay={100} dir="right">
                <div style={{ border: "1px solid var(--border)", padding: "clamp(22px, 3vw, 40px)", borderRadius: 20, background: "#fff", boxShadow: "0 4px 40px rgba(37,99,235,0.1)" }}>
                  <span className="eyebrow" style={{ marginBottom: 8, display: "block" }}>Submit your application</span>
                  <h3 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 700, color: "var(--ink)", marginBottom: 6 }}>Apply Now</h3>
                  <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 1vw, 13px)", color: "#888", marginBottom: 28, lineHeight: 1.6 }}>Our HR team will respond within 5 business days.</p>
                  <CareerForm careers={CAREERS} />
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ══ TEAM ══ */}
        <Section id="team" geoVariant="a" style={{ padding: "clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal>
              <SectionHeader eyebrow="The People Behind Our Work" title='Meet the <em style="color:var(--gold);font-style:italic">Team</em>' subtitle="Dedicated professionals committed to excellence across every discipline." />
            </Reveal>
            <div style={{ marginBottom: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,18,32,0.55)" }}>Leadership</span>
                <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)" }} />
              </div>
              <div style={{ display: "flex", gap: "clamp(14px, 2vw, 24px)", flexWrap: "wrap", justifyContent: "center" }}>
                {LEADERSHIP.map((m, i) => (<Reveal key={m.name} delay={i * 100} dir="zoom"><LeadershipCard member={m} /></Reveal>))}
              </div>
            </div>
            <div style={{ marginBottom: 80 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,18,32,0.55)" }}>Management</span>
                <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "clamp(12px, 1.2vw, 18px)" }}>
                {MANAGEMENT.map((m, i) => (<Reveal key={m.name} delay={(i % 4) * 55} dir="up"><ManagementCard member={m} /></Reveal>))}
              </div>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 40 }}>
                <div style={{ width: 28, height: 2, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,18,32,0.55)" }}>Engineering &amp; Operations</span>
                <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)" }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: "clamp(10px, 0.9vw, 12px)" }}>
                {ENGINEERS.map((m, i) => (<Reveal key={m.name} delay={(i % 6) * 35} dir="up"><EngineerRow member={m} /></Reveal>))}
              </div>
            </div>
          </div>
        </Section>

        {/* ══ CHAIRMAN'S MESSAGE ══ */}
        <Section geoVariant="c" style={{ padding: "clamp(50px, 8vw, 110px) 20px 60px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto" }}>
            <Reveal><SectionHeader eyebrow="Chairman's Message" title='A Word From Our <em style="color:var(--gold);font-style:italic">Chairman</em>' /></Reveal>
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
              <Reveal>
                <div style={{ border: "1px solid rgba(37,99,235,0.2)", padding: "clamp(28px, 4vw, 52px)", position: "relative", borderRadius: 20, background: "#FFFFFF", boxShadow: "0 4px 30px rgba(37,99,235,0.08)" }}>
                  <div style={{ fontFamily: "var(--f-display)", fontSize: 110, lineHeight: 0.8, color: "rgba(37,99,235,0.1)", position: "absolute", top: 20, left: 28, fontWeight: 700, pointerEvents: "none", userSelect: "none" }}>"</div>
                  <p style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1rem, 1.5vw, 1.6rem)", fontWeight: 500, fontStyle: "italic", color: "rgba(11,18,32,0.85)", lineHeight: 1.65, textAlign: "center", position: "relative", zIndex: 1, maxWidth: 640, margin: "0 auto" }}>
                    "{CHAIRMAN_MESSAGE.message}"
                  </p>
                  <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid rgba(37,99,235,0.15)", display: "flex", alignItems: "center", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
                    <div style={{ width: 60, height: 60, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(37,99,235,0.4)", flexShrink: 0 }}>
                      <Avatar name={CHAIRMAN_MESSAGE.name} photo={CHAIRMAN_MESSAGE.photo} size={60} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(17px, 1.4vw, 19px)", color: "var(--ink)", fontWeight: 700 }}>{CHAIRMAN_MESSAGE.name}</div>
                      <div style={{ fontFamily: "var(--f-body)", fontSize: 10, color: "var(--gold)", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 4 }}>{CHAIRMAN_MESSAGE.role} · Al Agha Group</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Section>

        {/* ══ YOUTUBE VIDEO PLAYER ══ */}
        <Section geoVariant="a" style={{ padding: "clamp(20px, 3vw, 40px) 20px clamp(50px, 8vw, 110px) 20px" }}>
          <div style={{ maxWidth: 1120, margin: "0 auto" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
                <div style={{ width: 28, height: 1, background: "var(--gold)" }} />
                <span style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(11,18,32,0.65)" }}>Featured Video</span>
                <div style={{ flex: 1, height: 1, background: "rgba(37,99,235,0.15)" }} />
              </div>
            </Reveal>
            <Reveal dir="up" delay={100}>
              <YouTubeVideoPlayer videoId={YOUTUBE_VIDEO_ID} title="Al Agha Group - Building the Future Together" />
            </Reveal>
          </div>
        </Section>

        {/* ══ CTA ══ */}
        <Section geoVariant="b" style={{ padding: "clamp(50px, 7vw, 90px) 20px" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", textAlign: "center" }}>
            <Reveal dir="zoom">
              <span className="eyebrow" style={{ marginBottom: 14, display: "block" }}>Ready to Build?</span>
              <h2 style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(1.6rem, 4vw, 3.2rem)", color: "var(--ink)", marginBottom: 18 }}>
                Let's bring your vision to <em style={{ color: "var(--gold)", fontStyle: "italic" }}>life</em>
              </h2>
              <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(14px, 1.2vw, 16px)", color: "rgba(11,18,32,0.55)", maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.75 }}>
                From false ceiling concepts to complete interior fit-out, Al Agha Group delivers results with integrity, craftsmanship, and a commitment to finishing on time.
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <a href="tel:+97142675229" className="btn-gold" style={{ padding: "clamp(12px, 1vw, 14px) clamp(24px, 2.5vw, 36px)", fontSize: "clamp(10px, 0.9vw, 12px)" }}>Call +971 4 267 5229</a>
                <button className="btn-outline-gold" style={{ padding: "clamp(12px, 1vw, 14px) clamp(24px, 2.5vw, 36px)", fontSize: "clamp(10px, 0.9vw, 12px)" }} onClick={() => scrollTo("Career")}>Join Our Team</button>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ══ FOOTER ══ */}
        <footer className="safe-area-bottom" style={{ background: "#0B1220", borderTop: "1px solid rgba(37,99,235,0.2)", padding: "clamp(36px, 5vw, 72px) 20px clamp(24px, 2.5vw, 36px)", position: "relative" }}>
          <div style={{ maxWidth: 1320, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="footer-grid">
              {/* Column 1 - Brand */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 11, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 8, overflow: "hidden", background: "#ffffffff", flexShrink: 0 }}>
                    <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => e.target.style.display = "none"} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.3vw, 17px)", fontWeight: 700, color: "#fff" }}>Al Agha Group</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(7px, 0.6vw, 9px)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "#60A5FA" }}>of Companies</div>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.8, maxWidth: 260, marginBottom: 22 }}>
                  False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <SocialBtn href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook"><Icons.Facebook /></SocialBtn>
                  <SocialBtn href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram"><Icons.Instagram /></SocialBtn>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.25)", borderRadius: 12, padding: "12px 14px", marginTop: 26, flexWrap: "wrap" }}>
                  <div style={{ width: 72, height: 72, borderRadius: 8, overflow: "hidden", flexShrink: 0, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", padding: 4 }}>
                    <img src={qrCodeImg} alt="QR Code" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#60A5FA", marginBottom: 4 }}>Scan to connect</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(147,197,253,0.7)", lineHeight: 1.5 }}>Point your camera to visit Al Agha Group online</div>
                  </div>
                </div>
              </div>

              {/* Column 2 - Quick Links */}
              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Quick Links</h4>
                {NAV.map(l => (
                  <button key={l} onClick={() => scrollTo(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", padding: "7px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s", touchAction: "manipulation" }} onMouseEnter={e => e.currentTarget.style.color = "#60A5FA"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.45)"}>{l}</button>
                ))}
              </div>

              {/* Column 3 - Services */}
              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Services</h4>
                {["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes", "Architectural Design & Planning"].map(s => (
                  <div key={s} style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.4)", padding: "6px 0", lineHeight: 1.5 }}>{s}</div>
                ))}
              </div>

              {/* Column 4 - Contact */}
              <div>
                <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(15px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contact</h4>
                <div className="footer-contact-row" style={{ display: "flex", gap: 10, padding: "6px 0", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
                  <Icons.Location /><span>Office 201 & 202, Block A, Abraj Al Mamzar, Dubai, U.A.E.</span>
                </div>
                <div className="footer-contact-row" style={{ display: "flex", gap: 10, padding: "6px 0", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
                  <Icons.Phone /><span>+971 4 267 5229</span>
                </div>
                <div className="footer-contact-row" style={{ display: "flex", gap: 10, padding: "6px 0", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>
                  <Icons.Email /><span>info@alaghagroup.com</span>
                </div>
                <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(37,99,235,0.25)", height: "clamp(140px, 15vw, 180px)", marginTop: 18 }}>
                  <iframe
                    title="Al Agha Group Office"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3607.2764583093857!2d55.35445537600424!3d25.28574307758295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cfe11994ee1%3A0x8bdd77fec9a0e9c3!2sAbraj%20Al%20Mamzar%20-%20Al%20Mamzar%20-%20Dubai!5e0!3m2!1en!2sae!4v1700000000000!5m2!1sen!2sae"
                    width="100%" height="100%" style={{ border: "none", display: "block" }}
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            <div style={{ borderTop: "1px solid rgba(37,99,235,0.2)", paddingTop: "clamp(18px, 1.8vw, 22px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.3)" }}>© 2025 Al Agha Group of Companies · All rights reserved</span>
              <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.3)" }}>Privacy Policy · Terms of Service</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}