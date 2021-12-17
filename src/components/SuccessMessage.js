function SuccessMessage(props) {
  return (
    <div className={`success ${props.show ? "shown" : ""}`}>
      <img src="icons/checkmark.svg" alt="success icon" />
    </div>
  );
}

export default SuccessMessage;
