function ErrorMessage(props) {
  console.log(props);
  return (
    <div className={`error ${props.show ? "shown" : ""}`}>
      <span>{props.text}</span>
    </div>
  );
}

export default ErrorMessage;
