import React, { useState } from 'react';
import '../styles/Login.css';
// Import the Footer component
import Footer from './Footer';

function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!credentials.email || !credentials.password) {
        throw new Error('Please fill in all fields');
      }

      if (isSignUp) {
        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const userExists = existingUsers.find(user => user.email === credentials.email);
        
        if (userExists) {
          throw new Error('User already exists');
        }

        existingUsers.push(credentials);
        localStorage.setItem('users', JSON.stringify(existingUsers));
        localStorage.setItem('currentUser', credentials.email);
        onLogin(credentials.email);
      } else {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        localStorage.setItem('currentUser', credentials.email);
        onLogin(credentials.email);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="info-section">
        <h1>Farmer's Guide</h1>
        <p className="tagline">Your digital companion for smart and sustainable farming</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Crop Recommendations</h3>
            <p>Get personalized crop suggestions based on your soil type, climate, and location.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">☁️</div>
            <h3>Weather Forecasts</h3>
            <p>Access accurate weather predictions to plan your farming activities effectively.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Yield Analysis</h3>
            <p>Track and analyze your crop yields to optimize future harvests.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>Farming Knowledge</h3>
            <p>Learn best practices and sustainable farming techniques from experts.</p>
          </div>
        </div>
      </div>

      <div className="login-card">
        <h2>Welcome to Farmer's Guide</h2>
        <p>{isSignUp ? 'Create an account' : 'Please login to continue'}</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group input-group">
            <label htmlFor="email">Email</label>
            <span className="input-icon">👤</span>
            <input
              type="email"
              id="email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              required
              className="input-with-icon"
              placeholder="Enter your email"
            />
          </div>
          
          <div className="form-group input-group">
            <label htmlFor="password">Password</label>
            <span className="input-icon">🔒</span>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
              className="input-with-icon"
              placeholder="Enter your password"
            />
          </div>
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
          </button>

          <div className="auth-switch">
            <button 
              type="button" 
              className="switch-btn"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>

      {/* Add the Footer component here */}
      <Footer />
    </div>
  );
}

export default Login;