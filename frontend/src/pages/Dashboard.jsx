import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllJobErrors } from '../store/slice/job_slice';
import { fetchJobSeekerApplications } from '../store/slice/application_slice';

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { error: jobError, message: jobMessage } = useSelector((state) => state.jobs);
  const { error: applicationError, message: applicationMessage } = useSelector((state) => state.application);

  useEffect(() => {
    // Handle job-related notifications
    if (jobError) {
      toast.error(jobError);
      dispatch(clearAllJobErrors());
    }
    if (jobMessage) {
      toast.success(jobMessage);
    }
  }, [jobError, jobMessage, dispatch]);

  useEffect(() => {
    // Handle application-related notifications
    if (applicationError) {
      toast.error(applicationError);
    }
    if (applicationMessage) {
      toast.success(applicationMessage);
    }
  }, [applicationError, applicationMessage]);

  return (
    <div>Dashboard</div>
  );
}
