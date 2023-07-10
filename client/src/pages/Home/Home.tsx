import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import postApi from '../../api/Post/postApi'
import { Wrapper } from '../../pages/styles'

interface PostProps {
  id: number
  title: string
  desc: string
  image: string
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getPosts({
          filter: '',
          page: 1,
          limit: 20
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
        <div className='home_wrapper-posts'>
          {posts.length > 0 &&
            posts.map((item: PostProps, id: number) => (
              <div className='home_wrapper-post' key={id}>
                {item.image && (
                  <div className='home_wrapper-image'>
                    <img src={item.image} alt='hinh_anh' />
                  </div>
                )}
                <div className='home_wrapper-content'>
                  <Link className='link' to={`/post/${item.id}`}>
                    <h1 className='home_wrapper-subject' dangerouslySetInnerHTML={{ __html: item.title }} />
                    <p className='home_wrapper-description' dangerouslySetInnerHTML={{ __html: item.desc }} />
                    <span className='home_wrapper-read--more'>Read more</span>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
