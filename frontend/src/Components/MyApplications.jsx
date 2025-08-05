import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllApplicationErrors, deleteApplication, fetchJobSeekerApplications, resetApplicationSlice } from '../store/slice/application_slice';
import Spinner from './Spinner.jsx';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const dispatch = useDispatch();

  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, message, applications } = useSelector((state) => state.application);

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleapplications = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : applications && applications.length <= 0 ? (
        <h1 style={{ fontSize: '1.4rem', fontWeight: '600' }}>
          You have not applied for any job.
        </h1>
      ) : (
        <div className="account_components">
          <h3>My Application For Jobs</h3>
          <div className="applications_container">
            {applications.map((element) => (
              <div className="card" key={element._id}>
                <p className="sub-sec">
                  <span>Job Title: </span> {element.job.jobtitle}
                </p>
                <p className="sub-sec">
                  <span>Name: </span> {element.jobSeekerInfo.name}
                </p>
                <p className="sub-sec">
                  <span>Email: </span> {element.jobSeekerInfo.email}
                </p>
                <p className="sub-sec">
                  <span>Phone: </span> {element.jobSeekerInfo.phone}
                </p>
                <p className="sub-sec">
                  <span>Address: </span> {element.jobSeekerInfo.address}
                </p>
                <p className="sub-sec">
                  <span>Coverletter: </span>
                  <textarea
                    value={element.jobSeekerInfo.coverLetter}
                    rows={5}
                    disabled
                  ></textarea>
                </p>
                <div className="btn-wrapper">
                  <button
                    className="outline_btn"
                    onClick={() => handleapplications(element._id)}
                  >
                    Delete Application
                  </button>
                  <Link
                    to={element.jobSeekerInfo.resume.url}
                    className="btn"
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Resume
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyApplications;
