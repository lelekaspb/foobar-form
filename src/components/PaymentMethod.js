import { useState } from "react";
import { Link } from "react-router-dom";

export default function PaymentMethod({
  cartItems,
  errorMessage,
  setErrorMessage,
  buildOrder,
}) {
  const [chosen, setChosen] = useState("");
  const [creditCardClass, setCreditCardClass] = useState("methods");
  const [mobilePayClass, setMobilePayClass] = useState("methods");

  // Updating the state of chosen payment method
  function chosenMethod(method) {
    if (cartItems.length === 0) {
      setErrorMessage("You need to select the beers");
    } else {
      console.log("Chosen payment method is:", method);
      setChosen(method);
      setErrorMessage("");

      // Styling payment methods buttons
      if (method === "/creditcard") {
        setCreditCardClass("methods chosenMethod");
        setMobilePayClass("methods");
      }
      if (method === "/mobilepay") {
        setMobilePayClass("methods chosenMethod");
        setCreditCardClass("methods");
      }
    }
  }

  // Checking if there are beers in the cart and if a payment method selected
  function pay() {
    if (cartItems.length === 0) {
      setErrorMessage("You need to select the beers");
    } else if (chosen === "") {
      setErrorMessage("You need to choose a payment method");
    } else {
      buildOrder();
    }
  }

  return (
    <article className="PaymentMethod">
      <p>Please choose a payment method</p>
      <section>
        <button
          className={creditCardClass}
          onClick={() => chosenMethod("/creditcard")}
        >
          <img src="icons/creditcard-logo.svg" alt="Credit card icon" />
        </button>
        <button
          className={mobilePayClass}
          onClick={() => chosenMethod("/mobilepay")}
        >
          <img src="icons/mobilepay-logo.svg" alt="Mobile pay icon" />
        </button>
      </section>
      <p>{errorMessage}</p>

      <nav>
        <Link to={chosen}>
          <button className="pay" onClick={pay}>
            Pay
          </button>
        </Link>
      </nav>
    </article>
  );
}
