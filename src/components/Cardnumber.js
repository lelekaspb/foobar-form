import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardnumber = forwardRef(
  (
    { number, err, handleNumberInput, handleNumberBlur, windowDimensions },
    forwardedRef
  ) => {
    return (
      <>
        <label
          htmlFor="card-number"
          ref={forwardedRef}
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
            className={`form-control ${err ? "incomplete" : ""}`}
            placeholder="1234 5678 9012 3456"
            autoComplete={windowDimensions.width < 600 ? "cc-number" : "off"}
            guide={false}
            value={number}
            id="card-number"
            name="number"
            inputMode="numeric"
            onChange={handleNumberInput}
            onBlur={handleNumberBlur}
          />
          <SuccessMessage show={number.length === 19} />
        </div>
        <ErrorMessage
          text={"Credit card number must be 16 digits"}
          show={err}
        />
      </>
    );
  }
);

export default Cardnumber;
