import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

function PaymentMethod({ cartItems, order, setOrder, error, setError }) {
  const [payment, setPayment] = useState("");

  let navigate = useNavigate();
  const redirectToPayment = () => {
    navigate(`/${payment}`);
  };

  const buildOrder = () => {
    const counts = [];
    const uniqueBeers = [];
    const ordered = [];
    // Counting how many beers of each type is in the order
    cartItems.forEach((item) => {
      counts[item.name] = (counts[item.name] || 0) + 1;
      // Adding unique beers to an array
      if (counts[item.name] === 1) {
        uniqueBeers.push(item);
      }
    });
    // Building the order for posting
    uniqueBeers.forEach((elem) => {
      const oneBeerType = { name: elem.name, amount: counts[elem.name] };
      ordered.push(oneBeerType);
    });
    // set order state
    setOrder({ ...order, items: ordered });
  };

  // Checking if there are beers in the cart and if a payment method selected
  const pay = () => {
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
  };

  return (
    <article className="PaymentMethod">
      <p>Please choose a payment method</p>

      <section>
        <button
          className={`methods ${
            payment === "creditcard" ? "chosenMethod" : ""
          }`}
          onClick={() => {
            setPayment("creditcard");
            setError({ ...error, payment: false });
          }}
        >
          <img src="icons/creditcard-logo.svg" alt="Credit card icon" />
        </button>
        <button
          className={`methods ${payment === "mobilepay" ? "chosenMethod" : ""}`}
          onClick={() => {
            setPayment("mobilepay");
            setError({ ...error, payment: false });
          }}
        >
          <img src="icons/mobilepay-logo.svg" alt="Mobile pay icon" />
        </button>
      </section>

      <ErrorMessage
        text={
          error.cart
            ? "You need to select at least one beer"
            : "Please select payment method"
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

export default PaymentMethod;
