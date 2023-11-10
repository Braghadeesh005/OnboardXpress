import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import './ManagerDatabase.css'

function ManagerDatabase() {
  const [images, setImages] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [phone, setPhone] = useState('');
 

  useEffect(() => {
    fetchUsers();
  }, []); 


  const fetchUsers = async () => {
    const response = await axios.get('http://localhost:4000/managers');
    setImages(response.data);
  };

  const handleEdit = (userId) => {
    setEditingUserId(userId);
    const user = images.find((images) => images._id === userId);
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setDepartment(user.department);
    setPhone(user.phone);
    
  };

  const handleSave = async (userId) => {
    const updatedUser = { firstname, lastname, email, department, phone};
    const response = await axios.put(`http://localhost:4000/managers/${userId}`, updatedUser);
    console.log(response.data);
    setEditingUserId(null);
    fetchUsers();
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setFirstname('');
    setLastname('');
    setEmail('');
    setDepartment('');
    setPhone('');
    
  };

  const handleDelete = async (userId) => {
    const response = await axios.delete(`http://localhost:4000/managers/${userId}`);
    console.log(response.data);
    fetchUsers();
  };

  return (
    <div >
      <h1>MANAGER DATABASE</h1>
      <NavLink to='/manager-register'>Add New Manager</NavLink>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {images.map((image) => (
            <tr key={image._id}>
              <td>
              
              <img src={image.avatar} className='img' />
             
              </td>
              <td>
                {editingUserId === image._id ? (
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                ) : (
                  image.firstname
                )}
              </td>
              <td>
                {editingUserId === image._id ? (
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                ) : (
                  image.lastname
                )}
              </td>
              <td>
                {editingUserId === image._id ? (
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  image.email
                )}
              </td>
              <td>
                {editingUserId === image._id ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  image.phone
                )}
              </td>
              <td>
                {editingUserId === image._id ? (
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  />
                ) : (
                  image.department
                )}
              </td>
              <td>
                {editingUserId === image._id ? (
                  <>
                    <section><button onClick={() => handleSave(image._id)}>Save</button>
                    <button onClick={handleCancelEdit}>Cancel</button></section>
                  </>
                ) : (
                  <>
                   <section><button onClick={() => handleEdit(image._id)}>Edit</button>
                    <button onClick={() => handleDelete(image._id)}>Delete</button></section>
                  </>
                )}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink to='/hr-database'>Goto HR Database</NavLink>
      <NavLink to='/employee-database'>Goto Employee Database</NavLink>
     
    </div>
  );
}

export default ManagerDatabase; 