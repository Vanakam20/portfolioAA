"use client";

import { useState, useEffect, useRef } from "react";

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const terminalSequence = [
    "$ whoami",
    "auguste-alain",
    "$ cat competences.txt",
    "→ Docker · Kubernetes · CI/CD",
    "→ GitHub Actions · GitLab CI",
    "→ Linux · Bash · Git",
    "$ echo $STATUT",
    "Recherche un stage DevOps — disponible maintenant ✓",
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < terminalSequence.length) {
        setTerminalLines((prev) => [...prev, terminalSequence[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 420);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  const nav = ["Accueil", "A propos", "Skill", "Contact"];

  const skills = [
    {
      category: "Conteneurs",
      icon: "🐳",
      items: ["Docker", "Docker Compose", "Registres de conteneurs", "Builds multi-étapes"],
    },
    {
      category: "Orchestration",
      icon: "☸️",
      items: ["Kubernetes", "kubectl", "Helm Charts", "Namespaces & RBAC"],
    },
    {
      category: "CI/CD",
      icon: "⚙️",
      items: ["GitHub Actions", "GitLab CI", "Conception de pipelines", "Tests automatisés"],
    },
    {
      category: "Infrastructure",
      icon: "🖥️",
      items: ["Linux (Ubuntu/Debian)", "Scripts Bash", "Git & GitFlow", "Windows Server"],
    },
    {
      category: "Cloud",
      icon: "☁️",
      items: ["Azure", "AWS", "Google Cloud"],
    },
  ];

  const projects = [
    {
      title: "Déploiement d'un cluster K8s",
      description:
        "Provisionnement automatisé d'un cluster Kubernetes local avec kubeadm et déploiements gérés par Helm. Mise en place de politiques RBAC, quotas de ressources et liveness probes.",
      tags: ["Kubernetes", "Helm", "YAML", "RBAC"],
      status: "Terminé",
      link: "#",
    },
    {
      title: "Pipeline CI/CD — App Node.js",
      description:
        "Pipeline GitHub Actions complet : lint → test → build Docker → push sur GHCR → déploiement en staging. Secrets gérés via GitHub Environments.",
      tags: ["GitHub Actions", "Docker", "Node.js", "GHCR"],
      status: "Terminé",
      link: "#",
    },
    {
      title: "Stack Microservices Dockerisée",
      description:
        "Application multi-conteneurs avec Docker Compose : frontend React, API Express, PostgreSQL et Redis. Configuration adaptée par environnement via des fichiers .env.",
      tags: ["Docker Compose", "PostgreSQL", "Redis", "Nginx"],
      status: "En cours",
      link: "#",
    },
  ];

  return (
    <div className="portfolio-root">
      {/* ── Nav ── */}
      <header className="nav">
        <div className="nav-inner">
          <span className="nav-logo">
            <span className="logo-bracket">[</span>AA<span className="logo-bracket">]</span>
          </span>
          <nav className="nav-links">
            {nav.map((n) => (
              <a
                key={n}
                href={`#${n.toLowerCase().replace(/\s/g, "-").replace(/à/g, "a")}`}
                className={`nav-link ${activeSection === n.toLowerCase() ? "active" : ""}`}
                onClick={() => setActiveSection(n.toLowerCase())}
              >
                {n}
              </a>
            ))}
          </nav>
          <a href="#contact" className="nav-cta">
            Me recruter
          </a>
          <button className="nav-burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Ouvrir le menu">
            <span /><span /><span />
          </button>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {nav.map((n) => (
              <a key={n} href={`#${n.toLowerCase().replace(/\s/g, "-").replace(/à/g, "a")}`} className="mobile-link" onClick={() => setMenuOpen(false)}>
                {n}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" />
            Disponible pour un stage
          </div>
          <h1 className="hero-name">Auguste-Alain</h1>
          <p className="hero-title">
            Ingénieur <span className="accent">DevOps</span> Junior
          </p>
          <p className="hero-sub">
            Construction de pipelines fiables, conteneurisation d'applications,<br />
            et apprentissage quotidien dans l'univers cloud-native.
          </p>
          <div className="hero-actions">
            <a href="#projets" className="btn-primary">Voir les projets</a>
            <a href="#contact" className="btn-secondary">Me contacter</a>
          </div>
        </div>
        <div className="hero-terminal" ref={terminalRef}>
          <div className="terminal-bar">
            <span className="t-dot red" /><span className="t-dot yellow" /><span className="t-dot green" />
            <span className="t-title">~/ terminal</span>
          </div>
          <div className="terminal-body">
            {terminalLines.filter(Boolean).map((line, i) => (
              <div key={i} className={`t-line ${line.startsWith("$") ? "t-cmd" : "t-out"}`}>
                {line}
              </div>
            ))}
            <span className="t-cursor" />
          </div>
        </div>
      </section>

      <section id="about" className="section a propos">
        <div className="section-inner">
          <p className="section-label">/ à propos</p>
          <h2 className="section-title">Qui suis-je</h2>
          <div className="about-grid">
            <div className="about-text">
              <p>
                Je suis un ingénieur DevOps junior passionné par l'automatisation, l'infrastructure
                as code et la construction de pipelines de livraison efficaces. Je m'épanouis à
                l'intersection du développement et des opérations — pour aider les équipes à livrer
                plus vite et plus sereinement.
              </p>
              <p>
                Je recherche actuellement un <strong>stage</strong> où je pourrai mettre en pratique
                mes compétences Docker & Kubernetes, contribuer à de vrais pipelines CI/CD et évoluer
                aux côtés d'ingénieurs expérimentés.
              </p>
              <div className="about-stats">
                {/* 
                <div className="stat">
                  <span className="stat-num">3+</span>
                  <span className="stat-label">Projets réalisés</span>
                </div>
                */}
                <div className="stat">
                  <span className="stat-num">100%</span>
                  <span className="stat-label">Motivé à apprendre</span>
                </div>
                <div className="stat">
                  <span className="stat-num">∞</span>
                  <span className="stat-label">Capacité en café</span>
                </div>
              </div>
            </div>
            <div className="about-card">
              <div className="card-row"><span className="card-key">Poste</span><span>Ingénieur DevOps Junior</span></div>
              <div className="card-row"><span className="card-key">Statut</span><span className="open-badge">Ouvert aux offres</span></div>
              <div className="card-row"><span className="card-key">Localisation</span><span>France 🇫🇷</span></div>
              <div className="card-row"><span className="card-key">Langues</span><span>Français · Anglais</span></div>
              <div className="card-row"><span className="card-key">Disponibilité</span><span>Immédiate</span></div>
              <a href="/cv-auguste-alain.pdf" className="btn-primary" target="_blank" style={{marginTop: "1.5rem", display: "block", textAlign: "center" }}>
                Télécharger le CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Compétences ── */}
      <section id="competences" className="section skills">
        <div className="section-inner">
          <p className="section-label">/ compétences</p>
          <h2 className="section-title">Boîte à outils technique</h2>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.category} className="skill-card">
                <div className="skill-icon">{s.icon}</div>
                <h3 className="skill-cat">{s.category}</h3>
                <ul className="skill-list">
                  {s.items.map((item) => (
                    <li key={item}><span className="skill-dot" />{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="tools-strip">
            <p className="tools-label">À l'aise également avec</p>
            <div className="tools-row">
              {["Python", "YAML", "JSON", "Prometheus", "Grafana", "Terraform basics", "AWS basics", "VS Code"].map((t) => (
                <span key={t} className="tool-pill">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Projets ── 
      <section id="projets" className="section projects">
        <div className="section-inner">
          <p className="section-label">/ projets</p>
          <h2 className="section-title">Ce que j'ai construit</h2>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.title} className="project-card">
                <div className="project-top">
                  <h3 className="project-title">{p.title}</h3>
                  <span className={`project-status ${p.status === "Terminé" ? "done" : "wip"}`}>
                    {p.status}
                  </span>
                </div>
                <p className="project-desc">{p.description}</p>
                <div className="project-tags">
                  {p.tags.map((t) => (
                    <span key={t} className="project-tag">{t}</span>
                  ))}
                </div>
                <a href={p.link} className="project-link">
                  Voir sur GitHub →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
*/}
      {/* ── Contact ── */}
      <section id="contact" className="section contact">
        <div className="section-inner contact-inner">
          <p className="section-label">/ contact</p>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="contact-sub">
            Je recherche activement un stage DevOps. Que vous ayez un poste ouvert,
            un projet freelance ou simplement envie d'échanger — ma boîte mail est ouverte.
          </p>
          <div className="contact-links">
            <a href="mailto:augustealain.luyedisa@gmail.com" className="contact-item">
              <span className="contact-icon">✉</span>
              <span>augustealain.luyedisa@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/auguste-alain-luyedisa-masamuna/" target="_blank" rel="noreferrer" className="contact-item">
              <span className="contact-icon">in</span>
              <span>linkedin.com/in/auguste-alain-luyedisa-masamuna/</span>
            </a>
            <a href="https://github.com/Vanakam20" target="_blank" rel="noreferrer" className="contact-item">
              <span className="contact-icon">◊</span>
              <span>github.com/Vanakam20</span>
            </a>
          </div>
          <a href="mailto:augustealain.luyedisa@gmail.com" className="btn-primary contact-cta">
            M'envoyer un message
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <span>Créé par Auguste-Alain · {new Date().getFullYear()}</span>
        <span className="footer-stack">Next.js · TypeScript · CSS</span>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Sora:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #f8f8f6;
          --bg2: #ffffff;
          --fg: #111110;
          --fg2: #4a4a46;
          --fg3: #8a8a84;
          --accent: #1a6cf0;
          --accent-light: #e8f0fd;
          --border: rgba(0,0,0,0.09);
          --mono: 'IBM Plex Mono', monospace;
          --sans: 'Sora', sans-serif;
          --radius: 10px;
          --radius-lg: 16px;
        }

        @media (prefers-color-scheme: dark) {
          :root {
            --bg: #0e0e0c;
            --bg2: #161614;
            --fg: #f0f0ec;
            --fg2: #a8a8a2;
            --fg3: #5a5a54;
            --accent: #4a8fff;
            --accent-light: #0d1f3c;
            --border: rgba(255,255,255,0.08);
          }
        }

        html { scroll-behavior: smooth; }

        body, .portfolio-root {
          font-family: var(--sans);
          background: var(--bg);
          color: var(--fg);
          line-height: 1.6;
        }

        /* NAV */
        .nav {
          position: sticky; top: 0; z-index: 100;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          backdrop-filter: blur(12px);
        }
        .nav-inner {
          max-width: 1120px; margin: 0 auto;
          padding: 0 2rem;
          height: 60px;
          display: flex; align-items: center; gap: 2rem;
        }
        .nav-logo {
          font-family: var(--mono); font-size: 1.1rem; font-weight: 500;
          letter-spacing: -0.02em;
        }
        .logo-bracket { color: var(--accent); }
        .nav-links { display: flex; gap: 0.25rem; margin-left: auto; }
        .nav-link {
          font-size: 0.875rem; padding: 0.4rem 0.75rem;
          border-radius: var(--radius); color: var(--fg2);
          text-decoration: none; transition: color 0.15s, background 0.15s;
        }
        .nav-link:hover, .nav-link.active { color: var(--fg); background: var(--border); }
        .nav-cta {
          font-size: 0.875rem; font-weight: 500;
          padding: 0.4rem 1rem;
          background: var(--accent); color: #fff;
          border-radius: var(--radius); text-decoration: none;
          transition: opacity 0.15s;
        }
        .nav-cta:hover { opacity: 0.88; }
        .nav-burger {
          display: none; flex-direction: column; gap: 5px;
          background: none; border: none; cursor: pointer; padding: 6px;
        }
        .nav-burger span { display: block; width: 22px; height: 2px; background: var(--fg); border-radius: 2px; }
        .mobile-menu {
          display: flex; flex-direction: column;
          padding: 0.75rem 2rem 1rem;
          border-top: 1px solid var(--border);
          background: var(--bg);
        }
        .mobile-link {
          padding: 0.6rem 0; font-size: 1rem; color: var(--fg);
          text-decoration: none; border-bottom: 1px solid var(--border);
        }

        /* BUTTONS */
        .btn-primary {
          display: inline-block;
          padding: 0.65rem 1.4rem;
          background: var(--accent); color: #fff;
          border-radius: var(--radius); font-weight: 500; font-size: 0.9rem;
          text-decoration: none; transition: opacity 0.15s;
        }
        .btn-primary:hover { opacity: 0.88; }
        .btn-secondary {
          display: inline-block;
          padding: 0.65rem 1.4rem;
          border: 1.5px solid var(--border); color: var(--fg);
          border-radius: var(--radius); font-weight: 500; font-size: 0.9rem;
          text-decoration: none; transition: background 0.15s;
        }
        .btn-secondary:hover { background: var(--border); }

        /* HERO */
        .hero {
          max-width: 1120px; margin: 0 auto;
          padding: 5rem 2rem 4rem;
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 3rem; align-items: center;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.8rem; color: var(--fg2);
          border: 1px solid var(--border);
          padding: 0.3rem 0.85rem; border-radius: 999px;
          margin-bottom: 1.5rem; background: var(--bg2);
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.2);
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 3px rgba(34,197,94,0.2); }
          50% { box-shadow: 0 0 0 6px rgba(34,197,94,0.05); }
        }
        .hero-name {
          font-size: clamp(2.4rem, 5vw, 3.8rem);
          font-weight: 600; line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .hero-title {
          font-size: 1.25rem; font-weight: 400; color: var(--fg2);
          margin: 0.4rem 0 1rem;
        }
        .accent { color: var(--accent); font-weight: 600; }
        .hero-sub {
          color: var(--fg2); font-size: 0.95rem; line-height: 1.7;
          margin-bottom: 2rem;
        }
        .hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

        /* TERMINAL */
        .hero-terminal {
          background: #0d1117;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18);
        }
        .terminal-bar {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          background: #161b22;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .t-dot { width: 12px; height: 12px; border-radius: 50%; }
        .t-dot.red { background: #ff5f57; }
        .t-dot.yellow { background: #febc2e; }
        .t-dot.green { background: #28c840; }
        .t-title { font-family: var(--mono); font-size: 0.75rem; color: #6e7681; margin-left: 8px; }
        .terminal-body {
          padding: 1.25rem; font-family: var(--mono); font-size: 0.82rem;
          line-height: 1.8; min-height: 200px;
          overflow-y: auto;
        }
        .t-cmd { color: #79c0ff; }
        .t-out { color: #8b949e; }
        .t-cursor {
          display: inline-block; width: 8px; height: 14px;
          background: #79c0ff; vertical-align: middle;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* SECTIONS */
        .section { padding: 5rem 0; }
        .section:nth-child(even) { background: var(--bg2); }
        .section-inner { max-width: 1120px; margin: 0 auto; padding: 0 2rem; }
        .section-label {
          font-family: var(--mono); font-size: 0.78rem;
          color: var(--accent); letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }
        .section-title {
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          font-weight: 600; letter-spacing: -0.025em;
          margin-bottom: 2.5rem;
        }

        /* ABOUT */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; align-items: start; }
        .about-text p { color: var(--fg2); margin-bottom: 1rem; line-height: 1.8; }
        .about-text strong { color: var(--fg); font-weight: 600; }
        .about-stats { display: flex; gap: 2rem; margin-top: 2rem; }
        .stat { display: flex; flex-direction: column; }
        .stat-num { font-size: 1.8rem; font-weight: 600; letter-spacing: -0.04em; color: var(--fg); }
        .stat-label { font-size: 0.78rem; color: var(--fg3); margin-top: 2px; }
        .about-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
        }
        .card-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 0.65rem 0; border-bottom: 1px solid var(--border);
          font-size: 0.88rem;
        }
        .card-row:last-of-type { border-bottom: none; }
        .card-key { color: var(--fg3); }
        .open-badge {
          background: rgba(34,197,94,0.1); color: #16a34a;
          padding: 0.2rem 0.65rem; border-radius: 999px;
          font-size: 0.78rem; font-weight: 500;
        }

        /* SKILLS */
        .skills-grid {
          display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 1.25rem; margin-bottom: 3rem;
        }
        .skill-card {
          background: var(--bg);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          transition: border-color 0.2s;
        }
        .skill-card:hover { border-color: var(--accent); }
        .skill-icon { font-size: 1.8rem; margin-bottom: 0.75rem; }
        .skill-cat { font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem; }
        .skill-list { list-style: none; display: flex; flex-direction: column; gap: 0.5rem; }
        .skill-list li { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; color: var(--fg2); }
        .skill-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
        .tools-strip { }
        .tools-label { font-size: 0.8rem; color: var(--fg3); margin-bottom: 1rem; font-family: var(--mono); }
        .tools-row { display: flex; flex-wrap: wrap; gap: 0.6rem; }
        .tool-pill {
          font-size: 0.8rem; padding: 0.3rem 0.75rem;
          border: 1px solid var(--border); border-radius: 999px;
          color: var(--fg2); background: var(--bg2);
        }

        /* PROJECTS */
        .projects-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
        .project-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 1.75rem;
          display: flex; flex-direction: column; gap: 1rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .project-card:hover { border-color: var(--accent); transform: translateY(-3px); }
        .project-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; }
        .project-title { font-size: 1rem; font-weight: 600; }
        .project-status {
          font-size: 0.72rem; font-weight: 500; padding: 0.2rem 0.6rem;
          border-radius: 999px; white-space: nowrap; flex-shrink: 0;
        }
        .project-status.done { background: rgba(34,197,94,0.1); color: #16a34a; }
        .project-status.wip { background: rgba(245,158,11,0.1); color: #d97706; }
        .project-desc { font-size: 0.875rem; color: var(--fg2); line-height: 1.7; }
        .project-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .project-tag {
          font-family: var(--mono); font-size: 0.72rem;
          padding: 0.2rem 0.55rem; background: var(--accent-light);
          color: var(--accent); border-radius: 6px;
        }
        .project-link {
          font-size: 0.83rem; color: var(--accent); text-decoration: none;
          font-weight: 500; margin-top: auto;
          transition: letter-spacing 0.15s;
        }
        .project-link:hover { letter-spacing: 0.03em; }

        /* CONTACT */
        .contact-inner { max-width: 680px; }
        .contact-sub { color: var(--fg2); margin-bottom: 2.5rem; line-height: 1.8; font-size: 1rem; }
        .contact-links { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .contact-item {
          display: flex; align-items: center; gap: 1rem;
          text-decoration: none; color: var(--fg);
          padding: 0.9rem 1.25rem;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          font-size: 0.9rem;
          transition: border-color 0.15s, background 0.15s;
        }
        .contact-item:hover { border-color: var(--accent); background: var(--accent-light); }
        .contact-icon {
          width: 36px; height: 36px;
          background: var(--accent-light); color: var(--accent);
          border-radius: var(--radius); display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem; font-weight: 700; flex-shrink: 0;
        }
        .contact-cta { font-size: 1rem; padding: 0.8rem 2rem; }

        /* FOOTER */
        .footer {
          display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;
          padding: 1.5rem 2rem;
          border-top: 1px solid var(--border);
          font-size: 0.78rem; color: var(--fg3);
          font-family: var(--mono);
          max-width: 1120px; margin: 0 auto;
        }

        /* RESPONSIVE */
        @media (max-width: 768px) {
          .hero { grid-template-columns: 1fr; padding: 3rem 1.25rem 2rem; }
          .hero-terminal { display: none; }
          .about-grid { grid-template-columns: 1fr; }
          .nav-links, .nav-cta { display: none; }
          .nav-burger { display: flex; margin-left: auto; }
          .section { padding: 3rem 0; }
          .section-inner { padding: 0 1.25rem; }
          .about-stats { gap: 1.25rem; }
          .footer { padding: 1.25rem; }
        }
      `}</style>
    </div>
  );
}
