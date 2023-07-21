import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom'

interface Top5PostProps {
  top5Posts: any
}

const Footer: React.FC<Top5PostProps> = ({ top5Posts }) => {
  return (
    <div className='home_wrapper_slider-box'>
      <h3>Bài viết hay nhất</h3>
      <Carousel>
        {top5Posts.length > 0 &&
          top5Posts.map((item: any, index: number) => (
            <Carousel.Item interval={1000} key={index}>
              <Link to={`/post/${item.id}`} className='the_link'>
                <img className='d-block w-100' src={`http://localhost:6969/${item.image}`} alt={`${item.image}`} />
                <Carousel.Caption>
                  <div className='home_wrapper_slider-box-content'>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  )
}

export default Footer
