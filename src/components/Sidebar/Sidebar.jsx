import './Sidebar.css';


export default function Sidebar({ onLogout, isOpen }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-logo">🛍️</div>
      <ul>
        <li className="active">My Profile</li>
        <li>Orders</li>
        <li>Favorites</li>
        <li>Addresses</li>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </aside>
  );
}
