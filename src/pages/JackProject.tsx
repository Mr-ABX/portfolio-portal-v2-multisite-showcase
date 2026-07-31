import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Magnet Component
const Magnet = ({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < padding) {
        setIsActive(true);
        setPosition({ x: distanceX / strength, y: distanceY / strength });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        transition: isActive ? activeTransition : inactiveTransition,
        willChange: 'transform'
      }}
      className="inline-block"
    >
      {children}
    </div>
  );
};

// FadeIn Component
const FadeIn = ({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// AnimatedText Component
const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2']
  });

  return (
    <p ref={containerRef} className={className}>
      {text.split('').map((char, i) => {
        const start = i / text.length;
        const end = start + (1 / text.length);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        
        return (
          <span key={i} className="relative inline-block">
            <span className="invisible">{char === ' ' ? '\u00A0' : char}</span>
            <motion.span className="absolute left-0 top-0" style={{ opacity }}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        );
      })}
    </p>
  );
};

// Buttons
const ContactButton = () => (
  <button className="rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white transition-transform hover:scale-105 active:scale-95 whitespace-nowrap cursor-pointer"
    style={{
      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
      outline: '2px solid white',
      outlineOffset: '-3px'
    }}>
    Contact Me
  </button>
);

const LiveProjectButton = () => (
  <button className="rounded-full border-2 border-[#D7E2EA] px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base font-medium uppercase tracking-widest text-[#D7E2EA] hover:bg-[#D7E2EA]/10 transition-colors whitespace-nowrap cursor-pointer">
    Live Project
  </button>
);

