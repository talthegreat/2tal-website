import { Link } from "react-router-dom";
import ListGroup from "./ListGroup";
//import MAYHEM from "../assets/audio/dj/mayhem/forty-mins.mp3";
const MAYHEM_COVER = BASE_LINK + "/imgs/dj/forty-mins.jpg";
//import MEGAHARD from "../assets/audio/dj/megahard/megahard.mp3";
const MEGAHARD_COVER = BASE_LINK + "/imgs/dj/megahard.jpg";
//import ECHO from "../assets/audio/dj/cs360/echo360.mp3";
const ECHO_COVER = BASE_LINK + "/imgs/dj/echo360.jpg";
//import CRISPY from "../assets/audio/dj/cs360/crispy/crispy.mp3";
const CRISPY_COVER = BASE_LINK + "/imgs/dj/crispy.jpg";
//import ZUZU_UKG from "../assets/audio/dj/zuzu_ukg/zuzu_ukg.mp3";
const ZUZU_UKG_COVER = BASE_LINK + "/imgs/dj/zuzu_ukg.jpg";
// import CM from "../assets/audio/dj/cm/cm_draft_2.mp3"; // why wont it read the .aif??
const CM_COVER = BASE_LINK + "/imgs/dj/cm_draft_2.jpg";
//import SIXTY from "../assets/audio/dj/sixty_minutes/sixty_minutes.mp3";
const SIXTY_COVER = BASE_LINK + "/imgs/dj/sixty_minutes.jpg";
import { getBackground, copyright, BASE_LINK } from "./SongMix";
import { type ReactNode } from "react";

import { type Play } from "./SongMix";
import "../App.css";
import { useEffect, useRef, useState } from "react";

interface Mix {
  audio_file: string;
  title: string;
  duration: string;
  cover: string;
  tracklist: Track[];
  blurb: ReactNode;
}

interface Track {
  title: string;
  artist: string;
  start: string;
  end: string;
  explicit?: boolean;
}

interface Props {
  onSongSelect: (p: Play[], i: number) => void;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  timeSkip: (p: Play) => void;
  collection: string | undefined;
}

const images = [
  MAYHEM_COVER,
  MEGAHARD_COVER,
  CRISPY_COVER,
  ECHO_COVER,
  ZUZU_UKG_COVER,
  CM_COVER,
  SIXTY_COVER,
];

