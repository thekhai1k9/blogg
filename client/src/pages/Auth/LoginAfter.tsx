import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext, AuthContextProps } from '../../context/authContext'
import { Wrapper } from '../../pages/styles'
import toast from 'react-hot-toast'

const LoginAfter: React.FC = () => {
  const navigate = useNavigate()
  const currentUser: any = useContext(AuthContext)
  // LogoutContext
  const logoutContext: AuthContextProps | undefined = useContext(AuthContext)
  // Handle sự kiện đăng xuất tài khoản
  const handleLogout = async () => {
    if (logoutContext) {
      await logoutContext.logoutContext()
      navigate('/')
      toast.success('Đăng xuất thành công')
    }
  }
  return (
    <Wrapper>
      <div className='home_wrapper_box'>
        <div className='home_wrapper_box-login-after'>
          <h3 className='home_wrapper_box-title'>Thông tin cá nhân</h3>
          {currentUser?.currentUser && (
            <p className='home_wrapper_box-avatar'>
              <div className='home_wrapper_box-image'>
                <img alt='hinh_anh' src={currentUser?.currentUser.image} />
              </div>
              <p className='home_wrapper_box-name'>{`${currentUser?.currentUser.firstName} ${currentUser?.currentUser.lastName}`}</p>
              <ul className='home_wrapper_box-info-account'>
                {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
                <li onClick={handleLogout}>Đăng xuất</li>
                <li>Thay đổi mật khẩu</li>
                <li>Xóa tài khoản</li>
                <li>
                  <Link to='/edit-thong-tin' className='the_link'>
                    Thay đổi thông tin
                  </Link>
                </li>
                {currentUser?.currentUser?.isAdmin === '1' && (
                  <li>
                    <Link to='/write' className='the_link'>
                      Viết bài
                    </Link>
                  </li>
                )}
              </ul>
            </p>
          )}
        </div>
      </div>
    </Wrapper>
  )
}

export default LoginAfter
