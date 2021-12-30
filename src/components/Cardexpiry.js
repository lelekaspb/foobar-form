import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardexpiry = forwardRef(
  (
    { expiry, err, handleExpiryInput, handleExpiryBlur, windowDimensions },
    forwardedRef
  ) => {
    return (
      <>
        <label
          htmlFor="card-expiry"
          className="label expiry"
          ref={forwardedRef}
        >
          Expiry date
        </label>
        <div className="input_wrapper">
          <MaskedInput
            mask={[/[0-9]/, /\d/, "/", /\d/, /\d/]}
            className={`form-control ${err ? "incomplete" : ""}`}
            placeholder="04/23"
            autoComplete={windowDimensions.width < 600 ? "cc-exp" : "off"}
            guide={false}
            value={expiry}
            id="card-expiry"
            name="name"
            inputMode="numeric"
            onChange={handleExpiryInput}
            onBlur={handleExpiryBlur}
          />
          <SuccessMessage show={expiry.length === 5} />
        </div>
        <ErrorMessage text={"Expiry date must be 4 digits"} show={err} />
      </>
    );
  }
);

export default Cardexpiry;
