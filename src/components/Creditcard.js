import Backlink from "./Backlink";
import Header from "./Header";
import Cardcvc from "./Cardcvc";
import Cardexpiry from "./Cardexpiry";
import Cardname from "./Cardname";
import Cardnumber from "./Cardnumber";
import { useRef, useEffect, useReducer, useState } from "react";
import { postOrder } from "./../utilities/post.js";
import { useNavigate } from "react-router-dom";

function Creditcard({ order, setOrder }) {
  // for redirecting users to the confirmation component after posting their order
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    navigate("/confirmation");
  };

  // for storing screen size
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  // for tracking screen size changes
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // initial state object for storing credit card information
  const initialState = {
    number: "",
    numberErr: false,
    name: "",
    nameErr: false,
    expiry: "",
    expiryErr: false,
    expiryInvalid: false,
    cvc: "",
    cvcErr: false,
  };

  // useReducer hook for updating the credit card information state
  const [state, dispatch] = useReducer(reducer, initialState);

  // reducer function for checking which property of the state has to be updated
  function reducer(state, action) {
    switch (action.type) {
      case "number":
        return { ...state, number: action.data };
      case "numberErr":
        return { ...state, numberErr: action.data };
      case "name":
        return { ...state, name: action.data };
      case "nameErr":
        return { ...state, nameErr: action.data };
      case "expiry":
        return { ...state, expiry: action.data };
      case "expiryErr":
        return { ...state, expiryErr: action.data };
      case "cvc":
        return { ...state, cvc: action.data };
      case "cvcErr":
        return { ...state, cvcErr: action.data };
      case "expiryInvalid":
        return { ...state, expiryInvalid: action.data };

      default:
        throw new Error();
    }
  }

  const validateExpiry = (expiry) => {
    const d = new Date();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;

    if (
      expiry.split("/")[0] > 12 ||
      (parseInt(expiry.split("/")[0]) < month &&
        parseInt(expiry.split("/")[1]) === year) ||
      expiry.split("/")[1] > year + 10 ||
      expiry.split("/")[1] < year
    ) {
      dispatch({ type: "expiryErr", data: true });
      dispatch({ type: "expiryInvalid", data: true });
      return false;
    } else {
      dispatch({ type: "expiryInvalid", data: false });
      return true;
    }
  };

  // refs for accessing input elements
  const cardNumberRef = useRef("");
  const cardExpiryRef = useRef("");
  const cardCvcRef = useRef("");
  const cardNameRef = useRef("");

  // useEffect functions are used for changing focus from one input to another
  useEffect(() => {
    if (state.number.length === 19) {
      cardNameRef.current.focus();
    }
  }, [state.number]);

  useEffect(() => {
    if (state.expiry.length === 7) {
      const isCorrect = validateExpiry(state.expiry);
      if (isCorrect) {
        cardCvcRef.current.focus();
      }
    }
  }, [state.expiry]);

  useEffect(() => {
    if (state.cvc.length === 3) {
      document.activeElement.blur();
    }
  }, [state.cvc]);

  // for hiding error message under the name field
  useEffect(() => {
    if (state.name.length > 2) {
      dispatch({ type: "nameErr", data: false });
    }
  }, [state.name]);

  // focus on incorrectly filled in input
  const focusOnError = (errorField) => {
    errorField.current.focus();
  };

  // check if there is any input that has been filled in incorrectly
  const checkForErrors = () => {
    if (state.number.length < 19) {
      return cardNumberRef;
    } else if (state.name.length < 3) {
      return cardNameRef;
    } else if (state.expiry.length < 7) {
      return cardExpiryRef;
    } else if (state.cvc.length < 3) {
      return cardCvcRef;
    }
  };

  // when a user clicks on the "order" button, check for errors
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorField = checkForErrors();
    if (!errorField) {
      // if all input fields are filled in correctly, post order and redirect the user to the confirmation page(component)
      const resp = await postOrder(order.items);
      if (resp) {
        setOrder({ ...order, id: resp.id });
        redirectToConfirmation();
      } else {
        alert("failed to post");
      }
    } else {
      // if there is an error in input values, change focus to the incorrectly filled in input field
      focusOnError(errorField);
    }
  };

  return (
    <section className="Creditcard">
      <Header />
      <main>
        <Backlink />
        <h1>payment</h1>
        <form autoComplete={windowDimensions.width < 600 ? "on" : "off"}>
          {/* card number input field */}
          <div className="line line_one">
            <Cardnumber
              number={state.number}
              err={state.numberErr}
              ref={cardNumberRef}
              handleInput={(e) => {
                dispatch({ type: "number", data: e.target.value });
              }}
              handleBlur={(e) => {
                dispatch({
                  type: "numberErr",
                  data: e.target.value.length < 19,
                });
              }}
              windowDimensions={windowDimensions}
            />
          </div>

          {/* cardholder name input field*/}
          <div className="line line_two">
            <Cardname
              name={state.name}
              err={state.nameErr}
              ref={cardNameRef}
              handleInput={(e) => {
                dispatch({
                  type: "name",
                  data: e.target.value.replace(/[^a-zA-Z??????\s]*$/gi, ""),
                });
              }}
              handleBlur={(e) => {
                dispatch({ type: "nameErr", data: e.target.value.length < 3 });
              }}
              windowDimensions={windowDimensions}
            />
          </div>

          <div className="line line_three">
            {/* card expiry input field */}
            <div className="column_one">
              <Cardexpiry
                expiry={state.expiry}
                err={state.expiryErr}
                invalid={state.expiryInvalid}
                ref={cardExpiryRef}
                handleInput={(e) => {
                  dispatch({ type: "expiry", data: e.target.value });
                }}
                handleBlur={(e) => {
                  dispatch({
                    type: "expiryErr",
                    data: e.target.value.length < 7,
                  });
                }}
                windowDimensions={windowDimensions}
              />
            </div>

            {/* security code input field */}
            <div className="column_two">
              <Cardcvc
                cvc={state.cvc}
                err={state.cvcErr}
                ref={cardCvcRef}
                handleInput={(e) => {
                  dispatch({ type: "cvc", data: e.target.value });
                }}
                handleBlur={(e) => {
                  dispatch({ type: "cvcErr", data: e.target.value.length < 3 });
                }}
                windowDimensions={windowDimensions}
              />
            </div>
          </div>

          {/* submit button */}
          <div className="line line_four">
            <button className="submit_btn" type="submit" onClick={handleSubmit}>
              order
            </button>
          </div>
        </form>
      </main>
    </section>
  );
}

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export default Creditcard;
