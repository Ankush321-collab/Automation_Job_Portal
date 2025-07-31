import React, { useState,useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { clearAllJobErrors, fetchjobs } from '../store/slice/job_slice';
import { toast } from "react-toastify";
import { Spinner } from '../Components/Spinner';
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom'

export const Job = () => {
    const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [preferences, setpreferences] = useState("");
  const [selectedpreference, setselectedpreference] = useState("");
  const [keyword, setkeyword] = useState("");
  const {jobs,loading,error}=useSelector((state)=>state.jobs)

  const handlecitychange=(selectedCity)=>{
    setCity(selectedCity);
    setSelectedCity(selectedCity);
  }

  const handleprefernce=(selectedPreference)=>{
    setpreferences(selectedPreference);
    setselectedpreference(selectedPreference);
  };
  const dispatch=useDispatch();

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllJobErrors())
    }
    dispatch(fetchjobs(city,preferences,keyword))
    
  }, [dispatch,error,city,preferences])

  const handlesearch=()=>{
    dispatch(fetchjobs(city,preferences,keyword));
  };

  const cities=[
    "All",
    "kathmandu",
    "pokhara",
    "butwal",
    "janakpur",
    "delhi",
    "mumbai",
    "banglore",
    "kolkata",
    "punjab",
    "jaipur",
    "nepalgunj",
    "patna",
    "lucknow",
    "vijaywada",
    "hyderbad",
    "chennai",
    "kerala",

  ];

  const preferencies=[
    "All",
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

  ]

  
  return (
    <>
    {loading ? <Spinner/> : (
      <section className='jobs'>
        <div className='search-tab-wrapper' style={{marginBottom: 40}}>
          <input 
            type="text" 
            value={keyword}
            onChange={(e)=>setkeyword(e.target.value)}
            placeholder="Search jobs by keyword, company, or title..."
            style={{boxShadow: '0 2px 12px rgba(0,0,0,0.04)', fontSize: 18}}
          />
          <button className="btn" onClick={handlesearch} style={{position: 'absolute', right: 16, top: 11, zIndex: 2}}>Find Jobs</button>
          <FaSearch style={{display: 'none'}}/>
        </div>
        <div className='wrapper'> 
          <div className="filter-bar" style={{background: '#fff', borderRadius: 10, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.06)'}}>
            <div className="cities">
              <h2>Filter job By City</h2>
              {
                cities.map((city,index)=>{
                  return (
                    <div key={index}>
                      <input type='radio' id={city} name='city' value={city} checked={selectedCity===city}
                      onChange={()=>handlecitychange(city)}
                      />
                      <label htmlFor={city}>{city}</label>
                    </div>
                  )
                })
              }
            </div>
            <div className="cities">
              <h2>Filter job By Prefernces</h2>
              {
                preferencies.map((preference,index)=>{
                  return (
                    <div key={index}>
                      <input type='radio' id={preference} name='preferences' value={preference} checked={selectedpreference===preference}
                      onChange={()=>handleprefernce(preference)}
                      />
                      <label htmlFor={preference}>{preference}</label>
                    </div>
                  )
                })
              }
            </div>

          </div>
          <div className="container">
            <div className="mobile-filter">
              <select value={city} onChange={(e)=>setCity(e.target.value)}>
                <option value="">
                  Filter By City
                </option>
                {
                  cities.map((city,index)=>(
                    <option value={city} key={index} >
                      {city}
                    </option>
                  ))
                }
              </select>
              <select value={preferences} onChange={(e)=>setpreferences(e.target.value)}>
                <option value="">
                  Filter By Preferences
                </option>
                {
                  preferencies.map((preference,index)=>(
                    <option value={preference} key={index} >
                      {preference}
                    </option>
                  ))
                }
              </select>
            </div>
            <div className="jobs_container">
              {
                jobs && jobs.length > 0 ? jobs.map(elements =>{
                  return (
                    <div className='card' key={elements._id} style={{boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #ececec', borderRadius: 12, padding: 32, background: '#fff', transition: '0.3s', display: 'flex', flexDirection: 'column', gap: 12}}>
                      {String(elements.hiringmultiple).trim().toLowerCase() === "yes" ? (
                        <p className='hiring-multiple' style={{marginBottom: 8}}>
                          Hiring Multiple Candidates
                        </p>
                      ) : (
                        <p className='hiring' style={{marginBottom: 8}}>Hiring</p>
                      )}
                      <p className='title' style={{fontSize: 26, fontWeight: 700, marginBottom: 6}}>{elements.title}</p>
                      <p className='company' style={{fontWeight: 500, color: '#222', marginBottom: 2}}>{elements.company}</p>
                      <p className='location' style={{marginBottom: 2}}>{elements.location}</p>
                      <p className='salary' style={{marginBottom: 2}}><span>Salary:</span> Rs. {elements.salary}</p>
                      <p className='posted' style={{marginBottom: 12}}>
                        <span>Posted On:</span> {elements.jobpostedon.substring(0, 10)}
                      </p>
                      <div className='btn-wrapper' style={{marginTop: 10}}>
                        <Link to={`/application/${elements._id}`} className="btn" style={{fontSize: 18, padding: '10px 32px'}}>Apply Now</Link>
                      </div>
                    </div>
                  )
                }) : (
                  <div style={{textAlign: 'center', color: '#888', fontSize: 22, padding: 40}}>No jobs found matching your criteria.</div>
                )
              }
            </div>
          </div>

        </div>

      </section>

    )}
    </>
  )
}
