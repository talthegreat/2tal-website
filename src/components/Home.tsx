import Slideshow from "./Slideshow";
import "../BackgroundVideo.css";
import background_video from "../assets/background-2.mp4";
import white_png_logo from "../assets/2tal-png-white.png";
import NavBar from "./NavBar";
import Social from "./Social";
import MoreHome from "./MoreHome";
import s1_image1 from "../assets/slideshow/1254-4-p.jpg";
import s1_image2 from "../assets/slideshow/noho-1-p.jpg";
import s1_image3 from "../assets/slideshow/zuzu-1-p.jpeg";
import { useEffect, useState } from "react";
// import { copyright } from "./SongMix"

interface HomeProps {
  ref: React.RefObject<HTMLDivElement>;
}

function Home({ ref }: HomeProps) {
  const slideshow_1_media = [
    {
      url: s1_image1,
      caption: "1254",
    },
    {
      url: s1_image2,
      caption: "chillin'",
    },
    {
      url: s1_image3,
      caption: "zuzu",
    },
  ];

  const [brightness, setBrightness] = useState(1);

  //video brightness curve scroll effect
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollProgress =
        1 - 1.3 * (scrollTop / (scrollHeight - clientHeight));
      const newBrightness = Math.max(0.15, 0.15 + 0.85 * scrollProgress);
      setBrightness(newBrightness);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
          filter: `brightness(${brightness})`,
          transition: "filter 0.1s linear",
        }}
      >
        <source src={background_video} type="video/mp4" />
      </video>
      <section>
        <div className="px-4">
          <div
            className="row justify-content-center align-items-center text-center"
            style={{ position: "relative", top: "30px" }}
          >
            <div className="col-3 no-wrap">
              {/* at some point I should replace this img tag with a video tag of an animation of me actually writing out the logo from procreate*/}
              <img style={{ width: "150%" }} src={white_png_logo} alt="2tal"/>
            </div>
            <div className="col-md-6">
              <Social
                className="nav nav-underline justify-content-center py-3 white-icon"
                w={2}
              />
            </div>
            <div
              className="col-md-3"
              style={{ position: "relative", bottom: "-20px" }}
            >
              <Slideshow width="70%" color="white" media={slideshow_1_media} />
            </div>
          </div>
          <div
            className="justify-content-center align-items-center text-center"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ position: "relative", top: "-30px" }}>
              <NavBar className="nav nav-underline px-4 splingy" c={false} />
            </div>
          </div>
        </div>
      </section>
      <MoreHome />
    </>
  );
}

export default Home;
