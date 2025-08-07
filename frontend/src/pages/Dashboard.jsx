import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllJobErrors } from '../store/slice/job_slice';
import { fetchJobSeekerApplications } from '../store/slice/application_slice';
import { useNavigate } from 'react-router-dom';
import { clearAllUserErrors } from '../store/slice/User_slice';
import { LuMoveRight } from "react-icons/lu";

import MyProfile from "../Components/MyProfile";
import UpdateProfile from "../Components/UpdateProfile";
import UpdatePassword from "../Components/UpdatePassword";
import MyJobs from "../Components/MyJobs";
import PostJob from "../Components/PostJob";
import Applications from "../Components/Applications";
import MyApplications from "../Components/MyApplications";

export const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [component, setComponent] = useState("MyProfile");
  const { loading, isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch(logoutsuccess());
    navigate("/login");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
      dispatch(clearAllJobErrors());
    }
    if (user && user.role === "job seeker") {
      dispatch(fetchJobSeekerApplications());
    }
  }, [ error, user, dispatch]);
    return (
    <div className="dashboard_container">
      <div className={show ? "sidebar" : "sidebar sidebar_hide"}>
        <ul>
          <li
            className={component === "MyProfile" ? "active" : ""}
            onClick={() => setComponent("MyProfile")}
          >
            My Profile
          </li>
          {user && user.role==="job seeker" &&(
          <li
            className={component === "MyApplications" ? "active" : ""}
            onClick={() => setComponent("MyApplications")}
          >
            My Applications
          </li>
          )}
          {user && user.role==="employer" &&(
          <li
            className={component === "MyJobs" ? "active" : ""}
            onClick={() => setComponent("MyJobs")}
          >
            My Jobs
          </li>
          )}
          <li
            className={component === "UpdateProfile" ? "active" : ""}
            onClick={() => setComponent("UpdateProfile")}
          >
            Update Profile
          </li>
          <li
            className={component === "UpdatePassword" ? "active" : ""}
            onClick={() => setComponent("UpdatePassword")}
          >
            Update Password
          </li>

          {user && user.role === "employer" && (
            <li
              className={component === "PostJob" ? "active" : ""}
              onClick={() => setComponent("PostJob")}
            >
              Post New Job
            </li>
          )}

          {user && user.role === "employer" && (
            <li
              className={component === "Applications" ? "active" : ""}
              onClick={() => setComponent("Applications")}
            >
              Applications
            </li>
          )}
        </ul>
        <button className="logout_btn" onClick={handlelogout}>
          Logout
        </button>
      </div>
      <div className="banner">
        <div className={show ? "sidebar_icon move_right" : "sidebar_icon_move_left"}>
          <LuMoveRight
            className={show ? "right_arrow" : "left_arrow"}
            onClick={() => setShow((prev) => !prev)}
          />
        </div>
        <div className="dashboard_content">
          {component === "MyProfile" && <MyProfile />}
          {component === "MyApplications" && <MyApplications />}
          {component === "MyJobs" && <MyJobs />}
          {component === "UpdateProfile" && <UpdateProfile />}
          {component === "UpdatePassword" && <UpdatePassword />}
          {component === "Applications" && <Applications />}
          {component === "PostJob" && <PostJob />}
        </div>
      </div>
    </div>
  );
};