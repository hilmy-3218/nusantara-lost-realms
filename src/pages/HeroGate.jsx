import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import bgHero from '../assets/video&sound/videoHero.mp4';
import trailer from '../assets/video&sound/trailer.mp4';

// Data Translasi HeroGate
const translations = {
  IND: {
    badge: 'GERBANG GAIB TELAH TERBUKA',
    title: 'NUSANTARA',
    subtitle: 'ALAM YANG HILANG',
    tagline: '“Beberapa dunia tidak benar-benar sirna. Mereka hanya tertidur, menanti jiwa yang berani memanggilnya kembali.”',
    ctaPrimary: 'MASUKI GERBANG',
    ctaSecondary: 'TAMPILKAN TRAILER',
    scrollText: 'GULIR UNTUK MENUNGKAP'
  },
  ENG: {
    badge: 'THE GATEWAY HAS AWAKENED',
    title: 'NUSANTARA',
    subtitle: 'LOST REALM',
    tagline: '“Some worlds are not lost. They are waiting for a brave soul to awaken them.”',
    ctaPrimary: 'ENTER THE REALM',
    ctaSecondary: 'WATCH TRAILER',
    scrollText: 'SCROLL TO DISCOVER'
  }
};

// Komponen Canvas khusus untuk Animasi Kunang-Kunang
function FirefliesCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fireflyCount = 35;
    const fireflies = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.4 ? 'rgba(203, 163, 66,' : 'rgba(163, 203, 66,',
      alpha: Math.random(),
      speedAlpha: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      fireflies.forEach((f) => {
        f.x += f.vx;
        f.y += f.vy;

        if (f.x < 0 || f.x > canvas.width) f.vx *= -1;
        if (f.y < 0 || f.y > canvas.height) f.vy *= -1;

        f.alpha += f.speedAlpha;
        if (f.alpha >= 1 || f.alpha <= 0.1) {
          f.speedAlpha *= -1;
        }

        const gradient = ctx.createRadialGradient(
          f.x, f.y, 0,
          f.x, f.y, f.radius * 4
        );
        gradient.addColorStop(0, `${f.color} ${f.alpha})`);
        gradient.addColorStop(0.4, `${f.color} ${f.alpha * 0.4})`);
        gradient.addColorStop(1, `${f.color} 0)`);

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[1] pointer-events-none"
    />
  );
}

