import React, { useState, useEffect } from 'react';
import { Monitor, Gamepad2, Shield, X, Sparkles, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import bgForest from '../assets/video&sound/forest.mp4';

const playNowTranslations = {
  IND: {
    badge: 'BATAS AKHIR',
    titleMain: 'ALAM GAIB',
    titleSub: 'MEMANGGIL',
    tagline: '“Perjalananmu dimulai di balik gerbang yang terlupakan”',
    ctaPlayNow: 'UNDUH SEKARANG',
    ctaSpecs: 'SPESIFIKASI SISTEM',
    supportedTitle: 'PLATFORM & PERANGKAT YANG DIDUKUNG',
    modalTitle: 'PERSYARATAN SISTEM',
    modalSub: 'SPESIFIKASI TEKNIS',
    minPreset: 'PRESET RENDAH',
    recPreset: 'PRESET ULTRA',
    recommendedBadge: 'DIREKOMENDASIKAN',
    checkerTitle: 'PEMERIKSA KECOCOKAN PERANGKAT',
    checkerSub: 'Pilih perangkat kerasmu untuk memverifikasi target framerate dan resolusi:',
    gpuLabel: 'KARTU GRAFIS:',
    ramLabel: 'SYSTEM RAM:',
    statusLabel: 'Status:',
    perfLabel: 'Proyeksi Performa:',
    
    // Status & Detail Performa (IND)
    status: {
      suboptimal: 'Kurang Optimal',
      compatMin: 'Kompatibel Minimal',
      compatGood: 'Sangat Kompatibel!',
      bottleneck: 'Bottleneck RAM',
      ramLimited: 'RAM Terbatas',
      maxPerf: 'Performa Maksimal!',
      peakPerf: 'Performa Puncak!'
    },
    details: {
      gtx1060_8gb: '1080p 30 FPS (Preset Low). Potensi stuttering akibat RAM terbatas.',
      gtx1060_16gb: '1080p 30-45 FPS (Preset Low/Medium).',
      gtx1060_32gb: '1080p 35-45 FPS (Preset Medium).',
      rtx3060_8gb: '1080p 60 FPS (Preset High). Disarankan upgrade RAM ke 16 GB untuk menghindari drop frame.',
      rtx3060_16gb: '1080p 60+ FPS / 1440p 45 FPS (Preset High, DLSS Quality).',
      rtx3060_32gb: '1080p 75+ FPS / 1440p 60 FPS (Preset High, DLSS Aktif).',
      rtx3070_8gb: '1440p 60 FPS. RAM 8GB dapat membatasi alokasi tekstur High/Ultra.',
      rtx3070_16gb: '1440p / 4K 60+ FPS (Preset Ultra, Ray-Tracing On).',
      rtx3070_32gb: '4K 60+ FPS Tanpa Hambatan (Preset Ultra, Ray-Tracing & DLSS On).'
    }
  },
  ENG: {
    badge: 'FINAL THRESHOLD',
    titleMain: 'THE REALM IS',
    titleSub: 'CALLING',
    tagline: '“Your journey begins beyond the forgotten gate”',
    ctaPlayNow: 'DOWNLOAD NOW',
    ctaSpecs: 'SYSTEM SPECS',
    supportedTitle: 'SUPPORTED PLATFORMS & HARDWARE',
    modalTitle: 'SYSTEM REQUIREMENTS',
    modalSub: 'TECHNICAL SPECIFICATIONS',
    minPreset: 'LOW PRESET',
    recPreset: 'RECOMMENDED PRESET',
    recommendedBadge: 'RECOMMENDED',
    checkerTitle: 'QUICK RIG COMPATIBILITY CHECKER',
    checkerSub: 'Select your hardware to verify target framerate and resolution before entering the Lost Realm:',
    gpuLabel: 'YOUR GRAPHICS CARD:',
    ramLabel: 'SYSTEM RAM:',
    statusLabel: 'Status:',
    perfLabel: 'Projected Performance:',
    
    // Status & Detail Performance (ENG)
    status: {
      suboptimal: 'Suboptimal',
      compatMin: 'Minimally Compatible',
      compatGood: 'Highly Compatible!',
      bottleneck: 'RAM Bottleneck',
      ramLimited: 'RAM Limited',
      maxPerf: 'Maximum Performance!',
      peakPerf: 'Peak Performance!'
    },
    details: {
      gtx1060_8gb: '1080p 30 FPS (Low Preset). Potential stuttering due to limited RAM.',
      gtx1060_16gb: '1080p 30-45 FPS (Low/Medium Preset).',
      gtx1060_32gb: '1080p 35-45 FPS (Medium Preset).',
      rtx3060_8gb: '1080p 60 FPS (High Preset). Upgrading to 16 GB RAM is recommended to prevent frame drops.',
      rtx3060_16gb: '1080p 60+ FPS / 1440p 45 FPS (High Preset, DLSS Quality).',
      rtx3060_32gb: '1080p 75+ FPS / 1440p 60 FPS (High Preset, DLSS Enabled).',
      rtx3070_8gb: '1440p 60 FPS. 8GB RAM may limit High/Ultra texture allocation.',
      rtx3070_16gb: '1440p / 4K 60+ FPS (Ultra Preset, Ray-Tracing On).',
      rtx3070_32gb: 'Uncompromised 4K 60+ FPS (Ultra Preset, Ray-Tracing & DLSS On).'
    }
  }
};

const MATRIX_CONFIG = {
  gtx1060: {
    '8gb': {
      statusKey: 'suboptimal',
      statusColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/40',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      detailKey: 'gtx1060_8gb'
    },
    '16gb': {
      statusKey: 'compatMin',
      statusColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      detailKey: 'gtx1060_16gb'
    },
    '32gb': {
      statusKey: 'compatMin',
      statusColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      detailKey: 'gtx1060_32gb'
    }
  },
  rtx3060: {
    '8gb': {
      statusKey: 'bottleneck',
      statusColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/40',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      detailKey: 'rtx3060_8gb'
    },
    '16gb': {
      statusKey: 'compatGood',
      statusColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      detailKey: 'rtx3060_16gb'
    },
    '32gb': {
      statusKey: 'compatGood',
      statusColor: 'text-emerald-400',
      borderColor: 'border-emerald-500/40',
      icon: CheckCircle2,
      iconColor: 'text-emerald-400',
      detailKey: 'rtx3060_32gb'
    }
  },
  rtx3070: {
    '8gb': {
      statusKey: 'ramLimited',
      statusColor: 'text-yellow-500',
      borderColor: 'border-yellow-500/40',
      icon: AlertTriangle,
      iconColor: 'text-yellow-500',
      detailKey: 'rtx3070_8gb'
    },
    '16gb': {
      statusKey: 'maxPerf',
      statusColor: 'text-amber-400',
      borderColor: 'border-[#c5a059]',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      detailKey: 'rtx3070_16gb'
    },
    '32gb': {
      statusKey: 'peakPerf',
      statusColor: 'text-amber-400',
      borderColor: 'border-[#c5a059]',
      icon: Sparkles,
      iconColor: 'text-amber-400',
      detailKey: 'rtx3070_32gb'
    }
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
  }
};

export default function Playnow({ lang = 'IND' }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGpu, setSelectedGpu] = useState('rtx3060');
  const [selectedRam, setSelectedRam] = useState('16gb');

  // State Anti-Spam (8 Detik Cooldown)
  const [isCoolingDown, setIsCoolingDown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);

  const t = playNowTranslations[lang] || playNowTranslations.IND;

  const currentConfig = MATRIX_CONFIG[selectedGpu]?.[selectedRam] || MATRIX_CONFIG.rtx3060['16gb'];
  const StatusIcon = currentConfig.icon;
  const statusText = t.status[currentConfig.statusKey];
  const detailText = t.details[currentConfig.detailKey];

  // Effect untuk timer countdown 8 detik
  useEffect(() => {
    let timer;
    if (isCoolingDown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => prev - 1);
      }, 1000);
    } else if (cooldownTime === 0) {
      setIsCoolingDown(false);
    }
    return () => clearInterval(timer);
  }, [isCoolingDown, cooldownTime]);

  // Handler Play Now + Efek Kembang Api
  const handlePlayNow = () => {
    if (isCoolingDown) return;

    setIsCoolingDown(true);
    setCooldownTime(8);

    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#c5a059', '#e8cb85', '#ffffff', '#2b4232']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#c5a059', '#e8cb85', '#ffffff', '#2b4232']
      });
    }, 250);
  };

  return (
    <section 
      id="playnow"
      className="relative min-h-screen bg-black text-[#d4ceb8] font-serif flex flex-col justify-between items-center px-4 py-12 overflow-hidden selection:bg-[#c5a059] selection:text-black"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      >
        <source src={bgForest} type="video/mp4" />
        Browser Anda tidak mendukung tag video.
      </video>

      {/* Overlays untuk kontras teks */}
      <div className="absolute inset-0 bg-black/50 backdrop-brightness-80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020704]/80 via-[#080d0a]/55 to-[#020704]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#112017]/30 via-transparent to-[#080d0a]/80 pointer-events-none" />

      {/* Main Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 max-w-4xl w-full text-center my-auto pt-8"
      >
<motion.div 
  initial={{ opacity: 0, scale: 0.8 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2b3a30] bg-[#0d1611]/80 backdrop-blur-md text-[#8ba391] text-xs uppercase tracking-[0.25em] mb-8 shadow-inner font-['Cinzel']"
>
  <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
  <span>{t.badge}</span>
</motion.div>

{/* Judul Utama */}
<h1 className="font-['Cinzel_Decorative'] text-4xl md:text-6xl lg:text-7xl font-bold tracking-[0.1em] uppercase text-[#f3ede0] leading-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
  {t.titleMain} <br />
  <span className="text-[#f3ede0]">{t.titleSub}</span>
</h1>

{/* Tagline */}
<p className="italic text-lg md:text-xl text-[#b5c0b4] mt-6 font-['Cinzel'] tracking-[0.08em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
  {t.tagline}
</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10">
          <motion.button 
            whileHover={!isCoolingDown ? { scale: 1.05 } : {}}
            whileTap={!isCoolingDown ? { scale: 0.95 } : {}}
            onClick={handlePlayNow}
            disabled={isCoolingDown}
            className={`w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 font-sans font-bold text-sm tracking-widest uppercase rounded border transition-all ${
              isCoolingDown
                ? 'bg-[#18241c] text-[#637d6a] border-[#2b3a30] cursor-not-allowed opacity-80 shadow-none'
                : 'bg-gradient-to-r from-[#ba9348] via-[#d6b268] to-[#9e7a33] text-[#0d140e] border-[#e8cb85] shadow-[0_0_20px_rgba(197,160,89,0.4)] hover:brightness-110 cursor-pointer'
            }`}
          >
            {isCoolingDown ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#c5a059]" />
                <span>TUNGGU ({cooldownTime}S)</span>
              </>
            ) : (
              <>
                <Shield className="w-4 h-4 fill-current" />
                <span>{t.ctaPlayNow}</span>
              </>
            )}
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 bg-[#0e1712]/90 backdrop-blur-md text-[#d4ceb8] font-sans font-semibold text-sm tracking-widest uppercase rounded border border-[#2d3f33] hover:border-[#c5a059]/60 hover:text-[#f3ede0] transition-all shadow-md cursor-pointer"
          >
            <Monitor className="w-4 h-4 text-[#c5a059]" />
            {t.ctaSpecs}
          </motion.button>
        </div>
      </motion.div>

      {/* Footer / Supported Platforms */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="relative z-10 max-w-5xl w-full mt-16"
      >
        <motion.p 
          variants={itemVariants}
          className="text-center text-xs tracking-[0.2em] text-[#788e7e] uppercase mb-6 font-sans font-semibold drop-shadow"
        >
          {t.supportedTitle}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0b130e]/80 backdrop-blur-md border border-[#1b2b20] rounded p-4 text-center hover:border-[#2b4232] transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-[#d4ceb8] font-sans font-bold text-sm tracking-wider uppercase mb-1">
              <Monitor className="w-4 h-4 text-[#8ba391]" />
              PC Steam / Epic
            </div>
            <p className="text-xs text-[#6e8273] font-sans">DirectX 12 / DLSS 3.5</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0b130e]/80 backdrop-blur-md border border-[#1b2b20] rounded p-4 text-center hover:border-[#2b4232] transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-[#d4ceb8] font-sans font-bold text-sm tracking-wider uppercase mb-1">
              <Gamepad2 className="w-4 h-4 text-[#8ba391]" />
              PlayStation 5
            </div>
            <p className="text-xs text-[#6e8273] font-sans">DualSense Haptics & 3D Audio</p>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            whileHover={{ y: -5 }}
            className="bg-[#0b130e]/80 backdrop-blur-md border border-[#1b2b20] rounded p-4 text-center hover:border-[#2b4232] transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-[#d4ceb8] font-sans font-bold text-sm tracking-wider uppercase mb-1">
              <Shield className="w-4 h-4 text-[#8ba391]" />
              Xbox Series X|S
            </div>
            <p className="text-xs text-[#6e8273] font-sans">Quick Resume & 4K 60FPS</p>
          </motion.div>
        </div>
      </motion.div>

      {/* SYSTEM SPECS MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[#09110c] border border-[#c5a059]/40 rounded-lg p-6 md:p-8 text-[#d4ceb8] shadow-[0_0_50px_rgba(0,0,0,0.95)] max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-1.5 rounded border border-[#2b3d31] bg-[#0d1712] text-[#8ba391] hover:text-white hover:border-[#c5a059] transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-[#c5a059] text-xs tracking-[0.25em] uppercase font-sans font-semibold mb-1">
                <Monitor className="w-4 h-4" />
                {t.modalSub}
              </div>

              <h2 className="text-2xl md:text-4xl font-bold tracking-wider uppercase text-[#f3ede0] font-serif mb-6">
                {t.modalTitle}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#060c08] border border-[#18261d] rounded-lg p-5 relative font-sans">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-sm tracking-wide text-white uppercase">
                      MINIMUM (1080p 30FPS)
                    </h3>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-[#101e15] text-[#718b7a] border border-[#1d3023] uppercase">
                      {t.minPreset}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div><span className="font-semibold text-white block">OS:</span><span className="text-[#8ba391]">Windows 10/11 64-bit</span></div>
                    <div><span className="font-semibold text-white block">Processor:</span><span className="text-[#8ba391]">Intel Core i5-8400 / AMD Ryzen 5 2600</span></div>
                    <div><span className="font-semibold text-white block">Memory:</span><span className="text-[#8ba391]">12 GB RAM</span></div>
                    <div><span className="font-semibold text-white block">Graphics:</span><span className="text-[#8ba391]">NVIDIA GTX 1060 (6GB) / AMD Radeon RX 580 (8GB)</span></div>
                    <div><span className="font-semibold text-white block">Storage:</span><span className="text-[#8ba391]">75 GB available SSD space</span></div>
                    <div><span className="font-semibold text-white block">DirectX:</span><span className="text-[#8ba391]">Version 12</span></div>
                  </div>
                </div>

                <div className="bg-[#060c08] border border-[#283c2f] rounded-lg p-5 relative font-sans shadow-md">
                  <div className="absolute -top-3 right-6 bg-[#c5a059] text-[#09110c] text-[10px] font-bold tracking-widest px-3 py-1 rounded uppercase shadow-sm">
                    {t.recommendedBadge}
                  </div>

                  <div className="flex justify-between items-center mb-4 pt-1">
                    <h3 className="font-bold text-sm tracking-wide text-white uppercase pr-2">
                      RECOMMENDED (1440p 60FPS)
                    </h3>
                    <span className="text-[10px] font-bold tracking-wider px-2 py-0.5 rounded bg-[#101e15] text-[#8ba391] border border-[#1d3023] uppercase">
                      {t.recPreset}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div><span className="font-semibold text-white block">OS:</span><span className="text-[#8ba391]">Windows 11 64-bit</span></div>
                    <div><span className="font-semibold text-white block">Processor:</span><span className="text-[#8ba391]">Intel Core i7-12700K / AMD Ryzen 7 7700X</span></div>
                    <div><span className="font-semibold text-white block">Memory:</span><span className="text-[#8ba391]">16 GB or 32 GB DDR5 RAM</span></div>
                    <div><span className="font-semibold text-white block">Graphics:</span><span className="text-[#8ba391]">NVIDIA RTX 3070 (8GB) / AMD Radeon RX 6800 XT</span></div>
                    <div><span className="font-semibold text-white block">Storage:</span><span className="text-[#8ba391]">75 GB NVMe M.2 SSD</span></div>
                    <div><span className="font-semibold text-white block">Ray Tracing:</span><span className="text-[#8ba391]">Hardware DXR acceleration supported</span></div>
                  </div>
                </div>
              </div>

              <div className="bg-[#060d09] border border-[#1a2d21] rounded-lg p-5 font-sans">
                <div className="flex items-center gap-2 text-[#c5a059] font-bold text-xs tracking-wider uppercase mb-1 font-serif">
                  <Sparkles className="w-4 h-4" />
                  {t.checkerTitle}
                </div>
                <p className="text-xs text-[#6e8273] mb-4">
                  {t.checkerSub}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-[#8ba391] uppercase mb-1">
                      {t.gpuLabel}
                    </label>
                    <select 
                      value={selectedGpu} 
                      onChange={(e) => setSelectedGpu(e.target.value)}
                      className="w-full bg-[#030704] border border-[#1f3326] text-xs text-[#d4ceb8] rounded p-2.5 outline-none 
                                focus:border-[#c5a059] hover:border-[#8b6a35] hover:bg-[#0d0a06]
                                transition-colors cursor-pointer"
                    >
                      <option value="gtx1060">NVIDIA GTX 1060 / AMD RX 580</option>
                      <option value="rtx3060">NVIDIA RTX 3060 / AMD RX 6600</option>
                      <option value="rtx3070">NVIDIA RTX 3070 / AMD RX 6800 XT</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-[#8ba391] uppercase mb-1">
                      {t.ramLabel}
                    </label>
                    <select 
                      value={selectedRam} 
                      onChange={(e) => setSelectedRam(e.target.value)}
                      className="w-full bg-[#030704] border border-[#1f3326] text-xs text-[#d4ceb8] rounded p-2.5 outline-none 
                                focus:border-[#c5a059] hover:border-[#8b6a35] hover:bg-[#0d0a06]
                                transition-colors cursor-pointer"
                    >
                      <option value="8gb">8 GB</option>
                      <option value="16gb">16 GB</option>
                      <option value="32gb">32 GB</option>
                    </select>
                  </div>
                </div>

                <div className={`flex items-start gap-3 bg-[#030704] border ${currentConfig.borderColor} rounded p-3.5 text-xs text-[#d4ceb8] transition-all duration-300`}>
                  <StatusIcon className={`w-5 h-5 ${currentConfig.iconColor} shrink-0 mt-0.5`} />
                  <div>
                    <div className="font-bold mb-0.5">
                      <span className="text-[#a1b3a6]">{t.statusLabel}</span>{" "}
                      <span className={currentConfig.statusColor}>{statusText}</span>
                    </div>
                    <div className="text-[#a1b3a6]">
                      <span className="font-semibold text-white">{t.perfLabel}</span>{" "}
                      {detailText}
                    </div>
                  </div>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}