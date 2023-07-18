import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useNavigate, useParams } from 'react-router-dom'
import postApi from '../api/post/postApi'
import Button from '../components/Button'
import { toolbarOptions } from '../utils/EditorModule'
import axios from 'axios'

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
  const [file, setFile] = useState<File | any>()
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.detailPost(id)
        const { title, content, desc, type_post } = response.data.data.post
        setTitle(title)
        setContent(content)
        setDesc(desc)
        setTypePost(type_post)
      } catch (error) {
        console.error('Lỗi khi lấy danh sách bài post:', error)
      }
    }
    if (id) {
      fetchData()
    }
  }, [id])

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('title', title)
      formData.append('content', content)
      formData.append('desc', desc)
      formData.append('type_post', typePost)
      formData.append('user_id', '1')
      formData.append('image', file) // Thêm tệp hình ảnh vào formData
      formData.append('date', '2023-07-04 14:19:56') // Thêm tệp hình ảnh vào formData

      if (isEditMode) {
        await axios.put(`http://localhost:6969/api/update-post/${id}`, formData)
        navigate('/')
      } else {
        await axios.post('http://localhost:6969/api/create-post', formData)
        navigate('/')
      }
    } catch (error) {
      console.error('Lỗi khi tạo mới bài viết:', error)
    }
  }

  const modules = {
    toolbar: toolbarOptions
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0]
    if (file) {
      setFile(file) // Lưu đối tượng File vào trạng thái
      const imageUrl = URL.createObjectURL(file) // Tạo URL của đối tượng File
      setPreviewImage(imageUrl) // Lưu URL vào trạng thái previewImage
    }
  }

  return (
    <div className='write_wrapper'>
      <div className='write_wrapper-content'>
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
          onChange={(e: any) => setTypePost(e.target.value)}
          style={{ width: 100 }}
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
          <div>
            <input type='file' name='image' onChange={handleImageChange} />
            {previewImage && (
              <img src={previewImage} alt='Preview' style={{ width: 50, height: 50, marginTop: '10px' }} />
            )}
          </div>
          <div className='write_wrapper-item--button'>
            <div onClick={handleSubmit}>{isEditMode ? <Button>Update Post</Button> : <Button>Create Post</Button>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
