import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardexpiry = forwardRef((props, forwardedRef) => {
  return (
    <>
      <label htmlFor="card-expiry" className="label expiry" ref={forwardedRef}>
        Expiry date
      </label>
      <div className="input_wrapper">
        <MaskedInput
          mask={[/[0-9]/, /\d/, "/", /\d/, /\d/]}
          className={`form-control ${props.err ? "incomplete" : ""}`}
          placeholder="04/23"
          guide={false}
          value={props.expiry}
          id="card-expiry"
          name="name"
          inputMode="numeric"
          onChange={props.handleExpiryInput}
          onBlur={props.handleExpiryBlur}
        />
        <SuccessMessage show={props.expiry.length === 5} />
      </div>
      <ErrorMessage text={"Expiry date must be 4 digits"} show={props.err} />
    </>
  );
});

export default Cardexpiry;
