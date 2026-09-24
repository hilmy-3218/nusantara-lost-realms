
import React, { useState } from 'react';
import { Send, Check, Sparkles, Compass, Scroll } from 'lucide-react';

const footerTranslations = {
  IND: {
    tagline: '"Ketika alam kuno terbangun, penjaga terakhir harus bangkit."',
    description:
      'Petualangan aksi open-world yang berlatar di antara kanopi tropis legendaris, puncak perbukitan berkabut, dan megalit kekuasaan yang terlupakan.',
    exploreTitle: 'JELAJAHI ALAM',
    exploreLinks: [
      { label: 'BERANDA', id: 'home' },
      { label: 'PENJAGA', id: 'guardians' },
      { label: 'PETA KUNO', id: 'map' },
      { label: 'MAKHLUK MITOS', id: 'creatures' },
      { label: 'CARA BERMAIN', id: 'systems' },
      { label: 'PEMBARUAN', id: 'updates' },
      { label: 'MAIN SEKARANG', id: 'playnow' }
    ],
    dispatchTitle: 'WARTA PENJAGA',
    dispatchDesc:
      'Ingin tahu lebih lanjut tentang Nusantara: Lost Realm? Hubungi kami untuk mendapatkan informasi seputar dunia, karakter, gameplay, dan perkembangan game.',
    inputPlaceholder: 'Masukkan email keberanianmu...',
    subscribedText:
      'Email Anda telah terpatri dalam Arsip Prasasti Alam.'
  },

  ENG: {
    tagline:
      '"When the ancient realm awakens, the last guardian must rise."',
    description:
      'An open-world action adventure set across mythical tropical canopies, misty jagged ridges, and forgotten sovereign megaliths.',
    exploreTitle: 'EXPLORE REALM',
    exploreLinks: [
      { label: 'HOME', id: 'home' },
      { label: 'GUARDIANS', id: 'guardians' },
      { label: 'ANCIENT MAP', id: 'map' },
      { label: 'MYTHICAL CREATURES', id: 'creatures' },
      { label: 'GAMEPLAY', id: 'systems' },
      { label: 'UPDATES', id: 'updates' },
      { label: 'PLAY NOW', id: 'playnow' }
    ],
    dispatchTitle: 'GUARDIAN DISPATCH',
    dispatchDesc:
      'Want to learn more about Nusantara: Lost Realm? Contact us to discover more about the world, characters, gameplay, and the development of the game.',
    inputPlaceholder: 'Enter your email of valor...',
    subscribedText:
      'You have been inscribed in the Realm Archives.'
  }
};

