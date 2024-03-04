import './../App.css';
function PopUp({ children, isSuccess }) {
  return (
    // <p className="pop-content">{children}</p>
    <span className={`pop `}>
      <p className={`pop-content ${isSuccess ? 'sucess' : 'fail'}`}>
        {children}
      </p>
    </span>
  );
}
export default PopUp;
