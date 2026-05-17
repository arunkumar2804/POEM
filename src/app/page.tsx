"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --------------------------------------------------
// 1. CINEMATIC INTRO LOADER
// --------------------------------------------------
function IntroLoader({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const sequence = async () => {
      await new Promise((r) => setTimeout(r, 1000));
      setStep(1); 
      await new Promise((r) => setTimeout(r, 2500));
      setStep(2); 
      await new Promise((r) => setTimeout(r, 2500));
      setStep(3); 
      await new Promise((r) => setTimeout(r, 3000));
      setStep(4); 
      await new Promise((r) => setTimeout(r, 3000));
      onComplete();
    };
    sequence();
    return () => { document.body.style.overflow = "auto"; };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 2, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505] text-ivory overflow-hidden"
    >
      <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      
      {/* Cinematic Fog */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[80vw] h-[80vw] rounded-full bg-maroon/10 blur-[120px] pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.p
            key="step1"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="font-serif text-xl md:text-3xl text-beige tracking-[0.2em] text-center px-6 font-light"
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
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="flex flex-col md:flex-row items-center gap-16 md:gap-24"
          >
            <div className="text-center relative">
              <h2 className="font-serif text-7xl md:text-9xl text-ivory tracking-wider">PO</h2>
              <p className="font-cursive text-4xl md:text-6xl text-champagne absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-90">Pooja</p>
            </div>
            <div className="w-px h-24 md:w-32 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-transparent via-bronze/50 to-transparent" />
            <div className="text-center relative">
              <h2 className="font-serif text-7xl md:text-9xl text-ivory tracking-wider">EM</h2>
              <p className="font-cursive text-4xl md:text-6xl text-champagne absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-90">Hemnath</p>
            </div>
          </motion.div>
        )}
        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(30px)" }}
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

  // Initialize smooth scrolling with Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // GSAP SCROLL SYNCHRONIZATION
  useLayoutEffect(() => {
    if (loading) return;

    let ctx = gsap.context(() => {
      
      // 1. Hero Parallax
      gsap.to(".hero-bg-text", {
        yPercent: -30,
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(".hero-image", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
      });
      gsap.to(".hero-content", {
        yPercent: -50,
        opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ".hero-section", start: "top top", end: "bottom top", scrub: 1 }
      });

      // 2. Environmental Background Color Morphing
      gsap.to(".master-container", {
        backgroundColor: "#140a0a",
        ease: "none",
        scrollTrigger: { trigger: ".story-section", start: "top bottom", end: "top top", scrub: true }
      });
      gsap.to(".master-container", {
        backgroundColor: "#050505",
        ease: "none",
        scrollTrigger: { trigger: ".showcase-section", start: "top bottom", end: "top top", scrub: true }
      });
      gsap.to(".master-container", {
        backgroundColor: "#1a1614",
        ease: "none",
        scrollTrigger: { trigger: ".venue-section", start: "top bottom", end: "top top", scrub: true }
      });
      gsap.to(".master-container", {
        backgroundColor: "#000000",
        ease: "none",
        scrollTrigger: { trigger: ".ending-section", start: "top bottom", end: "top top", scrub: true }
      });

      // 3. Poetic Storytelling Lines
      const storyTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".story-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        }
      });

      const storyLines = gsap.utils.toArray(".story-line") as HTMLElement[];
      storyLines.forEach((line, i) => {
        storyTimeline.fromTo(line, 
          { opacity: 0, y: 50, filter: "blur(20px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 2 },
          i === 0 ? "+=0.5" : "+=1.5"
        );
        
        if (i < storyLines.length - 1) {
          // Keep it on screen longer, then fade out
          storyTimeline.to(line, { opacity: 0, y: -50, filter: "blur(20px)", duration: 2 }, "+=2");
        } else {
          // Keep the final line on screen much longer before fading out
          storyTimeline.to(line, { opacity: 0, scale: 1.1, filter: "blur(20px)", duration: 2 }, "+=4");
        }
      });

      // 4. Showcase Parallax Depths
      gsap.to(".showcase-bg-text", {
        xPercent: 20,
        ease: "none",
        scrollTrigger: { trigger: ".showcase-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".showcase-img-1", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: ".showcase-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".showcase-img-2", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".showcase-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.from(".showcase-text", {
        yPercent: 30,
        opacity: 0,
        scrollTrigger: { trigger: ".showcase-section", start: "top 80%", end: "top 30%", scrub: 1 }
      });

      // 5. Details Reveal
      gsap.from(".details-item", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        scrollTrigger: { trigger: ".details-section", start: "top 70%", end: "top 30%", scrub: 1 }
      });

      // 6. Venue Parallax
      gsap.to(".venue-bg-text", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: { trigger: ".venue-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.from(".venue-image", {
        scale: 0.9,
        filter: "blur(20px)",
        scrollTrigger: { trigger: ".venue-section", start: "top 80%", end: "center center", scrub: 1 }
      });

      // 7. Gallery Staggered Parallax
      gsap.to(".gallery-col-1", {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".gallery-col-2", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });
      gsap.to(".gallery-col-3", {
        yPercent: -35,
        ease: "none",
        scrollTrigger: { trigger: ".gallery-section", start: "top bottom", end: "bottom top", scrub: 1 }
      });

      // 8. Ending Fade
      gsap.fromTo(".ending-content", 
        { opacity: 0, scale: 0.9, filter: "blur(20px)" },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          ease: "none",
          scrollTrigger: { 
            trigger: ".ending-section", 
            start: "center center", 
            end: "bottom bottom", 
            scrub: 1 
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, [loading]);

  return (
    <main 
      ref={containerRef}
      className="master-container min-h-screen text-ivory relative overflow-x-hidden selection:bg-champagne/30 selection:text-ivory bg-[#050505]"
    >
      {/* Persistent Global Atmosphere */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      
      <AnimatePresence>
        {loading && <IntroLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`transition-opacity duration-[2s] ease-in-out ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        
        {/* SCENE 2: HERO EXPERIENCE */}
        <section className="hero-section relative h-[120vh] w-full flex items-center justify-center overflow-hidden">
          {/* Layer 1: Far Cinematic Background Typography */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none hero-bg-text">
            <h1 className="font-serif text-[40vw] whitespace-nowrap text-beige">POEM</h1>
          </div>

          {/* Layer 2: Main Environment Texture */}
          <div className="absolute inset-0 w-full h-full hero-image">
            <div className="absolute inset-0 placeholder-glow opacity-30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
            <div className="absolute inset-0 flex items-center justify-center mix-blend-overlay">
               <span className="text-champagne/40 font-sans tracking-widest text-xs border border-champagne/20 px-6 py-3 rounded-full uppercase backdrop-blur-md">
                [ HERO COUPLE IMAGE PLACEHOLDER ]
              </span>
            </div>
          </div>

          {/* Layer 3: Foreground Cinematic Typography */}
          <div className="relative z-10 w-full px-6 flex flex-col items-center pt-[20vh] hero-content mix-blend-difference">
            <div className="text-center relative">
              <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-ivory tracking-widest leading-[0.85]">Pooja</h1>
              <div className="absolute -right-8 md:-right-16 top-1/2 -translate-y-1/2">
                <span className="font-cursive text-5xl md:text-8xl text-champagne">&</span>
              </div>
            </div>
            <h1 className="font-serif text-6xl md:text-8xl lg:text-[9rem] text-ivory tracking-widest leading-[0.85] mt-4 md:mt-8 ml-0 md:ml-32">
                Hemnath
            </h1>
            <div className="mt-16 md:mt-24 flex items-center gap-6">
              <div className="w-12 md:w-24 h-px bg-bronze/50" />
              <p className="font-sans font-light tracking-[0.4em] text-beige text-xs md:text-sm uppercase">6 September 2026</p>
              <div className="w-12 md:w-24 h-px bg-bronze/50" />
            </div>
          </div>
        </section>

        {/* SCENE 3: POETIC STORYTELLING */}
        <section className="story-section h-[600vh] relative">
          <div className="sticky top-0 h-screen flex justify-center items-center overflow-hidden px-6">
            <div className="story-line absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-4xl md:text-7xl lg:text-8xl text-beige italic font-light text-center">
                "In silence, we met."
              </h2>
            </div>
            <div className="story-line absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-4xl md:text-7xl lg:text-8xl text-beige italic font-light text-center">
                "In laughter, we stayed."
              </h2>
            </div>
            <div className="story-line absolute inset-0 flex items-center justify-center">
              <h2 className="font-serif text-5xl md:text-8xl lg:text-9xl text-champagne gold-glow italic font-light text-center">
                "In love, we became POEM."
              </h2>
            </div>
          </div>
        </section>

        {/* SCENE 4: COUPLE SHOWCASE */}
        <section className="showcase-section py-32 md:py-64 relative px-6 md:px-12 max-w-[100vw] overflow-hidden">
          {/* Layered typography background */}
          <div className="showcase-bg-text absolute top-1/4 -left-[20%] text-[20vw] font-serif text-white/[0.02] pointer-events-none whitespace-nowrap">
            THE ROMANCE
          </div>

          <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10">
            {/* Image 1 */}
            <div className="lg:col-span-5 lg:col-start-1 mt-0 lg:mt-32">
              <div className="showcase-img-1 w-full aspect-[3/4] relative group">
                <div className="absolute inset-0 placeholder-glow opacity-40 border border-white/5" />
                <div className="absolute inset-0 bg-[#050505]/50 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <span className="text-champagne/60 font-sans tracking-[0.2em] text-[10px] md:text-xs border border-champagne/20 px-4 py-2 rounded-full uppercase backdrop-blur-sm">
                    [ COUPLE PORTRAIT PLACEHOLDER ]
                  </span>
                </div>
                <div className="absolute -bottom-12 -right-12 font-cursive text-6xl text-beige/20 -rotate-12 pointer-events-none">Pooja</div>
              </div>
            </div>

            {/* Typography */}
            <div className="showcase-text lg:col-span-6 lg:col-start-7 flex flex-col justify-center py-24 lg:py-0 relative z-20">
              <h2 className="font-serif text-5xl md:text-7xl lg:text-[7rem] leading-[0.9] text-ivory tracking-wider uppercase mix-blend-difference">
                Two Souls<br />
                <span className="italic font-light text-beige">One Journey</span>
              </h2>
              <div className="w-full max-w-sm h-px bg-gradient-to-r from-champagne via-champagne to-transparent my-12" />
              <p className="font-sans font-light tracking-wide text-beige/80 text-sm md:text-base leading-relaxed max-w-md lg:ml-24">
                A journey of a thousand miles begins with a single step. Ours began with a glance, a smile, and a promise to walk together forever, creating a cinematic symphony of moments.
              </p>
            </div>

            {/* Image 2 */}
            <div className="showcase-img-2 lg:col-span-4 lg:col-start-9 lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 w-full lg:w-[350px]">
              <div className="w-full aspect-[4/5] relative group z-0">
                <div className="absolute inset-0 placeholder-glow opacity-30 border border-white/5" />
                <div className="absolute inset-0 bg-[#050505]/40 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <span className="text-champagne/60 font-sans tracking-[0.2em] text-[10px] border border-champagne/20 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
                    [ ENGAGEMENT PLACEHOLDER ]
                  </span>
                </div>
                <div className="absolute -top-16 -left-16 font-cursive text-6xl text-beige/20 rotate-12 pointer-events-none">Hemnath</div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 5: WEDDING DETAILS */}
        <section className="details-section py-40 min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="absolute w-[80vw] h-[80vw] rounded-full bg-champagne/5 blur-[150px] pointer-events-none" />

          <div className="max-w-5xl mx-auto px-6 w-full relative z-10 flex flex-col items-center text-center">
            <p className="details-item font-sans text-[10px] md:text-xs tracking-[0.4em] text-bronze uppercase mb-24 relative inline-block">
              The Auspicious Occasion
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-px bg-bronze" />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-0 w-full items-center">
              <div className="details-item flex flex-col items-center">
                <span className="font-serif text-5xl md:text-6xl lg:text-7xl text-ivory mb-4">06</span>
                <span className="font-sans text-xs tracking-[0.3em] text-beige/60 uppercase">September<br/>2026</span>
              </div>

              <div className="details-item hidden md:flex flex-col items-center justify-center h-full">
                <div className="w-px h-32 bg-gradient-to-b from-transparent via-champagne/30 to-transparent" />
              </div>

              <div className="details-item flex flex-col items-center relative">
                <span className="font-serif text-4xl md:text-5xl lg:text-6xl text-champagne gold-glow whitespace-nowrap mb-4">
                  7:45 <span className="text-2xl md:text-3xl">AM</span>
                </span>
                <span className="font-sans text-xs tracking-[0.3em] text-beige/60 uppercase">Muhurtham</span>
                
                <div className="mt-12 pt-8 border-t border-white/5 relative w-full">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-champagne/30 blur-[2px]" />
                  <span className="font-cursive text-2xl text-beige italic">Followed by Breakfast</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENE 6: VENUE EXPERIENCE */}
        <section className="venue-section py-32 relative overflow-hidden">
          <div className="venue-bg-text absolute top-0 left-0 w-full text-center pointer-events-none opacity-[0.02]">
            <h2 className="font-serif text-[25vw] leading-none">VENUE</h2>
          </div>

          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center relative z-10">
            <div className="venue-image w-full aspect-[4/3] lg:aspect-square relative overflow-hidden border border-white/5 group">
              <div className="absolute inset-0 placeholder-glow opacity-20" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000">
                <span className="text-champagne/50 font-sans tracking-[0.2em] text-[10px] md:text-xs border border-champagne/20 px-6 py-3 rounded-full uppercase backdrop-blur-md">
                  [ VENUE IMAGE PLACEHOLDER ]
                </span>
              </div>
            </div>

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

        {/* SCENE 7: IMMERSIVE GALLERY */}
        <section className="gallery-section py-32 md:py-48 relative overflow-hidden">
          <div className="text-center mb-32 relative z-20">
            <h2 className="font-serif text-sm tracking-[0.5em] text-bronze uppercase mb-6">Moments</h2>
            <p className="font-cursive text-4xl md:text-5xl text-beige italic">Captured in Time</p>
          </div>

          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            <div className="gallery-col-1 flex flex-col gap-8">
              <GalleryItem aspect="aspect-[3/4]" />
              <GalleryItem aspect="aspect-square" />
            </div>
            <div className="gallery-col-2 flex flex-col gap-8">
              <GalleryItem aspect="aspect-[4/5]" />
              <GalleryItem aspect="aspect-[3/4]" />
            </div>
            <div className="gallery-col-3 flex flex-col gap-8 md:hidden lg:flex">
              <GalleryItem aspect="aspect-square" />
              <GalleryItem aspect="aspect-[4/5]" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#000] to-transparent z-20 pointer-events-none" />
        </section>

        {/* SCENE 8 & 9: COUNTDOWN & FINAL ENDING */}
        <section className="ending-section relative h-[150vh] flex flex-col justify-between pt-32 overflow-hidden">
          <div className="absolute inset-0 placeholder-glow opacity-5 mix-blend-overlay pointer-events-none" />

          {/* Countdown */}
          <div className="w-full flex flex-col items-center z-10 relative">
            <p className="font-sans text-[10px] tracking-[0.5em] text-bronze uppercase mb-16 relative">
              The Wait
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-px h-12 bg-bronze/30" />
            </p>
            <CountdownTimer />
          </div>

          {/* Final Fade Out */}
          <div className="ending-content h-screen w-full flex flex-col items-center justify-center relative z-20">
            <p className="font-serif text-2xl md:text-4xl text-beige italic mb-12 font-light">
              Thank you for being part of our
            </p>
            <h2 className="font-serif text-[15vw] md:text-[12rem] leading-none text-champagne gold-glow tracking-widest ml-[0.1em]">
              POEM
            </h2>
          </div>
        </section>

      </div>
    </main>
  );
}

function GalleryItem({ aspect }: { aspect: string }) {
  return (
    <div className={`w-full ${aspect} relative group overflow-hidden border border-white/5`}>
      <div className="absolute inset-0 placeholder-glow opacity-10 group-hover:opacity-30 transition-opacity duration-1000 scale-110 group-hover:scale-100 ease-out" />
      <div className="absolute inset-0 bg-[#050505]/60 mix-blend-overlay group-hover:bg-transparent transition-colors duration-1000" />
      <div className="absolute inset-0 flex items-center justify-center p-6 text-center opacity-50 group-hover:opacity-100 transition-opacity duration-700">
        <span className="text-champagne/40 font-sans tracking-[0.2em] text-[8px] md:text-[10px] border border-champagne/10 px-3 py-1 rounded-full uppercase backdrop-blur-sm">
          [ GALLERY IMAGE PLACEHOLDER ]
        </span>
      </div>
    </div>
  );
}

function CountdownTimer() {
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
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
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
  );
}
