import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../store/slice/User_slice";
import { toast } from 'react-toastify';
import logo from "../../public/logo.png";
import '../styles/logo.css';
import '../styles/navbar.css';


const Navbar = () => {
  const [show, setShow] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      toast.success('Logged out successfully');
      setShow(false);
      navigate("/login");
    } catch (error) {
      toast.error(error || 'Failed to logout. Please try again.');
    }
  };

  const toggleMenu = () => {
    setShow(!show);
  };
  return (
    <>
      <nav className={`navbar ${show ? 'show_navbar' : ''} ${scrolled ? 'scrolled' : ''}`}>
        <div className="logo">
          <img src={logo} alt="logo" className="navbar-logo-rounded" 
          onClick={() => navigate("/")} />
          
          <h1
          onClick={() => navigate("/")}
          >AnkushNest</h1>
        </div>
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <GiHamburgerMenu />
        </button>
        <div className={`links ${show ? 'show' : ''}`}>
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(false)}>
                HOME
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li>
                  <Link to={"/job"} onClick={() => setShow(false)}>
                    JOBS
                  </Link>
                </li>
                <li>
                  <Link to={"/dashboard"} onClick={() => setShow(false)}>
                    DASHBOARD
                  </Link>
                </li>
              </>
            )}
            <li>
              {isAuthenticated ? (
                <button 
                  onClick={handleLogout} 
                  className="nav-button"
                  style={{ 
                    cursor: "pointer",
                    background: "transparent",
                    border: "none",
                    color: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    padding: "0",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                >
                  LOGOUT
                </button>
              ) : (
                <Link to={"/login"} onClick={() => setShow(false)}>
                  LOGIN
                </Link>
              )}
            </li>
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;