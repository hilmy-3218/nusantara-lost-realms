import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import wanatara from '../assets/monsters/wanatara.jpg';
import netrawana from '../assets/monsters/netrawana.jpg';
import wanabeast from '../assets/monsters/wanaBeast.jpg';
import ghorastone from '../assets/monsters/ghoraStone.jpg';
import ruinclaw from '../assets/monsters/ruinclaw.jpg';
import sentinel from '../assets/monsters/arcapuraSentinel.jpg';
import magmarok from '../assets/monsters/magmarok.jpg';
import infernalGaruda from '../assets/monsters/infernalGaruda.jpg';
import ashfang from '../assets/monsters/ashfang.jpg';
import tirtaNaga from '../assets/monsters/tirtaNaga.jpg';
import rawaMaw from '../assets/monsters/rawaMaw.jpg';
import niscalaSiren from '../assets/monsters/niskalaSiren.jpg';
import kalaWraith from '../assets/monsters/kalaWraith.jpg';
import thornMaw from '../assets/monsters/thornMaw.jpg';
import dreadfang from '../assets/monsters/dreadfang.jpg';
import aetherDragon from '../assets/monsters/aetherDragon.jpg';
import rudrakala from '../assets/monsters/rudrakala.jpg';
import galeclaw from '../assets/monsters/galeclaw.jpg';
import royalVantara from '../assets/monsters/royalVantara.jpg';
import ironcladGhora from '../assets/monsters/ironcladGhora.jpg';
import vantaraWraith from '../assets/monsters/vantaraWraith.jpg';
import abyssalGhora from '../assets/monsters/abyssalGhora.jpg';
import ruinKnight from '../assets/monsters/ruinKnight.jpg';
import kingOfCurses from '../assets/monsters/king-of-curses.jpg';