// Komponen HeroGate
export default function HeroGate({ isMuted, setIsMuted, lang = 'IND', scrollToSection }) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const videoRef = useRef(null);
  
  const t = translations[lang] || translations.IND;

  const handleOpenTrailer = () => {
    setIsTrailerOpen(true);
    if (!isMuted && typeof setIsMuted === 'function') {
      setIsMuted();
    }
  };

  const handleCloseTrailer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsTrailerOpen(false);
    if (isMuted && typeof setIsMuted === 'function') {
      setIsMuted();
    }
  };

  useEffect(() => {
    if (!isTrailerOpen) return;

    const handleScroll = () => {
      handleCloseTrailer();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isTrailerOpen, isMuted]);

  // Handler Klik Tombol Masuk / Scroll ke Guardiant
  const handleGoToLore = () => {
    if (typeof scrollToSection === 'function') {
      scrollToSection('Lore');
    }
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50, filter: 'blur(12px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const taglineVariants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const ctaVariants = {
    hidden: { opacity: 0, y: 35, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id='home' className="relative min-h-screen w-full bg-[#010302]/75 backdrop-blur-sm text-[#c2c9c4] flex flex-col justify-between items-center overflow-hidden font-['Plus_Jakarta_Sans'] selection:bg-[#cba342] selection:text-[#020604]">
      
      {/* Background Video Loop */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1.05 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <video
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover opacity-50 filter contrast-125 brightness-90 transition-all duration-700"
        >
          <source src={bgHero} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_20%,_#020604_90%)] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020604]/80 via-transparent to-[#020604]" />
      </motion.div>

      {/* Layer Animasi Kunang-Kunang Canvas */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <FirefliesCanvas />
      </motion.div>

      {/* Hero Content Center */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 pt-28 pb-12 max-w-5xl mx-auto w-full">

        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center text-center w-full"
        >

          {/* Container Judul Utama & Subtitle */}
          <div className="relative flex flex-col items-center my-6">
            <motion.div 
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
              className="absolute -inset-8 bg-[radial-gradient(circle_at_center,_rgba(203,163,66,0.25)_0%,_rgba(16,185,129,0.12)_40%,_transparent_75%)] blur-3xl pointer-events-none" 
            />
            
            <motion.h1 
              variants={titleVariants}
              className="font-['Cinzel_Decorative'] text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)] leading-none select-none filter"
            >
              {t.title}
            </motion.h1>

            <motion.p 
              variants={subtitleVariants}
              className="font-['Cinzel'] text-base sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.5em] text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#fcf6ba] to-[#b38728] drop-shadow-[0_0_15px_rgba(203,163,66,0.4)] uppercase mt-2 md:mt-0 select-none"
            >
              {t.subtitle}
            </motion.p>
          </div>

          {/* Tagline */}
          <motion.p 
            variants={taglineVariants}
            className="font-['Cinzel'] text-xs sm:text-sm md:text-base italic text-[#9bb0a3] max-w-xl mb-8 sm:mb-10 leading-relaxed drop-shadow"
          >
            {t.tagline}
          </motion.p>

          {/* Tombol CTA */}
          <motion.div 
            variants={ctaVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md font-sans"
          >
            {/* Mengubah <a> menjadi <button> dan memanggil handleGoToLore */}
            <motion.button
              type="button"
              onClick={handleGoToLore}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="hidden lg:inline-flex group relative items-center justify-center w-auto px-8 py-4 overflow-hidden rounded-sm bg-[#0a0f0d] border border-[#d4af37]/40 text-[#d4af37] hover:text-[#ffd700] font-semibold text-xs tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.6)] hover:border-[#ffd700] cursor-pointer"
            >
              <span className="absolute inset-1 border border-[#d4af37]/20 rounded-sm pointer-events-none group-hover:border-[#ffd700]/60 transition-colors duration-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/0 via-[#d4af37]/20 to-[#d4af37]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <span className="relative z-10 flex items-center justify-center gap-3.5 text-[#e6c875] group-hover:text-[#ffffff] font-extrabold text-xs tracking-[0.3em] uppercase transition-colors duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                {t.ctaPrimary}
                
                <svg 
                  className="w-8 h-8 fill-current transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,215,0,0.8)] shrink-0" 
                  viewBox="0 0 512 512"
                >
                  <circle cx="256" cy="256" r="225" fill="none" stroke="currentColor" strokeWidth="18" strokeDasharray="140 12" />
                  <path d="M 256,65 L 275,100 L 237,100 Z" fill="currentColor"/>
                  <circle cx="256" cy="115" r="10" fill="currentColor"/>
                  <path d="
                    M 238,135 L 190,135 L 190,160 L 170,160 L 170,195 L 150,195 L 150,235 L 130,235 L 130,370 L 238,370 Z
                    M 210,180 L 180,220 L 210,220 Z
                    M 200,250 L 160,300 L 200,300 Z" 
                    fill="currentColor"
                  />
                  <path d="
                    M 274,135 L 322,135 L 322,160 L 342,160 L 342,195 L 362,195 L 362,235 L 382,235 L 382,370 L 274,370 Z
                    M 302,180 L 332,220 L 302,220 Z
                    M 312,250 L 352,300 L 312,300 Z" 
                    fill="currentColor"
                  />
                  <path d="M 238,370 A 18,18 0 0,1 274,370 Z" fill="none" stroke="currentColor" strokeWidth="6"/>
                  <rect x="100" y="372" width="312" height="18" rx="3" fill="currentColor"/>
                  <rect x="80" y="394" width="352" height="22" rx="4" fill="currentColor"/>
                </svg>
              </span>
            </motion.button>

            <motion.button 
              onClick={handleOpenTrailer}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="group relative inline-flex items-center justify-center w-auto px-5 py-2.5 sm:px-8 sm:py-4 overflow-hidden rounded-sm bg-[#050f0a]/80 backdrop-blur-md border border-[#234734] hover:border-[#4ade80]/60 text-[#a3b8ab] hover:text-[#f0f4f1] font-semibold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase transition-all duration-500 shadow-[0_0_15px_rgba(5,15,10,0.8)] hover:shadow-[0_0_30px_rgba(35,71,52,0.6)] cursor-pointer"
            >
              <span className="absolute inset-1 border border-[#234734]/40 rounded-sm pointer-events-none group-hover:border-[#4ade80]/30 transition-colors duration-500" />
              <span className="absolute inset-0 bg-gradient-to-r from-[#16382b]/0 via-[#16382b]/40 to-[#16382b]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                <span className="relative flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 shrink-0 transition-colors duration-300">
                  <svg 
                    className="w-full h-full text-[#cba342] group-hover:scale-110 transition-transform duration-300 filter drop-shadow-[0_0_5px_rgba(203,163,66,0.7)]" 
                    viewBox="0 0 100 100" 
                    fill="currentColor"
                  >
                    <path 
                      d="M50 5 L89 27.5 L89 72.5 L50 95 L11 72.5 L11 27.5 Z" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="4" 
                      className="opacity-70 group-hover:opacity-100 transition-opacity"
                    />
                    <path d="M38 30 L38 70 L72 50 Z M44 39 L63 50 L44 61 Z" />
                    <circle cx="50" cy="15" r="3" />
                    <circle cx="50" cy="85" r="3" />
                  </svg>
                </span>

                {t.ctaSecondary}
              </span>
            </motion.button>
          </motion.div>

        </motion.div>
      </main>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="relative z-10 pb-6 flex flex-col items-center"
      >
        <button 
          type="button"
          onClick={handleGoToLore}
          className="flex flex-col items-center gap-2 group cursor-pointer bg-transparent border-none outline-none"
        >
          <span className="font-['Cinzel'] text-[10px] tracking-[0.3em] uppercase text-[#7a8c80] group-hover:text-[#cba342] transition-colors duration-300">
            {t.scrollText}
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className="w-5 h-8 rounded-full border border-[#d4af37]/30 group-hover:border-[#d4af37] flex items-start justify-center p-1 transition-colors duration-300"
          >
            <div className="w-1 h-2 bg-[#cba342] rounded-full" />
          </motion.div>
        </button>
      </motion.div>

      {/* Modal Trailer */}
      <AnimatePresence>
        {isTrailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseTrailer}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl bg-[#070d0a] border border-[#d4af37]/40 rounded-lg overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center justify-between px-4 py-3 bg-[#0a120e] border-b border-[#d4af37]/20">
                <h3 className="font-['Cinzel'] text-sm sm:text-base font-bold text-[#e6c875] tracking-widest uppercase">
                  {t.ctaSecondary}
                </h3>
                <button
                  onClick={handleCloseTrailer}
                  className="text-[#9bb0a3] hover:text-white transition-colors duration-200 p-1 cursor-pointer"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="relative aspect-video w-full bg-black">
                <video
                  ref={videoRef}
                  autoPlay
                  controls
                  controlsList="nodownload no-focused-line noremoteplayback noplaybackrate"
                  disablePictureInPicture
                  className="w-full h-full object-contain [&::-webkit-media-controls-panel]:bg-gradient-to-t [&::-webkit-media-controls-panel]:from-black/80 [&::-webkit-media-controls-overflow-button]:hidden [&::-webkit-media-controls-custom-button]:hidden"
                >
                  <source src={trailer} type="video/mp4" />
                  Browser Anda tidak mendukung tag video.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
