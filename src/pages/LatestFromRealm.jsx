import React, { useState } from 'react';
import { Calendar, ArrowRight, BookOpen, X, Sparkles, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import switching from '../assets/even/guardiant_switching.jpg';
import duel from '../assets/even/duel.jpg';
import kado from '../assets/even/kado.jpg';

const articlesContent = {
  IND: [
    {
      id: 1,
      title: "THE LOST SECRET: TEMUKAN HADIAH DAN DAPATKAN REWARD EKSKLUSIF",
      description: "Temukan hadiah tersembunyi di dunia NUSANTARA: LOST REALMS, ambil kode rahasia di dalamnya, lalu masukkan kode tersebut di Lobby Game untuk mendapatkan reward eksklusif. Hanya 100 pemain pertama yang berhasil mengklaim hadiah.",
      fullContent: "Sebuah hadiah misterius telah disembunyikan di dalam dunia NUSANTARA: LOST REALMS. Jelajahi setiap sudut dan temukan lokasi hadiah tersebut. Di dalam hadiah terdapat sebuah kode rahasia yang dapat digunakan untuk mengklaim reward eksklusif. Setelah menemukan kode, masukkan kode tersebut melalui Lobby Game dan klaim hadiahmu sebelum pemain lain menemukannya terlebih dahulu. Event ini hanya menyediakan reward untuk maksimal 100 pemain. Setelah seluruh 100 hadiah berhasil diklaim, kode tidak dapat digunakan lagi dan event resmi berakhir. Apakah kamu cukup cepat untuk menjadi salah satu dari 100 pemain pertama yang menemukan dan mengklaim hadiah tersebut?",
      categoryKey: "ANNOUNCEMENT",
      categoryLabel: "PENGUMUMAN",
      date: "25 Agustus 2026",
      author: "Tim Pengembang NUSANTARA: LOST REALMS",
      image: kado
    },
    {
      id: 2,
      title: "PEMBARUAN: ROYAL VANTARA MENDEKLARASIKAN DUEL",
      description: "Royal Vantara kini mampu mendeklarasikan duel, mengunci satu Guardian di dalam arena pertarungan dan mencegah pergantian karakter hingga duel berakhir.",
      fullContent: "Pertemuan dengan Royal Vantara kini menghadirkan mekanik pertarungan baru: Deklarasi Duel. Saat Royal Vantara mengaktifkan kekuatannya, sebuah penghalang raksasa dengan aura hitam dan ungu akan muncul di sekeliling arena, memisahkan pemain dari dunia luar. Selama penghalang aktif, Guardian Switching dinonaktifkan dan pemain harus menghadapi Royal Vantara menggunakan Guardian yang sedang dikendalikan. Duel ini menuntut pemain untuk memahami kemampuan Guardian, membaca pola serangan Royal Vantara, serta memanfaatkan setiap celah yang muncul dalam pertarungan. Penghalang hanya akan runtuh setelah duel berakhir, memungkinkan pemain kembali berganti Guardian dan melanjutkan perjalanan mereka.",
      categoryKey: "UPDATE",
      categoryLabel: "PEMBARUAN",
      date: "25 Agustus 2026",
      author: "Tim Pengembang NUSANTARA: LOST REALMS",
      image: duel
    },
    {
      id: 3,
      title: "GUARDIAN SWITCHING: KUASAI EMPAT PENJAGA",
      description: "Kenali sistem pergantian Guardian secara langsung dan manfaatkan kemampuan, senjata, serta gaya bertarung yang berbeda untuk menghadapi setiap ancaman.",
      fullContent: "Guardian Switching memungkinkan pemain berpindah di antara empat Guardian secara langsung kapan saja selama permainan. Setiap Guardian memiliki senjata, kemampuan, dan gaya bertarung yang berbeda, sehingga pemain bebas menentukan siapa yang paling sesuai dengan situasi yang sedang dihadapi. Hadapi musuh dengan gaya bertarung jarak dekat, beralih ke Guardian dengan dua pedang untuk serangan cepat, atau gunakan kemampuan Guardian lainnya untuk mengubah jalannya pertempuran. Pergantian Guardian bukan sekadar pergantian karakter, tetapi menjadi bagian penting dari cara pemain menjelajahi dunia dan menghadapi setiap ancaman di Lost Realms.",
      categoryKey: "GAMEPLAY",
      categoryLabel: "GAMEPLAY",
      date: "25 Agustus 2026",
      author: "Tim Pengembang NUSANTARA: LOST REALMS",
      image: switching
    }
  ],
  ENG: [
    {
      id: 1,
      title: "THE LOST SECRET: FIND HIDDEN GIFTS & CLAIM EXCLUSIVE REWARDS",
      description: "Discover hidden gifts in the world of NUSANTARA: LOST REALMS, retrieve the secret code inside, and redeem it in the Game Lobby for exclusive rewards. Only the first 100 players can claim the reward.",
      fullContent: "A mysterious gift has been hidden within the world of NUSANTARA: LOST REALMS. Explore every corner to unveil its secret location. Inside the gift lies a secret code redeemable for exclusive rewards. Once you find the code, enter it via the Game Lobby to claim your reward before anyone else. This event is strictly limited to the first 100 players. Once all 100 rewards are claimed, the code will expire and the event will officially conclude. Are you fast enough to be among the first 100 players to find and claim the prize?",
      categoryKey: "ANNOUNCEMENT",
      categoryLabel: "ANNOUNCEMENT",
      date: "August 25, 2026",
      author: "NUSANTARA: LOST REALMS Development Team",
      image: kado
    },
    {
      id: 2,
      title: "UPDATE: ROYAL VANTARA DECLARES A DUEL",
      description: "Royal Vantara can now declare a duel, locking a Guardian inside the combat arena and preventing character switches until the duel ends.",
      fullContent: "Encounters with Royal Vantara now introduce a new combat mechanic: Duel Declaration. When Royal Vantara activates its power, a massive barrier shrouded in dark purple aura encompasses the arena, isolating the player from the outside world. While the barrier is active, Guardian Switching is disabled, forcing players to face Royal Vantara using their currently controlled Guardian. This duel requires players to master their Guardian's abilities, read Royal Vantara's attack patterns, and capitalize on every opening during battle. The barrier will only collapse once the duel concludes, allowing players to switch Guardians once again and continue their journey.",
      categoryKey: "UPDATE",
      categoryLabel: "UPDATE",
      date: "August 25, 2026",
      author: "NUSANTARA: LOST REALMS Development Team",
      image: duel
    },
    {
      id: 3,
      title: "GUARDIAN SWITCHING: MASTER THE FOUR GUARDIANS",
      description: "Discover the real-time Guardian switching system and utilize different abilities, weapons, and combat styles to face every threat.",
      fullContent: "Guardian Switching allows players to switch between four Guardians instantly at any time during gameplay. Each Guardian has unique weapons, abilities, and combat styles, giving players the freedom to choose the one best suited to the situation. Engage enemies in close-range combat, switch to the dual-blade Guardian for rapid attacks, or utilize another Guardian's abilities to turn the tide of battle. Guardian Switching is more than simply changing characters—it is a core part of how players explore the world and overcome every threat in Lost Realms.",
      categoryKey: "GAMEPLAY",
      categoryLabel: "GAMEPLAY",
      date: "August 25, 2026",
      author: "NUSANTARA: LOST REALMS Development Team",
      image: switching
    }
  ]
};

const labels = {
  IND: {
    badge: "CATATAN & PEMBARUAN ALAM",
    heading: "BISIKAN & KABAR TERBARU",
    readDispatch: "BACA CATATAN",
    authorLabel: "Oleh",
    closeModal: "Tutup Catatan",
    categories: [
      { key: "ALL", label: "SEMUA" },
      { key: "ANNOUNCEMENT", label: "PENGUMUMAN" },
      { key: "GAMEPLAY", label: "GAMEPLAY" },
      { key: "UPDATE", label: "PEMBARUAN" }
    ]
  },
  ENG: {
    badge: "REALM CHRONICLES & UPDATES",
    heading: "LATEST FROM THE REALM",
    readDispatch: "READ DISPATCH",
    authorLabel: "By",
    closeModal: "Close Dispatch",
    categories: [
      { key: "ALL", label: "ALL" },
      { key: "ANNOUNCEMENT", label: "ANNOUNCEMENT" },
      { key: "GAMEPLAY", label: "GAMEPLAY" },
      { key: "UPDATE", label: "UPDATE" }
    ]
  }
};

// Variasi animasi untuk container grid (Stagger effect)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Variasi animasi untuk setiap elemen kartu
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function LatestFromRealm({ lang = 'IND' }) {
  const [activeCategoryKey, setActiveCategoryKey] = useState('ALL');
  const [selectedArticle, setSelectedArticle] = useState(null);

  const currentArticles = articlesContent[lang] || articlesContent['IND'];
  const currentLabels = labels[lang] || labels['IND'];

  const filteredArticles = activeCategoryKey === 'ALL'
    ? currentArticles
    : currentArticles.filter(article => article.categoryKey === activeCategoryKey);

  return (
    <section id="updates" className="relative py-20 px-6 md:px-12 bg-[#020704] text-[#e0e6db] font-serif overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d4af37]/5 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-[#053821]/20 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto z-10">
        
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-start"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8a961]/40 bg-[#071710]/80 text-[#c8a961] text-xs tracking-[0.2em] uppercase mb-4 backdrop-blur-md shadow-[0_0_15px_rgba(200,169,97,0.1)]">
            <Sparkles size={14} className="animate-pulse" />
            <span>{currentLabels.badge}</span>
          </div>
        </motion.div>

        {/* Header & Category Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#132d20]"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f0e3bf] via-[#d4af37] to-[#8a6f28] uppercase font-serif drop-shadow-md">
              {currentLabels.heading}
            </h2>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            {currentLabels.categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategoryKey(cat.key)}
                className={`px-5 py-2 text-xs tracking-widest uppercase font-sans font-bold transition-all duration-300 border relative overflow-hidden group ${
                  activeCategoryKey === cat.key
                    ? "border-[#c8a961] bg-[#0f281b] text-[#c8a961] shadow-[0_0_15px_rgba(200,169,97,0.25)]"
                    : "border-[#142d20] bg-[#050e09]/90 text-gray-400 hover:text-[#e0e6db] hover:border-[#c8a961]/60"
                }`}
              >
                <span className="relative z-10">{cat.label}</span>
                {activeCategoryKey === cat.key && (
                  <motion.span 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#c8a961]" 
                  />
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Articles Cards Grid dengan Animasi Scroll */}
        <motion.div 
          key={activeCategoryKey}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredArticles.map((article) => (
            <motion.article
              key={article.id}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer relative flex flex-col bg-[#050e0a] border border-[#132a1e] hover:border-[#c8a961] transition-colors duration-500 rounded-sm overflow-hidden shadow-2xl hover:shadow-[0_10px_30px_rgba(200,169,97,0.2)]"
            >
              {/* Corner Ornaments */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#c8a961]/0 group-hover:border-[#c8a961] transition-all duration-300 z-20" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#c8a961]/0 group-hover:border-[#c8a961] transition-all duration-300 z-20" />

              {/* Image Container */}
              <div className="relative h-60 w-full overflow-hidden bg-[#020704]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover filter grayscale-[15%] contrast-[105%] group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700 opacity-85 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050e0a] via-transparent to-black/40" />

                <div className="absolute top-3 left-3 flex gap-2 z-10">
                  <span className="bg-[#020704]/90 text-[#c8a961] text-[10px] font-sans font-extrabold uppercase tracking-widest px-3 py-1 border border-[#c8a961]/40 backdrop-blur-md shadow-md">
                    {article.categoryLabel}
                  </span>
                </div>

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#020704]/90 border border-[#c8a961] text-[#c8a961] text-xs font-sans font-bold uppercase tracking-widest rounded-sm">
                    <Eye size={14} /> Tampilkan Detail
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6 relative bg-gradient-to-b from-[#050e0a] to-[#030906]">
                <div className="flex items-center gap-3 text-xs font-sans text-gray-400 mb-3">
                  <div className="flex items-center gap-1.5 text-gray-300">
                    <Calendar size={13} className="text-[#c8a961]" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#f0e8d5] group-hover:text-[#c8a961] transition-colors leading-snug mb-3 uppercase tracking-wide font-serif">
                  {article.title}
                </h3>

                <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 flex-grow line-clamp-3">
                  {article.description}
                </p>

                <div className="pt-4 border-t border-[#132a1e] flex items-center justify-between text-[#c8a961] text-xs font-sans font-bold uppercase tracking-widest group-hover:text-[#e0cb8d]">
                  <span>{currentLabels.readDispatch}</span>
                  <ArrowRight size={16} className="transform group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>

      {/* Detail Modal Overlay dengan Animasi Fade & Scale */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArticle(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-3xl max-h-[90vh] bg-[#050e0a] border border-[#c8a961]/60 text-[#e0e6db] shadow-[0_0_50px_rgba(200,169,97,0.25)] overflow-y-auto rounded-sm flex flex-col font-serif"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 z-30 p-2 bg-[#020704]/80 text-[#c8a961] border border-[#c8a961]/40 hover:bg-[#c8a961] hover:text-black transition-all duration-200 rounded-full"
                title={currentLabels.closeModal}
              >
                <X size={20} />
              </button>

              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black flex-shrink-0">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050e0a] via-[#050e0a]/40 to-transparent" />
                
                <div className="absolute bottom-4 left-6 flex items-center gap-2">
                  <span className="bg-[#020704]/90 text-[#c8a961] text-xs font-sans font-extrabold uppercase tracking-widest px-3 py-1 border border-[#c8a961]/50 backdrop-blur-md">
                    {selectedArticle.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-6 flex-grow">
                <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-gray-400 border-b border-[#132a1e] pb-4">
                  <div className="flex items-center gap-1.5 text-[#c8a961]">
                    <Calendar size={14} />
                    <span>{selectedArticle.date}</span>
                  </div>
                  {selectedArticle.author && (
                    <div className="text-gray-300 font-semibold italic">
                      {currentLabels.authorLabel}: <span className="text-[#c8a961]">{selectedArticle.author}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#f0e8d5] uppercase tracking-wide leading-tight">
                  {selectedArticle.title}
                </h3>

                <p className="text-sm sm:text-base font-sans text-[#c8a961] bg-[#081810] border-l-2 border-[#c8a961] p-4 italic leading-relaxed">
                  "{selectedArticle.description}"
                </p>

                <div className="text-sm sm:text-base font-sans text-gray-300 leading-relaxed space-y-4">
                  <p>{selectedArticle.fullContent}</p>
                </div>

                <div className="pt-6 border-t border-[#132a1e] flex justify-end">
                  <button
                    onClick={() => setSelectedArticle(null)}
                    className="px-6 py-2.5 bg-[#0f281b] border border-[#c8a961] text-[#c8a961] font-sans font-bold text-xs uppercase tracking-widest hover:bg-[#c8a961] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(200,169,97,0.2)]"
                  >
                    {currentLabels.closeModal}
                  </button>
                </div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}