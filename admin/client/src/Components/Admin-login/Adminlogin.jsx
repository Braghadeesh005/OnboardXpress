import React,{useState} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import swal from 'sweetalert';

const Adminlogin = () => {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const loginUser = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/adminsignin', {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                email,password
            })
        });
        const data = res.json();
        if(res.status === 400 || !data){
            swal( "Invalid Credentials!","...", "error");
        }
        else{
            swal("Congratulations!", "Login Successful!", "success");
            navigate("../manager-database");
        }
    } 
  return (
    <>
   
        <form method='POST'>

        <div>
            <label htmlFor='email'>
                <i class="zmdi zmdi-email materials-icons-name"></i>
            </label>
            <input type="email" name="email" className='input' autoComplete='off' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Your email'/>
        </div><br/>
                        
        <div>
            <label htmlFor='password'>
                <i class="zmdi zmdi-lock materials-icons-name"></i>
            </label>
            <input type="password" name="password" className='input' autoComplete='off' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Your Password'/>
        </div><br/>
                         
        <div>
            <input type="submit" name="signin" class="signup-submit" value="LOGIN" onClick={loginUser}/>
        </div>

        </form>
   </>
  )
}

export default Adminlogin