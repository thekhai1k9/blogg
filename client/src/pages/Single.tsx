import React, { useContext, useEffect, useState } from 'react'
import { Col, Row, Carousel } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'
import postApi from '../api/post/postApi'
import IconAuthor from '../assets/images/author.svg'
import IconSubmit from '../assets/images/submit.svg'
import Menu from '../components/Menu'
import { AuthContext } from '../context/authContext'
import { formatDateTime } from '../helper/function_format'
import { Wrapper } from './styles'
import SocialPage from '../components/SocialPage'
import PostTrending from '../components/PostTrending'
import PageLoadDataNull from '.././components/PageLoadDataNull'

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
  console.log('daa ta post ===>', dataPost)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [comments, setComments] = useState<any>()
  const [newComment, setNewComment] = useState<string>('')
  const [showAllComments, setShowAllComments] = useState<boolean>(false)

  useEffect(() => {
    const fetchGetDetail = async () => {
      const response = await postApi.detailPost(id)
      setDataPost(response.data.data)
    }
    fetchGetDetail()
  }, [id])

  useEffect(() => {
    const fetchComments = async () => {
      const response = await postApi.detailCommentPost(id)
      setComments(response.data.data)
    }
    fetchComments()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment) {
      await postApi.createCommentPost({
        comment: newComment,
        post_id: Number(id),
        user_id: currentUser?.currentUser?.id
      })
      setNewComment('')
      // Sau khi tạo bình luận mới, cập nhật danh sách bình luận bằng cách gọi lại API lấy danh sách
      const response = await postApi.detailCommentPost(id)
      setComments(response.data.data)
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
      const response = await postApi.getTop5Posts()
      setTop5Posts(response.data.data)
    }
    fetchData()
  }, [])

  // Bài viết liên quan
  const [relatePosts, setRelatePosts] = useState<any>()
  useEffect(() => {
    const fetchData = async () => {
      const response = await postApi.getPosts({
        title: '',
        desc: '',
        type_post: dataPost?.post?.type_post,
        page: 1,
        limit: 6
      })
      setRelatePosts(response.data.posts)
    }
    fetchData()
  }, [dataPost?.post?.type_post])

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
                      url={`http://localhost:6969/post/${dataPost.id}`}
                      // quote={dataPost.title}
                      // hashtag='#BOFK'
                    >
                      <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                  </li>
                  <li className='home_wrapper-share'>
                    <WhatsappShareButton
                      url={`http://localhost:6969/post/${dataPost.id}`}
                      // quote={dataPost.title}
                      // hashtag='#BOFK'
                    >
                      <WhatsappIcon size={32} round />
                    </WhatsappShareButton>
                  </li>
                  <li className='home_wrapper-share'>
                    <TwitterShareButton
                      url={`http://localhost:6969/post/${dataPost.id}`}
                      // quote={dataPost.title}
                      // hashtag='#BOFK'
                    >
                      <TwitterIcon size={32} round />
                    </TwitterShareButton>
                  </li>
                  <li className='home_wrapper-share'>
                    <TelegramShareButton
                      url={`http://localhost:6969/post/${dataPost.id}`}
                      // quote={dataPost.title}
                      // hashtag='#BOFK'
                    >
                      <TelegramIcon size={32} round />
                    </TelegramShareButton>
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
                      <span> BOFK</span>
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
                    <div className='home_wrapper-relate-slider'>
                      <Carousel data-bs-theme='dark'>
                        {relatePosts ? (
                          relatePosts.map((item: any, index: number) => (
                            <Carousel.Item interval={1000} key={index}>
                              <Link to={`/post/${item.id}`} className='the_link'>
                                <img
                                  className='d-block w-100'
                                  src={`http://localhost:6969/${item.image}`}
                                  alt={`${item.image}`}
                                />
                                <Carousel.Caption>
                                  <div className='home_wrapper_slider-box-content'>
                                    <h3>{item.title}</h3>
                                    <p>{item.desc}</p>
                                  </div>
                                </Carousel.Caption>
                              </Link>
                            </Carousel.Item>
                          ))
                        ) : (
                          <PageLoadDataNull />
                        )}
                      </Carousel>
                    </div>
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
