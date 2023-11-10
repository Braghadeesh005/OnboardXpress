import React from 'react'
import {Routes, Route} from "react-router-dom"

import Adminlogin from './Components/Admin-login/Adminlogin'
import EmployeeRegister from './Components/Employee-register/EmployeeRegister'
import HrRegister from './Components/Hr-register/HrRegister'
import ManagerRegister from './Components/Manager-register/ManagerRegister'
import ManagerDatabase from './Components/Manager-Database/ManagerDatabase'
import HrDatabase from './Components/Hr-Database/HrDatabase'
import EmployeeDatabase from './Components/Employee-Database/EmployeeDatabase'

const Routing = () =>
{
  return(
    <Routes>     
      <Route path="/" element={<Adminlogin/>} /> 
      <Route path="/employee-register" element={<EmployeeRegister/>} /> 
      <Route path="/hr-register" element={<HrRegister/>} /> 
      <Route path="/manager-register" element={<ManagerRegister/>} /> 
      <Route path="/manager-database" element={<ManagerDatabase/>} /> 
      <Route path="/hr-database" element={<HrDatabase/>} /> 
      <Route path="/employee-database" element={<EmployeeDatabase/>} /> 
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
