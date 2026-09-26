import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BgLore from '../assets/background/bgLore.jpg';
import gate from '../assets/background/gate.jpg';
import throne from '../assets/background/throne.jpg';

gsap.registerPlugin(ScrollTrigger);

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

export default function LoreThreshold({ lang = 'IND' }) {
  const chapters = loreChapters[lang] || loreChapters.IND;

  const stageContainerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [activeLoreIndex, setActiveLoreIndex] = useState(0);

  useGSAP(
    () => {
      const section = stageContainerRef.current;
      if (!section) return;

      // 1. Matikan & Bersihkan seluruh ScrollTrigger aktif 
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

      const panels = gsap.utils.toArray('.chapter-card', section);
      const bgImages = gsap.utils.toArray('.lore-bg-item', section);

      if (panels.length < 2) return;

      // 2. Reset paksa style elemen ke keadaan default awal
      gsap.set(panels, { autoAlpha: 0, clearProps: 'transform' });
      gsap.set(bgImages, { autoAlpha: 0, scale: 1.15 });

      // Set slide pertama agar tampil aktif
      gsap.set(panels[0], { autoAlpha: 1 });
      gsap.set(bgImages[0], { autoAlpha: 0.55, scale: 1.0 });

      const firstChildren = panels[0].querySelectorAll('.animate-child');
      gsap.set(firstChildren, { autoAlpha: 1, x: 0, y: 0, scale: 1 });

      // 3. Buat timeline GSAP ScrollTrigger baru
      const loreTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          end: () => `+=${(panels.length - 1) * window.innerHeight}`,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.transform = `scaleX(${self.progress})`;
            }
            const nearest = Math.round(self.progress * (panels.length - 1));
            setActiveLoreIndex(nearest);
          }
        }
      });

      // 4. Tambahkan animasi per-slide
      panels.slice(1).forEach((panel, index) => {
        const currentBg = bgImages[index];
        const nextBg = bgImages[index + 1];

        const prevChildren = panels[index].querySelectorAll('.animate-child');
        const nextChildren = panel.querySelectorAll('.animate-child');

        const isRight = chapters[index + 1]?.align === 'right';
        const enterX = isRight ? 100 : -100;

        loreTimeline.to(currentBg, { autoAlpha: 0, scale: 0.95, duration: 0.5 }, index)
          .to(
            prevChildren,
            {
              autoAlpha: 0,
              y: -30,
              scale: 0.9,
              stagger: 0.04,
              duration: 0.35,
              ease: 'power2.in'
            },
            index
          )
          .to(panels[index], { autoAlpha: 0, duration: 0.35 }, index)
          .set(nextBg, { autoAlpha: 0, scale: 1.15 }, index + 0.3)
          .set(panel, { autoAlpha: 1 }, index + 0.3)
          .set(
            nextChildren,
            {
              autoAlpha: 0,
              x: enterX,
              y: 20,
              scale: 0.95
            },
            index + 0.3
          )
          .to(nextBg, { autoAlpha: 0.55, scale: 1.0, duration: 0.6, ease: 'power2.out' }, index + 0.35)
          .to(
            nextChildren,
            {
              autoAlpha: 1,
              x: 0,
              y: 0,
              scale: 1,
              stagger: 0.08,
              duration: 0.6,
              ease: 'power3.out'
            },
            index + 0.4
          );
      });

      // 5. Hitung ulang kalkulasi scroll
      ScrollTrigger.refresh();
    },
    { scope: stageContainerRef, dependencies: [lang] } // Memicu ulang hook saat `lang` berubah
  );

  const currentData = chapters[activeLoreIndex] || chapters[0];
  const isRight = currentData.align === 'right';

  return (
    <section
      ref={stageContainerRef}
      className="relative h-screen w-full bg-[#020704] text-[#c2c9c4] flex flex-col justify-between items-center p-6 md:p-12 overflow-hidden select-none font-['Plus_Jakarta_Sans']"
    >
      {/* Top Progress Bar Accent */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-white/5 z-30 pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#e6c875] origin-left shadow-[0_0_12px_#d4af37]"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      {/* 1. Background Image Dinamis */}
      <div className="absolute inset-0 pointer-events-none">
        {chapters.map((ch) => (
          <div
            key={`${lang}-${ch.id}`} // Key unik menyertakan `lang` agar DOM re-render sempurna
            className="lore-bg-item absolute inset-0 bg-cover bg-center bg-no-repeat filter contrast-125 brightness-90"
            style={{ backgroundImage: `url(${ch.bgImage})` }}
          />
        ))}
      </div>

      {/* 2. Gradient Overlay Layer */}
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#020604]/80 via-[#020604]/30 to-transparent pointer-events-none z-[1]" />
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b via-transparent to-[#020604]/95 transition-all duration-700 ${
          isRight
            ? 'from-[#020604]/50 md:bg-gradient-to-r md:from-transparent md:via-[#020604]/70 md:to-[#020604]/95'
            : 'from-[#020604]/50 md:bg-gradient-to-l md:from-transparent md:via-[#020604]/70 md:to-[#020604]/95'
        }`}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(2,6,4,0.85)_90%)] pointer-events-none" />

      {/* 3. Runic Ornament */}
      <div
        className={`absolute inset-0 hidden lg:flex items-center pointer-events-none opacity-20 z-0 transition-all duration-700 ${
          isRight ? 'justify-start ml-12' : 'justify-end mr-12'
        }`}
      >
        <div className="w-[500px] h-[500px] md:w-[650px] md:h-[650px] border border-[#d4af37]/40 rounded-full relative animate-[spin_120s_linear_infinite]">
          <div className="absolute top-[15%] right-[15%] w-2 h-2 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
          <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
        </div>
        <div className="absolute w-[350px] h-[350px] md:w-[480px] md:h-[480px] border border-[#d4af37]/30 rotate-45 animate-[spin_90s_linear_infinite_reverse]" />
      </div>

      {/* 4. Ambient Glow */}
      <div
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-0 transition-all duration-700 ${
          isRight ? 'left-10 md:left-20' : 'right-10 md:right-20'
        }`}
      >
        <div className="w-80 h-80 sm:w-[32rem] sm:h-[32rem] bg-[radial-gradient(circle_at_center,_rgba(203,163,66,0.3)_0%,_rgba(16,185,129,0.12)_40%,_transparent_75%)] blur-3xl animate-pulse" />
      </div>

      <div className="w-full h-4 hidden md:block" />

      {/* 5. Content Panels Track */}
      <div className="relative z-10 max-w-7xl w-full my-auto flex items-center min-h-[440px]">
        {chapters.map((ch, index) => {
          const isPanelRight = ch.align === 'right';
          return (
            <article
              key={`${lang}-${ch.id}`} // Key unik menyertakan `lang` agar React membuat DOM baru
              className={`chapter-card absolute inset-x-0 flex flex-col items-center text-center max-w-xl space-y-4 sm:space-y-6 mx-auto ${
                isPanelRight ? 'md:mr-0 md:ml-auto' : 'md:ml-0 md:mr-auto'
              }`}
              aria-hidden={index !== activeLoreIndex}
            >
              {/* Badge */}
              <div className="animate-child flex items-center justify-center gap-3">
                <span className="font-['Cinzel'] text-[10px] sm:text-[11px] font-bold tracking-[0.35em] text-[#e6c875] uppercase border border-[#d4af37]/40 px-4 py-1.5 rounded-sm bg-[#0a0f0d]/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                  {ch.chapter}
                </span>
              </div>

              {/* Subtitle */}
              <p className="animate-child font-['Cinzel'] text-xs sm:text-sm md:text-base tracking-[0.4em] text-[#bf953f] uppercase font-bold drop-shadow-[0_0_12px_rgba(203,163,66,0.4)]">
                {ch.subtitle}
              </p>

              {/* Title */}
              <h1 className="animate-child font-['Cinzel_Decorative'] text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] uppercase leading-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)] max-w-2xl">
                {ch.title}
              </h1>

              {/* Quote */}
              <div className="animate-child max-w-xl space-y-6 pt-1 w-full flex flex-col items-center">
                <p className="font-['Cinzel'] text-xs sm:text-sm md:text-base italic text-[#9bb0a3] leading-relaxed tracking-wide font-light drop-shadow min-h-[75px] flex items-center justify-center text-center">
                  {ch.quote}
                </p>

                {/* Divider Line */}
                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                  <div className="w-2 h-2 border border-[#d4af37] rotate-45 bg-[#020604] shadow-[0_0_8px_#d4af37]" />
                  <div className="w-16 md:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="w-full h-8 pointer-events-none" />
    </section>
  );
}
