import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {
  FaAddressBook,
  FaPencilAlt,
  FaRegUser,
  FaPhone,
} from "react-icons/fa";
import { MdCategory, MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { useSelector, useDispatch } from 'react-redux';
import { clearAllUserErrors, signup } from '../store/slice/User_slice';
import { toast } from 'react-toastify';

const inputFields = [
  { label: "Full Name", name: "fullname", type: "text", icon: <FaPencilAlt /> },
  { label: "Email Address", name: "email", type: "email", icon: <MdOutlineMailOutline /> },
  { label: "Phone Number", name: "phone", type: "number", icon: <FaPhone /> },
  { label: "Address", name: "address", type: "text", icon: <FaAddressBook /> },
  { label: "Password", name: "password", type: "password", icon: <RiLock2Fill /> },
  { label: "Confirm Password", name: "confirmpassword", type: "password", icon: <RiLock2Fill /> },
];

const preferencies = [
  "Software Development",
  "Web Development",
  "Cybersecurity",
  "Data Science",
  "Artificial Intelligence",
  "Cloud Computing",
  "DevOps",
  "Mobile App Development",
  "Blockchain",
  "Database Administration",
  "Network Administration",
  "UI/UX Design",
  "Game Development",
  "IoT (Internet of Things)",
  "Big Data",
  "Machine Learning",
  "IT Project Management",
  "IT Support and Helpdesk",
  "Systems Administration",
  "IT Consulting",
];

export const Signup = () => {
  const [showpass, setshowpass] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullname: "",
    role: "",
    email: "",
    phone: "",
    address: "",
    coverletter: "",
    first_preference: "",
    password: "",
    second_preference: "",
    third_preference: "",
    confirmpassword: "",
    resume: null,
  });

  const { loading, isAuthenticated, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    let { name, value } = e.target;
    // Normalize role value to match backend enum
    if (name === "role" && value.toLowerCase() === "job seeker") {
      value = "job seeker";
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resumeHandler = useCallback((e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, resume: file }));
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    // Client-side validation
    const requiredFields = ['fullname', 'role', 'email', 'phone', 'address', 'password', 'confirmpassword'];
    for (const field of requiredFields) {
      if (!formData[field] || (typeof formData[field] === 'string' && formData[field].trim() === '')) {
        toast.dismiss();
        toast.error('Please fill in all required fields.');
        return;
      }
    }
    if (formData.password !== formData.confirmpassword) {
      toast.dismiss();
      toast.error('Passwords do not match.');
      return;
    }
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === "resume" && value) {
        data.append(key, value);
      } else {
        data.append(key, value !== undefined && value !== null ? String(value) : "");
      }
    });
    dispatch(signup(data));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (isAuthenticated) {
      navigate("/");
    }
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <section className="authPage">
      <div className="container">
        <div className="header">
          <h3>Create a new account</h3>
        </div>
        <form onSubmit={handleRegister}>
          <div className="wrapper">
            <SelectInput
              label="Register As"
              name="role"
              value={formData.role}
              onChange={handleChange}
              icon={<FaRegUser />}
            >
              <option value="">Select Role</option>
              <option value="employer">Register as an Employer</option>
              <option value="job seeker">Register as a Job Seeker</option>
            </SelectInput>
            {inputFields
              .filter((field) => field.name === "fullname")
              .map((field) => (
                <TextInput
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
          </div>

          <div className="wrapper">
            {inputFields
              .filter((field) => field.name === "email" || field.name === "phone")
              .map((field) => (
                <TextInput
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
          </div>

          <div className="wrapper">
            {inputFields
              .filter((field) => field.name === "address" || field.name === "password" || field.name === "confirmpassword")
              .map((field) => (
                <TextInput
                  key={field.name}
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
          </div>

          {formData.role === "job seeker" && (
            <>
              <div className="wrapper">
                {["first_preference", "second_preference", "third_preference"].map((prefKey, i) => (
                  <SelectInput
                    key={prefKey}
                    label={`Your ${["First", "Second", "Third"][i]} Preference`}
                    name={prefKey}
                    value={formData[prefKey]}
                    onChange={handleChange}
                    icon={<MdCategory />}
                  >
                    <option value="">Your Preference</option>
                    {preferencies.map((niche, i) => (
                      <option key={i} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </SelectInput>
                ))}
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Cover Letter</label>
                  <div>
                    <textarea
                      name="coverletter"
                      value={formData.coverletter}
                      onChange={handleChange}
                      rows={6}
                      placeholder="Your cover letter"
                    />
                  </div>
                </div>
              </div>

              <div className="wrapper">
                <div className="inputTag">
                  <label>Resume</label>
                  <div>
                    <input
                      type="file"
                      onChange={resumeHandler}
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn" disabled={loading} style={{marginTop: 20}}>
            {loading ? "Registering..." : "Register"}
          </button>
          <Link to="/login" className="outline_btn" style={{marginTop: 10}}>Login Now</Link>
        </form>
      </div>
    </section>
  );
};

// Reusable Input Components
const TextInput = ({ label, name, value, onChange, icon, type = "text" }) => (
  <div className="inputTag">
    <label>{label}</label>
    <div>
      <input type={type} name={name} placeholder={label} value={value} onChange={onChange} />
      {icon}
    </div>
  </div>
);

const SelectInput = ({ label, name, value, onChange, icon, children }) => (
  <div className="inputTag">
    <label>{label}</label>
    <div>
      <select name={name} value={value} onChange={onChange}>
        {children}
      </select>
      {icon}
    </div>
  </div>
);
