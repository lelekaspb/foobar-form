import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";
import { forwardRef } from "react";

const Cardname = forwardRef((props, forwardedRef) => {
  return (
    <>
      <label htmlFor="card-name" className="label name">
        Name on card
      </label>
      <div className="input_wrapper">
        <input
          type="text"
          name="name"
          className={`${props.err ? "incomplete" : ""}`}
          id="card-name"
          placeholder="John Doe"
          ref={forwardedRef}
          value={props.name}
          onChange={props.handleNameInput}
          onBlur={props.handleNameBlur}
        />
        <SuccessMessage show={props.name.length > 2} />
      </div>
      <ErrorMessage text={"Please enter your name"} show={props.err} />
    </>
  );
});

export default Cardname;
