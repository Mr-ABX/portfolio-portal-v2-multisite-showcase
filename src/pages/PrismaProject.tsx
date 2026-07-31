import { useRef } from 'react';
import { motion, useScroll, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { WordsPullUp } from '../components/prisma/WordsPullUp';
import { WordsPullUpMultiStyle } from '../components/prisma/WordsPullUpMultiStyle';
import { AnimatedLetter } from '../components/prisma/AnimatedLetter';

export default function PrismaProject() {
  // About paragraph text
  const aboutText = "Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals.";
  const aboutChars = aboutText.split('');

  const aboutRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  // Ref for features section cards stagger
  const featuresRef = useRef<HTMLDivElement>(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, margin: '-100px' });

  return (
    <div className="prisma-project min-h-screen bg-black text-[#E1E0CC] selection:bg-primary/30 selection:text-white relative overflow-x-hidden">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen p-4 md:p-6 flex flex-col justify-between">
        <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden">
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4" 
              type="video/mp4" 
            />
            {/* Fallback video stream if CloudFront is unreachable */}
            <source 
              src="https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-459-large.mp4" 
              type="video/mp4" 
            />
          </video>

          {/* Noise & Gradient Overlays */}
          <div className="noise-overlay absolute inset-0 opacity-[0.7] mix-blend-overlay pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

          {/* Navbar */}
          <header className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
            <nav className="bg-black rounded-b-2xl md:rounded-b-3xl px-4 py-2 md:px-8 flex items-center justify-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 shadow-xl border-x border-b border-white/10">
              {["Our story", "Collective", "Workshops", "Programs", "Inquiries"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  style={{ color: 'rgba(225, 224, 204, 0.8)' }}
                  className="text-[10px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors hover:text-[#E1E0CC]"
                >
                  {item}
                </a>
              ))}
            </nav>
          </header>

          {/* Hero Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
              {/* Left 8 Columns - Giant Heading */}
              <div className="md:col-span-8">
                <h1 className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[20vw] xl:text-[19vw] 2xl:text-[20vw] font-medium leading-[0.85] tracking-[-0.07em] text-[#E1E0CC]">
                  <WordsPullUp text="Prisma" showAsterisk={true} />
                </h1>
              </div>

              {/* Right 4 Columns - Paragraph & CTA */}
              <div className="md:col-span-4 flex flex-col gap-5 sm:gap-6 items-start pb-2 md:pb-4">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-primary/70 text-xs sm:text-sm md:text-base leading-[1.2] max-w-md font-normal"
                >
                  Prisma is a worldwide network of visual artists, filmmakers and storytellers bound not by place, status or labels but by passion and hunger to unlock potential through our unique perspectives.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button className="bg-primary rounded-full px-5 py-2.5 sm:px-6 sm:py-3 flex items-center gap-2.5 sm:gap-3 text-black font-medium text-sm sm:text-base group hover:gap-3.5 transition-all duration-300 cursor-pointer shadow-lg">
                    <span>Join the lab</span>
                    <div className="bg-black rounded-full w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#E1E0CC]" />
                    </div>
                  </button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: ABOUT */}
      <section className="bg-black py-24 md:py-36 px-4 md:px-6 flex justify-center items-center">
        <div className="bg-[#101010] rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 lg:p-24 max-w-6xl w-full text-center flex flex-col items-center gap-8 md:gap-12 border border-white/5 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Label */}
          <span className="text-primary text-[10px] sm:text-xs tracking-widest uppercase font-medium">
            Visual arts
          </span>

          {/* Main Heading */}
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'I am Marcus Chen,', className: 'font-normal text-[#E1E0CC]' },
                { text: 'a self-taught director.', className: 'italic font-serif text-[#E1E0CC]' },
                { text: 'I have skills in color grading, visual effects, and narrative design.', className: 'font-normal text-[#E1E0CC]' }
              ]}
            />
          </div>

          {/* Character Opacity Scroll Paragraph */}
          <div ref={aboutRef} className="max-w-2xl mx-auto mt-2 sm:mt-4">
            <p className="text-[#DEDBC8] text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              {aboutChars.map((char, index) => (
                <AnimatedLetter
                  key={index}
                  char={char}
                  progress={scrollYProgress}
                  index={index}
                  totalChars={aboutChars.length}
                />
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FEATURES */}
      <section className="relative min-h-screen bg-black py-24 md:py-32 px-4 md:px-8 overflow-hidden">
        {/* Subtle Background Noise Overlay */}
        <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto relative z-10">
          {/* Header Text */}
          <div className="mb-16 max-w-4xl mx-auto text-center">
            <WordsPullUpMultiStyle
              segments={[
                { text: 'Studio-grade workflows for visionary creators.', className: 'text-[#E1E0CC] block font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2' },
                { text: 'Built for pure vision. Powered by art.', className: 'text-gray-500 block font-normal text-xl sm:text-2xl md:text-3xl lg:text-4xl' }
              ]}
            />
          </div>

          {/* 4-Column Card Grid */}
          <div 
            ref={featuresRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2 md:gap-1 lg:h-[480px]"
          >
            {/* Card 1 - Video Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0 * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[360px] sm:h-[420px] lg:h-full group border border-white/10"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source 
                  src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4" 
                  type="video/mp4" 
                />
                <source 
                  src="https://assets.mixkit.co/videos/preview/mixkit-set-of-plateaus-seen-from-the-sky-in-a-white-31956-large.mp4" 
                  type="video/mp4" 
                />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#E1E0CC] text-xl sm:text-2xl font-medium tracking-tight">
                  Your creative canvas.
                </p>
              </div>
            </motion.div>

            {/* Card 2 - Project Storyboard. (01) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, delay: 1 * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-[360px] sm:h-[420px] lg:h-full border border-white/5 hover:border-white/15 transition-colors group"
            >
              <div>
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
                  alt="Project Storyboard Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-5 border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-4">
                  01. Project Storyboard.
                </h3>
                <ul className="space-y-3">
                  {[
                    "Visual scene breakdown",
                    "Automated shot sequencing",
                    "Real-time collaborative notes",
                    "Multi-format story exports"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#learn-more" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:text-white transition-colors mt-4 group/link"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Card 3 - Smart Critiques. (02) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, delay: 2 * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-[360px] sm:h-[420px] lg:h-full border border-white/5 hover:border-white/15 transition-colors group"
            >
              <div>
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
                  alt="Smart Critiques Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-5 border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-4">
                  02. Smart Critiques.
                </h3>
                <ul className="space-y-3">
                  {[
                    "AI-driven frame analysis",
                    "Automated director notes",
                    "Seamless NLE tool integrations"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#learn-more" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:text-white transition-colors mt-4 group/link"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>

            {/* Card 4 - Immersion Capsule. (03) */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={isFeaturesInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.8, delay: 3 * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#212121] rounded-2xl md:rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-[360px] sm:h-[420px] lg:h-full border border-white/5 hover:border-white/15 transition-colors group"
            >
              <div>
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
                  alt="Immersion Capsule Icon"
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover mb-5 border border-white/10"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=200&q=80';
                  }}
                />
                <h3 className="text-lg sm:text-xl font-medium text-[#E1E0CC] mb-4">
                  03. Immersion Capsule.
                </h3>
                <ul className="space-y-3">
                  {[
                    "Notification silencing mode",
                    "Generative ambient soundscapes",
                    "Automated focus schedule syncing"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-gray-400 text-xs sm:text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a 
                href="#learn-more" 
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary hover:text-white transition-colors mt-4 group/link"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5 transform -rotate-45 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
