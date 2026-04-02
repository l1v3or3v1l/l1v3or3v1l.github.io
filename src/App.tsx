import { useState, useEffect, useRef } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Section {
  id: string;
  label: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const NAV: Section[] = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "tools", label: "tools" },
  { id: "certs", label: "certs" },
  { id: "projects", label: "projects" },
  { id: "contact", label: "contact" },
];

const TAGLINES = ["pentest/", "exploit/", "enumerate/", "secure/", "repeat/"];

const TECH_SKILLS = ["Python", "C++", "JavaScript", "C", "Bash"];

const CERTS = [
  {
    name: "NPTEL – Programming, Data Structures & Algorithms (Python)",
    year: "2023",
    url: "https://nptel.ac.in/noc/E_Certificate/NPTEL23CS95S4477004610090470",
  },
  {
    name: "eJPTv1 – eLearnSecurity Junior Penetration Tester",
    year: "2022",
    url: "https://certs.ine.com/9b415de8-936d-442f-b13b-ebb17ac55546#acc.nbrGqlOs",
  },
  {
    name: "HackerRank Python Certificate",
    year: "2022",
    url: "https://www.hackerrank.com/certificates/0add0fa2e862",
  },
];

const PROJECTS = [
  {
    name: "Cybersecurity Projects",
    desc: "A collection of pentesting scripts and tools built for hands-on learning of offensive security techniques.",
    tags: ["Python", "Bash", "Pentesting"],
    url: "https://github.com/l1v3or3v1l/cybersecprojects",
  },
  {
    name: "Casual Coding Projects",
    desc: "Scripts and utilities crafted during free time — exploring ideas, automating tasks, and experimenting.",
    tags: ["Python", "JavaScript", "Misc"],
    url: "https://github.com/l1v3or3v1l/effective-octospoon",
  },
];

// ─── Tool SVG Logos ───────────────────────────────────────────────────────────
// Inline hand-crafted SVGs, monochrome, coloured via currentColor

const NmapLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    <circle cx="20" cy="20" r="17" stroke="currentColor" strokeWidth="1.5"/>
    {/* radar sweep */}
    <path d="M20 20 L20 5" stroke="currentColor" strokeWidth="1.2" opacity="0.4"/>
    <path d="M20 20 L32 28" stroke="currentColor" strokeWidth="1.2" opacity="0.25"/>
    <circle cx="20" cy="20" r="5" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" opacity="0.25"/>
    {/* N letterform */}
    <path d="M12 28 L12 13 L20 24 L28 13 L28 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    {/* ping dot */}
    <circle cx="28" cy="13" r="2" fill="currentColor"/>
  </svg>
);

const WiresharkLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Shark fin */}
    <path d="M7 32 C7 32 10 17 17 9 C19.5 6 22 8.5 21 13 C20 17 25 14 30 21 C32 25 30 32 30 32 Z"
      stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
    {/* Eye */}
    <circle cx="18" cy="19" r="1.8" fill="currentColor" opacity="0.8"/>
    {/* Packet waves */}
    <path d="M7 36 Q11 32 15 36 Q19 40 23 36 Q27 32 30 36"
      stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.45"/>
  </svg>
);

const BurpSuiteLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Outer flame */}
    <path d="M20 3 C20 3 30 12 30 21 C30 28 25 31 22 28 C20 26 22 22 21 18 C19 23 23 30 20 35 C18 37 15 36 14 33 C12 28 15 24 17 21 C14 23 11 21 11 18 C11 10 20 3 20 3Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Inner highlight */}
    <path d="M20 14 C20 14 24 19 23 24 C22 27 20 27 19 25 C18 22 20 18 20 14Z"
      stroke="currentColor" strokeWidth="1" opacity="0.4" strokeLinejoin="round"/>
  </svg>
);

const NiktoLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    <rect x="4" y="4" width="32" height="32" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    {/* Terminal prompt */}
    <text x="8" y="17" fontSize="7" fontFamily="monospace" fill="currentColor" opacity="0.45">$&gt;</text>
    {/* Big N */}
    <path d="M10 30 L10 14 L20 26 L30 14 L30 30" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
    {/* Scan underline */}
    <line x1="4" y1="35" x2="36" y2="35" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.35"/>
  </svg>
);

const MetasploitLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Hexagon */}
    <path d="M20 3 L35 11.5 L35 28.5 L20 37 L5 28.5 L5 11.5 Z"
      stroke="currentColor" strokeWidth="1.5"/>
    {/* M */}
    <path d="M10 28 L10 13 L20 22 L30 13 L30 28" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    {/* Center dot */}
    <circle cx="20" cy="22" r="2" fill="currentColor" opacity="0.6"/>
  </svg>
);

const AircrackLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* WiFi arcs */}
    <circle cx="20" cy="30" r="2.5" fill="currentColor"/>
    <path d="M14 26 C15.5 22.5 17.5 21 20 21 C22.5 21 24.5 22.5 26 26"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M9 21 C12 15.5 15.5 13 20 13 C24.5 13 28 15.5 31 21"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <path d="M4 16 C8.5 8.5 13.5 5 20 5 C26.5 5 31.5 8.5 36 16"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.4"/>
    {/* Lightning crack */}
    <path d="M26 4 L22 15 L26 15 L22 26" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" opacity="0.75"/>
  </svg>
);

const OwaspZapLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Shield */}
    <path d="M20 3 L34 9 L34 22 C34 29 27 35 20 38 C13 35 6 29 6 22 L6 9 Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* ZAP bolt inside */}
    <path d="M23 12 L17 21 L22 21 L17 30" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round"/>
  </svg>
);

const GoBusterLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Door */}
    <rect x="11" y="5" width="20" height="30" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="26" cy="20" r="1.8" fill="currentColor" opacity="0.6"/>
    {/* Arrow busting through */}
    <path d="M2 20 L18 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M13 15 L19 20 L13 25" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
    {/* Impact cracks */}
    <path d="M16 9 L18 14 L14 18" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.5"/>
    <path d="M16 31 L19 26 L16 23" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.5"/>
  </svg>
);

const JohnLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Skull cranium */}
    <path d="M20 4 C11 4 6 10.5 6 17.5 C6 22.5 9 26.5 13 28.5 L13 33 L27 33 L27 28.5 C31 26.5 34 22.5 34 17.5 C34 10.5 29 4 20 4 Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Eyes */}
    <ellipse cx="14.5" cy="17" rx="3" ry="3.5" stroke="currentColor" strokeWidth="1.3"/>
    <ellipse cx="25.5" cy="17" rx="3" ry="3.5" stroke="currentColor" strokeWidth="1.3"/>
    {/* Nose */}
    <path d="M18.5 22 L20 24 L21.5 22" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" opacity="0.6"/>
    {/* Jaw / teeth */}
    <line x1="13" y1="33" x2="27" y2="33" stroke="currentColor" strokeWidth="1.3"/>
    <line x1="16" y1="33" x2="16" y2="37" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="20" y1="33" x2="20" y2="37" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <line x1="24" y1="33" x2="24" y2="37" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

const HashcatLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Hash # */}
    <line x1="14" y1="6" x2="12" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="26" y1="6" x2="24" y2="34" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="8" y1="16" x2="32" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    <line x1="7" y1="26" x2="31" y2="26" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"/>
    {/* GPU speed marks */}
    <path d="M35 10 L39 12.5 L35 15" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" opacity="0.55"/>
    <path d="M35 19 L39 21.5 L35 24" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" opacity="0.35"/>
  </svg>
);

const HydraLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Body */}
    <path d="M20 38 C20 38 13 33 13 26 C13 22 16 20.5 18.5 20.5 L21.5 20.5 C24 20.5 27 22 27 26 C27 33 20 38 20 38Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    {/* Left neck + head */}
    <path d="M14.5 21 C11 18 7 15 6 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="5.5" cy="8" rx="3.2" ry="2.5" stroke="currentColor" strokeWidth="1.3" transform="rotate(-15 5.5 8)"/>
    <circle cx="4.5" cy="7" r="0.8" fill="currentColor" opacity="0.7"/>
    {/* Center neck + head */}
    <path d="M20 20.5 C20 16 20 12 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="20" cy="6" rx="3.2" ry="2.5" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="19" cy="5.3" r="0.8" fill="currentColor" opacity="0.7"/>
    {/* Right neck + head */}
    <path d="M25.5 21 C29 18 33 15 34 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <ellipse cx="34.5" cy="8" rx="3.2" ry="2.5" stroke="currentColor" strokeWidth="1.3" transform="rotate(15 34.5 8)"/>
    <circle cx="33.5" cy="7" r="0.8" fill="currentColor" opacity="0.7"/>
  </svg>
);

const BeEFLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="38">
    {/* Browser chrome */}
    <rect x="3" y="6" width="34" height="28" rx="3" stroke="currentColor" strokeWidth="1.5"/>
    <line x1="3" y1="14" x2="37" y2="14" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="9" cy="10" r="1.5" fill="currentColor" opacity="0.55"/>
    <circle cx="15" cy="10" r="1.5" fill="currentColor" opacity="0.35"/>
    <rect x="19" y="8" width="13" height="4" rx="1" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
    {/* Fishing hook inside browser */}
    <path d="M20 18 C20 18 20 22.5 24 22.5 C28 22.5 28 18.5 24 18.5 C20 18.5 15 21 15 27 C15 31 18 33 21 33"
      stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" fill="none"/>
    {/* Hook tip */}
    <path d="M19 31 L21 33 L23 31" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const TOOLS: { name: string; Logo: React.FC }[] = [
  { name: "Nmap",             Logo: NmapLogo },
  { name: "Wireshark",        Logo: WiresharkLogo },
  { name: "Burp Suite",       Logo: BurpSuiteLogo },
  { name: "Nikto",            Logo: NiktoLogo },
  { name: "Metasploit",       Logo: MetasploitLogo },
  { name: "Aircrack-ng",      Logo: AircrackLogo },
  { name: "OWASP ZAP",        Logo: OwaspZapLogo },
  { name: "GoBuster",         Logo: GoBusterLogo },
  { name: "John the Ripper",  Logo: JohnLogo },
  { name: "Hashcat",          Logo: HashcatLogo },
  { name: "Hydra",            Logo: HydraLogo },
  { name: "BeEF",             Logo: BeEFLogo },
];

