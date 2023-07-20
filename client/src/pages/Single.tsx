import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import postApi from '../api/post/postApi'
import { AuthContext } from '../context/authContext'
import { formatDateTime } from '../helper/function_format'
import { Wrapper } from './styles'
import { Col, Row } from 'react-bootstrap'
import Menu from '../components/Menu'
import IconAuthor from '../assets/images/author.svg'
import IconSubmit from '../assets/images/submit.svg'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewComment(e.target.value)
  }

  const handleToggleComments = () => {
    setShowAllComments(!showAllComments)
  }

  {
    console.log(currentUser?.currentUser)
  }
  return (
    <Wrapper>
      {dataPost ? (
        <div className='home_wrapper'>
          <Row>
            <Col xs={8}>
              <div className='home_wrapper-detail'>
                <h1 className='home_wrapper-title'>{dataPost.post.title}</h1>
                <p className='home_wrapper-date'>{formatDateTime(dataPost?.user?.createdAt)}</p>
                <p className='home_wrapper-auth'>
                  <span className='home_wrapper-auth--container'>
                    <img alt='hinh_anh' src={IconAuthor} />
                    {`Tác giả: ${dataPost?.user?.lastName} ${dataPost?.user?.firstName}`}
                  </span>
                </p>
                {currentUser?.currentUser?.isAdmin === '1' && <Link to={`/write/${id}`}>Edit</Link>}
                <div className='home_wrapper-detail-image'>
                  <img alt='hinh_anh' src={`http://localhost:6969/${dataPost.post.image}`} />
                </div>
                <ul className='home_wrapper-auth-social'>
                  <li>Like</li>
                  <li>Share</li>
                </ul>
                <div className='home_wrapper-detail-desc'>
                  <p className='home_wrapper-detail-desc--nd'>
                    <strong>{dataPost.post.desc}</strong>
                  </p>
                  <p
                    className='home_wrapper-detail--main-content'
                    dangerouslySetInnerHTML={{ __html: dataPost.post.content }}
                  />
                </div>
                <div className='home_wrapper-detail--copyright'>
                  <p className='home_wrapper-detail-copyright-ct'>
                    <Link to='/' className='the_link'>
                      Theo
                      <span> Tien phong</span>
                    </Link>
                  </p>
                </div>
                <div className='home_wrapper-detail-share'>
                  <div className='home_wrapper-detail-share-ct'>Content chia sẽ</div>
                  <div className='home_wrapper-detail-share-btn'>
                    <span>Like</span>
                    <span>Share</span>
                  </div>
                </div>
              </div>
              <div className='home_wrapper-relate'>
                <p className='home_wrapper-relate--title'>Bài viết liên quan</p>
                <div className='home_wrapper-relate-content'>
                  <div className='home_wrapper-relate-view'>
                    <div className='home_wrapper-relate-slider'></div>
                  </div>
                </div>
              </div>
              <div className='home_wrapper-comment'>
                <h3>Phản hồi bài viết</h3>
              </div>
              <div className='home_wrapper-check-comment'>
                <span>Vui lòng đăng nhập để comment</span>
              </div>
              <div className='home_wrapper-comment'>
                <h3 className='home_wrapper-comment-title'>Phản hồi của đọc giả</h3>
                <div className='home_wrapper-comment-box'>
                  <form className='home_wrapper-comment-form'>
                    <input value={newComment} onChange={handleChange} placeholder='Viết bình luận' />
                    <div onClick={handleSubmit}>
                      <img alt='hinh_anh' src={IconSubmit} />
                    </div>
                  </form>
                </div>
              </div>
              <div className='home_wrapper-ui-comment'>
                <h5 className='home_wrapper-ui-comment-sum'>2 Comments</h5>
                {comments &&
                  comments.slice(0, showAllComments ? comments.length : 5).map((comment: any) => (
                    <div className='home_wrapper-ui-comment-box' key={comment.id}>
                      <p className='home_wrapper-ui-comment-avt'>
                        <img alt='hinh_annh' src={comment.user.image} />
                      </p>
                      <div className='home_wrapper-ui-comment-nd'>
                        <p className='home_wrapper-ui-comment-name'>
                          <h5>{`${comment.user.lastName} ${comment.user.firstName}`}</h5>
                          <span>{formatDateTime(comment.createdAt)}</span>
                        </p>
                        <p className='home_wrapper-ui-comment-cmt'>{comment.comment}</p>
                      </div>
                    </div>
                  ))}
              </div>
              {comments && comments.length > 5 && (
                <button onClick={handleToggleComments}>{showAllComments ? 'Hide' : 'Read more'}</button>
              )}
            </Col>
            <Col xs={4}>
              <Menu />
            </Col>
          </Row>
        </div>
      ) : (
        <span>Loading......</span>
      )}
      {/* Hiển thị danh sách bình luận */}
      {/* <div className='comments-wrapper'>
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
      </div> */}
      {/* Form để người dùng nhập bình luận mới */}
      {/* <form onSubmit={handleSubmit}>
        <textarea value={newComment} onChange={handleChange} />
        <button type='submit'>Submit</button>
      </form> */}
    </Wrapper>
  )
}

export default Single
