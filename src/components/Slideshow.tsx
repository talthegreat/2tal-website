import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

interface SlideshowProps {
  width?: string;
  color?: string;
  media: {
    url: string;
    caption: string;
  }[];
}

const buttonStyle = {
  width: "30px",
  background: "none",
  border: "0px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#fff">
        <path d="M64 .3C28.7.3 0 28.8 0 64s28.7 63.7 64 63.7 64-28.5 64-63.7S99.3.3 64 .3zm0 121C32.2 121.3 6.4 95.7 6.4 64 6.4 32.3 32.2 6.7 64 6.7s57.6 25.7 57.6 57.3c0 31.7-25.8 57.3-57.6 57.3zm1.3-82.8L41.6 64l23.6 25.5h13.5L54.4 64l24.4-25.5H65.3z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyle }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" fill="#fff">
        <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm0 121.6C32.2 121.6 6.4 95.8 6.4 64S32.2 6.4 64 6.4s57.6 25.8 57.6 57.6-25.8 57.6-57.6 57.6zM49.2 38.4 73.6 64 49.2 89.6h13.5L86.4 64 62.7 38.4H49.2z" />
      </svg>
    </button>
  ),
};

const Slideshow = ({ width, color, media }: SlideshowProps) => {
  return (
    <div className="slide-container">
      <Fade {...properties}>
        {media.map((item, index) => (
          <div key={index}>
            <img style={{ width: width }} src={item.url} />
            <h4 style={{ color: color }}>{item.caption}</h4>
          </div>
        ))}
      </Fade>
    </div>
  );
};

export default Slideshow;
