import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "chevron"
  | "code"
  | "download"
  | "github"
  | "linkedin"
  | "mail"
  | "menu"
  | "moon"
  | "sun"
  | "x";

const iconPaths: Record<IconName, React.ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  chevron: <><path d="m9 18 6-6-6-6" /></>,
  code: <><path d="m8 9-3 3 3 3M16 9l3 3-3 3M14 5l-4 14" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></>,
  github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5-.1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4m-3-3c-3 .9-3-1.5-4-2" /></>,
  linkedin: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" /></>,
  x: <><path d="M18 6 6 18M6 6l12 12" /></>,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return (
    <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      {iconPaths[name]}
    </svg>
  );
}

const navLinks = [
  ["Inicio", "inicio"],
  ["Sobre mí", "sobre-mi"],
  ["Proyectos", "proyectos"],
  ["Habilidades", "habilidades"],
  ["Experiencia", "experiencia"],
  ["Contacto", "contacto"],
];

const projects = [
  {
    title: "Nexus Finance",
    description: "Plataforma financiera en tiempo real para equipos modernos.",
    category: "Web",
    tags: ["React", "TypeScript", "Node.js"],
    theme: "nexus",
    index: "01",
  },
  {
    title: "Pulse Health",
    description: "Experiencia móvil para cuidar hábitos y bienestar diario.",
    category: "Móvil",
    tags: ["React Native", "Firebase", "Figma"],
    theme: "pulse",
    index: "02",
  },
  {
    title: "Atlas API",
    description: "Arquitectura distribuida, observable y lista para escalar.",
    category: "Backend",
    tags: ["Go", "PostgreSQL", "Docker"],
    theme: "atlas",
    index: "03",
  },
  {
    title: "Clarity AI",
    description: "Analítica predictiva que convierte datos en decisiones.",
    category: "IA/Datos",
    tags: ["Python", "FastAPI", "TensorFlow"],
    theme: "clarity",
    index: "04",
  },
];

const logo = (path: string) => `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/${path}.svg`;

const skillGroups = [
  { title: "Lenguajes", skills: [[logo("typescript/typescript-original"), "TypeScript"], [logo("python/python-original"), "Python"], [logo("go/go-original-wordmark"), "Go"], [logo("javascript/javascript-original"), "JavaScript"]] },
  { title: "Frameworks", skills: [[logo("react/react-original"), "React"], [logo("nextjs/nextjs-original"), "Next.js"], [logo("nodejs/nodejs-original"), "Node.js"], [logo("fastapi/fastapi-original"), "FastAPI"]] },
  { title: "Datos & Cloud", skills: [[logo("postgresql/postgresql-original"), "PostgreSQL"], [logo("redis/redis-original"), "Redis"], [logo("amazonwebservices/amazonwebservices-original-wordmark"), "AWS"], [logo("docker/docker-original"), "Docker"]] },
  { title: "Herramientas", skills: [[logo("git/git-original"), "Git"], [logo("figma/figma-original"), "Figma"], [logo("linux/linux-original"), "Linux"], [logo("grafana/grafana-original"), "Grafana"]] },
];

const timeline = [
  {
    date: "2023 — Actualidad",
    role: "Senior Full Stack Engineer",
    company: "Nova Digital",
    text: "Lidero el desarrollo de productos digitales utilizados por más de 50 mil personas y acompaño a un equipo de 5 ingenieros.",
  },
  {
    date: "2021 — 2023",
    role: "Software Engineer",
    company: "Cloud Systems",
    text: "Construí servicios cloud que redujeron los tiempos de respuesta un 42% y mejoraron la estabilidad de la plataforma.",
  },
  {
    date: "2017 — 2021",
    role: "Ingeniería de Sistemas",
    company: "Universidad Tecnológica",
    text: "Formación en arquitectura de software, sistemas distribuidos, algoritmos y ciencia de datos.",
  },
];

