import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './abcdef.css'
import Navbar from '../Navbar/Navbar';

function EmployeeTasks() {
  const [images, setImages] = useState([]);


 

  useEffect(() => {
    fetchUsers();
  }, []); 


  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:4000/tasks-fetch');
    setImages(response.data);
  };

 

  

  return (<>
    <Navbar/>
    <div className='tasked'>
      <div className='rab2'>
      <div className='rab12'><h1 className='rab'>Welcome <span className='rab-5'>Braghadeesh</span>!</h1></div>
      <div  className='rab3'><NavLink className='navlink-rab' to='/'> Logout</NavLink></div>
      </div>
 
    <div className='rab-table'>
      <table>
        <thead>
          <tr>
        
            <th>TASK </th>
            <th>DESCRIPTION</th>
            <th>DUE DATE</th>
            <th>STATUS</th>
           
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image._id}>
             
              <td>
                {
                  image.task_name
                }
              </td>

              <td>
                {
                  image.task_description
                }
              </td>

              <td>
              {new Date(image.due_date).toLocaleString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })}
              </td>

              <td>
                <NavLink to='#' className='mark'>Completed</NavLink>
              </td>
             
             
             
            </tr>

          ))}
        </tbody>
      </table>
      </div>
     
    </div></>
  );
}

export default EmployeeTasks; 