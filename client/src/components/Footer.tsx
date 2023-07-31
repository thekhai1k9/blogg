import React from 'react'
import { Col } from 'react-bootstrap'
import Logo from '../assets/images/logo.png'
import { SocialIcon } from 'react-social-icons'

const Footer: React.FC = () => {
  return (
    <footer className='footer_wrapper'>
      <Col>
        <div className='footer_social'>
          <p className='icon_social_btn'>
            <SocialIcon url='https://www.linkedin.com/in/kh%E1%BA%A3i-th%E1%BA%BF-b3a800230/' />
          </p>
          <p className='icon_social_btn'>
            <SocialIcon url='https://telegram.com/in/jaketrent' />
          </p>
          <p className='icon_social_btn'>
            <SocialIcon url='https://github.com/thekhai1k9' />
          </p>
          <p className='icon_social_btn'>
            <SocialIcon url='https://www.facebook.com/meodaika321/' />
          </p>
          <p className='icon_social_btn'>
            <SocialIcon url='https://www.instagram.com/eth._kaiih/' />
          </p>
          <p className='icon_social_btn'>
            <SocialIcon url='https://www.tiktok.com/@me__.o' />
          </p>
          {/* <SocialIcon url='https://discord.com/in/jaketrent' />
          <SocialIcon url='https://twiter.com/in/jaketrent' />
          <SocialIcon url='https://whatapps.com/in/jaketrent' />
          <SocialIcon url='https://youtobe.com/in/jaketrent' /> */}
        </div>
      </Col>
      <Col>
        <div className='footer_cp_right'>
          <img src={Logo} alt='logo' />
          <span>
            Made with and <b>Blog</b>
          </span>
        </div>
      </Col>
    </footer>
  )
}

export default Footer
