import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sword, Sparkles } from 'lucide-react';

import Guardiant1 from '../assets/guardiant/guardiant1.jpg';
import Guardiant2 from '../assets/guardiant/guardiant2.jpg';
import Guardiant3 from '../assets/guardiant/guardiant3.jpg';
import Guardiant4 from '../assets/guardiant/guardiant4.jpg';

// Gambar Armor Tambahan (Sesuaikan path file-nya)
import Guardiant1Armor from '../assets/guardiant/guardiant1-armor.jpg';
import Guardiant2Armor from '../assets/guardiant/guardiant2-armor.jpg';
import Guardiant3Armor from '../assets/guardiant/guardiant3-armor.jpg';
import Guardiant4Armor from '../assets/guardiant/guardiant4-armor.jpg';

import iconGuardiant1 from '../assets/guardiant/icon-guardian1.jpeg';
import iconGuardiant2 from '../assets/guardiant/icon-guardian2.jpeg';
import iconGuardiant3 from '../assets/guardiant/icon-guardian3.jpeg';
import iconGuardiant4 from '../assets/guardiant/icon-guardian4.jpg';

const guardiansData = {
  IND: {
    sectionTitle: "PENJAGA",
    attributesLabel: "KESAKTIAN & ATRIBUT",
    roleLabel: "PERAN",
    weaponLabel: "PUSAKA UTAMA",
    ultimateLabel: "JURUS PAMUNGKAS (ULTIMATE)",
    armorToggleLabel: "MODE",
    armorOn: "ZIRAH",
    armorOff: "BIASA",
    showDetailsBtn: "LIHAT DETAIL",
    closeDetailsBtn: "TUTUP",
    stats: {
      power: "KEKUATAN",
      agility: "KELINCAHAN",
      resolve: "KETAHANAN",
      exploration: "JELAJAH"
    },
    list: [
      {
        id: "raka",
        name: "RAKA MAHARDIKA",
        role: "KSATRIA",
        avatar: iconGuardiant1,
        image: Guardiant1,
        armorImage: Guardiant1Armor,
        weapon: "Pedang Agung Pembalasan",
        ultimate: "Tebasan Gempa Bumi",
        quote: "“Selama pedang ini masih terangkat, tak akan kubiarkan satu pun kegelapan menyentuh mereka.”",
        description: "Jawara garis depan yang sanggup menahan gempuran berat sambil menghancurkan musuh dengan tebasan area berdaya rusak tinggi.",
        stats: { power: 95, agility: 60, resolve: 95, exploration: 70 }
      },
      {
        id: "jaka",
        name: "ARYA MAHENDRA",
        role: "PENJELAJAH",
        avatar: iconGuardiant2,
        image: Guardiant2,
        armorImage: Guardiant2Armor,
        weapon: "Tombak Wira Angkara",
        ultimate: "Tusukan Badai Kencana",
        quote: "“Jalan paling berbahaya bukan alasan untuk berhenti. Tak ada batas yang tak bisa kutembus.”",
        description: "Penjelajah tangguh yang mengandalkan kelincahan tombaknya untuk menerobos pertahanan musuh di wilayah berbahaya.",
        stats: { power: 80, agility: 92, resolve: 78, exploration: 98 }
      },
      {
        id: "tara",
        name: "TARA MAHESWARI",
        role: "PEMBURU",
        avatar: iconGuardiant3,
        image: Guardiant3,
        armorImage: Guardiant3Armor,
        weapon: "Sepasang Pedang Kembar",
        ultimate: "Tarian Bayangan Bayu",
        quote: "“Saat kau menyadarinya, bilahku telah menemukan sasarannya.”",
        description: "Petarung lincah dengan dua pedang. Gerakannya cepat dan sulit diprediksi sebelum menghilang dari jangkauan musuh.",
        stats: { power: 88, agility: 98, resolve: 82, exploration: 92 }
      },
      {
        id: "kirana",
        name: "KIRANA ADINATA",
        role: "PEMANAH",
        avatar: iconGuardiant4,
        image: Guardiant4,
        armorImage: Guardiant4Armor,
        weapon: "Busur Cahaya",
        ultimate: "Hujan Panah Surya",
        quote: "“Satu anak panah cukup untuk mengubah takdir, jika dilepaskan pada saat yang tepat.”",
        description: "Pemanah lincah yang menyerang musuh dari kejauhan dengan anak panah bercahaya dan ketepatan presisi.",
        stats: { power: 82, agility: 96, resolve: 78, exploration: 94 }
      }
    ]
  },
  ENG: {
    sectionTitle: "GUARDIANS",
    attributesLabel: "STATS & ATTRIBUTES",
    roleLabel: "ROLE",
    weaponLabel: "PRIMARY WEAPON",
    ultimateLabel: "ULTIMATE ABILITY",
    armorToggleLabel: "MODE",
    armorOn: "ARMOR",
    armorOff: "BASE",
    showDetailsBtn: "VIEW DETAILS",
    closeDetailsBtn: "CLOSE",
    stats: {
      power: "POWER",
      agility: "AGILITY",
      resolve: "RESOLVE",
      exploration: "EXPLORATION"
    },
    list: [
      {
        id: "raka",
        name: "RAKA MAHARDIKA",
        role: "KNIGHT",
        avatar: iconGuardiant1,
        image: Guardiant1,
        armorImage: Guardiant1Armor,
        weapon: "Greatsword of Retribution",
        ultimate: "Earthshatter Slash",
        quote: "“As long as this sword remains raised, darkness will never touch those behind me.”",
        description: "A formidable frontline warrior capable of withstanding heavy assaults while devastating enemies with sweeping strikes.",
        stats: { power: 95, agility: 60, resolve: 95, exploration: 70 }
      },
      {
        id: "jaka",
        name: "ARYA MAHENDRA",
        role: "EXPLORER",
        avatar: iconGuardiant2,
        image: Guardiant2,
        armorImage: Guardiant2Armor,
        weapon: "Wira Angkara Spear",
        ultimate: "Golden Tempest Thrust",
        quote: "“The most dangerous path is no reason to stop. There is no boundary I cannot cross.”",
        description: "A resilient explorer relying on speed and spear agility to break defenses in uncharted territories.",
        stats: { power: 80, agility: 92, resolve: 78, exploration: 98 }
      },
      {
        id: "tara",
        name: "TARA MAHESWARI",
        role: "HUNTER",
        avatar: iconGuardiant3,
        image: Guardiant3,
        armorImage: Guardiant3Armor,
        weapon: "Twin Blades",
        ultimate: "Phantom Gale Dance",
        quote: "“By the time you realize what happened, my blades have found their mark.”",
        description: "A swift dual-blade warrior whose unpredictable attacks leave enemies no room to counter.",
        stats: { power: 88, agility: 98, resolve: 82, exploration: 92 }
      },
      {
        id: "kirana",
        name: "KIRANA ADINATA",
        role: "ARCHER",
        avatar: iconGuardiant4,
        image: Guardiant4,
        armorImage: Guardiant4Armor,
        weapon: "Lightbow",
        ultimate: "Solar Volley",
        quote: "“One arrow is enough to change fate, if released at the right moment.”",
        description: "An agile archer striking enemies from afar with radiant arrows, targeting weak points with extreme accuracy.",
        stats: { power: 82, agility: 96, resolve: 78, exploration: 94 }
      }
    ]
  }
};

