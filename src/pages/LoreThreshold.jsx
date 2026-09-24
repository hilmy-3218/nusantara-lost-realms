import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import BgLore from '../assets/background/bgLore.jpg';
import gate from '../assets/background/gate.jpg';
import throne from '../assets/background/throne.jpg';

const loreChapters = {
  IND: [
    {
      id: 1,
      chapter: 'BAB 01',
      subtitle: 'GERBANG AWAL',
      title: 'TAKDIR EMPAT PENJAGA',
      quote:
        '“Di balik reruntuhan kuno yang terlupakan, empat penjaga berdiri di hadapan gerbang tak kasatmata—sebuah celah menuju dimensi lain yang seharusnya tak pernah terjamah manusia.”',
      bgImage: gate,
      align: 'right'
    },
    {
      id: 2,
      chapter: 'BAB 02',
      subtitle: 'DUNIA YANG TERLUPAKAN',
      title: 'JEJAK DI BALIK GERBANG',
      quote:
        '“Di balik gerbang yang tak seharusnya terbuka, terbentang dunia asing yang telah lama terkubur dari ingatan manusia. Di antara reruntuhan kerajaan dan hutan yang diselimuti kegelapan, empat penjaga mulai mengungkap jejak sebuah kutukan yang telah bertahan selama berabad-abad.”',
      bgImage: BgLore,
      align: 'left'
    },
    {
      id: 3,
      chapter: 'BAB 03',
      subtitle: 'THRONE OF RUIN',
      title: 'DI HADAPAN RAJA KUTUKAN',
      quote:
        '“Jejak kutukan akhirnya membawa empat Penjaga ke Throne of Ruin, tempat Raja Kutukan masih bersemayam setelah empat abad dalam kegelapan.”',
      bgImage: throne,
      align: 'right'
    }
  ],
  ENG: [
    {
      id: 1,
      chapter: 'CHAPTER 01',
      subtitle: 'THE FIRST GATEWAY',
      title: 'DESTINY OF THE FOUR GUARDIANS',
      quote:
        '“Behind forgotten ancient ruins, four guardians stand before an invisible gate—a rift to another dimension that mankind should have never touched.”',
      bgImage: gate,
      align: 'right'
    },
    {
      id: 2,
      chapter: 'CHAPTER 02',
      subtitle: 'THE FORGOTTEN WORLD',
      title: 'FOOTSTEPS BEYOND THE GATE',
      quote:
        '“Beyond the gate that should never have opened lies an alien world long buried from human memory. Among kingdom ruins and darkness-shrouded forests, four guardians begin to uncover the traces of a curse that has endured for centuries.”',
      bgImage: BgLore,
      align: 'left'
    },
    {
      id: 3,
      chapter: 'CHAPTER 03',
      subtitle: 'THRONE OF RUIN',
      title: 'BEFORE THE CURSE KING',
      quote:
        '“The trail of the curse finally leads the four Guardians to the Throne of Ruin, where the Curse King still dwells after four centuries of darkness.”',
      bgImage: throne,
      align: 'right'
    }
  ]
};

const AUTO_SWAP_INTERVAL = 12000;

