import { getBackground } from "./SongMix";
import { type ReactNode, useEffect, useState } from "react";
import black from "../assets/Black_colour.jpg";

const leave: ReactNode[] = [
  "nico: oh my god this is such a fun adventure, guys,",
  "this is so cute, this is like the–",
  "this is like a reality tv show.",
  "literally, the premise for a reality tv show…",
  "2tal: in this house. with all these…",
  <br />,
  "2tal: um…",
  "nico: episode one, facetime with alyssa…",
  "2tal: mm…",
  "nico: episode two, late-night recording cyph with andrej–",
  "2tal: you have to text natalia to make sure she arrived in mexico safely.",
  "nico: oh i did…",
  "2tal: how is she…",
  "nico: i told her you thought she was hot, too.",
  "2tal: …what did she say to that…",
  "nico: …i didn’t tell her that…",
  "2tal, snacks & nico: [laughter]",
  "nico: let’s go!",
  "snacks: tal that is a good re– that’s a good reaction–",
  "nico: yes sir! homie’s a dog!",
  "snacks: bro, bro– that was– that was the best answer you could’ve given to that, ",
  "you just– you just keep doing your thing man, you’re gonna be fine…",
  "dude, any doubts i ever had in you were just ",
  "immediately erased.",
  "~",
  "nanami kento: あとは頼みます。(i’ll leave the rest to you.)",
];

const outro: ReactNode[] = [
    "we straight gassin’, cuttin’ straight to the bricks.",
     "ha ha. this shit ain’t nothing to me, man.",
     "we smokin’ runts.",
     "shorty got a bbl, took that shit out because she couldn’t run.", 
     "i had to do it to them, snipe!", 
     "i went judge judy on that pussy, snipe!", 
     "i’m not loyal to anybody, i’m a demon!", 
     "i have no loyalty for anyone.", 
     "never did, never will.",
     "shorty chose to be with a demon, sounds like her problem to me.",
     "ha ha. this shit ain’t nothing to me, man.", 
     "my money longer than james cameron.", 
     "on and off the court, straight fundamentals.",
     "no funny business.", 
     "this shit ain’t nothing to me man.",
     "moving like dracula, we get it back in blood, you see it?",
     "i really did this. i’m really him.",
     "flipped a whole brick into an empire, stop playing with me.", 
     "i have no sympathy.", 
     "i live for this shit.",
     "this shit ain’t nothing to me man, i’m nice widdit.",
     "ha ha.", 
     "my money long.",
     "my pockets deep.", 
     "no pocket-watchin’ in these parts.",
     "we straight gassin’, cuttin’, straight to the bricks."
];

const twelvefiftyfour : ReactNode[] = [
    "2tal: yes; the answer’s yes.",
"MB: a- and i’ll take you in the– in the b– in the beamer z4, yeah?", 
"MBSS: weed!!",
"2tal: sweet.",
"MB: i’ll take both y’all in it… [unintelligible]",
"MK: that– that german engineering, bro!",
"MB: i’ll get that german engin–",
"MBSS: weeeeeeeed!!",
"girl: oh you guys are smoking weed?",
"MBSS: oh you guys are smoking weed?",
"2tal: uh…no?, but…",
"MBSS: imma slide in right there…",
"2tal: you shouldn’t worry about it…",
"MK: y’all are missing out, man!",
"girl: not to be weird about it, but uh…",
"2tal: you shouldn't worry about it",
"MBSS: no filter…",
"girl: what’s up, snacks?",
"MB: i’m super, super vaccinated",
"2tal: my bad bro, that’s my bad…",
"Z: what are you fucking kids doing?",
"other girl: oh my god–",
"2tal: heyyyyy!!",
"MBSS: he’s here!? oh my god i was just thinking ‘bout you, man! how you doin–",
"Z: hey, guys.",
"MBSS: how you doing? so happy you’re here…"
] ;
const lyric_book = new Map();

lyric_book.set(12, leave);
lyric_book.set(6, outro);
lyric_book.set(7, twelvefiftyfour);

export default function Visualizer() {
  const [trackNumber, setTrackNumber] = useState("");
  let poop = [""];
  const [lyrics, setLyrics] = useState<ReactNode[]>(poop);
  useEffect(() => {
    setIndex(0);
  }, [trackNumber]);
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      if (e.key === "ArrowUp") {
        setIndex((prev) => prev - 1);
      } else if (e.key === "ArrowDown") {
        setIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  //(1), 6, 7, 8, 11, 12

  function getButtons() {
    const arr = ["6", "7", "8", "11", "12"];

    return (
      <div className="d-flex">
        {arr.map((item) => {
          return (
            <>
              <input
                className="m-1"
                type="radio"
                id={item}
                value={item}
                checked={trackNumber === item}
                onChange={(e) => {
                  setTrackNumber(e.target.value);
                  setLyrics(lyric_book.get(7));
                }}
              />
              <label style={{ color: "white" }} htmlFor={item}>
                &nbsp;{item}
              </label>
            </>
          );
        })}
      </div>
    );
  }

//   function grey(percent: number, line: ReactNode) {
//     const size = percent === 0.1 ? "x-large" : "xx-large";
//     return <div style={{ opacity: percent, fontSize: size }}>{line}</div>;
//   }

  return (
    <div style={{ color: "white" }}>
      {getBackground(black)}
      {getButtons()}
      <div
        className="d-flex"
        style={{
          position: "absolute",
          top: "300px",
          left: "75px",
          height: "100vh" /* Makes container full viewport height */,
          width: "90%" /* Specify a width less than 100% */,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            color: "white",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {" "}
          {/* {grey(0.1, lyrics[index - 2])}
          {grey(0.25, lyrics[index - 1])} */}
          <div
            style={{
              fontSize: "xx-large",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {lyrics[index]}
          </div>
          {/* {grey(0.25, lyrics[index + 1])}
          {grey(0.1, lyrics[index + 2])} */}
        </div>
      </div>
      <div>Index: {index}</div>
    </div>
  );
}
