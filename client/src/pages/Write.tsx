import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import postApi from '../api/post/postApi'
import Button from '../components/Button'
import { toolbarOptions } from '../utils/EditorModule'

const Write: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: any }>()
  //check edit mode
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditMode, setIsEditMode] = useState<boolean>(!!id)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [typePost, setTypePost] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.detailPost(id)
        const { title, content, desc, type_post } = response.data.data.post
        setTitle(title)
        setContent(content)
        setDesc(desc)
        setTypePost(type_post)
        // setImage(image)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    if (id) {
      fetchData()
    }
  }, [id])

  const handleSubmit = async () => {
    // Update post
    if (isEditMode) {
      try {
        const updatedData = {
          title: title,
          content: content,
          desc: desc,
          type_post: typePost,
          user_id: 1
        }
        await postApi.updatePosts(updatedData, id)
        navigate('/')
      } catch (error) {
        console.error('Lỗi khi cập nhật bài viết:', error)
      }
      // Create post
    } else {
      try {
        const createDate = {
          title: title,
          content: content,
          desc: desc,
          type_post: typePost,
          user_id: 1,
          date: ''
        }
        await postApi.createPost(createDate)
        navigate('/')
      } catch (error) {
        console.error('Lỗi khi tạo mới bài viết:', error)
      }
    }
  }

  const modules = {
    toolbar: toolbarOptions
  }

  return (
    <div className='write_wrapper'>
      <div className='write_wrapper-content'>
        {/* <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} /> */}
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={title} onChange={setTitle} modules={modules} />
        </div>
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={desc} onChange={setDesc} modules={modules} />
        </div>
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={content} onChange={setContent} modules={modules} />
        </div>
        <Form.Select
          aria-label='Default select example'
          value={typePost}
          onChange={(e) => setTypePost(e.target.value)}
          style={{ width: 10 }}
        >
          <option value='CODE'>CODE</option>
          <option value='SHARE'>SHARE</option>
          <option value='PHANMEM'>PHANMEM</option>
          <option value='TIPS'>TIPS</option>
        </Form.Select>
      </div>
      <div className='write_wrapper-menu'>
        <div className='write_wrapper-item'>
          <h1>Publish</h1>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input type='file' name='image' />
          <div className='write_wrapper-item--button'>
            <div onClick={handleSubmit}>{isEditMode ? <Button>Update Post</Button> : <Button>Create Post</Button>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
