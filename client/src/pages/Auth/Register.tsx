import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import authApi from '../../api/Auth/authApi'
import { Wrapper } from '../../pages/styles'

interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  userName: string
  password: string
  phone?: string
}

const Register: React.FC = () => {
  const [formValues, setFormValues] = useState<RegisterForm>({
    firstName: '',
    lastName: '',
    email: '',
    userName: '',
    password: '',
    phone: ''
  })

  const navigate = useNavigate()
  const [err, setErr] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await authApi.register({
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        email: formValues.email,
        userName: formValues.userName,
        password: formValues.password,
        phone: formValues.phone
      })
      navigate('/login')
    } catch (error: unknown) {
      setErr(true)
      // Handle error or display error message
    }
  }

  return (
    <Wrapper>
      <div>
        <Helmet>
          <title>Register</title>
        </Helmet>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' name='firstName' id='firstName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='lastName'>Last Name</label>
            <input type='text' name='lastName' id='lastName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='email'>Email</label>
            <input type='email' name='email' id='email' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='userName'>Username</label>
            <input type='text' name='userName' id='userName' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input type='password' name='password' id='password' onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='password'>Phone</label>
            <input type='text' name='phone' id='phone' onChange={handleChange} />
          </div>
          <button type='submit'>Register</button>
          {err && <p>This is valid error!, Please wait minutes</p>}
        </form>
      </div>
    </Wrapper>
  )
}

export default Register
