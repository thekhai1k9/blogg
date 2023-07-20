import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LogoNavbar from '../assets/images/logo.png'
import { AuthContext, AuthContextProps } from '../context/authContext'

const Navbar: React.FC = () => {
  const navigate = useNavigate()
  // currentUser
  const currentUser: any = useContext(AuthContext)
  // LogoutContext
  const logoutContext: AuthContextProps | undefined = useContext(AuthContext)
  // Handle sự kiện đăng xuất tài khoản
  const handleLogout = async () => {
    if (logoutContext) {
      await logoutContext.logoutContext()
      navigate('/')
    }
  }

  return (
    <div className='navbar_wrapper'>
      <div className='navbar_container'>
        <div className='navbar_logo'>
          <img src={LogoNavbar} alt='anh_logo' className='navbar_logo_style' />
        </div>
        <div className='navbar_links'>
          <Link className='link' to='/'>
            <h4>Home</h4>
          </Link>
          <Link className='link' to='/?cat=art_1'>
            <h4>Phần mềm</h4>
          </Link>
          <Link className='link' to='/?cat=art_2'>
            <h4>Thủ thuật</h4>
          </Link>
          <Link className='link' to='/?cat=art_3'>
            <h4>Share</h4>
          </Link>
          <Link className='link' to='/?cat=art_4'>
            <h4>Code</h4>
          </Link>
          <span className='navbar_links--user navbar__cursor'>{currentUser?.currentUser?.userName}</span>
          {currentUser.currentUser ? (
            <span className='navbar_links--logout navbar__cursor' onClick={handleLogout}>
              Logout
            </span>
          ) : (
            <Link to='/login'>Login</Link>
          )}
          {/* {currentUser?.currentUser?.isAdmin === '1' && ( */}
          <span className='navbar_links-write'>
            <Link className='link' to='/write'>
              Write
            </Link>
          </span>
          {/* )} */}
        </div>
      </div>
    </div>
  )
}

export default Navbar
