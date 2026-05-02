import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container text-center mt-5">
        <h1>Student Management System</h1>
        <p className="mt-3">Manage student details.</p>

        <div className="mt-4">
          <Link to="/login" className="btn btn-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-success">Register</Link>
        </div>
      </div>
    </>
  );
};

export default Home;