// ─── Smooth scroll helper ─────────────────────────────────────────────────────
function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Syne:wght@400..800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060810;
    --bg2: #0c0f1a;
    --bg3: #111627;
    --border: #1e2540;
    --green: #00ff88;
    --green-dim: #00ff8820;
    --green-mid: #00ff8866;
    --text: #e2e8f8;
    --muted: #5a6480;
    --mono: 'JetBrains Mono', monospace;
    --sans: 'Syne', sans-serif;
  }

  html { scroll-behavior: smooth; }
  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--mono);
    overflow-x: hidden;
    cursor: none;
  }

  .cursor {
    position: fixed;
    width: 12px; height: 12px;
    background: var(--green);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: difference;
  }
  .cursor-ring {
    position: fixed;
    width: 36px; height: 36px;
    border: 1px solid var(--green-mid);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: left 0.08s ease, top 0.08s ease;
  }

  .scanlines::after {
    content: '';
    position: fixed;
    inset: 0;
    background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px);
    pointer-events: none;
    z-index: 9997;
  }

  .grid-bg {
    background-image:
      linear-gradient(var(--border) 1px, transparent 1px),
      linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Navbar */
  nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.2rem 3rem;
    background: rgba(6,8,16,0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid var(--border);
  }
  .nav-logo {
    font-family: var(--mono); font-weight: 700; font-size: 1rem;
    color: var(--green); letter-spacing: 0.05em;
    background: none; border: none; cursor: none; padding: 0;
  }
  .nav-logo span { color: var(--muted); }
  .nav-links { display: flex; gap: 2rem; }
  .nav-link {
    font-size: 0.75rem; color: var(--muted);
    text-decoration: none; letter-spacing: 0.12em; text-transform: lowercase;
    transition: color 0.2s; position: relative;
    background: none; border: none; font-family: var(--mono); cursor: none; padding: 0;
  }
  .nav-link::before { content: './'; color: var(--green); opacity: 0; transition: opacity 0.2s; }
  .nav-link:hover { color: var(--text); }
  .nav-link:hover::before { opacity: 1; }

  /* Hero */
  .hero {
    min-height: 100vh; display: flex; flex-direction: column; justify-content: center;
    padding: 8rem 3rem 4rem; position: relative; overflow: hidden;
  }
  .hero-label { font-size: 0.7rem; letter-spacing: 0.25em; color: var(--green); text-transform: uppercase; margin-bottom: 1.5rem; }
  .hero-name {
    font-family: var(--sans); font-size: clamp(3.5rem, 10vw, 8rem);
    font-weight: 800; line-height: 0.9; letter-spacing: -0.03em; color: var(--text); margin-bottom: 0.5rem;
  }
  .hero-name .accent { color: var(--green); }
  .tagline-wrap {
    font-family: var(--mono); font-size: clamp(1.2rem, 3vw, 2rem);
    color: var(--muted); margin-bottom: 2.5rem; height: 2.5rem; overflow: hidden;
  }
  .tagline-inner { transition: transform 0.5s cubic-bezier(0.77,0,0.18,1); }
  .tagline-item { height: 2.5rem; display: flex; align-items: center; }
  .tagline-item .hl { color: var(--green); }
  .hero-desc { max-width: 560px; font-size: 0.875rem; line-height: 1.8; color: var(--muted); margin-bottom: 3rem; }
  .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; }

  .btn {
    display: inline-flex; align-items: center; gap: 0.5rem;
    padding: 0.75rem 1.75rem; font-family: var(--mono); font-size: 0.75rem;
    letter-spacing: 0.1em; text-decoration: none; border-radius: 0; transition: all 0.2s; cursor: none;
  }
  .btn-primary {
    background: var(--green); color: var(--bg); font-weight: 700; border: none;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-primary:hover { background: #fff; }
  .btn-ghost { border: 1px solid var(--border); color: var(--muted); background: transparent; }
  .btn-ghost:hover { border-color: var(--green); color: var(--green); }

  .orb {
    position: absolute; width: 600px; height: 600px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%);
    top: -100px; right: -100px; pointer-events: none;
  }

  /* Sections */
  section { padding: 6rem 3rem; border-top: 1px solid var(--border); position: relative; }
  .section-header { display: flex; align-items: center; gap: 1rem; margin-bottom: 3.5rem; }
  .section-num { font-size: 0.65rem; color: var(--green); letter-spacing: 0.15em; min-width: 2rem; }
  .section-title { font-family: var(--sans); font-size: clamp(1.5rem, 4vw, 2.5rem); font-weight: 700; color: var(--text); letter-spacing: -0.02em; }
  .section-line { flex: 1; height: 1px; background: var(--border); }

  /* About */
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
  .about-text { font-size: 0.9rem; line-height: 2; color: var(--muted); }
  .about-text p + p { margin-top: 1rem; }
  .about-text .hl { color: var(--text); }
  .info-block { display: flex; flex-direction: column; gap: 1rem; }
  .info-row { display: flex; align-items: flex-start; gap: 1rem; padding: 0.75rem 1rem; border: 1px solid var(--border); background: var(--bg2); }
  .info-label { font-size: 0.65rem; color: var(--green); letter-spacing: 0.15em; min-width: 80px; text-transform: uppercase; padding-top: 2px; }
  .info-val { font-size: 0.8rem; color: var(--text); }

  /* Skills */
  .skills-grid { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .skill-chip {
    padding: 0.5rem 1.25rem; border: 1px solid var(--border); font-size: 0.75rem;
    color: var(--text); letter-spacing: 0.08em; background: var(--bg2); transition: all 0.2s;
    clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
  }
  .skill-chip:hover { border-color: var(--green); color: var(--green); background: var(--green-dim); }

  /* Tools */
  .tools-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1px; border: 1px solid var(--border); background: var(--border);
  }
  .tool-card {
    background: var(--bg2); padding: 1.75rem 1rem 1.25rem; text-align: center;
    font-size: 0.72rem; letter-spacing: 0.08em; color: var(--muted); transition: all 0.25s;
    position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; gap: 0.65rem;
  }
  .tool-card::before { content: ''; position: absolute; inset: 0; background: var(--green-dim); opacity: 0; transition: opacity 0.25s; }
  .tool-logo { color: var(--muted); transition: color 0.25s, filter 0.25s; position: relative; z-index: 1; }
  .tool-name { position: relative; z-index: 1; }
  .tool-card:hover::before { opacity: 1; }
  .tool-card:hover .tool-logo { color: var(--green); filter: drop-shadow(0 0 8px rgba(0,255,136,0.45)); }
  .tool-card:hover .tool-name { color: var(--green); }

  /* Certs */
  .cert-list { display: flex; flex-direction: column; gap: 1px; }
  .cert-card {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 1.5rem 1.75rem; background: var(--bg2); border-left: 2px solid transparent;
    transition: all 0.2s; text-decoration: none;
  }
  .cert-card:hover { border-left-color: var(--green); background: var(--bg3); }
  .cert-name { font-size: 0.85rem; color: var(--text); margin-bottom: 0.25rem; }
  .cert-year { font-size: 0.7rem; color: var(--green); letter-spacing: 0.12em; }
  .cert-arrow { color: var(--muted); font-size: 1rem; transition: transform 0.2s, color 0.2s; }
  .cert-card:hover .cert-arrow { transform: translateX(4px); color: var(--green); }

  /* Projects */
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
  .project-card {
    background: var(--bg2); border: 1px solid var(--border); padding: 2rem;
    position: relative; overflow: hidden; transition: border-color 0.2s; text-decoration: none; display: block;
  }
  .project-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0;
    height: 2px; background: var(--green); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease;
  }
  .project-card:hover { border-color: var(--green-mid); }
  .project-card:hover::after { transform: scaleX(1); }
  .project-num { font-size: 0.65rem; color: var(--muted); letter-spacing: 0.15em; margin-bottom: 1rem; }
  .project-name { font-family: var(--sans); font-size: 1.25rem; font-weight: 700; color: var(--text); margin-bottom: 0.75rem; }
  .project-desc { font-size: 0.8rem; line-height: 1.7; color: var(--muted); margin-bottom: 1.5rem; }
  .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
  .tag { font-size: 0.65rem; padding: 0.2rem 0.6rem; border: 1px solid var(--border); color: var(--green); letter-spacing: 0.1em; }
  .project-link { position: absolute; top: 1.5rem; right: 1.5rem; color: var(--muted); font-size: 0.9rem; transition: color 0.2s; }
  .project-card:hover .project-link { color: var(--green); }

  /* Contact */
  .contact-inner { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; }
  .contact-big { font-family: var(--sans); font-size: clamp(2rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1; color: var(--text); margin-bottom: 1.5rem; }
  .contact-big .accent { color: var(--green); }
  .contact-sub { font-size: 0.85rem; color: var(--muted); line-height: 1.8; margin-bottom: 2rem; }
  .social-links { display: flex; flex-direction: column; gap: 1rem; }
  .social-link {
    display: flex; align-items: center; gap: 1rem; text-decoration: none;
    color: var(--muted); font-size: 0.8rem; letter-spacing: 0.08em;
    padding: 0.75rem 1rem; border: 1px solid var(--border); background: var(--bg2); transition: all 0.2s;
  }
  .social-link:hover { border-color: var(--green); color: var(--green); }
  .social-icon { font-size: 1rem; }
  .social-label { flex: 1; }
  .social-handle { font-size: 0.7rem; color: var(--muted); }
  .social-link:hover .social-handle { color: var(--green-mid); }

  /* Footer */
  footer {
    border-top: 1px solid var(--border); padding: 2rem 3rem;
    display: flex; justify-content: space-between; align-items: center;
    font-size: 0.7rem; color: var(--muted); letter-spacing: 0.08em;
  }

  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .blink { animation: blink 1s step-end infinite; color: var(--green); }

  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .fade-up { animation: fadeUp 0.6s ease both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.25s; }
  .delay-3 { animation-delay: 0.4s; }
  .delay-4 { animation-delay: 0.55s; }

  @media (max-width: 768px) {
    nav { padding: 1rem 1.5rem; }
    .nav-links { gap: 1rem; }
    section { padding: 4rem 1.5rem; }
    .hero { padding: 7rem 1.5rem 3rem; }
    .about-grid, .projects-grid, .contact-inner { grid-template-columns: 1fr; gap: 2rem; }
    footer { flex-direction: column; gap: 0.5rem; text-align: center; }
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────
export default function DhanushPortfolio() {
  const [tagIdx, setTagIdx] = useState(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = setInterval(() => setTagIdx((i) => (i + 1) % TAGLINES.length), 2200);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX - 6 + "px";
        cursorRef.current.style.top = e.clientY - 6 + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = e.clientX - 18 + "px";
        ringRef.current.style.top = e.clientY - 18 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <style>{STYLE}</style>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />

      <div className="scanlines">
        {/* ── Navbar ── */}
        <nav>
          <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            dhanush_pn<span>.sh</span>
          </button>
          <div className="nav-links">
            {NAV.map((s) => (
              <button key={s.id} className="nav-link" onClick={() => scrollTo(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero grid-bg" style={{ borderTop: "none" }}>
          <div className="orb" />
          <div className="hero-label fade-up">
            <span className="blink">▮</span>&nbsp;&nbsp;available for opportunities
          </div>
          <h1 className="hero-name fade-up delay-1">
            Dhanush<br /><span className="accent">P N</span>
          </h1>
          <div className="tagline-wrap fade-up delay-2">
            <div className="tagline-inner" style={{ transform: `translateY(-${tagIdx * 2.5}rem)` }}>
              {TAGLINES.map((t, i) => (
                <div key={i} className="tagline-item"><span className="hl">{t}</span></div>
              ))}
            </div>
          </div>
          <p className="hero-desc fade-up delay-3">
            BTech CSE graduate &amp; self-taught security practitioner from Palakkad.
            Passionate about offensive security, penetration testing, and building
            tools that blur the line between dev and sec.
          </p>
          <div className="hero-btns fade-up delay-4">
            <button className="btn btn-primary" onClick={() => scrollTo("projects")}>
              view projects →
            </button>
            <button className="btn btn-ghost" onClick={() => scrollTo("contact")}>
              get in touch
            </button>
          </div>
        </section>

        {/* ── About ── */}
        <section id="about">
          <div className="section-header">
            <span className="section-num">01</span>
            <h2 className="section-title">About</h2>
            <div className="section-line" />
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>I'm <span className="hl">Dhanush P N</span>, a Computer Science &amp; Engineering graduate with a deep obsession for <span className="hl">cybersecurity</span>. My journey started with tinkering — taking things apart to understand how they work, then figuring out how to break them.</p>
              <p>I hold the <span className="hl">eJPTv1</span> certification and have hands-on experience with industry-standard offensive security tools. My focus is on <span className="hl">penetration testing</span>, vulnerability assessment, and building scripts that make the life of a pentester easier.</p>
              <p>Fluent in <span className="hl">English, Hindi, Tamil</span> and <span className="hl">Malayalam</span> — communication is never a blocker.</p>
            </div>
            <div className="info-block">
              {[
                { label: "location", val: "Palakkad, Kerala, India" },
                { label: "education", val: "BTech CSE — College of Engineering & Management Punnapra (2021–25, 77.60%)" },
                { label: "focus", val: "Penetration Testing · Offensive Security · Scripting" },
                { label: "email", val: "pndhanush900@gmail.com" },
                { label: "phone", val: "+91 9074022657" },
              ].map(({ label, val }) => (
                <div key={label} className="info-row">
                  <span className="info-label">{label}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Skills ── */}
        <section id="skills">
          <div className="section-header">
            <span className="section-num">02</span>
            <h2 className="section-title">Skills</h2>
            <div className="section-line" />
          </div>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.15em", marginBottom: "1.25rem", textTransform: "uppercase" }}>
            // technical languages
          </p>
          <div className="skills-grid">
            {TECH_SKILLS.map((s) => <div key={s} className="skill-chip">{s}</div>)}
          </div>
        </section>

        {/* ── Tools ── */}
        <section id="tools">
          <div className="section-header">
            <span className="section-num">03</span>
            <h2 className="section-title">Tools</h2>
            <div className="section-line" />
          </div>
          <div className="tools-grid">
            {TOOLS.map(({ name, Logo }) => (
              <div key={name} className="tool-card">
                <div className="tool-logo"><Logo /></div>
                <span className="tool-name">{name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certs ── */}
        <section id="certs">
          <div className="section-header">
            <span className="section-num">04</span>
            <h2 className="section-title">Certifications</h2>
            <div className="section-line" />
          </div>
          <div className="cert-list">
            {CERTS.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="cert-card">
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-year">{c.year}</div>
                </div>
                <span className="cert-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Projects ── */}
        <section id="projects">
          <div className="section-header">
            <span className="section-num">05</span>
            <h2 className="section-title">Projects</h2>
            <div className="section-line" />
          </div>
          <div className="projects-grid">
            {PROJECTS.map((p, i) => (
              <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" className="project-card">
                <div className="project-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="project-name">{p.name}</div>
                <div className="project-desc">{p.desc}</div>
                <div className="project-tags">
                  {p.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <span className="project-link">↗</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Contact ── */}
        <section id="contact">
          <div className="section-header">
            <span className="section-num">06</span>
            <h2 className="section-title">Contact</h2>
            <div className="section-line" />
          </div>
          <div className="contact-inner">
            <div>
              <div className="contact-big">
                Let's build<br />something<br /><span className="accent">dangerous.</span>
              </div>
              <p className="contact-sub">
                Looking for internship or entry-level roles in cybersecurity, pentesting, or
                security engineering. Open to remote and on-site opportunities.
              </p>
              <a href="mailto:pndhanush900@gmail.com" className="btn btn-primary">
                send a message →
              </a>
            </div>
            <div className="social-links">
              {[
                { href: "https://github.com/l1v3or3v1l", label: "GitHub", handle: "l1v3or3v1l" },
                { href: "https://linkedin.com/in/dhanush-p-n-801aaa232", label: "LinkedIn", handle: "dhanush-p-n-801aaa232" },
                { href: "mailto:pndhanush900@gmail.com", label: "Email", handle: "pndhanush900@gmail.com" },
              ].map(({ href, label, handle }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">◈</span>
                  <span className="social-label">{label}</span>
                  <span className="social-handle">{handle}</span>
                </a>
              ))}
              <div className="social-link">
                <span className="social-icon">◈</span>
                <span className="social-label">Phone</span>
                <span className="social-handle">+91 9074022657</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer>
          <span>© 2026 Dhanush P N. All rights reserved.</span>
          <span>built with <span style={{ color: "var(--green)" }}>♥</span> Claude</span>
        </footer>
      </div>
    </>
  );
}
