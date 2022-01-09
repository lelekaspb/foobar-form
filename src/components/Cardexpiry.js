import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardexpiry = forwardRef(
  (
    { expiry, err, invalid, handleInput, handleBlur, windowDimensions },
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
            autoComplete={
              windowDimensions.width < 600 ? "cc-exp" : "new-password"
            }
            guide={false}
            value={expiry}
            id="card-expiry"
            name="name"
            inputMode="numeric"
            onChange={handleInput}
            onBlur={handleBlur}
          />
          <SuccessMessage show={expiry.length === 5 && !invalid} />
        </div>
        <ErrorMessage
          text={invalid ? "Invalid format" : "Expiry date must be 4 digits"}
          show={err}
        />
      </>
    );
  }
);

export default Cardexpiry;
