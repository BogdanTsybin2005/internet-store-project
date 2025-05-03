import './ProfileCard.css';



export default function ProfileCard({ title, children, large }) {
  return (
    <div className={`profile-card ${large ? 'large' : ''}`}>
      {title && <h4>{title}</h4>}
      {children}
    </div>
  );
}