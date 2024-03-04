import '../App.css';

function Button({
  children,
  className,
  // handleClick = undefined,
  // param = undefined,
}) {
  return (
    <button
      className={className}
      // onClick={() => handleClick(param)}
    >
      {children}
    </button>
  );
}

export default Button;
