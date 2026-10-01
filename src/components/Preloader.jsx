import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, SkipForward, Volume2 } from 'lucide-react';
import right_door from '../assets/others/right_door.jpg';
import left_door from '../assets/others/left_door.jpg';
import bgLoader from '../assets/background/bgLoader2.png';
import gateSound from '../assets/video&sound/openDoor.mp3';

export default function Preloader({
  onEnter,
  onStartMusic,
  leftDoorImg = left_door,
  rightDoorImg = right_door,
  gateAudioSrc = gateSound,
  realmBgImg = bgLoader
}) {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [showSoundPopup, setShowSoundPopup] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const timersRef = useRef([]);
  const gateAudioRef = useRef(null);

  // Deteksi ukuran layar untuk mengaktifkan/menonaktifkan efek getar
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640); // 640px = breakpoint 'sm' Tailwind
    };

    handleResize(); // Cek saat pertama kali render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  };

  const stopGateAudio = () => {
    if (gateAudioRef.current) {
      gateAudioRef.current.pause();
      gateAudioRef.current.currentTime = 0;
    }
  };

  const handleEnableSound = () => {
    setSoundEnabled(true);
    setShowSoundPopup(false);

    if (gateAudioRef.current) {
      gateAudioRef.current.play().then(() => {
        gateAudioRef.current.pause();
        gateAudioRef.current.currentTime = 0;
      }).catch(() => {});
    }
  };

  useEffect(() => {
    if (phase !== 0) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          startAutomaticSequence();
          return 100;
        }
        return Math.min(prev + Math.floor(Math.random() * 2) + 1, 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 3) {
      setShowSoundPopup(false);

      if (soundEnabled) {
        if (gateAudioRef.current) {
          gateAudioRef.current.currentTime = 0;
          gateAudioRef.current.play().catch((err) => console.warn("Gate SFX blocked:", err));
        }

        if (onStartMusic) {
          onStartMusic();
        }
      }
    }
  }, [phase, soundEnabled, onStartMusic]);

  useEffect(() => {
    return () => {
      clearAllTimers();
      stopGateAudio();
    };
  }, []);

  const startAutomaticSequence = () => {
    const t1 = setTimeout(() => setPhase(1), 300);
    const t2 = setTimeout(() => setPhase(2), 2800);
    const t3 = setTimeout(() => setPhase(3), 5300);
    const t4 = setTimeout(() => setPhase(4), 7500);

    timersRef.current = [t1, t2, t3, t4];
  };

  const handleSkip = () => {
    clearAllTimers();
    stopGateAudio();

    if (soundEnabled && onStartMusic) {
      onStartMusic();
    }

    if (onEnter) onEnter();
  };

  const handleEnterRealm = () => {
    stopGateAudio();
    if (onEnter) onEnter();
  };

  const isGateOpened = phase >= 3;

  return (
    <motion.div 
      className="fixed inset-0 z-50 bg-[#030705] overflow-hidden flex flex-col justify-between items-center select-none font-serif text-[#c2c9c4]"
      /* Efek Layar Bergetar HANYA aktif jika Phase 2 DAN di Desktop (isDesktop) */
      animate={
        phase === 2 && isDesktop
          ? {
              x: [0, -4, 4, -3, 3, -1, 1, 0],
              y: [0, 3, -3, 2, -2, 1, -1, 0],
            }
          : {}
      }
      transition={{
        duration: 0.2,
        repeat: phase === 2 && isDesktop ? Infinity : 0,
        repeatType: 'mirror',
      }}
    >
      
      {/* SFX Pintu */}
      <audio ref={gateAudioRef} src={gateAudioSrc} preload="auto" />

      {/* STYLES & ANIMATIONS */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }
        @keyframes rayRotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes mistMove {
          0% { transform: translateX(-10%) translateY(0%); }
          50% { transform: translateX(10%) translateY(-5%); }
          100% { transform: translateX(-10%) translateY(0%); }
        }
        @keyframes floatDust {
          0% { transform: translateY(0px) scale(0.8); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: translateY(-80px) scale(1.2); opacity: 0; }
        }
        .animate-scanline { animation: scanline 6s linear infinite; }
        .animate-ray-rotate { animation: rayRotate 40s linear infinite; }
        .animate-[#030705] { animation: mistMove 25s ease-in-out infinite; }
      `}</style>

      {/* POPUP SUARA */}
      <AnimatePresence>
        {phase < 3 && showSoundPopup && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.4 }}
            className="absolute z-50 top-6 left-1/2 -translate-x-1/2 bg-[#050c08]/95 border border-[#d4af37]/60 px-6 py-3 rounded-full shadow-[0_0_25px_rgba(212,175,55,0.3)] backdrop-blur-md flex items-center gap-4 text-xs font-sans"
          >
            <span className="text-[#e2ded0] font-medium tracking-wide">
              Enable Cinematic Sound?
            </span>
            <button
              onClick={handleEnableSound}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#d4af37] hover:bg-white text-[#030705] font-bold rounded-full transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.5)]"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>YES</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BASE BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#0f2d1e]/60 via-[#050c08]/90 to-[#020504] pointer-events-none" />
      
      {/* BACKGROUND REALM */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isGateOpened ? 1 : 0 }}
        transition={{ duration: 2.5, ease: 'easeOut' }}
      >
        {realmBgImg && (
          <motion.div
            className="w-full h-full"
            animate={
              isGateOpened
                ? {
                    scale: [1.05, 1.18, 1.05],
                    x: ['0%', '2%', '-2%', '0%'],
                    y: ['0%', '-2%', '1%', '0%'],
                  }
                : {}
            }
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <img
              src={realmBgImg}
              alt="Realm Revealed Background"
              className="w-full h-full object-cover filter brightness-[0.38] contrast-125 saturate-[90%]"
            />
          </motion.div>
        )}

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent via-[#10251b]/30 to-transparent animate-mist opacity-70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030705] via-black/40 to-[#030705]/80" />
      </motion.div>

      {/* PORTAL RAYS & PULSING LIGHT */}
      <motion.div 
        className="absolute inset-0 pointer-events-none flex items-center justify-center z-0"
        animate={{ opacity: isGateOpened ? 0.8 : 0.2 }}
        transition={{ duration: 1.8 }}
      >
        <div className="w-[700px] h-[700px] bg-gradient-to-r from-[#a855f7]/20 via-[#d4af37]/30 to-[#2dd4bf]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-[conic-gradient(from_0deg_at_50%_50%,_transparent_0deg,_rgba(212,175,55,0.15)_45deg,_transparent_90deg)] animate-ray-rotate rounded-full blur-xl" />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#d4af37]/5 to-transparent h-20 w-full animate-scanline pointer-events-none z-10" />

      {/* ANIMASI PINTU & EFEK SEBELUM/SAAT TERBUKA */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none z-20">
        
        {/* PINTU KIRI */}
        <motion.div
          className="relative w-1/2 h-full border-r border-[#d4af37]/40 shadow-[15px_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
          animate={{
            x: isGateOpened ? '-92%' : '0%',
            rotateY: isGateOpened ? -20 : 0
          }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src={leftDoorImg} 
            alt="Left Stone Gate" 
            className="w-full h-full object-cover object-right filter brightness-75 contrast-125 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/80" />
        </motion.div>

        {/* GARIS VERTIKAL POLOS (DIHILANGKAN DI MOBILE) */}
        <AnimatePresence>
          {phase === 2 && (
            <motion.div
              key="glowing-gold-line-center"
              className="hidden sm:block absolute z-20 top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-white via-amber-200 to-transparent shadow-[0_0_15px_rgba(252,211,77,0.7),0_0_5px_rgba(255,255,255,1)] pointer-events-none origin-center" // <-- PERUBAHAN: origin-center
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{ 
                scaleY: 1, 
                opacity: 1,
              }}
              exit={{ 
                scaleY: 0,
                opacity: 0, 
                transition: { duration: 0.3, ease: "easeIn" } 
              }}
              transition={{
                duration: 1.5, 
                ease: [0.22, 1, 0.36, 1], 
              }}
            />
          )}
        </AnimatePresence>

        {/* PINTU KANAN */}
        <motion.div
          className="relative w-1/2 h-full border-l border-[#d4af37]/40 shadow-[-15px_0_50px_rgba(0,0,0,0.95)] overflow-hidden"
          animate={{
            x: isGateOpened ? '92%' : '0%',
            rotateY: isGateOpened ? 20 : 0
          }}
          transition={{ duration: 3.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <img 
            src={rightDoorImg} 
            alt="Right Stone Gate" 
            className="w-full h-full object-cover object-left filter brightness-75 contrast-125 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-transparent to-black/80" />
        </motion.div>

        {/* KILATAN CAHAYA PUTIH / EMAS (DIHILANGKAN DI MOBILE) */}
        <AnimatePresence>
          {isGateOpened && (
            <motion.div
              className="hidden sm:block absolute z-30 inset-0 bg-gradient-to-r from-white/20 via-[#fff5d6] to-white/20 pointer-events-none"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* NARRATIVE SEQUENCE */}
      <div className="relative z-30 w-full max-w-4xl h-full flex flex-col justify-between items-center py-10 px-6">
        <div className="text-center space-y-1">
          <p className="text-[10px] sm:text-xs tracking-[0.45em] text-[#d4af37] uppercase font-light drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
            ANCIENT ARTIFACT DETECTED
          </p>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent mx-auto" />
        </div>

        <div className="my-auto text-center w-full max-w-xl">
          <AnimatePresence mode="wait">

            {/* PHASE 0: PRELOADER / CALIBRATING */}
            {phase === 0 && (
              <motion.div
                key="preloader"
                initial={{ opacity: 0, scale: 0.85, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 1.15,
                  filter: "blur(12px)",
                  y: -20,
                }}
                transition={{
                  duration: 1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center gap-8"
              >
                {/* ANCIENT RELIC */}
                <div className="relative w-40 h-40 flex items-center justify-center">

                  {/* Outer mystical aura */}
                  <motion.div
                    className="absolute inset-[-18px] rounded-full border border-[#d4af37]/10"
                    animate={{
                      scale: [1, 1.08, 1],
                      opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Ancient outer ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full border border-dashed border-[#8a6f28]/60"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 35,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Second rotating seal */}
                  <motion.div
                    className="absolute inset-[10px] rounded-full border border-[#d4af37]/20"
                    animate={{ rotate: -360 }}
                    transition={{
                      duration: 22,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  {/* Decorative cardinal marks */}
                  <div className="absolute inset-0">
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[#d4af37]/60 text-[10px]">
                      ◈
                    </span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-[#d4af37]/60 text-[10px]">
                      ◈
                    </span>
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#d4af37]/60 text-[10px]">
                      ◈
                    </span>
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4af37]/60 text-[10px]">
                      ◈
                    </span>
                  </div>

                  {/* Rotating energy particles */}
                  <motion.div
                    className="absolute inset-[-4px]"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <span className="absolute top-1/2 -left-1 w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_14px_#d4af37]" />
                    <span className="absolute top-[15%] right-[12%] w-1.5 h-1.5 rounded-full bg-[#b7c7a7] shadow-[0_0_10px_#b7c7a7]" />
                    <span className="absolute bottom-[12%] left-[20%] w-1 h-1 rounded-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]" />
                  </motion.div>

                  {/* Inner glow */}
                  <motion.div
                    className="absolute w-24 h-24 rounded-full bg-[#d4af37]/5 blur-xl"
                    animate={{
                      scale: [0.8, 1.2, 0.8],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Ancient diamond relic */}
                  <motion.div
                    className="relative w-14 h-14 rotate-45 border border-[#d4af37] bg-[#050c08]/95 shadow-[0_0_30px_rgba(212,175,55,0.35)] flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 15px rgba(212,175,55,0.2)",
                        "0 0 35px rgba(212,175,55,0.55)",
                        "0 0 15px rgba(212,175,55,0.2)",
                      ],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Inner rune */}
                    <motion.div
                      className="w-5 h-5 border border-[#d4af37] rotate-45 flex items-center justify-center"
                      animate={{
                        rotate: [45, 135, 225, 315, 405],
                        scale: [0.8, 1, 0.8],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <div className="w-2 h-2 bg-[#d4af37] shadow-[0_0_15px_#d4af37]" />
                    </motion.div>
                  </motion.div>

                  {/* Floating ancient particles */}
                  {[...Array(8)].map((_, i) => (
                    <motion.span
                      key={i}
                      className="absolute w-[3px] h-[3px] rounded-full bg-[#d4af37]"
                      style={{
                        left: `${50 + Math.cos(i * 0.785) * 58}%`,
                        top: `${50 + Math.sin(i * 0.785) * 58}%`,
                      }}
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.5, 0.5],
                      }}
                      transition={{
                        duration: 2 + (i % 3),
                        delay: i * 0.25,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>

                {/* ANCIENT MESSAGE */}
                <motion.div
                  animate={{
                    opacity: [0.65, 1, 0.65],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="text-center"
                >
                  <p className="text-xs sm:text-sm tracking-[0.28em] text-[#a7b8aa] uppercase font-serif italic">
                    An Ancient Signal Has Been Found
                  </p>

                  <motion.div
                    className="mt-2 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"
                    animate={{
                      scaleX: [0.3, 1, 0.3],
                      opacity: [0.2, 0.8, 0.2],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                {/* LOADING SYSTEM */}
                <div className="w-full max-w-sm">

                  <div className="flex justify-between items-center text-[10px] tracking-[0.2em] font-mono mb-2">

                    <span className="text-[#667d6d] flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-60" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]" />
                      </span>

                      AWAKENING THE REALMS
                    </span>

                    <motion.span
                      className="text-[#d4af37] font-bold font-mono"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    >
                      {progress}
                      <span className="text-[9px] ml-0.5">%</span>
                    </motion.span>

                  </div>

                  {/* Ancient progress bar */}
                  <div className="relative w-full h-[6px] bg-[#07100b] border border-[#24382b] rounded-full overflow-hidden">

                    {/* Energy */}
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#183626] via-[#567c5b] to-[#d4af37] rounded-full"
                      style={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        duration: 0.2,
                        ease: "linear",
                      }}
                    />

                    {/* Moving light */}
                    <motion.div
                      className="absolute top-0 bottom-0 w-16 bg-gradient-to-r from-transparent via-[#fff4c2]/60 to-transparent blur-sm"
                      animate={{
                        x: ["-100%", "700%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />

                  </div>

                  {/* Loading lore */}
                  <motion.p
                    className="mt-3 text-center text-[9px] tracking-[0.25em] text-[#506457] uppercase font-serif"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    The Lost Realms Are Awakening
                  </motion.p>

                </div>
              </motion.div>
            )}

            {/* PHASE 1: 400 YEARS OF SILENCE */}
            {phase === 1 && (
              <motion.div
                key="phase1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
                transition={{ duration: 1 }}
                className="relative space-y-4"
              >
                <div className="absolute -inset-10 pointer-events-none flex justify-center items-center">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-[#d4af37] rounded-full blur-[1px]"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animation: `floatDust ${3 + i}s infinite ease-in-out ${i * 0.4}s`
                      }}
                    />
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <span className="inline-block px-4 py-1 rounded-full border border-[#d4af37]/40 text-[#d4af37] text-[10px] tracking-[0.35em] uppercase bg-black/60 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                    LOST ERA 00
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, scale: 1.3, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="text-4xl sm:text-6xl font-extrabold tracking-[0.25em] text-[#e2ded0] uppercase drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                >
                  400 YEARS
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, letterSpacing: '0.1em' }}
                  animate={{ opacity: 1, letterSpacing: '0.35em' }}
                  transition={{ duration: 1.2, delay: 0.7 }}
                  className="text-lg sm:text-2xl text-[#d4af37] font-semibold uppercase drop-shadow-[0_0_12px_rgba(212,175,55,0.5)]"
                >
                  OF SILENCE
                </motion.p>
              </motion.div>
            )}

            {/* PHASE 2: THE GATE REMEMBERS */}
            {phase === 2 && (
              <motion.div
                key="phase2"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ 
                  opacity: 1, 
                  scale: isDesktop ? [0.95, 1.05, 1] : 1,
                  x: isDesktop ? [0, -3, 3, -2, 2, 0] : 0,
                  y: isDesktop ? [0, -2, 1, -1, 0] : 0
                }}
                exit={{ opacity: 0, scale: 1.2, filter: 'blur(10px)' }}
                transition={{ duration: 1.2 }}
                className="relative space-y-4"
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  className="absolute inset-0 bg-[#d4af37]/30 rounded-full blur-2xl pointer-events-none"
                />

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-5xl font-bold tracking-[0.22em] text-[#fff5d6] uppercase drop-shadow-[0_0_30px_rgba(212,175,55,0.9)]"
                >
                  THE GATE REMEMBERS
                </motion.h2>

              </motion.div>
            )}

            {/* PHASE 3 & 4: NUSANTARA LOST REALMS */}
            {(phase === 3 || phase === 4) && (
              <motion.div
                key="phase3"
                initial={{ opacity: 0, filter: 'blur(16px)', scale: 0.85 }}
                animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="space-y-1">
                  <motion.h1 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-3xl xs:text-4xl sm:text-7xl font-extrabold tracking-[0.1em] sm:tracking-[0.15em] text-[#fff5d6] drop-shadow-[0_0_30px_rgba(212,175,55,0.8)] uppercase"
                  >
                    NUSANTARA
                  </motion.h1>

                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="text-lg xs:text-xl sm:text-4xl font-bold tracking-[0.2em] sm:tracking-[0.3em] text-[#d4af37] uppercase drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                  >
                    LOST REALMS
                  </motion.h2>
                </div>

                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="text-xs sm:text-sm text-[#8a9e91] max-w-md mx-auto tracking-wide leading-relaxed font-sans"
                >
                  Ketika gerbang dunia yang hilang kembali terbuka, empat Guardian harus menghadapi kerajaan yang telah lama ditelan kegelapan.
                </motion.p>

                <div className="pt-4 min-h-[72px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {phase === 4 && (
                      <motion.div
                        key="enter-button"
                        initial={{ opacity: 0, y: 25, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <button
                          onClick={handleEnterRealm}
                          className="group relative inline-flex items-center gap-2 sm:gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-[#d4af37] text-[#030705] font-bold text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase hover:bg-white hover:shadow-[0_0_40px_rgba(212,175,55,0.9)] transition-all cursor-pointer font-sans overflow-hidden"
                        >
                          <div className="absolute inset-0 w-1/2 h-full bg-white/30 -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                          <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#030705] animate-pulse" />
                          <span>ENTER THE REALM</span>
                          <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        <div className="text-center space-y-2">
          <p className="text-[10px] sm:text-xs tracking-[0.3em] text-[#4e6355] uppercase font-sans">
            A Journey Through the Lost Realms
          </p>
          <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-[#2a4235] to-transparent mx-auto" />
        </div>
      </div>

      {/* TOMBOL SKIP */}
      <div className="absolute bottom-6 right-6 z-40">
        <button
          onClick={handleSkip}
          className="group flex items-center gap-2 px-4 py-2 bg-[#050c08]/80 hover:bg-[#10251b] border border-[#d4af37]/40 hover:border-[#d4af37] text-[11px] font-sans font-bold text-[#d4af37] hover:text-[#fff5d6] tracking-[0.2em] uppercase transition-all backdrop-blur-md cursor-pointer shadow-lg"
        >
          <span>SKIP</span>
          <SkipForward className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

    </motion.div>
  );
}
