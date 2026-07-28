import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, ArrowRight, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Category = 'All' | 'Websites' | 'Apps';

interface Project {
  id: string;
  title: string;
  description: string;
  category: Category;
  route: string;
  thumbnailUrl: string;
  videoUrl?: string;
}

const projects: Project[] = [
  {
    id: 'prisma',
    title: 'Prisma Creative Studio',
    description: 'A modern, vibrant creative studio portfolio with smooth scrolling and animations.',
    category: 'Websites',
    route: '/projects/prisma',
    thumbnailUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '', // Placeholder for now
  },
  {
    id: 'jack',
    title: 'Jack - 3D Creator',
    description: 'Portfolio for a 3D artist featuring dark mode, marquees, and sticky stacking cards.',
    category: 'Websites',
    route: '/projects/jack',
    thumbnailUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    videoUrl: '', // Placeholder for now
  }
];

export default function PortalHub() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const navigate = useNavigate();

  const filteredProjects = projects.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20">
      {/* Header / Hero */}
      <header className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Selected Works
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12">
            A collection of premium digital experiences, web applications, and immersive landing pages built with modern technologies.
          </p>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-4">
            {(['All', 'Websites', 'Apps'] as Category[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>
      </header>

      {/* Grid */}
      <main className="px-6 pb-24 max-w-7xl mx-auto">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video bg-white/5 border border-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-70" />
                
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-300 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </main>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="bg-[#111] border border-white/10 rounded-3xl overflow-hidden w-full max-w-5xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video bg-black flex items-center justify-center border-b border-white/10">
                {selectedProject.videoUrl ? (
                  <video 
                    src={selectedProject.videoUrl} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-500">
                    <Play className="w-12 h-12 mb-4 opacity-50" />
                    <p>Video Preview Coming Soon</p>
                  </div>
                )}
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-start justify-between gap-8">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300 mb-4">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="w-full sm:w-auto flex-shrink-0">
                  <button 
                    onClick={() => {
                      navigate(selectedProject.route);
                      setSelectedProject(null);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors group"
                  >
                    Open Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
