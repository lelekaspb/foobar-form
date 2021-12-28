import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardcvc = forwardRef((props, forwardedRef) => {
  return (
    <>
      <label htmlFor="card-cvc" className="label cvc" ref={forwardedRef}>
        Security code
      </label>
      <div className="input_wrapper">
        <MaskedInput
          mask={[/[0-9]/, /\d/, /\d/, /\d/]}
          className={`form-control ${props.err ? "incomplete" : ""}`}
          placeholder="123"
          guide={false}
          value={props.cvc}
          id="card-cvc"
          name="cvc"
          inputMode="numeric"
          onChange={props.handleCvcInput}
          onBlur={props.handleCvcBlur}
        />
        <SuccessMessage show={props.cvc.length === 3} />
      </div>
      <ErrorMessage text={"Security code must be 3 digits"} show={props.err} />
    </>
  );
});

export default Cardcvc;
