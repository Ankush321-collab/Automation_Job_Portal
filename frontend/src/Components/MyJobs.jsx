import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  clearAllJobErrors,
  deletejob,
  getmyjob,
  resetJobSlice
} from '../store/slice/job_slice';
import Spinner from './Spinner';

const MyJobs = () => {
  const { loading, error, myjob, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Always ensure myjob is an array before using it
  const jobsData = Array.isArray(myjob) ? myjob : [];

  // Fetch my jobs on mount
  useEffect(() => {
    dispatch(getmyjob());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
      dispatch(getmyjob());
    }
  }, [dispatch, error, message]);

  const handledeltejob = (id) => {
    dispatch(deletejob(id));
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : jobsData.length === 0 ? (
        <h1 style={{ fontSize: "1.4rem", fontWeight: "600" }}>
          You have not posted any job!
        </h1>
      ) : (
        <div className="account_components">
          <h3>My Jobs</h3>
          <div className="applications_container">
            {jobsData.map((element) => (
              <div className="card" key={element._id}>
                <p className="sub-sec"><span>Job Title:</span> {element.title}</p>
                <p className="sub-sec"><span>Job Preference:</span> {element.preference}</p>
                <p className="sub-sec"><span>Salary:</span> {element.salary}</p>
                <p className="sub-sec"><span>Location:</span> {element.location}</p>
                <p className="sub-sec"><span>Job Type:</span> {element.jobtype}</p>
                <p className="sub-sec"><span>Company Name:</span> {element.companyname}</p>
                <p className="sub-sec"><span>Introduction:</span> {element.introduction}</p>
                <p className="sub-sec"><span>Qualifications:</span> {element.qualification}</p>
                <p className="sub-sec"><span>Responsibilities:</span> {element.responsibilities}</p>
                {element.offers && (
                  <p className="sub-sec"><span>What Are We Offering:</span> {element.offers}</p>
                )}
                <button
                  className="btn"
                  onClick={() => handledeltejob(element._id)}
                >
                  Delete Job
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyJobs;
