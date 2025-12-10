import tal from "/contact-background-temp.jpg";
import max from "../assets/home-images/max.jpg";
import douglas from "../assets//home-images/douglas.jpeg";
import lucy from "../assets//home-images/lucy.jpeg";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";

export interface Collaborator {
  level: number;
  heading: string;
  img: string;
  subtitle: string;
  paragraphs: string[];
  //links will be rendered in a <p> and therefore cannot contain <div>s
  links?: ReactNode[];
}

const two_tal = {
  heading: "How Tall Is 2tal?",
  level: 1,
  img: tal,
  subtitle: "2tal contains multitudes.",
  paragraphs: [
    "ulti-talented, multi-media, multi-instrumental, 2tal's creative proclivities are known to know no bounds.",
    "His DJ sets span from the student-organized house parties of Amherst, to the rat capital of Boston, to the upper eschelon of clubs in Delhi and Goa.",
    "He also built this entire website by hand using React.",
  ],
};

const digitalgirlfriend = {
  heading: "digitalgirlfriend",
  level: 3,
  img: max,
  subtitle: "The parasocial powerhouse.",
  paragraphs: [
    "Working tirelessly to reshape the sounds of nightlife in Boston and NYC, digitalgirlfriend has been leading the charge to revive the magic of the club scene from days past. Stay tuned -- there is more music on the way.",
    "digitalgirlfriend is included on tracks 1, 3, 4, 6, 7, 9, and 10 of 'views', and he mastered the whole album.",
  ],
  links: [
    <a
      href="https://digitalgirlfriend.online/"
      style={{ color: "white" }}
      target="_blank"
    >
      digitalgirlfriend.online
    </a>,
  ],
};

const douglas_appleman = {
  heading: "Douglas Appleman",
  level: 3,
  img: douglas,
  subtitle: "Douglas is the MAN.",
  paragraphs: [
    "Since an early age, Douglas has been the embodiment of musical talent and skill. As a singer-songwriter and pianist, he performs his original music (with 2tal on drums!) in venues in the Greater Boston area to local crowds and adoring fans. As a student of music and a multi-instrumentalist, he also teaches music to students of all ages. What can't he do?",
    "Douglas is featured on tracks 2 and 8 of 'views'.",
  ],
  links: [
    <Link className="link" to="/media" style={{ color: "white" }}>
      More about 2tal and Douglas
    </Link>,
    <a
      href="https://douglas-appleman.com/"
      style={{ color: "white" }}
      target="_blank"
    >
      douglas-appleman.com
    </a>,
  ],
};

const lucy_frost = {
  heading: "Lucy Frost",
  level: 3,
  img: lucy,
  subtitle: "West coast menace.",
  paragraphs: [
    "A singer-songwriter, composer, and pianist, Lucy Frost has long been the secret weapon behind the success of written musical works by other artists, now finally coming into her own solo art project. Since moving to LA from Boston, she has released a handful of classics, demonstrating a strong artistic voice and bicoastal fluency.",
    "Lucy is featured on track 8 of 'views'.",
  ],
  links: [
    <a
      href="https://linktr.ee/lucyfrost?utm_source=linktree_profile_share&ltsid=de76a982-e690-4ad1-8846-2f5e07567720"
      style={{ color: "white" }}
      target="_blank"
    >
      More from Lucy Frost
    </a>,
  ],
};

export const collaborators = [
  two_tal,
  digitalgirlfriend,
  douglas_appleman,
  lucy_frost,
];
