import React, { useState, useRef, useEffect } from 'react';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import HeroGate from './pages/HeroGate';
import LoreThreshold from './pages/LoreThreshold';
import Maps from './pages/Maps';
import Guardiant from './pages/Guardiant';
import Bestiary from './pages/MythicalBestiary';
import GameSystems from './pages/GameSystems';
import LatestFromRealm from './pages/LatestFromRealm';
import Playnow from './pages/Playnow';
import Footer from './components/Footer';
import musicNusantara from './assets/video&sound/musicAfterGate.mp3';

function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [lang, setLang] = useState('IND');
  const [isMuted, setIsMuted] = useState(true);

  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
    }
  }, []);

  // Scroll ke section tanpa mengubah URL menjadi #section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Handler untuk memutar musik
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      setIsMuted(false);

      audioRef.current
        .play()
        .catch((err) => console.log("Play blocked:", err));
    }
  };

  // Auto-stop musik & reset state jika tab berpindah / ditutup
  useEffect(() => {
    const stopAudio = () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }

      setIsMuted(true);
    };

    const handleVisibilityChange = () => {
      if (document.hidden && audioRef.current) {
        audioRef.current.pause();
        setIsMuted(true);
      }
    };

    window.addEventListener('pagehide', stopAudio);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      stopAudio();
      window.removeEventListener('pagehide', stopAudio);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
  };

  const toggleMute = () => {
    if (audioRef.current) {
      const nextMuteState = !isMuted;

      audioRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);

      if (nextMuteState) {
        audioRef.current.pause();
      } else {
        audioRef.current
          .play()
          .catch((err) => console.log("Play blocked:", err));
      }
    }
  };

  return (
    <div className="bg-[#020704] min-h-screen text-[#c2c9c4]">

      {/* Audio BGM Nusantara dipasang di level teratas */}
      <audio
        ref={audioRef}
        src={musicNusantara}
        loop
        muted={isMuted}
      />

      {!hasEntered ? (
        <Preloader
          onEnter={handleEnter}
          onStartMusic={startMusic}
        />
      ) : (
        <>
          <Navbar
            lang={lang}
            setLang={setLang}
            isMuted={isMuted}
            setIsMuted={toggleMute}
            scrollToSection={scrollToSection}
          />
          <main>
            <HeroGate
              isMuted={isMuted}
              setIsMuted={toggleMute}
              lang={lang}
              scrollToSection={scrollToSection}
            />
            <div id="Lore">
              <LoreThreshold lang={lang} />
            </div>
            <Guardiant lang={lang} />
            <Maps lang={lang} />
            <Bestiary lang={lang} />
            <GameSystems lang={lang} />
            <LatestFromRealm lang={lang} />
            <Playnow lang={lang} />
            <Footer
              lang={lang}
              scrollToSection={scrollToSection}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default App;