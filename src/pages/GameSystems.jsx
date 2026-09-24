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
    pillars: [
      {
        id: 'explore',
        title: 'JELAJAH',
        summary: 'Jelajahi hutan purba, reruntuhan tersembunyi, dan wilayah yang belum tersentuh.',
        headline: 'TEMUKAN JALAN YANG TAK PERNAH TERCATAT DI PETA.',
        description: 'Jelajahi dunia Nusantara: Lost Realm secara bebas tanpa dipaksa mengikuti jalur utama. Temukan reruntuhan kerajaan kuno, gua tersembunyi, desa yang terlupakan, dan tempat-tempat sakral melalui petunjuk yang ada di lingkungan. Amati jejak, bentuk medan, suara alam, serta perubahan cuaca untuk menemukan jalan dan rahasia yang tersembunyi.',
        mechanicTitle: 'Eksplorasi Berbasis Lingkungan',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Eksplorasi Bebas Tanpa Jalur Utama yang Kaku',
          'Rahasia & Lokasi Tersembunyi yang Ditemukan Melalui Petunjuk Lingkungan',
          'Perubahan Cuaca dan Kondisi Alam yang Mempengaruhi Eksplorasi'
        ],
        deepDetail: {
          overview: 'Pemain tidak selalu diberi penanda lokasi atau arah yang jelas. Dunia dirancang agar pemain memperhatikan lingkungan dan menemukan sendiri tempat-tempat yang tersembunyi.',
          mechanics: [
            'Petunjuk Lingkungan: Gunakan jejak kaki, suara, cahaya, aliran air, ukiran kuno, dan perubahan vegetasi untuk menemukan lokasi tersembunyi.',
            'Eksplorasi Vertikal: Panjat tebing, melintasi akar pohon, menyeberangi sungai, dan memasuki celah sempit untuk mencapai area yang sulit dijangkau.',
            'Dunia yang Bereaksi: Kabut, hujan, angin, dan perubahan kondisi lingkungan dapat membuka atau menutup jalur tertentu.',
            'Penemuan Rahasia: Pemain dapat menemukan reruntuhan, artefak kuno, tempat sakral, dan jalur tersembunyi yang tidak wajib ditemukan untuk menyelesaikan cerita utama.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'BERTAHAN',
        summary: 'Hadapi makhluk buas, lingkungan berbahaya, dan ancaman yang menguasai setiap wilayah.',
        headline: 'BERTAHAN HIDUP DI TANAH YANG TIDAK MENGENAL AMPUN.',
        description: 'Setiap wilayah memiliki ancaman yang berbeda. Hadapi makhluk liar, hindari bahaya alam, kelola stamina, dan manfaatkan lingkungan untuk bertahan hidup. Kenali pola serangan musuh, cari tempat aman, dan tentukan kapan harus bertarung atau melarikan diri.',
        mechanicTitle: 'Sistem Survival Adaptif',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Pertarungan Real-Time Melawan Makhluk Penguasa Wilayah',
          'Pemanfaatan Lingkungan untuk Bertahan dan Menghindari Ancaman',
          'Stamina, Kondisi Karakter, dan Sumber Daya yang Harus Dikelola'
        ],
        deepDetail: {
          overview: 'Bertahan hidup bukan hanya tentang mengalahkan musuh. Pemain harus memahami lingkungan, membaca pola ancaman, mengatur stamina, dan menggunakan kondisi sekitar untuk mendapatkan keuntungan.',
          mechanics: [
            'Combat & Evasion: Serang, bertahan, menghindar, dan mencari celah berdasarkan pola serangan setiap makhluk.',
            'Environmental Survival: Gunakan pepohonan, batu, sungai, tebing, dan area sempit untuk menghindari atau mengendalikan musuh.',
            'Resource Management: Kelola stamina, perlengkapan, dan sumber daya agar tetap mampu bertahan selama perjalanan.',
            'Threat Awareness: Setiap wilayah memiliki tingkat ancaman berbeda. Pemain harus mengenali tanda-tanda keberadaan makhluk sebelum menghadapi mereka.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'TEMUKAN',
        summary: 'Ungkap rahasia peradaban kuno melalui artefak, prasasti, teka-teki, dan jejak masa lalu.',
        headline: 'UNGKAP RAHASIA YANG TERKUBUR SELAMA RATUSAN TAHUN.',
        description: 'Temukan jejak peradaban yang telah lama hilang melalui prasasti kuno, artefak, reruntuhan, dan simbol misterius. Amati lingkungan, kumpulkan petunjuk, pecahkan teka-teki, dan susun kembali potongan sejarah untuk mengungkap rahasia Lost Realm.',
        mechanicTitle: 'Sistem Investigasi & Rekonstruksi Sejarah',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigasi Artefak, Prasasti, dan Reruntuhan Kuno',
          'Teka-Teki Lingkungan yang Terhubung dengan Sejarah Dunia',
          'Pengumpulan Petunjuk untuk Mengungkap Lore dan Rahasia Lost Realm'
        ],
        deepDetail: {
          overview: 'Tidak semua rahasia Lost Realm dijelaskan secara langsung. Pemain harus mengamati lingkungan, menemukan petunjuk tersembunyi, dan menghubungkan berbagai peninggalan untuk memahami apa yang sebenarnya terjadi di masa lalu.',
          mechanics: [
            'Environmental Investigation: Periksa prasasti, patung, artefak, reruntuhan, dan simbol kuno untuk menemukan petunjuk.',
            'Ancient Puzzle: Pecahkan mekanisme kuno, susunan simbol, pola cahaya, dan teka-teki lingkungan untuk membuka area tersembunyi.',
            'Clue Collection: Kumpulkan potongan informasi dari berbagai lokasi dan hubungkan petunjuk untuk menemukan kebenaran.',
            'Lore Reconstruction: Susun kembali sejarah kerajaan kuno, asal-usul kutukan, dan jejak Raja Kutukan melalui penemuan yang tersebar di seluruh Lost Realm.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'BERGANTI',
        summary: 'Beralih di antara Empat Penjaga dan manfaatkan kemampuan mereka untuk menghadapi setiap situasi.',
        headline: 'BERGANTI PENJAGA. SATUKAN KEKUATAN MEREKA.',
        description: 'Kendalikan Empat Penjaga dengan kemampuan, senjata, dan gaya bertarung yang berbeda. Beralih di antara mereka secara langsung untuk menyesuaikan strategi, menghadapi berbagai jenis musuh, melewati rintangan, dan memanfaatkan kemampuan unik setiap Penjaga.',
        mechanicTitle: 'Guardian Switching',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Pergantian Empat Guardian Secara Langsung',
          'Kemampuan & Gaya Bertarung Unik Setiap Guardian',
          'Kombinasi Kemampuan Guardian untuk Menghadapi Berbagai Situasi'
        ],
        deepDetail: {
          overview: 'Empat Guardian bukan sekadar karakter yang berbeda, tetapi bagian dari satu sistem gameplay. Pemain harus memilih Guardian yang tepat berdasarkan musuh, lingkungan, dan tantangan yang dihadapi.',
          mechanics: [
            'Instant Switching: Beralih dari satu Guardian ke Guardian lain secara langsung tanpa menghentikan alur permainan.',
            'Unique Abilities: Setiap Guardian memiliki senjata, kemampuan, dan gaya bertarung yang berbeda sehingga memiliki fungsi masing-masing.',
            'Strategic Switching: Gunakan Guardian yang paling sesuai untuk menghadapi tipe musuh, rintangan, atau kondisi tertentu.',
            'Ability Combination: Gabungkan kemampuan beberapa Guardian untuk menciptakan serangan berantai, membuka jalur, atau mengatasi tantangan yang tidak dapat diselesaikan oleh satu Guardian saja.'
          ]
        }
      },
    ]
  },
  ENG: {
    tagline: 'NEXT-GEN ACTION ADVENTURE SYSTEMS',
    title: 'THE REALM DOES NOT FORGIVE.',
    subtitle: 'Surviving the lost archipelago requires mastering seamless parkour, precision kinetic stances, and ancient astronomical alignment.',
    pillars: [
      {
        id: 'explore',
        title: 'EXPLORE',
        summary: 'Explore ancient forests, hidden ruins, and untouched territories.',
        headline: 'DISCOVER PATHS THAT WERE NEVER MARKED ON ANY MAP.',
        description: 'Explore the world of Nusantara: Lost Realm freely without being forced to follow a fixed main path. Discover ancient kingdom ruins, hidden caves, forgotten villages, and sacred places through clues found within the environment. Observe tracks, terrain formations, natural sounds, and changing weather conditions to uncover hidden paths and secrets.',
        mechanicTitle: 'Environment-Based Exploration',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Free Exploration Without a Strict Main Path',
          'Hidden Secrets & Locations Discovered Through Environmental Clues',
          'Changing Weather and Environmental Conditions Affect Exploration'
        ],
        deepDetail: {
          overview: 'Players are not always given clear location markers or directions. The world is designed to encourage players to observe their surroundings and discover hidden places on their own.',
          mechanics: [
            'Environmental Clues: Use footprints, sounds, light, flowing water, ancient carvings, and changes in vegetation to discover hidden locations.',
            'Vertical Exploration: Climb cliffs, traverse tree roots, cross rivers, and enter narrow passages to reach hard-to-access areas.',
            'A Reactive World: Fog, rain, wind, and changing environmental conditions can open or block certain paths.',
            'Secret Discoveries: Players can uncover ruins, ancient artifacts, sacred sites, and hidden paths that are not required to complete the main story.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'SURVIVE',
        summary: 'Face savage creatures, dangerous environments, and threats that dominate every territory.',
        headline: 'SURVIVE IN A LAND THAT SHOWS NO MERCY.',
        description: 'Every territory presents a different set of threats. Face wild creatures, avoid environmental hazards, manage your stamina, and use the surroundings to survive. Learn enemy attack patterns, find safe locations, and decide when to fight or when to escape.',
        mechanicTitle: 'Adaptive Survival System',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Real-Time Combat Against Territorial Creatures',
          'Use the Environment to Survive and Avoid Threats',
          'Manage Stamina, Character Condition, and Resources'
        ],
        deepDetail: {
          overview: 'Survival is not simply about defeating enemies. Players must understand the environment, read threat patterns, manage their stamina, and use their surroundings to gain an advantage.',
          mechanics: [
            'Combat & Evasion: Attack, defend, dodge, and find openings based on each creature’s attack patterns.',
            'Environmental Survival: Use trees, rocks, rivers, cliffs, and narrow areas to evade or control enemies.',
            'Resource Management: Manage stamina, equipment, and resources to remain capable of surviving throughout the journey.',
            'Threat Awareness: Each territory has a different threat level. Players must recognize signs of nearby creatures before confronting them.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'DISCOVER',
        summary: 'Uncover the secrets of an ancient civilization through artifacts, inscriptions, puzzles, and traces of the past.',
        headline: 'UNCOVER SECRETS BURIED FOR HUNDREDS OF YEARS.',
        description: 'Discover the remnants of a long-lost civilization through ancient inscriptions, artifacts, ruins, and mysterious symbols. Observe the environment, gather clues, solve puzzles, and piece together fragments of history to uncover the secrets of the Lost Realm.',
        mechanicTitle: 'Investigation & Historical Reconstruction System',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigate Ancient Artifacts, Inscriptions, and Ruins',
          'Environmental Puzzles Connected to the World’s History',
          'Collect Clues to Uncover the Lore and Secrets of the Lost Realm'
        ],
        deepDetail: {
          overview: 'Not every secret of the Lost Realm is explained directly. Players must observe their surroundings, uncover hidden clues, and connect different remnants to understand what truly happened in the past.',
          mechanics: [
            'Environmental Investigation: Examine inscriptions, statues, artifacts, ruins, and ancient symbols to uncover clues.',
            'Ancient Puzzles: Solve ancient mechanisms, symbol arrangements, light patterns, and environmental puzzles to unlock hidden areas.',
            'Clue Collection: Gather fragments of information from different locations and connect the clues to uncover the truth.',
            'Lore Reconstruction: Piece together the history of the ancient kingdom, the origin of the curse, and the traces of the Cursed King through discoveries scattered throughout the Lost Realm.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'SWITCH',
        summary: 'Switch between the Four Guardians and harness their abilities to overcome every situation.',
        headline: 'SWITCH GUARDIANS. UNITE THEIR POWER.',
        description: 'Control the Four Guardians, each with unique abilities, weapons, and fighting styles. Switch between them instantly to adapt your strategy, confront different types of enemies, overcome obstacles, and utilize each Guardian’s unique strengths.',
        mechanicTitle: 'Guardian Switching',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Instant Switching Between Four Guardians',
          'Unique Abilities & Fighting Styles for Each Guardian',
          'Combine Guardian Abilities to Overcome Different Situations'
        ],
        deepDetail: {
          overview: 'The Four Guardians are more than just different characters—they are part of a unified gameplay system. Players must choose the right Guardian based on the enemy, environment, and challenges they encounter.',
          mechanics: [
            'Instant Switching: Switch from one Guardian to another instantly without interrupting the flow of gameplay.',
            'Unique Abilities: Each Guardian has different weapons, abilities, and fighting styles, giving them a distinct role in gameplay.',
            'Strategic Switching: Choose the Guardian best suited to deal with specific enemy types, obstacles, or environmental conditions.',
            'Ability Combination: Combine the abilities of multiple Guardians to create chain attacks, unlock paths, or overcome challenges that cannot be solved by a single Guardian alone.'
          ]
        }
      },
    ]
  }
};

const pillarStyles = {
  explore: {
    glowColor: 'shadow-[0_0_35px_-5px_rgba(16,185,129,0.3)] border-emerald-500/50',
    dotColor: 'bg-emerald-400',
    badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
  },
  survive: {
    glowColor: 'shadow-[0_0_35px_-5px_rgba(245,158,11,0.3)] border-amber-500/50',
    dotColor: 'bg-amber-400',
    badgeColor: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
  },
  discover: {
    glowColor: 'shadow-[0_0_35px_-5px_rgba(234,179,8,0.3)] border-yellow-500/50',
    dotColor: 'bg-yellow-400',
    badgeColor: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30'
  },
  switching: {
    glowColor: 'shadow-[0_0_35px_-5px_rgba(168,85,247,0.3)] border-purple-500/50',
    dotColor: 'bg-purple-400',
    badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
  }
};

// Framer Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }
  }
};

