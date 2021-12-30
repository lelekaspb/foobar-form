function SuccessMessage({ show }) {
  return (
    <div className={`success ${show ? "shown" : ""}`}>
      <img src="icons/checkmark.svg" alt="success icon" />
    </div>
  );
}

export default SuccessMessage;
