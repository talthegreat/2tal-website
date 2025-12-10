import "../App.css";
import instagram from "/social-icons/instagram.png";
import apple_music from "/social-icons/music-notes.png";
import bandcamp from "/social-icons/music.png";
import spotify from "/social-icons/spotify.png";
import youtube from "/social-icons/youtube.png";

interface Props {
  className?: string;
  w: number;
}

type S = {
  id: string;
  image: string;
  link: string;
};

const social = [
  {
    id: "instagram",
    image: instagram,
    link: "https://www.instagram.com/dj_2tal/",
  },
  {
    id: "bandcamp",
    image: bandcamp,
    link: "https://2tal.bandcamp.com/album/views-from-my-window-before-the-light-goes-out",
  },
  {
    id: "apple music",
    image: apple_music,
    link: "#",
  },
  {
    id: "spotify",
    image: spotify,
    link: "#",
  },
  {
    id: "youtube",
    image: youtube,
    link: "#",
  },
];
function Social({ className, w }: Props) {
  function listItem(item: S, index: number) {
    return (
      <>
        <li className="nav-item p-1" key={index}>
          <a href={item.link} target="_blank" rel="noopener noreferrer">
            <img src={item.image} alt={item.id} className="social-icon" />
          </a>
        </li>
      </>
    );
  }

  return (
    <>
      <ul
        className={className}
        style={{ "--icon-size": `${w}rem` } as React.CSSProperties}
      >
        {social.map((item, index) => (
          <div key={index}>{listItem(item, index)}</div>
        ))}
      </ul>
    </>
  );
}

export default Social;

{
  /* <ul className={className}>
  <li
    className="nav-item"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <a href="https://www.instagram.com/dj_2tal/" target="_blank">
      <img
        src={instagram}
        alt="instagram"
        style={{ width: isHovered ? w : w }}
      />
    </a>
  </li>
  <li className="nav-item">
    <a href="#">
      <img src={bandcamp} alt="" style={{ width: w }} />
    </a>
  </li>
  <li className="nav-item">
    <a href="#">
      <img src={apple_music} alt="" style={{ width: w }} />
    </a>
  </li>
  <li className="nav-item">
    <a href="#">
      <img src={spotify} alt="" style={{ width: w }} />
    </a>
  </li>
  <li className="nav-item">
    <a href="#">
      <img src={youtube} alt="" style={{ width: w }} />
    </a>
  </li>
</ul>; */
}
