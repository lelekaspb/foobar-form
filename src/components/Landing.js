import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(navigate);
  }, [navigate]);

  return (
    <div className="Landing">
      <img className="mainLogo" src="icons/foobar-logo.svg" alt="Foobar logo" />
      <div className="lure">
        <h1>
          Locally <br /> brewed <span>beer</span>
        </h1>
        <img src="images/beers-png/elhefe.png" alt="Glass of beer" />
      </div>
      <nav>
        <Link className="order-now" to="/beers">
          Order now
        </Link>
      </nav>
    </div>
  );
}
