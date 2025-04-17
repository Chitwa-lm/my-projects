import { useNavigate } from 'react-router-dom';

function Header({ username, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Farmer's Guide</h1>
      </div>
      <nav className="nav-menu">
        {/* Your navigation links */}
      </nav>
      <div className="user-actions">
        <span className="username">Welcome, {username}</span>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Header;