import React, { useEffect, useState } from 'react'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import { Wrapper } from '../../pages/styles'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu'
import postApi from '../../api/post/postApi'
import { formatDateTime } from '../../helper/function_format'
import Carousel from '../../components/Carousel'
import SocialFooter from '../../components/SocialFooter'

interface PostProps {
  id: number
  title: string
  desc: string
  image: string
  date: any
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number | any>(0)
  console.log(totalPages)

  const postsPerPage = 6

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getPosts({
          filter: '',
          page: currentPage,
          limit: postsPerPage
        })
        setPosts(response.data.posts)
        const totalCount = response.data.total // Lấy số lượng bài post từ response
        const totalPages = Math.ceil(totalCount / postsPerPage)
        setTotalPages(totalPages) // Lưu vào state totalPages
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    fetchData()
  }, [currentPage])

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.max(prevPage - 1, 1)
      console.log('Previous page:', newPage)
      return newPage
    })
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => {
      const newPage = Math.min(prevPage + 1, totalPages)
      console.log('Next page:', newPage)
      return newPage
    })
  }

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
                          <img
                            alt='hinh_anh'
                            src={`http://localhost:6969/${item.image}`}
                            className='home_wrapper_box-img'
                          />
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
                <Carousel />
              </div>
            </Row>
            <Row>
              <div className='home_wrapper-paginate'>
                <ul className='home_wrapper-paginate-list'>
                  <li onClick={handlePreviousPage}>Previous</li>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li key={index + 1} onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </li>
                  ))}
                  <li onClick={handleNextPage}>Next</li>
                </ul>
              </div>
            </Row>
            <Row>
              <SocialFooter />
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
