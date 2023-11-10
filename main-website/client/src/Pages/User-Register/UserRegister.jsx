import React, {useState} from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import swal from 'sweetalert';
import Navbar from '../Navbar/Navbar2';
import './UserRegister.css'
const UserRegister = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;

  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, password } = user;

    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      swal( "Invalid Credentials!","...", "error");
      console.log("Invalid Registration");
    } else {
      swal("Verify Now!", "Go to your mail right now!", "success");
      console.log("Successfull Registration");
      // navigate("../");
    }
  };

  const handleGoogleAuthClick = () => {
    // Redirect to the Google authentication URL
    window.open(
      `http://localhost:4000/auth/google/signup/callback`,
      '_self'
    );
  };

  return (
    <>
    <Navbar/>
    

    <form method="POST">
              <div className="c1">Name</div>
              <input
                type="text"
                name="name"
                autoComplete="off"
                className="c2"
                value={user.name}
                onChange={handleInputs}
                placeholder="Your Name"
              />

              <div className="c1">Email</div>
              <input
                type="text"
                name="email"
                autoComplete="off"
                className="c2"
                value={user.email}
                onChange={handleInputs}
                placeholder="Your email"
              />

              <div className="c1">Password</div>
              <input
                type="password"
                name="password"
                autoComplete="off"
                className="c2"
                value={user.password}
                onChange={handleInputs}
                placeholder="Your Password"
              />

              <div className="c3">
                <NavLink to="/user-login">Already have an account? Login</NavLink>
              </div>

              <input
                type="submit"
                name="signup"
                className="c2 submit"
                value="Register"
                onClick={PostData}
              />
            </form>

            <div className='google-button'>
            <button  onClick={handleGoogleAuthClick} className='google-button-1' > Login/Signup with Google </button>
            </div>

    </>


  )
}

export default UserRegister