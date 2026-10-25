import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Projects.css";
import {
  logo,
  heroVideo,
  NAV,
  CATEGORIES,
  FALLBACKS,
  PROJECTS,
  CAT_META,
  projectImageMap,
  resolveProjectImage,
} from "../../constants";
import { Icons } from "../../components";

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
    }, [threshold]);
    return [ref, visible];
}

function useScrollY() {
    const [y, setY] = useState(() => (typeof window !== "undefined" ? window.scrollY : 0));
    useEffect(() => {
        const fn = () => setY(window.scrollY);
        fn();
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
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 9999, background: "rgba(37,99,235,0.08)" }}>
            <div style={{ height: "100%", width: `${p}%`, background: "linear-gradient(90deg,#1D4ED8,#2563EB,#60A5FA)", transition: "width 0.12s linear", boxShadow: "0 0 10px rgba(37,99,235,0.5)" }} />
        </div>
    );
}

/* ─── FLOATING PARTICLES (hero) ──────────────────────────────────────────── */
function Particles() {
    const [pts] = useState(() =>
        Array.from({ length: 14 }, () => ({
            top: `${10 + Math.random() * 80}%`,
            left: `${5 + Math.random() * 90}%`,
            delay: `${Math.random() * 5}s`,
            dur: `${4 + Math.random() * 4}s`,
            size: 1.5 + Math.random() * 2,
            op: 0.2 + Math.random() * 0.4,
        }))
    );

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
                        background: "var(--gold-lt)",
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
    const fallback = FALLBACKS[id ? id % FALLBACKS.length : 0];
    const imported = resolveProjectImage(src) || projectImageMap[src] || src;
    return (
        <img
            src={errored || !imported ? fallback : imported}
            alt={alt || "Al Agha Project"}
            className={className}
            style={style}
            loading="lazy"
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
                background: "rgba(11,18,32,0.55)",
                backdropFilter: "blur(14px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px",
                animation: "backdropIn 0.25s ease",
            }}
        >
            <div
                onClick={e => e.stopPropagation()}
                style={{
                    background: "#FFFFFF",
                    borderRadius: 22,
                    overflow: "hidden",
                    width: "100%",
                    maxWidth: 720,
                    maxHeight: "88vh",
                    overflowY: "auto",
                    boxShadow: "0 60px 120px rgba(11,18,32,0.35), 0 0 0 1px rgba(37,99,235,0.15)",
                    border: "1px solid var(--border)",
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
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,18,32,0.9) 0%, rgba(11,18,32,0.12) 55%, transparent 100%)" }} />

                    <button
                        onClick={onClose}
                        aria-label="Close"
                        style={{
                            position: "absolute", top: 18, right: 18,
                            width: 40, height: 40, borderRadius: "50%",
                            background: "rgba(255,255,255,0.18)",
                            border: "1px solid rgba(255,255,255,0.35)",
                            color: "#fff", fontSize: 17, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            backdropFilter: "blur(10px)",
                            transition: "background 0.2s, transform 0.2s",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "rgba(37,99,235,0.75)"; e.currentTarget.style.transform = "rotate(90deg)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.18)"; e.currentTarget.style.transform = "none"; }}
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
                                    background: "var(--gold)", color: "#FFFFFF",
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
                        background: "var(--surface)",
                        borderRadius: 14,
                        padding: "16px 20px",
                        display: "flex", alignItems: "center", gap: 14,
                        border: "1px solid var(--border)",
                    }}>
                        <div style={{
                            width: 36, height: 36, borderRadius: "50%",
                            background: "linear-gradient(135deg, var(--gold), var(--gold-dk))",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#FFFFFF", fontWeight: 700, fontSize: 14, flexShrink: 0,
                        }}>Q</div>
                        <div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 2 }}>Quality Assured</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "rgba(11,18,32,0.5)" }}>ISO 9001:2015 · ISO 14001:2015 · OHSAS 18001:2007</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── PROJECT CARD ───────────────────────────────────────────────────────── */
function ProjectCard({ project, onOpen, index, skipReveal }) {
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

    const cardContent = (
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
                            background: "var(--gold)", color: "#FFFFFF",
                            fontSize: 8, fontWeight: 700, letterSpacing: "0.14em",
                            textTransform: "uppercase", padding: "2px 8px",
                            borderRadius: 20, fontFamily: "var(--f-body)",
                            boxShadow: "0 2px 14px rgba(37,99,235,0.45)",
                        }}>★ Featured</span>
                    </div>
                )}
            </div>

            <div className="proj-name-strip">
                <h3 style={{
                    fontFamily: "var(--f-display)",
                    fontSize: "clamp(14px, 1.1vw, 16px)",
                    fontWeight: 700,
                    color: "var(--ink)",
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
    );

    if (skipReveal) return cardContent;
    return <Reveal delay={(index % 4) * 60} dir="up">{cardContent}</Reveal>;
}