function SectionHeading({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="section-heading reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function ProjectVisual({ theme }: { theme: string }) {
  return (
    <div className={`project-visual ${theme}`} aria-hidden="true">
      <div className="mock-window">
        <div className="mock-top"><i /><i /><i /></div>
        {theme === "nexus" && (
          <div className="dashboard">
            <div className="dash-side"><b>N</b><span /><span /><span /><span /></div>
            <div className="dash-content"><small>Balance total</small><strong>$84,290.00</strong><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /></div></div>
          </div>
        )}
        {theme === "pulse" && (
          <div className="phone"><div className="notch" /><small>Hoy</small><strong>Tu energía</strong><div className="pulse-ring">82<sup>%</sup></div><span>Excelente progreso</span></div>
        )}
        {theme === "atlas" && (
          <div className="api-screen"><small>atlas / production</small><strong>All systems operational</strong>{["gateway", "authentication", "database", "workers"].map((x) => <div key={x}><span>{x}</span><i>healthy</i></div>)}</div>
        )}
        {theme === "clarity" && (
          <div className="data-screen"><small>Clarity / Insights</small><strong>+28.4%</strong><span>Prediction accuracy</span><div className="data-chart"><i /><i /><i /><i /><i /><i /></div></div>
        )}
      </div>
    </div>
  );
}

function Terminal() {
  const [history, setHistory] = useState(["Bienvenido. Escribe “help” para explorar."]);
  const [command, setCommand] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const responses: Record<string, string> = {
    help: "Comandos: about · skills · projects · contact · clear",
    about: "Soy un Ingeniero de Sistemas que convierte problemas complejos en productos simples.",
    skills: "TypeScript, React, Node.js, Python, Go, PostgreSQL, AWS y Docker.",
    projects: "He construido productos fintech, healthtech, APIs distribuidas y sistemas de IA.",
    contact: "Escríbeme a hola@tunombre.dev — construyamos algo extraordinario.",
  };

  const run = (event: FormEvent) => {
    event.preventDefault();
    const clean = command.trim().toLowerCase();
    if (!clean) return;
    if (clean === "clear") setHistory([]);
    else setHistory((items) => [...items, `visitor ~ % ${clean}`, responses[clean] || `Comando no encontrado: ${clean}. Prueba “help”.`]);
    setCommand("");
  };

  return (
    <div className="terminal reveal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal-bar"><div className="traffic"><i /><i /><i /></div><span>visitor — zsh</span><span /></div>
      <div className="terminal-body">
        {history.map((line, index) => <div className={line.startsWith("visitor") ? "command-line" : ""} key={`${line}-${index}`}>{line}</div>)}
        <form onSubmit={run}>
          <label htmlFor="terminal-command">visitor ~ %</label>
          <input ref={inputRef} id="terminal-command" value={command} onChange={(event) => setCommand(event.target.value)} autoComplete="off" spellCheck={false} aria-label="Comando de terminal" />
          <span className="cursor" />
        </form>
      </div>
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches));
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [sent, setSent] = useState(false);
  const [typedText, setTypedText] = useState("");
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const text = "software con propósito.";
    let index = 0;
    const timer = window.setInterval(() => {
      setTypedText(text.slice(0, index + 1));
      index += 1;
      if (index === text.length) window.clearInterval(timer);
    }, 72);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  const moveGlow = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <main>
      <nav className="nav-shell" aria-label="Navegación principal">
        <div className="nav-inner">
          <button className="logo" onClick={() => scrollTo("inicio")} aria-label="Ir al inicio">JS<span>.</span></button>
          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            {navLinks.map(([label, id]) => <button key={id} onClick={() => scrollTo(id)}>{label}</button>)}
          </div>
          <div className="nav-actions">
            <button className="icon-button" onClick={() => setDark(!dark)} aria-label={dark ? "Activar modo claro" : "Activar modo oscuro"}><Icon name={dark ? "sun" : "moon"} /></button>
            <button className="icon-button mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú"><Icon name={menuOpen ? "x" : "menu"} /></button>
          </div>
        </div>
      </nav>

      <section id="inicio" className="hero" ref={heroRef} onMouseMove={moveGlow}>
        <div className="hero-glow" />
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <div className="available reveal"><i /> Disponible para nuevos retos</div>
          <h1 className="reveal">Construyo software que resuelve <span>problemas reales.</span></h1>
          <p className="hero-subtitle reveal">Ingeniero de Sistemas · Full Stack & Cloud</p>
          <div className="hero-actions reveal">
            <button className="primary-button" onClick={() => scrollTo("proyectos")}>Ver proyectos <Icon name="arrow" /></button>
            <a className="secondary-button" href="/cv-jose-salcedo.pdf" download>Descargar CV <Icon name="download" size={18} /></a>
          </div>
          <div className="type-line reveal"><span>~/jose-salcedo</span><b> $ </b><span>creando {typedText}</span><i /></div>
        </div>
        <button className="scroll-cue" onClick={() => scrollTo("sobre-mi")} aria-label="Bajar a sobre mí"><span>Descubre más</span><Icon name="chevron" /></button>
      </section>

      <section id="sobre-mi" className="section about">
        <div className="container">
          <SectionHeading eyebrow="Sobre mí" title="Tecnología con criterio. Código con intención." />
          <div className="about-grid">
            <div className="portrait-wrap reveal">
              <img src="https://images.unsplash.com/photo-1767175620484-1ed37931a0d1?crop=faces&fit=crop&fm=jpg&q=85&w=1000&h=1200" alt="Retrato profesional de Jose Salcedo" />
              <span>Basado en Colombia<br />Trabajando globalmente</span>
            </div>
            <div className="about-copy reveal">
              <p>Soy un ingeniero que disfruta transformar ideas complejas en experiencias digitales simples, rápidas y humanas.</p>
              <p className="muted">Trabajo en la intersección entre diseño, tecnología y negocio para crear productos que no solo funcionan: se sienten bien.</p>
              <div className="stats">
                <div><strong>15<span>+</span></strong><small>Proyectos<br />completados</small></div>
                <div><strong>3<span>+</span></strong><small>Años de<br />experiencia</small></div>
                <div><strong>10<span>+</span></strong><small>Tecnologías<br />dominadas</small></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proyectos" className="section projects-section">
        <div className="container">
          <SectionHeading eyebrow="Trabajo seleccionado" title="Productos que dejan huella." text="Una selección de sistemas que combinan ingeniería sólida, diseño preciso e impacto medible." />
          <div className="filters reveal" role="group" aria-label="Filtrar proyectos">
            {["Todos", "Web", "Móvil", "Backend", "IA/Datos"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}
          </div>
          <div className="projects-grid">
            {projects.filter((project) => filter === "Todos" || project.category === filter).map((project) => (
              <article className="project-card reveal" key={project.title}>
                <ProjectVisual theme={project.theme} />
                <div className="project-info">
                  <div><span className="project-index">{project.index} — {project.category}</span><h3>{project.title}</h3><p>{project.description}</p></div>
                  <div className="project-bottom">
                    <div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <div className="project-links"><a href="#contacto">Demo <Icon name="arrow" size={16} /></a><a href="https://github.com/" target="_blank" rel="noreferrer"><Icon name="github" size={17} /> GitHub</a></div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="habilidades" className="section skills-section">
        <div className="container">
          <SectionHeading eyebrow="Stack tecnológico" title="Herramientas para construir lo que sigue." />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-group reveal" key={group.title}>
                <h3>{group.title}</h3>
                <div>{group.skills.map(([src, name], index) => <span className={`skill skill-${index}`} key={name}><i><img src={src} alt="" className={name === "Next.js" || name === "AWS" ? "logo-mono" : undefined} /></i>{name}</span>)}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experiencia" className="section experience-section">
        <div className="container experience-layout">
          <div className="experience-intro">
            <SectionHeading eyebrow="Trayectoria" title="Aprender. Construir. Evolucionar." text="Cada etapa ha sido una oportunidad para resolver problemas más ambiciosos y crear mejor tecnología." />
          </div>
          <div className="timeline">
            {timeline.map((item, index) => (
              <article className="timeline-item reveal" key={item.date}>
                <div className="timeline-marker"><span>{String(index + 1).padStart(2, "0")}</span></div>
                <div><span className="date">{item.date}</span><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section terminal-section">
        <div className="container">
          <SectionHeading eyebrow="Modo ingeniero" title="Conóceme desde la terminal." text="Una interfaz familiar para quien prefiere conversar con comandos." />
          <Terminal />
        </div>
      </section>

      <section id="contacto" className="section contact-section">
        <div className="container">
          <div className="contact-card reveal">
            <div className="contact-copy">
              <span className="eyebrow">Contacto</span>
              <h2>Hablemos<span>.</span></h2>
              <p>¿Tienes una idea, un reto o simplemente quieres saludar? Mi bandeja siempre está abierta.</p>
              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="arrow" size={16} /></a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn <Icon name="arrow" size={16} /></a>
                <a href="mailto:hola@tunombre.dev"><Icon name="mail" /> hola@tunombre.dev <Icon name="arrow" size={16} /></a>
              </div>
            </div>
            <form className="contact-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
              <label>Nombre<input required placeholder="Tu nombre" /></label>
              <label>Email<input required type="email" placeholder="tu@email.com" /></label>
              <label>Mensaje<textarea required rows={4} placeholder="Cuéntame sobre tu idea..." /></label>
              <button className="primary-button" type="submit">{sent ? "Mensaje enviado" : "Enviar mensaje"} <Icon name="arrow" /></button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-inner"><button className="logo" onClick={() => scrollTo("inicio")}>JS<span>.</span></button><p>© {new Date().getFullYear()} Jose Salcedo. Diseñado y desarrollado con intención.</p><div><a href="https://github.com/" aria-label="GitHub"><Icon name="github" /></a><a href="https://linkedin.com/" aria-label="LinkedIn"><Icon name="linkedin" /></a></div></div>
      </footer>
    </main>
  );
}
