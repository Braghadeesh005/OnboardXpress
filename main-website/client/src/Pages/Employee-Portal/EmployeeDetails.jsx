import React,{useState,useEffect} from 'react'
import {NavLink} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios'



const EmployeeDetails = () => {

  // to fetch user details and to authenticate
  const navigate=useNavigate();
  const [userData, setuserData] = useState({});
  const userPage = async () =>{
    try{ 
      const res = await fetch('http://localhost:4000/getEmployeeData',{
        method:"GET",
        headers:{
          Accept:"application/json",
          "Content-Type":"application/json"
        },          
        credentials:"include"
      });
      const data = await res.json();
      console.log(data);
      setuserData(data);
    }
    catch(err)
    {
      console.log(err);
      navigate("/");
      swal( "LOGIN TO CONTINUE!","...", "error");
    }
  }
  useEffect(()=>{
    userPage();
  },[]);




  return(
      <>
       
      

      
       <div className='user_details_panel'>
        <div className='user_details_inner_panel'>
        <div className='user_details_name'><b>NAME : </b>{userData.name}</div>
        {/* <div className='user_details_email'><b>EMAIL : </b>{userData.email}</div>
        <div className='user_details_logout_div'><NavLink to="/logout" className='user_details_logout_button'>LOGOUT</NavLink></div> */}
        </div>
       </div>

       

       
      </>
  )
}

export default EmployeeDetails

