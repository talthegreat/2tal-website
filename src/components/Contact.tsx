import ContactForm from "./ContactForm";
import { getBackground, copyright } from "./SongMix";
import background from "/contact-background-temp.jpg";

function Contact() {
  return (
    <>
      {getBackground(background)}
      {/* <h1 className="px-4">This is the Contact component</h1> */}
      <ContactForm />
      {copyright()}
    </>
  );
}

export default Contact;
