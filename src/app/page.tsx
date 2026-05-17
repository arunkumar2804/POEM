"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import Lenis from "lenis";
import { MapPin } from "lucide-react";
import React from "react";

// --------------------------------------------------
// UTILS


// --------------------------------------------------
// 1. CINEMATIC INTRO LOADER
// --------------------------------------------------
function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(1); // "Every love story becomes a memory."
      await new Promise((r) => setTimeout(r, 4000));
      setStep(2); // "Ours became a POEM."
      await new Promise((r) => setTimeout(r, 3500));
      setStep(3); // "PO → Pooja", "EM → Hemnath"
      await new Promise((r) => setTimeout(r, 4000));
      setStep(4); // Merge to POEM
      await new Promise((r) => setTimeout(r, 3500));
      onComplete();
    };
    sequence();
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-ivory overflow-hidden"
    >
      {/* Ambient Loader Particles */}
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[60vw] h-[60vw] rounded-full bg-maroon/20 blur-[120px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p
            key="step1"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="font-serif text-xl md:text-3xl text-beige tracking-[0.2em] text-center px-6"
          >
            Every love story becomes a memory.
          </motion.p>
        )}
        {step === 2 && (
          <motion.p
            key="step2"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="font-serif text-3xl md:text-5xl text-champagne text-center px-6 italic font-light tracking-wide"
          >
            Ours became a POEM.
          </motion.p>
        )}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
          >
            <div className="text-center relative">
              <h2 className="font-serif text-7xl md:text-9xl text-ivory tracking-wider">PO</h2>
              <p className="font-cursive text-4xl md:text-6xl text-champagne absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-90">Pooja</p>
            </div>
            <div className="w-px h-24 md:w-24 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
            <div className="text-center relative">
              <h2 className="font-serif text-7xl md:text-9xl text-ivory tracking-wider">EM</h2>
              <p className="font-cursive text-4xl md:text-6xl text-champagne absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-90">Hemnath</p>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 1.2, filter: "blur(30px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
            transition={{ duration: 2.5, ease: "easeOut" }}
            className="text-center"
          >
            <h1 className="font-serif text-7xl md:text-[12rem] leading-none text-champagne gold-glow tracking-[0.2em] ml-[0.2em]">
              POEM
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --------------------------------------------------
// MAIN PAGE CONTENT
// --------------------------------------------------
export default function WeddingWebsite() {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Master Scroll Progress
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Global Environmental Morphing (Background Color)
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    ["#0a0505", "#140a0a", "#1a1614", "#0a0a0a", "#120e0c", "#000000"]
  );

  return (
    <motion.main 
      ref={containerRef}
      style={{ backgroundColor }}
      className="min-h-screen text-ivory relative overflow-x-hidden selection:bg-champagne/30 selection:text-ivory"
    >
      {/* Global Cinematic Grain */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-[2s] ease-in-out ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <HeroScene scrollYProgress={scrollYProgress} />
        <StorytellingScene />
        <ShowcaseScene />
        <DetailsScene />
        <VenueScene />
        <GalleryScene />
        <CountdownEndingScene />
      </div>
    </motion.main>
  );
}

// --------------------------------------------------
// SCENE 2: HERO EXPERIENCE (Cinematic Depth)
// --------------------------------------------------
function HeroScene({ scrollYProgress }: { scrollYProgress: any }) {
  // Fake Camera Movement
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.15]);
  const yBg = useTransform(scrollYProgress, [0, 0.2], ["0%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 0.2], ["0%", "-40%"]);
  const opacityText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section className="relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
      
      {/* Layer 1: Far Background Typography */}
      <motion.div style={{ y: yBg, scale }} className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <h1 className="font-serif text-[30vw] whitespace-nowrap text-beige">POEM</h1>
      </motion.div>

      {/* Layer 2: Main Hero Image Placeholder */}
      <motion.div style={{ y: useTransform(scrollYProgress, [0, 0.2], ["0%", "15%"]), scale }} className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 placeholder-glow opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0505] via-transparent to-[#0a0505]/50" />
        <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
           <span className="text-champagne/40 font-sans tracking-widest text-xs border border-champagne/20 px-6 py-3 rounded-full uppercase backdrop-blur-md">
            [ HERO COUPLE IMAGE PLACEHOLDER ]
          </span>
        </div>
      </motion.div>

      {/* Layer 3: Typography Layer */}
      <motion.div style={{ y: yText, opacity: opacityText }} className="relative z-10 w-full px-6 flex flex-col items-center pt-[20vh]">
        <div className="text-center relative">
          <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-ivory tracking-widest leading-[0.85]"
          >
            Pooja
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, delay: 1, ease: "easeOut" }}
            className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2"
          >
            <span className="font-cursive text-5xl md:text-8xl text-champagne">&</span>
          </motion.div>
        </div>
        <motion.h1 
            initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
            className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-ivory tracking-widest leading-[0.85] mt-4 md:mt-8 ml-0 md:ml-32"
          >
            Hemnath
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="mt-16 md:mt-24 flex items-center gap-6"
        >
          <div className="w-12 md:w-24 h-px bg-bronze/50" />
          <p className="font-sans font-light tracking-[0.4em] text-beige text-xs md:text-sm uppercase">6 September 2026</p>
          <div className="w-12 md:w-24 h-px bg-bronze/50" />
        </motion.div>
      </motion.div>

    </section>
  );
}

