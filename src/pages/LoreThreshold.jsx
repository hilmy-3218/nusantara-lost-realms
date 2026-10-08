import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BgLore from '../assets/background/bgLore.jpg';
import gate from '../assets/background/gate.jpg';
import throne from '../assets/background/throne.jpg';

gsap.registerPlugin(ScrollTrigger, useGSAP);

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
        '“Di balik gerbang yang tak seharusnya terbuka, terbentang dunia asing yang telah lama terkubur dari ingatan manusia. Di antara reruntuhan kerajaan dan hutan yang diselimuti kegelapan, empat penjaga mulai mengungkap jejak sebuah kutukan yang telah bertahan selama berabad abad.”',
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
        '“Behind forgotten ancient ruins, four guardians stand before an invisible gate a rift to another dimension that mankind should have never touched.”',
      bgImage: gate,
      align: 'right'
    },
    {
      id: 2,
      chapter: 'CHAPTER 02',
      subtitle: 'THE FORGOTTEN WORLD',
      title: 'FOOTSTEPS BEYOND THE GATE',
      quote:
        '“Beyond the gate that should never have opened lies an alien world long buried from human memory. Among kingdom ruins and darkness shrouded forests, four guardians begin to uncover the traces of a curse that has endured for centuries.”',
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
  const mobileRef = useRef(null);
  const [activeLoreIndex, setActiveLoreIndex] = useState(0);

  useGSAP(
    () => {
      const section = stageContainerRef.current;
      if (!section) return;

      // GSAP hanya aktif di desktop/tablet (>= 768px). Di HP tidak ada animasi.
      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const panels = gsap.utils.toArray('.chapter-card', section);
        const bgImages = gsap.utils.toArray('.lore-bg-item', section);

        if (panels.length < 2) return;

        setActiveLoreIndex(0);
        gsap.set(panels, { autoAlpha: 0, clearProps: 'transform' });
        gsap.set(bgImages, { autoAlpha: 0, scale: 1.15 });

        gsap.set(panels[0], { autoAlpha: 1 });
        gsap.set(bgImages[0], { autoAlpha: 0.55, scale: 1.0 });

        const firstChildren = panels[0].querySelectorAll('.animate-child');
        gsap.set(firstChildren, { autoAlpha: 1, x: 0, y: 0, scale: 1 });

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

        panels.slice(1).forEach((panel, index) => {
          const currentBg = bgImages[index];
          const nextBg = bgImages[index + 1];

          const prevChildren = panels[index].querySelectorAll('.animate-child');
          const nextChildren = panel.querySelectorAll('.animate-child');

          const isRight = chapters[index + 1]?.align === 'right';
          const enterX = isRight ? 100 : -100;

          loreTimeline
            .to(currentBg, { autoAlpha: 0, scale: 0.95, duration: 0.5 }, index)
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
              { autoAlpha: 0, x: enterX, y: 20, scale: 0.95 },
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

        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: stageContainerRef, dependencies: [lang], revertOnUpdate: true }
  );

  // ===================== MOBILE: animasi scroll ringan (tanpa pin) =====================
  useGSAP(
    () => {
      const root = mobileRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();

      mm.add('(max-width: 767px) and (prefers-reduced-motion: no-preference)', () => {
        // Progress bar sticky di atas
        gsap.to('.m-progress', {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3
          }
        });

        // Hint "scroll" memudar saat mulai digulir
        gsap.to('.m-hint', {
          autoAlpha: 0,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: root,
            start: 'top top',
            end: '+=180',
            scrub: true
          }
        });

        gsap.utils.toArray('.m-card', root).forEach((card) => {
          const bg = card.querySelector('.m-bg');
          const ghost = card.querySelector('.m-ghost');
          const kids = card.querySelectorAll('.m-child');
          const lines = card.querySelectorAll('.m-line');
          const diamond = card.querySelector('.m-diamond');
          const embers = card.querySelectorAll('.m-ember');

          // Parallax + zoom out pelan pada background
          gsap.fromTo(
            bg,
            { yPercent: -10, scale: 1.25 },
            {
              yPercent: 10,
              scale: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );

          // Angka raksasa bergerak berlawanan arah
          gsap.fromTo(
            ghost,
            { yPercent: 40, autoAlpha: 0 },
            {
              yPercent: -40,
              autoAlpha: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
              }
            }
          );

          // Reveal konten: naik + blur hilang + stagger
          gsap
            .timeline({
              scrollTrigger: {
                trigger: card,
                start: 'top 65%',
                toggleActions: 'play none none reverse'
              }
            })
            .from(kids, {
              autoAlpha: 0,
              y: 50,
              scale: 0.94,
              filter: 'blur(6px)',
              duration: 0.8,
              ease: 'power3.out',
              stagger: 0.12
            })
            .from(lines, { scaleX: 0, duration: 0.7, ease: 'power2.out' }, '-=0.4')
            .from(
              diamond,
              { scale: 0, rotation: -180, autoAlpha: 0, duration: 0.7, ease: 'back.out(2)' },
              '<'
            );

          // Partikel emas melayang
          gsap.set(embers, { autoAlpha: 0.2 });
          gsap.to(embers, {
            y: 'random(-70, -120)',
            x: 'random(-18, 18)',
            autoAlpha: 'random(0.4, 0.95)',
            duration: 'random(3, 6)',
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.35, from: 'random' }
          });
        });
      });

      return () => mm.revert();
    },
    { scope: mobileRef, dependencies: [lang], revertOnUpdate: true }
  );

  const currentData = chapters[activeLoreIndex] || chapters[0];
  const isRight = currentData.align === 'right';

  return (
    <>
      {/* ================= MOBILE: scroll biasa + animasi ringan ================= */}
      <div
        ref={mobileRef}
        className="md:hidden relative bg-[#020704] text-[#c2c9c4] font-['Plus_Jakarta_Sans']"
      >
        {/* Progress bar sticky */}
        <div className="sticky top-0 z-30 h-[3px] bg-white/5 pointer-events-none">
          <div
            className="m-progress h-full w-full origin-left bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#e6c875] shadow-[0_0_12px_#d4af37]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {chapters.map((ch, i) => (
          <article
            key={ch.id}
            className={`m-card relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-20 ${
              i > 0 ? 'border-t border-[#d4af37]/20' : ''
            }`}
          >
            {/* Background (lebih tinggi dari card untuk parallax) */}
            <div
              className="m-bg absolute inset-x-0 -top-[15%] h-[130%] bg-cover bg-center bg-no-repeat opacity-55 contrast-125 brightness-90 will-change-transform"
              style={{ backgroundImage: `url(${ch.bgImage})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020604]/85 via-[#020604]/55 to-[#020604]/95" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_20%,_rgba(2,6,4,0.8)_90%)]" />
            <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(203,163,66,0.22)_0%,_rgba(16,185,129,0.08)_45%,_transparent_75%)] blur-3xl" />

            {/* Angka bab raksasa (outline) */}
            <span
              className="m-ghost pointer-events-none absolute inset-x-0 top-[6%] select-none text-center font-['Cinzel_Decorative'] text-[9rem] font-bold leading-none text-transparent"
              style={{ WebkitTextStroke: '1px rgba(212,175,55,0.28)' }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Partikel */}
            {[
              [12, 22, 3],
              [82, 30, 2],
              [24, 64, 2],
              [72, 78, 3],
              [52, 12, 2]
            ].map(([l, t, size], k) => (
              <span
                key={k}
                className="m-ember pointer-events-none absolute rounded-full bg-[#e6c875] shadow-[0_0_10px_#d4af37]"
                style={{ left: `${l}%`, top: `${t}%`, width: size, height: size }}
              />
            ))}

            {/* Konten */}
            <div className="relative z-10 flex max-w-md flex-col items-center space-y-5 text-center">
              <span className="m-child font-['Cinzel'] text-[10px] font-bold uppercase tracking-[0.35em] text-[#e6c875] border border-[#d4af37]/40 px-4 py-1.5 rounded-sm bg-[#0a0f0d]/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                {ch.chapter}
              </span>

              <p className="m-child font-['Cinzel'] text-xs font-bold uppercase tracking-[0.4em] text-[#bf953f] drop-shadow-[0_0_12px_rgba(203,163,66,0.4)]">
                {ch.subtitle}
              </p>

              <h2 className="m-child font-['Cinzel_Decorative'] text-3xl font-bold uppercase leading-tight tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)]">
                {ch.title}
              </h2>

              <p className="m-child font-['Cinzel'] text-xs italic font-light leading-relaxed tracking-wide text-[#9bb0a3] drop-shadow">
                {ch.quote}
              </p>

              <div className="m-child flex items-center justify-center gap-4 pt-2">
                <div className="m-line w-16 h-[1px] origin-right bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                <div
                  className="m-diamond w-2 h-2 border border-[#d4af37] bg-[#020604] shadow-[0_0_8px_#d4af37]"
                  style={{ transform: 'rotate(45deg)' }}
                />
                <div className="m-line w-16 h-[1px] origin-left bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
              </div>
            </div>

            {/* Hint scroll (hanya bab pertama) */}
            {i === 0 && (
              <div className="m-hint absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-2 font-['Cinzel'] text-[10px] uppercase tracking-[0.4em] text-[#bf953f]">
                <span>{lang === 'ENG' ? 'Scroll' : 'Gulir'}</span>
                <span className="block h-8 w-[1px] animate-pulse bg-gradient-to-b from-[#d4af37] to-transparent" />
              </div>
            )}
          </article>
        ))}
      </div>

      {/* ================= DESKTOP / TABLET: pinned + GSAP ================= */}
      <section
        ref={stageContainerRef}
        className="relative hidden md:flex h-screen w-full bg-[#020704] text-[#c2c9c4] flex-col justify-between items-center p-12 overflow-hidden select-none font-['Plus_Jakarta_Sans']"
      >
        {/* Top Progress Bar */}
        <div className="absolute top-0 inset-x-0 h-[3px] bg-white/5 z-30 pointer-events-none">
          <div
            ref={progressBarRef}
            className="h-full w-full bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#e6c875] origin-left shadow-[0_0_12px_#d4af37]"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* 1. Dynamic Background Image */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {chapters.map((ch) => (
            <div
              key={ch.id}
              className="lore-bg-item absolute inset-0 bg-cover bg-center bg-no-repeat filter contrast-125 brightness-90"
              style={{ backgroundImage: `url(${ch.bgImage})` }}
            />
          ))}
        </div>

        {/* 2. Overlay Gradien */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020604] via-[#020604]/40 to-transparent pointer-events-none z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020604] via-[#020604]/60 to-transparent pointer-events-none z-[1]" />

        <div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-[#020604]/80 to-[#020604]/98 transition-opacity duration-700 ease-in-out z-[1] ${
            isRight ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute inset-0 pointer-events-none bg-gradient-to-l from-transparent via-[#020604]/80 to-[#020604]/98 transition-opacity duration-700 ease-in-out z-[1] ${
            !isRight ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(2,6,4,0.85)_90%)] pointer-events-none z-[1]" />

        {/* 3. Runic Ornament */}
        <div
          className={`absolute inset-0 hidden lg:flex items-center pointer-events-none opacity-20 z-[2] transition-all duration-700 ${
            isRight ? 'justify-start ml-12' : 'justify-end mr-12'
          }`}
        >
          <div className="w-[650px] h-[650px] border border-[#d4af37]/40 rounded-full relative animate-[spin_120s_linear_infinite]">
            <div className="absolute top-[15%] right-[15%] w-2 h-2 bg-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]" />
            <div className="absolute bottom-[20%] left-[20%] w-1.5 h-1.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
          </div>
          <div className="absolute w-[480px] h-[480px] border border-[#d4af37]/30 rotate-45 animate-[spin_90s_linear_infinite_reverse]" />
        </div>

        {/* 4. Ambient Glow */}
        <div
          className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-[2] transition-all duration-700 ${
            isRight ? 'left-20' : 'right-20'
          }`}
        >
          <div className="w-[32rem] h-[32rem] bg-[radial-gradient(circle_at_center,_rgba(203,163,66,0.3)_0%,_rgba(16,185,129,0.12)_40%,_transparent_75%)] blur-3xl animate-pulse" />
        </div>

        <div className="w-full h-4" />

        {/* 5. Content Panels Track */}
        <div className="relative z-10 max-w-7xl w-full my-auto h-[min(600px,calc(100vh-11rem))]">
          {chapters.map((ch, index) => {
            const isPanelRight = ch.align === 'right';
            // Bab dengan teks panjang (mis. bab 2) dibuat sedikit lebih ringkas agar muat
            const isLong = ch.quote.length > 200;
            return (
              <article
                key={ch.id}
                className={`chapter-card absolute inset-0 flex flex-col items-center justify-start pt-[10vh] text-center max-w-xl lg:max-w-2xl mx-auto ${
                  isLong ? 'space-y-3 lg:space-y-4' : 'space-y-4 lg:space-y-6'
                } ${isPanelRight ? 'md:mr-0 md:ml-auto' : 'md:ml-0 md:mr-auto'}`}
                aria-hidden={index !== activeLoreIndex}
              >
                <div className="animate-child flex items-center justify-center gap-3">
                  <span className="font-['Cinzel'] text-[11px] font-bold tracking-[0.35em] text-[#e6c875] uppercase border border-[#d4af37]/40 px-4 py-1.5 rounded-sm bg-[#0a0f0d]/80 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    {ch.chapter}
                  </span>
                </div>

                <p className="animate-child font-['Cinzel'] text-sm md:text-base tracking-[0.4em] text-[#bf953f] uppercase font-bold drop-shadow-[0_0_12px_rgba(203,163,66,0.4)]">
                  {ch.subtitle}
                </p>

                <h1
                  className={`animate-child font-['Cinzel_Decorative'] font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] via-[#e2e8f0] to-[#94a3b8] uppercase leading-tight drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)] max-w-2xl ${
                    isLong ? 'text-3xl lg:text-4xl xl:text-5xl' : 'text-4xl lg:text-5xl xl:text-6xl'
                  }`}
                >
                  {ch.title}
                </h1>

                <div className="animate-child max-w-xl lg:max-w-2xl space-y-3 lg:space-y-5 pt-1 w-full flex flex-col items-center">
                  <p
                    className={`font-['Cinzel'] italic text-[#9bb0a3] leading-relaxed tracking-wide font-light drop-shadow text-center ${
                      isLong ? 'text-xs xl:text-sm' : 'text-sm xl:text-base'
                    }`}
                  >
                    {ch.quote}
                  </p>

                  <div className="flex items-center justify-center gap-4 pt-2">
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                    <div className="w-2 h-2 border border-[#d4af37] rotate-45 bg-[#020604] shadow-[0_0_8px_#d4af37]" />
                    <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="w-full h-8 pointer-events-none" />
      </section>
    </>
  );
}
