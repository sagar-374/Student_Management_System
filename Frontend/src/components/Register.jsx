import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const formsubmit = async (e) => {
    e.preventDefault();

    try {
      const API = import.meta.env.VITE_API_URL;

      await axios.post(`${API}/register`, formdata);

      alert("Registration Successfully Completed");

      setformdata({
        name: "",
        email: "",
        password: "",
        contact: "",
      });

      navigate("/student_list");

    } catch (err) {
      console.log(err);
      alert("Fail");
    }
  };

  return (
    <>
      <div className='row'>
        <div className='col-sm-4'></div>

        <div className='col-sm-4'>
          <h1>Registration Form</h1><br />

          <form onSubmit={formsubmit}>
            <input type="text" placeholder="Enter your name"
              className='form-control'
              name="name"
              value={formdata.name}
              onChange={handleChange}
            /><br />

            <input type="email" placeholder="Enter your email"
              className='form-control'
              name="email"
              value={formdata.email}
              onChange={handleChange}
            /><br />

            <input type="password" placeholder="Enter your password"
              className='form-control'
              name="password"
              value={formdata.password}
              onChange={handleChange}
            /><br />

            <input type="number" placeholder="Enter your contact"
              className='form-control'
              name="contact"
              value={formdata.contact}
              onChange={handleChange}
            /><br />

            <button className='btn btn-info'>Submit</button>
          </form>

        </div>

        <div className='col-sm-4'></div>
      </div>
    </>
  );
};

export default Register;