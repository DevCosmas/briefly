import '../App.css';

function ShowAlert({ alertMessage, alertType }) {
  return <div className={`alertMsg ${alertType}`}>{alertMessage}</div>;
}
export default ShowAlert;
