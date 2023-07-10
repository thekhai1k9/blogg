import React, { useState } from 'react'
import '../assets/scss/components_local_style.scss'
import Button from './Button'

interface FormDataTypes {
  userName: string
  password: string
}

interface FormProps {
  onSubmit: (formData: FormDataTypes) => void
  style?: React.CSSProperties
  onClick?: () => void
}

const FormLogin: React.FC<FormProps> = ({ onSubmit, style, onClick }) => {
  const [formData, setFormData] = useState<FormDataTypes>({
    userName: '',
    password: ''
  })

  const handleInputChange = (e: any) => {
    const { firstName, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [firstName]: value
    }))
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className='wrapper' style={{ backgroundColor: '#ecf0f3' }}>
      <div className='logo'>
        <img
          src='https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png'
          alt='image_bground'
        />
      </div>
      <div className='text-center mt-4 name'>Twitter</div>
      {/* FORM ===== */}
      <form className='p-3 mt-3 form__wrapper' onSubmit={handleSubmit} style={style} onClick={onClick}>
        <div className='form-field d-flex align-items-center'>
          <span className='far fa-user form-field--text' />
          <input
            type='text'
            name='userName'
            id='userName'
            placeholder='Username'
            value={formData.userName}
            onChange={handleInputChange}
          />
        </div>
        <div className='form-field d-flex align-items-center'>
          <span className='fas fa-key' style={{ color: '#555' }} />
          <input
            type='password'
            name='password'
            id='pwd'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <Button className='btn mt-3'>Login</Button>
      </form>
      <div className='text-center fs-6'>
        <a href='#'>Forget password?</a> or <a href='#'>Sign up</a>
      </div>
    </div>
  )
}

export default FormLogin
