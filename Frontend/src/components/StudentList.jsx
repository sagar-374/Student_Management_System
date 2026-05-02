import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentList = () => {

  const API = import.meta.env.VITE_API_URL;

  const [students, setStudents] = useState([]);
  const [editData, seteditData] = useState(null);

  const fetchstudents = async () => {
    try {
      const res = await axios.get(`${API}/viewstudents`);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
      alert("Fail");
    }
  };

  const handleChange = (e) => {
    seteditData({ ...editData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchstudents();
  }, []);

  const deleteStudent = async (id) => {
    if (window.confirm("Are you sure ?")) {
      try {
        await axios.delete(`${API}/deletestudent/${id}`);
        alert("Student deleted successfully");
        fetchstudents();
      } catch (err) {
        console.log(err);
        alert("Fail");
      }
    }
  };

  const profileEdit = (student) => {
    seteditData(student);
  };

  const formsumbit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/updatestudent/${editData.id}`, editData);
      alert("Student updated successfully");
      seteditData(null);
      fetchstudents();
    } catch (err) {
      console.log(err);
      alert("Fail");
    }
  };

  return (
    <>
      <table className="table table-bordered table-striped table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s, index) => (
            <tr key={s.id}>
              <td>{index + 1}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.password}</td>
              <td>{s.contact}</td>
              <td>
                <button className="btn btn-danger btn-sm me-2"
                  onClick={() => deleteStudent(s.id)}>Delete</button>

                <button className="btn btn-info btn-sm"
                  onClick={() => profileEdit(s)}>Profile Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editData && (
        <form onSubmit={formsumbit}>
          <input type="text" name="name" value={editData.name} onChange={handleChange} /><br /><br />
          <input type="email" name="email" value={editData.email} onChange={handleChange} /><br /><br />
          <input type="password" name="password" value={editData.password} onChange={handleChange} /><br /><br />
          <input type="number" name="contact" value={editData.contact} onChange={handleChange} /><br /><br />
          <button type="submit">Submit</button>
        </form>
      )}
    </>
  );
};

export default StudentList;