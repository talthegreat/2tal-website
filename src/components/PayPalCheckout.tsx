// PayPalCheckout.tsx
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useShoppingCart } from "../context/ShoppingCartContext";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface PayPalCheckoutProps {
  rate: number;
  onSuccess: (x: OrderCaptureResponse | null) => void; // Parent callback for purchase success
}

interface PayPalCaptureData {
  orderID: string;
  // Add more fields if needed
}

interface OrderCaptureResponse {
  id: string;
  status: string;
  // Include any additional fields your backend returns
}

const PayPalCheckout: React.FC<PayPalCheckoutProps> = ({ rate, onSuccess }) => {
  //const navigate = useNavigate();
  const { cartItems, cleanCart } = useShoppingCart();
  const [successDetails, setSuccessDetails] = useState<OrderCaptureResponse | null>(null);

  const initialOptions = {
    clientId:
      "AeNhlK771PYSXrUZDk1xZeeUH6iQWeZZr9FfDzC-vM5554pc20rcsmCVcxE14fkYF-YcCN6_zd8f2oRJ",
    "enable-funding": "venmo",
  };

  // Create order
  const createOrder = async () => {
    try {
      const response = await fetch("http://localhost:5012/api/create-paypal-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cart: cartItems,
          rate: rate,
        }),
      });

      const orderData = await response.json();

      if (!orderData.id) {
        const errorDetail = orderData.details?.[0];
        const errorMessage = errorDetail
          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
          : "Unexpected error occurred, please try again.";
        throw new Error(errorMessage);
      }

      return orderData.id;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
      throw error;
    }
  };

  // On approval
  const onApprove = async (data: PayPalCaptureData) => {
    try {
      const response = await fetch(
        `http://localhost:5012/api/orders/${data.orderID}/capture`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: data.orderID }),
        }
      );

      const details: OrderCaptureResponse = await response.json();
      setSuccessDetails(details);

      // Clear cart
      localStorage.clear();
      cleanCart();
      //setCartItems([]);

      // Notify parent component
      onSuccess(successDetails);
    } catch (error) {
      console.error("Error capturing PayPal order:", error);
      throw error;
    }
  };

  return (
    <div>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalCheckout;
