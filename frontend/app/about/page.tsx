export default function AboutPage() {
  const timeline = [
     {
      year: "2021",
      title: "Gurukul Kangari Vishwavidhyala, B.tech - Graduate",
      desc: "Studied core computer science concepts including data structures, operating systems, databases, computer architecture, and software engineering while developing a strong interest in systems, low-level computing, and experimental technology.",
    },
     {
      year: "2022-2023(6 months)",
      title: "Mercedes-Benz R&D Internship",
      desc: "Worked in a professional engineering environment and gained exposure to development workflows, collaboration, and large-scale software systems.",
    },
    
    {
    year: "2024",
    title: "Malaviya National Institute of Technology — M.Tech & Advanced CS Exploration(GATE)",
    desc: "Pursued advanced computer science studies while intensively exploring operating systems, databases, concurrency, distributed systems, algorithms, computer architecture, and system design through academic research, GATE Computer Science preparation, and hands-on engineering experimentation.",
    },
   {
    year: "2025",
    title: "Generative AI, Robotics & Experimental Engineering(QC)",
    desc: "Exploring generative AI, robotics simulation, intelligent automation, and experimental engineering concepts alongside quantum computing, computational theory, and advanced systems-oriented research.",
    },
   {
    year: "2026",
    title: "Systems, Backend & Low-Level Exploration",
    desc: "Expanded into backend engineering, distributed systems, automation pipelines, APIs, databases, CPU simulation, digital electronics, and low-level computing concepts while building experimental engineering projects.",
    },
  ];

  const domains = [
    "Distributed Systems",
    "Backend Engineering",
    "Low-Level Computing",
    "Automation",
    "Robotics Simulation",
    "Databases & Concurrency",
    "System Design",
    "Quantum Computing Exploration",
    "AI-integrated Applications",
    "Experimental Engineering",
  ];

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_35%)] pointer-events-none" />

      {/* Navbar */}
      <nav className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between relative z-10">
        <a href="/" className="text-xl font-semibold tracking-wide hover:text-blue-400 transition">
          Shekhar.dev
        </a>

        <div className="flex gap-6 text-gray-400 text-sm">
          <a href="/#projects" className="hover:text-white transition">
            Projects
          </a>

          <a
              href="https://shekharkumar.artstation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              ArtStation
            </a>

            <a
              href="/contact"
              className="hover:text-white transition"
            >
              Contact
            </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm text-gray-300 mb-8">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Exploring systems & experimental engineering
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-tight max-w-5xl">
          I build systems,
          <br />
          explore internals,
          <br />
          and experiment with ideas.
        </h1>

        <p className="mt-10 text-lg text-gray-400 leading-relaxed max-w-3xl">
          My interests span backend engineering, distributed systems, low-level computing, robotics simulation, automation, AI-integrated applications, experimental computing concepts, and digital art. I enjoy understanding how systems work internally — from APIs and databases to memory models, concurrency, and architecture — while also exploring visual storytelling, atmosphere, and creative design through art and world-building.
        </p>
      </section>

      {/* Philosophy */}
      <section className="max-w-6xl mx-auto px-6 mt-40 relative z-10">
        <div className="grid md:grid-cols-2 gap-10 items-start">

          <div>
            <h2 className="text-3xl font-semibold mb-8">
              Engineering Philosophy
            </h2>

            <div className="space-y-6 text-gray-400 leading-relaxed">
              <p>
                I am deeply curious about how systems behave beneath the surface.
                I enjoy going beyond usage and understanding architecture,
                internals, communication patterns, and computational behavior.
              </p>

              <p>
                Rather than focusing only on frameworks or interfaces,
                I gravitate toward scalable backend systems, distributed workflows,
                automation pipelines, and low-level concepts that shape how software operates.
              </p>

              <p>
                My work often blends engineering with experimentation — exploring
                robotics simulations, intelligent assistants, operating systems,
                CPU architecture, databases, concurrency, and even quantum computing concepts.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {domains.map((domain) => (
              <div
                key={domain}
                className="p-5 rounded-2xl border border-gray-800 bg-white/[0.03] hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-sm text-gray-300">
                  {domain}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-5xl mx-auto px-6 mt-40 relative z-10">
        <h2 className="text-3xl font-semibold mb-16">
          Journey & Exploration
        </h2>

        <div className="relative border-l border-gray-800 ml-4 space-y-16">
          {timeline.map((item) => (
            <div key={item.title} className="relative pl-10">

              <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]" />

              <p className="text-sm text-blue-400 mb-2">
                {item.year}
              </p>

              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="text-gray-400 mt-4 leading-relaxed max-w-3xl">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Current Focus */}
      <section className="max-w-6xl mx-auto px-6 mt-40 relative z-10">
        <div className="p-10 rounded-3xl border border-gray-800 bg-white/[0.03] backdrop-blur-sm">

          <p className="text-blue-400 text-sm tracking-widest uppercase mb-4">
            Current Focus
          </p>

          <h2 className="text-4xl font-bold leading-tight max-w-4xl">
            Building systems that combine
            architecture, automation,
            and intelligent behavior.
          </h2>

          <p className="mt-8 text-gray-400 leading-relaxed max-w-3xl text-lg">
            Currently exploring distributed systems, backend architecture, robotics simulation, automation platforms, intelligent assistants, and experimental engineering concepts — while continuously deepening understanding of system internals and computational theory.
          </p>

          <p className="mt-6 text-gray-400 leading-relaxed max-w-3xl text-lg">
            Beyond engineering, I also create digital art and enjoy visual storytelling, atmospheric design, and creative world-building. If you're interested, you can explore some of my artwork on {" "}
            <a
              href="https://shekharkumar.artstation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition"
            >
              ArtStation
            </a>.
          </p>

          <p className="mt-8 text-gray-400 leading-relaxed max-w-3xl text-lg">
          </p>

        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-20 mt-32 text-gray-500 border-t border-white/5 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <p className="text-white text-lg font-semibold">
              Shekhar.dev
            </p>

            <p className="mt-2 text-sm max-w-xl">
              Systems-focused engineering, experimentation,
              and continuous exploration.
            </p>
          </div>

          <div className="flex gap-6 text-sm flex-wrap">
            <a
              href="https://github.com/Zeno0"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>

            <a
              href="/contact"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </div>

        </div>
      </footer>
    </main>
  );
}