// --------------------------------------------------
// SCENE 3: POETIC STORYTELLING
// --------------------------------------------------
function StorytellingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0.1, 0.4], [150, -50]);
  const op1 = useTransform(scrollYProgress, [0.1, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const blur1 = useTransform(scrollYProgress, [0.1, 0.25, 0.35, 0.4], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const y2 = useTransform(scrollYProgress, [0.35, 0.65], [150, -50]);
  const op2 = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const blur2 = useTransform(scrollYProgress, [0.35, 0.5, 0.6, 0.65], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  const y3 = useTransform(scrollYProgress, [0.6, 0.9], [150, -50]);
  const op3 = useTransform(scrollYProgress, [0.6, 0.75, 0.85, 0.9], [0, 1, 1, 0]);
  const blur3 = useTransform(scrollYProgress, [0.6, 0.75, 0.85, 0.9], ["blur(20px)", "blur(0px)", "blur(0px)", "blur(20px)"]);

  return (
    <section ref={ref} className="h-[250vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        
        {/* Giant Background Atmosphere Text */}
        <motion.div 
          style={{ opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.05, 0]), scale: useTransform(scrollYProgress, [0, 1], [0.8, 1.2]) }}
          className="absolute font-serif text-[40vw] text-champagne whitespace-nowrap pointer-events-none"
        >
          ETERNITY
        </motion.div>

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <motion.h2 style={{ y: y1, opacity: op1, filter: blur1 }} className="absolute font-serif text-4xl md:text-7xl lg:text-8xl text-beige italic font-light text-center">
            "In silence, we met."
          </motion.h2>

          <motion.h2 style={{ y: y2, opacity: op2, filter: blur2 }} className="absolute font-serif text-4xl md:text-7xl lg:text-8xl text-beige italic font-light text-center">
            "In laughter, we stayed."
          </motion.h2>

          <motion.h2 style={{ y: y3, opacity: op3, filter: blur3 }} className="absolute font-serif text-5xl md:text-8xl lg:text-9xl text-champagne gold-glow italic font-light text-center">
            "In love, we became POEM."
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// SCENE 4: COUPLE SHOWCASE (Asymmetrical Parallax)
// --------------------------------------------------
function ShowcaseScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const yImage1 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], ["-10%", "30%"]);
  const yText = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} className="py-32 md:py-64 relative px-6 md:px-12 max-w-[100vw] overflow-hidden">
      
      {/* Background overlapping text */}
      <motion.div style={{ x: useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]) }} className="absolute top-1/4 -left-[20%] text-[20vw] font-serif text-white/[0.02] pointer-events-none whitespace-nowrap">
        THE ROMANCE
      </motion.div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
        
        {/* Left Column Image */}
        <div className="lg:col-span-5 lg:col-start-1 mt-0 lg:mt-32">
          <motion.div style={{ y: yImage1 }} className="w-full aspect-[3/4] relative group">
            <div className="absolute inset-0 placeholder-glow opacity-40 border border-white/5" />
            <div className="absolute inset-0 bg-[#1a1614]/50 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-champagne/60 font-sans tracking-[0.2em] text-[10px] md:text-xs border border-champagne/20 px-4 py-2 rounded-full uppercase backdrop-blur-sm">
                [ COUPLE PORTRAIT PLACEHOLDER ]
              </span>
            </div>
            
            {/* Decorative Floating Element */}
            <div className="absolute -bottom-12 -right-12 font-cursive text-6xl text-beige/20 -rotate-12 pointer-events-none">Pooja</div>
          </motion.div>
        </div>

        {/* Center Typography */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-center py-24 lg:py-0">
          <motion.div style={{ y: yText }} className="relative z-20 mix-blend-difference">
            <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] text-ivory tracking-wider uppercase">
              Two Souls<br />
              <span className="italic font-light text-beige">One Journey</span>
            </h2>
            <div className="w-full max-w-sm h-px bg-gradient-to-r from-champagne via-champagne to-transparent my-12" />
            <p className="font-sans font-light tracking-wide text-beige/80 text-sm md:text-base leading-relaxed max-w-md ml-0 lg:ml-24">
              A journey of a thousand miles begins with a single step. Ours began with a glance, a smile, and a promise to walk together forever, creating a cinematic symphony of moments.
            </p>
          </motion.div>
        </div>

        {/* Right Floating Image */}
        <div className="lg:col-span-4 lg:col-start-9 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 w-full lg:w-[350px]">
          <motion.div style={{ y: yImage2 }} className="w-full aspect-[4/5] relative group z-0">
            <div className="absolute inset-0 placeholder-glow opacity-30 border border-white/5" />
            <div className="absolute inset-0 bg-[#0a0505]/40 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
            <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
              <span className="text-champagne/60 font-sans tracking-[0.2em] text-[10px] border border-champagne/20 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                [ ENGAGEMENT PLACEHOLDER ]
              </span>
            </div>
            <div className="absolute -top-16 -left-16 font-cursive text-6xl text-beige/20 rotate-12 pointer-events-none">Hemnath</div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

