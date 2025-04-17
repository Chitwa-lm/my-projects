// Add the logout button near the top of your Dashboard component
function Dashboard({ username, onLogout }) {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Farmer's Guide, {username}</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      
      {/* Rest of your dashboard content */}
    </div>
  );
}