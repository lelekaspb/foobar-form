import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Confirmation(props) {
  let navigate = useNavigate();
  const redirectToLanding = () => {
    navigate("/");
  };

  const beerItems = props.order.map((beer, index) => {
    return <span key={index}>{`${beer.amount}x   ${beer.name}`}</span>;
  });

  useEffect(() => {
    setTimeout(() => {
      redirectToLanding();
      props.clearState();
    }, 15000);
  });

  return (
    <section className="Confirmation">
      <Header />
      <main>
        <div className="message">
          <h1>Thank you!</h1>
          <p>
            Your order has now been received by our staff and it will arrive
            shortly.
          </p>
        </div>
        <article id="order">
          <div className="wrapper">
            <h2>{`order #${props.id}`}</h2>
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
