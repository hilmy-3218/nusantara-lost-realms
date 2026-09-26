import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Sparkles, X, Eye, Compass, Shield, Scroll, Repeat, ArrowUpRight } from 'lucide-react';
import explore from '../assets/gameplay/explore.jpg';
import survive from '../assets/gameplay/survive.jpg';
import discover from '../assets/gameplay/discover.jpg';
import switching from '../assets/gameplay/guardiant_switching.jpg';

const systemsTranslations = {
  IND: {
    tagline: 'MISTIK & SISTEM AKSI PETUALANGAN ALAM KUNO',
    title: 'ALAM NUSANTARA TIDAK MENGENAL AMPUN',
    subtitle: 'Bertahan hidup di kepulauan yang terisolasi membutuhkan penguasaan olah kanuragan, kelincahan menjelajah reruntuhan candi, dan keselarasan energi gaib nusantara',
    closeText: 'METERAI DETAIL',
    pillars: [
      {
        id: 'explore',
        title: 'JELAJAH',
        summary: 'Lintasi hutan rimba purba, reruntuhan candi, dan rimba mistis.',
        headline: 'TEMUKAN JALAN YANG TERHAPUS DARI PRASASTI KUNO.',
        description: 'Jelajahi keajaiban Nusantara secara bebas. Temukan reruntuhan kerajaan yang tenggelam, gua-gua sakral, dan tempat peristirahatan para dewa melalui penanda alam.',
        mechanicTitle: 'Eksplorasi Jelajah Alam Bebas',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Eksplorasi Tanpa Jalur Kaku via Penanda Alam',
          'Rahasia Prasasti & Tembalang Tersembunyi',
          'Pengaruh Iklim Tropis & Perubahan Cuaca Gaib'
        ],
        deepDetail: {
          overview: 'Dunia Nusantara dirancang tanpa petunjuk modern. Kepekaan mata dan telinga pemain dalam membaca angin, arus air, dan ukiran batu kuno adalah kunci utama penjelajahan.',
          mechanics: [
            'Petunjuk Lingkungan: Amati jejak pusaka, cahaya ilusi, gemerisik dedaunan, dan ukiran aksara kuno.',
            'Kelincahan Kanuragan: Memanjat tebing terjal, meniti akar pohon raksasa, dan menyeberangi jurang purba.',
            'Reaksi Kodrat Alam: Hujan lebat, kabut mistis, dan gerhana dapat membongkar atau menyembunyikan portal rahasia.',
            'Penemuan Pusaka: Temukan artefak legendaris dan altar pemujaan yang terlupakan.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'BERTAHAN',
        summary: 'Hadapi ancaman makhluk gaib dan keganasan rimba nusantara.',
        headline: 'BERTAHAN HIDUP DI TANAH YANG DIPENUHI SUMPAH KUNO.',
        description: 'Setiap jengkal tanah menyimpan bahaya. Hadapi binatang purba dan siluman penjaga, kelola stamina batin, serta manfaatkan flora mistis untuk bertahan.',
        mechanicTitle: 'Sistem Survival & Kanuragan Adaptif',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Pertarungan Real-Time Melawan Makhluk Penjaga Wilayah',
          'Taktik Lingkungan & Pemanfaatan Flora Herbal Mistik',
          'Pengelolaan Tenaga Dalam, Stamina, dan Ketahanan Tubuh'
        ],
        deepDetail: {
          overview: 'Bertahan bukan sekadar mengayunkan senjata. Pemain harus membaca gerakan lawan, mengatur hawa murni, serta memanfaatkan kontur tanah.',
          mechanics: [
            'Jurus & Menghindar: Baca pola serangan musuh, hindari racun gaib, dan balikkan keadaan dengan serangan balasan.',
            'Siasat Medan Tempur: Manfaatkan tebing tinggi, rawa beracun, dan reruntuhan batu sebagai perisai.',
            'Manajemen Sumber Daya: Racik ramuan dari tumbuhan langka dan jaga ketahanan stamina fisik.',
            'Intuisi Gaib: Rasakan getaran keberadaan musuh sebelum mereka menyerang dari kegelapan.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'SINGKAP',
        summary: 'Pecahkan teka-teki prasasti dan bangkitkan rahasia peradaban tua.',
        headline: 'SINGKAP RAHASIA YANG TERKUBUR DI BALIK RERUNTUHAN CANDI.',
        description: 'Rangkai potongan kisah peradaban yang musnah melalui prasasti kuno, relief sakral, dan manuskrip lontar untuk mengakhiri kutukan tanah Nusantara.',
        mechanicTitle: 'Rekonstruksi Lore & Teka-Teki Candi',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigasi Relief Candi, Artefak, dan Arca Kuno',
          'Teka-Teki Tata Surya & Tata Ruang Kerajaan Tua',
          'Pengumpulkan Fragments Lontar Rahasia Nusantara'
        ],
        deepDetail: {
          overview: 'Sejarah Nusantara tidak tertulis secara lugas. Anda harus mengamati simbol sakral, menyusun mekanisme batu kuno, dan memecahkan teka-teki elemen.',
          mechanics: [
            'Observasi Prasasti: Amati ukiran simbol kuno, arca dewa, dan susunan batu magis.',
            'Mekanisme Batu Kuno: Putar altar cermin, selaraskan pantulan cahaya matahari, dan buka gerbang rahasia.',
            'Pencarian Serpihan Lontar: Kumpulkan catatan masa lalu untuk memahami silsilah para dewa dan raja.',
            'Ritus Pembebasan: Bangkitkan energi tempat sakral untuk menetralkan kabut kegelapan.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'PENJAGA',
        summary: 'Beralih di antara Empat Guardian dengan pusaka & ajian unik.',
        headline: 'SATUKAN EMPAT KEKUATAN GUARDIAN PENJAGA ALAM.',
        description: 'Kendalikan Empat Penjaga Nusantara yang dianugerahi senjata pusaka dan ajian magis berbeda. Beralih secara instan dalam pertarungan untuk menciptakan kombo mematikan.',
        mechanicTitle: 'Sistem Berganti Penjaga Mistik',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Pergantian 4 Penjaga Secara Instan Tanpa Jeda Action',
          'Senjata Pusaka & Ajian Khusus Masing-masing Penjaga',
          'Sinergi Kombo Mistik untuk Menembus Pertahanan Musuh'
        ],
        deepDetail: {
          overview: 'Empat Penjaga mewakili empat elemen utama Nusantara. Keahlian Anda mengganti Penjaga saat bertarung menjadi faktor penentu kemenangan.',
          mechanics: [
            'Instant Switch: Berpindah Guardian secara cepat di tengah pertarungan tanpa memutus alur serangan.',
            'Ajian & Pusaka Unik: Setiap Penjaga membawa keris, tombak, atau ajian tak kasat mata yang spesifik.',
            'Taktik Elemen: Gunakan Guardian pemukul jarak dekat untuk merusak perisai, lalu ganti ke Guardian sihir untuk mengeksekusi.',
            'Kombo Berantai: Gabungkan skill Penjaga secara berurutan untuk menciptakan ledakan energi gaib.'
          ]
        }
      }
    ]
  },
  ENG: {
    tagline: 'MYSTICAL ANCIENT NUSANTARA ACTION SYSTEMS',
    title: 'THE NUSANTARA REALM SHOWS NO MERCY',
    subtitle: 'Surviving the lost tropical realm demands mastery of ancient martial arts, agile parkour across temple ruins, and harmony with mystical island energy',
    closeText: 'SEAL DETAILS',
    pillars: [
      {
        id: 'explore',
        title: 'EXPLORE',
        summary: 'Traverse ancient jungles, forgotten temples, and mystical realms.',
        headline: 'DISCOVER PATHS ERASED FROM ANCIENT STONE INSCRIPTIONS.',
        description: 'Roam the enchanted islands freely. Discover sunken kingdom ruins, sacred caves, and forgotten shrines guided only by environmental markers.',
        mechanicTitle: 'Free Realm Exploration',
        mechanicTag: 'FREE EXPLORATION SYSTEM',
        image: explore,
        features: [
          'Unstructured Exploration Guided by Nature Signs',
          'Hidden Inscriptions & Ancient Sacred Sites',
          'Tropical Weather Dynamics & Mystical Phenomena'
        ],
        deepDetail: {
          overview: 'No modern waypoints exist in Nusantara. Your perception of environmental cues like wind direction, ancient carvings, and water flows dictates your survival.',
          mechanics: [
            'Environmental Clues: Observe ancient runes, phantom lights, rustling flora, and footprint trails.',
            'Agile Traversing: Scale steep cliffs, navigate gigantic roots, and leap over misty chasms.',
            'A Reactive World: Torrential rain, eclipse phases, and mystical fogs dynamically reveal or seal hidden paths.',
            'Artifact Discoveries: Unearth legendary relics and forgotten altars.'
          ]
        }
      },
      {
        id: 'survive',
        title: 'SURVIVE',
        summary: 'Confront mythical beasts and the untamed wilderness.',
        headline: 'SURVIVE UPON LANDS BOUND BY ANCIENT CURSES.',
        description: 'Danger lurks in every shadow. Face savage beasts and territorial spirits, balance your inner stamina, and utilize rare herbs to endure.',
        mechanicTitle: 'Adaptive Combat & Survival',
        mechanicTag: 'SURVIVAL & COMBAT SYSTEM',
        image: survive,
        features: [
          'Real-Time Combat Against Territorial Mythical Beasts',
          'Environmental Hazards & Mystical Herbal Crafting',
          'Inner Energy, Stamina, and Vitality Management'
        ],
        deepDetail: {
          overview: 'Survival relies on more than raw force. Read enemy movements, channel inner energy, and use terrain to outsmart deadly threats.',
          mechanics: [
            'Tactical Evasion: Read beast attack patterns, dodge dark magic, and strike weak points.',
            'Terrain Mastery: Use cliff edges, toxic swamps, and stone pillars as cover.',
            'Resource Crafting: Brew remedies using rare tropical herbs and conserve stamina.',
            'Spiritual Intuition: Sense hostile presence before ambush strikes.'
          ]
        }
      },
      {
        id: 'discover',
        title: 'DISCOVER',
        summary: 'Solve ancient temple puzzles and unearth lost civilization lore.',
        headline: 'UNCOVER SECRETS BURIED BENEATH TEMPLE RUINS.',
        description: 'Piece together a fallen civilization history through stone inscriptions, sacred reliefs, and palm-leaf manuscripts to break the ancient curse.',
        mechanicTitle: 'Temple Puzzle & Lore Investigation',
        mechanicTag: 'DISCOVERY & PUZZLE SYSTEM',
        image: discover,
        features: [
          'Investigate Temple Reliefs, Relics, and Sacred Statues',
          'Astral Alignment & Ancient Temple Puzzles',
          'Collect Forgotten Palm-Leaf Manuscripts'
        ],
        deepDetail: {
          overview: 'Nusantara history is veiled in mystery. Decode sacred symbols, align ancient mirror mechanisms, and solve elemental puzzles.',
          mechanics: [
            'Relic Inspection: Study ancient stone symbols, deity statues, and magic arrays.',
            'Ancient Mechanisms: Rotate light-reflecting altars and realign stone portals.',
            'Manuscript Collection: Gather scattered lontar leaves to reconstruct lore.',
            'Purification Rituals: Reactivate sacred altars to dispel demonic miasma.'
          ]
        }
      },
      {
        id: 'switching',
        title: 'GUARDIANS',
        summary: 'Switch instantly between Four Guardians with unique relics & arts.',
        headline: 'UNITE THE FOUR GUARDIAN FORCES OF NUSANTARA.',
        description: 'Control Four Realm Guardians endowed with unique weapons and mystical arts. Seamlessly switch mid-combat to execute devastating synergy combos.',
        mechanicTitle: 'Dynamic Guardian Switch System',
        mechanicTag: 'DYNAMIC GUARDIAN SYSTEM',
        image: switching,
        features: [
          'Instant Real-Time Switching with No Action Delay',
          'Unique Relic Weapons & Mystical Arts per Guardian',
          'Synergistic Elemental Combos to Shatter Defenses'
        ],
        deepDetail: {
          overview: 'The Four Guardians wield the primary elements of the realm. Master swapping them dynamically during intense battles.',
          mechanics: [
            'Instant Transition: Switch Guardians effortlessly without breaking combat momentum.',
            'Relics & Martial Arts: Utilize kris daggers, spears, or mystical energy fields.',
            'Elemental Strategy: Use heavy Guardians to shatter armor, then swap to magical Guardians to execute.',
            'Chained Combos: Chain Guardian skills sequentially for explosive elemental bursts.'
          ]
        }
      }
    ]
  }
};

const pillarStyles = {
  explore: {
    borderGlow: 'border-emerald-500/50 shadow-[0_0_25px_-5px_rgba(16,185,129,0.3)]',
    dotColor: 'bg-emerald-400 shadow-[0_0_10px_#34d399]',
    badgeBg: 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40',
    accentText: 'text-emerald-400',
    icon: Compass
  },
  survive: {
    borderGlow: 'border-amber-500/50 shadow-[0_0_25px_-5px_rgba(245,158,11,0.3)]',
    dotColor: 'bg-amber-400 shadow-[0_0_10px_#fbbf24]',
    badgeBg: 'bg-amber-950/80 text-amber-400 border-amber-500/40',
    accentText: 'text-amber-400',
    icon: Shield
  },
  discover: {
    borderGlow: 'border-yellow-500/50 shadow-[0_0_25px_-5px_rgba(234,179,8,0.3)]',
    dotColor: 'bg-yellow-400 shadow-[0_0_10px_#facc15]',
    badgeBg: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40',
    accentText: 'text-yellow-300',
    icon: Scroll
  },
  switching: {
    borderGlow: 'border-purple-500/50 shadow-[0_0_25px_-5px_rgba(168,85,247,0.3)]',
    dotColor: 'bg-purple-400 shadow-[0_0_10px_#c084fc]',
    badgeBg: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
    accentText: 'text-purple-300',
    icon: Repeat
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.05 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function GameSystems({ lang = 'IND' }) {
  const [activeTab, setActiveTab] = useState('explore');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const t = systemsTranslations[lang] || systemsTranslations.IND;
  const currentPillar = t.pillars.find((item) => item.id === activeTab) || t.pillars[0];
  const activeStyle = pillarStyles[currentPillar.id] || pillarStyles.explore;
  const IconComponent = activeStyle.icon;

  return (
    <section id="systems" className="py-20 md:py-32 px-3 sm:px-6 lg:px-16 bg-[#020704] relative text-[#e0e8e2] font-serif overflow-hidden">
      
      {/* Top Black Dark Gradient Overlay (Efek Gelap Bagian Atas) */}
      <div className="absolute top-0 left-0 right-0 h-40 md:h-64 bg-gradient-to-b from-[#060D0A] via-[#020704]/90 to-transparent z-20 pointer-events-none" />

      {/* Background Atmosphere & Ancient Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,#092617_0%,#020704_70%)] opacity-80 pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#09231715_1px,transparent_1px),linear-gradient(to_bottom,#09231715_1px,transparent_1px)] bg-[size:36px_36px] opacity-30 pointer-events-none" />
      
      {/* Dynamic Gold/Emerald Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[850px] h-[350px] bg-emerald-700/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-amber-600/5 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto relative z-30 space-y-12 md:space-y-16">
        
        {/* Header Section */}
        <motion.header 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 max-w-4xl mx-auto relative z-10 pt-4 md:pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#c8a961]/40 bg-[#071910]/90 text-[#c8a961] text-[10px] sm:text-xs font-mono tracking-[0.22em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(200,169,97,0.15)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span>{t.tagline}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#f7ebd0] via-[#d4af37] to-[#8a6f28] uppercase leading-[1.15] drop-shadow-md">
            {t.title}
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-stone-300/90 max-w-2xl mx-auto font-sans font-light leading-relaxed px-3">
            {t.subtitle}
          </p>
        </motion.header>

        {/* Pillars Tab Navigation (Prasasti Style) */}
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
            const PillarIcon = style.icon;

            return (
              <motion.button
                key={pillar.id}
                variants={itemVariants}
                onClick={() => setActiveTab(pillar.id)}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`snap-center shrink-0 w-[230px] sm:w-auto text-left p-4 sm:p-5 rounded-md border transition-all duration-300 relative flex flex-col justify-between group overflow-hidden ${
                  isActive
                    ? `bg-gradient-to-b from-[#0e2117] to-[#06120c] ${style.borderGlow} shadow-lg`
                    : 'bg-[#040e09]/80 border-[#102b1c] hover:border-[#c8a961]/50 hover:bg-[#091a12]/60'
                }`}
              >
                {/* Ancient Corner Ornaments */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 ${isActive ? 'border-[#c8a961]' : 'border-emerald-900/30 group-hover:border-[#c8a961]/60'}`} />
                <div className={`absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 ${isActive ? 'border-[#c8a961]' : 'border-emerald-900/30 group-hover:border-[#c8a961]/60'}`} />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <PillarIcon className={`w-4 h-4 ${isActive ? style.accentText : 'text-stone-400 group-hover:text-amber-200'}`} />
                      <span className={`font-serif text-sm sm:text-base tracking-wider font-bold uppercase transition-colors ${
                        isActive ? 'text-[#f5ebd2]' : 'text-stone-300 group-hover:text-white'
                      }`}>
                        {pillar.title}
                      </span>
                    </div>
                    <span className={`w-2 h-2 rounded-full ${style.dotColor} shrink-0`} />
                  </div>

                  <p className="text-[11px] sm:text-xs font-sans text-stone-400 leading-relaxed line-clamp-2">
                    {pillar.summary}
                  </p>
                </div>

                {/* Bottom Active Glow Bar */}
                {isActive && (
                  <motion.div 
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#c8a961] to-transparent" 
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Feature Display Card / Prasasti Board */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-[#071710] to-[#040e0a] border border-[#143322] rounded-md p-5 sm:p-7 md:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Border Frame */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#c8a961]" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#c8a961]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#c8a961]" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#c8a961]" />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-4 sm:mb-6 flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-sm border ${activeStyle.badgeBg}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  PILLAR SYSTEM: {currentPillar.title}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
                
                {/* Left Side: System Details */}
                <div className="lg:col-span-6 space-y-4 sm:space-y-6 order-2 lg:order-1">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#f7ebd0] leading-snug tracking-wide uppercase">
                    {currentPillar.headline}
                  </h3>

                  <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed font-light">
                    {currentPillar.description}
                  </p>

                  <div className="space-y-2.5 pt-2 border-t border-[#122e20]">
                    <span className="text-[10px] sm:text-xs font-mono tracking-widest text-[#c8a961] uppercase font-bold block mb-2">
                      MISTIK & DOKTRIN FITUR UTAMA:
                    </span>
                    {currentPillar.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-200 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#c8a961] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side: Showcase Media Frame */}
                <div className="lg:col-span-6 order-1 lg:order-2">
                  <motion.div 
                    onClick={() => setIsModalOpen(true)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative h-52 sm:h-72 md:h-80 w-full rounded-sm overflow-hidden border border-[#163826] cursor-pointer shadow-2xl hover:border-[#c8a961] transition-all duration-500"
                  >
                    <img 
                      src={currentPillar.image} 
                      alt={currentPillar.title}
                      className="w-full h-full object-cover filter contrast-[105%] group-hover:scale-105 group-hover:brightness-110 transition-transform duration-700"
                    />
                    
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#040e0a] via-[#040e0a]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                    {/* Card Inner Corner Frame */}
                    <div className="absolute inset-2 border border-white/10 group-hover:border-[#c8a961]/40 pointer-events-none transition-colors" />

                    {/* Card Bottom Meta Info */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between pointer-events-none gap-2">
                      <div className="min-w-0 flex-1">
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-[#c8a961] uppercase block truncate">
                          {currentPillar.mechanicTag}
                        </span>
                        <h4 className="text-xs sm:text-sm font-serif text-[#f7ebd0] font-bold truncate uppercase tracking-wider">
                          {currentPillar.mechanicTitle}
                        </h4>
                      </div>
                      
                      <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-mono text-[#c8a961] bg-[#020704]/90 backdrop-blur-md px-3 py-1.5 rounded-sm border border-[#c8a961]/50 shrink-0 shadow-lg group-hover:bg-[#c8a961] group-hover:text-black transition-all">
                        <Eye className="w-3.5 h-3.5" /> DETAIL
                      </span>
                    </div>
                  </motion.div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal Detail Overlay (Scroll Lontar Style) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
          >
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />
            
            <motion.div 
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 26, stiffness: 280 }}
              className="bg-[#05120c] border-t sm:border border-[#c8a961]/60 rounded-t-lg sm:rounded-md max-w-2xl w-full p-5 sm:p-7 md:p-8 relative shadow-[0_0_50px_rgba(200,169,97,0.2)] space-y-4 sm:space-y-6 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto scrollbar-none z-10 font-serif"
            >
              {/* Corner Ornaments in Modal */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c8a961]" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#c8a961]" />

              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-white bg-[#020704]/90 p-2 rounded-full border border-[#c8a961]/40 hover:border-[#c8a961] transition-colors z-10"
                aria-label="Close modal"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-[#c8a961]" />
              </button>

              <div className="space-y-2 pr-8">
                <span className={`inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-sm border ${activeStyle.badgeBg}`}>
                  <IconComponent className="w-3.5 h-3.5" />
                  ANALISIS PUSAKA: {currentPillar.title}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#f7ebd0] leading-tight uppercase tracking-wide">
                  {currentPillar.mechanicTitle}
                </h3>
              </div>

              <p className="text-xs sm:text-sm font-sans text-stone-300 leading-relaxed font-light border-l-2 border-[#c8a961] pl-3 py-1 bg-[#081a12]">
                {currentPillar.deepDetail.overview}
              </p>

              <div className="space-y-3 bg-[#030906] p-4 rounded-sm border border-[#133020]">
                <span className="text-[10px] sm:text-xs font-mono text-[#c8a961] font-bold tracking-wider uppercase block">
                  MEKANISME TINGKAT LANJUT (KANURAGAN):
                </span>
                <div className="space-y-2">
                  {currentPillar.deepDetail.mechanics.map((item, idx) => (
                    <div key={idx} className="text-xs sm:text-sm font-sans text-stone-300 flex items-start gap-2.5">
                      <span className="text-[#c8a961] font-bold shrink-0">✦</span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full sm:w-auto bg-[#0f2d1e] hover:bg-[#c8a961] hover:text-black border border-[#c8a961] text-[#c8a961] font-mono text-xs font-bold px-6 py-2.5 rounded-sm transition-all text-center shadow-lg active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2"
                >
                  <span>{t.closeText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
