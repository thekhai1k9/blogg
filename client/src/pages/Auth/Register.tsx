import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Wrapper } from '../../pages/styles'
import ImageRegister from '../../assets/images/image_register.jpg'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import authApi from '../../api/auth/authApi'
import toast from 'react-hot-toast'
import Button from '../../components/Button'

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  userName: string
  password: string
  phone?: string
  image: string
}

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phone: '',
    image: ''
  })

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }
  console.log(formValues)

  const ui_avatar_url = `https://ui-avatars.com/api/?name=${formValues.firstName} ${formValues.lastName}&size=64&background=random&rounded=true`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authApi.register({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        userName: formValues.userName,
        password: formValues.password,
        phone: formValues.phone,
        image: ui_avatar_url
      })
      toast.success('Thêm mới người dùng thành công.')
      navigate('/login')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra'
      toast.error(`${errorMessage}`)
    }
  }

  return (
    <Wrapper>
      <div className='register_home_page'>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <div className='register_form'>
          <Row>
            <Col xs={6}>
              <h2>Register</h2>
              <form className='register_form_register' onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input
                    type='text'
                    name='firstName'
                    id='firstName'
                    onChange={handleChange}
                    placeholder='Your First Name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input
                    type='text'
                    name='lastName'
                    id='lastName'
                    onChange={handleChange}
                    placeholder='Your Last Name'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input type='email' name='email' id='email' onChange={handleChange} placeholder='Your Email' />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input
                    type='text'
                    name='userName'
                    id='userName'
                    onChange={handleChange}
                    placeholder='Your User Name'
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
                    onChange={handleChange}
                    placeholder='Your Password'
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='name'>
                    <i className='zmdi zmdi-account material-icons-name'></i>
                  </label>
                  <input type='text' name='phone' id='phone' onChange={handleChange} placeholder='Your Phone' />
                </div>
                <div className='button-submit-form'>
                  <Button>Register now</Button>
                </div>
              </form>
            </Col>
            <Col xs={6}>
              <div className='register_image'>
                <figure className='register_image-container'>
                  <img src={ImageRegister} alt='Hình ảnh' />
                </figure>
                <Link to='/login' className='the_link'>
                  I am already member
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </Wrapper>
  )
}

export default Register
