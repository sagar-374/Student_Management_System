import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const[formdata,setformdata] = useState({
  email:"",
  password:"",
});

const handleChange = (e) => {
  setformdata({...formdata,[e.target.name]:e.target.value});
}

const formsubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post("http://localhost:8085/login",formdata);
    alert("Login Successful");
    localStorage.setItem("student", JSON.stringify(res.data));
    navigate("/student_list"); 
  } catch (error) {
    if (error.response?.status === 401) {
      alert("Invalid Email or Password");
    } else {
      alert("Server Error");
    }
  }
};

  return (
    <>
      <div className='row'>
        <div className='col-sm-4'></div>

        <div className='col-sm-4'>
          <h1>Login Form</h1><br />
          <form onSubmit={formsubmit}>
            <input type="email" placeholder="Enter your email" className='form-control' name="email" value={formdata.email} onChange={handleChange}/><br />
            <input type="password" placeholder="Enter your password" className='form-control' name="password" value={formdata.password} onChange={handleChange}/><br />
            <button className='btn btn-info'>Submit</button>
          </form>
        </div>

        <div className='col-sm-4'></div>
      </div>
    </>
  );
};

export default Login;
