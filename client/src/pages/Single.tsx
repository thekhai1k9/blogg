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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments] = useState<any>()
  const [newComment, setNewComment] = useState<string>('')
  const [showAllComments, setShowAllComments] = useState<boolean>(false)

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

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await postApi.detailCommentPost(id)
        setComments(response.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bình luận:', error)
      }
    }
    fetchComments()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment) {
      try {
        await postApi.createCommentPost({
          comment: newComment,
          post_id: Number(id),
          user_id: currentUser?.currentUser?.id
        })
        setNewComment('')
        // Sau khi tạo bình luận mới, cập nhật danh sách bình luận bằng cách gọi lại API lấy danh sách
        const response = await postApi.detailCommentPost(id)
        setComments(response.data.data)
      } catch (error) {
        console.error('Lỗi khi gửi bình luận:', error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value)
  }

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments)
  }

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

      {/* Hiển thị danh sách bình luận */}
      <div className='comments-wrapper'>
        <h2>Comments</h2>
        {comments &&
          comments.slice(0, showAllComments ? comments.length : 5).map((comment: any) => (
            <div key={comment.id} className='comment'>
              <div
                className='comment-user'
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
              >
                <img
                  style={{ height: 30, width: 30, borderRadius: '50%' }}
                  src={comment.user.image}
                  alt='User Avatar'
                />
                <div className='comment-info'>
                  <span>{`${comment.user.lastName} ${comment.user.firstName}`}</span>
                  <p>{formatDateTime(comment.createdAt)}</p>
                </div>
                <div>
                  <i className='fa-solid fa-ellipsis-vertical'></i>
                </div>
              </div>
              <p>{comment.comment}</p>
            </div>
          ))}
        {comments && comments.length > 5 && (
          <button onClick={handleToggleComments}>{showAllComments ? 'Hide' : 'Read more'}</button>
        )}
      </div>
      {/* Form để người dùng nhập bình luận mới */}
      <form onSubmit={handleSubmit}>
        <textarea value={newComment} onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form>
    </Wrapper>
  )
}

export default Single
