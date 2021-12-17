import Header from "./Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Confirmation() {
  let navigate = useNavigate();
  const redirectToLanding = () => {
    console.log("redirectToLanding");
    navigate("/");
  };

  const response = JSON.parse(localStorage.getItem("response"));
  const order = JSON.parse(localStorage.getItem("order"));
  const beerItems = order.map((beer, index) => {
    return <span key={index}>{`${beer.amount}x   ${beer.name}`}</span>;
  });

  useEffect(() => {
    setTimeout(() => {
      localStorage.removeItem("order");
      localStorage.removeItem("response");
      redirectToLanding();
    }, 15000);
  });

  return (
    <section className="Confirmation">
      <Header />
      <main>
        <div className="message">
          <h1>Thank you!</h1>
          <p>Your order has now been received by our staff and it will arrive shortly.</p>
        </div>
        <article id="order">
          <div className="wrapper">
            <h2>{`order #${response.id}`}</h2>
            <div className="beers">{beerItems}</div>
          </div>
        </article>
        <div className="picture">
          <img src="images/thankyou-drawing.svg" alt="thank you drawing" />
        </div>
      </main>
    </section>
  );
}

export default Confirmation;
