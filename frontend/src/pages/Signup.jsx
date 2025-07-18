import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const[showpass,setshowpass]=useState(false);
    const[loading,setloading]=useState(false);
    const [error,seterror]=useState("");
    const navigate=useNavigate();

    const [formdata, setformdata] = useState({
        fullname: "",
        role: "",
        email: "",
        phone: "",
        address: "",
        coverletter: "",
        first_preference: "",
        password: "",
        second_preference:"",
        third_preference:"",
        confirmpassword: "",
        resume:"",
      });
      const inputFields = [
        { label: "Full Name", name: "fullname", type: "text" },
        { label: "Email", name: "email", type: "email" },
        { label: "Phone", name: "phone", type: "tel" },
        { label: "Address", name: "address", type: "text" },
        { label: "Cover Letter", name: "coverletter", type: "textarea" }
      ];
      
      const handlechange=(e)=>{
        const{name,value}=e.target.value;
        setformdata({
            ...formdata,[name]:value
        });
      }

  return (
<>

</> 
 )
}
