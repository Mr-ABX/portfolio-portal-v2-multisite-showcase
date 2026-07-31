import { useState, useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence, usePresence } from 'framer-motion';
import { ArrowRight, Plus, Bone, Dna, Gem, Leaf, BookOpen, ArrowUpRight } from 'lucide-react';

const chaptersData = [
  { name: "Age of Dinosaurs", image: "/assets/neo-museum/01.png" },
  { name: "Fossils of Ancient Life", image: "/assets/neo-museum/02.png" },
  { name: "Reptiles of the Mesozoic", image: "/assets/neo-museum/03.png" },
  { name: "Marine Fossil Gallery", image: "/assets/neo-museum/04.png" },
  { name: "Prehistoric Giants", image: "/assets/neo-museum/05.png" }
];

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const letterBlock = {
  initial: { y: 120, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as any } 
  }
};

function SandTransitionImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isPresent, safeToRemove] = usePresence();
  const filterId = useId().replace(/:/g, '');
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let start: number | null = null;
    const duration = 900;
    let reqId: number;

    const tick = (now: number) => {
      if (!start) start = now;
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);

      const visualT = isPresent ? (1 - Math.pow(1 - t, 4)) : Math.pow(t, 3);
      const progress = isPresent ? 1 - visualT : visualT;

      if (svgRef.current) {
        const feDisplacementMap = svgRef.current.querySelector('feDisplacementMap');
        const feOffset = svgRef.current.querySelector('feOffset');
        const feGaussianBlur = svgRef.current.querySelector('feGaussianBlur');
        const feColorMatrix = svgRef.current.querySelector('feColorMatrix');

        if (feDisplacementMap) feDisplacementMap.setAttribute('scale', (progress * 150).toString());
        
        const dy = isPresent ? progress * -80 : progress * 120;
        const dx = (Math.random() - 0.5) * 60 * progress;
        
        if (feOffset) {
          feOffset.setAttribute('dx', dx.toString());
          feOffset.setAttribute('dy', dy.toString());
        }
        
        if (feGaussianBlur) feGaussianBlur.setAttribute('stdDeviation', (progress * 6).toString());
        
        if (feColorMatrix) {
          const opacity = Math.max(0, 1 - progress * 1.2);
          feColorMatrix.setAttribute('values', `1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${opacity} 0`);
        }
      }

      if (t < 1) {
        reqId = requestAnimationFrame(tick);
      } else if (!isPresent) {
        safeToRemove();
      }
    };

    reqId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(reqId);
  }, [isPresent, safeToRemove]);

  return (
    <>
      <svg ref={svgRef} className="hidden absolute w-0 h-0">
        <filter id={`sand-${filterId}`}>
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="4" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="displaced" />
          <feOffset dx="0" dy="0" result="offset" />
          <feGaussianBlur stdDeviation="0" result="blurred" />
          <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" />
        </filter>
      </svg>
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ filter: `url(#sand-${filterId})` }}
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
    </>
  );
}

