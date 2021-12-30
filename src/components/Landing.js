import { Link } from "react-router-dom";
import Header from "./Header";

function Landing() {
  return (
    <div className="Landing">
      <Header />
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

export default Landing;
