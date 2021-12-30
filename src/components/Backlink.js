import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Backlink() {
  // let navigate = useNavigate();
  // console.log(navigate);
  // useEffect(() => {
  //   console.log(navigate);
  // }, [navigate]);

  let location = useLocation();
  console.log(location);

  // let unlisten = history.listen(({ location, action }) => {
  //   console.log(action, location.pathname, location.state);
  // });
  return (
    <div className="Backlink">
      <Link className="link" to="/beers" state={location.state}>
        <img src="icons/arrow-back.svg" alt="chevron left" />
        Back to the menu
      </Link>
    </div>
  );
}

export default Backlink;
