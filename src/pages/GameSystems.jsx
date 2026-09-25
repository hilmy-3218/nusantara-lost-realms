import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X, Eye } from 'lucide-react';
import explore from '../assets/gameplay/explore.jpg';
import survive from '../assets/gameplay/survive.jpg';
import discover from '../assets/gameplay/discover.jpg';
import switching from '../assets/gameplay/guardiant_switching.jpg';

const systemsTranslations = {
  IND: {
    tagline: 'SISTEM AKSI PETUALANGAN GENERASI BARU',
    title: 'ALAM INI TIDAK MENGENAL AMPUN.',
    subtitle: 'Bertahan hidup di kepulauan yang hilang membutuhkan penguasaan parkour tanpa celah, kuda-kuda kinetik presisi, dan keselarasan astronomi kuno.',
    closeText: 'TUTUP DETAIL',
    pillars: [
      {
        id: 'explore',
        title: 'JELAJAH',
        summary: 'Jelajahi hutan purba, reruntuhan tersembunyi, dan wilayah yang belum tersentuh.',
        headline: 'TEMUKAN JALAN YANG TAK PERNAH TERCATAT DI PETA.',
        description: 'Jelajahi dunia Nusantara: Lost Realm secara bebas tanpa dipaksa mengikuti jalur utama. Temukan reruntuhan kerajaan kuno, gua tersembunyi, desa yang terlupakan, dan tempat-tempat sakral melalui petunjuk yang ada di lingkungan.',
        mechanicTitle: 'Eksplorasi Berbasis Lingkungan',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Eksplorasi Bebas Tanpa Jalur Utama yang Kaku',
          'Rahasia & Lokasi Tersembunyi via Petunjuk Lingkungan',
          'Perubahan Cuaca & Alam Mempengaruhi Eksplorasi'
        ],
        deepDetail: {
          overview: 'Pemain tidak selalu diberi penanda lokasi atau arah yang jelas. Dunia dirancang agar pemain memperhatikan lingkungan dan menemukan sendiri tempat-tempat yang tersembunyi.',
          mechanics: [
            'Petunjuk Lingkungan: Gunakan jejak kaki, suara, cahaya, aliran air, ukiran kuno, dan perubahan vegetasi.',
            'Eksplorasi Vertikal: Panjat tebing, melintasi akar pohon, menyeberangi sungai, dan memasuki celah sempit.',
            'Dunia yang Bereaksi: Kabut, hujan, angin, dan kondisi alam dapat membuka atau menutup jalur tertentu.',
            'Penemuan Rahasia: Temukan reruntuhan, artefak kuno, dan tempat sakral tersembunyi.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'BERTAHAN',
        summary: 'Hadapi makhluk buas, lingkungan berbahaya, dan ancaman yang menguasai wilayah.',
        headline: 'BERTAHAN HIDUP DI TANAH YANG TIDAK MENGENAL AMPUN.',
        description: 'Setiap wilayah memiliki ancaman yang berbeda. Hadapi makhluk liar, hindari bahaya alam, kelola stamina, dan manfaatkan lingkungan untuk bertahan hidup.',
        mechanicTitle: 'Sistem Survival Adaptif',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Pertarungan Real-Time Melawan Makhluk Penguasa Wilayah',
          'Pemanfaatan Lingkungan untuk Bertahan & Mengendalikan Musuh',
          'Pengelolaan Stamina, Kondisi Karakter, dan Sumber Daya'
        ],
        deepDetail: {
          overview: 'Bertahan hidup bukan hanya tentang mengalahkan musuh. Pemain harus memahami lingkungan, membaca pola ancaman, mengatur stamina, dan menggunakan kondisi sekitar.',
          mechanics: [
            'Combat & Evasion: Serang, bertahan, menghindar, dan cari celah berdasarkan pola serangan musuh.',
            'Environmental Survival: Gunakan pepohonan, batu, sungai, dan tebing untuk kontrol area.',
            'Resource Management: Kelola stamina, perlengkapan, dan sumber daya perjalanan.',
            'Threat Awareness: Kenali tanda keberadaan makhluk sebelum menghadapi mereka.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'TEMUKAN',
        summary: 'Ungkap rahasia peradaban kuno melalui artefak, prasasti, dan teka-teki.',
        headline: 'UNGKAP RAHASIA YANG TERKUBUR SELAMA RATUSAN TAHUN.',
        description: 'Temukan jejak peradaban yang telah lama hilang melalui prasasti kuno, artefak, reruntuhan, dan simbol misterius. Pecahkan teka-teki untuk mengungkap rahasia Lost Realm.',
        mechanicTitle: 'Sistem Investigasi & Rekonstruksi Sejarah',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigasi Artefak, Prasasti, dan Reruntuhan Kuno',
          'Teka-Teki Lingkungan Terhubung dengan Sejarah Dunia',
          'Pengumpulan Petunjuk untuk Mengungkap Lore & Rahasia'
        ],
        deepDetail: {
          overview: 'Tidak semua rahasia Lost Realm dijelaskan secara langsung. Pemain harus mengamati lingkungan, menemukan petunjuk tersembunyi, dan menghubungkan peninggalan kuno.',
          mechanics: [
            'Environmental Investigation: Periksa prasasti, patung, artefak, dan simbol kuno.',
            'Ancient Puzzle: Pecahkan mekanisme kuno, susunan simbol, dan pola cahaya.',
            'Clue Collection: Kumpulkan dan hubungkan potongan informasi dari berbagai lokasi.',
            'Lore Reconstruction: Susun kembali sejarah kerajaan kuno dan asal-usul kutukan.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'BERGANTI',
        summary: 'Beralih di antara Empat Penjaga dan manfaatkan kemampuan unik meeka.',
        headline: 'BERGANTI PENJAGA. SATUKAN KEKUATAN MEREKA.',
        description: 'Kendalikan Empat Penjaga dengan kemampuan, senjata, dan gaya bertarung yang berbeda. Beralih secara langsung untuk menyesuaikan strategi dan mengatasi berbagai rintangan.',
        mechanicTitle: 'Guardian Switching',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Pergantian Empat Guardian Secara Langsung (Instant Switch)',
          'Kemampuan & Gaya Bertarung Unik Setiap Guardian',
          'Kombinasi Sinergi Kemampuan untuk Mengatasi Rintangan'
        ],
        deepDetail: {
          overview: 'Empat Guardian adalah bagian dari satu sistem gameplay terpadu. Pemain harus memilih Guardian yang tepat berdasarkan situasi pertarungan dan eksplorasi.',
          mechanics: [
            'Instant Switching: Beralih antar Guardian secara langsung tanpa memutus alur aksi.',
            'Unique Abilities: Setiap Guardian memiliki peran, senjata, dan skill yang berbeda.',
            'Strategic Switching: Gunakan Guardian yang paling responsif terhadap tipe ancaman tertentu.',
            'Ability Combination: Gabungkan skill beberapa Guardian untuk eksekusi kombo berantai.'
          ]
        }
      }
    ]
  },
  ENG: {
    tagline: 'NEXT-GEN ACTION ADVENTURE SYSTEMS',
    title: 'THE REALM DOES NOT FORGIVE.',
    subtitle: 'Surviving the lost archipelago requires mastering seamless parkour, precision kinetic stances, and ancient astronomical alignment.',
    closeText: 'CLOSE DETAILS',
    pillars: [
      {
        id: 'explore',
        title: 'EXPLORE',
        summary: 'Explore ancient forests, hidden ruins, and untouched territories.',
        headline: 'DISCOVER PATHS THAT WERE NEVER MARKED ON ANY MAP.',
        description: 'Explore the world of Nusantara: Lost Realm freely without being forced to follow a fixed main path. Discover ancient kingdom ruins, hidden caves, and sacred places through environmental clues.',
        mechanicTitle: 'Environment-Based Exploration',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Free Exploration Without a Strict Main Path',
          'Hidden Secrets Discovered Through Environmental Clues',
          'Changing Weather & Dynamic Environmental Impacts'
        ],
        deepDetail: {
          overview: 'Players are not always given clear location markers. The world is designed to encourage players to observe their surroundings and discover secrets independently.',
          mechanics: [
            'Environmental Clues: Use footprints, sounds, light, flowing water, and ancient carvings.',
            'Vertical Exploration: Climb cliffs, traverse tree roots, cross rivers, and enter narrow passages.',
            'A Reactive World: Fog, rain, wind, and conditions open or block paths dynamically.',
            'Secret Discoveries: Uncover optional ruins, ancient artifacts, and sacred sites.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'SURVIVE',
        summary: 'Face savage creatures, dangerous environments, and territorial threats.',
        headline: 'SURVIVE IN A LAND THAT SHOWS NO MERCY.',
        description: 'Every territory presents distinct threats. Face wild creatures, avoid hazards, manage stamina, and use surroundings to survive.',
        mechanicTitle: 'Adaptive Survival System',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Real-Time Combat Against Territorial Creatures',
          'Environmental Tactics for Survival and Evasion',
          'Stamina, Condition, and Resource Management'
        ],
        deepDetail: {
          overview: 'Survival goes beyond defeating enemies. Players must read threat patterns, manage resources, and leverage surroundings.',
          mechanics: [
            'Combat & Evasion: Attack, defend, dodge, and counter based on creature patterns.',
            'Environmental Survival: Utilize terrain, foliage, and cliffs for tactical control.',
            'Resource Management: Maintain stamina and equipment during long journeys.',
            'Threat Awareness: Recognize environmental signs before entering combat.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'DISCOVER',
        summary: 'Uncover ancient civilization secrets through artifacts and puzzles.',
        headline: 'UNCOVER SECRETS BURIED FOR HUNDREDS OF YEARS.',
        description: 'Discover the remnants of a long-lost civilization through inscriptions, artifacts, and puzzles to piece together the Lost Realm lore.',
        mechanicTitle: 'Investigation & History System',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigate Ancient Artifacts, Inscriptions, & Ruins',
          'Environmental Puzzles Connected to World History',
          'Clue Collection to Uncover Lost Realm Lore'
        ],
        deepDetail: {
          overview: 'Lore is uncovered actively. Players observe surroundings, connect findings, and solve ancient mechanisms.',
          mechanics: [
            'Environmental Investigation: Examine ancient symbols, statues, and ruins.',
            'Ancient Puzzles: Solve mechanical puzzles, light alignments, and symbol arrays.',
            'Clue Collection: Gather scattered info fragments to reveal underlying truths.',
            'Lore Reconstruction: Reconstruct ancient kingdom history and curse origins.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'SWITCH',
        summary: 'Switch between Four Guardians and leverage their unique traits.',
        headline: 'SWITCH GUARDIANS. UNITE THEIR POWER.',
        description: 'Control Four Guardians with distinct skills and combat styles. Switch seamlessly to adapt strategies and solve environmental challenges.',
        mechanicTitle: 'Guardian Switching',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Instant Real-Time Guardian Switching',
          'Unique Weapons, Skills, & Playstyles per Guardian',
          'Ability Sinnergy to Overcome Complex Obstacles'
        ],
        deepDetail: {
          overview: 'The Four Guardians form a unified tactical dynamic. Choose the right Guardian based on enemy types and environmental needs.',
          mechanics: [
            'Instant Switching: Transition between Guardians without breaking combat flow.',
            'Unique Abilities: Tailored combat roles and utility for each Guardian.',
            'Strategic Switching: Counter specific threats with appropriate Guardian traits.',
            'Ability Combination: Chain abilities together for devastating tactical setups.'
          ]
        }
      }
    ]
  }
};

const pillarStyles = {
  explore: {
    glowColor: 'shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)] border-emerald-500/50',
    dotColor: 'bg-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  survive: {
    glowColor: 'shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)] border-amber-500/50',
    dotColor: 'bg-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  discover: {
    glowColor: 'shadow-[0_0_25px_-5px_rgba(234,179,8,0.3)] border-yellow-500/50',
    dotColor: 'bg-yellow-400',
    badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
  },
  switching: {
    glowColor: 'shadow-[0_0_25px_-5px_rgba(168,85,247,0.3)] border-purple-500/50',
    dotColor: 'bg-purple-400',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export default function GameSystems({ lang = 'IND' }) {
  const [activeTab, setActiveTab] = useState('explore');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = systemsTranslations[lang] || systemsTranslations.IND;
  const currentPillar = t.pillars.find((item) => item.id === activeTab) || t.pillars[0];
  const activeStyle = pillarStyles[currentPillar.id] || pillarStyles.explore;

  return (
    <section id="systems" className="py-16 md:py-28 px-3 sm:px-6 lg:px-16 bg-[#040a06] relative">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] sm:w-[500px] md:w-[700px] h-[300px] bg-emerald-900/10 blur-[90px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-10 md:space-y-14">
        {/* Header Section - Diberi relative dan z-10 agar selalu berada di ATAS kartu saat di-hover */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center space-y-4 max-w-4xl mx-auto relative z-10 pt-4"
        >
          <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-xs font-mono tracking-[0.15em] sm:tracking-[0.2em] text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-800/40">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
            <span>{t.tagline}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white uppercase leading-[1.15] sm:leading-[1.2] py-1">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-2">
            {t.subtitle}
          </p>
        </motion.header>

        {/* Pillars Tab Options - Diberi mt-6 agar ada jarak aman dari subtitle */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto pb-4 pt-2 sm:pb-0 scrollbar-none snap-x snap-mandatory -mx-3 px-3 sm:mx-0 sm:px-0 mt-6"
        >
          {t.pillars.map((pillar) => {
            const isActive = activeTab === pillar.id;
            const style = pillarStyles[pillar.id] || pillarStyles.explore;

            return (
              <motion.button
                key={pillar.id}
                variants={itemVariants}
                onClick={() => setActiveTab(pillar.id)}
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`snap-center shrink-0 w-[220px] sm:w-auto text-left p-3.5 sm:p-5 rounded-xl border transition-all duration-300 relative flex flex-col justify-between backdrop-blur-md group hover:z-10 ${
                  isActive
                    ? `bg-[#0d1410] ${style.glowColor}`
                    : 'bg-[#0a0f0c]/60 border-emerald-900/20 hover:border-emerald-700/40 hover:bg-[#0d1410]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5 sm:mb-3">
                    <span className="font-mono text-xs sm:text-sm tracking-widest text-white font-bold group-hover:text-emerald-400 transition-colors">
                      {pillar.title}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${style.dotColor} shadow-[0_0_8px] shrink-0`} />
                  </div>
                  <p className="text-[11px] sm:text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {pillar.summary}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Display Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-[#0b120e]/80 border border-emerald-900/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-10 backdrop-blur-xl shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="mb-3 sm:mb-6">
                <span className={`inline-block text-[9px] sm:text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 sm:py-1 rounded-md border ${activeStyle.badgeColor}`}>
                  PILLAR: {currentPillar.title}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 items-center">
                {/* Detail Info Left */}
                <div className="lg:col-span-6 space-y-3 sm:space-y-6 order-2 lg:order-1">
                  <h3 className="text-lg sm:text-2xl md:text-3xl font-serif font-bold text-white leading-snug">
                    {currentPillar.headline}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed font-light">
                    {currentPillar.description}
                  </p>

                  <div className="space-y-2 pt-1 sm:pt-2">
                    <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-500 uppercase font-bold block mb-1.5 sm:mb-3">
                      CORE SYSTEM FEATURES:
                    </span>
                    {currentPillar.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-tight sm:leading-normal">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card Image Showcase */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <motion.div 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative h-48 sm:h-72 md:h-80 w-full rounded-xl overflow-hidden border border-emerald-900/40 cursor-pointer shadow-lg hover:border-emerald-500/60 transition-colors duration-300"
                  >
                    <img 
                      src={currentPillar.image} 
                      alt={currentPillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-[#070b09]/30 to-transparent opacity-85 group-hover:opacity-70 transition-opacity" />

                    {/* Card Bottom Meta */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-emerald-400 uppercase block truncate">
                          {currentPillar.mechanicTag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-mono text-white font-bold truncate">
                          {currentPillar.mechanicTitle.split('(')[0]}
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 text-[9px] sm:text-[11px] font-mono text-amber-400 bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-amber-500/30 shrink-0">
                        <Eye className="w-3 h-3" /> DETAIL
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Gameplay Detail Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 280 }}
              className="bg-[#0b120e] border-t sm:border border-emerald-800/50 rounded-t-2xl sm:rounded-2xl max-w-2xl w-full p-4 sm:p-6 md:p-8 relative shadow-2xl space-y-3 sm:space-y-6 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto custom-scrollbar z-10"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white bg-emerald-950/80 p-1.5 sm:p-2 rounded-full border border-emerald-800/40 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="space-y-1 sm:space-y-2 pr-8">
                <span className={`inline-block text-[9px] sm:text-xs font-mono font-bold tracking-widest px-2 py-0.5 rounded border ${activeStyle.badgeColor}`}>
                  GAMEPLAY DEEP DIVE: {currentPillar.title}
                </span>
                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                  {currentPillar.mechanicTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {currentPillar.deepDetail.overview}
              </p>

              <div className="space-y-2 bg-[#050907] p-3 sm:p-4 rounded-xl border border-emerald-900/40">
                <span className="text-[10px] sm:text-xs font-mono text-amber-500 font-bold tracking-wider uppercase block">
                  ADVANCED MECHANICS BREAKDOWN:
                </span>
                {currentPillar.deepDetail.mechanics.map((item, idx) => (
                  <div key={idx} className="text-xs sm:text-sm text-gray-300 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded-lg transition-colors text-center active:scale-95"
                >
                  {t.closeText}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
