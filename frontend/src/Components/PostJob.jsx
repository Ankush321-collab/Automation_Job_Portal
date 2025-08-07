import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAllJobErrors, postjob, resetJobSlice } from '../store/slice/job_slice';
import { toast } from 'react-toastify';
// import { CiCircleInfo } from 'react-icons/ci'; // Uncomment if using this icon


const PostJob = () => {
  const [title, setTitle] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [location, setLocation] = useState("");
  const [companyname, setCompanyname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [qualification, setQualification] = useState("");
  const [offers, setOffers] = useState("");
  const [salary, setSalary] = useState("");
  const [hiringmultiple, setHiringmultiple] = useState("");
  const [personalwebsitetitle, setPersonalwebsitetitle] = useState("");
  const [personalwebsiteurl, setPersonalwebsiteurl] = useState("");
  const [preference, setPreference] = useState("");

  const {user,isAuthenticated}=useSelector((state)=>state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch=useDispatch();

  const handlepostjob=(e)=>{
    e.preventDefault();
    const formdata=new FormData();
    formdata.append("title",title);
    formdata.append("jobtype",jobtype);
    formdata.append("location",location);
    formdata.append("companyname",companyname);
    formdata.append("introduction",introduction);
    formdata.append("responsibilities",responsibilities);
    formdata.append("qualification",qualification);
   offers && formdata.append("offers",offers);
    formdata.append("salary",salary);
   hiringmultiple && formdata.append("hiringmultiple",hiringmultiple);
   personalwebsitetitle && formdata.append("personalwebsitetitle",personalwebsitetitle);
   personalwebsiteurl && formdata.append("personalwebsiteurl",personalwebsiteurl);
   preference && formdata.append("preference",preference);
    dispatch(postjob(formdata));

  }
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

  const cities=[
    "kathmandu",
    "vijaywada",
    "guntur",
    "pokhara",
    "vizag",
    "delhi","mumbai",
    "bangalore",
    "hyderabad",
    "chennai",
    "lumbini",
    "lalitpur",
    "birgunj",
    "sarlahi",
    "butwal",
    "nawalparasi"

  ]
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if(message){
      toast.success(message);
      dispatch(resetJobSlice())
    }
    
  },[dispatch,error,message]);


  return (
    <>
      <div className='account_components'>
        <h2>Post a Job</h2>
        <form onSubmit={handlepostjob}>
          <div>
            <label htmlFor="">Title</label>
            <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Job Type</label>
            <select value={jobtype} onChange={(e)=>setJobtype(e.target.value)}>
              <option value="">Select Job Type</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
            </select>
          </div>
          <div>
            <label>location(city)</label>
            <select value={location} onChange={(e)=>setLocation(e.target.value)}>
              <option value="">Select a location</option>
              {cities.map((city,index)=>(
                <option key={index} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Company name</label>
            <input type="text" value={companyname} onChange={(e)=>setCompanyname(e.target.value)} />  
          </div>
          <div>
            <label htmlFor="">Introdution(Job description)</label>
            <textarea value={introduction} onChange={(e)=>setIntroduction(e.target.value)}></textarea>
          </div>
          <div>
            <label htmlFor="">Responsibilities</label>
            <input type="text" value={responsibilities} onChange={(e)=>setResponsibilities(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Qualification</label>
            <textarea
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
              placeholder="Required Qualifications For Job"
              rows={7}
              cols={15}
            />
          </div>
          <div className="label-infoTag-wrapper">
            <label>What We Offer</label>
            <span>
              {/* <CiCircleInfo /> Optional */}
              Optional
            </span>
          </div>
          <textarea
            value={offers}
            onChange={(e) => setOffers(e.target.value)}
            placeholder="What are we offering in return!"
            rows={7}
          />
          <div>
            <label htmlFor="">Salary</label>
            <input type="text" value={salary} onChange={(e)=>setSalary(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Hiring Multiple</label>
            <select value={hiringmultiple} onChange={(e)=>setHiringmultiple(e.target.value)}>
              <option value="">Select Hiring Multiple</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Personal Website</label>
            <input type="text" value={personalwebsitetitle} onChange={(e)=>setPersonalwebsitetitle(e.target.value)} />
            <input type="text" value={personalwebsiteurl} onChange={(e)=>setPersonalwebsiteurl(e.target.value)} />
          </div>
          <div>
            <label htmlFor="">Preference</label>
            <select value={preference} onChange={(e)=>setPreference(e.target.value)}>
              <option value="">Select Preference</option>
              {preferencies.map((preference,index)=>(
                <option key={index} value={preference}>{preference}</option>
              ))}
            </select>
          </div>
          <button type="submit">Post Job</button>
        </form>
      </div>
    </>
  )
}

export default PostJob
