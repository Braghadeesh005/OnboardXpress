import React,{useState} from 'react'
import '../Apply-Now/Applynow.css'
import Navbar from '../Navbar/Navbar';
const Applynow = () => {


    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        address: '',
        contactno: '',
        emergencycontact: '',
        role: '',
      });
    
      const [errors, setErrors] = useState({});
    
      // Handle form input changes
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // Handle form submission
      const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length === 0) {
          // Form is valid, submit the data to the server or take further action
          console.log('Form data submitted:', formData);
        } else {
          // Form is invalid, display validation errors
          setErrors(validationErrors);
        }
      };
    
      // Validation function to check for errors
      const validateForm = (data) => {
        const errors = {};
        // Example: Check if the first name is not empty
        if (!data.firstname.trim()) {
          errors.firstname = 'First Name is required';
        }

        if (formData.lastname.trim() === '') {
            errors.lastname = 'Last name is required';
          }
          if (formData.email.trim() === '') {
            errors.email = 'Email is required';
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is not valid';
          }
          if (formData.address.trim() === '') {
            errors.address = 'Address is required';
          }
          if (formData.contactno.trim() === '') {
            errors.contactno = 'Contact number is required';
          }
          if (formData.emergencycontact.trim() === '') {
            errors.emergencycontact = 'Emergency contact is required';
          }
          if (formData.role.trim() === '') {
            errors.role = 'role is required';
          }
        // Add more validation rules for other fields here
    
        return errors;
      };


  return (
        <>
      
    <div class="background">
        <div class="shape"></div>
        <div class="shape"></div>
    </div>
    
    <form onSubmit={handleSubmit}>
       

        <div className='register-form'>

            <div className='reg-left'>

        <label htmlFor="firstname">First Name</label>
        <input
              type="text"
              placeholder="First Name"
              name="firstname"
              value={formData.firstname}
              onChange={handleInputChange}
            />
            {errors.firstname && <span className="error">{errors.firstname}</span>}

            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              name="lastname"
              value={formData.lastname}
              onChange={handleInputChange}
            />
            {errors.lastname && <p className="error">{errors.lastname}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
            <label htmlFor="address">Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="error">{errors.address}</p>}
            <label htmlFor="contactno">Contact Number</label>
            <input
              type="number"
              placeholder="Contact Number"
              name="contactno"
              value={formData.contactno}
              onChange={handleInputChange}
            />
            {errors.contactno && <p className="error">{errors.contactno}</p>}
            <label htmlFor="emergencycontact">Emergency Contact</label>
            <input
              type="number"
              placeholder="Emergency Contact"
              name="emergencycontact"
              value={formData.emergencycontact}
              onChange={handleInputChange}
            />
            {errors.emergencycontact && (
              <p className="error">{errors.emergencycontact}</p>
            )}

        </div>

        <div className='reg-right'>

        <label htmlFor="role">Role</label>
        <select name="role"  value={formData.role} onChange={handleInputChange}>
        <option value="role">Role</option>
        <option value="productmanager">Product Manager</option>
        <option value="webdevelopment">Web Development</option>
        <option value="mobileappdevelopment">Mobile App Development</option>
        <option value="testing">Testing</option>
        <option value="maintenence">Maintenence</option>
        <option value="development">Deployment</option>
        <option value="requirementsgathering">Requirments Gathering</option> 
        </select>
        {errors.role && (
              <p className="error">{errors.role}</p>
            )}                      

        <label htmlFor="profilepic">Profile Picture</label>
        <input type="file" placeholder="Profile Picture" name="password"/>

        <label htmlFor="aadhar">Aadhar</label>
        <input type="file" placeholder="Aadhar" name="aadhar"/>

        <label htmlFor="pancard">Pancard</label>
        <input type="file" placeholder="Pan Card" name="pancard"/>

        <label htmlFor="resume">Resume</label>
        <input type="file" placeholder="Resume" name="resume"/>

        <button>Log In</button>
        

        </div>

        </div>
    </form>
    

        </>
  )
}

export default Applynow