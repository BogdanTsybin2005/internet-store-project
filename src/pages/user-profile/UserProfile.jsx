import './UserProfile.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import FormInput from '../../components/input/FormInput';
import DefaultUserProfileLogo from '../../assets/svg/DefaultUserProfileLogo';
import AvatarUploader from '../../components/AvatarUploader/AvatarUploader';



export default function UserProfile() {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user || {});
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  if (!user) return null;

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    updateUser({ ...formData, avatar: avatarUrl });
    setIsEditing(false);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setAvatarFile(file);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar onLogout={logout} />
      <main className="profile-main">
        <ProfileHeader />
        <section className="profile-sections">
          <ProfileCard large>
            <div className="avatar-upload">
              {avatarUrl ? (
                <img className="profile-avatar" src={avatarUrl} alt="avatar" />
              ) : (
                <div className="profile-avatar default-logo">
                  <DefaultUserProfileLogo />
                </div>
              )}
              {isEditing && <AvatarUploader onChange={handleAvatarUpload} />}
            </div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p className="profile-email">{user.email}</p>
            <p className="profile-date">Registered: {format(new Date(user.createdAt || Date.now()), 'dd.MM.yyyy')}</p>
            <button className="profile-edit-btn" onClick={handleEditToggle}>
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </ProfileCard>

          <ProfileCard title="Personal Information">
          {isEditing ? (
              <>
                <FormInput
                  label="First Name"
                  type="text"
                  name="firstName"
                  value={formData.firstName || ''}
                  onChange={handleChange}
                />
                <FormInput
                  label="Last Name"
                  type="text"
                  name="lastName"
                  value={formData.lastName || ''}
                  onChange={handleChange}
                />
                <FormInput
                  label="Age"
                  type="number"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleChange}
                />
                <FormInput
                  label="Phone"
                  type="tel"
                  name="phone"
                  value={formData.phone || ''}
                  onChange={handleChange}
                />
                <FormInput
                  label="City"
                  type="text"
                  name="city"
                  value={formData.city || ''}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <div className="field"><label>First Name</label><p>{user.firstName}</p></div>
                <div className="field"><label>Last Name</label><p>{user.lastName}</p></div>
                <div className="field"><label>Email</label><p>{user.email}</p></div>
                <div className="field"><label>Age</label><p>{user.age || 'Not set'}</p></div>
                <div className="field"><label>Phone</label><p>{user.phone || 'Not set'}</p></div>
                <div className="field"><label>City</label><p>{user.city || 'Not set'}</p></div>
              </>
            )}

            {isEditing && (
              <button className="profile-save-btn" onClick={handleSave}>
                Save
              </button>
            )}
          </ProfileCard>

          <ProfileCard title="My Orders">
            <ul className="order-status-list">
              <li><span className="dot green"></span>Delivery: completed</li>
              <li><span className="dot red"></span>Payment: pending</li>
              <li><span className="dot orange"></span>Awaiting packaging</li>
            </ul>
          </ProfileCard>
        </section>
      </main>
    </div>
  );
}
