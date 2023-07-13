import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Wrapper } from '../../pages/styles'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu'
import postApi from '../../api/Post/postApi'
import { formatDateTime } from '../../helper/function_format'

interface PostProps {
  id: number
  title: string
  desc: string
  image: string
  date: any
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getPosts({
          filter: '',
          page: 1,
          limit: 10
        })
        setPosts(response.data.posts)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    fetchData()
  }, [])

  console.log(posts)
  return (
    <Wrapper>
      <div className='home_wrapper'>
        <Row>
          <Col xs={8}>
            <Row>
              {posts.length > 0 &&
                posts.map((item: PostProps, index: number) => (
                  <Col xs={6} key={index}>
                    <div className='home_wrapper_box'>
                      <div className='home_wrapper_box--big'>
                        <Link className='the_link' to={`/post/${item.id}`}>
                          <img alt='hinh_anh' src={item.image} className='home_wrapper_box-img' />
                        </Link>
                        <h3 className='home_wrapper_box-title'>
                          <Link to={`/post/${item.id}`} className='the_link'>
                            {item.title}
                          </Link>
                        </h3>
                        <p className='home_wrapper_box-author'>
                          <small>{formatDateTime(item.date)}</small>
                        </p>
                        <p className='home_wrapper_box-content'>{item.desc}</p>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
            <Row>
              <div className='home_wrapper_slider'>
                <h3>Bài viết hay nhất</h3>
                <div className='home_wrapper_slider-box'>Bài viết1</div>
              </div>
            </Row>
            <Row>
              <div className='home_wrapper-paginate'>
                <ul className='home_wrapper-paginate-list'>
                  <li>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                </ul>
              </div>
            </Row>
            <Row>
              <div className='home_wrapper_social_footer'>Mạng xã hội footer</div>
            </Row>
          </Col>
          <Col xs={4} style={{ paddingTop: 20 }}>
            <Menu />
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

export default Home
