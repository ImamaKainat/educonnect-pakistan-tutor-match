
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import './AuthPages.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, mockLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Try API login first
      await login(email, password);
      navigate('/');
    } catch (error) {
      console.error('API login failed, trying mock login', error);
      
      try {
        // Fall back to mock login for demo purposes
        await mockLogin(email, password);
        navigate('/');
      } catch (mockError) {
        // Both login methods failed
        console.error('Mock login failed', mockError);
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">Login to your account</h2>
            <p className="auth-subtitle">
              Or{' '}
              <Link to="/signup" className="auth-link">
                create a new account
              </Link>
            </p>
          </div>
          
          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <div className="flex justify-between">
                  <label htmlFor="password" className="form-label">Password</label>
                  <Link to="/forgot-password" className="forgot-password">
                    Forgot your password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            <div className="demo-accounts">
              <div className="divider">
                <span className="divider-text">Demo Accounts</span>
              </div>

              <div className="demo-buttons">
                <button
                  className="btn btn-outline w-full"
                  onClick={() => {
                    setEmail('student@example.com');
                    setPassword('password');
                  }}
                >
                  Student Account
                </button>
                <button
                  className="btn btn-outline w-full"
                  onClick={() => {
                    setEmail('tutor@example.com');
                    setPassword('password');
                  }}
                >
                  Tutor Account
                </button>
                <button
                  className="btn btn-outline w-full"
                  onClick={() => {
                    setEmail('admin@example.com');
                    setPassword('password');
                  }}
                >
                  Admin Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
