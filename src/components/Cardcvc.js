import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import MaskedInput from "react-text-mask";
import { forwardRef } from "react";

const Cardcvc = forwardRef(
  ({ cvc, err, handleInput, handleBlur, windowDimensions }, forwardedRef) => {
    return (
      <>
        <label htmlFor="card-cvc" className="label cvc" ref={forwardedRef}>
          Security code
        </label>
        <div className="input_wrapper">
          <MaskedInput
            mask={[/[0-9]/, /\d/, /\d/, /\d/]}
            className={`form-control ${err ? "incomplete" : ""}`}
            placeholder="123"
            autoComplete={
              windowDimensions.width < 600 ? "cc-csc" : "new-password"
            }
            guide={false}
            value={cvc}
            id="card-cvc"
            name="cvc"
            inputMode="numeric"
            onChange={handleInput}
            onBlur={handleBlur}
          />
          <SuccessMessage show={cvc.length === 3} />
        </div>
        <ErrorMessage text={"Security code must be 3 digits"} show={err} />
      </>
    );
  }
);

export default Cardcvc;
