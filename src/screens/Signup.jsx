import React,{useState} from 'react';
import {Link} from "react-router-dom";

function Signup() {
    const[credentials,setCredentials] = useState({name:"",email:"",password:"",geolocation:""});

    const handleSubmit=async(e)=> {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/createuser",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:credentials.name, email:credentials.email,password:credentials.password, location:credentials.geolocation})
        })
        const json = await response.json();
        console.log(json)

        if(!json.success) {
            alert("Enter Valid Credentials");
        }

    }
    const onChange = (event) => {
        setCredentials({...credentials,[event.target.name]:event.target.value})
    }
  return (
    <div>
    <div className='container'> 
<form onSubmit={handleSubmit}>
<div className="form-group">
    <label htmlFor="exampleInputEmail1">Name</label>
    <input type="text"name="name" value={credentials.name} htmlFor="name" onChange={onChange} aria-describedby="emailHelp" className='form-control' placeholder="Enter Your Name"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" name="email" onChange={onChange}value={credentials.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input name="password" onChange={onChange} value={credentials.password}type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Address</label>
    <input name="geolocation" onChange={onChange} value={credentials.geolocation}type="text"  className="form-control" id="exampleInputPassword1" placeholder="Enter Your Location"/>
  </div>
  <button type="submit" className=" m-3 btn btn-success">Submit</button>
  <Link to="/login" className="m-3 btn btn-primary">Already a User?</Link>
</form>      
</div>
  
    </div>
  )
}

export default Signup
