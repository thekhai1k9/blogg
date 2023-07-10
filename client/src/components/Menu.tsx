import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import postApi from '../api/Post/postApi'
import { Wrapper } from '../pages/styles'

interface PostProps {
  id: number
  title: string
  desc: string
  image: string
}

const Menu: React.FC = () => {
  const [manyPosts, setManyPosts] = useState<PostProps[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getPosts({
          filter: '',
          page: 1,
          limit: 5
        })
        setManyPosts(response.data.posts)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <Wrapper className='menu-wrapper'>
      <h3>Other posts you may liked</h3>
      {manyPosts &&
        manyPosts.map((item, id) => (
          <Link to={`/post/${item.id}`} key={id}>
            <div className='menu-wrapper_post'>
              <img style={{ borderRadius: '20px' }} src={item.image} alt='' />
              <h3 dangerouslySetInnerHTML={{ __html: item.title }} />
            </div>
          </Link>
        ))}
    </Wrapper>
  )
}

export default Menu
