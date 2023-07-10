import React from 'react'
import Logo from '../assets/images/logo.png'

const Footer: React.FC = () => {
  return (
    <footer className='footer_wrapper'>
      <img src={Logo} alt='logo' />
      <span>
        Made with and <b>Blog</b>.
      </span>
    </footer>
  )
}

export default Footer
