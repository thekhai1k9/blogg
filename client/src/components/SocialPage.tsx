import React from 'react'
import { Link } from 'react-router-dom'
import FacebookIcon from '../assets/images/facebook.svg'
import InstagramIcon from '../assets/images/instagram.svg'
import YoutobeIcon from '../assets/images/youtobe.svg'

const SocialPage: React.FC = () => {
  return (
    <div className='home_wrapper_box'>
      <aside className='home_wrapper_box-social'>
        <h3 className='home_wrapper_box-social-title'>Tương tác xã hội</h3>
        <p className='home_wrapper_box-social-icon'>
          <Link to='https://www.facebook.com/' className='the_link'>
            <img alt='logo' src={FacebookIcon} />
          </Link>
          <Link to='https://www.instagram.com/' className='the_link'>
            <img alt='logo' src={InstagramIcon} />
          </Link>
          <Link to='https://www.youtube.com/' className='the_link'>
            <img alt='logo' src={YoutobeIcon} />
          </Link>
        </p>
        <div className='home_wrapper_box-social-share' style={{ textAlign: 'center' }}>
          Content Share
        </div>
      </aside>
    </div>
  )
}

export default SocialPage
