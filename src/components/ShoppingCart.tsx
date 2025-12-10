import { Offcanvas, Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext.tsx";
import { formatCurrency } from "../utilities/formatCurrency.ts";
import storeItems from "../data/items.json";
import { CartItem } from "./CartItem.tsx";
import { Link } from "react-router-dom";
type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();
  return (
    <Offcanvas
      show={isOpen}
      onHide={closeCart}
      placement="end"
      className="custom-offcanvas"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack style={{ gap: "1.5rem" }}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            Total:{" "}
            {formatCurrency(
              cartItems.reduce((total, cartItem) => {
                const item = storeItems.find((i) => i.id === cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity;
              }, 0)
            )}
          </div>
          <div
            className="ms-auto fs-7 text-muted"
            style={{ fontSize: ".75rem", position: "relative" }}
          >
            Additional shipping costs may be calculated in next step
          </div>
          <div className="mt-auto">
            {cartItems.length !== 0 ? (
              <Link
                to="/shipping"
                style={{ color: "white", textDecoration: "none" }}
              >
                <Button className="w-100" onClick={closeCart}>Checkout</Button>
              </Link>
            ) : null}
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
