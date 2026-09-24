
import React, { useState, useEffect } from 'react';
import { ChevronDown, Volume2, VolumeX } from 'lucide-react';

const NAV_DATA = {
  IND: {
    nav: [
      { label: 'BERANDA', id: 'home' },
      {
        label: 'DUNIA',
        id: 'world',
        dropdown: [
          { label: 'PENJAGA', id: 'guardians' },
          { label: 'PETA KUNO', id: 'map' },
          { label: 'MAKHLUK MITOS', id: 'creatures' },
        ]
      },
      { label: 'CARA BERMAIN', id: 'systems' },
      { label: 'PEMBARUAN', id: 'updates' }
    ],
    title: 'NUSANTARA',
    ctaNavbar: 'UNDUH SEKARANG',
  },

  ENG: {
    nav: [
      { label: 'HOME', id: 'home' },
      {
        label: 'WORLD',
        id: 'world',
        dropdown: [
          { label: 'GUARDIANS', id: 'guardians' },
          { label: 'ANCIENT MAP', id: 'map' },
          { label: 'MYTHICAL CREATURES', id: 'creatures' },
        ]
      },
      { label: 'GAMEPLAY', id: 'systems' },
      { label: 'UPDATES', id: 'updates' }
    ],
    title: 'NUSANTARA',
    ctaNavbar: 'DOWNLOAD NOW',
  }
};

