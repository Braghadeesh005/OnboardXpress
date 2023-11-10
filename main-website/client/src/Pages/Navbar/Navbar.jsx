import React from 'react'
import {NavLink} from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <>
    <div className='menubar'>
      <div className='menuitem-title'><b>OnboardXpress</b></div>
      <NavLink className='nav-menu' to='/'><div className='menuitem'>Home</div></NavLink>
      <NavLink className='nav-menu' to='/login'><div className='menuitem'>Staff Login</div></NavLink>
      {/* <NavLink className='nav-menu' to='/apply'><div className='menuitem'>Apply Now</div></NavLink> */}
      {/* <NavLink className='nav-menu' to='/user-register'><div className='menuitem'>Register/Login</div></NavLink> */}
      <NavLink className='nav-menu' to='/about'><div className='menuitem'>About</div></NavLink>
      <NavLink className='nav-menu' to='/terms'><div className='menuitem'>Support</div></NavLink>
      <NavLink className='nav-menu' to='/home'><div className='menuitem'>Logout</div></NavLink>
    </div>
    </>
  )
}

export default Navbar