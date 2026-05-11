'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [projects, setProjects] = useState<any[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);

  const [cert, setCert] = useState<any[]>([]);
  const [certLoading, setCertLoading] = useState(true);

  const { scrollY } = useScroll();
  const glowY = useTransform(scrollY, [0, 1000], [0, 300]);
  const gridY = useTransform(scrollY, [0, 1000], [0, 100]);
  // const [activeSection, setActiveSection] = useState("");

    function SkeletonCard() {
    return (
      <div className="p-6 border border-gray-800 rounded-2xl bg-black/40 animate-pulse">
        <div className="h-5 bg-gray-700 rounded w-2/3 mb-4" />
        <div className="h-3 bg-gray-800 rounded w-full mb-2" />
        <div className="h-3 bg-gray-800 rounded w-5/6" />
      </div>
    );
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);

    async function fetchProjects() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`);
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Error fetching projects", err);
      } finally {
        setProjectsLoading(false); // 👈 add this
      }
    }
    fetchProjects();

    async function fetchCert() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/certificates`);
        const data = await res.json();
        setCert(data);
      } catch (err) {
        console.error("Error fetching projects", err);
      }finally {
        setCertLoading(false); // 👈 add this
      }
    }
    fetchCert();

    // const projectsSection = document.getElementById("projects");
    // const observer = new IntersectionObserver(
    //   ([entry]) => {
    //     if (entry.isIntersecting) {
    //       setActiveSection("projects");
    //     } else {
    //       setActiveSection("");
    //     }
    //   },
    //   {
    //     threshold: 0.4,
    //   }
    // );

    // if (projectsSection) {
    //   observer.observe(projectsSection);
    // }

    return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        // observer.disconnect();
      };
      }, []);

  return  (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
          {/* Glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background: `radial-gradient(600px at ${position.x}px ${position.y}px, rgba(59,130,246,0.15), transparent 80%)`,
        }}
      />


        {/* Floating Grid Background */}
        <motion.div
          style={{ y: gridY }}
          className="
          fixed
          inset-0
          z-0
          pointer-events-none
          "
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(59,130,246,0.08) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59,130,246,0.08) 1px, transparent 1px)
              `,
              backgroundSize: "40px 40px",
            }}
          />
        </motion.div>

        {/* Ambient Scroll Glow */}
        <motion.div
          style={{ y: glowY }}
          className="
          fixed
          inset-0
          -z-10
          pointer-events-none
          bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.15),transparent_40%)]
          "
        />


    {/* NAVBAR */}
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold">Shekhar.dev</h1>

        <div className="flex gap-6 text-gray-400">
          <a href="#projects" className="hover:text-white">
            Projects
          </a>
          <a href="/about" className="hover:text-white">About</a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
          </div>
      </nav>
        
    {/* HERO */}
       <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20"
        >
          <h1 className="text-5xl font-bold leading-tight">
            Hi, I'm <span className="text-blue-500">Shekhar</span>
          </h1>
          <p className="mt-6 text-lg text-gray-400">
            I design and build scalable systems, backend architectures, and intelligent
            applications. My work includes distributed systems, automation platforms, low-level computing,
            AI-assisted systems, and experimental projects spanning from system
            simulations to quantum computing exploration.        
          </p>
          <div className="mt-8 flex gap-4">
            <a
              href="/contact"
              className="
              px-6 py-2
              bg-blue-500
              rounded-lg
              transition
              transform
              hover:scale-105
              hover:bg-blue-600
              "
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Software Engineering • Development Workflows • Collaboration
          </p>
        </motion.section>

    {/* WHAT I WORK WITH */}
        <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-3xl font-semibold">Systems I Work With</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">Distributed Systems</h3>
              <p className="text-gray-400 mt-2">
                Task queues, caching, concurrency control, and system design.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">Backend Engineering</h3>
              <p className="text-gray-400 mt-2">
                APIs, databases, authentication, and performance optimization.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">Low-Level Systems</h3>
              <p className="text-gray-400 mt-2">
                CPU simulation, memory models, and system-level programming.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold">AI & Automation</h3>
              <p className="text-gray-400 mt-2">
                Intelligent agents, bots, and automation pipelines.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
              <h3 className="text-xl font-semibold"> Algorithms & Systems Theory</h3>
              <p className="text-gray-400 mt-2">
                Studying data structures, operating systems, DBMS,
                concurrency control, and performance-oriented computation.
              </p>
            </div>

            <div className="p-6 border border-gray-800 rounded-xl hover:border-gray-600 transition bg-black/40 backdrop-blur-sm">
                <h3 className="text-xl font-semibold"> Quantum & Experimental Computing</h3>
                <p className="text-gray-400 mt-2">
                  Exploring quantum computing concepts, computational theory,
                  advanced physics, and experimental system models.
                </p>
            </div>
          </div>
        </motion.section>

    {/* EXPERIENCE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20"
        >
        <h2 className="text-3xl font-semibold">Experience</h2>
        <div className="grid md:grid-cols-2 gap-6 mt-8"></div>
        <div className="p-6 border border-gray-800 rounded-2xl transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:-translate-y-1 bg-black/40">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-semibold">Intern — Mercedes-Benz Research & Development India</h3>
              <p className="text-gray-400 mt-1">Sept 2022 — Feb 2023</p>
            </div>
          </div>
          <p className="text-gray-400 mt-6 leading-relaxed">
            Worked in a professional engineering environment,
            gaining exposure to software development workflows,
            collaborative systems, and enterprise-scale development practices.
          </p>
        </div>
      </motion.section>


    {/* PROJECTS */}
        <motion.section
          id="projects"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-3xl font-semibold">Projects</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {projectsLoading ? (
                [1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)
              ) : projects.length === 0 ? (
                <p className="text-gray-500 col-span-2">No projects found.</p>
              ) : (
              projects.map((p) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-6 border border-gray-800 rounded-2xl transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:-translate-y-1 bg-black/40"
              key={p.id}
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-400 mt-2">
                {p.description}
              </p>
              <a href={p.github_url} className="text-blue-500 mt-3 inline-block">
                View Repo →
              </a>
              <p className="text-gray-400 mt-2">
                {p.tech_stack}
              </p>
            </motion.div>
            )))}
          </div>
        </motion.section>
        
          {/* CREDENTIALS */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mt-20"
        >
          <h2 className="text-3xl font-semibold">Credentials</h2>
          <p className="text-gray-400 mt-4">
            Certifications, technical achievements, and continuous learning.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            {certLoading ? (
                [1, 2].map((i) => <SkeletonCard key={i} />)
              ) : cert.length === 0 ? (
                <p className="text-gray-500 col-span-2">No credentials found.</p>
              ) : (
             cert.map((p) => (
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="p-6 border border-gray-800 rounded-2xl transition-all duration-300 hover:border-blue-500 hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:-translate-y-1 bg-black/40"
              key={p.id}
            >
            <div className="flex items-start gap-4">
              <img
                src={p.badge_image}
                alt="IMG"
                className="w-14 h-14 object-contain"
              />
              <div>
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="text-gray-400 mt-2">
                {p.issuer}
              </p>
              <p className="text-gray-400 mt-2">
                {p.issue_date}
              </p>
              </div>
              </div>
                <a href={p.credential_url} className="text-blue-500 mt-3 inline-block">
                View Credential →
              </a>
            </motion.div>
            )))}
          </div>
        </motion.section>

    {/* FOOTER */}
        <footer className="max-w-5xl mx-auto mt-40 border-t border-gray-900 py-10 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left */}
            <div>
              <p className="text-gray-400">Built by <span className="text-white">Shekhar Kumar</span></p>
              <p className="mt-2">
                Exploring Quantum Computing, backend engineering,
                distributed architectures, and intelligent applications.
              </p>
            </div>
            {/* Right */}
            <div className="flex gap-6">
              <a
                href="https://github.com/Zeno0"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                GitHub
              </a>
              {/* <a
                href="#"
                className="hover:text-white transition"
              >
                LinkedIn
              </a> */}
              <a
                href="mailto:zenobell143@gmail.com?subject=Portfolio Inquiry"
                className="hover:text-white transition"
              >
                Email
              </a>
            </div>
          </div>

        </footer>


    </main>
  );
}