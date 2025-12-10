/**
 * for MUSIC: i need:
 * song url, title, artist (album)
 * album cover
 *
 * for DJ MIX i need:
 * track url, track title, track artist, (mix title)
 * mix cover, album cover
 */

// import { setPlaying } from "../App";


//import track1 from "../assets/audio/views/track-01.mp3";
// import track2 from "../assets/audio/views/track-02.mp3";
// import track3 from "../assets/audio/views/track-03.mp3";
// import track4 from "../assets/audio/views/track-04.mp3";
// import track5 from "../assets/audio/views/track-05.mp3";
// import track6 from "../assets/audio/views/track-06.mp3";
// import track7 from "../assets/audio/views/track-07.mp3";
// import track8 from "../assets/audio/views/track-08.mp3";
// import track9 from "../assets/audio/views/track-09.mp3";
// import track10 from "../assets/audio/views/track-10.mp3";
// import track11 from "../assets/audio/views/track-11.mp3";
// import track12 from "../assets/audio/views/track-12.mp3";

export const BASE_LINK = "https://pub-ece0601d7626406488f181727eb49a1b.r2.dev";
const cover = BASE_LINK + "/imgs/views-cover.jpg";
export interface Play {
  track: string | undefined; //a URL to the audio file in question TODO: any prior-constructed objects don't need "new Audio()" anymore
  title: string; //the name of the song playing
  artist: string; //the artist who made the song
  cover: string; //a url to the image of the album cover. for Music, it will be on local storage. for DJ, i will fetch it live from somewhere (wikipedia or spotify or something)
  album?: string; // the title of the album
  mix?: string; //the title of the mix its playing from
  secondary_cover?: string; //a url to the image of the mix that the track is playing from
  duration?: string; //TODO: FOR MUSIC: it's actually duration, i.e. how long the song plays for. FOR MIXES, it will be the time point in the mix that the song starts at. might add another field or change the name of this one to "time" for clarity
  start: string;
  marker: string; // "dj" or "music"
  end?: string; // a string in hh:mm:ss or mm:ss specifying the end time of a song
  explicit?: boolean; //is this track explicit?
  blurb?: string;
}

// export const handleSelectItem = (play: Play) => {
//   //TODO: somehow notify the audio player to start playing the song that got clicked. what I'll do is reference the album array with the index variable
//   //console.log(play.title);
// //   setPlaying(play);
// };

export function convertTimestamp(s: string) {
  let j = 0;
  let bases: string[] = s.split(":");
  let b: number[] = bases.map((base) => +base);
  if (b.length == 3) {
    j += b[0] * 60 * 60;
    j += b[1] * 60;
    j += b[2];
  } else if (b.length == 2) {
    j += b[0] * 60;
    j += b[1];
  }
  return j;
}

export function getBackground(background_url: string) {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100"
      style={{
        backgroundImage: `url(${background_url})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(30px) brightness(0.8)",
        zIndex: -1,
        transform: "scale(1.2)", // slight zoom for effect
        transition: "background-image 0.6s ease-in-out",
      }}
    />
  );
}

export function copyright() {
  return (
    <div
      className="justify-content-center px-4"
      style={{
        color: "white",
        position: "relative",
        bottom: "0",
        left: "0",
        padding: "15px",
        fontSize: "9px",
      }}
    >
      {"© 2025 2tal"}
    </div>
  );
}

export const album = [
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-01.mp3",
    title: "honey!",
    duration: "3:13",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
    explicit: true,
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-02.mp3",
    title: "jvn",
    duration: "1:45",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-03.mp3",
    title: "presence",
    duration: "2:32",
    artist: "2tal, Max Blue",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-04.mp3",
    title: "טַל",
    duration: "3:23",
    artist: "2tal, Natalia Ruiz, Elizabeth Kubicek, Monroe Randall",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-05.mp3",
    title: "fear is the torrent",
    duration: "3:52",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-06.mp3",
    title: "outro (terror in resonance)",
    duration: "3:40",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
    explicit: true,
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-07.mp3",
    title: "1254",
    duration: "4:37",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-08.mp3",
    title: "ghosts (be around)",
    duration: "3:05",
    artist: "2tal, Lucy Frost, Douglas Appleman",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-09.mp3",
    title: "junction",
    duration: "1:47",
    artist: "2tal, Romi Bee",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-10.mp3",
    title: "fever",
    duration: "4:26",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-11.mp3",
    title: "run deep",
    duration: "3:41",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
    explicit: true,
  },
  {
    start: "",
    track: BASE_LINK + "/audio/views/track-12.mp3",
    title: "i'll leave the rest 2 u",
    duration: "2:17",
    artist: "2tal",
    cover: cover,
    marker: "music",
    album: "views from my window before the light goes out",
  },
];
