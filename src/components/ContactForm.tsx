import "../ContactForm.css";
import Social from "./Social";

function ContactForm() {

  const MAX_FILE_SIZE = 400 * 1024 * 1024; // 400 MB

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large! Maximum size is 400MB.");
      e.target.value = ""; // Clear the file input
      return;
    }

    console.log("File accepted:", file);
  };

  return (
    <section className="contact" style={{ overflow: "hidden"}}>
      <form className= "contact-form" style={{ maxWidth: "600px"}}>
        <h2 style={{ color: "black"}}>Contact Form</h2>
        <div style={{ marginTop: "-20px"}}>
        <Social className="nav nav-underline justify-content-center py-3" w={1.5}/>
        <hr/>
        </div>
        <div className="input-box">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            className="field"
            placeholder="Enter your name"
            id="name"
            name="name"
            autoComplete="name"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="field"
            placeholder="Enter your email"
            id="email"
            name="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="input-box">
          <label htmlFor="message">Your Message</label>
          <textarea
            className="field mess"
            placeholder="Enter your message"
            id="message"
            name="message"
            required
          />
        </div>
        <div className="input-box" style={{ marginBottom: "7px" }}>
          <label htmlFor="files">Files (Optional) (400MB limit)</label>
        </div>
        <input
          type="file"
          id="files"
          name="files"
          style={{ color: "rgba(255, 255, 255, 0.58)" }}
          onChange={handleFileChange}
        />
        <button type="submit">Send Message</button>
      </form>
    </section>
  );
}

export default ContactForm;
