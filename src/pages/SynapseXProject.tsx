import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Lenis from 'lenis';
import { ScrambleIn } from '../components/synapsex/ScrambleIn';
import { ScrambleText } from '../components/synapsex/ScrambleText';
import { SquashHamburger } from '../components/synapsex/SquashHamburger';
import { SynapseXLogo } from '../components/synapsex/SynapseXLogo';

// Video URLs specified in the prompt with fallback public MP4 streams
const VIDEOS = {
  hero: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_083515_290e5a10-0b95-41af-a5e2-32b6389baa4d.mp4",
  heroFallback: "https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-459-large.mp4",
  
  cinematic: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_092455_089c54f8-3b03-4966-9df1-e9746063d0ef.mp4",
  cinematicFallback: "https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-white-31956-large.mp4",

  metrics: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095810_ecea3dd2-fc5e-4e41-8696-4219290b6589.mp4",
  metricsFallback: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",

  technology: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_095750_32a52ce0-2005-45c9-9093-41f03fde9530.mp4",
  technologyFallback: "https://assets.mixkit.co/videos/preview/mixkit-digital-lines-connecting-nodes-in-a-network-41553-large.mp4",

  footer: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260622_080203_fd7f4f85-3a86-4837-8192-85e7bfe68e75.mp4",
  footerFallback: "https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-grid-loop-41556-large.mp4",
};

