import React, { useState, useEffect } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAllUserErrors } from '../store/slice/User_slice';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated, user } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submit
  const handleLogin = (e) => {
    e.preventDefault();
    // Client-side validation
    if (!formData.role || !formData.email || !formData.password) {
      toast.dismiss();
      toast.error('Please fill in all fields.');
      return;
    }
    dispatch(login(formData));
  }

  // Handle error notification
  useEffect(() => {
    if (error) {
      // Show toast and only clear error after toast closes
      toast.error(error, {
        onClose: () => dispatch(clearAllUserErrors())
      });
    }
  }, [error, dispatch]);

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated && user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token);
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <section className="authPage">
      <div className="container login-container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          {/* Role Selector */}
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
            </div>
          </div>

          {/* Email Input */}
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
            </div>
          </div>

          {/* Password Input */}
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
                style={{
                  position: 'absolute',
                  right: 8,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Register Link */}
          <Link to="/register">Register Now</Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
