import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Neon Dreams',
    type: '3D Illustration',
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    color: '#1a1a1a'
  },
  {
    id: 2,
    title: 'Cyber Genesis',
    type: 'Character Design',
    img: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=1000&auto=format&fit=crop',
    color: '#2a2a2a'
  },
  {
    id: 3,
    title: 'Abstract Realities',
    type: 'Environment',
    img: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1000&auto=format&fit=crop',
    color: '#3a3a3a'
  }
];

export default function JackProject() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={containerRef} className="bg-[#0f0f0f] text-gray-200 min-h-screen font-mono selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-center mix-blend-difference">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white hover:text-cyan-400 transition-colors font-bold uppercase tracking-widest text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Hub
        </Link>
        <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">Jack.3D</span>
      </nav>

      {/* Hero Marquee */}
      <header className="pt-40 pb-20 overflow-hidden border-b border-white/5">
        <div className="relative flex flex-col gap-4 whitespace-nowrap opacity-20 transform -rotate-2 scale-110">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter"
          >
            3D ARTIST DIGITAL SCULPTOR VISUAL STORYTELLER 3D ARTIST DIGITAL SCULPTOR 
          </motion.div>
          <motion.div 
            animate={{ x: [-1000, 0] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
            className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter text-transparent stroke-text"
            style={{ WebkitTextStroke: '2px white' }}
          >
            CREATIVE TECHNOLOGIST WORLD BUILDER CREATIVE TECHNOLOGIST WORLD BUILDER
          </motion.div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-8xl font-bold uppercase tracking-tight text-white mb-6 drop-shadow-2xl">
              Jack<br/>Doe
            </h1>
            <p className="text-xl text-cyan-400 font-medium tracking-widest uppercase">
              Selected 3D Works
            </p>
          </motion.div>
        </div>
      </header>

      {/* Sticky Stacking Cards */}
      <main className="py-24 px-6 max-w-5xl mx-auto relative">
        <div className="flex flex-col gap-8 pb-32">
          {projects.map((project, i) => {
            return (
              <div 
                key={project.id}
                className="sticky top-24 h-[70vh] flex items-center justify-center"
                style={{ top: `calc(100px + ${i * 40}px)` }}
              >
                <div 
                  className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative group"
                  style={{ backgroundColor: project.color }}
                >
                  <img 
                    src={project.img} 
                    alt={project.title} 
                    className="w-full h-full object-cover opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-10 flex flex-col justify-end">
                    <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-cyan-400 text-sm font-bold tracking-widest uppercase mb-2 block">
                        {project.type}
                      </span>
                      <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight">
                        {project.title}
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <footer className="py-12 border-t border-white/10 text-center">
        <p className="text-gray-600 text-sm tracking-widest uppercase">
          © {new Date().getFullYear()} Jack.3D - All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
