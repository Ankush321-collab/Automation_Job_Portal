import React from 'react'

export const TopPreference = () => {
    const services = [
        {
          id: 1,
          service: "Software Development",
          description:
            "Transform your ideas into robust, scalable software solutions. Our expert developers craft custom applications that drive innovation and deliver real business value.",
        },
        {
          id: 2,
          service: "Web Development",
          description:
            "Build a powerful online presence with stunning, responsive websites. From sleek designs to seamless integrations, we create web experiences that captivate and convert.",
        },
        {
          id: 3,
          service: "Data Science",
          description:
            "Unlock the power of your data. Our data scientists turn complex information into actionable insights, helping you make smarter, data-driven decisions.",
        },
        {
          id: 4,
          service: "Cloud Computing",
          description:
            "Scale your business with secure, flexible cloud solutions. We manage your data and applications in the cloud, ensuring reliability, efficiency, and peace of mind.",
        },
        {
          id: 5,
          service: "DevOps",
          description:
            "Accelerate your development lifecycle. Our DevOps experts streamline processes, automate workflows, and foster collaboration for faster, more reliable releases.",
        },
        {
          id: 6,
          service: "Mobile App Development",
          description:
            "Engage your audience on the go. We design and develop intuitive mobile apps for iOS and Android, delivering seamless experiences that users love.",
        },
      ];
    
  return (
    <section className='services'>
        <h3>Top Preferences</h3>
        <div className='grid'>
            {services.map((element)=>{
                return(
                    <div className='card' key={element.id}>
                       <h4>{element.service}</h4>
                       <p>{element.description}</p>
                        </div>
                )
            })}
        </div>

    </section>
  )
}
