import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import StudentList from './components/StudentList'
import Login from './components/Login'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student_list" element={<StudentList />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}

export default App