export default function Guardians({ lang = 'IND' }) {
  const content = guardiansData[lang] || guardiansData.IND;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isArmorEquipped, setIsArmorEquipped] = useState(false);
  const [isMobileInfoOpen, setIsMobileInfoOpen] = useState(false);

  const selectedGuardian = content.list[selectedIndex] || content.list[0];
  const currentDisplayedImage = isArmorEquipped 
    ? (selectedGuardian.armorImage || selectedGuardian.image) 
    : selectedGuardian.image;

  return (
    <motion.section 
      id="guardians" 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full min-h-[100svh] lg:min-h-0 lg:aspect-video bg-stone-950 text-amber-50 overflow-hidden select-none flex flex-col justify-between"
    >
      {/* Background Gambar Karakter */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedGuardian.id}-${isArmorEquipped ? 'armor' : 'base'}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={currentDisplayedImage}
            alt={selectedGuardian.name}
            className="w-full h-full object-cover object-[center_20%] sm:object-[center_15%] lg:object-center filter brightness-90 contrast-105"
          />
          
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-transparent to-stone-950/90 hidden lg:block" />
          <div className="absolute top-0 left-0 right-0 h-2/5 sm:h-1/3 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 left-0 right-0 h-3/5 sm:h-1/2 lg:h-1/3 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-black/60 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      <div className="hidden lg:block absolute left-4 top-1/2 -translate-y-1/2 w-[1px] h-3/5 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none" />
      <div className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 w-[1px] h-3/5 bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent pointer-events-none" />

      {/* Kontainer Utama */}
      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-8 py-4 sm:py-6 flex flex-col justify-between flex-1">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="pt-2 flex justify-between items-start sm:items-center gap-2"
        >
          <div>
            <h1 className="text-xl sm:text-4xl lg:text-5xl font-black tracking-widest uppercase font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-yellow-600 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              {content.sectionTitle}
            </h1>
          </div>

          <button
            onClick={() => setIsMobileInfoOpen(true)}
            className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-950/80 border border-emerald-500/50 text-emerald-300 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] active:scale-95 transition-all flex-shrink-0"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            {content.showDetailsBtn}
          </button>
        </motion.header>

        {/* Layout Utama Tengah */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-6 items-center my-auto py-2 sm:py-4">
          
          {/* Selector Karakter */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="col-span-1 lg:col-span-3 order-2 lg:order-1 z-20 self-end lg:self-center w-full"
          >
            <div className="lg:hidden text-center mb-2">
              <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-400 uppercase">
                {selectedGuardian.role}
              </span>
              <h3 className="text-lg font-bold font-serif text-amber-200 tracking-wider">
                {selectedGuardian.name}
              </h3>
            </div>
          
            {/* Tambahkan pt-2 agar ada ruang di bagian atas saat tombol membesar (scale) di mobile */}
            <div className="flex lg:flex-col gap-2 sm:gap-3 overflow-x-auto lg:overflow-visible pt-2 pb-2 lg:pt-0 lg:pb-0 scrollbar-none justify-start lg:justify-start px-3 sm:px-0 snap-x snap-mandatory">
              {content.list.map((guardian, idx) => {
                const isActive = selectedIndex === idx;
                return (
                  <button
                    key={guardian.id}
                    onClick={() => setSelectedIndex(idx)}
                    className={`flex-shrink-0 flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-xl transition-all duration-300 border text-left relative group snap-center origin-bottom lg:origin-center ${
                      isActive
                        ? "border-amber-400 bg-stone-900/90 shadow-[0_0_15px_rgba(217,119,6,0.3)] backdrop-blur-md scale-105 lg:scale-100"
                        : "border-emerald-950/80 bg-stone-950/70 hover:bg-stone-900/50 hover:border-amber-600/40 backdrop-blur-sm opacity-80"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeTabGlow"
                        className="hidden lg:block absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b from-amber-300 via-amber-500 to-emerald-600"
                      />
                    )}
          
                    <div className={`w-12 h-12 sm:w-12 sm:h-12 relative overflow-hidden rounded-lg border-2 flex-shrink-0 transition-all ${
                      isActive ? "border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" : "border-emerald-900/50"
                    }`}>
                      <img
                        src={guardian.avatar}
                        alt={guardian.name}
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          isActive ? "scale-110 brightness-110" : "opacity-60 group-hover:opacity-90"
                        }`}
                      />
                    </div>
          
                    <div className="truncate hidden lg:block pr-2">
                      <div className={`text-xs font-bold tracking-wider uppercase truncate ${isActive ? "text-amber-300" : "text-stone-300"}`}>
                        {guardian.name}
                      </div>
                      <div className="text-[10px] text-emerald-400/80 font-mono tracking-widest uppercase mt-0.5">
                        {guardian.role}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <div className="hidden lg:block lg:col-span-4 order-2" />

          {/* Panel Informasi Karakter (Desktop Only) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex lg:col-span-5 order-3 justify-end z-20"
          >
            <div className="w-full max-w-xs xl:max-w-sm">
              <GuardianInfoCard selectedGuardian={selectedGuardian} content={content} />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Tombol Control Armor (Kiri Bawah Horizontal - Absolute Layer) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative lg:absolute lg:bottom-10 lg:left-8 my-2 lg:my-0 mx-auto lg:mx-0 z-30 flex items-center gap-2 sm:gap-3 p-1 sm:p-1.5 rounded-full bg-[#050806]/90 backdrop-blur-xl border border-[#cba342]/30 shadow-[0_0_30px_rgba(0,0,0,0.7),inset_0_0_15px_rgba(203,163,66,0.05)]"
      >
        {/* Label */}
        <div className="hidden sm:flex items-center gap-2 pl-3 pr-1">
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-[#cba342] animate-ping opacity-50" />
            <span className="relative w-2 h-2 rounded-full bg-[#cba342] shadow-[0_0_8px_#cba342]" />
          </span>

          <span className="text-[9px] font-['Cinzel'] tracking-[0.18em] text-[#b9a56a] uppercase">
            {content.armorToggleLabel}
          </span>
        </div>

        {/* Toggle */}
        <div className="relative flex items-center p-1 rounded-full bg-[#020604]/80 border border-[#cba342]/20">

          {/* Active sliding background */}
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-[#cba342] via-[#e2bd58] to-[#a37f2c] shadow-[0_0_18px_rgba(203,163,66,0.45)] ${
              isArmorEquipped
                ? "translate-x-full left-0"
                : "left-1"
            }`}
          />

          {/* OFF */}
          <button
            onClick={() => setIsArmorEquipped(false)}
            className={`relative z-10 min-w-[52px] sm:min-w-[58px] px-2.5 sm:px-3 py-1.5 rounded-full text-[9px] font-['Cinzel'] tracking-[0.15em] uppercase transition-all duration-300 ${
              !isArmorEquipped
                ? "text-[#020604] font-bold"
                : "text-[#718077] hover:text-[#d6dbc8]"
            }`}
          >
            {content.armorOff}
          </button>

          {/* ON */}
          <button
            onClick={() => setIsArmorEquipped(true)}
            className={`relative z-10 min-w-[52px] sm:min-w-[58px] px-2.5 sm:px-3 py-1.5 rounded-full text-[9px] font-['Cinzel'] tracking-[0.15em] uppercase transition-all duration-300 ${
              isArmorEquipped
                ? "text-[#020604] font-bold"
                : "text-[#718077] hover:text-[#d6dbc8]"
            }`}
          >
            {content.armorOn}
          </button>

        </div>
      </motion.div>

      {/* Modal / Bottom Drawer (Mobile Only) */}
      <AnimatePresence>
        {isMobileInfoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileInfoOpen(false)}
            className="lg:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end justify-center p-2 sm:p-4"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md max-h-[82svh] overflow-y-auto rounded-t-3xl sm:rounded-2xl scrollbar-none"
            >
              <GuardianInfoCard
                selectedGuardian={selectedGuardian}
                content={content}
                isMobile
                onClose={() => setIsMobileInfoOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}

function GuardianInfoCard({ selectedGuardian, content, isMobile = false, onClose }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selectedGuardian.id}
        initial={{ opacity: 0, scale: 0.95, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: isMobile ? 0 : -30 }} 
        exit={{ opacity: 0, scale: 0.95, y: isMobile ? 30 : -45 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`${isMobile ? "mt-0 rounded-t-3xl" : "-mt-6 sm:-mt-10 rounded-2xl"} bg-gradient-to-b from-[#06241b] via-[#03140f] to-[#010a07] backdrop-blur-2xl border border-amber-500/40 p-4 sm:p-6 flex flex-col justify-between space-y-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.95)] relative overflow-hidden group` }
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="absolute top-0 right-0 w-10 h-10 border-t-2 border-r-2 border-amber-400/60 rounded-tr-2xl pointer-events-none p-1">
          <div className="w-1.5 h-1.5 bg-amber-400/80 rounded-full m-1" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[3px] bg-gradient-to-r from-transparent via-amber-400 to-transparent shadow-[0_0_12px_rgba(251,191,36,0.6)]" />

        {/* Header */}
        <div className="space-y-1 relative z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-amber-400/90 font-mono text-[10px] sm:text-xs tracking-widest uppercase font-medium">
                {content.roleLabel} • {selectedGuardian.role}
              </span>
            </div>
            {isMobile && (
              <button
                onClick={onClose}
                className="w-7 h-7 rounded-full bg-stone-900/80 border border-amber-500/40 text-amber-300 text-xs flex items-center justify-center hover:bg-amber-500 hover:text-stone-950 transition-all shadow-md"
              >
                ✕
              </button>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-500 tracking-wide uppercase leading-snug drop-shadow-sm">
            {selectedGuardian.name}
          </h2>
        </div>

        {/* Divider */}
        <div className="flex items-center space-x-2 opacity-50">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-amber-500/50" />
          <div className="w-1 h-1 rotate-45 bg-amber-400" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-amber-500/50" />
        </div>

        {/* Content Section */}
        <div className="space-y-3 relative z-10">

          {/* Weapon & Ultimate */}
          <div className="grid grid-cols-2 gap-2.5">

            {/* Weapon (perlu dirapikan)*/}
            <div className="relative group/card overflow-hidden p-3 rounded-lg bg-gradient-to-br from-[#0b2117]/90 via-[#07110c]/95 to-[#020604] border border-[#cba342]/25
              hover:border-[#cba342]/70 transition-all duration-500 shadow-[inset_0_0_20px_rgba(203,163,66,0.03),0_8px_25px_rgba(0,0,0,0.5)]">

              {/* Ancient corner */}
              <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-[#cba342]/15 to-transparent rounded-bl-full pointer-events-none" />

              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-[#cba342] to-transparent" />

              <span className="text-[8px] sm:text-[9px] font-['Cinzel'] text-[#cba342]/80 uppercase tracking-[0.18em] block mb-1">
                {content.weaponLabel}
              </span>

              <p className="text-[10px] sm:text-xs font-semibold text-[#e8dfbd] tracking-wide break-words group-hover/card:text-[#cba342] transition-colors duration-300">
                {selectedGuardian.weapon}
              </p>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2
                w-0 h-px bg-[#cba342]
                group-hover/card:w-3/4
                transition-all duration-500
                shadow-[0_0_8px_#cba342]" />
            </div>

            {/* Ultimate */}
            <div className="relative group/card overflow-hidden p-3 rounded-lg bg-gradient-to-br from-[#24100d]/90 via-[#100806]/95 to-[#020604] border border-[#8f3b2d]/30 hover:border-[#b84b38]/70
              transition-all duration-500 shadow-[inset_0_0_20px_rgba(143,59,45,0.04),0_8px_25px_rgba(0,0,0,0.5)]">

              {/* Ancient corner */}
              <div className="absolute top-0 right-0 w-10 h-10 bg-gradient-to-bl from-[#a33d2d]/15 to-transparent rounded-bl-full pointer-events-none" />

              {/* Decorative line */}
              <div className="absolute top-0 left-0 w-8 h-px bg-gradient-to-r from-[#a33d2d] to-transparent" />

              <span className="text-[8px] sm:text-[9px] font-['Cinzel'] text-[#b85b48]/90 uppercase tracking-[0.18em] block mb-1">
                {content.ultimateLabel}
              </span>

              <p className="text-[10px] sm:text-xs font-semibold text-[#e5c7bd] tracking-wide break-words
                group-hover/card:text-[#d87862] transition-colors duration-300">
                {selectedGuardian.ultimate}
              </p>

              {/* Bottom glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#a33d2d] group-hover/card:w-3/4
                transition-all duration-500 shadow-[0_0_8px_#a33d2d]" />
            </div>

          </div>


          {/* Guardian Quote */}
          <blockquote className="relative text-xs italic text-[#d8d4bd] border-l-2 border-[#cba342]/70 pl-3 py-2
            bg-gradient-to-r from-[#cba342]/[0.06] to-transparent rounded-r-lg font-serif leading-relaxed overflow-hidden">

            {/* Decorative glow */}
            <div className="absolute left-0 top-0 w-12 h-full
              bg-[#cba342]/5 blur-xl pointer-events-none" />

            <span className="relative z-10">
              "{selectedGuardian.quote}"
            </span>

          </blockquote>


          {/* Description */}
          <p className="text-xs text-[#a9b5aa] leading-relaxed font-sans font-normal tracking-[0.01em]">
            {selectedGuardian.description}
          </p>

        </div>

        {/* Separator */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-amber-500/30 to-transparent my-0.5" />

        {/* Stats Section */}
        <div className="space-y-2 relative z-10">
          <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-amber-400 uppercase block font-semibold">
            {content.attributesLabel}
          </span>

          <div className="space-y-1.5 text-xs font-mono">
            {Object.entries(selectedGuardian.stats).map(([key, val]) => (
              <div key={key} className="space-y-0.5">
                <div className="flex justify-between text-[10px] sm:text-xs">
                  <span className="uppercase text-amber-200/70 tracking-wider font-medium">{content.stats[key]}</span>
                  <span className="text-amber-400 font-semibold">{val}</span>
                </div>
                <div className="w-full h-1.5 bg-stone-950/90 rounded-full overflow-hidden border border-amber-500/20 p-[1px] shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-amber-600 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${val}%` }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