export default function Navbar({
  lang,
  setLang,
  isMuted,
  setIsMuted,
  scrollToSection
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const content = NAV_DATA[lang] || NAV_DATA.IND;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigasi tanpa mengubah URL menjadi #section
  const handleNavigation = (id) => {
    if (scrollToSection) {
      scrollToSection(id);
    }

    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 lg:px-12 transition-[padding,background-color,box-shadow,backdrop-filter] duration-500 ${
        isScrolled
          ? 'py-3 bg-[#020604]/85 backdrop-blur-2xl border-b border-[#cba342]/20 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
          : 'py-6 bg-gradient-to-b from-[#020604]/90 via-[#020604]/40 to-transparent border-b-0'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">

        {/* Logo Brand */}
        <button
          onClick={() => handleNavigation('home')}
          className="flex items-center gap-3 cursor-pointer group bg-transparent border-0 p-0"
          aria-label="Go to Home"
        >
          <div className="relative flex items-center justify-center w-3 h-3">
            <div className="absolute inset-0 rounded-full bg-[#cba342] animate-ping opacity-60" />

            <div className="w-2.5 h-2.5 rounded-full bg-[#cba342] shadow-[0_0_12px_#cba342] group-hover:scale-125 transition-transform duration-300" />
          </div>

          <span className="font-['Cinzel'] text-lg md:text-xl font-bold tracking-[0.3em] text-[#e5e9e6] uppercase group-hover:text-[#cba342] transition-colors duration-300 drop-shadow-[0_0_10px_rgba(203,163,66,0.2)]">
            {content.title}
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] tracking-[0.2em] font-semibold text-[#8a9e91]">

          {content.nav.map((item) => (
            <div
              key={item.label}
              className="relative group py-2"
              onMouseEnter={() =>
                item.dropdown && setActiveDropdown(item.label)
              }
              onMouseLeave={() =>
                item.dropdown && setActiveDropdown(null)
              }
            >

              {/* Main Navigation */}
              <button
                onClick={() => !item.dropdown && handleNavigation(item.id)}
                className="flex items-center gap-1.5 bg-transparent border-0 p-0 text-inherit cursor-pointer hover:text-[#e5e9e6] transition-all duration-300 uppercase whitespace-nowrap"
              >
                <span className="group-hover:text-[#cba342] transition-colors duration-300">
                  {item.label}
                </span>

                {item.dropdown && (
                  <ChevronDown
                    className="w-3.5 h-3.5 group-hover:text-[#cba342] transition-transform duration-300 group-hover:rotate-180"
                  />
                )}
              </button>

              {/* Line Indicator */}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-transparent via-[#cba342] to-transparent group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#cba342]" />

              {/* Sub-menu Dropdown */}
              {item.dropdown && (
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 transition-all duration-300 ${
                    activeDropdown === item.label
                      ? 'opacity-100 visible translate-y-0'
                      : 'opacity-0 invisible -translate-y-2'
                  }`}
                >
                  <div className="bg-[#050f0a]/95 backdrop-blur-xl border border-[#cba342]/30 rounded-md p-2 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col gap-1">

                    {item.dropdown.map((subItem) => (
                      <button
                        key={subItem.label}
                        onClick={() => handleNavigation(subItem.id)}
                        className="w-full text-left px-3 py-2 text-[10px] tracking-[0.15em] text-[#8a9e91] hover:text-[#cba342] hover:bg-[#cba342]/10 rounded transition-all duration-200 bg-transparent border-0 cursor-pointer"
                      >
                        {subItem.label}
                      </button>
                    ))}

                  </div>
                </div>
              )}

            </div>
          ))}

        </nav>

        {/* Action Controls Desktop */}
        <div className="hidden sm:flex items-center space-x-4">

          {/* Audio Controller */}
          <button
            onClick={setIsMuted}
            aria-label="Toggle Audio"
            className="flex items-center gap-2 p-2 px-3 bg-[#050f0a]/90 backdrop-blur-md border border-[#1e3328] hover:border-[#cba342]/50 rounded-full text-[#8a9e91] hover:text-[#cba342] transition-all duration-300 shadow-inner group"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#8a9e91] group-hover:text-[#cba342]" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#cba342] animate-pulse" />
            )}

            <div className="flex items-end gap-[2px] h-3">
              <span
                className={`w-[2px] bg-[#cba342] rounded-full transition-all duration-300 ${
                  !isMuted
                    ? 'h-full animate-bounce'
                    : 'h-1 opacity-40'
                }`}
              />

              <span
                className={`w-[2px] bg-[#cba342] rounded-full transition-all duration-300 ${
                  !isMuted
                    ? 'h-2/3 animate-bounce [animation-delay:0.2s]'
                    : 'h-1 opacity-40'
                }`}
              />

              <span
                className={`w-[2px] bg-[#cba342] rounded-full transition-all duration-300 ${
                  !isMuted
                    ? 'h-4/5 animate-bounce [animation-delay:0.4s]'
                    : 'h-1 opacity-40'
                }`}
              />
            </div>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center bg-[#050f0a]/90 backdrop-blur-md border border-[#1e3328] rounded-full p-1 text-[10px] font-bold tracking-widest shadow-inner">

            <button
              onClick={() => setLang('IND')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${
                lang === 'IND'
                  ? 'bg-[#cba342] text-[#020604] shadow-[0_0_12px_rgba(203,163,66,0.6)] font-extrabold'
                  : 'text-[#8a9e91] hover:text-[#e5e9e6]'
              }`}
            >
              IND
            </button>

            <button
              onClick={() => setLang('ENG')}
              className={`px-3 py-1 rounded-full transition-all duration-300 ${
                lang === 'ENG'
                  ? 'bg-[#cba342] text-[#020604] shadow-[0_0_12px_rgba(203,163,66,0.6)] font-extrabold'
                  : 'text-[#8a9e91] hover:text-[#e5e9e6]'
              }`}
            >
              ENG
            </button>

          </div>

          {/* CTA Download */}
          <button
            onClick={() => handleNavigation('playnow')}
            className="inline-block relative group overflow-hidden px-5 py-2 border border-[#cba342]/80 rounded text-[#cba342] hover:text-[#020604] font-bold text-[11px] tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(203,163,66,0.15)] hover:shadow-[0_0_25px_rgba(203,163,66,0.6)] bg-transparent cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#cba342] to-[#a37f2c] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out -z-10" />

            <span className="relative z-10">
              {content.ctaNavbar}
            </span>
          </button>

        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 lg:hidden">

          <button
            onClick={setIsMuted}
            aria-label="Toggle Audio Mobile"
            className="p-2 bg-[#050f0a] border border-[#1e3328] rounded-full text-[#cba342]"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-[#8a9e91]" />
            ) : (
              <Volume2 className="w-4 h-4 animate-pulse text-[#cba342]" />
            )}
          </button>

          <button
            onClick={() =>
              setIsMobileMenuOpen(!isMobileMenuOpen)
            }
            className="text-[#8a9e91] hover:text-[#cba342] p-2 focus:outline-none transition-colors duration-300"
            aria-label="Toggle Mobile Menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">

              <span
                className={`w-full h-[2px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? 'rotate-45 translate-y-2'
                    : ''
                }`}
              />

              <span
                className={`w-full h-[2px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />

              <span
                className={`w-full h-[2px] bg-current transition-all duration-300 ${
                  isMobileMenuOpen
                    ? '-rotate-45 -translate-y-2'
                    : ''
                }`}
              />

            </div>
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#020604]/95 backdrop-blur-2xl border-b border-[#cba342]/30 px-6 py-8 flex flex-col space-y-4 text-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-[fadeInUp_0.3s_cubic-bezier(0.16,1,0.3,1)]">

          {content.nav.map((item) => (
            <React.Fragment key={item.label}>

              {/* Mobile Main Navigation */}
              {!item.dropdown ? (
                <button
                  onClick={() => handleNavigation(item.id)}
                  className="w-full text-xs tracking-[0.25em] font-semibold text-[#8a9e91] hover:text-[#cba342] py-2 uppercase transition-colors duration-300 border-b border-[#1e3328]/30 bg-transparent border-x-0 border-t-0 cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <div className="flex flex-col border-b border-[#1e3328]/30 py-2">

                  <span className="text-xs tracking-[0.25em] font-bold text-[#cba342] uppercase mb-2">
                    {item.label}
                  </span>

                  <div className="flex flex-col gap-2 bg-[#050f0a]/50 py-2 rounded">

                    {item.dropdown.map((sub) => (
                      <button
                        key={sub.label}
                        onClick={() => handleNavigation(sub.id)}
                        className="w-full text-[11px] tracking-[0.2em] text-[#8a9e91] hover:text-white py-1 uppercase bg-transparent border-0 cursor-pointer"
                      >
                        {sub.label}
                      </button>
                    ))}

                  </div>
                </div>
              )}

            </React.Fragment>
          ))}

          {/* Mobile Bottom Controls */}
          <div className="pt-4 flex flex-col items-center gap-4">

            {/* Language */}
            <div className="flex items-center gap-4">

              <div className="flex items-center bg-[#050f0a] border border-[#1e3328] rounded-full p-1 text-xs">

                <button
                  onClick={() => setLang('IND')}
                  className={`px-4 py-1 rounded-full ${
                    lang === 'IND'
                      ? 'bg-[#cba342] text-[#020604] font-bold shadow-[0_0_8px_#cba342]'
                      : 'text-[#8a9e91]'
                  }`}
                >
                  IND
                </button>

                <button
                  onClick={() => setLang('ENG')}
                  className={`px-4 py-1 rounded-full ${
                    lang === 'ENG'
                      ? 'bg-[#cba342] text-[#020604] font-bold shadow-[0_0_8px_#cba342]'
                      : 'text-[#8a9e91]'
                  }`}
                >
                  ENG
                </button>
              </div>
            </div>

            {/* Mobile CTA */}
            <button
              onClick={() => handleNavigation('playnow')}
              className="block w-full py-3 bg-gradient-to-r from-[#cba342] to-[#a37f2c] text-[#020604] font-extrabold text-xs tracking-[0.25em] rounded-md uppercase shadow-[0_0_20px_rgba(203,163,66,0.4)] active:scale-95 transition-transform text-center border-0 cursor-pointer"
            >
              {content.ctaNavbar}
            </button>

          </div>
        </div>
      )}
    </header>
  );
}

