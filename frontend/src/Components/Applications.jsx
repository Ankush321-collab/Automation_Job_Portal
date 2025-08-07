import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchemployerapplication,
  resetApplicationSlice
} from '../store/slice/application_slice';
import Spinner from './Spinner.jsx';

const Applications = () => {
  const { applications, error, message, loading } = useSelector((state) => state.application);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }

    dispatch(fetchemployerapplication());
  }, [dispatch, error, message]);

  const handledelteapplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : Array.isArray(applications) && applications.length === 0 ? (
        <h1>You have no applications from job seekers.</h1>
      ) : Array.isArray(applications) ? (
        <div className="account_components">
          <h3>Applications for Your Posted Jobs</h3>
          <div className="applications_container">
            {applications.map((element) => (
              <div className="card" key={element._id}>
                <p className="sub-sec">
                  <span>Job Title:</span> {element.jobinfo?.jobtitle}
                </p>
                <p className="sub-sec">
                  <span>Applicant Name:</span> {element.jobseekerinfo?.fullname}
                </p>
                <p className="sub-sec">
                  <span>Email:</span> {element.jobseekerinfo?.email}
                </p>
                <p className="sub-sec">
                  <span>Phone:</span> {element.jobseekerinfo?.phone}
                </p>
                <p className="sub-sec">
                  <span>Address:</span> {element.jobseekerinfo?.address}
                </p>
                <p className="sub-sec">
                  <span>Cover Letter:</span> {element.jobseekerinfo?.coverletter}
                </p>

                <div className="btn-wrapper">
                  <button
                    className="outline_btn"
                    onClick={() => handledelteapplication(element._id)}
                  >
                    Delete Application
                  </button>
                  {element.jobseekerinfo?.resume?.url && (
                    <Link
                      to={element.jobseekerinfo.resume.url}
                      className="btn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Resume
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading applications...</h1>
      )}
    </>
  );
};

export default Applications;