// --------------------------------------------------
// SCENE 5: WEDDING DETAILS (Cinematic Reveal)
// --------------------------------------------------
function DetailsScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);

  return (
    <section ref={ref} className="py-32 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background ambient light */}
      <motion.div 
        style={{ scale, opacity }}
        className="absolute w-[80vw] h-[80vw] rounded-full bg-champagne/5 blur-[150px] pointer-events-none" 
      />

      <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
        
        <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-bronze uppercase mb-24 relative inline-block">
          The Auspicious Occasion
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-px bg-bronze" />
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 w-full items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex flex-col items-center"
          >
            <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory mb-4">06</span>
            <span className="font-sans text-xs tracking-[0.3em] text-beige/60 uppercase">September<br/>2026</span>
          </motion.div>

          <div className="hidden md:flex flex-col items-center justify-center h-full">
            <div className="w-px h-32 bg-gradient-to-b from-transparent via-champagne/30 to-transparent" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col items-center relative"
          >
            {/* Glowing Text */}
            <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-champagne gold-glow whitespace-nowrap mb-4 relative z-10">
              7:45 <span className="text-2xl md:text-3xl">AM</span>
            </span>
            <span className="font-sans text-xs tracking-[0.3em] text-beige/60 uppercase relative z-10">Muhurtham</span>
            
            <div className="mt-12 pt-8 border-t border-white/5 relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-champagne/30 blur-[2px]" />
              <span className="font-cursive text-2xl text-beige italic">Followed by Breakfast</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// SCENE 6: VENUE EXPERIENCE
// --------------------------------------------------
function VenueScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="py-32 relative overflow-hidden">
      
      {/* Giant Environmental Text */}
      <motion.div style={{ y: yBg }} className="absolute top-0 left-0 w-full text-center pointer-events-none opacity-[0.02]">
        <h2 className="font-serif text-[25vw] leading-none">VENUE</h2>
      </motion.div>

      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
        
        {/* Left: Venue Image */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(20px)", scale: 0.9 }}
          whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full aspect-[4/3] lg:aspect-square relative overflow-hidden border border-white/5 group"
        >
          <div className="absolute inset-0 placeholder-glow opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000">
            <span className="text-champagne/50 font-sans tracking-[0.2em] text-[10px] md:text-xs border border-champagne/20 px-6 py-3 rounded-full uppercase backdrop-blur-md">
              [ VENUE IMAGE PLACEHOLDER ]
            </span>
          </div>
        </motion.div>

        {/* Right: Venue Typography */}
        <div className="flex flex-col items-start space-y-10">
          <p className="font-sans text-[10px] tracking-[0.4em] text-bronze uppercase">The Location</p>
          
          <h3 className="font-serif text-5xl md:text-7xl lg:text-[6rem] text-ivory leading-[0.9] tracking-wide">
            Sai Villa <br />
            <span className="italic font-light text-beige">Events</span>
          </h3>

          <div className="flex items-start gap-4">
            <MapPin className="text-champagne mt-1 opacity-80" size={24} />
            <p className="font-sans font-light tracking-[0.1em] text-beige text-lg md:text-xl leading-relaxed">
              Neelankarai, Chennai<br />
              <span className="text-sm opacity-60 uppercase tracking-widest mt-2 block">Tamil Nadu, India</span>
            </p>
          </div>

          <a 
            href="https://maps.google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center px-10 py-5 overflow-hidden mt-8"
          >
            <div className="absolute inset-0 border border-champagne/30 rounded-sm group-hover:bg-champagne transition-colors duration-700" />
            <span className="relative font-sans text-xs tracking-[0.2em] uppercase text-champagne group-hover:text-[#0a0505] transition-colors duration-700 z-10">
              Navigate to Venue
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

// --------------------------------------------------
// SCENE 7: IMMERSIVE GALLERY
// --------------------------------------------------
function GalleryScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  // Independent Parallax for Columns
  const yCol1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], ["20%", "-10%"]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], ["-10%", "-40%"]);

  return (
    <section ref={ref} className="py-32 md:py-48 relative overflow-hidden bg-[#050505]">
      
      <div className="text-center mb-32 relative z-20">
        <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase mb-6">Moments</h2>
        <p className="font-cursive text-4xl md:text-5xl text-beige italic">Captured in Time</p>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        
        {/* Col 1 */}
        <motion.div style={{ y: yCol1 }} className="flex flex-col gap-8">
          <GalleryItem aspect="aspect-[3/4]" />
          <GalleryItem aspect="aspect-square" />
        </motion.div>

        {/* Col 2 */}
        <motion.div style={{ y: yCol2 }} className="flex flex-col gap-8">
          <GalleryItem aspect="aspect-[4/5]" />
          <GalleryItem aspect="aspect-[3/4]" />
        </motion.div>

        {/* Col 3 */}
        <motion.div style={{ y: yCol3 }} className="flex flex-col gap-8 md:hidden lg:flex">
          <GalleryItem aspect="aspect-square" />
          <GalleryItem aspect="aspect-[4/5]" />
        </motion.div>

      </div>

      {/* Atmospheric Fog at bottom of gallery */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#000] to-transparent z-20 pointer-events-none" />
    </section>
  );
}