export default function Footer({
  lang = 'IND',
  scrollToSection
}) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const content =
    footerTranslations[lang] || footerTranslations.IND;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() && email.includes('@')) {
      setIsSubscribed(true);
    }
  };

  // Navigasi tanpa mengubah URL menjadi #section
  const handleNavigation = (id) => {
    if (scrollToSection) {
      scrollToSection(id);
    }
  };

  return (
    <footer className="relative w-full bg-[#020704] text-gray-400 font-serif overflow-hidden pt-16 pb-12 px-6 md:px-16 lg:px-24 border-t border-emerald-900/30">

      {/* Background Atmosphere & Radial Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#c5a059]/60 to-transparent pointer-events-none" />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#c5a059]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-950/20 blur-3xl pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto">

        {/* Main Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">

          {/* Column 1: Brand & Mythos */}
          <div className="md:col-span-5 space-y-5">

            {/* Logo Badge */}
            <div className="flex items-center gap-3.5 group cursor-default">

              <div className="relative w-10 h-10 border border-[#c5a059]/80 flex items-center justify-center bg-[#06140e] shadow-[0_0_15px_rgba(197,160,89,0.15)] group-hover:border-[#e5c178] transition-all duration-300">

                <span className="text-[#c5a059] font-bold text-base tracking-wider group-hover:scale-110 transition-transform">
                  N
                </span>

                {/* Corner accents */}
                <div className="absolute -top-1 -left-1 w-1.5 h-1.5 bg-[#c5a059]" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 bg-[#c5a059]" />

              </div>

              <div>
                <h2 className="text-[#c5a059] font-bold text-xl tracking-[0.25em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  NUSANTARA
                </h2>

                <p className="text-[10px] text-[#a38345] tracking-[0.3em] font-sans font-semibold -mt-1 uppercase">
                  LOST REALM
                </p>
              </div>

            </div>

            {/* Tagline */}
            <p className="italic text-gray-200 text-sm leading-relaxed pl-3 border-l-2 border-[#c5a059]/50">
              {content.tagline}
            </p>

            {/* Description */}
            <p className="text-xs text-gray-400/80 leading-relaxed font-sans max-w-md">
              {content.description}
            </p>

          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 md:pl-4">

            <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">
              <Compass size={14} className="text-[#c5a059]" />

              <h3 className="text-xs font-bold text-gray-200 tracking-[0.25em] uppercase">
                {content.exploreTitle}
              </h3>
            </div>

            <ul className="grid grid-cols-1 gap-2.5 text-xs font-sans tracking-widest">

              {content.exploreLinks.map((item) => (
                <li key={item.label}>

                  <button
                    type="button"
                    onClick={() => handleNavigation(item.id)}
                    className="text-gray-400 hover:text-[#c5a059] hover:translate-x-1 transition-all duration-200 flex items-center gap-1.5 group bg-transparent border-0 p-0 cursor-pointer"
                  >
                    <span className="text-[10px] text-emerald-700 group-hover:text-[#c5a059] transition-colors">
                      ❖
                    </span>

                    {item.label}
                  </button>

                </li>
              ))}

            </ul>
          </div>

          {/* Column 3: Guardian Dispatch / Newsletter */}
          <div className="md:col-span-4 space-y-4">

            <div className="flex items-center gap-2 border-b border-emerald-900/40 pb-2">

              <Sparkles size={14} className="text-[#c5a059]" />

              <h3 className="text-xs font-bold text-gray-200 tracking-[0.25em] uppercase">
                {content.dispatchTitle}
              </h3>

            </div>

            <p className="text-xs text-gray-400/90 font-sans leading-relaxed">
              {content.dispatchDesc}
            </p>

            {/* Interactive Subscription Form */}
            {!isSubscribed ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-2 pt-1"
              >
                <div className="relative group">

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={content.inputPlaceholder}
                    required
                    className="w-full bg-[#040f0a] border border-emerald-900/60 focus:border-[#c5a059] rounded-none px-4 py-2.5 pr-12 text-xs text-gray-100 placeholder-gray-600 focus:outline-none transition-all duration-300 font-sans shadow-inner"
                  />

                  <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#0c2419] border border-emerald-800/80 text-[#c5a059] hover:bg-[#c5a059] hover:text-[#020704] transition-all duration-300 flex items-center justify-center group-hover:shadow-[0_0_10px_rgba(197,160,89,0.3)]"
                  >
                    <Send size={13} className="rotate-45" />
                  </button>

                </div>
              </form>
            ) : (
              <div className="pt-1">

                <div className="relative bg-[#061810] border border-[#c5a059]/60 text-[#c5a059] p-3.5 rounded-none text-xs font-sans flex items-center gap-3 shadow-[0_0_20px_rgba(197,160,89,0.15)] animate-fade-in">

                  <div className="p-1 bg-[#c5a059]/10 border border-[#c5a059]/40 rounded-full shrink-0">
                    <Check size={14} className="text-[#c5a059]" />
                  </div>

                  <span className="font-semibold leading-tight">
                    {content.subscribedText}
                  </span>

                </div>

              </div>
            )}

          </div>

        </div>

        {/* Divider with Emblem Icon */}
        <div className="relative flex items-center justify-center py-4">

          <div className="w-full border-t border-emerald-950/80" />

          <div className="absolute bg-[#020704] px-4 text-[#c5a059]/40 text-xs">
            <Scroll size={14} />
          </div>

        </div>

      </div>
    </footer>
  );
}

