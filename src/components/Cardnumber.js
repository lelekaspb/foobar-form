import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardnumber = forwardRef((props, forwardedRef) => {
  return (
    <>
      <label htmlFor="card-number" ref={forwardedRef} className="label number">
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
          className={`form-control ${props.err ? "incomplete" : ""}`}
          placeholder="1234 5678 9012 3456"
          guide={false}
          value={props.number}
          id="card-number"
          name="number"
          inputMode="numeric"
          onChange={props.handleNumberInput}
          onBlur={props.handleNumberBlur}
        />
        <SuccessMessage show={props.number.length === 19} />
      </div>
      <ErrorMessage
        text={"Credit card number must be 16 digits"}
        show={props.err}
      />
    </>
  );
});

export default Cardnumber;
