import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { postApplication, resetApplicationSlice } from '../store/slice/application_slice';
import { toast } from 'react-toastify';
import { fetchsinglejob } from '../store/slice/job_slice';
import { clearAllUserErrors } from '../store/slice/User_slice';
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const PostApplication = () => {
  const { singlejob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.application);
  const { id } = useParams();

  const [formdata, setformdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    address: "",
    coverletter: "",
    resume: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleapplication = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formdata) {
      if (formdata[key]) {
        data.append(key, formdata[key]);
      }
    }
    dispatch(postApplication(data, id));
  };

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    setformdata(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  useEffect(() => {
    if (user) {
      setformdata({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        coverletter: user.coverletter || "",
        resume: null,
      });
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      navigate('/dashboard');
    }
  }, [error, message, dispatch, navigate]);

  useEffect(() => {
    if (id) {
      dispatch(fetchsinglejob(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  let qualifications = [];
  let responsibilities = [];
  let offerings = [];

  if (singlejob?.qualification) {
    qualifications = singlejob.qualification.split(',');
  }
  if (singlejob?.responsibilities) {
    responsibilities = singlejob.responsibilities.split(',');
  }
  if (singlejob?.offers) {
    offerings = singlejob.offers.split(',');
  }

  if (!isAuthenticated || !singlejob) {
    return null;
  }

  return (
    <article className="application_page">
      <form onSubmit={handleapplication}>
        <h3>Application Form</h3>
        <div>
          <label>Job Title</label>
          <input type="text" value={singlejob?.title || 'Loading...'} disabled />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="fullname" value={formdata.fullname} onChange={handlechange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formdata.email} onChange={handlechange} required />
        </div>
        <div>
          <label>Phone</label>
          <input type="tel" name="phone" value={formdata.phone} onChange={handlechange} required />
        </div>
        <div>
          <label>Address</label>
          <input type="text" name="address" value={formdata.address} onChange={handlechange} required />
        </div>
        <div>
          <label>Cover Letter</label>
          <textarea
            name="coverletter"
            rows={5}
            value={formdata.coverletter}
            onChange={handlechange}
            required
          ></textarea>
        </div>
        <div>
          <label>Resume</label>
          <input
            type="file"
            name="resume"
            accept=".pdf,.doc,.docx"
            onChange={handlechange}
            required
          />
        </div>

        {isAuthenticated ? (
          user?.role?.toLowerCase() === "job seeker" ? (
            <div style={{ alignItems: "flex-end", marginTop: "20px", textAlign: "right" }}>
              <button type="submit" className="btn" disabled={loading}>
                {loading ? "Submitting..." : "Apply"}
              </button>
            </div>
          ) : (
            <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
              Only Job Seekers can apply for jobs
            </div>
          )
        ) : (
          <div style={{ color: "red", marginTop: "20px", textAlign: "center" }}>
            Please login as a Job Seeker to apply
          </div>
        )}
      </form>

      <div className="job-details">
        <header>
          <h3>{singlejob.title}</h3>
          {singlejob.personalWebsite && (
            <Link target="_blank" to={singlejob.personalWebsite.url}>
              {singlejob.personalWebsite.title}
            </Link>
          )}
          <p>{singlejob.location}</p>
          <p>Rs. {singlejob.salary} a month</p>
        </header>
        <hr />
        <section>
          <div className="wrapper">
            <h3>Job details</h3>
            <div>
              <IoMdCash />
              <div>
                <span>Pay</span>
                <span>{singlejob.salary} a month</span>
              </div>
            </div>
            <div>
              <FaToolbox />
              <div>
                <span>Job type</span>
                <span>{singlejob.jobtype}</span>
              </div>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Location</h3>
            <div className="location-wrapper">
              <FaLocationDot />
              <span>{singlejob.location}</span>
            </div>
          </div>
          <hr />
          <div className="wrapper">
            <h3>Full Job Description</h3>
            <p>{singlejob.introduction}</p>

            {qualifications.length > 0 && (
              <div>
                <h4>Qualifications</h4>
                <ul>
                  {qualifications.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>{element}</li>
                  ))}
                </ul>
              </div>
            )}

            {responsibilities.length > 0 && (
              <div>
                <h4>Responsibilities</h4>
                <ul>
                  {responsibilities.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>{element}</li>
                  ))}
                </ul>
              </div>
            )}

            {offerings.length > 0 && (
              <div>
                <h4>Offering</h4>
                <ul>
                  {offerings.map((element) => (
                    <li key={element} style={{ listStyle: "inside" }}>{element}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
        <hr />
        <footer>
          <h3>Job Preferences</h3>
          <p>{singlejob.preference}</p>
        </footer>
      </div>
    </article>
  );
};
