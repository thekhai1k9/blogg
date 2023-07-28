import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../api/auth/authApi'
import { AuthContext, AuthContextProps } from '../../context/authContext'
import toast from 'react-hot-toast'

export interface LoginForm {
  userName: string
  password: string
}

const LoginBefore: React.FC = () => {
  const [formValues, setFormValues] = useState<LoginForm>({
    userName: '',
    password: ''
  })

  const navigate = useNavigate()
  const [error, setError] = useState<boolean>(false)
  const loginContext: AuthContextProps | undefined = useContext(AuthContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await loginContext?.loginContext({
        userName: formValues.userName,
        password: formValues.password
      })

      const response = await authApi.login({
        userName: formValues.userName,
        password: formValues.password
      })

      window.localStorage.setItem('token', response.data.token)
      navigate('/')
      toast.success('Đăng nhập thành công')
    } catch (error: any) {
      setError(true)
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra'
      toast.error(`${errorMessage}`)
    }
  }
  return (
    <div className='home_wrapper_box'>
      <aside className='home_wrapper_box-authen'>
        <span className='authen--login-now'>Đã có tài khoản?</span>
        <h3 className='home_wrapper_box-authen-title'>Đăng nhập ngay</h3>
        <form className='home_wrapper_box-form'>
          <div className='input_box'>
            <span className='icon'>
              <i className='fa-regular fa-user'></i>
            </span>
            <input name='userName' id='userName' type='text' required onChange={handleChange} placeholder='Tài khoản' />
            {/* <label htmlFor='userName'>Tài khoản</label> */}
          </div>
          <div className='input_box'>
            <span className='icon'>
              <i className='fa-solid fa-lock'></i>
            </span>
            <input
              type='password'
              name='password'
              id='password'
              required
              onChange={handleChange}
              placeholder='Mật khẩu'
            />
            {/* <label htmlFor='password'>Password</label> */}
            {error && <span style={{ fontSize: 8 }}>Login failed. Please try again.</span>}
          </div>
          <div className='input_box-social'>
            <p className='input_box-social-content'>
              <Link to='/' className='the_link'>
                <span>
                  <img alt='hinh_anh' src='https://blogradio.vn/frontend_res/assets/img/fb1.png' />
                </span>
              </Link>
              <span>OR</span>
              <Link to='/' className='the_link'>
                <span>
                  <img alt='hinh_anh' src='https://blogradio.vn/frontend_res/assets/img/gplus1.png' />
                </span>
              </Link>
            </p>
          </div>
          <div className='input_box-button'>
            <Link to='/' className='the_link'>
              <button onClick={handleSubmit}>Đăng nhập</button>
            </Link>
            <Link to='/register' className='the_link'>
              <button>Đăng kí</button>
            </Link>
          </div>
          <div className='input_box-help'>
            <p className='input_box-help-remember'>
              <input type='checkbox' id='remember' name='remember' value='1' />
              <label htmlFor='remember'>ghi nhớ mật khẩu</label>
            </p>
            <p className='input_box-help-remember'>
              <Link to='/' className='the_link'>
                Quên mật khẩu
              </Link>
            </p>
          </div>
          {/* {error && <p>Login failed. Please try again.</p>} */}
        </form>
      </aside>
    </div>
  )
}

export default LoginBefore
