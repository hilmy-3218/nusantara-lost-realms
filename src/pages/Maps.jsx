import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, Compass } from 'lucide-react';
import MapBg from '../assets/territory/map.jpg';
import verdant from '../assets/territory/verdant_wilds.jpg';
import arcapura from '../assets/territory/arcapura_ruins.jpg';
import mount from '../assets/territory/mount_arunika.jpg';
import lake from '../assets/territory/niskala_lake.jpg';
import rimba from '../assets/territory/rimba_kala.jpg';
import skyreach from '../assets/territory/skyreach_peaks.jpg';
import vantara from '../assets/territory/vantara_kingdom.jpg';
import throne from '../assets/territory/throne_of_ruins.jpg';

const locationsData = {
  IND: [
    {
      id: 'verdant',
      name: 'VERDANT WILDS',
      top: '15%',
      left: '13%',
      badge: 'Hutan Purba',
      image: verdant,
      quote: '"Di balik rimbunnya pepohonan, sesuatu yang telah lama tertidur mulai terbangun."',
      description: 'Hutan tropis purba yang membentang luas, dipenuhi pepohonan raksasa, reruntuhan bangunan kuno, dan energi mistis yang belum terjamah manusia.',
      type: 'Wilayah Energi Alam',
      monsters: 'Netrawana, Wana Beast',
      warning: 'Peringatan: Kabut mistis membatasi jarak pandang, mengacaukan arah, dan dapat menjebak petualang yang lengah.',
      boss: 'Raksawana'
    },
    {
      id: 'arcapura',
      name: 'ARCAPURA RUINS',
      top: '22%',
      left: '54%',
      badge: 'Jejak Peradaban',
      image: arcapura,
      quote: '"Di antara batu-batu yang runtuh, gema sebuah kerajaan yang telah dilupakan masih terdengar."',
      description: 'Reruntuhan kota kuno yang pernah menjadi pusat peradaban besar. Bangunan-bangunan batu yang runtuh menyimpan rahasia tentang kerajaan masa lalu dan awal mula kutukan.',
      type: 'Wilayah Energi Batu',
      monsters: 'Ghora Stone, Ruinclaw',
      boss: 'Arcapura Sentinel',
      warning: 'Reruntuhan Labirin (Risiko Jebakan Batu & Efek Slow 20%)'
    },
    {
      id: 'arunika',
      name: 'MOUNT ARUNIKA',
      top: '44%',
      left: '12%',
      badge: 'Api Purba',
      image: mount,
      quote: '"Dari dalam perut gunung, bara kuno masih menyala menunggu untuk terbangun."',
      description: 'Gunung vulkanik purba yang menjulang di atas Lost Realm. Lerengnya dipenuhi bebatuan hitam, hutan berkabut, dan benteng kuno yang dibangun untuk menjaga kekuatan yang tersegel di dalam kawah.',
      type: 'Wilayah Energi Api',
      monsters: 'Magmarok, Ashfang',
      boss: 'Infernal Garuda',
      warning: 'Panas Purba (HP berkurang 4%/detik tanpa ramuan pelindung api)'
    },
    {
      id: 'niskala',
      name: 'NISKALA LAKE',
      top: '18%',
      left: '86%',
      badge: 'Danau Mistis',
      image: lake,
      quote: '"Permukaan airnya tenang, tetapi sesuatu di dasar telaga masih mengingat masa lalu."',
      description: 'Danau mistis yang tersembunyi di antara hutan berkabut. Airnya memancarkan cahaya biru samar dan mengelilingi reruntuhan bangunan kuno yang dipercaya menyimpan rahasia dunia lain.',
      type: 'Wilayah Energi Air',
      monsters: 'Rawa Maw, Niskala Siren',
      boss: 'Naga Tirta',
      warning: 'Arus Dalam (Menguras Stamina 4%/detik & Efek Beku)'
    },
    {
      id: 'rimba-kala',
      name: 'RIMBA KALA',
      top: '69%',
      left: '12%',
      badge: 'Hutan Terkutuk',
      image: rimba,
      quote: '"Di hutan ini, kegelapan bukan sekadar bayangan. Ia sedang mengawasi setiap langkahmu."',
      description: 'Hutan purba yang telah tercemar oleh energi kutukan. Pepohonannya menghitam, kabut pekat menyelimuti jalur lama, dan suara makhluk tak dikenal terdengar dari balik kegelapan.',
      type: 'Wilayah Energi Kegelapan',
      monsters: 'Thornmaw, Dreadfang',
      boss: 'Kala Wraith',
      warning: 'Kutukan Kegelapan (Efek Blindness & Mengurai Mana/Detik)'
    },
    {
      id: 'skyreach',
      name: 'SKYREACH PEAKS',
      top: '14%',
      left: '42%',
      badge: 'Puncak Langit',
      image: skyreach,
      quote: '"Di atas awan, para penjaga langit masih mengitari puncak yang tak pernah tersentuh manusia."',
      description: 'Rangkaian pegunungan raksasa yang menjulang menembus awan. Tebing terjal, jembatan batu kuno, dan reruntuhan benteng di atas puncak menjadi tempat bersemayam makhluk-makhluk legendaris dari langit.',
      type: 'Wilayah Energi Angin',
      monsters: 'Galeclaw, Rudrakala',
      boss: 'Aether Dragon',
      warning: 'Angin Badai Kencang (Efek Knockback & Risiko Jatuh dari Jurang)'
    },
    {
      id: 'vantara',
      name: 'VANTARA KINGDOM',
      top: '57%',
      left: '50%',
      badge: 'Kerajaan yang Hilang',
      image: vantara,
      quote: '"Dahulu, ribuan lentera menerangi kerajaan ini. Kini, hanya bayangan masa lalu yang tersisa."',
      description: 'Bekas kerajaan agung yang pernah menjadi pusat pemerintahan Lost Realm. Istana, aula kerajaan, benteng, dan pemukiman kuno kini terkubur dalam reruntuhan setelah kerajaan jatuh akibat munculnya Raja Kutukan.',
      type: 'Wilayah Energi Kerajaan',
      monsters: 'Ironclad Ghora, Vantara Wraith',
      boss: 'Royal Vantara',
      warning: 'Sihir Penghalang Kerajaan (Royal Vantara mengunci target dalam duel 1v1, mengurung pemain lain di luar barrier)'
    },
    {
      id: 'throne-of-ruin',
      name: 'THRONE OF RUIN',
      top: '87%',
      left: '44%',
      badge: 'Takhta Kehancuran',
      image: throne,
      quote: '"Di balik takhta yang hancur, sang raja masih menunggu mereka yang berani mengakhiri kutukannya."',
      description: 'Benteng terakhir yang berdiri di jantung wilayah terkutuk. Lorong-lorongnya dipenuhi reruntuhan kerajaan, energi gelap, dan jejak kekuasaan Raja Kutukan yang telah bertahan selama berabad-abad.',
      type: 'Wilayah Energi Kutukan',
      monsters: 'Ruin Knight, Abyssal Ghora',
      boss: 'Raja Kutukan',
      warning: 'Aura Kehancuran (Menguras Max HP secara berkala & Mematikan Efek Potion)'
    }
  ],
  ENG: [
    {
      id: 'verdant',
      name: 'VERDANT WILDS',
      top: '15%',
      left: '13%',
      badge: 'Ancient Forest',
      image: verdant,
      quote: '"Beyond the dense foliage, something that has long been asleep is beginning to awaken."',
      description: 'An ancient tropical forest stretching across vast lands, filled with colossal trees, ruins of forgotten civilizations, and mystical energy untouched by humankind.',
      type: 'Natural Energy Region',
      monsters: 'Netrawana, Wana Beast',
      warning: 'Warning: Mystical fog restricts visibility, disorients navigation, and can entrap unwary adventurers.',
      boss: 'Raksawana'
    },
    {
      id: 'arcapura',
      name: 'ARCAPURA RUINS',
      top: '22%',
      left: '54%',
      badge: 'Traces of Civilization',
      image: arcapura,
      quote: '"Among the crumbling stones, the echo of a forgotten kingdom still lingers."',
      description: 'The ruins of an ancient city that once stood as the heart of a great civilization. The collapsed stone structures preserve secrets of a bygone kingdom and the origin of the curse.',
      type: 'Earth Energy Region',
      monsters: 'Ghora Stone, Arcapura Sentinel, Ruinclaw',
      boss: 'Arcapura Colossus (Ancient Golem)',
      warning: 'Labyrinthine Ruins (Risk of Stone Traps & 20% Slow Effect)'
    },
    {
      id: 'arunika',
      name: 'MOUNT ARUNIKA',
      top: '44%',
      left: '12%',
      badge: 'Primal Flame',
      image: mount,
      quote: '"From deep within the mountain\'s core, ancient embers still burn, awaiting their awakening."',
      description: 'A primordial volcanic mountain towering over the Lost Realm. Its slopes are covered in dark stone, misty forests, and ancient fortresses built to safeguard the power sealed within its crater.',
      type: 'Fire Energy Region',
      monsters: 'Magmarok, Ashfang, Infernal Garuda',
      boss: 'Infernal Garuda (World Boss)',
      warning: 'Ancient Heat (Drains 5% HP/sec without Fire Protection Potion)'
    },
    {
      id: 'niskala',
      name: 'NISKALA LAKE',
      top: '18%',
      left: '86%',
      badge: 'Mystic Lake',
      image: lake,
      quote: '"The surface lies still, yet something beneath the lake still remembers the past."',
      description: 'A mystical lake hidden within a mist-shrouded forest. Its waters emit a faint blue glow and surround the ruins of an ancient structure believed to hold secrets of another world.',
      type: 'Water Energy Region',
      monsters: 'Rawa Maw, Niskala Siren',
      boss: 'Dragon Tirta',
      warning: 'Deep Current (Drains Stamina by 4%/s & Inflicts Freeze Hazard)'
    },
    {
      id: 'rimba-kala',
      name: 'RIMBA KALA',
      top: '69%',
      left: '12%',
      badge: 'Cursed Jungle',
      image: rimba,
      quote: '"In this jungle, darkness is no mere shadow. It is watching your every step."',
      description: 'A primordial jungle tainted by cursed energy. The trees have blackened, dense fog smothers the ancient paths, and the sounds of unknown creatures echo from within the shadows.',
      type: 'Dark Energy Region',
      monsters: 'Thornmaw, Dreadfang',
      boss: 'Kala Wraith',
      warning: 'Curse of Darkness (Inflicts Blindness & Drains Mana/sec)'
    },
    {
      id: 'skyreach',
      name: 'SKYREACH PEAKS',
      top: '14%',
      left: '42%',
      badge: 'Celestial Peaks',
      image: skyreach,
      quote: '"Above the clouds, sky wardens still circle the summits untouched by mortal hands."',
      description: 'A colossal mountain range piercing through the clouds. Sheer cliffs, ancient stone bridges, and fortress ruins atop the peaks serve as the domain for legendary creatures of the sky.',
      type: 'Wind Energy Region',
      monsters: 'Galeclaw, Rudrakala',
      boss: 'Aether Dragon',
      warning: 'Gale Force Winds (Inflicts Knockback & Risk of Falling Off Cliffs)'
    },
    {
      id: 'vantara',
      name: 'VANTARA KINGDOM',
      top: '57%',
      left: '50%',
      badge: 'The Lost Kingdom',
      image: vantara,
      quote: '"Once, thousands of lanterns illuminated this kingdom. Now, only shadows of the past remain."',
      description: 'The remnants of a grand kingdom that once served as the central seat of power in the Lost Realm. Palaces, royal halls, fortresses, and ancient settlements now lie buried in ruins following the kingdom\'s fall to the Curse King.',
      type: 'Royal Energy Region',
      monsters: 'Ironclad Ghora, Vantara Wraith',
      boss: 'Royal Vantara',
      warning: 'Royal Barrier Magic (Royal Vantara locks target in a 1v1 duel, trapping other players outside the barrier)'
    },
    {
      id: 'throne-of-ruin',
      name: 'THRONE OF RUIN',
      top: '87%',
      left: '44%',
      badge: 'Throne of Ruin',
      image: throne,
      quote: '"Beyond the shattered throne, the King still awaits those brave enough to end his curse."',
      description: 'The final fortress standing at the heart of the cursed realm. Its halls are filled with royal ruins, dark energy, and traces of the Curse King\'s century-old power.',
      type: 'Cursed Energy Region',
      monsters: 'Ruin Knight, Abyssal Ghora',
      boss: 'The Curse King',
      warning: 'Aura of Ruin (Periodically drains Max HP & disables Potion effects)'
    }
  ]
};

