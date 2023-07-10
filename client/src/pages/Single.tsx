import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import postApi from '../api/Post/postApi'
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext'
import { formatDateTime } from '../helper/function_format'
import { Wrapper } from './styles'

interface dataPostProps {
  id: string
  title: string
  desc: string
  image: string
  content: string
  user: any
  post: any
}

const Single: React.FC = () => {
  // const navigate = useNavigate()
  const currentUser: any = useContext(AuthContext)
  const { id } = useParams<{ id: any }>()
  const [dataPost, setDataPost] = useState<dataPostProps>()

  useEffect(() => {
    const fetchGetDetail = async () => {
      try {
        const response = await postApi.detailPost(id)
        setDataPost(response.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết bài post:', error)
      }
    }
    fetchGetDetail()
  }, [id])
  return (
    <Wrapper>
      {dataPost ? (
        <div className='single_wrapper'>
          <div className='single_wrapper-content'>
            <img style={{ borderRadius: '20px' }} src={`${dataPost.post.image}`} alt='hinh_anh' />
            <div className='single_wrapper-user'>
              <img src={`${dataPost.user.image}`} alt='hinh_anh' />
              <div className='single_wrapper-info'>
                <span>{`${dataPost?.user.lastName} ${dataPost?.user.firstName}`}</span>
                <p>{formatDateTime(dataPost?.user.createdAt)}</p>
              </div>
              {currentUser && currentUser?.currentUser?.userName === dataPost?.user?.userName ? (
                <div className='single_wrapper-edit'>
                  <Link to={`/write/${id}`}>
                    <i className='fa-solid fa-pen-fancy'></i>
                  </Link>
                  <Link to='/'>
                    <i className='fa-solid fa-trash'></i>
                  </Link>
                </div>
              ) : null}
            </div>
            <h1 className='single_wrapper-subject' dangerouslySetInnerHTML={{ __html: dataPost.post.title }} />
            <h3 dangerouslySetInnerHTML={{ __html: dataPost.post.desc }} />
            <p className='single_wrapper-nd' dangerouslySetInnerHTML={{ __html: dataPost.post.content }} />
          </div>
          <Menu />
        </div>
      ) : (
        <span>Loading......</span>
      )}
    </Wrapper>
  )
}

export default Single
