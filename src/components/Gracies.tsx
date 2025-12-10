import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import background_video from "../assets/gracies-snow.mp4";
import cover from "../assets/views-cover.jpg";
import white_png_logo from "../assets/2tal-png-white.png";
import { album, type Play } from "./SongMix";
import "../Gracies.css";

interface Props {
  setSelectedIndex: (i: number) => void;
  onSongSelect: (p: Play[], i: number) => void;
}

function Gracies({ setSelectedIndex, onSongSelect }: Props) {
  function homeButton() {
    return (
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <Button variant="light" style={{}}>
          Enter Site
        </Button>
      </Link>
    );
  }

  function playTrack() {
    setSelectedIndex(2);
    onSongSelect(album, 2);
  }

  function backgroundVideo() {
    return (
      <>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-background"
          style={{
            position: "absolute",
            zIndex: -2,
            filter: `brightness(0.6)`,
            transition: "filter 0.1s linear",
            objectFit: "cover",
            maxHeight: "100vh",
          }}
        >
          <source src={background_video} type="video/mp4" />
        </video>
      </>
    );
  }
  return (
    <>
      {backgroundVideo()}
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ flexDirection: "column" }}
      >
        <img className="g-logo" src={white_png_logo}></img>
        <img
          className="gracies-image"
          src={cover}
          style={{ marginTop: "10px" }}
        />
        <div className="d-flex" style={{ justifyContent: "space-between" }}>
          <h1 className="gracies-text" style={{ fontSize: "50px" }}>
            presence
          </h1>
        </div>
        <h2 className="gracies-text text-center">
          views from my window before the light goes out
        </h2>
        <Button
          variant="light"
          size="lg"
          style={{ marginBottom: "15px" }}
          onClick={playTrack}
        >
          Play Track
        </Button>
        {homeButton()}
      </div>
    </>
  );
}

export default Gracies;
