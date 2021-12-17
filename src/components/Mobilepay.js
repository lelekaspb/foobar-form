import Header from "./Header";
import Backlink from "./Backlink";
import { postOrder } from "./../utilities/post.js";
import { Link, useNavigate } from "react-router-dom";

function Mobilepay() {
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    console.log("redirectToConfirmation");
    navigate("/confirmation");
  };

  const handleClick = async () => {
    await postOrder();
    redirectToConfirmation();
  };

  return (
    <section className="Mobilepay">
      <Header />
      <main>
        <Backlink />
        <h1>payment</h1>
        <div className="picture">
          <Link to="/">
            <img src="images/qr-code.png" alt="qr code" onClick={handleClick} />
          </Link>
        </div>
      </main>
    </section>
  );
}

export default Mobilepay;
