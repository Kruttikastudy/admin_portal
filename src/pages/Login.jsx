import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      navigate('/dashboard');
    } else if (!username || !password) {
      alert('Please enter both username and password');
    } else {
      alert('Invalid credentials. Use admin/admin for demo.');
    }
  };

  return (
    <div className="login-container-split">
      <div className="login-left-image-section">
        <div className="hex-pattern"></div>
        <div className="ecg-line-image">
          <svg viewBox="0 0 1000 300" preserveAspectRatio="none">
            <path d="M0,200 L100,200 L120,150 L140,250 L160,200 L200,200 L220,170 L240,230 L260,200 L1000,200"
              stroke="rgba(0, 150, 255, 0.6)"
              strokeWidth="2"
              fill="none" />
          </svg>
        </div>
      </div>
      <div className="login-right-form-section">
        <div className="login-content-box">
          <div className="login-logo-container">
            <img src="/logo.jpg" alt="SSPD Logo" className="login-logo-img" />
          </div>
          <h1 className="image-login-title">SSPD EMR</h1>
          <form className="image-style-form" onSubmit={handleSubmit}>
            <div className="image-form-group">
              <label>Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="image-form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="login-btn-container">
              <button type="submit" className="image-login-btn">
                Log in
              </button>
            </div>
          </form>
          <p className="login-hint-text">Demo Access: admin / admin</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
