import background_image from "/media-background-temp.jpg";
import { getBackground, copyright } from "./SongMix";

function Media() {
  return (
    <>
      {getBackground(background_image)}
      <h1 className="px-4">Media under construction. Stay tuned!</h1>
      {/* <ul>
        <li>55 in august link</li>
        <li>
          videos of me with douglas, and a link to douglas' site, the EP my
          drums are featured on
        </li>
        <ul>
          <li>i.e flim</li>
        </ul>
        <li>Conni3's song with my drums?? if those are really my drums?</li>
        <li>random pics and videos?? wouldnt these just be on IG?</li>
        <li>trust me stuff whenever it appears</li>
      </ul> */}
      {copyright()}
    </>
  );
}

export default Media;
