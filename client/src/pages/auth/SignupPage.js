
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Layout from '../../components/common/Layout';
import { toast } from 'react-toastify';
import './AuthPages.css';

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('student');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);

    try {
      await signup(name, email, password, role);
      navigate('/');
    } catch (error) {
      console.error('Signup failed', error);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-container">
        <div className="auth-form-container">
          <div className="auth-header">
            <h2 className="auth-title">Create a new account</h2>
            <p className="auth-subtitle">
              Or{' '}
              <Link to="/login" className="auth-link">
                login to your account
              </Link>
            </p>
          </div>
          
          <div className="auth-card">
            <form className="auth-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-input"
                />
              </div>

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
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label">I am a:</label>
                <div className="radio-group">
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      checked={role === 'student'}
                      onChange={() => setRole('student')}
                    />
                    <label htmlFor="student">Student</label>
                  </div>
                  <div className="radio-option">
                    <input
                      type="radio"
                      id="tutor"
                      name="role"
                      value="tutor"
                      checked={role === 'tutor'}
                      onChange={() => setRole('tutor')}
                    />
                    <label htmlFor="tutor">Tutor</label>
                  </div>
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignupPage;
