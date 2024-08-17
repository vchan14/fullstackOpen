import "./style.css";
const Notification = ({ messageObj }) => {
  const { message, isError } = messageObj;
  if (message === null || message === "") {
    return null;
  }

  return (
    <>
      {message && (
        <div className={isError ? "error" : "notification"}>{message}</div>
      )}
    </>
  );
};

export default Notification;