export default function NeoMuseumProject() {
  const [showVideo, setShowVideo] = useState(false);
  const [activeChapter, setActiveChapter] = useState(2);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const vTimer = setTimeout(() => setShowVideo(true), 2800);
    const cInterval = setInterval(() => {
      setActiveChapter((prev) => (prev + 1) % 5);
    }, 3500);
    return () => {
      clearTimeout(vTimer);
      clearInterval(cInterval);
    };
  }, []);

  return (
    <div className="neo-museum-project">
      {/* SECTION 1: HERO */}
      <section className="relative w-full min-h-screen flex flex-col overflow-hidden">
        {/* 1A. HEADER */}
        <motion.header
          className="pt-6 px-6 md:px-16 z-20"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
          }}
        >
          <motion.h1
            className="w-full flex"
            variants={{
              initial: { scale: 1.03 },
              animate: { scale: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } }
            }}
          >
            <svg viewBox="0 0 840 100" fill="#111" className="w-full h-auto overflow-visible">
              {/* N */}
              <motion.g transform="translate(0,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="0,0 33,0 214,100 181,100" variants={letterBlock} />
              </motion.g>
              {/* H */}
              <motion.g transform="translate(280,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="200,0 214,0 214,100 200,100" variants={letterBlock} />
                <motion.polygon points="14,43 200,43 200,57 14,57" variants={letterBlock} />
              </motion.g>
              {/* M */}
              <motion.g transform="translate(560,0)">
                <motion.polygon points="0,0 14,0 14,100 0,100" variants={letterBlock} />
                <motion.polygon points="266,0 280,0 280,100 266,100" variants={letterBlock} />
                <motion.polygon points="0,0 26,0 153,100 127,100" variants={letterBlock} />
                <motion.polygon points="254,0 280,0 153,100 127,100" variants={letterBlock} />
              </motion.g>
            </svg>
          </motion.h1>

          {/* 1B. SUB-NAV BAR */}
          <motion.div
            className="flex justify-between items-start mt-8 text-[10px] md:text-[11px] font-[var(--font-neo-mono)] tracking-[0.2em] uppercase"
            variants={fadeUp}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="w-[15%] flex flex-col">
              <span>Natura</span>
              <span>History</span>
              <span>Museum</span>
            </div>
            
            <div className="hidden md:flex w-[5%] justify-center mt-1">
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </div>

            <div className="flex-1 md:w-[30%] md:flex-none text-gray-800 leading-relaxed font-[var(--font-neo-mono)]">
              Exploring the story<br className="hidden md:block"/>
              of life on earth <br className="block md:hidden"/>through<br className="hidden md:block"/>
              science, discovery <br className="block md:hidden"/>and wonder.
            </div>

            <div className="hidden md:flex w-[5%] justify-center mt-1">
              <ArrowRight size={14} strokeWidth={1} className="text-gray-400" />
            </div>

            <div className="hidden md:flex w-[15%] flex-col text-gray-800 space-y-1">
              <a href="#" className="hover:text-black hover:underline transition-colors">Visit</a>
              <a href="#" className="hover:text-black hover:underline transition-colors">Exhibitions</a>
              <a href="#" className="hover:text-black hover:underline transition-colors">Discover</a>
              <a href="#" className="hover:text-black hover:underline transition-colors">Learn</a>
              <a href="#" className="hover:text-black hover:underline transition-colors">About</a>
            </div>

            <div className="relative z-60 md:hidden mt-1 cursor-pointer flex flex-col items-end" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <div className={`w-8 h-[1.5px] bg-black transition-all duration-300 mb-[6px] ${isMobileMenuOpen ? 'rotate-45 translate-y-[7.5px]' : ''}`}></div>
              <div className={`h-[1.5px] bg-black transition-all duration-300 ${isMobileMenuOpen ? 'w-8 -rotate-45 -translate-y-[7.5px]' : 'w-10'}`}></div>
            </div>
          </motion.div>
        </motion.header>

        {/* 1C. MOBILE MENU OVERLAY */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="absolute top-0 left-0 w-full bg-[#fcfcfc] border-b border-gray-200 shadow-xl z-50 md:hidden pt-40 px-6 pb-12 flex flex-col text-sm font-[var(--font-neo-mono)] tracking-[0.2em] uppercase space-y-6"
            >
              <a href="#" className="hover:text-black transition-colors">Visit</a>
              <a href="#" className="hover:text-black transition-colors">Exhibitions</a>
              <a href="#" className="hover:text-black transition-colors">Discover</a>
              <a href="#" className="hover:text-black transition-colors">Learn</a>
              <a href="#" className="hover:text-black transition-colors">About</a>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 1D. BACKGROUND VIDEO */}
        <div className={`absolute top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ${showVideo ? 'opacity-100' : 'opacity-0'}`}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            src="/assets/neo-museum/magnific_use-img-2-as-the-exact-ba_Piu3X0W42C.mp4"
          />
        </div>

        {/* 1E. LEFT SIDEBAR CONTENT */}
        <motion.div
          className="px-10 md:px-16 mt-20 sm:mt-28 md:mt-32 w-[320px] z-10"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } }
          }}
        >
          <motion.div variants={fadeUp} className="flex items-center text-xs font-[var(--font-neo-mono)] mb-6">
            <span className="mr-4">01</span>
            <div className="w-16 h-[1.5px] bg-black/20"></div>
          </motion.div>
          
          <motion.h2 variants={fadeUp} className="text-[3.5rem] md:text-[5rem] font-normal tracking-tight leading-[1] mb-6">
            TIMELESS<br />WONDERS
          </motion.h2>

          <motion.p variants={fadeUp} className="text-[13px] md:text-[14px] text-gray-700 w-[240px] leading-[1.6] mb-10">
            Step into the natural world and<br />discover the stories written<br />millions of years ago.
          </motion.p>

          <motion.div variants={fadeUp} className="relative group cursor-pointer w-fit">
            <div className="relative overflow-hidden bg-[#1a1a1a] px-6 py-3.5 border border-[#1a1a1a] rounded-md shadow-sm transition-transform active:translate-y-0 active:shadow-none hover:-translate-y-[0.5px] hover:shadow-[3px_3px_0px_rgba(17,17,17,0.5)]">
              <div className="absolute inset-0 bg-[#fcfcfc] -translate-x-[101%] group-hover:translate-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"></div>
              <div className="relative z-10 flex items-center gap-3">
                <div className="w-4 h-4 transition-all duration-500 group-hover:scale-110 group-hover:-rotate-12 group-hover:-translate-y-1">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-[#111] transition-colors duration-500 w-full h-full">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span className="text-[15px] font-medium text-white group-hover:text-[#111] transition-colors duration-500">Explore Now</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 1F. RIGHT SIDEBAR */}
        <motion.div
          className="absolute right-10 md:right-16 top-0 w-[200px] mt-32 md:mt-40 hidden md:flex flex-col z-10"
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } }
          }}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <h3 className="text-[10px] font-bold font-[var(--font-neo-mono)] tracking-widest uppercase mb-2">Tyrannosaurus Rex</h3>
            <p className="text-[12px] text-gray-600 leading-[1.6]">Late Cretaceous period<br />68-66 million years ago</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4 mb-8">
            <div>
              <div className="text-[10px] font-[var(--font-neo-mono)] tracking-widest uppercase text-gray-500 mb-1">Length</div>
              <div className="text-[13px] font-medium">12.3 m</div>
            </div>
            <div>
              <div className="text-[10px] font-[var(--font-neo-mono)] tracking-widest uppercase text-gray-500 mb-1">Height</div>
              <div className="text-[13px] font-medium">4.0 m</div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-4 cursor-pointer group w-fit">
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 group-hover:border-black group-hover:bg-[#111] transition-colors duration-300">
              <Plus size={16} strokeWidth={1.5} className="text-black group-hover:text-white transition-colors duration-300" />
            </div>
            <span className="text-[10px] font-[var(--font-neo-mono)] uppercase tracking-widest font-bold">View Details</span>
          </motion.div>
        </motion.div>

        {/* 1G. BOTTOM-LEFT "SCROLL TO EXPLORE" */}
        <motion.div
          className="absolute bottom-10 left-[2.5rem] md:left-[4rem] hidden md:flex items-center gap-4 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-gray-300">
            <div className="flex gap-[4px]">
              <div className="w-[1px] h-[12px] bg-gray-600"></div>
              <div className="w-[1px] h-[12px] bg-gray-600"></div>
            </div>
          </div>
          <span className="text-[10px] font-[var(--font-neo-mono)] tracking-widest uppercase text-gray-500 font-semibold">Scroll to explore</span>
        </motion.div>
      </section>

      {/* SECTION 2: EXPLORE OUR WORLD */}
      <section className="relative w-full min-h-[75vh] md:min-h-screen bg-[#fcfcfc] flex flex-col items-center pt-24 md:pt-32 pb-0 z-20">
        
        {/* 2A. SECTION LABEL */}
        <div className="text-[10px] md:text-[11px] font-[var(--font-neo-mono)] tracking-[0.2em] mb-12">
          <span className="text-gray-500">[ 02 ]</span> <span className="text-gray-900 font-bold uppercase ml-2">Explore Our World</span>
        </div>

        {/* 2B. MAIN HEADING */}
        <motion.h2 
          className="text-[2.2rem] md:text-[3.5rem] lg:text-[4.2rem] leading-[1.1] font-medium tracking-tight text-[#111] max-w-[1000px] text-center px-6 mb-12 md:mb-16"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          Unearth the stories of our planet's past<br className="hidden md:block"/> through fossils, minerals, and ancient wonders.
        </motion.h2>

        {/* 2C. ACTION PILLS */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 md:gap-4 px-6 mb-10 md:mb-24"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
          }}
        >
          {[
            { icon: Bone, label: "Dinosaurs" },
            { icon: Dna, label: "Ancient Life" },
            { icon: Gem, label: "Minerals" },
            { icon: Leaf, label: "Fossils" },
            { icon: BookOpen, label: "Learn More" }
          ].map((pill, idx) => (
            <motion.button 
              key={idx}
              variants={fadeUp}
              className="flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2.5 text-[11px] font-medium uppercase tracking-wider bg-white/50 backdrop-blur-sm text-gray-800 hover:border-black hover:bg-black hover:text-white transition-colors duration-300"
            >
              <pill.icon size={14} strokeWidth={2} />
              <span>{pill.label}</span>
            </motion.button>
          ))}
        </motion.div>

        {/* 2D. SPACER */}
        <div className="min-h-[220px] md:min-h-[450px] w-full"></div>

        {/* 2E. BOTTOM TEXT */}
        <div className="absolute bottom-0 left-0 w-full px-8 md:px-16 pb-8 md:pb-12 pointer-events-none hidden md:flex justify-between items-center text-[10px] font-[var(--font-neo-mono)] tracking-widest uppercase text-gray-500 font-medium">
          <span>WE DON'T JUST TELL STORIES.</span>
          <span>PALEONTOLOGY (C) 2026</span>
        </div>
      </section>

      {/* SECTION 3: ANCIENT COLLECTION */}
      <section className="relative w-full bg-[#0a0a0a] text-white flex flex-col z-30 pt-32 md:pt-48">
        
        {/* 3A. PTERODACTYL IMAGE */}
        <motion.img
          src="/assets/neo-museum/ChatGPT Image May 23, 2026, 12_24_44 PM 1.png"
          alt="Pterodactyl"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[160vw] md:w-[1100px] pointer-events-none z-0"
          initial={{ y: "-65%", opacity: 0 }}
          whileInView={{ y: "-78%", opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          viewport={{ margin: "100px" }}
        />

        {/* 3B. HEADING AREA */}
        <div className="px-8 md:px-16 mb-16 z-10 flex flex-col xl:flex-row justify-between items-start gap-12">
          <h2 className="text-[1.8rem] md:text-[3rem] lg:text-[3.8rem] xl:text-[4rem] leading-[1.15] font-medium tracking-tight text-white max-w-[800px]">
            Curated from millions of years of wonder 
            <span className="inline-flex gap-2 md:gap-3 align-middle mx-2 md:mx-4 translate-y-[-4px]">
              <span className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                <Bone size={22} />
              </span>
              <span className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                <Dna size={22} />
              </span>
              <span className="flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-full border border-gray-600 bg-black text-gray-400 hover:bg-white hover:text-black hover:border-white transition-colors duration-300">
                <Leaf size={22} />
              </span>
            </span> 
            & discovery.
          </h2>
          
          <div className="flex flex-col items-start xl:items-end xl:text-right">
            <p className="text-[9px] md:text-[10px] font-[var(--font-neo-mono)] tracking-widest text-gray-400 uppercase mb-6 leading-relaxed">
              WE DON'T JUST DISPLAY FOSSILS<br />WE SHARE EARTH'S STORY
            </p>
            <div className="flex flex-wrap gap-3">
              {["Educational", "Authentic", "Inspiring"].map((pill) => (
                <span key={pill} className="px-5 py-2 rounded-full border border-gray-600 text-[9px] font-[var(--font-neo-mono)] tracking-widest uppercase text-gray-300 hover:bg-white hover:text-black hover:border-white transition-colors duration-300 cursor-default">
                  {pill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 3C. TWO-COLUMN PANEL */}
        <div className="w-full h-[1px] bg-gray-800 z-10"></div>
        <div className="flex flex-col md:flex-row z-10 relative">
          
          {/* Left panel */}
          <div className="w-full md:w-[35%] border-b md:border-b-0 md:border-r border-gray-800 min-h-[400px] md:min-h-[500px] flex flex-col p-8 relative overflow-hidden">
            <div className="text-gray-500 text-xl tracking-[0.3em] mb-auto">***</div>
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence mode="wait">
                <SandTransitionImage 
                  key={activeChapter}
                  src={chaptersData[activeChapter].image} 
                  alt={chaptersData[activeChapter].name}
                  className="w-[80%] h-[80%] object-contain mix-blend-lighten"
                />
              </AnimatePresence>
            </div>
            
            <div className="mt-auto flex items-center text-[10px] font-[var(--font-neo-mono)] tracking-widest uppercase">
              <div className="relative h-4 w-4 overflow-hidden text-[#888]">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={activeChapter}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="absolute"
                  >
                    0{activeChapter + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="text-[#333] mx-2">/</span>
              <span className="text-[#888]">05</span>
            </div>
          </div>

          {/* Right panel */}
          <div className="w-full md:w-[65%] flex flex-col">
            <div className="border-b border-gray-800 p-8 text-[10px] font-[var(--font-neo-mono)] text-gray-400 tracking-widest uppercase flex justify-between items-center">
              <span>Explore the past. Understand the present.</span>
              <div className="relative h-4 w-[80px] overflow-hidden text-right">
                <AnimatePresence mode="popLayout">
                  <motion.span 
                    key={activeChapter}
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    className="absolute right-0"
                  >
                    Chapter 0{activeChapter + 1}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            
            <div className="flex flex-col px-8">
              {chaptersData.map((chapter, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveChapter(idx)}
                    className={`group flex justify-between items-center border-b border-gray-800/80 py-8 cursor-pointer transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#444] hover:text-[#999]'}`}
                  >
                    <h3 className="text-2xl md:text-[2rem] font-medium tracking-tight">
                      {chapter.name}
                    </h3>
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, x: -10, y: 10 }}
                          animate={{ opacity: 1, x: 0, y: 0 }}
                          exit={{ opacity: 0, x: -10, y: 10 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowUpRight size={22} strokeWidth={1} className="text-gray-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D. BOTTOM FOOTER */}
        <div className="w-full h-[1px] bg-gray-800 z-10"></div>
        <div className="px-8 py-8 text-[10px] font-[var(--font-neo-mono)] tracking-widest text-gray-500 uppercase bg-[#0a0a0a] z-10">
          DIGGING INTO OUR PLANET'S PAST
        </div>
      </section>
    </div>
  );
}
