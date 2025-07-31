import React from 'react';
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

export const JobDetails = ({ job, qualifications = [], responsibilities = [], offerings = [] }) => {
  if (!job) return null;

  return (
    <div className="job-details">
      <header>
        <h3>{job.title}</h3>
        {job.personalWebsite && (
          <a href={job.personalWebsite.url} target="_blank" rel="noopener noreferrer">
            {job.personalWebsite.title}
          </a>
        )}
        <p>{job.location}</p>
        <p>Rs. {job.salary} a month</p>
      </header>
      <hr />
      <section>
        <div className="wrapper">
          <h3>Job details</h3>
          <div>
            <IoMdCash />
            <div>
              <span>Pay</span>
              <span>Rs. {job.salary} a month</span>
            </div>
          </div>
          <div>
            <FaToolbox />
            <div>
              <span>Job type</span>
              <span>{job.jobtype}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="wrapper">
          <h3>Location</h3>
          <div className="location-wrapper">
            <FaLocationDot />
            <span>{job.location}</span>
          </div>
        </div>
        <hr />
        <div className="wrapper">
          <h3>Full Job Description</h3>
          <p>{job.introduction}</p>
          {qualifications.length > 0 && (
            <div>
              <h4>Qualifications</h4>
              <ul>
                {qualifications.map((element, index) => (
                  <li key={index} style={{ listStyle: "inside" }}>
                    {element.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {responsibilities.length > 0 && (
            <div>
              <h4>Responsibilities</h4>
              <ul>
                {responsibilities.map((element, index) => (
                  <li key={index} style={{ listStyle: "inside" }}>
                    {element.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {offerings.length > 0 && (
            <div>
              <h4>Offering</h4>
              <ul>
                {offerings.map((element, index) => (
                  <li key={index} style={{ listStyle: "inside" }}>
                    {element.trim()}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
      <hr />
      <footer>
        <h3>Job Preferences</h3>
        <p>{job.preference}</p>
      </footer>
    </div>
  );
};
