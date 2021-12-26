import Header from "./Header";
import Backlink from "./Backlink";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { useRef, useEffect, useReducer } from "react";
import { postOrder } from "./../utilities/post.js";
import { useNavigate } from "react-router-dom";

function Creditcard() {
  // for redirecting users to the confirmation component after posting their order
  let navigate = useNavigate();
  const redirectToConfirmation = () => {
    console.log("redirectToConfirmation");
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
  const submitButton = useRef("");

  // useEffect functions are used for changing focus from one input to another
  useEffect(() => {
    if (state.number.length === 19) {
      cardNameRef.current.focus();
    }
  }, [state.number]);

  useEffect(() => {
    if (state.expiry.length === 5) {
      cardCvcRef.current.focus();
    }
  }, [state.expiry]);

  useEffect(() => {
    if (state.cvc.length === 3) {
      document.activeElement.blur();
    }
  }, [state.cvc]);

  // change state of card number input based on input value
  const handleNumberInput = (e) => {
    //setNumber(e.target.value);
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
          {/* card number input field starts here*/}
          <div className="line line_one">
            <label
              htmlFor="card-number"
              ref={cardNumberRef}
              className="label number"
            >
              Card number
            </label>
            <div className="input_wrapper">
              <MaskedInput
                mask={[
                  /[1-9]/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  " ",
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                autoFocus
                className={`form-control ${
                  state.numberErr ? "incomplete" : ""
                }`}
                placeholder="1234 5678 9012 3456"
                guide={false}
                value={state.number}
                id="card-number"
                name="number"
                inputMode="numeric"
                onChange={handleNumberInput}
                onBlur={handleNumberBlur}
              />
              <SuccessMessage show={state.number.length === 19} />
            </div>
            <ErrorMessage
              text={"Credit card number must be 16 digits"}
              show={state.numberErr}
            />
          </div>
          {/* card number input field ends here*/}

          {/* cardholder name input field starts here*/}
          <div className="line line_two">
            <label htmlFor="card-name" className="label name">
              Name on card
            </label>
            <div className="input_wrapper">
              <input
                type="text"
                name="name"
                className={`${state.nameErr ? "incomplete" : ""}`}
                id="card-name"
                placeholder="John Doe"
                ref={cardNameRef}
                value={state.name}
                onChange={handleNameInput}
                onBlur={handleNameBlur}
              />
              <SuccessMessage show={state.name.length > 2} />
            </div>
            <ErrorMessage
              text={"Please enter your name"}
              show={state.nameErr}
            />
          </div>
          {/* cardholder name input field ends here*/}

          <div className="line line_three">
            {/* card expiry input field starts here*/}
            <div className="column_one">
              <label
                htmlFor="card-expiry"
                className="label expiry"
                ref={cardExpiryRef}
              >
                Expiry date
              </label>
              <div className="input_wrapper">
                <MaskedInput
                  mask={[/[0-9]/, /\d/, "/", /\d/, /\d/]}
                  className={`form-control ${
                    state.expiryErr ? "incomplete" : ""
                  }`}
                  placeholder="04/23"
                  guide={false}
                  value={state.expiry}
                  id="card-expiry"
                  name="name"
                  inputMode="numeric"
                  onChange={handleExpiryInput}
                  onBlur={handleExpiryBlur}
                />
                <SuccessMessage show={state.expiry.length === 5} />
              </div>
              <ErrorMessage
                text={"Expiry date must be 4 digits"}
                show={state.expiryErr}
              />
            </div>
            {/* card expiry input field ends here*/}

            {/* security code input field starts here*/}
            <div className="column_two">
              <label htmlFor="card-cvc" className="label cvc" ref={cardCvcRef}>
                Security code
              </label>
              <div className="input_wrapper">
                <MaskedInput
                  mask={[/[0-9]/, /\d/, /\d/, /\d/]}
                  className={`form-control ${state.cvcErr ? "incomplete" : ""}`}
                  placeholder="123"
                  guide={false}
                  value={state.cvc}
                  id="card-cvc"
                  name="cvc"
                  inputMode="numeric"
                  onChange={handleCvcInput}
                  onBlur={handleCvcBlur}
                />
                <SuccessMessage show={state.cvc.length === 3} />
              </div>
              <ErrorMessage
                text={"Security code must be 3 digits"}
                show={state.cvcErr}
              />
            </div>
            {/* security code input field ends here*/}
          </div>

          {/* submit button starts here*/}
          <div className="line line_four">
            <button
              className="submit_btn"
              type="submit"
              ref={submitButton}
              onClick={handleSubmit}
            >
              order
            </button>
          </div>
          {/* submit button ends here*/}
        </form>
      </main>
    </section>
  );
}

export default Creditcard;
