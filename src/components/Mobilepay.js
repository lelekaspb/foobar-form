import Backlink from "./Backlink";
import Header from "./Header";
import { postOrder } from "./../utilities/post.js";
import { useNavigate } from "react-router-dom";

function Mobilepay(props) {
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    navigate("/confirmation");
  };

  const handleClick = async () => {
    const resp = await postOrder(props.order.items);
    if (resp) {
      props.setOrder({ ...props.order, id: resp.id });
      redirectToConfirmation();
    } else {
      alert("failed to post");
    }
  };

  return (
    <section className="Mobilepay">
      <Header />
      <main>
        <Backlink />
        <h1>payment</h1>
        <div className="picture">
          <img src="images/qr-code.png" alt="qr code" onClick={handleClick} />
        </div>
      </main>
    </section>
  );
}

export default Mobilepay;