export default function SynapseXProject() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);
  const [downloadHovered, setDownloadHovered] = useState(false);
  const [aboutHovered, setAboutHovered] = useState(false);
  const [metricsHovered, setMetricsHovered] = useState(false);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Entrance animation trigger after 800ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setEntranceComplete(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Section 1: Hero Video Mouse-scrubbing logic
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekTimeRef.current !== null && video) {
        const nextTime = pendingSeekTimeRef.current;
        pendingSeekTimeRef.current = null;
        isSeekingRef.current = true;
        video.currentTime = nextTime;
      }
    };

    video.addEventListener('seeked', handleSeeked);

    const handleMouseMove = (e: MouseEvent) => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      
      const mousePercent = Math.max(0, Math.min(1, (e.clientX / window.innerWidth) * 0.8));
      const targetTime = mousePercent * video.duration;

      if (!isSeekingRef.current) {
        isSeekingRef.current = true;
        video.currentTime = targetTime;
      } else {
        pendingSeekTimeRef.current = targetTime;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, []);

  // Section 2: 3D Text Perspective Scroll Motion
  const section2Ref = useRef<HTMLElement>(null);
  const { scrollYProgress: section2Progress } = useScroll({
    target: section2Ref,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(section2Progress, {
    stiffness: 15,
    damping: 32,
    mass: 1.8,
  });

  const yScaleValue = useTransform(smoothProgress, [0, 1], [60, -120]);
  const textOpacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);

  const scrollToSection = (offsetFactor: number) => {
    window.scrollTo({
      top: window.innerHeight * offsetFactor,
      behavior: 'smooth',
    });
  };

  return (
    <div 
      className="synapsex-project min-h-screen w-full bg-black text-white selection:bg-white selection:text-black relative overflow-x-hidden"
      style={{ fontFamily: '"Space Mono", monospace' }}
    >
      {/* NAVBAR */}
      <motion.nav 
        initial={{ opacity: 0 }}
        animate={{ opacity: entranceComplete ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 w-full h-20 z-50 px-4 sm:px-6 md:px-8 flex items-center justify-between pointer-events-none"
      >
        {/* Desktop Navbar Group */}
        <div className="hidden sm:flex items-center gap-2 pointer-events-auto">
          {/* Logo Pill */}
          <motion.div
            whileHover={{ scale: 1.02, backgroundColor: "rgba(255, 255, 255, 0.22)" }}
            whileTap={{ scale: 0.98 }}
            className="h-12 px-5 bg-white/15 backdrop-blur-md rounded-[14px] flex items-center gap-2.5 cursor-pointer shadow-lg border border-white/10"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <SynapseXLogo className="w-[18px] h-[18px] text-white" />
            <span className="text-[16px] font-medium tracking-tight text-white select-none">SynapseX</span>
          </motion.div>

          {/* Expanding Menu Pill */}
          <motion.div
            initial={false}
            animate={{ width: isMenuOpen ? 290 : 48 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-12 rounded-[14px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden border border-white/10 shadow-lg"
          >
            <div 
              className={`flex items-center justify-center transition-all ${
                isMenuOpen 
                  ? 'w-9 h-9 rounded-[11px] bg-white/10 hover:bg-white/20 ml-1.5 cursor-pointer' 
                  : 'w-12 h-12 rounded-[14px] cursor-pointer'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <SquashHamburger isOpen={isMenuOpen} />
            </div>

            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                className="flex items-center gap-6 ml-4 pr-4 whitespace-nowrap"
              >
                <div 
                  className="cursor-pointer text-[16px] font-normal text-white/85 hover:text-white transition-colors"
                  onMouseEnter={() => setAboutHovered(true)}
                  onMouseLeave={() => setAboutHovered(false)}
                  onClick={() => scrollToSection(1)}
                >
                  <ScrambleText text="About" isHovered={aboutHovered} />
                </div>
                <div 
                  className="cursor-pointer text-[16px] font-normal text-white/85 hover:text-white transition-colors"
                  onMouseEnter={() => setMetricsHovered(true)}
                  onMouseLeave={() => setMetricsHovered(false)}
                  onClick={() => scrollToSection(2)}
                >
                  <ScrambleText text="Metrics" isHovered={metricsHovered} />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Mobile Navbar Group */}
        <div className="sm:hidden flex items-center gap-1.5 pointer-events-auto">
          <motion.div
            initial={false}
            animate={{ width: isMenuOpen ? 0 : 'auto', opacity: isMenuOpen ? 0 : 1 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-9 px-3.5 bg-white/15 backdrop-blur-md rounded-[10px] flex items-center gap-2 overflow-hidden border border-white/10"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <SynapseXLogo className="w-4 h-4 text-white" />
            <span className="text-[13px] font-medium tracking-tight text-white whitespace-nowrap">SynapseX</span>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ width: isMenuOpen ? 'calc(100vw - 120px)' : 36 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="h-9 rounded-[10px] bg-white/15 backdrop-blur-md flex items-center overflow-hidden border border-white/10"
          >
            <div 
              className="w-9 h-9 flex items-center justify-center cursor-pointer"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <SquashHamburger isOpen={isMenuOpen} />
            </div>

            {isMenuOpen && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-4 ml-2 pr-3 whitespace-nowrap text-[13px]"
              >
                <span onClick={() => scrollToSection(1)} className="text-white/85">About</span>
                <span onClick={() => scrollToSection(2)} className="text-white/85">Metrics</span>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Download Button (Right) */}
        <div className="pointer-events-auto">
          <motion.button 
            whileHover={{ scale: 1.03, backgroundColor: '#e2e2e6' }}
            whileTap={{ scale: 0.97 }}
            onMouseEnter={() => setDownloadHovered(true)}
            onMouseLeave={() => setDownloadHovered(false)}
            className="h-9 sm:h-12 px-3.5 sm:px-6 bg-white rounded-full text-black flex items-center gap-2 font-medium text-xs sm:text-sm cursor-pointer shadow-lg"
          >
            <i className="bi bi-apple text-sm sm:text-base leading-none"></i>
            <ScrambleText text="Download" isHovered={downloadHovered} />
          </motion.button>
        </div>
      </motion.nav>

      {/* SECTION 1: HERO */}
      <section className="relative h-screen h-[100dvh] w-full flex flex-col justify-between px-4 sm:px-6 md:px-8 pt-20 sm:pt-24 pb-8 sm:pb-12 border-b border-white/10 overflow-hidden">
        {/* Background Video (Mouse Scrubbed, Paused) */}
        <video
          ref={heroVideoRef}
          preload="metadata"
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={VIDEOS.hero} type="video/mp4" />
          <source src={VIDEOS.heroFallback} type="video/mp4" />
        </video>

        {/* Dot Grid Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        {/* Large Background Watermark Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden translate-y-[50px]">
          <span 
            className="font-['Anton_SC'] uppercase opacity-10 select-none tracking-[-4px]"
            style={{ 
              fontSize: 'clamp(120px, 30vw, 521px)',
              background: 'radial-gradient(circle, rgba(142,127,148,0) 0%, #8E7F94 70%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TRANSCENDENCE
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Hero Bottom Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: entranceComplete ? 1 : 0 }}
          transition={{ duration: 1.0 }}
          className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            <h1 className="text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="Brain" delay={200} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="And Body" delay={500} triggered={entranceComplete} />
            </h1>

            <motion.p
              initial={{ y: 25, opacity: 0 }}
              animate={entranceComplete ? { y: 0, opacity: 1 } : { y: 25, opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.215, 0.610, 0.355, 1.000] }}
              className="max-w-sm text-[13px] sm:text-[15px] text-white/60 leading-relaxed font-normal"
            >
              Built at the intersection of neuroscience and artificial intelligence. SynapseX continuously maps neural pathways, cognitive load, and physiological states into a single adaptive intelligence layer.
            </motion.p>
          </div>

          {/* Right Column */}
          <div>
            <h1 className="text-left md:text-right text-white font-light leading-[0.95] tracking-[-0.03em] text-[clamp(40px,10vw,100px)]">
              <ScrambleIn text="One" delay={700} triggered={entranceComplete} />
              <br />
              <ScrambleIn text="Network" delay={1000} triggered={entranceComplete} />
            </h1>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: CINEMATIC TEXT */}
      <section ref={section2Ref} className="relative h-screen h-[100dvh] w-full bg-black overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        >
          <source src={VIDEOS.cinematic} type="video/mp4" />
          <source src={VIDEOS.cinematicFallback} type="video/mp4" />
        </video>

        {/* Top Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-[180px] bg-gradient-to-b from-[#010103] to-transparent z-10 pointer-events-none" />

        {/* 3D Perspective Text Container */}
        <div className="relative z-20 max-w-5xl px-6 sm:px-12 text-center" style={{ perspective: '400px' }}>
          <motion.p
            style={{
              transform: useTransform(
                yScaleValue,
                (y) => `rotateX(24deg) translateY(${y}px) translateZ(15px)`
              ),
              opacity: textOpacity,
            }}
            className="font-sans font-normal text-[22px] sm:text-[30px] md:text-[36px] lg:text-[42px] text-white leading-[1.35] tracking-[-0.02em] select-none text-center"
          >
            A neural-AI interface built on the architecture of the human nervous system. SynapseX translates synaptic activity into computational intelligence. Every signal becomes measurable, structured, and visible. It continuously reconstructs internal state as a dynamic neural map. Biological noise is filtered into actionable cognitive patterns.
          </motion.p>
        </div>
      </section>

      {/* SECTION 3: METRICS */}
      <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-center items-center pt-32 pb-32 px-6 border-t border-white/10">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen"
        >
          <source src={VIDEOS.metrics} type="video/mp4" />
          <source src={VIDEOS.metricsFallback} type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-6xl w-full mx-auto">
          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
            className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-20 text-center font-normal"
          >
            Performance Metrics
          </motion.p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {[
              { value: '2.4ms', label: 'Synaptic Latency' },
              { value: '99.7%', label: 'Signal Accuracy' },
              { value: '140B', label: 'Neural Parameters' }
            ].map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                className="flex flex-col text-center md:text-left"
              >
                <span className="text-white text-[clamp(48px,10vw,96px)] font-light tracking-[-0.04em] leading-none">
                  {metric.value}
                </span>
                <span className="text-white/40 text-[13px] sm:text-[15px] mt-4 tracking-wide font-normal">
                  {metric.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: TECHNOLOGY / ADAPTIVE INTELLIGENCE */}
      <section className="relative h-screen h-[100dvh] bg-black overflow-hidden flex flex-col justify-between px-8 sm:px-12 md:px-16 py-12 sm:py-16 border-t border-white/10">
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-lighten"
        >
          <source src={VIDEOS.technology} type="video/mp4" />
          <source src={VIDEOS.technologyFallback} type="video/mp4" />
        </video>

        {/* Top Area */}
        <div className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-6">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.0 }}
            className="text-white font-light text-[clamp(36px,8vw,72px)] leading-[0.95] tracking-[-0.03em]"
          >
            Adaptive<br />Intelligence
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="text-white/50 text-[13px] sm:text-[15px] leading-relaxed max-w-xs md:text-right md:pt-2 font-normal"
          >
            The system learns your neural baseline within 72 hours. From there, every cognitive state is mapped, predicted, and optimized in real time.
          </motion.p>
        </div>

        <div className="flex-1" />

        {/* Bottom Grid */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.3 }}
          className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
        >
          {[
            { title: "Cortical Mapping", desc: "Real-time spatial reconstruction of active neural regions." },
            { title: "Signal Isolation", desc: "Separates cognitive intent from biological noise." },
            { title: "State Prediction", desc: "Anticipates cognitive transitions before they occur." },
            { title: "Loop Feedback", desc: "Closed-loop adjustment based on outcome correlation." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="flex flex-col"
            >
              <h3 className="text-white text-[14px] sm:text-[16px] font-normal mb-2">
                {item.title}
              </h3>
              <p className="text-white/40 text-[12px] sm:text-[14px] leading-relaxed font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 5: ARCHITECTURE */}
      <section className="relative min-h-screen bg-black py-32 px-6 flex flex-col items-center justify-center text-center border-t border-white/10">
        {/* Heading Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-white/40 text-[13px] sm:text-[14px] tracking-[0.2em] uppercase mb-8 font-normal">
            Architecture
          </p>
          <h2 className="text-white font-light text-[clamp(28px,6vw,56px)] leading-[1.15] tracking-[-0.02em] mb-10">
            Three layers. Zero friction.
          </h2>
          <p className="text-white/45 text-[15px] sm:text-[17px] leading-relaxed max-w-xl mx-auto font-normal">
            Sensor layer captures raw bioelectric signals. Processing layer isolates intent. Interface layer delivers structured output to any connected system.
          </p>
        </motion.div>

        {/* Layer Cards */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mt-20 flex flex-col items-center gap-4 max-w-md w-full mx-auto"
        >
          {[
            { num: "Layer 1", title: "Capture" },
            { num: "Layer 2", title: "Process" },
            { num: "Layer 3", title: "Interface" }
          ].map((layer, i) => (
            <div 
              key={i}
              className="max-w-md w-full h-[72px] border border-white/10 rounded-lg flex items-center justify-between px-6 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-colors"
            >
              <span className="text-white/30 text-[12px] tracking-[0.15em] uppercase font-normal">
                {layer.num}
              </span>
              <span className="text-white text-[16px] sm:text-[18px] font-light">
                {layer.title}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative w-full border-t border-white/10 bg-black flex flex-col md:flex-row min-h-[400px]">
        {/* Left Half (Video) */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto relative overflow-hidden">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src={VIDEOS.footer} type="video/mp4" />
            <source src={VIDEOS.footerFallback} type="video/mp4" />
          </video>
        </div>

        {/* Right Half */}
        <div className="w-full md:w-1/2 p-10 sm:p-16 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8 text-white/70">
              <SynapseXLogo className="w-[18px] h-[18px]" />
              <span className="text-[15px] font-medium tracking-tight">SynapseX</span>
            </div>

            <p className="text-white/40 text-[14px] sm:text-[15px] leading-relaxed max-w-sm font-normal">
              The next evolution of human-machine interaction. Built for those who refuse to be limited by biology alone.
            </p>
          </div>

          <p className="text-white/25 text-[12px] mt-12 font-normal">
            © 2026 SynapseX Labs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
