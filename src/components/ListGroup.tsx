import { useState } from "react";
import explicit from "/explicit.png";
import { type Play } from "./SongMix";
import download from "/downloads.png";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // For Bootstrap 5
import { type ReactNode } from "react";

interface ListGroupProps {
  items: Play[];
  heading: string;
  duration: string;
  isMusic: boolean;
  selectedIndex: number;
  setSelectedIndex: (i: number) => void;
  onSelectItem: (p: Play[], i: number) => void;
  timeSkip: (p: Play) => void;
  collection: string | undefined;
  blurb?: ReactNode;
}

function ListGroup({
  items,
  heading,
  duration,
  isMusic,
  selectedIndex,
  setSelectedIndex,
  onSelectItem,
  timeSkip,
  collection,
  blurb,
}: ListGroupProps) {
  //isMusic = !(items[0].marker == "music");

  const [expanded, setExpanded] = useState(!isMusic);
  const [expand, setExpand] = useState(false);

  function handleExpand() {
    setExpanded((prev) => !prev);
    // TODO: decide if i want this line or not
    //setExpand(false);
  }

  function handleDownload() {
    if (items[0].album) {
      let url;
      if (items[0].album === "views from my window before the light goes out") {
        url = "https://2tal.bandcamp.com/album/views-from-my-window-before-the-light-goes-out";
      }
      if (items[0].album === "Don't You Just Want To Be Free?") {
        url = "https://2tal.bandcamp.com";
      }
      const newWindow = window.open(url, "_blank", "noopener,noreferrer");
      if (newWindow) newWindow.opener = null;
    }
  }

  //TODO: ADD WAV FILES OF EVERY MIX TO THE SAME DIRECTORY AS THE MP3,
  //this function takes in nothing and returns a string representing the pathname of a .zip file containing the wav file of the DJ mix selected and the corresponding cover art
  // function zipify() {
  //   const file_path = items[0].track;
  //   if (file_path) {
  //     const new_file_path = file_path.slice(0, -3) + "wav";
  //     //TODO: ZIP TOGETHER THE WAV AND THE COVER ART AT items[0].cover and return that zip file
  //     return new_file_path;
  //   }
  // }

  //TODO: DYNAMICALLY FETCH FILE SIZE
//   function fileSize(fileName: string) {
//     fetch(fileName, { method: "HEAD" })
//     .then(res => {
//       const size = res.headers.get("Content-Length");
//        if (size) return formatFileSize(parseInt(size));
//     });
//   }

//   function formatFileSize(bytes: number): string {
//   if (bytes === 0) return "0 B";
//   if (!bytes || isNaN(bytes)) return "—";

//   const units = ["B", "KB", "MB", "GB", "TB", "PB"];
//   const i = Math.floor(Math.log(bytes) / Math.log(1024));
//   const size = bytes / Math.pow(1024, i);

//   // Keep 1 decimal for KB and above; no decimal for bytes
//   const display =
//     i === 0 ? size.toFixed(0) : size.toFixed(1);

//   return `${display} ${units[i]}`;
// }


  function generateHeading() {
    return (
      <li className="list-group-item hovery trans">
        <div className="d-flex justify-content-between">
          <h1 className="fw-bold listgroup-heading">{heading}</h1>
          <div className="d-flex">
            {isMusic ? (
              <div className="m-1">{downloadMusic()}</div>
            ) : (
              <div className="m-1">{downloadButton()}</div>
            )}
            <div className="m-1">{expandButton()}</div>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <h6>🕒 {duration}</h6>
          <i>{isMusic ? "length:" : "start time:"}</i>
        </div>
      </li>
    );
  }

  function downloadButton() {
    return (
      <div className="dropstart">
        <button
          className="btn btn-sm btn-light"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img src={download} className="download-img" alt="Download"></img>
        </button>
        <ul className="dropdown-menu">
          {items[0].track && (
            <>
              <li>
                <a
                  className="dropdown-item"
                  href={items[0].track}
                  download={"2tal - " + heading}
                >
                  MP3
                  {/* {fileSize(items[0].track)}) */}
                </a>
              </li>
              <li>
                <a
                  className="dropdown-item"
                  href={items[0].track.slice(0, -3) + "zip"}
                >
                  WAV 
                  {/* ({fileSize(items[0].track.slice(0, -3) + "zip")}) */}
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    );
  }

  function downloadMusic() {
    return (
      <button
        onClick={handleDownload} // FOR DJ: download the mix (dropdown: wav or mp3). FOR MUSIC: link to bandcamp
        className="btn btn-sm btn-light"
        type="button"
      >
        <img src={download} className="download-img"></img>
      </button>
    );
  }

  function expandButton() {
    return (
      <button
        onClick={handleExpand}
        type="button"
        className="btn btn-sm btn-light"
      >
        {expanded ? "▼" : "▲"}
      </button>
    );
  }

  // function iterateIndex() {
  //   console.log("iterate index: do something later");
  //   if (selectedIndex < items.length) {
  //     setSelectedIndex(selectedIndex + 1);
  //     onSelectItem(items[selectedIndex]);
  //   }
  // }

  function checkExplicit(item: Play) {
    if (item.explicit === undefined) {
      return;
    }
    return <img src={explicit} className="explicit"></img>;
  }

  //TODO: integrate this aesthetically (font size, italic, where on the screen)... also i gotta go back and edit the blurbs for all the mixes, all the relevant information...
  function mixBlurb() {
    return (
      <li
        className={
          expand ? "list-group-item trans" : "list-group-item very-trans"
        }
      >
        <div className="d-flex justify-content-between">
          {expand ? (
            <span className="mix-details m-1">{blurb}</span>
          ) : (
            <span className="mix-details fst-italic">mix details...</span>
          )}
          <button
            onClick={() => setExpand((prev) => !prev)}
            type="button"
            className="btn btn-sm btn-light"
            style={{ alignSelf: "flex-start" }}
          >
            {expand ? "▲" : "▼"}
          </button>
        </div>
      </li>
    );
  }
  return (
    <>
      <ul className="list-group">
        {generateHeading()}
        {expanded
          ? mixBlurb()
          : items.map((item, index) => (
              <li
                className={
                  selectedIndex === index &&
                  (item.album === collection || item.mix === collection)
                    ? "list-group-item trans hovery sel"
                    : "list-group-item trans hovery"
                }
                // onMouseEnter={() => setIsHovered(true)}
                // onMouseLeave={() => setIsHovered(false)}
                key={item.title}
                onClick={() => {
                  // old code line: setSelectedIndex()
                  setSelectedIndex(index); //used to be item.number, should be the same thing
                  onSelectItem(items, index);
                  if (!isMusic) {
                    timeSkip(item);
                  }
                }}
              >
                <div className="d-flex align-items-start justify-content-between">
                  {/* Track number */}
                  <div className="me-3 text-muted py-2">
                    {/* isHovered ? "ᐅ" : */ index + 1}
                  </div>
                  {/* Title + Artist stacked */}
                  <div className="flex-grow-1">
                    <div className="fw-bold">{item.title}</div>
                    <div className="text-muted small">
                      {checkExplicit(item)}
                      {item.artist}
                    </div>
                  </div>
                  {/* Duration / Time */}
                  <div className="text-end text-nowrap py-2">
                    {isMusic ? item.duration : item.start}
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
}

export default ListGroup;
