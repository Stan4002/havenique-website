import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../adminApi';
import { Logo } from '../../components/Logo';
import '../admin.css';
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await adminApi.login({
        email,
        password
      });
      localStorage.setItem('havenique_admin_token', response.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="admin-body">
      <div className="admin-login-page">
        <div className="admin-login-card">
          <div className="admin-login-logo">
            <Logo width={88} height={88} />
            <h2>Havenique Admin</h2>
          </div>

          {error && <div className="admin-error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="admin-form-group">
              <label className="admin-label">Email Address</label>
              <input
                type="email"
                className="admin-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Email address" />
              
            </div>

            <div
              className="admin-form-group"
              style={{
                marginBottom: '30px'
              }}>
              
              <label className="admin-label">Password</label>
              <input
                type="password"
                className="admin-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password" />
              
            </div>

            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              style={{
                width: '100%',
                padding: '12px'
              }}
              disabled={loading}>
              
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>);

}