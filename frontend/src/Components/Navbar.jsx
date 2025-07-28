import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { logout } from "../store/slice/User_slice";
import logo from "../../public/logo.png";
import '../styles/logo.css';


const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    setShow(false);
    navigate("/login");
  };
  return (
    <>
      <nav className={show ? "navbar show_navbar" : "navbar"}>
        <div className="logo">
          <img src={logo} alt="logo" className="navbar-logo-rounded" 
          style={{}} />
          <h1>AnkushNest</h1>
        </div>
        <div className="links">
          <ul>
            <li>
              <Link to={"/"} onClick={() => setShow(!show)}>
                HOME
              </Link>
            </li>
            <li>
              <Link to={"/job"} onClick={() => setShow(!show)}>
                JOBS
              </Link>
            </li>
            {isAuthenticated ? (
              <>
                <li>
                  <Link to={"/dashboard"} onClick={() => setShow(!show)}>
                    DASHBOARD
                  </Link>
                </li>
                <li>
                  <span style={{ cursor: "pointer" }} onClick={handleLogout}>
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <li>
                <Link to={"/login"} onClick={() => setShow(!show)}>
                  LOGIN
                </Link>
              </li>
            )}
          </ul>
        </div>
        <GiHamburgerMenu className="hamburger" onClick={() => setShow(!show)} />
      </nav>
    </>
  );
};

export default Navbar;