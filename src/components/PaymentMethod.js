import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

export default function PaymentMethod({
  cartItems,
  buildOrder,
  error,
  setError,
}) {
  const [payment, setPayment] = useState("");

  let navigate = useNavigate();
  const redirectToPayment = () => {
    navigate(`/${payment}`);
  };

  // Checking if there are beers in the cart and if a payment method selected
  function pay() {
    if (cartItems.length === 0) {
      console.log("error: no items in the cart");
      setError({ ...error, cart: true });
    } else if (payment === "") {
      console.log("error: no payment method selected");
      setError({ ...error, payment: true });
    } else {
      buildOrder();
      redirectToPayment();
    }
  }

  return (
    <article className="PaymentMethod">
      <p>Please choose a payment method</p>
      <section>
        <button
          className={`methods ${
            payment === "Creditcard" ? "chosenMethod" : ""
          }`}
          onClick={() => {
            setPayment("Creditcard");
            setError({ ...error, payment: false });
          }}
        >
          <img src="icons/creditcard-logo.svg" alt="Credit card icon" />
        </button>
        <button
          className={`methods ${payment === "Mobilepay" ? "chosenMethod" : ""}`}
          onClick={() => {
            setPayment("Mobilepay");
            setError({ ...error, payment: false });
          }}
        >
          <img src="icons/mobilepay-logo.svg" alt="Mobile pay icon" />
        </button>
      </section>
      {/* <p>{errorMessage}</p> */}
      <ErrorMessage
        text={
          error.cart ? "Please select a beer" : "Please select payment method"
        }
        show={error.cart || error.payment ? true : false}
      />

      <nav>
        <button className="pay" onClick={pay}>
          Pay
        </button>
      </nav>
    </article>
  );
}
