import React,{useState} from 'react'
import {  NavLink, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';


const EmployeeRegister = () =>
{
    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    const [user,setUser] = useState({
        firstname:"",lastname:"",email:"",phone:"",emergencyphone:"",role:"",address:"",password:"",cpassword:"",
    });
    let name, value;  
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({...user, [name]:value});
    }
    const PostData = async (e) => 
    {

        e.preventDefault();
       
        
         const formData = new FormData();
         formData.append('firstname', user.firstname);
         formData.append('lastname', user.lastname);
         formData.append('email', user.email);
         formData.append('phone', user.phone);
         formData.append('emergencyphone', user.emergencyphone);
         formData.append('role', user.role);
         formData.append('address', user.address);
         formData.append('password', user.password);
         formData.append('cpassword', user.cpassword);
        

         // Append image files
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

         axios.post('http://localhost:4000/employee-register', formData)
         .then((response) => {
            swal("Congratulations!", "HR Added Successful!", "success");
            console.log("Registration Successful");
            navigate("../employee-register");
            console.log(response);
          })
          .catch((error) => {
            swal("Invalid Registration!", "Fill Properly Or The Email You Have Entered is Already Registered!", "error");
            console.log(error);
          });   
    }

    

   return(
    <>
    
        <form method='POST'>
                            <div>
                                <label htmlFor='firstname'>
                                <i class="zmdi zmdi-account materials-icons-name"></i>
                                </label>
                                <input type="text" name="firstname" autoComplete='off' value={user.firstname} onChange={handleInputs} placeholder=' First Name'/>
                            </div>

                            <div>
                                <label htmlFor='lastname'>
                                <i class="zmdi zmdi-account materials-icons-name"></i>
                                </label>
                                <input type="text" name="lastname" autoComplete='off' value={user.lastname} onChange={handleInputs} placeholder=' Last Name'/>
                            </div>

                            <div>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email materials-icons-name"></i>
                                </label>
                                <input type="email" name="email"  autoComplete='off'  value={user.email} onChange={handleInputs} placeholder=' Email ID'/>
                            </div>

                            <div>
                                <label htmlFor='phone'>
                                <i class="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                </label>
                                <input type="number" name="phone"  autoComplete='off'  value={user.phone} onChange={handleInputs} placeholder=' Phone Number'/>
                            </div>

                            <div>
                                <label htmlFor='emergencyphone'>
                                <i class="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                </label>
                                <input type="number" name="emergencyphone"  autoComplete='off'  value={user.emergencyphone} onChange={handleInputs} placeholder=' Emergency Phone Number'/>
                            </div>

                            <div>
                                <label htmlFor='role'>
                                <i class="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                </label>
                                <input type="text" name="role"  autoComplete='off'  value={user.role} onChange={handleInputs} placeholder=' Role'/>
                            </div>

                            <div>
                                <label htmlFor='address'>
                                <i class="zmdi zmdi-phone-in-talk materials-icons-name"></i>
                                </label>
                                <input type="text" name="address"  autoComplete='off'  value={user.address} onChange={handleInputs} placeholder=' Address '/>
                            </div>

                           


                            <div>
                                <label htmlFor='password'>
                                <i class="zmdi zmdi-lock materials-icons-name"></i>
                                </label>
                                <input type="password" name="password" autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Create a Password'/>
                            </div>

                            <div>
                                <label htmlFor='cpassword'>
                                <i class="zmdi zmdi-lock materials-icons-name"></i>
                                </label>
                                <input type="password" name="cpassword" autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm the Password'/>
                            </div>

                            <div className='image-container'>
                                <label htmlFor='image'>
                                <i class="fa fa-picture-o image-icon" aria-hidden="true"></i>
                                </label>
                                <input type="file" className='imageinput' name='images' multiple onChange={(e) => setImages(e.target.files)} />
                            </div>

                           

                            <div>
                                <input type="submit" class="signup-submit1 align-2" value="Add new Employee" onClick={PostData} />                        
                            </div>
        </form>
    </>
   )
}

export default EmployeeRegister