import React,{useState} from 'react'
import {  NavLink, useNavigate} from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';


const Tasks = () =>
{
    const [images, setImages] = useState(null);
    const navigate = useNavigate();
    const [user,setUser] = useState({
        task_name:"",task_description:"",due_date:"",
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
         formData.append('task_name', user.task_name);
         formData.append('task_description', user.task_description);
         formData.append('due_date', user.due_date);
         
        

       

         axios.post('http://localhost:4000/addtask', formData)
         .then((response) => {
            swal("Congratulations!", "task Added Successful!", "success");
            console.log("Registration Successful");
            navigate("../");
            console.log(response);
          })
          .catch((error) => {
            swal("Congratulations!", "task Added Successful!", "success");
            console.log("Registration Successful");
            navigate("../");
          });   
    }

    

   return(
    <>
    
        <form method='POST'>
                            <div>
                                <label htmlFor='firstname'>
                                <i class="zmdi zmdi-account materials-icons-name"></i>
                                </label>
                                <input type="text" name="task_name" autoComplete='off' value={user.task_name} onChange={handleInputs} placeholder=' task name'/>
                            </div>

                            <div>
                                <label htmlFor='lastname'>
                                <i class="zmdi zmdi-account materials-icons-name"></i>
                                </label>
                                <input type="text" name="task_description" autoComplete='off' value={user.task_description} onChange={handleInputs} placeholder=' task description'/>
                            </div>

                            <div>
                                <label htmlFor='email'>
                                <i class="zmdi zmdi-email materials-icons-name"></i>
                                </label>
                                <input type="date" name="due_date"  autoComplete='off'  value={user.due_date} onChange={handleInputs} placeholder=' Due date'/>
                            </div>

                           

                           

                            <div>
                                <input type="submit" class="signup-submit1 align-2" value="Add new task" onClick={PostData} />                        
                            </div>
        </form>
    </>
   )
}

export default Tasks