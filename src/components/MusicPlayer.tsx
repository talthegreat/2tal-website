import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import MusicCard from "./MusicCard";
import { type Play } from "./SongMix";
import { useEffect } from "react";
import { convertTimestamp } from "./SongMix";
import type H5AudioPlayer from "react-h5-audio-player";

interface Props {
  src: Play;
  onSongEnd: () => void;
  skipPressed: () => void;
  backPressed: () => void;
  moveForward: () => void;
  mixTime: number;
  playerRef: React.RefObject<H5AudioPlayer | null>;
}

const MusicPlayer = ({
  src,
  onSongEnd,
  skipPressed,
  backPressed,
  moveForward,
  mixTime,
  playerRef
}: Props) => {
  // useEffect(() => {
  //   const audio = playerRef.current?.audio?.current;
  //   if (!audio) return;

  //   const handleLoadedMetadata = () => {
  //     // Seek to 6 minutes (360 seconds)
  //     // audio.currentTime = 360;
  //     console.log(src.title); // this prints nothing.. why??
  //     console.log(convertTimestamp(src.start));
  //   };

  //   audio.addEventListener("loadedmetadata", handleLoadedMetadata);

  //   return () => {
  //     audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
  //   };
  // }, []);

  //bit of hard-coding buffoonery

  // if (src.artist.includes("2tal") || src.artist.includes("trust me")) {
  //   isMusic = true;
  // } else {
  //   isMusic = false;
  // }

  function executeTimeSkip() {
    if (playerRef.current != null) {
      const audio = playerRef.current?.audio?.current;
      if (audio) {
        audio.currentTime = mixTime > 5 ? mixTime - 5 : mixTime;
        if (audio.paused) {
          audio.play();
        }
      }
    }
  }

  useEffect(() => {
    executeTimeSkip();
  }, [mixTime]);

  function handleCheckTime() {
    if (playerRef.current) {
      const audio = playerRef.current?.audio?.current;
      if (audio) {
        if (src.marker != "music") {
          if (src.end) {
            if (audio.currentTime > convertTimestamp(src.end)) {
              moveForward();
            }
          }
        }
      }
    }
  }

  return (
    <div className="row">
      <div className="col-3">
        <div className="d-none d-md-block">
          <MusicCard data={src} />
        </div>
        <div className="d-block d-md-none">
          <img className="m-1 solo-img" style={{}} src={src.cover} />
        </div>
      </div>
      <div className="col-9">
        {
          <AudioPlayer
            ref={playerRef}
            autoPlay={false}
            autoPlayAfterSrcChange={true}
            showSkipControls={src.marker == "music"}
            // shuffle={true}
            showJumpControls={false}
            src={src.track}
            onClickNext={skipPressed}
            onClickPrevious={backPressed}
            // footer={<MusicCard data={src} />}
            onEnded={onSongEnd}
            onListen={handleCheckTime}
            listenInterval={1000}
            progressJumpSteps={{forward: 0, backward: 0}}
            // other props here
          />
        }
      </div>
    </div>
  );
};

export default MusicPlayer;
