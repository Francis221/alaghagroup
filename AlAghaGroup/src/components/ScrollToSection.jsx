import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToSection
 * Runs on every route change. If the URL has a hash (e.g. /#about),
 * waits ~120 ms for the page to render, then smoothly scrolls to
 * the matching element. If there is no hash, scrolls back to the top.
 */
export default function ScrollToSection() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      // No hash → go to top of the new page
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Strip the leading '#' and allow a short delay for React to mount the page
    const id = hash.slice(1);
    const attempt = (tries = 0) => {
      const el = document.getElementById(id);
      if (el) {
        // Offset for fixed navbar (≈ 72 px) – uses scroll-margin-top instead when available
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (tries < 10) {
        // Retry up to ~1 s in case the component hasn't mounted yet
        setTimeout(() => attempt(tries + 1), 100);
      }
    };

    const t = setTimeout(() => attempt(), 120);
    return () => clearTimeout(t);
  }, [pathname, hash]);

  return null;
}
