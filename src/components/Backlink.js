import { Link, useNavigate } from "react-router-dom";

function Backlink() {
  let navigate = useNavigate();
  return (
    <div className="Backlink">
      <Link className="link" to="/beers">
        <img src="icons/arrow-back.svg" alt="chevron left" />
        Back to the menu
      </Link>
    </div>
  );
}

export default Backlink;
