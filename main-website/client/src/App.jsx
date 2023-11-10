import React from 'react'
import {Routes, Route} from "react-router-dom"

// Pages
import Home from './Pages/Home/Home'
import Home2 from './Pages/Home/Home2'
import About from './Pages/About/About'
import ApplyNow from './Pages/Apply-Now/Applynow'
import Login from './Pages/Login/Login'
import Terms from './Pages/Terms/Terms'
import UserRegister from './Pages/User-Register/UserRegister'
import EmployeeDetails from './Pages/Employee-Portal/EmployeeDetails'
import UserLogin from './Pages/User-login/UserLogin'
import ManagerRegister from './Pages/Hr-Portal/ManagerRegister'
import EmployeeRegister from './Pages/Hr-Portal/EmployeeRegister'
import Image from './Pages/Hr-Portal/Image'
import EmployeeDatabase from './Pages/Manager-portal/EmployeeDatabase'
import Tasks from './Pages/Manager-portal/Tasks'
import Chatbot from './Pages/chatbot/chatbot'
import EmployeeTasks from './Pages/Employee-Portal/EmployeeTasks'

//Routing
const Routing = () =>
{
  return(
    <Routes>     
      <Route path="/" element={<Home/>} /> 
      <Route path="/home" element={<Home2/>} /> 
      <Route path="/about" element={<About/>} /> 
      <Route path="/apply" element={<ApplyNow/>} /> 
      <Route path="/login" element={<Login/>} /> 
      <Route path="/terms" element={<Terms/>} /> 
      <Route path="/user-register" element={<UserRegister/>} /> 
      <Route path="/user-login" element={<UserLogin/>} /> 
      <Route path="/employee-details" element={<EmployeeDetails/>} /> 
      <Route path="/manager-register" element={<ManagerRegister/>} /> 
      <Route path="/employee-register" element={<EmployeeRegister/>} /> 
      <Route path="/employee-database" element={<EmployeeDatabase/>} />
      <Route path="/image" element={<Image/>} /> 
      <Route path="/tasks" element={<Tasks/>} /> 
      <Route path="/Chat" element={<Chatbot/>} /> 
      <Route path="/tasks-employee" element={<EmployeeTasks/>} /> 
    </Routes>
  )
}
 
const App = () => {
 
  return (
    <>
      <Routing/>
    </> 
  )
}

export default App