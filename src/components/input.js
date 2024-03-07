import { Link } from 'react-router-dom';
import Button from './button';
import '../App.css';

function CreateUrlInput({ wrapperClass = '', redirectTo = '', secClassName }) {
  return (
    <div className={`short-plhol ${wrapperClass}`}>
      <form className={`plachol-wrapper homepage-input ${secClassName}`}>
        <span className="link-wrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="link-icon">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
        </span>
        <input
          placeholder="paste your url"
          className="plchol-input"
        />
        <Link to={`/${redirectTo}`}>
          <Button className={'btn'}>short url now !</Button>
        </Link>
      </form>
    </div>
  );
}
export default CreateUrlInput;
