import React from 'react'
import {Link} from 'react-router-dom'

export const Notfound = () => {
  return (

    <section className="notfound">
    <div className="content">
      <h1>404 Not Found</h1>
      <p>Your Visited Page Not Found. You may go home page.</p>
      <Link to={"/"} className="btn">
        Back to home page
      </Link>
    </div>
  </section>
  )
}

