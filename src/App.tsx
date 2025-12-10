//import ListGroup from "./components/ListGroup";
import NavBar from "./components/NavBar.tsx";
import Music from "./components/Music.tsx";
import DJ from "./components/DJ.tsx";
import Media from "./components/Media.tsx";
import Contact from "./components/Contact.tsx";
import Home from "./components/Home.tsx";
import Shop from "./components/Shop.tsx";
import Shipping from "./components/Shipping.tsx";
import Gracies from "./components/Gracies.tsx";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import MusicPlayer from "./components/MusicPlayer.tsx";
import { type Play } from "./components/SongMix.tsx";
import { convertTimestamp } from "./components/SongMix.tsx";
import { useState, useEffect, useRef } from "react";
import type H5AudioPlayer from "react-h5-audio-player";
import { ShoppingCartProvider } from "./context/ShoppingCartContext.tsx";

let emptyPlay: Play = {
  start: "",
  cover: "",
  track: undefined,
  artist: "",
  title: "",
  marker: "",
};

let list = [emptyPlay];

function App() {
  //TODO: dark mode implementation??

  //TODO: some of the photos in the 'windows and shadows directory'
  // /Users/talben-anat/Desktop/possible website photo assets/more stuff/windows and shadows
  // are live photos: i could turn them into slowmotion gifs and make them background images like dg's website or something

  //TODO: I'm gonna make a short (0:20?) video and relegate it to the background of the website, kind of like how DG has it, except not completely inundating and fragmented.

  const [playing, setPlaying] = useState(emptyPlay);
  const [index, setIndex] = useState(-1);
  const [playlist, setPlaylist] = useState(list);
  // const [isMusic, toggleMusic] = useState(true);
  const [mixTime, setMixTime] = useState(0);
  const playerRef = useRef<H5AudioPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement>(null!);

  const location = useLocation();
  //---------gracie's functional code----------
  // after advent, pathname will never be /graciesadvent
  const shouldHideNav =
    location.pathname === "/shipping" || location.pathname === "/graciesadvent";

  // change website title to reflect playing media
  useEffect(() => {
    // playing.marker == "music" ? new_title += playing.title : new_title += playing.mix;
    // document.title = new_title;
    // new_title = (playing.title) ? "Official Site" : playing.

    if (playing.title == "") {
      document.title = "2tal - Official Site";
    } else {
      let new_title = "";
      new_title =
        playing.marker == "music"
          ? (new_title += playing.title)
          : (new_title += playing.mix);
      document.title = "2tal - " + new_title;
    }
  }, [playing]);

  //display playing media in iOS Control Center
  useEffect(() => {
    if ("mediaSession" in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playing.title,
        artist: playing.artist,
        album: playing.marker == "music" ? playing.album : playing.mix,
        artwork: [
          { src: playing.cover, sizes: "96x96", type: "image/jpg" },
          { src: playing.cover, sizes: "192x192", type: "image/jpg" },
          { src: playing.cover, sizes: "512x512", type: "image/jpg" },
        ],
      });

      // Optional: Handle media controls (play/pause/next)
      // navigator.mediaSession.setActionHandler("play", () => audio.play());
      // navigator.mediaSession.setActionHandler("pause", () => audio.pause());
    }
  }, [playing]);

  // function handleToggleMusic(b: boolean) {
  //   toggleMusic(b);
  // }

  // function checkMusic() {
  //   if (
  //     playing.artist.includes("2tal") ||
  //     playing.artist.includes("trust me")
  //   ) {
  //     toggleMusic(true);
  //   } else {
  //     toggleMusic(false);
  //   }
  //   // console.log(playing.artist);
  // }

  function handleSongSelect(p: Play[], i: number) {
    setPlaylist(p);
    setIndex(i);
    setPlaying(p[i]);
    // console.log(shouldHideNav);
    if (playerRef.current != null) {
      const audio = playerRef.current?.audio?.current;
      if (audio) {
        if (audio.paused) {
          audio.play();
        } else {
          if (playing.marker == "music") {
            audio.currentTime = 0;
          }
        }
      }
    }
  }

  function setSelectedIndex(newIndex: number) {
    setIndex(newIndex);
  }

  function handleSkip() {
    handleSongSelect(playlist, (index + 1) % playlist.length);
    // if (playing.marker != "music") {
    //   handleTimeSkip(playing);
    // }

    // console.log(isMusic); //for some reason this is "true" when i play a DJ mix... and for some reason when I take the exclamation point out, the first skip nothing happens, then the 2nd skip it works as it should but it is one track late...
  }

  function handleBack() {
    if (playing.marker == "music") {
      if (playerRef.current != null) {
        const audio = playerRef.current?.audio?.current;
        if (audio) {
          if (index == 0) {
            audio.currentTime = 0;
            return;
          }
          if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
          }
        }
      }
    }
    handleSongSelect(playlist, (index - 1) % playlist.length);
    // if (playing.marker != "music") {
    //   handleTimeSkip(playing);
    // }
  }

  function handleSongEnd() {
    if (index + 1 < playlist.length) {
      handleSongSelect(playlist, index + 1);
    }
    // the following if statement loops the entire album.
    if (index + 1 == playlist.length) {
      handleSongSelect(playlist, 0);
    }
  }

  function handleTimeSkip(p: Play) {
    setMixTime(convertTimestamp(p.start));
  }

  return (
    <>
      <div className="">
        <div
          className="row"
          style={{
            justifyContent: "space-between",
            // position: "absolute",
          }}
        >
          <div>
            {!shouldHideNav && (
              <NavBar
                className="nav nav-underline px-4 flex-nowrap nav-barr"
                c={true}
              />
            )}
          </div>
        </div>
        <div
          className="mt-header mb-footer p-1 px-4 overflow-auto app-size"
          ref={containerRef}
        >
          <Routes>
            <Route path="/" element={<Home ref={containerRef} />} />
            <Route
              path="/graciesadvent"
              element={
                <Gracies
                  onSongSelect={handleSongSelect}
                  setSelectedIndex={setSelectedIndex}
                />
              }
            />
            <Route
              path="/music"
              element={
                <Music
                  onSongSelect={handleSongSelect}
                  selectedIndex={index}
                  setSelectedIndex={setSelectedIndex}
                  timeSkip={handleTimeSkip}
                  collection={playing.album}
                />
              }
            />
            <Route
              path="/dj"
              element={
                <DJ
                  onSongSelect={handleSongSelect}
                  selectedIndex={index}
                  setSelectedIndex={setSelectedIndex}
                  timeSkip={handleTimeSkip}
                  collection={playing.mix}
                />
              }
            />
            <Route path="/media" element={<Media />} />
            <Route
              path="/Shop"
              element={
                <ShoppingCartProvider>
                  <Shop />
                </ShoppingCartProvider>
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/shipping"
              element={
                <ShoppingCartProvider>
                  <Shipping ref={containerRef} />
                </ShoppingCartProvider>
              }
            />
          </Routes>
        </div>
        <div className="music-player">
          {playing.track == undefined ? null : (
            <MusicPlayer
              src={playing}
              onSongEnd={handleSongEnd}
              skipPressed={handleSkip}
              backPressed={handleBack}
              moveForward={handleSkip}
              mixTime={mixTime}
              playerRef={playerRef}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;
