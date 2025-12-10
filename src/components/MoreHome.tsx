import { copyright } from "./SongMix.tsx";
// import home_background from "../assets/home-background.jpg";
import { collaborators, type Collaborator } from "../data/HomeData.tsx";

export default function MoreHome() {
  function moreHomeElement(c: Collaborator, i: number) {
    return (
      <div className="row align-items-start playlist" key={i}>
        <div className="col-12 col-md-9">
          {c.level === 1 ? (
            <h1 className="mb-4 py-2 fw-bold">{c.heading}</h1>
          ) : (
            <h3 className="mb-3 py-2 fw-bold">{c.heading}</h3>
          )}
          <h5 className="fst-italic my-4">{c.subtitle}</h5>
          {c.paragraphs.map((passage, index) => (
            <p key={index}>{passage}</p>
          ))}
          {c.links?.map((link, index) => (
            <p key={index}>{link}</p>
          ))}
        </div>
        <div className="col-12 col-md-3">
          <img className="p-4 morehome-image" src={c.img} alt={c.heading} />
        </div>
      </div>
    );
  }

  return (
    <>
      <section
        style={{
          position: "relative",
          alignContent: "center",
          marginLeft: "-1.5rem",
          marginRight: "-1.5rem",
          top: "450px",
          minHeight: "100vh",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Blurred background image */}
        {/* <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${home_background})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", //parallax doesnt work rn
            filter: "blur(12px) brightness(0.7)", // blur only the background
            transform: "scale(1.1)", // prevent edge clipping
            zIndex: 0,
          }}
        ></div> */}

        {/* Foreground content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            backdropFilter: "none", // ensure no blur on text
          }}
          className="container py-5"
        >
          {collaborators.map((collaborator, index) =>
            moreHomeElement(collaborator, index)
          )}
        </div>
        {copyright()}
      </section>
    </>
  );
}