function GalleryItem({ aspect }: { aspect: string }) {
  return (
    <div className={`w-full ${aspect} relative group overflow-hidden border border-white/5`}>
      <div className="absolute inset-0 placeholder-glow opacity-10 group-hover:opacity-30 transition-opacity duration-1000 scale-110 group-hover:scale-100 ease-out" />
      <div className="absolute inset-0 bg-[#0a0505]/60 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-50 group-hover:opacity-100 transition-opacity duration-700">
        <span className="text-champagne/40 font-sans tracking-[0.2em] text-[8px] md:text-[10px] border border-champagne/10 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
          [ GALLERY IMAGE PLACEHOLDER ]
        </span>
      </div>
    </div>
  );
}

// --------------------------------------------------
// SCENE 8 & 9: COUNTDOWN & FINAL ENDING
// --------------------------------------------------
function CountdownEndingScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  
  // Fade everything out at the very end
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.8, 1], [1, 1.1]);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const target = new Date("2026-09-06T07:45:00").getTime();
    const interval = setInterval(() => {
      const distance = target - new Date().getTime();
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="relative min-h-[150vh] flex flex-col justify-between bg-black pt-32 overflow-hidden">
      
      {/* Floating particles background for ending */}
      <div className="absolute inset-0 placeholder-glow opacity-5 mix-blend-overlay pointer-events-none" />

      {/* Countdown Part */}
      <div className="w-full flex flex-col items-center z-10 relative">
        <p className="font-sans text-[10px] tracking-[0.5em] text-bronze uppercase mb-16 relative">
          The Wait
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-12 bg-bronze/30" />
        </p>

        <div className="flex justify-center gap-8 md:gap-16 px-6 mt-12">
          {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Mins", value: timeLeft.minutes },
            { label: "Secs", value: timeLeft.seconds },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <span className="font-serif text-5xl md:text-7xl lg:text-8xl text-champagne gold-glow tracking-wider font-light">
                {String(unit.value).padStart(2, '0')}
              </span>
              <span className="font-sans text-[9px] md:text-xs tracking-[0.3em] text-beige/50 uppercase mt-6">
                {unit.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Final Ending Part */}
      <motion.div 
        style={{ opacity, scale }}
        className="h-screen w-full flex flex-col items-center justify-center relative z-20"
      >
        <p className="font-serif text-2xl md:text-4xl text-beige italic mb-12 font-light">
          Thank you for being part of our
        </p>
        <h2 className="font-serif text-[15vw] md:text-[12rem] leading-none text-champagne gold-glow tracking-widest ml-[0.1em]">
          POEM
        </h2>
        
        {/* Subtle scroll hint to black */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-champagne/50 to-transparent" />
      </motion.div>
    </section>
  );
}
