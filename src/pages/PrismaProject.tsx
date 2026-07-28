import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef } from 'react';

export default function PrismaProject() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  const words = "We craft digital experiences that leave a lasting impression.".split(" ");

  return (
    <div ref={containerRef} className="bg-[#050505] text-white min-h-[200vh] font-sans selection:bg-purple-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 z-50 mix-blend-difference">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-white hover:opacity-70 transition-opacity font-medium tracking-wide"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Portal
        </Link>
      </nav>

      {/* Hero Section */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop" 
            alt="Prisma Studio Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-none mb-6">
              PRISMA<br />STUDIO
            </h1>
            <div className="flex flex-wrap justify-center gap-x-2 text-xl md:text-3xl font-light text-gray-300">
              {words.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5 + i * 0.1,
                    ease: [0.2, 0.65, 0.3, 0.9],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section className="relative z-30 bg-[#050505] py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl leading-tight font-medium text-gray-400"
          >
            <span className="text-white">We are a collective of designers and developers.</span> Our mission is to push the boundaries of web design, creating immersive and interactive experiences that elevate brands.
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-30 bg-[#050505] pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Strategy',
                desc: 'We build comprehensive roadmaps that align your digital presence with your business goals.',
                delay: 0
              },
              {
                title: 'Design',
                desc: 'Crafting visually stunning interfaces that are both intuitive and engaging.',
                delay: 0.2
              },
              {
                title: 'Development',
                desc: 'Translating designs into robust, scalable, and highly performant applications.',
                delay: 0.4
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, delay: feature.delay }}
                className="bg-white/5 border border-white/10 p-10 rounded-3xl hover:bg-white/10 transition-colors"
              >
                <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
