import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../api/Auth/authApi'
import { AuthContext, AuthContextProps } from '../../context/authContext'

export interface LoginForm {
  userName: string
  password: string
}

const Login: React.FC = () => {
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
    } catch (error: unknown) {
      setError(true)
      // Xử lý lỗi hoặc hiển thị thông báo lỗi
    }
  }

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className='wrapper-form-login'>
        <div className='form__login__wraper'>
          <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className='input_box'>
              <span className='icon'>
                <i className='fa-regular fa-user'></i>
              </span>
              <input name='userName' id='userName' type='text' required onChange={handleChange} />
              <label htmlFor='userName'>Tài khoản</label>
            </div>
            <div className='input_box'>
              <span className='icon'>
                <i className='fa-solid fa-lock'></i>
              </span>
              <input type='password' name='password' id='password' required onChange={handleChange} />
              <label htmlFor='password'>Password</label>
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' name='rememberMe' />
                Remember for me
              </label>
              <span>Forgot password</span>
            </div>
            <button className='type__button' type='submit'>
              Login
            </button>
            <div className='register-page'>
              <p>
                Dont have an account? <Link to='/register'>Register</Link>
              </p>
            </div>
            {error && <p>Login failed. Please try again.</p>}
          </form>
        </div>
      </section>

      {/* <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='userName'>Username</label>
            <input type='text' name='userName' id='userName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={handleChange} />
          </div>
          <button type='submit'>Login</button>
          {error && <p>Login failed. Please try again.</p>}
        </form>
      </div> */}
    </>
  )
}

export default Login