export default function JackProject() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const marqueeImagesRow1 = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
  ];

  const marqueeImagesRow2 = [
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif"
  ];

  const services = [
    { num: "01", name: "3D Modeling", desc: "Creation of detailed objects, characters, or environments tailored to specific client needs, ideal for games, products, and visualizations." },
    { num: "02", name: "Rendering", desc: "High-quality, photorealistic renders that showcase designs with custom lighting, textures, and materials to bring concepts to life." },
    { num: "03", name: "Motion Design", desc: "Dynamic animations and motion graphics that add energy and storytelling to brands, products, and digital experiences." },
    { num: "04", name: "Branding", desc: "Crafting cohesive visual identities -- from logos to full brand systems -- that communicate a clear and memorable presence." },
    { num: "05", name: "Web Design", desc: "Designing clean, modern, and conversion-focused websites with attention to layout, typography, and user experience." }
  ];

  const projects = [
    {
      id: "01", category: "Client", name: "Nextlevel Studio",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85"
    },
    {
      id: "02", category: "Personal", name: "Aura Brand Identity",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85"
    },
    {
      id: "03", category: "Client", name: "Solaris Digital",
      img1: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
      img2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
      img3: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85"
    }
  ];

  const marqueeRef = useRef<HTMLElement>(null);
  const marqueeTop = marqueeRef.current?.offsetTop || 0;
  const marqueeOffset = (scrollOffset - marqueeTop + (typeof window !== 'undefined' ? window.innerHeight : 0)) * 0.3;

  return (
    <div className="bg-[#0C0C0C] font-kanit overflow-x-clip text-white selection:bg-[#BBCCD7] selection:text-[#0C0C0C]">
      
      {/* 1. HERO SECTION */}
      <section className="h-screen flex flex-col overflow-x-clip relative">
        <FadeIn delay={0} y={-20}>
          <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 w-full z-20 relative">
            <a href="#about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">About</a>
            <a href="#price" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Price</a>
            <a href="#projects" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Projects</a>
            <a href="#contact" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">Contact</a>
          </nav>
        </FadeIn>

        <div className="flex-1 flex flex-col justify-between">
          <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-5 z-20 relative px-4">
            <FadeIn delay={0.15} y={40}>
              <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] text-center">
                Hi, i&apos;m jack
              </h1>
            </FadeIn>
          </div>

          <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 z-20 relative">
            <FadeIn delay={0.35} y={20}>
              <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px] text-[clamp(0.75rem,1.4vw,1.5rem)]">
                a 3d creator driven by crafting striking and unforgettable projects
              </p>
            </FadeIn>
            <FadeIn delay={0.5} y={20}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
          <Magnet padding={150} strength={3}>
            <img 
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png" 
              alt="Jack Portrait" 
              className="w-full h-auto object-contain drop-shadow-2xl"
            />
          </Magnet>
        </FadeIn>
      </section>

      {/* 2. MARQUEE SECTION */}
      <section ref={marqueeRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 bg-[#0C0C0C] overflow-hidden flex flex-col gap-3 pointer-events-none">
        {/* Row 1 (Right moving) */}
        <div 
          className="flex gap-3 will-change-transform w-max"
          style={{ transform: `translate3d(${marqueeOffset - 200}px, 0, 0)` }}
        >
          {[...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1].map((src, i) => (
            <img key={`r1-${i}`} src={src} alt="Project" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" />
          ))}
        </div>
        
        {/* Row 2 (Left moving) */}
        <div 
          className="flex gap-3 will-change-transform w-max"
          style={{ transform: `translate3d(${-(marqueeOffset - 200)}px, 0, 0)` }}
        >
          {[...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2].map((src, i) => (
            <img key={`r2-${i}`} src={src} alt="Project" className="w-[420px] h-[270px] rounded-2xl object-cover shrink-0" loading="lazy" />
          ))}
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="min-h-screen relative flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 overflow-hidden">
        {/* Decorative 3D Images */}
        <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png" alt="Moon" />
        </FadeIn>
        
        <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png" alt="3D Object" />
        </FadeIn>

        <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png" alt="Lego" />
        </FadeIn>

        <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]">
          <img src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png" alt="3D Group" />
        </FadeIn>

        <FadeIn delay={0} y={40} className="w-full">
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center text-[clamp(3rem,12vw,160px)]">
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 mt-10 sm:mt-14 md:mt-16 z-10 relative">
          <AnimatedText 
            text="With more than five years of experience in design, i focus on branding, web design, and user experience, i truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together!"
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px] text-[clamp(1rem,2vw,1.35rem)]"
          />
          <ContactButton />
        </div>
      </section>

      {/* 4. SERVICES SECTION */}
      <section id="price" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-20">
        <h2 className="text-[#0C0C0C] font-black uppercase text-center text-[clamp(3rem,12vw,160px)] mb-16 sm:mb-20 md:mb-28">
          Services
        </h2>

        <div className="max-w-5xl mx-auto flex flex-col">
          {services.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.1} className="flex gap-6 sm:gap-10 md:gap-16 py-8 sm:py-10 md:py-12 border-b border-[#0c0c0c26] first:border-t">
              <span className="font-black text-[#0C0C0C] text-[clamp(3rem,10vw,140px)] leading-none -mt-2">
                {svc.num}
              </span>
              <div className="flex flex-col gap-2 sm:gap-4 mt-2">
                <h3 className="font-medium uppercase text-[#0C0C0C] text-[clamp(1rem,2.2vw,2.1rem)] leading-none">
                  {svc.name}
                </h3>
                <p className="font-light leading-relaxed max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] text-[#0C0C0C] opacity-60">
                  {svc.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* 5. PROJECTS SECTION */}
      <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-30 pb-32">
        <div className="pt-20 sm:pt-24 md:pt-32 pb-10">
          <h2 className="hero-heading font-black uppercase text-center text-[clamp(3rem,12vw,160px)]">
            Project
          </h2>
        </div>

        <div className="px-5 sm:px-8 md:px-10 max-w-[1400px] mx-auto flex flex-col gap-6 relative" style={{ paddingBottom: '10vh' }}>
          {projects.map((proj, i) => {
            const targetScale = 1 - (projects.length - 1 - i) * 0.03;
            
            return (
              <div key={proj.id} className="sticky top-24 md:top-32 h-[85vh] flex flex-col justify-start w-full" style={{ top: `calc(6rem + ${i * 28}px)` }}>
                <motion.div 
                  className="w-full h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 flex flex-col"
                  initial={{ scale: 1 }}
                  whileInView={{ scale: targetScale }}
                  viewport={{ margin: "-100% 0px 100% 0px" }}
                  transition={{ ease: "easeOut", duration: 0.5 }}
                  style={{ transformOrigin: 'top center' }}
                >
                  {/* Top Row */}
                  <div className="flex flex-wrap sm:flex-nowrap justify-between items-center gap-4 sm:gap-6 mb-6">
                    <div className="flex items-center gap-4 sm:gap-6 lg:gap-10">
                      <span className="font-black text-[#D7E2EA] text-[clamp(3rem,8vw,100px)] leading-none">
                        {proj.id}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-[#D7E2EA]/60 uppercase tracking-widest text-xs sm:text-sm mb-1">{proj.category}</span>
                        <h3 className="font-medium uppercase text-[#D7E2EA] text-[clamp(1.5rem,3vw,3rem)] leading-none">{proj.name}</h3>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <LiveProjectButton />
                    </div>
                  </div>

                  {/* Bottom Row Images Grid */}
                  <div className="flex gap-4 sm:gap-6 flex-1 min-h-0">
                    <div className="w-[40%] flex flex-col gap-4 sm:gap-6 h-full">
                      <div className="w-full h-[clamp(130px,16vw,230px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
                        <img src={proj.img1} alt={`${proj.name} 1`} className="w-full h-full object-cover" />
                      </div>
                      <div className="w-full h-[clamp(160px,22vw,340px)] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
                        <img src={proj.img2} alt={`${proj.name} 2`} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="w-[60%] h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] overflow-hidden">
                      <img src={proj.img3} alt={`${proj.name} Main`} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FOOTER / CONTACT SECTION */}
      <footer id="contact" className="bg-[#0C0C0C] pt-20 pb-10 border-t border-[#D7E2EA]/20 relative z-40">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 md:px-10 flex flex-col items-center">
          <FadeIn delay={0.1} y={20} className="mb-10 sm:mb-16">
            <h2 className="hero-heading font-black uppercase text-center text-[clamp(2.5rem,8vw,100px)] leading-none mb-6">
              Let's create together
            </h2>
            <div className="flex justify-center">
              <ContactButton />
            </div>
          </FadeIn>
          
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 border-t border-[#D7E2EA]/10">
            <p className="text-[#D7E2EA]/60 font-light text-sm uppercase tracking-widest">
              © {new Date().getFullYear()} Jack 3D Creator
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-[#D7E2EA] hover:text-white transition-colors uppercase tracking-widest text-sm">Instagram</a>
              <a href="#" className="text-[#D7E2EA] hover:text-white transition-colors uppercase tracking-widest text-sm">Twitter</a>
              <a href="#" className="text-[#D7E2EA] hover:text-white transition-colors uppercase tracking-widest text-sm">Behance</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
