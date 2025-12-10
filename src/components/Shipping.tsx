import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getBackground, copyright } from "./SongMix.tsx";
import background from "../assets/shipping-background-temp.jpg";
import "../ShippingForm.css";
import { useState } from "react";
import { CartItem } from "./CartItem.tsx";
import { Stack } from "react-bootstrap";
//import PayPal from "./PayPal";
import PayPalCheckout from "./PayPalCheckout.tsx";
import { type Rate, type Address } from "../utilities/ShippoAPIShipment.ts";
import ShippingListGroup from "./ShippingListGroup.tsx";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import storeItems from "../data/items.json";
import ShippingContactForm from "./ShippingContactForm.tsx";

interface Props {
  ref: React.RefObject<HTMLDivElement>;
}

export default function Shipping({ ref }: Props) {
  interface Form {
    last: string;
    first: string;
    email: string;
    phone: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: string;
    notes: string;
  }

  //TODO: PUT USER ADDRESS AND SHIPPING RATES IN LOCAL STORAGE

  const { cartItems } = useShoppingCart();
  const [rates, setRates] = useState<Rate[]>();
  const [selectedRate, setSelectedRate] = useState<Rate>();
  //const [verified, setVerified] = useState<Address>();
  const [verifying, setVerifying] = useState(false);
  //const [message, setMessage] = useState("");
  const [selectedListIndex, setSelectedListIndex] = useState(-1);
  const [selectedRadio, setSelectedRadio] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);

  const scrollBack = () => {
    if (ref.current) {
      if (window.innerWidth > 768) {
        ref.current.scrollTop = 0;
      } else {
        ref.current.scrollTo({
          top: ref.current.scrollHeight,
          behavior: "auto",
        });
      }
    }
  };

  function handleSelectedIndex(i: number) {
    setSelectedListIndex(i);
    if (rates) setSelectedRate(rates[i]);
  }

  const [form, setForm] = useState<Form>({
    last: "b",
    first: "b",
    email: "b@b.com",
    phone: "",
    street1: "606 S Allen St.",
    street2: "",
    city: "State College",
    state: "PA",
    zip: "16801",
    notes: "",
  });

  function backButton() {
    return (
      <Link to="/shop" style={{ color: "white", textDecoration: "none" }}>
        <Button variant="light" style={{ marginBottom: "15px" }}>
          Back to Shop
        </Button>
      </Link>
    );
  }

  const verifyAddress = async () => {
    //this is, so far, what i assume is all the information the Shippo API needs in order to validate the address. I dont want to send over more details than I have to.
    const res = await fetch("http://localhost:5012/api/verify-address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    let update_message;
    //client error checking TODO: re-test edge cases with a bunch of fucky address inputs
    if (data.error) {
      alert(data.error + " Please try again -- mind any typos!");
      //update_message = (data.error + " Please try again -- mind any typos!");
    } else if (!data.isComplete) {
      alert("Data appears incomplete. Please re-check all appropriate fields.");
      //update_message = "Data appears incomplete. Please re-check all appropriate fields.";
    } else {
      //setVerified(data);
      // alert("Address verified! 🎉");
      update_message = "Address verified! 🎉";
      return { data, update_message };
    }
  };

  async function getRates(verified_address: Address) {
    const res = await fetch("http://localhost:5012/api/get-rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(verified_address),
    });
    const data = await res.json();
    setRates(
      data.rates.sort(
        (a: Rate, b: Rate) => parseFloat(a.amount) - parseFloat(b.amount)
      )
    );
    //people.sort((a, b) => a.age - b.age); // Sort by age ascending
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setVerifying(true);
    const pack = await verifyAddress();
    await getRates(pack?.data);
    setVerifying(false);
    scrollBack();
    //alert(pack?.update_message);
  }

  function shippingInfo() {
    return (
      <>
        <section className="shipping" style={{ overflow: "hidden" }}>
          <form className="shipping-form" onSubmit={handleSubmit}>
            <h2 style={{ color: "black" }}>Checkout</h2>
            <hr />
            <div className="d-flex justify-content-center paypal">
              <Stack>
                {cartItems.map((item) => (
                  <CartItem key={item.id} {...item} />
                ))}
                {selectedRate ? (
                  <div className="text-end">
                    <span className="fst-italic">Shipping:&nbsp;</span>{" "}
                    {formatCurrency(parseFloat(selectedRate.amount))}
                  </div>
                ) : null}
                <div className="ms-auto fw-bold fs-5">
                  Total:{" "}
                  {formatCurrency(
                    cartItems.reduce((total, cartItem) => {
                      const item = storeItems.find((i) => i.id === cartItem.id);
                      return total + (item?.price || 0) * cartItem.quantity;
                    }, 0) + (selectedRate ? parseFloat(selectedRate.amount) : 0)
                  )}
                </div>
              </Stack>
            </div>
            <hr />
            {cartItems.length === 0 ? (
              <>
                Cart is empty. <br />
                {backButton()}
              </>
            ) : (
              prompts()
            )}
          </form>
        </section>
      </>
    );
  }

  function prompts() {
    return (
      <>
        Are you based in the Greater Boston area and want your package
        hand-delivered?
        <br />
        <small className="fst-italic text-muted">
          payment by cash or venmo
        </small>
        <br />
        <input
          type="radio"
          id="yes"
          name="location"
          value="yes"
          checked={selectedRadio === "yes"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
        <label htmlFor="yes">&nbsp;Yes</label>
        <br />
        <input
          type="radio"
          id="no"
          name="location"
          value="no"
          checked={selectedRadio === "no"}
          onChange={(e) => setSelectedRadio(e.target.value)}
        />
        <label htmlFor="no">&nbsp;No</label>
        {selectedRadio === "no" && shippingInfoInput()}
      </>
    );
  }

  function shippingInfoInput() {
    return (
      <>
        {/* Last Name, First Name*/}
        <div className="d-flex">
          <div className="input-box w-50" style={{ marginRight: "5px" }}>
            <input
              type="text"
              className="field"
              placeholder="Last name"
              name="last"
              autoComplete="family-name"
              onChange={(e) => setForm({ ...form, last: e.target.value })}
              // required
            />
          </div>
          <div className="input-box w-50" style={{ marginLeft: "5px" }}>
            <input
              type="text"
              className="field"
              placeholder="First name"
              name="first"
              autoComplete="given-name"
              onChange={(e) => setForm({ ...form, first: e.target.value })}
              // required
            />
          </div>
        </div>
        <div className="input-box">
          <input
            type="email"
            className="field"
            placeholder="Email address"
            name="email"
            autoComplete="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            // required
          />
        </div>
        <div className="input-box">
          <input
            type="tel"
            className="field"
            placeholder="Phone number (optional)"
            name="tel"
            autoComplete="tel"
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>
        {/* Address */}
        <div className="input-box">
          <input
            type="text"
            className="field"
            placeholder="Address"
            name="address"
            autoComplete="address-line1"
            onChange={(e) => setForm({ ...form, street1: e.target.value })}
            // required
          />
        </div>
        <div className="input-box">
          <input
            type="text"
            className="field"
            placeholder="Apartment, suite, etc. (optional)"
            name="apt"
            autoComplete="address-line2"
            onChange={(e) => setForm({ ...form, street2: e.target.value })}
          />
        </div>
        {/* City, State, Zip 
            TODO: add a className and CSS styling that makes all these input fields one on top of the other on a phone instead of side-by-side. also, look up "type" input fields: state? zip? also how do i give the program this data, aka assign a variable to the user input? (should be easy)*/}
        <div className="inline-field">
          <div className="input-box r">
            <input
              type="text"
              className="field"
              placeholder="City"
              name="city"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              // required
            />
          </div>
          <div className="input-box c">
            <input
              type="text"
              className="field"
              placeholder="State"
              name="state"
              onChange={(e) => setForm({ ...form, state: e.target.value })}
              // required
            />
          </div>
          <div className="input-box l">
            <input
              type="text"
              className="field"
              placeholder="Zip code"
              name="zip"
              autoComplete="postal-code"
              onChange={(e) => setForm({ ...form, zip: e.target.value })}
              // required
            />
          </div>
        </div>
        {/* Notes? */}
        <div className="input-box">
          <textarea
            className="field mess"
            placeholder="Notes (optional)"
            name="message"
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
          />
        </div>
        <button type="submit">
          {!verifying ? (
            "Verify Address"
          ) : (
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
        </button>
      </>
    );
  }

  // function shippingImagesDisplay() {
  //   return (
  //     <>
  //       TODO: I have to take the CartItems as a prop to this component: the
  //       images of the products, and their quantities, and display them here to
  //       the right of the form. in the CSS, if we're on a phone, the images
  //       shouldn't be displayed at all.
  //       <br />
  //       <br />
  //       TODO: I have to edit the styling on the form, I also have to add
  //       important relevant fields (name, street, city, state, postal_code,
  //       country) while also adding a check box prior to all of that basically
  //       saying "if you live in around cambridge and you want me to hand it to
  //       you directly, check this box, and you don't need to include any address
  //       information and also shipping price = $0" and that will "disable"
  //       (inactive) all the other relevant address fields and nullify the address
  //       verifier/shipping calculator. but i WILL have to take email/phone so i
  //       can be sure i can contact the customer with meeting date/time for the
  //       handoff/transaction. (maybe even a "note" field too (similar to the
  //       Contact component) where people can just say shit)
  //       <br />
  //       <br />
  //       also how tf do i get rid of this navbar here??? 1st pass solution
  //       thought: put a boolean useState call in the App component, if the user
  //       is on the shipping page, then i flip the value of the variable, which
  //       triggers a className edit in the navBar component to flip a "display:
  //       visible" CSS in the navbar????
  //       <br />
  //       <br />
  //       nvm i figured it out: react-router-dom useLocation hook in the App
  //       component
  //       <br />
  //       <br />
  //       after "verify address" is clicked and the API verifies the address,
  //       another button pops up that says "pay and checkout" or something... i
  //       gotta get paypal working... maybe even venmo API???? that would be
  //       easy... and after all of it goes through and is done, i have to
  //       disappear the user-provided info from the respected fields and also
  //       scrub that information from my program
  //       <br />
  //       <br />
  //       payment type: IF SHIPPING: paypal or venmo IF NOT SHIPPING: paypal or
  //       venmo or cash. I GOTTA DRAW OUT THE EDGE CASES
  //     </>
  //   );
  // }

  const handlePaymentSuccess = () => {
    //TODO: Shippo API LABEL

    setShowSuccess(true);

    // Remove PayPal buttons after UI updates
    requestAnimationFrame(() => {
      setRates(undefined);
      setSelectedRate(undefined);
    });
  };

  function successMessage() {
    return (
      <div>
        <h3>Purchase Successful. 🎉</h3>
        <p>
          {" "}
          A confirmation email has been sent to {form.email}. Thank you for your
          support!
        </p>
      </div>
    );
  }
  return (
    <>
      {getBackground(background)}
      {backButton()}
      <div className="d-flex justify-space-between row">
        <div className="col-12 col-md-6">{shippingInfo()}</div>
        <div className="col-12 col-md-6">
          {selectedRadio === "no" && (
            <ShippingListGroup
              rates={rates}
              selectedIndex={selectedListIndex}
              setSelectedIndex={handleSelectedIndex}
            />
          )}
          {showSuccess && successMessage()}
          {selectedRate ? (
            <div style={{ marginTop: "30px" }}>
              <PayPalCheckout
                rate={parseFloat(selectedRate.amount)}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          ) : null}
          {selectedRadio === "yes" && (
            <div className="shipping-contact">
              <ShippingContactForm />
            </div>
          )}
        </div>
      </div>
      {copyright()}
    </>
  );
}