/* ─── SEARCH BAR ─────────────────────────────────────────────────────────── */
function SearchBar({ value, onChange }) {
    const [focused, setFocused] = useState(false);
    return (
        <div style={{ position: "relative", maxWidth: 320, width: "100%" }}>
            <span style={{
                position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                display: "flex", alignItems: "center", justifyContent: "center",
                pointerEvents: "none", color: focused ? "var(--gold)" : "rgba(11,18,32,0.4)",
                transition: "color 0.2s"
            }}>
                <Icons.Search />
            </span>
            <input
                id="project-search-input"
                aria-label="Search projects"
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Search projects…"
                style={{
                    width: "100%",
                    background: focused ? "#FFFFFF" : "var(--surface)",
                    border: `1.5px solid ${focused ? "var(--gold)" : "var(--border)"}`,
                    color: "var(--ink)", padding: "8px 32px 8px 36px",
                    fontFamily: "var(--f-body)", fontSize: 13,
                    outline: "none", borderRadius: 10,
                    transition: "all 0.22s", boxSizing: "border-box",
                    boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.12)" : "none",
                }}
            />
            {value && (
                <button
                    onClick={() => onChange("")}
                    aria-label="Clear search"
                    style={{
                        position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
                        background: "rgba(11,18,32,0.06)", border: "none", borderRadius: "50%",
                        width: 20, height: 20,
                        cursor: "pointer", color: "rgba(11,18,32,0.5)", fontSize: 11, lineHeight: 1,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s, color 0.2s"
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(11,18,32,0.12)"; e.currentTarget.style.color = "var(--ink)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(11,18,32,0.06)"; e.currentTarget.style.color = "rgba(11,18,32,0.5)"; }}
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
                background: hov ? "var(--gold)" : "rgba(96,165,250,0.12)",
                border: `1px solid ${hov ? "var(--gold)" : "rgba(96,165,250,0.35)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none",
                transition: "all 0.22s",
                transform: hov ? "translateY(-3px)" : "none",
                flexShrink: 0,
                color: hov ? "#FFFFFF" : "var(--gold-lt)",
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
export default function Projects() {
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
                            clearTimeout(timeoutId);
                            setVideoLoaded(true);
                        });
                }
            };

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
        return () => {
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);
        };
    }, [videoError]);

    // IMPORTANT: This function handles navigation from Projects page
    // When a nav item is clicked, it navigates to home and scrolls to the exact section
    const goTo = (id) => {
        setMenuOpen(false);

        // If navigating to Home, scroll to top of home page
        if (id === "Home") {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // If already on Projects page
        if (id === "Projects") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        // For all other sections (About, Services, Clients, Career, Team)
        // Navigate with hash so ScrollToSection handles smooth scrolling reliably
        navigate("/#" + id.toLowerCase().replace(/\s+/g, "-"));
    };

    // Ensure only valid project records are processed
    const validProjects = PROJECTS.filter(p => p && p.name && typeof p.name === "string");

    const filtered = validProjects.filter(p => {
        if (activeCategory !== "All" && p.category !== activeCategory) return false;
        if (showFeatured && !p.featured) return false;
        if (search) {
            const q = search.trim().toLowerCase();
            if (!q) return true;
            return [p.name, p.category, p.client, p.location].some(
                f => f && typeof f === "string" && f.toLowerCase().includes(q)
            );
        }
        return true;
    }).sort((a, b) => {
        if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
        if (b.featured && !a.featured) return 1;
        if (a.featured && !b.featured) return -1;
        return 0;
    });

    const catCounts = {};
    CATEGORIES.forEach(c => {
        catCounts[c] = c === "All" ? validProjects.length : validProjects.filter(p => p.category === c).length;
    });

    return (
        <div className="page-transition" style={{ background: "var(--bg-deep)", color: "var(--ink)", minHeight: "100vh", overflowX: "hidden" }}>
                        <ReadingProgress />

            {/* ── NAVIGATION ── */}
            <nav style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 99999,
                background: scrolled ? "rgba(255,255,255,0.97)" : "transparent",
                backdropFilter: scrolled ? "blur(22px)" : "none",
                boxShadow: scrolled ? "0 1px 0 var(--border), 0 8px 24px rgba(37,99,235,0.06)" : "none",
                transition: "all 0.4s ease",
            }}>
                <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 20px", height: "clamp(64px, 6vh, 74px)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <button onClick={() => goTo("Home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: "clamp(36px, 3.5vw, 44px)", height: "clamp(36px, 3.5vw, 44px)", borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <img src={logo} alt="Al Agha Group" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={e => e.target.style.display = "none"} />
                        </div>
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(16px, 1.5vw, 19px)", color: scrolled ? "var(--ink)" : "#fff", lineHeight: 1.15, transition: "color 0.3s" }}>Al Agha Group</div>
                            <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(6px, 0.6vw, 8px)", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--gold)" }}>of Companies</div>
                        </div>
                    </button>

                    <div style={{ display: "flex", gap: "clamp(16px, 2.5vw, 32px)", alignItems: "center" }} className="desktop-nav">
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} className={`nav-btn ${l === "Projects" ? "nav-active" : ""}`} style={{ color: l === "Projects" ? "var(--gold)" : (scrolled ? "rgba(11,18,32,0.8)" : "rgba(255,255,255,0.9)"), fontSize: "clamp(11px, 1vw, 13px)", transition: "color 0.3s" }}>{l}</button>
                        ))}
                        <button className="btn-gold" style={{ padding: "8px 18px", fontSize: "clamp(10px, 0.8vw, 12px)" }} onClick={() => goTo("Career")}>Join Us</button>
                    </div>

                    <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", color: scrolled ? "var(--ink)" : "#fff", fontSize: 22, cursor: "pointer", display: "none", alignItems: "center", transition: "color 0.3s" }} className="mobile-toggle">
                        {menuOpen ? "✕" : "☰"}
                    </button>
                </div>

                {menuOpen && (
                    <div style={{ background: "rgba(255,255,255,0.98)", borderTop: "1px solid var(--border)" }}>
                        {NAV.map(l => (
                            <button key={l} onClick={() => goTo(l)} style={{ display: "block", width: "100%", background: "none", border: "none", borderBottom: "1px solid var(--border)", color: l === "Projects" ? "var(--gold)" : "rgba(11,18,32,0.75)", fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 500, padding: "15px 20px", textAlign: "left", cursor: "pointer" }}>{l}</button>
                        ))}
                    </div>
                )}
            </nav>

            {/* ── HERO WITH VIDEO (FIXED) ── */}
            <header style={{
                minHeight: "calc(var(--vh, 1vh) * 100)",
                position: "relative",
                display: "flex",
                alignItems: "center",
                overflow: "hidden",
                background: "linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1D4ED8 100%)"
            }}>
                {/* Video Container with proper aspect ratio */}
                <div className="hero-video-container">
                    <div className="hero-video-wrap">
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

                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(115deg, rgba(11,18,32,0.5) 0%, rgba(29,78,216,0.4) 45%, rgba(37,99,235,0.32) 100%)",
                    zIndex: 1,
                    opacity: videoLoaded ? 1 : 0.5,
                    transition: "opacity 1.2s ease-in-out 0.3s",
                }} />

                <div style={{
                    position: "absolute", inset: 0,
                    background: "radial-gradient(ellipse at center, transparent 40%, rgba(11,18,32,0.45) 100%)",
                    zIndex: 1, pointerEvents: "none",
                    opacity: videoLoaded ? 1 : 0.5,
                    transition: "opacity 1.2s ease-in-out 0.5s",
                }} />

                <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
                    background: "linear-gradient(to top, rgba(11,18,32,0.55) 0%, transparent 100%)",
                    zIndex: 1, pointerEvents: "none",
                    opacity: videoLoaded ? 1 : 0.5,
                    transition: "opacity 1.2s ease-in-out 0.7s",
                }} />

                {/* Ambient orbs - delayed */}
                <div className="hero-orb" style={{
                    width: 400, height: 400, top: "-15%", left: "-10%",
                    animationDelay: "0s", zIndex: 1,
                    opacity: videoLoaded ? 1 : 0,
                    transition: "opacity 1.5s ease-in-out 0.8s",
                }} />
                <div className="hero-orb" style={{
                    width: 350, height: 350, bottom: "-20%", right: "5%",
                    animationDelay: "3s", zIndex: 1,
                    opacity: videoLoaded ? 1 : 0,
                    transition: "opacity 1.5s ease-in-out 0.9s",
                }} />

                <Particles />

                <div style={{
                    position: "absolute", left: 0, top: "10%", bottom: "10%", width: 2,
                    background: "linear-gradient(to bottom, transparent, var(--gold-lt), transparent)",
                    zIndex: 1,
                    opacity: videoLoaded ? 0.7 : 0,
                    transition: "opacity 1.5s ease-in-out 1s",
                }} />

                <div style={{
                    maxWidth: 1320, margin: "0 auto", padding: "clamp(110px, 16vw, 130px) 20px clamp(60px, 8vw, 90px)",
                    position: "relative", zIndex: 2, width: "100%",
                    opacity: videoLoaded ? 1 : 0.6,
                    transition: "opacity 1s ease-in-out 0.4s, transform 1s ease-in-out 0.4s",
                    transform: videoLoaded ? "translateY(0)" : "translateY(20px)",
                }}>
                    <div style={{ maxWidth: 650 }}>
                        <div style={{
                            marginBottom: 24,
                            animation: videoLoaded ? "fadeUp 0.8s 0.6s both" : "none",
                        }}>
                            <span style={{
                                background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.4)",
                                backdropFilter: "blur(20px)", padding: "6px 16px",
                                borderRadius: 40, fontSize: "clamp(8px, 0.8vw, 10px)",
                                fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                                color: "#fff", boxShadow: "0 4px 15px rgba(37,99,235,0.15)"
                            }}>
                                Project Portfolio
                            </span>
                        </div>
                        <h1 style={{
                            fontFamily: "var(--f-display)", fontWeight: 700, lineHeight: 1.04,
                            letterSpacing: "-0.02em", fontSize: "clamp(2rem, 5vw, 3.8rem)",
                            color: "#fff", marginBottom: 20,
                            animation: videoLoaded ? "fadeUp 0.9s 0.8s both" : "none",
                            textShadow: "0 2px 20px rgba(11,18,32,0.4)"
                        }}>
                            Our Work,<br />
                            <em style={{ color: "var(--gold-lt)", fontStyle: "italic" }}>Built to Last.</em>
                        </h1>
                        <p style={{
                            fontFamily: "var(--f-body)", fontSize: "clamp(14px, 1.1vw, 16px)",
                            color: "rgba(255,255,255,0.9)", lineHeight: 1.8, maxWidth: 480, marginBottom: 32,
                            animation: videoLoaded ? "fadeUp 1s 1s both" : "none",
                            textShadow: "0 1px 10px rgba(11,18,32,0.4)"
                        }}>
                            Over 200 completed projects across the UAE — from landmark towers and luxury hotels to government buildings, EXPO pavilions, and community developments.
                        </p>
                        <div style={{
                            display: "flex", gap: 14, flexWrap: "wrap",
                            animation: videoLoaded ? "fadeUp 1s 1.2s both" : "none"
                        }}>
                            <button className="btn-gold" style={{ padding: "clamp(10px, 1vw, 14px) clamp(18px, 2vw, 28px)", fontSize: "clamp(10px, 0.8vw, 12px)" }}>Browse Projects</button>
                            <button className="btn-outline-white" style={{ padding: "clamp(10px, 1vw, 14px) clamp(18px, 2vw, 28px)", fontSize: "clamp(10px, 0.8vw, 12px)" }} onClick={() => goTo("About")}>Our Story</button>
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
            </header>

            {/* ── FILTER BAR ── */}
            <div style={{ background: "rgba(255,255,255,0.96)", backdropFilter: "blur(22px)", borderBottom: "1px solid var(--border)", position: "sticky", top: "clamp(64px, 6vh, 74px)", zIndex: 99 }}>
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
                                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--ink)", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", padding: "7px 10px", borderRadius: 10, cursor: "pointer", outline: "none" }}
                            >
                                <option value="default">Featured first</option>
                                <option value="name">A – Z</option>
                            </select>
                            <label style={{ display: "flex", alignItems: "center", gap: 5, cursor: "pointer", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(11,18,32,0.7)", whiteSpace: "nowrap" }}>
                                <input type="checkbox" checked={showFeatured} onChange={e => setShowFeatured(e.target.checked)} style={{ accentColor: "var(--gold)", width: 14, height: 14 }} />
                                Featured
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── RESULT COUNT ── */}
            <div style={{ maxWidth: 1320, margin: "0 auto", padding: "16px 20px 0" }}>
                <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", color: "rgba(11,18,32,0.45)" }}>
                    Showing <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> of {validProjects.length} projects
                    {search && <> matching "<span style={{ color: "var(--gold)" }}>{search}</span>"</>}
                    {activeCategory !== "All" && <> in <span style={{ color: "var(--gold)" }}>{activeCategory}</span></>}
                </p>
            </div>

            {/* ── PROJECT GRID ── */}
            <main style={{ maxWidth: 1320, margin: "0 auto", padding: "20px 20px 60px" }}>
                {filtered.length === 0 ? (
                    <div style={{ textAlign: "center", padding: "60px 24px" }}>
                        <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
                        <div style={{ fontFamily: "var(--f-display)", fontSize: 22, color: "var(--ink)", fontWeight: 700, marginBottom: 6 }}>No projects found</div>
                        <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "rgba(11,18,32,0.45)" }}>Try adjusting your search or filters.</div>
                        <button
                            onClick={() => { setSearch(""); setActiveCategory("All"); setShowFeatured(false); }}
                            style={{ marginTop: 16, background: "var(--gold)", color: "#FFFFFF", border: "none", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "8px 18px", borderRadius: 8, cursor: "pointer" }}
                        >Clear All Filters</button>
                    </div>
                ) : (
                    <div
                        className="project-grid"
                        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "clamp(16px, 1.5vw, 24px)" }}
                    >
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} onOpen={setSelectedProject} index={i} skipReveal={!!(search || activeCategory !== "All" || showFeatured)} />
                        ))}
                    </div>
                )}
            </main>

            {/* ── FOOTER ── */}
            <footer style={{ background: "var(--footer-ink)", padding: "clamp(40px, 5vw, 72px) 20px clamp(24px, 2.5vw, 36px)", borderTop: "1px solid rgba(255, 255, 255, 0.18)" }}>
                <div style={{ maxWidth: 1320, margin: "0 auto" }}>
                    <div className="footer-grid">
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
                            <p style={{ fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.8, maxWidth: 260, marginBottom: 22 }}>
                                False ceiling, gypsum works, interior fit-out, and MEP services across the UAE since 2008.
                            </p>
                            <div style={{ display: "flex", gap: 8, marginBottom: 26, flexWrap: "wrap" }}>
                                <SocialBtn href="https://www.facebook.com/profile.php?id=61551030990492" label="Facebook"><Icons.Facebook /></SocialBtn>
                                <SocialBtn href="https://www.instagram.com/reel/DAVwH2TpoJP/" label="Instagram"><Icons.Instagram /></SocialBtn>
                            </div>
                            <div style={{ display: "flex", gap: 12, alignItems: "center", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(96,165,250,0.25)", borderRadius: 12, padding: "12px 14px" }}>
                                <QRCode />
                                <div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold-lt)", marginBottom: 4 }}>Scan to connect</div>
                                    <div style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 12px)", color: "rgba(96,165,250,0.6)", lineHeight: 1.5 }}>Point your camera to visit Al Agha Group online</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Quick Links</h4>
                            {NAV.map(l => (
                                <button key={l} onClick={() => goTo(l)} style={{ display: "block", background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontFamily: "var(--f-body)", fontSize: "clamp(12px, 0.9vw, 13px)", padding: "6px 0", cursor: "pointer", textAlign: "left", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold-lt)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.4)"}>{l}</button>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Services</h4>
                            {["False Ceiling & Gypsum Decor", "Interior Design & Fit-Out", "Mechanical, Electrical, Plumbing (MEP)", "General Civil Works", "Paint & Wall Finishes"].map(s => (
                                <div key={s} style={{ fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.35)", padding: "5px 0", lineHeight: 1.5 }}>{s}</div>
                            ))}
                        </div>

                        <div>
                            <h4 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(16px, 1.3vw, 18px)", fontWeight: 700, marginBottom: 18, color: "#fff" }}>Contact</h4>
                            {[
                                ["📍", "Office 201 & 202, Block A, Abraj Al Mamzar, Dubai, U.A.E."],
                                ["📞", "+971 4 267 5229"],
                                ["✉️", "info@alaghagroup.com"],
                            ].map(([icon, txt]) => (
                                <div key={txt} style={{ display: "flex", gap: 10, padding: "5px 0", fontFamily: "var(--f-body)", fontSize: "clamp(11px, 0.8vw, 13px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>
                                    <span style={{ flexShrink: 0 }}>{icon}</span><span>{txt}</span>
                                </div>
                            ))}
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

                    <div style={{ borderTop: "1px solid rgba(96,165,250,0.18)", paddingTop: "clamp(18px, 1.8vw, 22px)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.25)" }}>© 2025 Al Agha Group of Companies · All rights reserved</span>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: "clamp(10px, 0.8vw, 12px)", color: "rgba(255,255,255,0.25)" }}>Privacy Policy · Terms of Service</span>
                    </div>
                </div>
            </footer>

            {/* ── MODAL ── */}
            {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
        </div>
    );
}