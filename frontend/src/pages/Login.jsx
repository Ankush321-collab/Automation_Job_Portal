import React, { useState, useEffect } from 'react';
import { MdOutlineMailOutline, MdCategory } from 'react-icons/md';
import { RiLock2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, clearAllUserErrors } from '../store/slice/User_slice';
import { toast } from 'react-toastify';
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({ email: '', password: '', role: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (key === 'role') {
        data.set('role', val.toLowerCase());
      } else {
        data.set(key, val);
      }
    });
    dispatch(login(data));
  };

  useEffect(() => {
    let mounted = true;
    
    if (mounted && error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }

    return () => {
      mounted = false;
    };
  }, [error]);

  useEffect(() => {
    let mounted = true;
    
    if (mounted && isAuthenticated && user) {
      toast.success('Login successful!');
      // Store user data and token in localStorage after successful login
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      navigate('/', { replace: true });
    }

    return () => {
      mounted = false;
    };
  }, [isAuthenticated]);


  return (
    <section className="authPage">
      <div className="container login-container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select
                value={formData.role}
                onChange={handleChange}
                name="role"
                required
              >
                <option value="">Select Role</option>
                <option value="employer">Login as an Employer</option>
                <option value="job seeker">Login as a Job Seeker</option>
              </select>
              {/* You can use FaUserShield or any icon here if imported */}
            </div>
          </div>
          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={formData.email}
                onChange={handleChange}
                name="email"
                required
              />
              {/* You can use MdOutlineMailOutline or any icon here if imported */}
            </div>
          </div>
          <div className="inputTag">
            <label>Password</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Your Password"
                value={formData.password}
                onChange={handleChange}
                name="password"
                required
                style={{ width: '100%' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="login-password-toggle"
                tabIndex={-1}
                style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="login-eye" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0zm6.062-4.675A9.956 9.956 0 0122 9c0 5.523-4.477 10-10 10-.828 0-1.634-.104-2.406-.3" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="login-eye" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.21 2.21A9.956 9.956 0 0022 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 1.657.336 3.234.938 4.675M6.343 17.657A9.956 9.956 0 0112 22c5.523 0 10-4.477 10-10 0-1.657-.336-3.234-.938-4.675" /></svg>
                )}
              </button>
              {/* You can use RiLock2Fill or any icon here if imported */}
            </div>
            {error && <p className="login-error">{error}</p>}
          </div>
          <button type="submit" disabled={loading}>
            {loading ? "logging in" : "Login"}
          </button>
          <Link to={"/signup"}>Register Now</Link>
        </form>
      </div>
    </section>
  );
}

export default Login;
