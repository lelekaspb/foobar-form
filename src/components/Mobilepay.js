import Backlink from "./Backlink";
import { postOrder } from "./../utilities/post.js";
import { Link, useNavigate } from "react-router-dom";

function Mobilepay(props) {
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    navigate("/confirmation");
  };

  const handleClick = async () => {
    const resp = await postOrder(props.order);
    if (resp) {
      props.setOrderID(resp.id);
      redirectToConfirmation();
    } else {
      alert("failed to post");
    }
  };

  return (
    <section className="Mobilepay">
      {/* <Header /> */}
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
