export default function ShippingContactForm() {
  return (
    <>
      <section className="contact" style={{ overflow: "hidden" }}>
        <form className="contact-form">
          <h2 style={{ color: "black" }}>Order Form</h2>
          <div style={{ marginTop: "-20px" }}></div>
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
            <label htmlFor="message">Notes</label>
            <textarea
              className="field mess"
              placeholder="(optional)"
              id="message"
              name="message"
            />
          </div>
          <hr />
          <span className="fst-italic">
            Expect an email confirming that your order was recieved, and further
            correspondence regarding order fulfilment.
          </span>
          {/* TODO: code an onSubmit function that takes all this data PLUS the CARTITEMS and sends them to me

            TODO: i gotta take items.json and put it in the SERVER. that way, ppl can't change item prices in the browser. i also have to finalize RATE and TRANSACTION in shippo with RATE ID. 
            
            */}
          <button type="submit">Place Order</button>
        </form>
      </section>
    </>
  );
}
