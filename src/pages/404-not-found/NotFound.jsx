import './NotFound.css';
import { Link } from 'react-router-dom';
import NotFound404Picture from '../../assets/404.png';



function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-left-panel">
        <h2>Oops! Something went wrong</h2>
        <h1>404</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="not-found-button">Go Back Home</Link>
      </div>
      <div className="not-found-right-panel">
        <div className="not-found-right-panel-img">
          <img src={NotFound404Picture} alt="404" />
        </div>
        <h1>Page Not Found</h1>
      </div>
    </div>
  );
}

export default NotFound;
