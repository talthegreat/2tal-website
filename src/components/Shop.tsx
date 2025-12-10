import background_image from "/shop/grass-shadow-2.jpeg";
import { Button } from "react-bootstrap";
import "../App.css";
import { copyright } from "./SongMix.tsx";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import storeItems from "../data/items.json";
import { Link } from "react-router-dom";

//TODO: build the card's href field to construct a "contact me" form with the store item inputted in already
//important fields: name, address, venmo/zelle, phone number/email for shipping...
//...i wonder if i can build a shipping calculator? like, if i am just shipping a CD... how much money would that cost to ship in the US? internationally? could i provide the customer with a shipping estimate in real time?

export interface ShopItem {
  id: number;
  title: string;
  subtitle: string;
  price: number;
  image: string;
  remaining: number;
}

function Shop() {
  const { openCart, cartQuantity, increaseCartQuantity } = useShoppingCart();

  function item({ id, title, subtitle, price, image, remaining }: ShopItem) {
    function handleClick() {
      increaseCartQuantity(id);
      openCart();
      return;
    }

    return (
      <>
        {/**
         * TODO:
         *
         * DEPENDING ON HOW I WANT TO DO IT: the "#" in the <a> tags need to be replaced with whatever mechanism i implement that will get me paid. (paypal? venmo? contact me?) im thinking i could customize that content by a) adding a field to each Shop object with a link/info of some kind or b) write a function that takes in the title and the price fields and spits out some kind of custom link??
         */}
        <div className="p-3 mb-5 card-style" onClick={handleClick}>
          <img
            src={image}
            className="card-img-top shop-image"
            style={{ cursor: "pointer" }}
          />
          <div className="card-body p-2 btn" style={{ color: "white" }}>
            {/** the class "btn" makes all the text centered -- removing the class makes it left margined */}
            <h5 className="card-title fw-bold">{title}</h5>
            <p className="card-text">{subtitle}</p>
            <div className="btn btn-secondary">{"$" + price}</div>
            <p className="fst-italic py-2" style={{ fontSize: "10px" }}>
              {remaining} remaining
            </p>
          </div>
        </div>
      </>
    );
  }

  function shoppingCartButton() {
    return (
      <Button
        onClick={openCart}
        style={{ width: "3rem", height: "3rem", position: "relative" }}
        variant="outline-light"
        className="rounded-circle"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 576 512"
          fill="currentColor"
        >
          <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
        </svg>
        {cartQuantity === 0 ? null : (
          <div
            className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
            style={{
              color: "white",
              width: "1.5rem",
              height: "1.5rem",
              position: "absolute",
              bottom: 0,
              right: 0,
              transform: "translate(25%, 25%)",
            }}
          >
            {cartQuantity}
          </div>
        )}
      </Button>
    );
  }

  function displayStoreItems() {
    return (
      <>
        <div
          className="row container-md"
          style={{ justifyContent: "space-between" }}
        >
          <div className="col-12 col-md-2 m-4">{item(storeItems[0])}</div>
          <div className="col-12 col-md-2 m-4">{item(storeItems[1])}</div>
          <div className="col-12 col-md-2 m-4">{item(storeItems[2])}</div>
        </div>
        {/* <div
        className="row container-md"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-12 col-md-2 m-4">{item(storeItems[3])}</div>
        <div className="col-12 col-md-2 m-4">{item(storeItems[4])}</div>
        <div className="col-12 col-md-2 m-4">{item(storeItems[5])}</div>
      </div>
      <div
        className="row container-md"
        style={{ justifyContent: "space-between" }}
      >
        <div className="col-12 col-md-2 m-4">{item(storeItems[6])}</div>
      </div> */}
      </>
    );
  }

  return (
    <>
      {/* Background layer */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{
          backgroundImage: `url(${background_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(15px) brightness(0.9)",
          zIndex: -1,
          transform: "scale(1.2)", // slight zoom for effect
          transition: "background-image 0.6s ease-in-out",
        }}
      />
      <div style={{ position: "fixed", right: "1.4rem" }}>
        {shoppingCartButton()}
      </div>
      <h1>Shop under construction. Come back real soon!</h1>
      <h3>
        All shopping inquiries can be made
        <Link className="link m-2" to="/contact" style={{ color: "black" }}>
          here
        </Link>
        .
      </h3>
      {/* {displayStoreItems()} */}
      {copyright()}
    </>
  );
}

export default Shop;

// <div style={{ position: "fixed", right: "1.4rem" }}>
//   {shoppingCartButton()}
// </div>
// <h1>Store</h1>

{
  /* <Row md={2} xs={1} lg={3} className="g-3">
  {storeItems.map((item) => (
    <Col key={item.id}>
      {item(item)}
    </Col>
  ))}
</Row> */
}