export default function LoreThreshold({ lang = 'IND' }) {
  const chapters = loreChapters[lang] || loreChapters.IND;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % chapters.length);
    }, AUTO_SWAP_INTERVAL);

    return () => clearInterval(timer);
  }, [chapters.length]);

  const currentData = chapters[currentIndex];
  const isRight = currentData.align === 'right';

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % chapters.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + chapters.length) % chapters.length);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 60, scale: 0.98, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen w-full bg-[#020704] text-[#c2c9c4] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none font-['Plus_Jakarta_Sans']"
    >
      {/* 1. Latar Belakang Gambar Dinamis */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.55, scale: 1.0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none filter contrast-125 brightness-90"
          style={{ backgroundImage: `url(${currentData.bgImage})` }}
        />
      </AnimatePresence>

      {/* 2. Layer Overlay Gelap Bagian Atas (Soft & Tipis) */}
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#020604]/70 via-[#020604]/30 to-transparent pointer-events-none z-[1]" />

      {/* Layer Overlay Utama (Sesuai Bawaan Asli Anda) */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent to-[#020604]/90 transition-all duration-1000 ${
          isRight
            ? 'from-[#020604]/50 md:bg-gradient-to-r md:from-transparent md:via-[#020604]/65 md:to-[#020604]/95'
            : 'from-[#020604]/50 md:bg-gradient-to-l md:from-transparent md:via-[#020604]/65 md:to-[#020604]/95'
        }`}
      />

      {/* Vignette Gelap di Pinggir Layar */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(2,6,4,0.75)_90%)] pointer-events-none" />
      {/* 3. Ornamen Runic Berputar */}
      <div
        className={`absolute inset-0 hidden lg:flex items-center pointer-events-none opacity-20 z-0 transition-all duration-1000 ${
          isRight ? 'justify-start ml-12' : 'justify-end mr-12'
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
          className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] border border-[#d4af37]/40 rounded-full relative"
        >
          <div className="absolute top-[15%] right-[15%] w-2 h-2 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
          <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
        </motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="absolute w-[350px] h-[350px] md:w-[480px] md:h-[480px] border border-[#d4af37]/30 rotate-45"
        />
      </div>

      {/* 4. Efek Dynamic Ambient Glow Pulse */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-0 transition-all duration-1000 ${
          isRight ? 'left-10 md:left-20' : 'right-10 md:right-20'
        }`}
      >
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.95, 1.05, 0.95] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-80 h-80 sm:w-[30rem] sm:h-[30rem] bg-[radial-gradient(circle_at_center,_rgba(203,163,66,0.25)_0%,_rgba(16,185,129,0.1)_40%,_transparent_75%)] blur-3xl"
        />
      </div>

      <div className="w-full h-4 hidden md:block" />

      {/* 5. Konten Utama (Menggunakan Position Absolute + popLayout untuk Transisi Posisi Mulus) */}
      <div className="relative z-10 max-w-7xl w-full flex my-auto items-center justify-center min-h-[420px]">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: isRight ? 60 : -60, filter: 'blur(6px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: isRight ? -60 : 60, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col items-center text-center max-w-xl space-y-4 sm:space-y-6 w-full absolute ${
              isRight ? 'right-0' : 'left-0'
            }`}
          >
            {/* Chapter Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="flex items-center justify-center gap-3"
            >
              <span className="font-['Cinzel'] text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#e6c875] uppercase border border-[#d4af37]/40 px-4 py-1.5 rounded-sm bg-[#0a0f0d]/80 backdrop-blur-md shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                {currentData.chapter}
              </span>
            </motion.div>

            {/* Subtitle / Kategori */}
            <p className="font-['Cinzel'] text-xs sm:text-sm md:text-base tracking-[0.4em] text-[#bf953f] uppercase font-bold drop-shadow-[0_0_12px_rgba(203,163,66,0.3)]">
              {currentData.subtitle}
            </p>

            {/* Judul Utama */}
            <h1 className="font-['Cinzel_Decorative'] text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] uppercase leading-tight drop-shadow-[0_10px_25px_rgba(0,0,0,0.95)] max-w-2xl">
              {currentData.title}
            </h1>

            {/* Kutipan / Deskripsi */}
            <div className="max-w-xl space-y-6 pt-1 w-full flex flex-col items-center">
              <p className="font-['Cinzel'] text-xs sm:text-sm md:text-base italic text-[#9bb0a3] leading-relaxed tracking-wide font-light drop-shadow min-h-[75px] flex items-center justify-center text-center">
                {currentData.quote}
              </p>

              {/* Garis Pemisah Emas */}
              <div className="flex items-center justify-center gap-4 pt-2">
                <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                <div className="w-2 h-2 border border-[#d4af37] rotate-45 bg-[#020604] shadow-[0_0_8px_#d4af37]" />
                <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 6. Navigasi Bab & Indikator Progress */}
      <div className="relative z-20 mt-8 sm:mt-10 flex flex-col items-center gap-5 w-full">
        {/* Tombol Bab & Progress Bar */}
        <div className="flex items-center gap-4 sm:gap-6">
          {chapters.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className="group flex flex-col items-center gap-2 focus:outline-none cursor-pointer"
              >
                <span
                  className={`text-[10px] sm:text-xs font-['Cinzel'] tracking-widest transition-colors duration-300 ${
                    isActive ? 'text-[#e6c875] font-bold' : 'text-[#c2c9c4]/40 group-hover:text-[#c2c9c4]'
                  }`}
                >
                  0{item.id}
                </span>

                {/* Progress Line */}
                <div className="w-16 sm:w-24 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
                  {isActive && (
                    <motion.div
                      key={`bar-${idx}`}
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{
                        duration: AUTO_SWAP_INTERVAL / 1000,
                        ease: 'linear'
                      }}
                      className="h-full bg-[#d4af37] shadow-[0_0_8px_#d4af37]"
                    />
                  )}
                  {!isActive && (
                    <div className="w-0 h-full bg-transparent group-hover:w-full group-hover:bg-[#d4af37]/30 transition-all duration-300" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tombol Panah Manual Prev & Next */}
        <div className="flex items-center gap-4 pt-1">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="p-2.5 text-[#e6c875]/70 hover:text-[#ffffff] bg-[#0a0f0d]/80 hover:bg-[#0a0f0d] rounded-sm transition-all border border-[#d4af37]/30 hover:border-[#ffd700] shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            aria-label="Previous Chapter"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="p-2.5 text-[#e6c875]/70 hover:text-[#ffffff] bg-[#0a0f0d]/80 hover:bg-[#0a0f0d] rounded-sm transition-all border border-[#d4af37]/30 hover:border-[#ffd700] shadow-[0_0_10px_rgba(212,175,55,0.1)]"
            aria-label="Next Chapter"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}