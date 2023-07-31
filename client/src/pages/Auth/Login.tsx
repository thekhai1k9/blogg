import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet'
import ImageLogin from '../../assets/images/image_login.jpg'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../api/auth/authApi'
import { AuthContext, AuthContextProps } from '../../context/authContext'
import { Wrapper } from '../styles'
import { Col, Row } from 'react-bootstrap'
import Button from '../../components/Button'
import toast from 'react-hot-toast'

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
      toast.success('Đăng nhập thành công')
      navigate('/')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy vui lòng thử lại sau'
      toast.error(`${errorMessage}`)
    }
  }

  return (
    <Wrapper>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <section className='login_form_wrapper'>
        <Row>
          <Col xs={6}>
            <div className='login_image'>
              <figure className='login_image-container'>
                <img src={ImageLogin} alt='Hình ảnh' />
              </figure>
              <Link to='/register' className='the_link'>
                Create an account
              </Link>
            </div>
          </Col>
          <Col xs={6}>
            <form className='login_form' onSubmit={handleSubmit}>
              <h2>Login</h2>
              <div className='form-group'>
                <label htmlFor='name'>
                  <i className='zmdi zmdi-account material-icons-name'></i>
                </label>
                <input
                  name='userName'
                  id='userName'
                  type='text'
                  required
                  onChange={handleChange}
                  placeholder='Tên đăng nhập'
                />
              </div>
              <div className='form-group'>
                <label htmlFor='name'>
                  <i className='zmdi zmdi-account material-icons-name'></i>
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  required
                  onChange={handleChange}
                  placeholder='Mật khẩu'
                />
              </div>
              <div className='form-group_check-box'>
                <input type='checkbox' name='remember-me' id='remember-me' className='agree-term' />
                <label htmlFor='remember-me' className='label-agree-term'>
                  <span>Remember me</span>
                </label>
              </div>
              <div className='button-submit-form'>
                <Button>Login now</Button>
              </div>
            </form>
          </Col>
        </Row>
      </section>
    </Wrapper>
  )
}

export default Login