// Data Monster dengan Dukungan Bahasa Indonesia (IND) dan Inggris (ENG)
const CREATURES_DATA = [
  {
    id: 1,
    rating: '4/5',
    image: wanatara,
    IND: {
      name: 'RAKSAWANA',
      subtitle: 'RAKSA PURBA HUTAN RIMBA',
      tag: 'MONSTER',
      detailTag: 'MONSTER • TERRITORIAL',
      description: 'Makhluk bipedal raksasa bertubuh susunan akar rimba tebal dengan dua tangan kekar, dua kaki, dan satu kepala bermata redup.',
      habitat: 'Kedalaman Hutan Rimba Tropis',
      folklore: 'Penduduk lokal meyakini raksasa akar ini adalah penjaga rimba tropis yang telah bertapa selama ratusan tahun.',
      vulnerability: 'Akar di bagian dadanya sedikit merenggang saat melakukan tebasan tangan berat.',
      drops: ['Akar Kayu Besi', 'Esensi Inti Amber', 'Serat Akar Purba']
    },
    ENG: {
      name: 'RAKSAWANA',
      subtitle: 'ANCIENT FOREST COLOSSUS',
      tag: 'BEAST',
      detailTag: 'BEAST • TERRITORIAL',
      description: 'A colossal bipedal monster with a body made of dense jungle roots, featuring two powerful arms, two legs, and a single head.',
      habitat: 'Depths of Tropical Rainforest',
      folklore: 'Local dwellers believe this root giant is a jungle guardian that has meditated for hundreds of years.',
      vulnerability: 'Roots around its chest part slightly during its heavy arm-swipe recovery.',
      drops: ['Ironroot Bark', 'Amber Heart-Essence', 'Primeval Root Fiber']
    }
  },
  {
    id: 2,
    rating: '3/5',
    image: netrawana,
    IND: {
      name: 'NETRAWANA',
      subtitle: 'RAKSA PURBA HUTAN RIMBA',
      tag: 'MONSTER',
      detailTag: 'MONSTER • TERRITORIAL',
      description: 'Makhluk berkaki empat yang merayap di bawah tajuk hutan rimba tropis, dengan belasan mata bersinar di sepanjang kepalanya yang mengawasi tiap sudut kegelapan.',
      habitat: 'Kanopi Hutan Rimba Tropis',
      folklore: 'Para pemburu tua berkisah tentang ribuan tatapan beracun yang mengintai di antara pepohonan rimba. Siapa pun yang menatap mata utamanya akan membeku ketakutan.',
      vulnerability: 'Mata-matanya sensitif terhadap kilatan cahaya terang dan dapat membutakannya sementara.',
      drops: ['Perisai Kayu Besi', 'Mata Kristal Rimba', 'Serat Akar Purba']
    },
    ENG: {
      name: 'NETRAWANA',
      subtitle: 'ANCIENT FOREST COLOSSUS',
      tag: 'BEAST',
      detailTag: 'BEAST • TERRITORIAL',
      description: 'A quadrupedal beast prowling beneath the tropical rainforest canopy, featuring numerous glowing eyes across its head that watch every corner of the dark.',
      habitat: 'Tropical Rainforest Canopy',
      folklore: 'Old hunters tell tales of a thousand venomous stares lurking among the jungle trees. Anyone who locks eyes with its main gaze paralyzes in fear.',
      vulnerability: 'Its multiple eyes are highly sensitive to sudden intense flashes of light, blinding it temporarily.',
      drops: ['Ironbark Carapace', 'Jungle Eye Crystal', 'Primeval Root Fiber']
    }
  },
  {
    id: 3,
    rating: '2/5',
    image: wanabeast,
    IND: {
      name: 'WANABEAST',
      subtitle: 'PEMBURU CEPAT RIMBA TROPIS',
      tag: 'MONSTER',
      detailTag: 'MONSTER • PACK HUNTER',
      description: 'Makhluk bipedal setinggi 1,5 meter dengan dua kaki lincah dan dua tangan bercakar. Tubuhnya ditutupi bulu halus berwarna indah yang membantunya berkamuflase.',
      habitat: 'Hutan Rimba Tropis',
      folklore: 'Dikenal sebagai bayangan rimba yang bergerak sangat cepat. Mereka berburu dalam kelompok cerdik, menyergap mangsa sebelum menyadari keberadaan mereka.',
      vulnerability: 'Daya tahan fisiknya rendah dan mudah goyah jika terkena serangan area (AoE) saat berlari.',
      drops: ['Bulu Rimba Indah', 'Cakar Pemburu Cepat', 'Tendon Pemikat']
    },
    ENG: {
      name: 'WANABEAST',
      subtitle: 'TROPICAL SWIFT HUNTER',
      tag: 'BEAST',
      detailTag: 'BEAST • PACK HUNTER',
      description: 'A 1.5-meter-tall bipedal creature with two nimble legs and two clawed arms. Its body is covered in strikingly beautiful plumage used for camouflage.',
      habitat: 'Tropical Rainforest',
      folklore: 'Known as the jungle fast-shadows. They hunt in clever packs, ambushing prey before their presence is even detected.',
      vulnerability: 'Low physical durability and easily staggered by area-of-effect (AoE) attacks while sprinting.',
      drops: ['Beautiful Jungle Feather', 'Swift Claw', 'Agile Tendon']
    }
  },
  {
    id: 4,
    rating: '4/5',
    image: ghorastone,
    IND: {
      name: 'GHORASTONE',
      subtitle: 'PENJAGA BATU KUNO',
      tag: 'KONSTRUK PURBA',
      detailTag: 'KONSTRUK • DORMANT',
      description: 'Konstruk monolit otonom berukuran besar yang dialiri energi garis ley emas.',
      habitat: 'Reruntuhan Arcapura yang Tenggelam',
      folklore: 'Ditempa oleh pemahat batu kuno untuk melindungi arsip inti, terbangun hanya saat segel purba dirusak.',
      vulnerability: 'Serangan gangguan sihir secara sementara membekukan pemrosesan inti ley-line miliknya.',
      drops: ['Pecahan Monolit', 'Serpihan Ley Emas', 'Kunci Kripto Purba']
    },
    ENG: {
      name: 'GHORASTONE',
      subtitle: 'ANCIENT STONE SENTINEL',
      tag: 'ANCIENT CONSTRUCT',
      detailTag: 'CONSTRUCT • DORMANT',
      description: 'A massive autonomous monolith construct infused with golden ley line energy.',
      habitat: 'Sunken Ruins of Arcapura',
      folklore: 'Forged by long-extinct stone masons to protect core archives, awakening when ancient seals are breached.',
      vulnerability: 'Magic disruption attacks temporarily freeze its ley-line core processing.',
      drops: ['Monolith Fragment', 'Golden Ley-Shard', 'Ancient Cipher Key']
    }
  },
  {
    id: 5,
    rating: '3/5',
    image: ruinclaw,
    IND: {
      name: 'RUINCLAW',
      subtitle: 'REPTIL PENJATUH DINDING',
      tag: 'REPTIL PURBA',
      detailTag: 'REPTIL • PENGINTAI',
      description: 'Reptil raksasa berkaki empat menyerupai kadal dengan kulit tebal bersisik keras bak perisai. Memiliki ekor panjang yang menjuntai dan cakar tajam yang memungkinkannya merayap vertikal di dinding bangunan.',
      habitat: 'Reruntuhan Bangunan Bebatuan Alcapura',
      folklore: 'Makhluk purba yang beradaptasi di antara puing-puing kuil kuno. Ruinclaw bersembunyi di langit-langit reruntuhan dan menyergap mangsa dari atas secara tiba-tiba.',
      vulnerability: 'Kulit lunak di bagian lipatan leher bawahnya terbuka saat ia mendesis untuk melepaskan sabetan ekor.',
      drops: ['Sisik Batu Keras', 'Cakar Merayap', 'Ekor Reptil Purba']
    },
    ENG: {
      name: 'RUINCLAW',
      subtitle: 'WALL-CRAWLING REPTILE',
      tag: 'ANCIENT REPTILE',
      detailTag: 'REPTILE • STALKER',
      description: 'A massive four-legged lizard-like reptile with a thick, armored hide. It features a long trailing tail and sharp claws that allow it to crawl vertically across building walls.',
      habitat: 'Stone Building Ruins of Eldoria',
      folklore: 'An ancient creature adapted to live among ancient temple ruins. Ruinclaw lurks on the ceilings of decay and ambushes unsuspecting prey from above.',
      vulnerability: 'The soft hide under its neck fold is exposed when it hisses before a tail whip attack.',
      drops: ['Hard Rock Scale', 'Climbing Claw', 'Ancient Reptile Tail']
    }
  },
  {
    id: 6,
    rating: '4.5/5',
    image: sentinel,
    IND: {
      name: 'ARCAPURA SENTINEL',
      subtitle: 'KSATRIA IBLIS BERGARDAN SAYAP',
      tag: 'PENJAGA IBLIS',
      detailTag: 'IBLIS • ELITE',
      description: 'Entitas mirip ksatria iblis setinggi 3 meter bertubuh masif dengan sepasang sayap lebar. Menggenggam tombak raksasa di satu tangan dan perisai besi tebal di tangan lainnya untuk menghalau serangan.',
      habitat: 'Reruntuhan Bangunan Arcapura',
      folklore: 'Mantan pelindung takhta Arcapura yang terdistorsi oleh energi kegelapan. Ia berdiri sebagai benteng hidup di tengah reruntuhan, membantai siapa saja yang berani mendekati inti istana.',
      vulnerability: 'Celah di antara perisai dan dada kirinya terbuka sebentar saat ia memposisikan tombak untuk serangan tusukan jarak jauh.',
      drops: ['Baja Hitam Arcapura', 'Ujung Tombak Iblis', 'Kepakan Sayap Kelam']
    },
    ENG: {
      name: 'ARCAPURA SENTINEL',
      subtitle: 'WINGED DEMON KNIGHT',
      tag: 'DEMON GUARDIAN',
      detailTag: 'DEMON • ELITE',
      description: 'A massive 3-meter-tall demon knight entity featuring broad wings. It wields a giant spear in one hand and a thick iron shield in the other to repel incoming attacks.',
      habitat: 'Arcapura Building Ruins',
      folklore: 'A former guardian of the Arcapura throne distorted by dark energies. It stands as a living fortress within the ruins, slaughtering anyone who dares approach the palace core.',
      vulnerability: 'The gap between its shield and left chest is exposed briefly as it winds up for a long-range thrust attack.',
      drops: ['Arcapura Dark Steel', 'Demon Spearhead', 'Shadow Wing Feather']
    }
  },
  {
    id: 7,
    rating: '5/5',
    image: magmarok,
    IND: {
      name: 'MAGMAROK',
      subtitle: 'COLOSSUS LAHAR PURBA',
      tag: 'RUSTIK VULKANIK',
      detailTag: 'ELEMENTAL • BOSS',
      description: 'Raksasa masif berselimut kerak magma membara dengan aliran lahar pijar yang mengalir di celah-celah tubuh batunya. Pukulan tangannya yang membatu mampu melelehkan tanah dan memicu ledakan panas.',
      habitat: 'Reruntuhan Kuno Vulkanik',
      folklore: 'Terlahir dari inti gunung berapi yang meletus ribuan tahun lalu dan menghancurkan peradaban kuno. Ia bersemayam di antara puing-puing bangunan hangus sebagai manifested kemarahan bumi.',
      vulnerability: 'Nukulus kristal lahar di bagian dadanya meredup dan menjadi rapuh beberapa detik setelah ia menghantamkan kedua tangannya ke tanah.',
      drops: ['Esensi Magma Murni', 'Kerak Batuan Vulkanik', 'Inti Api Purba']
    },
    ENG: {
      name: 'MAGMAROK',
      subtitle: 'ANCIENT LAVA COLOSSUS',
      tag: 'VOLCANIC ELEMENTAL',
      detailTag: 'ELEMENTAL • BOSS',
      description: 'A massive giant encased in burning magma crust with glowing lava flowing through its stone body crevices. Its hardened fists melt the ground and trigger explosive heatwaves.',
      habitat: 'Ancient Volcanic Ruins',
      folklore: 'Born from the core of an erupting volcano thousands of years ago that wiped out an ancient civilization. It slumbers among scorched ruins as the physical embodiment of the earth wrath.',
      vulnerability: 'The lava crystal core on its chest dims and becomes brittle for a few seconds right after slamming both fists into the ground.',
      drops: ['Pure Magma Essence', 'Volcanic Rock Crust', 'Ancient Fire Core']
    }
  },
  {
    id: 8,
    rating: '4/5',
    image: infernalGaruda,
    IND: {
      name: 'INFERNAL GARUDA',
      subtitle: 'RAJA UNGGAS API VULKANIK',
      tag: 'UNGGAS PURBA',
      detailTag: 'ELEMENTAL • MYTHIC',
      description: 'Bentuk terdistorsi dari burung mitologis agung. Memiliki bentang sayap masif bertutupkan bulu-bulu magma membara, paruh tajam penyembur api, dan cakar berapi yang mampu meremukkan struktur batu tebal.',
      habitat: 'Reruntuhan Kuno Vulkanik',
      folklore: 'Unggas keramat penjaga langit kuno yang jatuh ke dalam kawah vulkanik dan terlahir kembali dalam api abadi. Ia kini bersarang di puncak tertinggi reruntuhan vulkanik, memangsa siapa saja yang melintasi wilayah udaranya.',
      vulnerability: 'Pangkal bulu utama di bilah sayapnya kehilangan perisai api saat ia mengepakkan sayap untuk menciptakan badai angin panas.',
      drops: ['Bulu Garuda Membara', 'Paruh Magma Kuno', 'Kristal Api Infernal']
    },
    ENG: {
      name: 'INFERNAL GARUDA',
      subtitle: 'VOLCANIC AVIAN KING',
      tag: 'ANCIENT AVIAN',
      detailTag: 'ELEMENTAL • MYTHIC',
      description: 'A corrupted form of the legendary mythical bird. Features a massive wingspan covered in burning magma feathers, a fire-breathing sharp beak, and fiery talons capable of crushing thick stone structures.',
      habitat: 'Ancient Volcanic Ruins',
      folklore: 'A sacred sky guardian of old that fell into a volcanic crater and was reborn in eternal flame. It now nests atop the highest volcanic ruins, preying on anything that crosses its airspace.',
      vulnerability: 'The base of its primary wing feathers loses its fiery aura when flapping hard to generate a scorching windstorm.',
      drops: ['Smoldering Garuda Feather', 'Ancient Magma Beak', 'Infernal Fire Crystal']
    }
  },
  {
    id: 9,
    rating: '4.5/5',
    image: ashfang,
    IND: {
      name: 'ASHFANG',
      subtitle: 'PREDATOR NAGA BERSISIK BUMI',
      tag: 'REPTIL VULKANIK',
      detailTag: 'DRAKONID • ELITE',
      description: 'Bipedal mengerikan berkepala naga dengan dua kaki kokoh dan dua lengan berotot. Lengan bawahnya dilengkapi cakar-cakar memanjang yang sanggup merobek baja tebal dan mencabik batu vulkanik.',
      habitat: 'Reruntuhan Kuno Vulkanik',
      folklore: 'Keturunan ras reptil purba yang bertahan hidup di lingkungan ekstrem berhawa panas. Usfang berburu di antara reruntuhan vulkanik, memanfaatkan ketangkasan berdiri dan cakar tajamnya untuk menyergap mangsa.',
      vulnerability: 'Bagian bawah lehernya tidak terlindungi sisik tebal ketika ia mendongak sebelum melakukan tebasan cakar beruntun.',
      drops: ['Cakar Naga Vulkanik', 'Sisik Naga Hangus', 'Taring Usfang Tajam']
    },
    ENG: {
      name: 'ASHFANG',
      subtitle: 'VOLCANIC DRACONID STALKER',
      tag: 'VOLCANIC REPTILE',
      detailTag: 'DRACONID • ELITE',
      description: 'A terrifying bipedal creature with a dragon head, supported by two sturdy hind legs and two muscular arms. Its hands feature elongated, razor-sharp claws capable of tearing through thick steel and volcanic rock.',
      habitat: 'Ancient Volcanic Ruins',
      folklore: 'A descendant of an ancient reptile race that survived in extreme heat environments. Usfang hunts among the volcanic ruins, using its upright posture and lethal claws to ambush prey.',
      vulnerability: 'The underside of its neck lacks heavy scaling, exposed when leaning back right before a sequence of claw swipes.',
      drops: ['Volcanic Dragon Claw', 'Scorched Dragon Scale', 'Sharp Usfang Fang']
    }
  },
  {
    id: 10,
    rating: '5/5',
    image: tirtaNaga,
    IND: {
      name: 'NAGA TIRTA',
      subtitle: 'PENJAGA DANAU MISTIS',
      tag: 'NAGA AIR PURBA',
      detailTag: 'NAGA • MYTHIC',
      description: 'Naga serpentin anggun bersisik kebiruan yang menyala redup. Tubuhnya meliuk di air danau yang memancarkan bioluminesensi biru samar, dikelilingi kabut tebal dan reruntuhan kuil kuno penyimpan rahasia dunia lain.',
      habitat: 'Danau Mistis Reruntuhan Hutan Berkabut',
      folklore: 'Wujud manifestasi energi mistis air danau purba. Naga Tirta menjaga gerbang dunia gaib yang tersembunyi di dasar reruntuhan, menyelimuti wilayahnya dengan kabut penyesat bagi siapa pun yang bermaksud jahat.',
      vulnerability: 'Permata luminesensi di dahi atas kepalanya memudar cahayanya dan menjadi rapuh tepat setelah ia menyemburkan gelombang meriam air mistis.',
      drops: ['Sisik Tirta Berbintang', 'Kristal Air Mistis', 'Esensi Esensial Danau Purba']
    },
    ENG: {
      name: 'NAGA TIRTA',
      subtitle: 'GUARDIAN OF THE MYSTIC LAKE',
      tag: 'ANCIENT WATER DRAGON',
      detailTag: 'DRAGON • MYTHIC',
      description: 'A graceful serpentine dragon covered in faintly glowing bluish scales. It slithers through a bioluminescent misty lake surrounding ancient temple ruins that hold secrets of another realm.',
      habitat: 'Mystic Lake of Mist-Covered Ruins',
      folklore: 'The physical manifestation of the ancient lake\'s mystical energies. Naga Tirta guards the gateway to the otherworldly realm hidden beneath the ruins, veiling its territory in disorienting mist.',
      vulnerability: 'The luminescent gem on its forehead dims and becomes vulnerable right after channeling a mystic water beam attack.',
      drops: ['Starlight Tirta Scale', 'Mystic Water Crystal', 'Ancient Lake Essence']
    }
  },
    {
    id: 11,
    rating: '4.5/5',
    image: rawaMaw,
    IND: {
      name: 'RAWA MAW',
      subtitle: 'PREDATOR SERPENTIN BRUTAL',
      tag: 'AMFIBI PURBA',
      detailTag: 'REPTIL • PENGINTAI',
      description: 'Monster menyerupai ular raksasa dengan sepasang lengan berotot bertangan cakar tajam. Rahangnya melebar ekstrem memperlihatkan deretan gigi taring melengkung yang sanggup meremukkan mangsa seketika.',
      habitat: 'Danau Mistis Reruntuhan Hutan Berkabut',
      folklore: 'Penghuni dasar rawa danau bercahaya biru yang bersembunyi di balik tebalnya kabut hutan. Rawa Maw memanfaatkan reruntuhan kuno sebagai tempat menjebak penjelajah yang terpesona oleh rahasia gaib danau.',
      vulnerability: 'Kantung selaput di bawah rahang bawahnya membesar dan tidak terlindungi saat ia membuka mulut lebar-lebar sebelum menerkam.',
      drops: ['Taring Rawa Maw', 'Cakar Amfibi Berkabut', 'Lendir Danau Mistik']
    },
    ENG: {
      name: 'RAWA MAW',
      subtitle: 'BRUTAL SERPENTINE PREDATOR',
      tag: 'ANCIENT AMPHIBIAN',
      detailTag: 'REPTILE • STALKER',
      description: 'A giant snake-like monster equipped with a pair of muscular arms and sharp clawed hands. Its jaws unhinge extremely wide to reveal rows of curved, razor-sharp teeth that crush prey instantly.',
      habitat: 'Mystic Lake of Mist-Covered Ruins',
      folklore: 'A dweller of the glowing blue lake bed lurking behind the dense forest mist. Rawa Maw utilizes the ancient ruins to trap explorers lured in by the lake\'s otherworldly secrets.',
      vulnerability: 'The membrane pouch beneath its lower jaw expands and remains unprotected right when unhinging its mouth before a pounce attack.',
      drops: ['Rawa Maw Fang', 'Misty Amphibian Claw', 'Mystic Lake Slime']
    }
  },
  {
    id: 12,
    rating: '4/5',
    image: niscalaSiren,
    IND: {
      name: 'NISCALA SIREN',
      subtitle: 'PENYESAT ILUSI DANAU MISTIS',
      tag: 'ENTITAS MISTIS',
      detailTag: 'HUMANOID • ILUSIONIS',
      description: 'Entitas anggun menyerupai sosok wanita dengan aura pendar biru samar. Memiliki kemampuan memproyeksikan ilusi visual dan suara yang menipu mata serta pikiran penjelajah di tengah danau berkabut.',
      habitat: 'Danau Mistis Reruntuhan Hutan Berkabut',
      folklore: 'Penghuni abadi reruntuhan kuno yang dipercaya menyimpan rahasia dunia lain. Niscala Siren memancing korbannya dengan wujud wanita jelita sebelum menyeret mereka ke dalam kegelapan air danau.',
      vulnerability: 'Inti energi ilusi di dadanya berpijar terang dan kehilangan perlindungan gaib saat ia memfokuskan sihir penipu mata secara penuh.',
      drops: ['Esensi Ilusi Niscala', 'Kristal Cahaya Biru', 'Suara Bisikan Mistik']
    },
    ENG: {
      name: 'NISCALA SIREN',
      subtitle: 'MYSTIC LAKE ILLUSIONIST',
      tag: 'MYTHIC ENTITY',
      detailTag: 'HUMANOID • ILLUSIONIST',
      description: 'A graceful entity resembling a human female with a faint blue glow. She possesses the power to cast visual and auditory illusions, deceiving the eyes and minds of wanderers in the foggy lake.',
      habitat: 'Mystic Lake of Mist-Covered Ruins',
      folklore: 'An eternal inhabitant of the ancient ruins guarding otherworldly secrets. Niscala Siren lures her victims with the appearance of a beautiful maiden before dragging them into the depths of the lake.',
      vulnerability: 'The illusion core in her chest glows brightly and loses its magical protection while she is fully channeling a visual deception spell.',
      drops: ['Niscala Illusion Essence', 'Blue Light Crystal', 'Mystic Whisper Voice']
    }
  },
  {
    id: 13,
    rating: '3.5/5',
    image: kalaWraith,
    IND: {
      name: 'KALA WRAITH',
      subtitle: 'BAYANGAN TERKUTUK HUTAN PURBA',
      tag: 'ROH TERKUTUK',
      detailTag: 'UNDEAD • PENGINTAI',
      description: 'Entitas menyerupai manusia yang melayang tanpa kaki, diselimuti aura pekat berwarna hitam dan ungu. Memiliki jemari dengan cakar tajam mematikan yang sanggup merobek jiwa dan raga mangsanya.',
      habitat: 'Hutan Purba Terkontaminasi Kutukan',
      folklore: 'Manifestasi dari kegelapan yang lahir akibat pencemaran energi kutukan di hutan purba. Kala Wraith melayang di antara pepohonan menghitam dan kabut pekat, memburu siapa saja yang tersesat di jalur lama.',
      vulnerability: 'Aura ungu yang melindunginya terkoyak sementara waktu tepat setelah ia melakukan serangan tebasan cakar cepat.',
      drops: ['Esensi Aura Ungu', 'Cakar Roh Terkutuk', 'Serpihan Jiwa Kelam']
    },
    ENG: {
      name: 'KALA WRAITH',
      subtitle: 'CURSED SHADOW OF THE ANCIENT FOREST',
      tag: 'CURSED SPIRIT',
      detailTag: 'UNDEAD • STALKER',
      description: 'A legless floating human-like entity shrouded in a dense black and purple aura. It wields lethal sharp claws on its hands capable of tearing through both soul and flesh.',
      habitat: 'Cursed Ancient Forest',
      folklore: 'A manifestation of darkness born from the corruption of ancient forest energies. Kala Wraith hovers among blackened trees and thick fog, hunting anyone lost along the forgotten trails.',
      vulnerability: 'The purple aura protecting it temporarily fractures right after executing a rapid claw swipe attack.',
      drops: ['Purple Aura Essence', 'Cursed Spirit Claw', 'Dark Soul Shard']
    }
  },
  {
    id: 14,
    rating: '3/5',
    image: thornMaw,
    IND: {
      name: 'THORNMAW',
      subtitle: 'KERA BERDURI TERKUTUK',
      tag: 'BINATANG PURBA',
      detailTag: 'BEAST • TERKONTAMINASI',
      description: 'Monster bertubuh masif menyerupai kera yang bergerak merangkak di tanah. Seluruh tubuhnya dilapisi sisik tebal mencuat dengan duri-duri tajam beracun yang mampu menembus perisai keras.',
      habitat: 'Hutan Purba Terkontaminasi Kutukan',
      folklore: 'Primata purba yang bermutasi akibat menghirup energi kutukan hutan. Thornmaw mendiami pepohonan menghitam dan menyergap penjelajah dari balik kabut pekat dengan hantaman tubuh berduri.',
      vulnerability: 'Perut bawahnya yang berlapis sisik lebih tipis terbuka ketika ia berdiri dengan dua kaki belakang untuk meraung.',
      drops: ['Duri Sisik Thornmaw', 'Cakar Kera Terkutuk', 'Darah Terkontaminasi']
    },
    ENG: {
      name: 'THORNMAW',
      subtitle: 'CURSED THORNY APE',
      tag: 'ANCIENT BEAST',
      detailTag: 'BEAST • CORRUPTED',
      description: 'A massive ape-like monster that prowls low on the ground. Its entire body is covered in thick scales sprouting razor-sharp poisonous thorns capable of piercing heavy armor.',
      habitat: 'Cursed Ancient Forest',
      folklore: 'An ancient primate mutated by the corrupting energies of the primal forest. Thornmaw inhabits the blackened woods, ambushing travelers from the thick fog with spiky body slams.',
      vulnerability: 'Its underbelly has thinner scales and is exposed when it rears up on its hind legs to roar.',
      drops: ['Thornmaw Scale Spike', 'Cursed Ape Claw', 'Corrupted Blood']
    }
  },
  {
    id: 15,
    rating: '3/5',
    image: dreadfang,
    IND: {
      name: 'DREADFANG',
      subtitle: 'SERIGALA PURBA BERMATA ENAM',
      tag: 'BINATANG TERKUTUK',
      detailTag: 'BEAST • PENGINTAI',
      description: 'Serigala buas berukuran masif dengan enam mata menyala di kepalanya. Memiliki taring tajam yang meneteskan racun pekat dan pergerakan sangat lincah di tengah kegelapan hutan.',
      habitat: 'Hutan Purba Terkontaminasi Kutukan',
      folklore: 'Pemimpin kawanan pemangsa yang terdistorsi oleh aura negatif hutan purba. Keenam matanya mampu menembus kabut pekat dan melacak aura kehidupan mangsanya dari jarak jauh.',
      vulnerability: 'Pandangannya terdistraksi sejenak saat tiga pasang matanya terkena kilatan cahaya terang secara mendadak.',
      drops: ['Mata Serigala Terkutuk', 'Taring Dreadfang Beracun', 'Bulu Serigala Kelam']
    },
    ENG: {
      name: 'DREADFANG',
      subtitle: 'SIX-EYED CURSED WOLF',
      tag: 'CURSED BEAST',
      detailTag: 'BEAST • STALKER',
      description: 'A massive feral wolf featuring six glowing eyes on its head. It possesses razor-sharp fangs dripping with potent poison and exhibits extreme agility within the forest darkness.',
      habitat: 'Cursed Ancient Forest',
      folklore: 'The pack leader distorted by the dark energies of the ancient forest. Its six eyes can pierce through dense fog, tracking the life essence of its prey from great distances.',
      vulnerability: 'Its vision is momentarily disoriented when all three pairs of eyes are exposed to a sudden flash of bright light.',
      drops: ['Cursed Wolf Eye', 'Poisonous Dreadfang Fang', 'Dark Wolf Pelt']
    }
  },
  {
    id: 16,
    rating: '5/5',
    image: aetherDragon,
    IND: {
      name: 'AETHER DRAGON',
      subtitle: 'NAGA AGUNG PUNCAK LANGIT',
      tag: 'NAGA SKYWARD',
      detailTag: 'DRAGON • MYTHIC',
      description: 'Naga celestial masif yang diselimuti pancaran aura cahaya kombinasi biru dan kuning emas membara. Mengepakkan sayap megah yang mampu membelah awan dan mengendalikan energi atmosfer puncak pegunungan.',
      habitat: 'Pegunungan Raksasa Di Atas Awan',
      folklore: 'Penguasa tertinggi yang bersemayam di reruntuhan benteng puncak pegunungan. Dipuja dalam legenda sebagai pelindung gerbang langit yang mengawasi tebing-tebing terjal dari ancaman bawah.',
      vulnerability: 'Inti energi surya di dadanya terbuka saat ia mendongak memfokuskan semburan nafas cahaya Aether.',
      drops: ['Sisik Cahaya Aether', 'Kristal Aurum Biru', 'Tanduk Naga Langit']
    },
    ENG: {
      name: 'AETHER DRAGON',
      subtitle: 'SOVEREIGN OF THE CELESTIAL PEAKS',
      tag: 'SKYWARD DRAGON',
      detailTag: 'DRAGON • MYTHIC',
      description: 'A massive celestial dragon radiating a glowing aura of vibrant blue and golden yellow. Its majestic wings slice through clouds while commanding the atmospheric energies of the mountain peaks.',
      habitat: 'Skyward Mountain Ranges Above Clouds',
      folklore: 'The supreme ruler inhabiting the fortress ruins atop the highest peak. Reverted in legends as the celestial gatekeeper who watches over the sheer cliffs from threats below.',
      vulnerability: 'The solar energy core on its chest is exposed when rearing back to channel its Aether light breath attack.',
      drops: ['Aether Light Scale', 'Blue-Aurum Crystal', 'Celestial Dragon Horn']
    }
  },
  {
    id: 17,
    rating: '4.5/5',
    image: rudrakala,
    IND: {
      name: 'RUDRAKALA',
      subtitle: 'NAGA PEMBAKAR ANGIN PEGUNUNGAN',
      tag: 'DRAKONID LANGIT',
      detailTag: 'DRAGON • ELITE',
      description: 'Naga predator berkaki empat dengan postur tubuh yang kekar dan ekor panjang penyeimbang terbang. Mampu menyemburkan kobaran api vulkanik yang membakar tebing-tebing batu saat meluncur deras di antara awan.',
      habitat: 'Pegunungan Raksasa Di Atas Awan',
      folklore: 'Predator ganas yang bersarang di reruntuhan benteng puncak pegunungan. Rudrakala memanfaatkan angin kencang di jembatan batu kuno untuk menyergap mangsanya sebelum membakarnya dari udara.',
      vulnerability: 'Kantung udara pemantik api di leher bagian bawahnya membesar dan menjadi rapuh saat ia bersiap menghembuskan nafas api.',
      drops: ['Sisik Angin Rudrakala', 'Taring Api Pegunungan', 'Cakar Naga Kuno']
    },
    ENG: {
      name: 'RUDRAKALA',
      subtitle: 'MOUNTAIN FLAME DRAKE',
      tag: 'SKYWARD DRACONID',
      detailTag: 'DRAGON • ELITE',
      description: 'A four-legged predator drake featuring a sturdy frame and a long trailing tail for flight stability. It breathes devastating torrents of flame that scorch stone cliffs while swooping through the clouds.',
      habitat: 'Skyward Mountain Ranges Above Clouds',
      folklore: 'A fierce predator nesting within the fortress ruins atop the peaks. Rudrakala leverages strong mountain winds around ancient stone bridges to ambush prey before incinerating them from above.',
      vulnerability: 'The fire igniter sac beneath its lower neck expands and becomes vulnerable right before releasing its flame breath.',
      drops: ['Rudrakala Wind Scale', 'Mountain Flame Fang', 'Ancient Drake Claw']
    }
  },
  {
    id: 18,
    rating: '3/5',
    image: galeclaw,
    IND: {
      name: 'GALECLAW',
      subtitle: 'PEMBURU KELOMPOK PUNCAK AWAN',
      tag: 'UNGGAS TERKUTUK',
      detailTag: 'HUMANOID • PACK PREDATOR',
      description: 'Makhluk teritorial bipedal berkaki dua dengan sepasang sayap lebar yang memungkinkannya manuver cepat di tebing terjal. Berburu secara berkelompok, menggepung mangsa dari berbagai sudut ketinggian.',
      habitat: 'Pegunungan Raksasa Di Atas Awan',
      folklore: 'Ksatria langit yang terkoyak oleh kemurkaan purba dan bertransformasi menjadi binatang buas. Galeclaw mendiami jembatan batu kuno dan benteng puncak, membantai penyusup secara serentak bersama kawanannya.',
      vulnerability: 'Keseimbangan terbangnya terganggu drastis jika membran tipis di pangkal sayap utamanya terkena serangan saat hinggap.',
      drops: ['Kepakan Sayap Galeclaw', 'Cakar Ksatria Terdistorsi', 'Kristal Angin Puncak']
    },
    ENG: {
      name: 'GALECLAW',
      subtitle: 'PEAK SWARM HUNTER',
      tag: 'SKYWARD BEAST',
      detailTag: 'HUMANOID • PACK PREDATOR',
      description: 'A two-legged bipedal territorial creature with broad wings that allow rapid maneuverability across sheer cliffs. Hunts in coordinated packs, surrounding prey from multiple aerial angles.',
      habitat: 'Skyward Mountain Ranges Above Clouds',
      folklore: 'Former sky knights distorted by ancient rage into feral beasts. Galeclaw inhabit ancient stone bridges and peak fortresses, ambushing intruders en masse alongside their pack.',
      vulnerability: 'Its flight balance is severely disrupted if the thin membrane at the base of its primary wing is struck while perching.',
      drops: ['Galeclaw Wing Feather', 'Distorted Knight Claw', 'Peak Wind Crystal']
    }
  },
  {
    id: 19,
    rating: '5/5',
    image: royalVantara,
    IND: {
      name: 'ROYAL VANTARA',
      subtitle: 'RAJA TERKUTUK VANTARA',
      tag: 'RAJA UNDEAD',
      detailTag: 'UNDEAD • BOSS',
      description: 'Entitas raja undead berketinggian masif yang mengenakan jubah kebesaran robek dan mahkota lapuk. Memegang pedang kerajaan raksasa berkarat yang diselimuti kabut jiwa kegelapan untuk menghancurkan penyusup tahta.',
      habitat: 'Reruntuhan Kerajaan Agung Vantara',
      folklore: 'Mantan penguasa agung Vantara yang jatuh bersama kerajaannya setelah kemunculan Raja Kutukan. Jiwa dan raganya terikat abadi pada singgasana yang hancur, menjadi bayangan kelam dari kejayaan masa lalunya.',
      vulnerability: 'Inti jiwa terkutuk di bagian dada armor kerajaannya retak dan terbuka beberapa detik setelah ia menghantamkan pedang besarnya ke tanah.',
      drops: ['Mahkota Lapuk Vantara', 'Serpihan Pedang Kerajaan', 'Esensi Jiwa Terkutuk']
    },
    ENG: {
      name: 'ROYAL VANTARA',
      subtitle: 'CURSED KING OF VANTARA',
      tag: 'UNDEAD MONARCH',
      detailTag: 'UNDEAD • BOSS',
      description: 'A towering undead monarch wearing tattered royal robes and a weathered crown. Wields a massive rusted royal broadsword imbued with dark soul mist to crush anyone trespassing on his throne.',
      habitat: 'Ruins of the Fallen Vantara Kingdom',
      folklore: 'The former supreme ruler of Vantara who fell alongside his realm upon the arrival of the Curse King. His body and soul remain eternally bound to the shattered throne, a dark remnant of past glory.',
      vulnerability: 'The cursed soul core within his chest armor cracks open for a few seconds right after a heavy downward sword slam.',
      drops: ['Tarnished Vantara Crown', 'Royal Sword Shard', 'Cursed Sovereign Essence']
    }
  },
  {
    id: 20,
    rating: '4.5/5',
    image: ironcladGhora,
    IND: {
      name: 'IRONCLAD GHORA',
      subtitle: 'KSATRIA ZIRAH TERKUTUK',
      tag: 'PRAJORIT UNDEAD',
      detailTag: 'UNDEAD • ELITE',
      description: 'Prajurit ksatria masif berselimut zirah besi pelindung penuh yang telah menghitam dan berkarat. Membawa gada besi raksasa yang dialiri aura kegelapan, melangkah berat membanting apa saja di hadapannya.',
      habitat: 'Reruntuhan Kerajaan Agung Vantara',
      folklore: 'Mantan garda depan benteng kerajaan Vantara yang bersumpah setia membela kerajaan hingga titik darah terakhir. Ketika Raja Kutukan menghancurkan Vantara, jiwa Ksatria Ghora terperangkap di dalam zirahnya sebagai undead abadi.',
      vulnerability: 'Celah zirah terbuka di bagian selangkangan dan belakang lututnya saat ia mengayunkan gada besarnya secara horizontal.',
      drops: ['Baja Karat Vantara', 'Serpihan Gateda Besi', 'Inti Zirah Ksatria']
    },
    ENG: {
      name: 'IRONCLAD GHORA',
      subtitle: 'CURSED ARMORED KNIGHT',
      tag: 'UNDEAD WARRIOR',
      detailTag: 'UNDEAD • ELITE',
      description: 'A massive knight clad in full heavy armor that has blackened and rusted over centuries. Wields a colossal iron mace infused with dark aura, marching forward to crush everything in its path.',
      habitat: 'Ruins of the Fallen Vantara Kingdom',
      folklore: 'Former vanguard elite of the Vantara fortress who swore to defend the kingdom to the death. When the Curse King destroyed Vantara, Ghora\'s soul was trapped within his armor as an eternal undead.',
      vulnerability: 'The armor joints behind its knees and waist are exposed when executing a heavy horizontal mace swing.',
      drops: ['Rusted Vantara Steel', 'Iron Mace Shard', 'Knight Armor Core']
    }
  },
  {
    id: 21,
    rating: '4.5/5',
    image: vantaraWraith,
    IND: {
      name: 'VANTARA WRAITH',
      subtitle: 'PENSIHIR HITAM PENGLIMAN UNDEAD',
      tag: 'PENSIHIR UNDEAD',
      detailTag: 'UNDEAD • SUMMONER',
      description: 'Sosok melayang bertubuh kerangka berselimut jubah sihir kerajaan yang terkoyak. Menggenggam tongkat bertatahkan kristal hitam untuk melantunkan mantra nekromansi dan memanggil barisan prajurit undead dari balik tanah reruntuhan.',
      habitat: 'Reruntuhan Kerajaan Agung Vantara',
      folklore: 'Mantan penasihat dan penyihir agung istana Vantara yang jatuh dalam godaan ilmu hitam saat pertempuran melawan Raja Kutukan. Kini ia berkeliaran di aula benteng, membangkitkan mantan prajuritnya untuk melayani kegelapan.',
      vulnerability: 'Kristal pemanggil di ujung tongkatnya meredup dan rentan hancur saat ia sedang memfokuskan sihir ritual panggil prajurit.',
      drops: ['Kristal Nekromansi Vantara', 'Serpihan Tongkat Sihir', 'Kain Jubah Terkutuk']
    },
    ENG: {
      name: 'VANTARA WRAITH',
      subtitle: 'UNDEAD NECROMANCER SORCERER',
      tag: 'UNDEAD SPELLCASTER',
      detailTag: 'UNDEAD • SUMMONER',
      description: 'A floating skeletal figure draped in tattered royal sorcerer robes. It wields a staff embedded with a dark crystal to cast necromantic spells and summon waves of undead warriors from the ruined grounds.',
      habitat: 'Ruins of the Fallen Vantara Kingdom',
      folklore: 'The former grand sorcerer of the Vantara court who succumbed to dark arts during the clash against the Curse King. It now haunts the castle halls, reanimating fallen soldiers to serve the darkness.',
      vulnerability: 'The summoning crystal atop its staff dims and becomes fragile while actively channeling a minion summoning ritual.',
      drops: ['Vantara Necromancy Crystal', 'Sorcerer Staff Shard', 'Cursed Robe Fragment']
    }
  },
  {
    id: 22,
    rating: '5/5',
    image: ruinKnight,
    IND: {
      name: 'RUIN KNIGHT',
      subtitle: 'TANGAN KANAN RAJA KUTUKAN',
      tag: 'KSATRIA GORAP',
      detailTag: 'UNDEAD • COMMANDER',
      description: 'Prajurit tinggi masif berselimut zirah kelam yang memancarkan aura membara berwarna hitam dan ungu pekat saat bertarung. Mengayunkan pedang besar berinti sihir kegelapan untuk membelah siapa saja yang mengusik benteng utama.',
      habitat: 'Benteng Terakhir Jantung Terkutuk',
      folklore: 'Orang kepercayaan utama sekaligus komandan tertinggi pasokan Raja Kutukan. Selama berabad-abad, Ruin Knight berdiri kokoh menjaga lorong-lorong utama benteng dari sisa-sisa pejuang yang mencoba menantang sang penguasa kegelapan.',
      vulnerability: 'Aura perlindungan hitam-ungunya menghilang sejenak di area dada tepat setelah ia mengeksekusi kombos tebasan pedang bertubi-tubi.',
      drops: ['Baja Kegelapan Benteng', 'Esensi Aura Hitam-Ungu', 'Segel Tangan Kanan Raja']
    },
    ENG: {
      name: 'RUIN KNIGHT',
      subtitle: 'RIGHT HAND OF THE CURSE KING',
      tag: 'DARK COMMANDER',
      detailTag: 'UNDEAD • COMMANDER',
      description: 'A massive knight in pitch-black armor radiating a fierce black and purple aura during combat. Wields a colossal broadsword embedded with dark magic to execute anyone breaching the inner fortress.',
      habitat: 'The Last Citadel of the Cursed Core',
      folklore: 'The most trusted confidant and supreme commander of the Curse King. For centuries, Ruin Knight has stood guard over the ancient halls, crushing any warrior seeking to challenge the dark sovereign.',
      vulnerability: 'Its black-and-purple protective aura fades briefly on its chest plate right after completing a multi-hit heavy sword combo.',
      drops: ['Citadel Dark Steel', 'Black-Purple Aura Essence', 'Right-Hand Sovereign Seal']
    }
  },
  {
    id: 23,
    rating: '5/5',
    image: abyssalGhora,
    IND: {
      name: 'ABYSSAL GHORA',
      subtitle: 'ENFORCER SETIA RAJA KUTUKAN',
      tag: 'KSATRIA KELAM',
      detailTag: 'UNDEAD • ELITE',
      description: 'Entitas pengawal bertubuh tinggi besar yang memancarkan hawa dingin kegelapan. Menggenggam pedang kutukan berukir runa kelam yang sanggup mengikis daya tahan tubuh dan jiwa lawan setiap kali menebas.',
      habitat: 'Benteng Terakhir Jantung Terkutuk',
      folklore: 'Ksatria paling setia yang menyerahkan raga dan jiwanya kepada kegelapan demi mengabdi pada Raja Kutukan. Ia berpatroli di lorong-lorong tergelap benteng, membantai siapapun yang mencoba meruntuhkan kekuasaan tuannya.',
      vulnerability: 'Runa kutukan pada bilah pedangnya meredup seketika setelah menyerang, membuat pertahanan lengannya terbuka selama beberapa detik.',
      drops: ['Bilah Pedang Terkutuk', 'Batu Runa Abyssal', 'Zirah Karat Jantung Kelam']
    },
    ENG: {
      name: 'ABYSSAL GHORA',
      subtitle: 'LOYAL ENFORCER OF THE CURSE KING',
      tag: 'DARK KNIGHT',
      detailTag: 'UNDEAD • ELITE',
      description: 'A imposing guard entity emanating a chilling aura of darkness. It wields a cursed sword engraved with dark runes capable of draining both physical stamina and soul energy upon impact.',
      habitat: 'The Last Citadel of the Cursed Core',
      folklore: 'A fiercely loyal knight who surrendered his flesh and soul to the abyss to serve the Curse King. He patrols the deepest corridors of the citadel, executing anyone threatening his master\'s centuries-old rule.',
      vulnerability: 'The dark runes on its blade dim immediately after an attack, leaving its sword-arm defense exposed for a brief window.',
      drops: ['Cursed Sword Blade', 'Abyssal Rune Stone', 'Corrupted Heartguard Steel']
    }
  },
  {
    id: 24,
    rating: '5/5',
    image: kingOfCurses,
    IND: {
      name: 'KING OF CURSES',
      subtitle: 'PENGUASA KEGELAPAN NUSANTARA',
      tag: 'RAJA KUTUKAN',
      detailTag: 'ABYSSAL • FINAL BOSS',
      description: 'Raja penguasa absolut berpostur mahabesar dengan zirah kegelapan agung yang diselimuti kabut kelam abadi. Memiliki sihir ilusi bayangan yang memungkinkannya berpindah tempat seketika melalui kegelapan untuk mengejutkan lawan.',
      habitat: 'Benteng Terakhir Jantung Terkutuk',
      folklore: 'Sumber utama dari segala penyakit dan energi terdistorsi yang menghancurkan kerajaan agung Nusantara Lost Realms. Selama berabad-abad, ia bertakhta di pusat benteng terkutuk, mengendalikan seluruh entitas kelam di bawah kekuasaannya.',
      vulnerability: 'Sesaat setelah melakukan teleportasi bayangan, wujud fisiknya mengalami jeda stabilisasi energi yang membuat pertahanannya melunak selama beberapa detik.',
      drops: ['Mahkota Kelam Raja Kutukan', 'Esensi Bayangan Purba', 'Inti Kegelapan Nusantara']
    },
    ENG: {
      name: 'KING OF CURSES',
      subtitle: 'SUPREME SOVEREIGN OF DARKNESS',
      tag: 'CURSE MONARCH',
      detailTag: 'ABYSSAL • FINAL BOSS',
      description: 'The supreme ruler encased in majestic shadow-imbued armor, enveloped by an eternal dark mist. He possesses shadow-blinking magic, allowing him to teleport instantaneously through shadows to strike unsuspecting foes.',
      habitat: 'The Last Citadel of the Cursed Core',
      folklore: 'The ultimate source of all corruption that brought down the grand realms of Nusantara. For centuries, he has reigned from the heart of the last citadel, commanding every cursed entity across the lands.',
      vulnerability: 'Immediately after performing a shadow teleportation, his physical form undergoes an energy stabilization delay, leaving him exposed for a brief window.',
      drops: ['Crown of the Curse Sovereign', 'Ancient Shadow Essence', 'Nusantara Core of Darkness']
    }
  }
];


