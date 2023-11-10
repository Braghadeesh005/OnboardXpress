import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import swal from 'sweetalert2';
import Navbar from '../Navbar/Navbar';
import './login.css'
function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(''); // No default role

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to the server
    const data = {
      name,
      email,
      role,
    };

    try {
      // Make a POST request to http://localhost:4000/login using Axios
      const response = await axios.post('http://localhost:4000/login', data,
        // withCredentials:true,
    );

      // const response = await fetch('http://localhost:4000/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      //   // credentials: 'include', // Include credentials (cookies)
      // });

      // Handle the response from the server as needed
      console.log('Login successful:', response.data);
      if(response.data == 'hr'){
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome HR',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('../employee-register');
      }
      else if(response.data == 'manager'){
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome Manager',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('../employee-database');
      }
      else if(response.data == 'employee'){
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Welcome Employee',
          showConfirmButton: false,
          timer: 1500
        })
        navigate('../tasks-employee');
      }
    } catch (error) {
      // Handle any errors from the server
      console.error('Login failed:', error);
    }
  };

  return (<> <Navbar/>
    
      
      <form onSubmit={handleSubmit}>


      <h2>Staff Login</h2>


      <div className='login-page'>


        
      <div className='login-1'>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            required
          />
        </div>

      </div>


      <div className='login-2'>
       

        <div>
          <label>Role:</label>
          <select onChange={(e) => setRole(e.target.value)} className='role'>
            <option value="">Select a role</option>
            <option value="hr">HR</option>
            <option value="manager">Manager</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        <div>  
          <button type="submit">Login</button>
        </div>
   
    </div>

    </div>

     
      </form>
      
    </>
  );
}

export default Login;