export default function Maps({ lang = 'IND' }) {
  const currentLocations = locationsData[lang] || locationsData.IND;
  const [selectedId, setSelectedId] = useState('verdant');

  const selectedLoc = currentLocations.find(loc => loc.id === selectedId) || currentLocations[0];

  // Variasi animasi saat halaman dimuat/di-scroll ke area ini
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  };

  return (
    <motion.section
      id="map"
      className="relative py-12 px-4 lg:px-8 text-[#e0d6b3] font-serif select-none overflow-hidden bg-gradient-to-b from-black via-black to-[#060D0A]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={sectionVariants}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Judul Peta */}
        <motion.div className="mb-8 text-center" variants={itemVariants}>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-[#d4af37]/70 mb-1">
            {lang === 'IND' ? 'EKSPLORASI WILAYAH' : 'WORLD EXPLORATION'}
          </p>
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#b89328] via-[#d4af37] to-[#b89328] uppercase drop-shadow-[0_2px_10px_rgba(212,175,55,0.2)]">
            {lang === 'IND' ? 'PETA ALAM INTERAKTIF' : 'INTERACTIVE REALM MAP'}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-[#d4af37]/60" />
            <div className="w-1.5 h-1.5 rotate-45 bg-[#d4af37]" />
            <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-[#d4af37]/60" />
          </div>
        </motion.div>

        {/* Grid Peta & Informasi */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-3 gap-6" variants={itemVariants}>
          
          {/* Outer Map Container */}
          <div className="lg:col-span-2 relative bg-[#0d1410] rounded-lg overflow-hidden border border-[#1f2e24] shadow-2xl flex flex-col justify-between">

            {/* Map & Pins Area - Dikunci dalam Rasio Aspek 1:1 */}
            <div className="relative w-full aspect-square overflow-hidden">
              {/* Background Image Map */}
              <img 
                src={MapBg} 
                alt="Ancient Map" 
                className="absolute inset-0 w-full h-full object-cover filter brightness-90 contrast-105"
              />
              <div className="absolute inset-0 bg-[#070b09]/20 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b09] via-transparent to-transparent opacity-90 pointer-events-none" />

              {/* Interactive Map Pins */}
              {currentLocations.map((loc) => {
                const isActive = selectedLoc.id === loc.id;
                return (
                  <motion.div
                    key={loc.id}
                    style={{ top: loc.top, left: loc.left }}
                    onClick={() => setSelectedId(loc.id)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group flex flex-col items-center z-10"
                  >
                    {/* Lingkaran Pin Responsif */}
                    <div className={`relative flex items-center justify-center 
                      w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-7 md:h-7 
                      rounded-full border transition-all duration-300 ${
                      isActive 
                        ? 'bg-[#d4af37] border-white scale-125 shadow-[0_0_15px_#d4af37]' 
                        : 'bg-[#111a14]/80 border-[#d4af37] group-hover:scale-110 group-hover:bg-[#d4af37]'
                    }`}>
                      <div className={`w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 rounded-full ${
                        isActive ? 'bg-black' : 'bg-[#d4af37] group-hover:bg-black'
                      }`} />
                    </div>

                    {/* Label Nama Responsif */}
                    <div className={`mt-1 sm:mt-1.5 md:mt-2 
                      px-1 py-0.5 sm:px-2 sm:py-0.5 md:px-2.5 md:py-1 
                      text-[7px] sm:text-[9px] md:text-xs 
                      font-bold tracking-wider sm:tracking-widest uppercase 
                      transition-all duration-300 border backdrop-blur-md whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg' 
                        : 'bg-[#0d1410]/80 text-[#e0d6b3] border-[#1f2e24] group-hover:border-[#d4af37]'
                    }`}>
                      {loc.name}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Info Bar */}
            <div className="relative z-20 bg-[#080d0a]/90 backdrop-blur-md border-t border-[#1f2e24] p-3 md:p-4 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-xs tracking-wider gap-2">
              <div className="flex items-center gap-2 text-[#d4af37]">
                <Eye className="w-4 h-4" />
                <span>
                  {lang === 'IND' ? 'SEDANG DILIHAT:' : 'CURRENTLY VIEWING:'}{' '}
                  <AnimatePresence mode="wait">
                    <motion.strong
                      key={selectedLoc.id}
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-white inline-block"
                    >
                      {selectedLoc.name}
                    </motion.strong>
                  </AnimatePresence>
                </span>
              </div>
              <div className="text-gray-400">
                {lang === 'IND' ? 'EKSPLORASI SEKTOR:' : 'SECTOR EXPLORATION:'}{' '}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={selectedLoc.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#d4af37] inline-block"
                  >
                    {selectedLoc.relics || selectedLoc.type}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Sidebar Panel */}
          <div className="bg-[#080d0a] border-2 border-[#3b2d13] rounded-xl p-5 md:p-7 flex flex-col justify-between shadow-[0_0_30px_rgba(212,175,55,0.1)] relative overflow-hidden">
            
            {/* Aksen Sudut Ukiran Klasik Nusantara (Pojok-pojok Frame) */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#d4af37] pointer-events-none" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#d4af37] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#d4af37] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#d4af37] pointer-events-none" />

            {/* Background Motif Tradisional Halus (Watermark Batik Geometris) */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:16px_16px]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoc.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative z-10"
              >
                {/* Header Laporan Wilayah */}
                <div className="flex justify-between items-center pb-3 border-b border-[#3b2d13]/60 text-xs">
                  <span className="tracking-[0.25em] text-[#d4af37]/80 font-bold uppercase flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-pulse" />
                    {lang === 'IND' ? 'ARSIP WILAYAH NUSANTARA' : 'ARCHIPELAGO TERRITORY DISPATCH'}
                  </span>
                  <span className="px-3 py-1 rounded border border-[#d4af37]/40 bg-[#151006] text-[#e6c562] text-[10px] font-bold tracking-widest shadow-inner uppercase">
                    {selectedLoc.badge}
                  </span>
                </div>

                {/* Frame Gambar Wilayah ala Peta Kuno */}
                <div className="relative mt-5 rounded-md border border-[#3b2d13] overflow-hidden group shadow-lg">
                  <img 
                    src={selectedLoc.image} 
                    alt={selectedLoc.name} 
                    className="w-full h-40 md:h-48 object-cover filter contrast-110 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080d0a] via-[#080d0a]/20 to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase tracking-widest text-[#d4af37]/70 font-semibold block mb-0.5">
                        {lang === 'IND' ? 'Tanah / Daerah' : 'Domain'}
                      </span>
                      <h3 className="text-base md:text-lg font-extrabold text-white tracking-wide drop-shadow-md font-serif">
                        {selectedLoc.name}
                      </h3>
                    </div>
                    <span className="text-[10px] text-[#d4af37] flex items-center gap-1.5 bg-black/80 px-2.5 py-1 rounded border border-[#3b2d13] backdrop-blur-sm">
                      <Shield className="w-3 h-3 text-[#d4af37]" /> {lang === 'IND' ? 'Waspada' : 'Threat'}
                    </span>
                  </div>
                </div>

                {/* Kotak Kutipan & Deskripsi (Gaya Prasasti/Kitab) */}
                <div className="mt-4 p-4 rounded bg-[#040705] border border-[#3b2d13]/50 relative shadow-inner">
                  <div className="absolute top-2 right-3 text-[#d4af37]/20 font-serif text-xl">“</div>
                  <p className="text-xs italic text-[#e6c562] mb-2 font-serif tracking-wide">{selectedLoc.quote}</p>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{selectedLoc.description}</p>
                </div>

                {/* Informasi Detail Wilayah */}
                <div className="mt-5 space-y-2.5 text-xs border-t border-[#3b2d13]/60 pt-4">
                  <div className="flex justify-between items-start bg-white/[0.02] p-2 rounded border border-white/[0.02]">
                    <span className="text-gray-400">{lang === 'IND' ? 'Bentuk Wilayah:' : 'Region Type:'}</span>
                    <span className="text-gray-200 font-semibold tracking-wide">{selectedLoc.type}</span>
                  </div>
                  
                  <div className="flex justify-between items-start gap-4 bg-white/[0.02] p-2 rounded border border-white/[0.02]">
                    <span className="text-gray-400 whitespace-nowrap">{lang === 'IND' ? 'Makhluk Penghuni:' : 'Inhabiting Entities:'}</span>
                    <span className="text-[#e6c562] font-semibold text-right">{selectedLoc.monsters}</span>
                  </div>

                  {selectedLoc.boss && (
                    <div className="flex justify-between items-start gap-4 bg-red-950/10 p-2 rounded border border-red-900/20">
                      <span className="text-gray-400 whitespace-nowrap">{lang === 'IND' ? 'Penguasa / Raja Mitos:' : 'Region Ruler:'}</span>
                      <span className="text-red-400 font-bold text-right tracking-wide">{selectedLoc.boss}</span>
                    </div>
                  )}

                  {selectedLoc.warning && (
                    <div className="pt-2 mt-1 border-t border-[#3b2d13]/40">
                      <div className="text-[#d4af37] font-semibold mb-1 flex items-center gap-1.5 text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        {lang === 'IND' ? 'Peringatan & Catatan Leluhur:' : 'Hazard & Area Notes:'}
                      </div>
                      <p className="text-gray-400 leading-relaxed text-[11px] text-justify bg-[#050806] p-2.5 rounded border border-[#3b2d13]/30">
                        {selectedLoc.warning}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Divider Ornamen Nusantara */}
            <div className="relative flex items-center justify-center py-5 mt-auto z-10">
              <div className="w-full border-t border-gradient border-[#3b2d13]" />
              <div className="absolute bg-[#080d0a] px-3 text-[#d4af37] flex items-center gap-2 border border-[#3b2d13] rounded-full py-0.5 shadow">
                {/* Ikon Ornamen Megalitik / Motif Tradisional */}
                <svg className="w-4 h-4 fill-current text-[#d4af37]" viewBox="0 0 24 24">
                  <path d="M12 2L2 12l10 10 10-10L12 2zm0 3.83L18.17 12 12 18.17 5.83 12 12 5.83z" />
                </svg>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </motion.section>
  );
}