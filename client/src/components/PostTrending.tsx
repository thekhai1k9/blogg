import { Wrapper } from '../pages/styles'
import React from 'react'
import { Link } from 'react-router-dom'

const PostTrending: React.FC = () => {
  return (
    <Wrapper>
      <div className='home_wrapper_box'>
        <aside className='home_wrapper_box-trending'>
          <div className='home_wrapper_box-trending-content'>
            <Link to='/' className='the_link'>
              <img
                alt='hinh_anh'
                src='https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg'
                style={{ height: 190, width: 338 }}
              />
            </Link>
            <ul className='home_wrapper_box-trending-list'>
              <li className='home_wrapper_box-trending-item'>
                <Link to='/' className='the_link'>
                  Nỗi buồn của người trưởng thành
                  <p>2023-06-03 02:50:00</p>
                </Link>
              </li>
              <li className='home_wrapper_box-trending-item'>
                <Link to='/' className='the_link'>
                  Nỗi buồn của người trưởng thành
                  <p>2023-06-03 02:50:00</p>
                </Link>
              </li>
              <li className='home_wrapper_box-trending-item'>
                <Link to='/' className='the_link'>
                  Nỗi buồn của người trưởng thành
                  <p>2023-06-03 02:50:00</p>
                </Link>
              </li>
              <li className='home_wrapper_box-trending-item'>
                <Link to='/' className='the_link'>
                  Nỗi buồn của người trưởng thành
                  <p>2023-06-03 02:50:00</p>
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </Wrapper>
  )
}

export default PostTrending
