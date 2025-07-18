import React from 'react'
import { LuUserPlus } from "react-icons/lu";
import { VscTasklist } from "react-icons/vsc";
import { BiSolidLike } from "react-icons/bi";

const HowItWorks = () => {
  return (
<section className="howItWorks">
      <h3>How It Works</h3>
      <div className="container">
        <div className="card">
          <div className="icon">
            <LuUserPlus />
          </div>
          <h4>Sign Up Effortlessly</h4>
          <p>
            Create your free account as a job seeker or employer in just a few clicks. Personalize your profile to stand out—highlight your skills, experience, or hiring needs to attract the right matches.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <VscTasklist />
          </div>
          <h4>Discover & Post Opportunities</h4>
          <p>
            Employers can post engaging job listings with detailed requirements. Job seekers can explore a wide range of roles, using smart filters to find positions that truly fit their goals and lifestyle.
          </p>
        </div>
        <div className="card">
          <div className="icon">
            <BiSolidLike />
          </div>
          <h4>Connect & Succeed</h4>
          <p>
            Employers easily connect with top talent and make offers. Job seekers can apply, interview, and accept offers that align with their ambitions. Start your journey to success with confidence and support at every step.
          </p>
        </div>
      </div>
    </section>  )
}

export default HowItWorks