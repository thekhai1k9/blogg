import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share'
import postApi from '../api/post/postApi'
import IconAuthor from '../assets/images/author.svg'
import IconSubmit from '../assets/images/submit.svg'
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext'
import { formatDateTime } from '../helper/function_format'
import { Wrapper } from './styles'
import SocialPage from '../components/SocialPage'
import PostTrending from '../components/PostTrending'

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

  // Fetch 5 posst
  const [top5Posts, setTop5Posts] = useState<any>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.getTop5Posts()
        setTop5Posts(response.data.data)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    fetchData()
  }, [])

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
                  <li className='home_wrapper-share'>
                    <FacebookShareButton
                      url={`http://localhost:6969/post/${dataPost.id}`}
                      quote={dataPost.title}
                      hashtag='#BOFK'
                    >
                      <FacebookIcon size={32} round />
                    </FacebookShareButton>
                  </li>
                  <li className='home_wrapper-share'>
                    <LinkedinShareButton
                      url={`http://localhost:6969/post/post/${dataPost.id}`}
                      // quote={dataPost.title}
                      // hashtag='#BOFK'
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </li>
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
                <h5 className='home_wrapper-ui-comment-sum'>{`${
                  comments && comments.length > 0 ? comments.length + 1 : 0
                } Comments`}</h5>
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
              <SocialPage />
              <PostTrending top5Posts={top5Posts} />
            </Col>
          </Row>
        </div>
      ) : (
        <span>Loading......</span>
      )}
    </Wrapper>
  )
}

export default Single
