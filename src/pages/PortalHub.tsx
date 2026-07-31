import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, ExternalLink } from 'lucide-react';
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
  isExternal?: boolean;
}

const projects: Project[] = [
  {
    id: 'prisma',
    title: 'Prisma Creative Studio',
    description: 'A dark, moody, cinematic creative studio landing page with warm cream typography, Almarai & Instrument Serif Google fonts, and rich interactive micro-animations.',
    category: 'Websites',
    route: '/projects/prisma',
    thumbnailUrl: '/assets/thumbnails/prisma.png',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4',
  },
  {
    id: 'jack',
    title: 'Jack - 3D Creator',
    description: 'Portfolio for a 3D artist featuring high-impact typography, dark mode, smooth marquees, and sticky stacking cards.',
    category: 'Websites',
    route: '/projects/jack',
    thumbnailUrl: '/assets/thumbnails/jack.png',
  },
  {
    id: 'synapsex',
    title: 'SynapseX',
    description: 'A futuristic neural-AI interface product featuring mouse-scrubbed hero video, full-viewport video backgrounds, and Space Mono typography.',
    category: 'Websites',
    route: '/projects/synapsex',
    thumbnailUrl: '/assets/thumbnails/synapsex.png',
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4',
  },
  {
    id: 'neomuseum',
    title: 'Neo Museum',
    description: 'An immersive historical museum experience featuring fluid sand transitions, parallax scrolling, and a dark sophisticated theme.',
    category: 'Websites',
    route: '/projects/neomuseum',
    thumbnailUrl: '/assets/thumbnails/neomuseum.png',
  },
  {
    id: 'iecs',
    title: 'IECS Construction',
    description: 'A corporate landing page showcasing complex layouts, hero banner slider, services hover toggle, and smooth animations integrated as a standalone static build.',
    category: 'Websites',
    route: '/iecs/index.html',
    thumbnailUrl: '/assets/thumbnails/iecs.png',
    isExternal: true,
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
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-video bg-[#141414] border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10 transition-opacity duration-300 group-hover:opacity-75" />
                
                {/* Official High-Res Website Thumbnail Screenshot */}
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-2xl group-hover:scale-105 transition-transform text-xs font-semibold tracking-wider text-white uppercase gap-2">
                    <span>View Project</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 p-8 z-20 w-full transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-xs font-semibold tracking-wider uppercase text-gray-400 mb-2 block">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-1">{project.title}</h3>
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="bg-[#111] border border-white/15 rounded-3xl overflow-hidden w-full max-w-4xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Image Banner */}
              <div className="relative aspect-video bg-black flex items-center justify-center border-b border-white/10 overflow-hidden">
                <img 
                  src={selectedProject.thumbnailUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-black/30" />
                
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white border border-white/10 transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 sm:p-10 flex flex-col sm:flex-row items-start justify-between gap-8 bg-[#111]">
                <div className="max-w-2xl">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-gray-300 mb-4">
                    {selectedProject.category}
                  </span>
                  <h2 className="text-3xl font-bold text-white mb-4">{selectedProject.title}</h2>
                  <p className="text-gray-400 text-base leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="w-full sm:w-auto flex-shrink-0">
                  <button 
                    onClick={() => {
                      if (selectedProject.isExternal) {
                        window.location.href = selectedProject.route;
                      } else {
                        navigate(selectedProject.route);
                      }
                      setSelectedProject(null);
                    }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors group cursor-pointer"
                  >
                    Open Project
                    {selectedProject.isExternal ? (
                      <ExternalLink className="w-4 h-4" />
                    ) : (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
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
