import Header from "./Header";
import Backlink from "./Backlink";
import { useRef, useEffect, useReducer } from "react";
import { postOrder } from "./../utilities/post.js";
import { useNavigate } from "react-router-dom";
import Cardcvc from "./Cardcvc";
import Cardexpiry from "./Cardexpiry";
import Cardname from "./Cardname";
import Cardnumber from "./Cardnumber";

function Creditcard() {
  // for redirecting users to the confirmation component after posting their order
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    navigate("/confirmation");
  };

  const initialState = {
    number: "",
    numberErr: false,
    name: "",
    nameErr: false,
    expiry: "",
    expiryErr: false,
    cvc: "",
    cvcErr: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

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

      default:
        throw new Error();
    }
  }

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
    if (state.expiry.length === 5) {
      console.log(cardCvcRef);
      cardCvcRef.current.focus();
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

  // change state of card number input based on input value
  const handleNumberInput = (e) => {
    dispatch({ type: "number", data: e.target.value });
  };

  // if card number is incomplete when a user is changing focus of the input, set the numberErr state to true
  const handleNumberBlur = (e) => {
    dispatch({ type: "numberErr", data: e.target.value.length < 19 });
  };

  // change state of card expiry input based on input value
  const handleExpiryInput = (e) => {
    dispatch({ type: "expiry", data: e.target.value });
  };

  // if card expiry is incomplete when a user is changing focus of the input, set the expiryErr state to true
  const handleExpiryBlur = (e) => {
    dispatch({ type: "expiryErr", data: e.target.value.length < 5 });
  };

  // change state of cardholder name input based on input value (accepting only letters)
  const handleNameInput = (e) => {
    dispatch({
      type: "name",
      data: e.target.value.replace(/[^a-zA-Zæøå\s]*$/gi, ""),
    });
  };

  // if cardholder name contains less than 3 letters when a user is changing focus of the input, set the nameErr state to true
  const handleNameBlur = (e) => {
    dispatch({ type: "nameErr", data: e.target.value.length < 3 });
  };

  // change state of security code input based on input value
  const handleCvcInput = (e) => {
    dispatch({ type: "cvc", data: e.target.value });
  };

  // if security code is incomplete when a user is changing focus of the input, set the cvcErr state to true
  const handleCvcBlur = (e) => {
    dispatch({ type: "cvcErr", data: e.target.value.length < 3 });
  };

  const focusOnError = (errorField) => {
    errorField.current.focus();
  };

  const checkForErrors = () => {
    if (state.number.length < 19) {
      return cardNumberRef;
    } else if (state.name.length < 3) {
      return cardNameRef;
    } else if (state.expiry.length < 5) {
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
      await postOrder();
      redirectToConfirmation();
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
        <form>
          {/* card number input field */}
          <div className="line line_one">
            <Cardnumber
              number={state.number}
              err={state.numberErr}
              ref={cardNumberRef}
              handleNumberInput={handleNumberInput}
              handleNumberBlur={handleNumberBlur}
            />
          </div>

          {/* cardholder name input field*/}
          <div className="line line_two">
            <Cardname
              name={state.name}
              err={state.nameErr}
              ref={cardNameRef}
              handleNameInput={handleNameInput}
              handleNameBlur={handleNameBlur}
            />
          </div>

          <div className="line line_three">
            {/* card expiry input field */}
            <div className="column_one">
              <Cardexpiry
                expiry={state.expiry}
                err={state.expiryErr}
                ref={cardExpiryRef}
                handleExpiryInput={handleExpiryInput}
                handleExpiryBlur={handleExpiryBlur}
              />
            </div>

            {/* security code input field */}
            <div className="column_two">
              <Cardcvc
                cvc={state.cvc}
                err={state.cvcErr}
                ref={cardCvcRef}
                handleCvcInput={handleCvcInput}
                handleCvcBlur={handleCvcBlur}
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

export default Creditcard;
