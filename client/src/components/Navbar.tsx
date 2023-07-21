import React from 'react'
import { Link } from 'react-router-dom'
import LogoNavbar from '../assets/images/logo.png'

const Navbar: React.FC = () => {
  return (
    <div className='navbar_wrapper'>
      <div className='navbar_container'>
        <Link to='/'>
          <div className='navbar_logo'>
            <img src={LogoNavbar} alt='anh_logo' className='navbar_logo_style' />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
