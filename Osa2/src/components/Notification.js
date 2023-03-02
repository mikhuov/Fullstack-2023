const Notification = ({ message, errorMessage }) => {
  if(!message && !errorMessage) {
    return null;
  }

  if(errorMessage) {
    return <div className="error-notification">{ errorMessage }</div>;
  } else {
    return <div className="notification">{ message }</div>;
  }
};

export default Notification;