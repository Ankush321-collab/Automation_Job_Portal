import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { clearAllUpdateProfileError, updateProfile } from '../store/slice/UpdateProfile_slice';
import { toast } from "react-toastify";
import { getUser } from '../store/slice/User_slice';

const UpdateProfile = () => {
  const user = useSelector((state) => state.user.user);
const loading = useSelector((state) => state.updateprofile.loading);
const error = useSelector((state) => state.updateprofile.error);
const isUpdated = useSelector((state) => state.updateprofile.isUpdated);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullname, setfullname] = useState(user && user.fullname);
  const [email, setemail] = useState(user && user.email);
  const [phone, setphone] = useState(user && user.phone);
  const [address, setaddress] = useState(user && user.address);
  const [coverletter, setcoverletter] = useState(user && user.coverletter);
  const [first_preference, setfirst_preference] = useState(user?.preference?.first_preference || "");
  const [second_preference, setsecond_preference] = useState(user?.preference?.second_preference || "");
  const [third_preference, setthird_preference] = useState(user?.preference?.third_preference || "");
  const [resume, setresume] = useState(null);
  const [resumepreview, setresumepreview] = useState(user?.resume?.url || "");

  const handleupdateprofile = (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("fullname", fullname);
    formdata.append("email", email);
    formdata.append("phone", phone);
    formdata.append("address", address);

    if (user && user.role === "job seeker") {
      formdata.append("first_preference", first_preference);
      formdata.append("second_preference", second_preference);
      formdata.append("third_preference", third_preference);
      formdata.append("coverletter", coverletter); // ✅ Fixed: Added missing key
    }

    if (resume) {
      formdata.append("resume", resume);
    }

    dispatch(updateProfile(formdata));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(getUser());
      dispatch(clearAllUpdateProfileError());
    }
    if (isUpdated) {
      toast.success("Profile updated successfully");
      navigate("/profile");
      dispatch(getUser());
      dispatch(clearAllUpdateProfileError());
    }
  }, [error, isUpdated, dispatch, navigate]);

  const resumehandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setresumepreview(reader.result);
      setresume(file);
    };
  };

  const preferences = [
    "Software Development", "Web Development", "Cybersecurity", "Data Science",
    "Artificial Intelligence", "Cloud Computing", "DevOps", "Mobile App Development",
    "Blockchain", "Database Administration", "Network Administration", "UI/UX Design",
    "Game Development", "IoT (Internet of Things)", "Big Data", "Machine Learning",
    "IT Project Management", "IT Support and Helpdesk", "Systems Administration", "IT Consulting",
  ];

  return (
    <div className="account_components">
      <h3>Update Profile</h3>

      <form onSubmit={handleupdateprofile}>
        <div>
          <label>Full Name</label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => setfullname(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Enter your Email"
          />
        </div>

        <div>
          <label>Phone Number</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          />
        </div>

        {user && user.role === "job seeker" && (
          <>
            <div>
              <label>First Preference</label>
              <select value={first_preference} onChange={(e) => setfirst_preference(e.target.value)}>
                {preferences.map((pref, index) => (
                  <option key={index} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Second Preference</label>
              <select value={second_preference} onChange={(e) => setsecond_preference(e.target.value)}>
                {preferences.map((pref, index) => (
                  <option key={index} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Third Preference</label>
              <select value={third_preference} onChange={(e) => setthird_preference(e.target.value)}>
                {preferences.map((pref, index) => (
                  <option key={index} value={pref}>{pref}</option>
                ))}
              </select>
            </div>

            <div>
              <label>Cover Letter</label>
              <textarea
                value={coverletter}
                onChange={(e) => setcoverletter(e.target.value)}
                rows={5}
              />
            </div>

            <div>
              <label>Upload Resume</label>
              <input type="file" accept=".pdf" onChange={resumehandler} />
              {resume && (
                <p>New Resume Selected: {resume.name}</p>
              )}
              {!resume && user && user.resume && (
                <div>
                  <p>Current Resume:</p>
                  <Link
                    to={user.resume.url}
                    target="_blank"
                    className="view-resume"
                  >
                    View Resume
                  </Link>
                </div>
              )}
            </div>
          </>
        )}

        <div className="save_change_btn_wrapper">
          <button className="btn" type="submit" disabled={loading}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
