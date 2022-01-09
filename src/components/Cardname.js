import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import { forwardRef } from "react";

const Cardname = forwardRef(
  ({ name, err, handleInput, handleBlur, windowDimensions }, forwardedRef) => {
    return (
      <>
        <label htmlFor="card-name" className="label name">
          Name on card
        </label>
        <div className="input_wrapper">
          <input
            type="text"
            name="name"
            className={`${err ? "incomplete" : ""}`}
            id="card-name"
            placeholder="John Doe"
            autoComplete={windowDimensions.width < 600 ? "cc-name" : "nope"}
            ref={forwardedRef}
            value={name}
            onChange={handleInput}
            onBlur={handleBlur}
          />
          <SuccessMessage show={name.length > 2} />
        </div>
        <ErrorMessage text={"Please enter your name"} show={err} />
      </>
    );
  }
);

export default Cardname;
