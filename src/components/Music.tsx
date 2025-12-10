import ListGroup from "./ListGroup";
import "bootstrap/dist/css/bootstrap.css";
//const cover = "/imgs/views-cover.jpg";
// import freedom from "../assets/audio/freedom/freedom.flac";
// import freedom_slowed from "../assets/audio/freedom/freedom-slowed.flac";
const freedom_cover = BASE_LINK + "/imgs/freedom.jpg";
import { album, type Play } from "./SongMix";
import { getBackground, copyright, BASE_LINK } from "./SongMix";
import { useEffect, useRef, useState } from "react";

interface Props {
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  onSongSelect: (p: Play[], i: number) => void;
  timeSkip: (p: Play) => void;
  collection: string | undefined;
}

function Music({
  selectedIndex,
  setSelectedIndex,
  onSongSelect,
  timeSkip,
  collection,
}: Props) {
  //TODO: i'm not sure the audio player im gonna import has shuffle capabilities, I have to think about how to queue stuff (like have the album play in order), might have to think about not allowing two sounds to play at the same time
  const images = [album[0].cover, freedom_cover];

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

  const free = [
    {
      start: "",
      track: BASE_LINK + "/audio/freedom/freedom.flac",
      title: "Don't You Just Want To Be Free?",
      duration: "3:09",
      artist: "2tal, Natalia Ruiz",
      cover: freedom_cover,
      marker: "music",
      album: "Don't You Just Want To Be Free?",
    },
    {
      start: "",
      track: BASE_LINK + "/audio/freedom/freedom-slowed.flac",
      title: "don't you just want to be free? (slowed + reverb)",
      duration: "3:19",
      artist: "2tal, Natalia Ruiz",
      cover: freedom_cover,
      marker: "music",
      album: "Don't You Just Want To Be Free?",
    },
  ];

  return (
    <>
      {/* Background layer */}
      {getBackground(activeImage)}
      {/* views from my window before the light goes out */}
      <div className="row p-4 align-items-start playlist" key={0}>
        <div className="col-12 col-md-6">
          <ListGroup
            heading={"views from my window before the light goes out"}
            duration={"38:18"}
            items={album}
            isMusic={true}
            onSelectItem={onSongSelect}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            timeSkip={timeSkip}
            collection={collection}
          />
        </div>
        <img
          key={0}
          data-index={0}
          ref={(el) => {
            containerRefs.current[0] = el;
          }}
          className="col-12 col-md-6 image-setting"
          src={album[0].cover}
          height="25%"
        />
      </div>

      {/* don't you just want to be free */}
      <div className="row p-4 align-items-start playlist" key={1}>
        <div className="col-12 col-md-6">
          <ListGroup
            heading="Don't You Just Want To Be Free?"
            duration={"6:28"}
            items={free}
            isMusic={true}
            onSelectItem={onSongSelect}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            timeSkip={timeSkip}
            collection={collection}
          />
        </div>
        <img
          key={1}
          data-index={1}
          ref={(el) => {
            containerRefs.current[1] = el;
          }}
          className="col-12 col-md-6 image-setting"
          src={freedom_cover}
          height="25%"
        />
      </div>
      {copyright()}
    </>
  );
}

export default Music;
