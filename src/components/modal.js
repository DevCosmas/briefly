import '../App.css';
function Modal({ children }) {
  return (
    <div className="modal-container">
      <span className="modal-child-wrapper">{children}</span>
      {/* {children} */}
    </div>
  );
}
export default Modal;
