'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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


    {/* NAVBAR */}
      <nav className="flex justify-between items-center max-w-5xl mx-auto">
        <h1 className="text-xl font-semibold">Shekhar.dev</h1>

        <div className="flex gap-6 text-gray-400">
          <a href="#" className="hover:text-white">Projects</a>
          <a href="#" className="hover:text-white">About</a>
          <a href="#" className="hover:text-white">Contact</a>
        </div>
      </nav>


      {/* HERO */}
       <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20">

        <h1 className="text-5xl font-bold leading-tight">
          Hi, I'm <span className="text-blue-500">Shekhar</span>
        </h1>
        <p className="mt-6 text-lg text-gray-400">
          I build systems, backend architectures, and intelligent applications.
        </p>


        <div className="mt-8 flex gap-4">
          <button className="px-6 py-2 bg-blue-500 rounded-lg transition transform hover:scale-105 hover:bg-blue-600">
            View Projects
          </button>
          <button className="px-6 py-2 border border-gray-600 rounded-lg hover:border-white">
            Contact
          </button>
        </div>


      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20">
  <h2 className="text-3xl font-semibold">Projects</h2>
  <div className="grid md:grid-cols-2 gap-6 mt-8">
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 border border-gray-800 rounded-xl transition">
      <h3 className="text-xl font-semibold">Portfolio v2</h3>
      <p className="text-gray-400 mt-2">
        Full-stack portfolio with API and database integration.
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 border border-gray-800 rounded-xl transition">
      <h3 className="text-xl font-semibold">Git Clone System</h3>
      <p className="text-gray-400 mt-2">
        Custom version control system implementation.
      </p>
    </motion.div>

  </div>
 </motion.section>

    </main>
  );
}