function DJ({
  selectedIndex,
  setSelectedIndex,
  onSongSelect,
  timeSkip,
  collection,
}: Props) {
  const [activeImage, setActiveImage] = useState<string>(images[0]);
  const containerRefs = useRef<(HTMLImageElement | null)[]>([]);

  // useEffect call for dynamic background fetching
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    containerRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveImage(images[index]);
            }
          });
        },
        { threshold: 0.6 } // Trigger when 60% of an image is visible
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const forty_mins: Mix = {
    audio_file: BASE_LINK + "/audio/dj/mayhem/forty-mins.mp3",
    title: "40 Minutes of Mayhem",
    duration: "40:00",
    cover: MAYHEM_COVER,
    blurb: (
      <>
        i stg this might be my best one yet. this came to be by having a bunch
        of different, seperate, crazy ideas, and successfully finding the
        throughline to weave them all together into something that made sense
        and maybe told a bit of a story. avicii with the evangelion and the
        ke$ha? lmfao with the sewerslvt? come on now!
        <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more mayhem
        </a>
      </>
    ),
    tracklist: [
      {
        title: "Rockin Chair",
        artist: "Yung Bredda",
        start: "0:00",
        end: "0:54",
        explicit: true,
      },
      {
        title: "Party Rock Anthem",
        artist: "LMFAO",
        start: "0:54",
        end: "4:58",
      },
      {
        title: "Lexapro Delirium",
        artist: "Sewerslvt",
        start: "4:58",
        end: "8:54",
      },
      {
        title: "A.C.I.D. (feat. Red Eye)",
        artist: "KiNK",
        start: "8:54",
        end: "9:53",
      },
      {
        title: "Numbers",
        artist: "Kraftwerk",
        start: "9:53",
        end: "12:21",
      },
      {
        title: "Slipping",
        artist: "aedes bois",
        start: "12:21",
        end: "14:11",
      },
      {
        title: "Levels",
        artist: "Avicii",
        start: "14:11",
        end: "14:48",
      },
      {
        title: "A Cruel Angel's Thesis (Acapella)",
        artist: "Yoko Takahashi",
        start: "14:48",
        end: "16:55",
      },
      {
        title: "Die Young",
        artist: "Ke$ha",
        start: "16:55",
        end: "18:33",
      },
      {
        title: "Baby again.. (feat. Skrillex, Four Tet)",
        artist: "Fred again..",
        start: "18:33",
        end: "20:40",
      },
      {
        title: "So U Kno",
        artist: "Overmono",
        start: "20:40",
        end: "23:53",
      },
      {
        title: "The Party We Could Have",
        artist: "Nathan Micay",
        start: "23:53",
        end: "26:16",
      },
      {
        title: "Blue Spring",
        artist: "Nathan Micay",
        start: "26:16",
        end: "26:46",
      },
      {
        title: "This is your Life",
        artist: "ishi vu",
        start: "26:46",
        end: "30:16",
      },
      {
        title: "Too Long",
        artist: "Daft Punk",
        start: "30:16",
        end: "34:30",
      },
      {
        title: "Love & Pain",
        artist: "JMSN",
        start: "34:30",
        end: "35:59",
      },
      {
        title: "light at the end of the tunnel",
        artist: "Sewerslvt",
        start: "35:59",
        end: "40:00",
      },
    ],
  };

  const megahard: Mix = {
    audio_file: BASE_LINK + "/audio/dj/megahard/megahard.mp3",
    title: "60 More Minutes: A Megahard Tech House Mix",
    duration: "60:00",
    cover: MEGAHARD_COVER,
    blurb: (
      <>
        this one is for all the bro house lovers out there. sometimes you gotta
        lean into it.
        <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more megahard
        </a>
      </>
    ),
    tracklist: [
      {
        title: "Darkness",
        artist: "Boris Brejcha",
        start: "0:00",
        end: "4:45",
      },
      {
        title: "Leave Me Like This",
        artist: "Skrillex",
        start: "4:45",
        end: "7:50",
      },
      {
        title: "Evacuate The Dancefloor (Wideboys Remix)",
        artist: "Cascada",
        start: "7:50",
        end: "9:06",
      },
      {
        title: "Bad Romance",
        artist: "Lady Gaga",
        start: "9:06",
        end: "9:38",
      },
      {
        title: "Bad Romance (Skrillex Remix)",
        artist: "Lady Gaga",
        start: "9:38",
        end: "12:29",
      },
      {
        title: "Moderation",
        artist: "Cody Ko",
        start: "12:29",
        end: "15:10",
      },
      {
        title: "Happinezz",
        artist: "Boris Brejcha",
        start: "15:10",
        end: "15:40",
      },
      {
        title: "On My Mind",
        artist: "Diplo",
        start: "15:40",
        end: "17:13",
      },
      {
        title: "Applause (Empire Of The Sun Remix)",
        artist: "Lady Gaga",
        start: "17:13",
        end: "19:47",
      },
      {
        title: "Dancing",
        artist: "James Hype",
        start: "19:47",
        end: "21:36",
      },
      {
        title: "ENERGY",
        artist: "Disclosure",
        start: "21:36",
        end: "23:25",
      },
      {
        title: "Work (Acapella)",
        artist: "Masters At Work",
        start: "23:25",
        end: "24:58",
      },
      {
        title: "[Interlude] What Does STAMINA Mean To You?",
        artist: "Nico, The STAMINA Community",
        start: "24:58",
        end: "27:31",
        explicit: true,
      },
      {
        title: "You Used To Know Me (Dopamine VIP Remix)",
        artist: "Charli XCX",
        start: "27:31",
        end: "29:18",
      },
      {
        title: "Telephone (feat. Beyoncé)",
        artist: "Lady Gaga",
        start: "29:18",
        end: "30:59",
      },
      {
        title: "Marea (we've lost dancing)",
        artist: "Fred again.., The Blessed Madonna",
        start: "30:59",
        end: "34:18",
      },
      {
        title: "You Little Beauty",
        artist: "Fisher",
        start: "34:18",
        end: "34:48",
      },
      {
        title: "Kernkraft 400 - Club Edit",
        artist: "TDK",
        start: "34:48",
        end: "35:12",
      },
      {
        title: "Lux (turn off the lights)",
        artist: "Tim Hox",
        start: "35:12",
        end: "37:22",
      },
      {
        title: "Toca Toca (Acapella)",
        artist: "Fly Project",
        start: "37:22",
        end: "38:24",
      },
      {
        title: "Bulletproof (FÄT TONY MEDUN Remix)",
        artist: "La Roux",
        start: "38:24",
        end: "40:41",
      },
      {
        title: "Losing My Head",
        artist: "Julian Jordan",
        start: "40:41",
        end: "43:45",
      },
      {
        title: "Pegasus",
        artist: "Meduza",
        start: "43:45",
        end: "46:43",
      },
      {
        title: "Escape",
        artist: "Kx5, deadmau5",
        start: "46:43",
        end: "50:05",
      },
      {
        title: "In Chicago",
        artist: "John Summit",
        start: "50:05",
        end: "51:37",
      },
      {
        title: "Crazy In Love (feat. Jay-Z) [Acapella]",
        artist: "Beyoncé",
        start: "51:37",
        end: "52:53",
      },
      {
        title: "The Calling",
        artist: "Tchami",
        start: "52:53",
        end: "54:22",
      },
      {
        title: "I Could Be Wrong",
        artist: "Lucas & Steve",
        start: "54:22",
        end: "57:10",
      },
      {
        title: "One More Time",
        artist: "Daft Punk",
        start: "57:10",
        end: "1:00:00",
      },
    ],
  };

  const echo_360: Mix = {
    audio_file: BASE_LINK + "/audio/dj/cs360/echo360.mp3",
    title: "cs383 echo360 lecture recording (wednesday afternoon 11.2.22)",
    duration: "1:11:13",
    cover: ECHO_COVER,
    //TODO: POST THE "MORE CONTENT" ON INSTAGRAM AND LINK THAT SHIT
    blurb: (
      <>
        (january 27, 2023) at umass amherst, lectures in some of the larger
        lecture halls get recorded and uploaded for students automatically by a
        service called Echo360. On wednesday, november 22nd, 2022, my AI
        professor cancelled in-person class, so I connected my DJ controller to
        the lecture room setup and spun for about an hour. I recorded it locally
        (what you're hearing now), but a version was uploaded to our class
        echo360 page for my classmates to enjoy. <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more cs383 echo360 shenanigans
        </a>
      </>
    ),
    tracklist: [
      {
        title: "Cape Coast",
        artist: "&ME",
        start: "0:00",
        end: "7:30",
      },
      {
        title: "Is It True (Four Tet Remix)",
        artist: "Tame Impala",
        start: "7:30",
        end: "11:13",
      },
      {
        title: "Breathing",
        artist: "Ben Böhmer",
        start: "11:13",
        end: "14:24",
      },
      {
        title: "Die With You",
        artist: "Childish Gambino",
        start: "14:24",
        end: "15:34",
      },
      {
        title: "Leave A Trace (Four Tet Remix)",
        artist: "CHVRCHES",
        start: "15:34",
        end: "16:09",
      },
      {
        title: "Don't Stop The Music (Acapella)",
        artist: "Rihanna",
        start: "16:09",
        end: "23:20",
      },
      {
        title: "Church",
        artist: "Coldplay",
        start: "23:30",
        end: "27:05",
      },
      {
        title: "Used To Know Me (yuné pinku Remix)",
        artist: "Charli XCX",
        start: "27:05",
        end: "28:37",
      },
      {
        title: "Leave The Party",
        artist: "JANIE",
        start: "28:37",
        end: "31:12",
      },
      {
        title: "Father Ocean (Ben Böhmer Remix)",
        artist: "Monolink",
        start: "31:12",
        end: "35:34",
      },
      {
        title: "Too Long",
        artist: "Daft Punk",
        start: "35:34",
        end: "37:38",
      },
      {
        title: "When I Think Of You (Jansons Remix)",
        artist: "Michel De Hey",
        start: "37:38",
        end: "42:12",
      },
      {
        title: "World's End Rhapsody",
        artist: "Nujabes",
        start: "42:12",
        end: "47:27",
      },
      {
        title: "Fantasy",
        artist: "Against All Logic",
        start: "47:27",
        end: "49:28",
      },
      {
        title: "Rodent",
        artist: "Burial",
        start: "49:28",
        end: "54:19",
      },
      {
        title: "6000 ft. (feat. TEED)",
        artist: "Bonobo",
        start: "54:19",
        end: "57:43",
      },
      {
        title: "Bleu (better with time)",
        artist: "Fred again..",
        start: "57:43",
        end: "1:00:51",
      },
      {
        title: "Clara (the night is dark)",
        artist: "Fred again..",
        start: "1:00:51",
        end: "1:05:30",
      },
      {
        title: "Spinning (feat. The 1975)",
        artist: "No Rome",
        start: "1:05:30",
        end: "1:11:13",
      },
    ],
  };

  const crispy_360: Mix = {
    audio_file: BASE_LINK + "/audio/dj/cs360/crispy/crispy.mp3",
    title: "cs383 echo360 (crispy) (wednesday evening 11.2.22)",
    duration: "25:18",
    cover: CRISPY_COVER,
    blurb: (
      <>
        after spinning for over an hour in the lecture hall, i was buzzing with
        the energy. i remember lugging my dj controller with me to a dining
        hall, head spinning a little. that mix had some good ideas, but what if
        i could do it just a little bit better? so when i got back home, i
        whipped out the controller again and recorded a shorter (crispier)
        version. <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more crispy
        </a>
      </>
    ),
    tracklist: [
      {
        title: "Leave A Trace (Four Tet Remix)",
        artist: "CHVRCHES",
        start: "0:00",
        end: "1:20",
      },
      {
        title: "Don't Stop The Music (Acapella)",
        artist: "Rihanna",
        start: "1:20",
        end: "7:51",
      },
      {
        title: "Rodent",
        artist: "Burial",
        start: "7:51",
        end: "12:00",
      },
      {
        title: "6000 ft. (feat. TEED)",
        artist: "Bonobo",
        start: "12:00",
        end: "17:20",
      },
      {
        title: "Bleu (better with time)",
        artist: "Fred again..",
        start: "17:20",
        end: "20:16",
      },
      {
        title: "Clara (the night is dark)",
        artist: "Fred again..",
        start: "20:16",
        end: "25:18",
      },
    ],
  };

  const zuzu_ukg: Mix = {
    audio_file: BASE_LINK + "/audio/dj/zuzu_ukg/zuzu_ukg.mp3",
    title: "2tal @ zuzu: uk_garage (97%)",
    duration: "54:59",
    cover: ZUZU_UKG_COVER,
    blurb: (
      <>
        this was the first ever event at a venue! (shoutout shak.) we played at
        zuzu on a thursday from... 5-9pm, i believe. the boys were gracious to
        have me go last. i had been crafting a very intentional mix, with the
        track order and the transitions all lined up. i was more excited to
        demonstrate my artistry and vision than i was to play to the 8pm
        thursday crowd. but i thought it went well! i took videos; who knows
        when i'll have the time and energy to edit them into something worth
        watching. in the meantime, thanks for listening.
        <br /> <br />
        {/* TODO: set this link to the google doc with the track breakdown */}
        <a href="#" style={{ color: "black" }}>
          → 2tal @ zuzu tracklist breakdown
        </a>
        <br />
        {/* TODO: set this link to some ig content */}
        <a href="#" style={{ color: "black" }}>
          → more of 2tal @ zuzu
        </a>
      </>
    ),
    tracklist: [
      {
        title: "No Man's Land",
        artist: "Tangerine Dream",
        start: "0:00",
        end: "5:17",
      },
      {
        title: "Just for me",
        artist: "PinkPantheress",
        start: "5:17",
        end: "7:20",
      },
      {
        title: "Danielle (smile on my face)",
        artist: "Fred again..",
        start: "7:20",
        end: "10:31",
      },
      {
        title: "e-motions (feat. Erika de Casier)",
        artist: "Mura Masa",
        start: "10:31",
        end: "12:56",
      },
      {
        title: "Otis",
        artist: "The Durutti Column",
        start: "12:56",
        end: "16:15",
      },
      {
        title: "Insomnia",
        artist: "Otik",
        start: "16:15",
        end: "20:07",
      },
      {
        title: "Purple",
        artist: "AK, Liam Thomas",
        start: "20:07",
        end: "23:01",
      },
      {
        title: "Waited 4 U",
        artist: "Slow Magic",
        start: "23:01",
        end: "26:09",
      },
      {
        title: "Turn On The Lights again.. (feat. Future)",
        artist: "Fred again.., Swedish House Mafia",
        start: "26:09",
        end: "30:41",
      },
      {
        title: "As If We Never",
        artist: "Murder He Wrote",
        start: "30:41",
        end: "34:02",
      },
      {
        title: "The Rest is Noise",
        artist: "Jamie xx",
        start: "34:02",
        end: "37:51",
      },
      {
        title: "Admit It (u don't want 2)",
        artist: "Fred again..",
        start: "37:51",
        end: "42:42",
      },
      {
        title: "See Boston As I See It",
        artist: "digitialgirlfriend",
        start: "42:42",
        end: "45:21",
      },
      {
        title: "Gonna Bleach My Eyebrows",
        artist: "ALEMEDA",
        start: "45:21",
        end: "46:58",
      },
      {
        title: "♾️",
        artist: "Coldplay",
        start: "46:58",
        end: "50:26",
      },
      {
        title: "Too Long",
        artist: "Daft Punk",
        start: "50:26",
        end: "52:05",
      },
      {
        title: "I Like America & America Likes Me (Mark Robinson Garage Remix)",
        artist: "The 1975",
        start: "52:05",
        end: "54:59",
      },
    ],
  };

  const cm: Mix = {
    audio_file: BASE_LINK + "/audio/dj/cm/cm_draft_2.mp3",
    title: "cm mix draft 2 [DRAFT]",
    duration: "1:08:55",
    cover: CM_COVER,
    blurb: (
      <>
        this mix was recorded on july 5th, 2022 i believe, one day after a great
        night at allston's own the spot on july 4th. i played second, i believe.
        this mix has a couple good ideas stiched together a little haphazardly;
        maybe one day i'll go back and remake it better.
        <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more cm mix
        </a>
      </>
    ),
    tracklist: [
      {
        title: "Impact (feat. Robyn, Channel Tres) [Soulwax Remix]",
        artist: "S. G. Lewis",
        start: "0:00",
        end: "5:52",
      },
      {
        title: "It's More Fun To Compute",
        artist: "Kraftwerk",
        start: "5:52",
        end: "9:19",
      },
      {
        title: "Marea (we've lost dancing)",
        artist: "Fred again.., The Blessed Madonna",
        start: "9:19",
        end: "13:18",
      },
      {
        title: "Kyle (i found you)",
        artist: "Fred again..",
        start: "13:18",
        end: "14:58",
      },
      {
        title: "Maybe You're The Reason",
        artist: "The Japanese House",
        start: "14:58",
        end: "15:45",
      },
      {
        title: "Breathe Deeper (Hoodboi Remix)",
        artist: "Tame Impala",
        start: "15:45",
        end: "16:49",
      },
      {
        title: "Ghost Voices",
        artist: "Virtual Self",
        start: "16:49",
        end: "18:44",
      },
      {
        title: "One More Time",
        artist: "Daft Punk",
        start: "18:44",
        end: "21:01",
      },
      {
        title: "Forget About The World (Daft Punk Remix)",
        artist: "Gabrielle",
        start: "21:01",
        end: "21:46",
      },
      {
        title: "Where Have You Been",
        artist: "Rihanna, Calvin Harris",
        start: "21:46",
        end: "26:16",
      },
      {
        title: "Sacrifice (Swedish House Mafia Remix)",
        artist: "The Weeknd",
        start: "26:16",
        end: "30:16",
        explicit: true,
      },
      {
        title: "Only Girl In The World",
        artist: "Rihanna",
        start: "30:16",
        end: "34:18",
      },
      {
        title: "Lean On (feat. MØ) (Mesto Bootleg)",
        artist: "Major Lazer & DJ Snake",
        start: "34:18",
        end: "36:48",
      },
      {
        title: "Bubblin",
        artist: "Dombresky",
        start: "36:48",
        end: "39:18",
      },
      {
        title: "Sexy And I Know It",
        artist: "LMFAO",
        start: "39:18",
        end: "42:18",
      },
      {
        title: "The Chant",
        artist: "Todd Edwards",
        start: "42:18",
        end: "45:48",
      },
      {
        title: "Take My Breath",
        artist: "The Weeknd",
        start: "45:48",
        end: "48:50",
      },
      {
        title: "Computer Love (1991 Remix)",
        artist: "Kraftwerk",
        start: "48:50",
        end: "53:20",
      },
      {
        title: "DJ Got Us Falling In Love Again (feat. Pitbull)",
        artist: "Usher",
        start: "53:20",
        end: "57:27",
      },
      {
        title: "LUCID",
        artist: "Rina Sawayama",
        start: "57:27",
        end: "59:34",
      },
      {
        title: "DJ (Madeon Remix)",
        artist: "Alphabeat",
        start: "59:34",
        end: "1:02:34",
      },
      {
        title: "Strobe",
        artist: "deadmau5",
        start: "1:02:34",
        end: "1:08:55",
      },
    ],
  };

  const sixty_minutes: Mix = {
    audio_file: BASE_LINK + "/audio/dj/sixty_minutes/sixty_minutes.mp3",
    title: "2tal - 60 Minutes",
    duration: "60:00",
    cover: SIXTY_COVER,
    blurb: (
      <>
        my first ever dj mix! i thought it worked out! start a bit slower, get a
        bit faster... played some new releases, some classics...it took me a
        bunch of tries to get it right. i performed this for the first time in
        northampton in an oversized shed. good times.
        <br /> <br />
        <a href="#" style={{ color: "black" }}>
          → more 2tal - 60 minutes
        </a>
      </>
    ),
    tracklist: [
      {
        title: "List of People (To Try and Forget About)",
        artist: "Tame Impala",
        start: "0:00",
        end: "2:34",
      },
      {
        title: "Hebele Hubulu (Zuma Dionys Remix)",
        artist: "Omerar Nanda",
        start: "2:34",
        end: "3:31",
      },
      {
        title: "The Heart Part 5",
        artist: "Kendrick Lamar",
        start: "3:31",
        end: "8:36",
      },
      {
        title: "Problem",
        artist: "Ariana Grande",
        start: "8:36",
        end: "11:43",
      },
      {
        title: "Your Love My Destiny",
        artist: "BRONSN",
        start: "11:43",
        end: "13:43",
      },
      {
        title: "Gone Girl",
        artist: "Obongjayar and Sarz",
        start: "13:45",
        end: "17:57",
      },
      {
        title: "Pawn Storm",
        artist: "Musumeci",
        start: "17:57",
        end: "22:00",
      },
      {
        title: "Paris (Aeroplane Remix)",
        artist: "Friendly Fires",
        start: "22:00",
        end: "29:18",
      },
      {
        title: "Boom Clap (Aeroplane Remix)",
        artist: "Charli XCX",
        start: "29:18",
        end: "30:57",
      },
      {
        title: "Let's Do It Again",
        artist: "Jamie xx",
        start: "37:53",
        end: "41:54",
      },
      {
        title: "Ain't Nobody (Loves Me Better) (The Rooftop Boys Remix)",
        artist: "Felix Jaehn feat. Jasmine Thompson",
        start: "37:53",
        end: "41:54",
      },
      {
        title: "Modal Soul (feat. Uyama Hiroto)",
        artist: "Nujabes",
        start: "41:54",
        end: "45:55",
      },
      {
        title: "Some Kind of Game",
        artist: "Against All Logic",
        start: "45:55",
        end: "50:36",
      },
      {
        title: "Car Keys",
        artist: "A. G. Cook",
        start: "50:36",
        end: "53:37",
      },
      {
        title: "The Veldt (feat. Chris James)",
        artist: "deadmau5",
        start: "53:37",
        end: "58:08",
      },
      {
        title: "Quarantine's Shakin'",
        artist: "aedes bois",
        start: "58:08",
        end: "1:00:00",
      },
    ],
  };

  function convert_to_plays(m: Mix) {
    return m.tracklist.map((t, index) => ({
      ...t,
      number: index + 1,
      track: m.audio_file,
      cover: m.cover,
      secondary_cover: "", // TODO: follow this shit, likely to App.tsx; FETCH DYNAMICALLY the ALBUM ART for mix track
      album: "", //SAME ^
      mix: m.title,
      marker: "dj",
    }));
  }

  // due to the .map function within the return statement of this component, the mixes will be displayed in the exact order they appear in this array
  const all_mixes = [
    forty_mins,
    megahard,
    crispy_360,
    echo_360,
    zuzu_ukg,
    cm,
    sixty_minutes,
  ];

  const display_mix_element = (mix: Mix, i: number) => {
    return (
      <div className="row p-4 align-items-start playlist" key={i}>
        <div className="col-12 col-md-6">
          <ListGroup
            heading={mix.title}
            duration={mix.duration}
            items={convert_to_plays(mix)}
            isMusic={false}
            onSelectItem={onSongSelect}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            timeSkip={timeSkip}
            collection={collection}
            blurb={mix.blurb}
          />
        </div>
        <img
          key={i}
          data-index={i}
          ref={(el) => {
            containerRefs.current[i] = el;
          }}
          className="col-12 col-md-6 image-setting"
          src={mix.cover}
        />
      </div>
    );
  };

  return (
    <>
      {/* Background layer */}
      {getBackground(activeImage)}
      {/* Foreground content */}
      {all_mixes.map((mix, i) => (
        <div key={i}>{display_mix_element(mix, i)} </div>
      ))}
      <h3 className="p-4" style={{ color: "white" }}>
        See (or hear) something you like?
        <Link className="link m-2" to="/contact">
          Contact
        </Link>
        me here!
      </h3>
      {copyright()}
    </>
  );
}

export default DJ;
