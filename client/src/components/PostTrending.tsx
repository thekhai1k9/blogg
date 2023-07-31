import { Wrapper } from '../pages/styles'
import React from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../helper/function_format'

interface Top5PostProps {
  top5Posts: any
}

const PostTrending: React.FC<Top5PostProps> = ({ top5Posts }) => {
  return (
    <Wrapper>
      <div className='home_wrapper_box'>
        <aside className='home_wrapper_box-trending'>
          <h4 className='home_wrapper_box-trending--title'>Top 5 bài viết</h4>
          <div className='home_wrapper_box-trending-content'>
            <Link to='/' className='the_link'>
              <img
                alt='hinh_anh'
                src='https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg'
                style={{ height: 190, width: 338 }}
              />
            </Link>
            <ul className='home_wrapper_box-trending-list'>
              {top5Posts &&
                top5Posts.map((item: any, index: number) => (
                  <li className='home_wrapper_box-trending-item' key={index}>
                    <Link to={`/post/${item.id}`} className='the_link'>
                      <span>{item.title}</span>
                      <p>{formatDateTime(item.createdAt)}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </Wrapper>
  )
}

export default PostTrending
