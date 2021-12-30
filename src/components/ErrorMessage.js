function ErrorMessage({ text, show }) {
  return (
    <div className={`error ${show ? "shown" : ""}`}>
      <span>{text}</span>
    </div>
  );
}

export default ErrorMessage;