export default function GameSystems({ lang = 'IND' }) {
  const [activeTab, setActiveTab] = useState('explore');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = systemsTranslations[lang] || systemsTranslations.IND;
  const currentPillar = t.pillars.find((item) => item.id === activeTab) || t.pillars[0];
  const activeStyle = pillarStyles[currentPillar.id] || pillarStyles.explore;

  return (
    <section id="systems" className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-[#040a06] relative overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] md:w-[700px] h-[350px] bg-emerald-900/10 blur-[100px] md:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-8 md:space-y-12">
        {/* Header Section dengan Animasi Scroll */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center space-y-3 md:space-y-4 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-[0.2em] text-emerald-400 uppercase bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/40">
            <Sparkles className="w-3.5 h-3.5" />
            {t.tagline}
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-black tracking-tight text-white leading-tight uppercase">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-gray-400 max-w-2xl mx-auto font-light leading-relaxed px-2">
            {t.subtitle}
          </p>
        </motion.header>

        {/* Pillars Tab Grid dengan Staggered Scroll Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {t.pillars.map((pillar) => {
            const isActive = activeTab === pillar.id;
            const style = pillarStyles[pillar.id] || pillarStyles.explore;

            return (
              <motion.button
                key={pillar.id}
                variants={itemVariants}
                onClick={() => setActiveTab(pillar.id)}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`text-left p-4 sm:p-5 rounded-xl border transition-colors duration-300 relative flex flex-col justify-between backdrop-blur-md group ${
                  isActive
                    ? `bg-[#0d1410] ${style.glowColor}`
                    : 'bg-[#0a0f0c]/60 border-emerald-900/20 hover:border-emerald-700/40 hover:bg-[#0d1410]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <span className="font-mono text-xs sm:text-sm tracking-widest text-white font-bold group-hover:text-emerald-400 transition-colors">
                      {pillar.title}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${style.dotColor} shadow-[0_0_8px]`} />
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                    {pillar.summary}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Display Card dengan Animated Content Switch */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="bg-[#0b120e]/80 border border-emerald-900/30 rounded-2xl p-5 sm:p-6 md:p-10 backdrop-blur-xl shadow-2xl relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <div className="mb-4 sm:mb-6">
                <span className={`inline-block text-[10px] sm:text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-md border ${activeStyle.badgeColor}`}>
                  PILLAR: {currentPillar.title}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                {/* Detail Info Left */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-6 order-2 lg:order-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-white leading-snug">
                    {currentPillar.headline}
                  </h3>

                  <p className="text-xs sm:text-sm md:text-base text-gray-400 leading-relaxed font-light">
                    {currentPillar.description}
                  </p>

                  <div className="space-y-2 sm:space-y-3 pt-2">
                    <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-500 uppercase font-bold block mb-2 sm:mb-3">
                      CORE SYSTEM FEATURES:
                    </span>
                    {currentPillar.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 sm:gap-3 text-xs sm:text-sm text-gray-300">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Card Image Showcase */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <motion.div 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative h-56 sm:h-72 md:h-80 w-full rounded-xl overflow-hidden border border-emerald-900/40 cursor-pointer shadow-lg hover:border-emerald-500/60 transition-colors duration-300"
                  >
                    <img 
                      src={currentPillar.image} 
                      alt={currentPillar.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-[#070b09]/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Card Bottom Meta */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between pointer-events-none gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-emerald-400 uppercase block truncate">
                          {currentPillar.mechanicTag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-mono text-white font-bold truncate">
                          {currentPillar.mechanicTitle.split('(')[0]}
                        </h4>
                      </div>
                      <span className="flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-amber-400 bg-black/60 px-2 py-1 rounded border border-amber-500/30 shrink-0">
                        <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> DETAIL
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Gameplay Detail Modal dengan Animasi Spring */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#0b120e] border border-emerald-800/50 rounded-2xl max-w-2xl w-full p-5 sm:p-6 md:p-8 relative shadow-2xl space-y-4 sm:space-y-6 max-h-[90vh] overflow-y-auto custom-scrollbar z-10"
            >
              {/* Sticky Close Button */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white bg-emerald-950/80 p-1.5 sm:p-2 rounded-full border border-emerald-800/40 transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              <div className="space-y-2 pr-8">
                <span className={`inline-block text-[10px] sm:text-xs font-mono font-bold tracking-widest px-2.5 py-0.5 rounded border ${activeStyle.badgeColor}`}>
                  GAMEPLAY DEEP DIVE: {currentPillar.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-tight">
                  {currentPillar.mechanicTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-light">
                {currentPillar.deepDetail.overview}
              </p>

              <div className="space-y-2 sm:space-y-3 bg-[#050907] p-3.5 sm:p-4 rounded-xl border border-emerald-900/40">
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
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold px-5 py-2.5 rounded-lg transition-colors text-center"
                >
                  TUTUP DETAIL
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}