import { useNavigate } from 'react-router-dom';
import './ProfileHeader.css';



export default function ProfileHeader() {
  const navigate = useNavigate();

  return (
    <header className="profile-header">
      <div className="profile-header-container">
        <div className="profile-header-left">
          <h1 className="profile-title">Profile Panel</h1>
        </div>
        <div className="profile-header-right">
          <button
            className="go-home-button"
            onClick={() => navigate('/')}
            title="Back to Main Page"
          >
            Home
          </button>
        </div>
      </div>
    </header>
  );
}