export default function MythicalBestiary({ lang = 'IND', t }) {
  const [selectedCreature, setSelectedCreature] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  const totalPages = Math.ceil(CREATURES_DATA.length / itemsPerPage);

  const displayedCreatures = CREATURES_DATA.length > itemsPerPage
    ? CREATURES_DATA.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
    : CREATURES_DATA;

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 0) setCurrentPage((prev) => prev - 1);
  };

  // Varian animasi untuk container (Stagger Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Memberikan jeda antar kartu saat muncul
      },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  // Varian animasi untuk tiap kartu monster saat di-scroll ke viewport
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0] // Smooth cubic-bezier curve
      }
    }
  };

  return (
    <section id="creatures">
      <div className="min-h-screen bg-[#060D0A] text-slate-200 font-sans p-4 sm:p-8 lg:p-12 relative overflow-x-hidden selection:bg-[#c8aa6e] selection:text-black">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-[#162a21] opacity-20 blur-[120px] pointer-events-none" />

        {/* Header Section dengan Animasi Scroll */}
        <motion.header 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 relative z-10"
        >
          <div className="inline-block border border-[#c8aa6e]/30 bg-[#0b1712]/80 px-4 py-1 rounded-full text-[10px] sm:text-xs tracking-[0.25em] text-[#c8aa6e] uppercase mb-6 shadow-inner">
            {t?.badge || (lang === 'IND' ? 'KATALOG MAKHLUK MITOS' : 'MYTHICAL BESTIARY')}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-wider text-amber-100 uppercase mb-4 leading-tight">
            {t?.title || (lang === 'IND' ? 'MAKHLUK ALAM TERLUPAKAN' : 'CREATURES OF THE LOST REALM')}
          </h1>
          <p className="italic text-amber-200/60 text-sm sm:text-base font-serif tracking-wide">
            {t?.subtitle || (lang === 'IND' ? '"Lahir dari eter purba dan isolasi berabad-abad, tidak jinak maupun fana."' : '"Born from primeval ether and centuries of isolation, neither tame nor mortal."')}
          </p>
        </motion.header>

        {/* Main Grid Content */}
        <main className="max-w-7xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              exit="exit"
              viewport={{ once: true, amount: 0.1 }} // Animasi terpicu saat 10% elemen terlihat di screen
              className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6"
            >
              {displayedCreatures.map((item) => {
                const data = item[lang] || item.ENG;
                return (
                  <motion.div
                    key={item.id}
                    variants={cardVariants}
                    onClick={() => setSelectedCreature(item)}
                    className="group bg-[#09130f] border border-[#1b2f25] hover:border-[#c8aa6e]/60 rounded-lg overflow-hidden cursor-pointer transition-colors duration-300 hover:shadow-2xl hover:shadow-[#c8aa6e]/10 flex flex-col justify-between"
                    whileHover={{ y: -8, transition: { duration: 0.2 } }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-square sm:aspect-[5/4] overflow-hidden bg-[#040806]">
                        <img
                          src={item.image}
                          alt={data.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 bg-black/80 backdrop-blur-md border border-white/10 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold tracking-wider text-slate-300 uppercase">
                          {data.tag}
                        </div>
                        <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 bg-black/80 backdrop-blur-md border border-amber-500/30 px-1.5 sm:px-2 py-0.5 rounded text-[8px] sm:text-[9px] font-bold text-amber-400">
                          ★ {item.rating}
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-3 sm:p-5">
                        <h3 className="text-sm sm:text-xl font-serif tracking-wider text-slate-100 font-bold mb-0.5 group-hover:text-amber-200 transition-colors line-clamp-1">
                          {data.name}
                        </h3>
                        <p className="text-[9px] sm:text-[10px] tracking-widest text-[#c8aa6e] uppercase font-semibold mb-2 sm:mb-3 line-clamp-1">
                          {data.subtitle}
                        </p>
                        <p className="text-[11px] sm:text-xs text-slate-400 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                          {data.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Footer */}
                    <div className="px-3 sm:px-5 pb-3 sm:pb-5 pt-2 flex items-center justify-between text-[9px] sm:text-[11px] tracking-wider text-[#c8aa6e] font-semibold border-t border-white/5 mt-auto group-hover:text-amber-300">
                      <span className="truncate pr-1">{t?.inspectText || (lang === 'IND' ? 'PERIKSA BESTIARY' : 'INSPECT BESTIARY')}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">›</span>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Slide Nav Controls */}
          {CREATURES_DATA.length > itemsPerPage && (
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#1b2f25] pt-6">
              <span className="text-xs text-amber-200/50 uppercase tracking-widest font-serif">
                {t?.showingPage || (lang === 'IND' ? 'Menampilkan Halaman' : 'Showing Page')}{' '}
                <span className="text-[#c8aa6e] font-bold">{currentPage + 1}</span> of {totalPages}
              </span>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded bg-[#0b1812] border border-[#c8aa6e]/30 text-[#c8aa6e] text-[10px] sm:text-xs font-semibold tracking-normal sm:tracking-wider hover:bg-[#14291f] hover:border-[#c8aa6e] disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase"
                >
                  {t?.prevBtn || (lang === 'IND' ? '‹ Halaman Sebelum' : '‹ Prev Realm')}
                </button>

                <div className="flex gap-1.5 px-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        currentPage === index
                          ? 'w-6 bg-[#c8aa6e]'
                          : 'w-2 bg-[#14291f] hover:bg-[#c8aa6e]/50'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages - 1}
                  className="px-2.5 py-1.5 sm:px-4 sm:py-2 rounded bg-[#0b1812] border border-[#c8aa6e]/30 text-[#c8aa6e] text-[10px] sm:text-xs font-semibold tracking-normal sm:tracking-wider hover:bg-[#14291f] hover:border-[#c8aa6e] disabled:opacity-30 disabled:cursor-not-allowed transition-all uppercase"
                >
                  {t?.nextBtn || (lang === 'IND' ? 'Halaman Lanjut ›' : 'Next Realm ›')}
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Modal Detail dengan Animasi Fade-In Smooth */}
        <AnimatePresence>
          {selectedCreature && (() => {
            const modalData = selectedCreature[lang] || selectedCreature.ENG;
            return (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
              >
                <div className="absolute inset-0" onClick={() => setSelectedCreature(null)} />
                
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="relative w-full max-w-2xl bg-[#060c08] border-2 border-[#c8aa6e]/60 rounded-xl p-6 sm:p-8 shadow-[0_0_40px_rgba(200,170,110,0.15)] z-10 max-h-[90vh] overflow-y-auto overflow-x-hidden"
                >
                  {/* Aksen Sudut Klasik Nusantara (Pojok-pojok Frame) */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#c8aa6e] pointer-events-none" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#c8aa6e] pointer-events-none" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#c8aa6e] pointer-events-none" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#c8aa6e] pointer-events-none" />

                  {/* Background Motif Batik Geometris Halus */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#c8aa6e_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Tombol Tutup (Close Button) */}
                  <button
                    onClick={() => setSelectedCreature(null)}
                    className="absolute top-5 right-5 sm:top-7 sm:right-7 border border-[#c8aa6e]/40 hover:border-[#c8aa6e] bg-[#0b1812] hover:bg-[#152e22] text-[#c8aa6e]/70 hover:text-amber-200 p-2 rounded transition-all shadow-md z-20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Bagian Utama: Gambar & Identitas Kreatur */}
                  <div className="flex flex-col sm:flex-row gap-6 mb-6 items-start relative z-10">
                    <div className="w-full sm:w-44 h-44 shrink-0 rounded-md overflow-hidden border border-[#c8aa6e]/40 bg-black shadow-lg relative group">
                      <img
                        src={selectedCreature.image}
                        alt={modalData.name}
                        className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="flex-1">
                      <span className="inline-block border border-[#c8aa6e]/40 bg-[#0f2118] px-2.5 py-0.5 rounded text-[10px] font-bold tracking-[0.2em] text-amber-300 uppercase mb-3 shadow-inner">
                        {modalData.detailTag}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-100 tracking-wider drop-name">
                        {modalData.name}
                      </h2>
                      <p className="text-xs tracking-[0.2em] text-[#c8aa6e] uppercase font-semibold mb-4">
                        {modalData.subtitle}
                      </p>
                      <div className="text-xs text-slate-300 bg-black/30 p-2 rounded border border-[#c8aa6e]/20 inline-block">
                        <span className="text-[#c8aa6e]/70 uppercase tracking-wider font-semibold">
                          {t?.habitatLabel || (lang === 'IND' ? 'HABITAT UTAMA:' : 'PRIMARY HABITAT:')}{' '}
                        </span>
                        <span className="font-bold text-slate-100 tracking-wide">{modalData.habitat}</span>
                      </div>
                    </div>
                  </div>

                  {/* Kotak Kisah & Lore Kuno (Gaya Kitab) */}
                  <div className="bg-[#050b08] border border-[#c8aa6e]/30 rounded-lg p-4 mb-4 relative z-10 shadow-inner">
                    <div className="absolute top-2 right-3 text-[#c8aa6e]/10 font-serif text-2xl">“</div>
                    <h4 className="text-[11px] font-bold tracking-[0.2em] text-[#c8aa6e] uppercase mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c8aa6e]" />
                      {t?.folkloreTitle || (lang === 'IND' ? 'Kisah & Lore Kuno Nusantara' : 'Chronicle & Folklore')}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">{modalData.folklore}</p>
                  </div>

                  {/* Kotak Kelemahan Taktis */}
                  <div className="bg-[#0b0c07] border border-amber-900/40 rounded-lg p-4 mb-6 relative z-10 shadow-inner">
                    <h4 className="text-[11px] font-bold tracking-[0.2em] text-amber-500 uppercase mb-1.5 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {t?.vulnerabilityTitle || (lang === 'IND' ? 'Kelemahan Taktis Leluhur' : 'Tactical Vulnerability')}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{modalData.vulnerability}</p>
                  </div>

                  {/* Drop Material Purba */}
                  <div className="relative z-10">
                    <h4 className="text-[10px] font-bold tracking-[0.2em] text-[#c8aa6e]/80 uppercase mb-3 flex items-center gap-1.5">
                      {t?.dropsTitle || (lang === 'IND' ? 'Rampasan Material Purba:' : 'Ancient Material Drops:')}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {modalData.drops.map((drop, idx) => (
                        <span
                          key={idx}
                          className="border border-[#c8aa6e]/40 bg-[#0c1813] px-3 py-1.5 rounded text-xs font-semibold text-amber-200/90 flex items-center gap-1.5 shadow-sm hover:border-[#c8aa6e] transition-colors"
                        >
                          <span className="text-amber-400 text-[10px]">✦</span> {drop}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}