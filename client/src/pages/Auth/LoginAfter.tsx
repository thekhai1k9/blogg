import React, { useContext } from 'react'
import { AuthContext, AuthContextProps } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { Wrapper } from '../../pages/styles'
import SocialPage from '../../components/SocialPage'
import PostTrending from '../../components/PostTrending'

const LoginAfter: React.FC = () => {
  const navigate = useNavigate()
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
    <Wrapper>
      <div className='home_wrapper_box'>
        <div className='home_wrapper_box-login-after'>
          <h3 className='home_wrapper_box-title'>Thông tin cá nhân</h3>
          <p className='home_wrapper_box-avatar'>
            <div className='home_wrapper_box-image'>
              <img
                alt='hinh_anh'
                src='https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg'
              />
            </div>
            <p className='home_wrapper_box-name'>Khai Phung</p>
            <ul className='home_wrapper_box-info-account'>
              {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
              <li onClick={handleLogout}>Đăng xuất</li>
              <li>Thay đổi mật khẩu</li>
              <li>Xóa tài khoản</li>
              <li>Danh sách bài đăng của tôi</li>
            </ul>
          </p>
        </div>
        <SocialPage />
        <PostTrending />
      </div>
    </Wrapper>
  )
}

export default LoginAfter
