import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form'
import toast from 'react-hot-toast'
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
  const [file, setFile] = useState<File | any>()
  const [previewImage, setPreviewImage] = useState<string | undefined>(undefined)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await postApi.detailPost(id)
        const { title, content, desc, type_post, image } = response.data.data.post
        setTitle(title)
        setContent(content)
        setDesc(desc)
        setTypePost(type_post)
        setPreviewImage(`http://localhost:6969/${image}`)
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
      formData.append('view', '0')

      if (isEditMode) {
        await axios.put(`http://localhost:6969/api/update-post/${id}`, formData)
        toast.success('Bài viết đã được cập nhật thành công')
        navigate('/')
      } else {
        await axios.post('http://localhost:6969/api/create-post', formData)
        toast.success('Bài viết đã được tạo mới thành công')
        navigate('/')
      }
    } catch (error) {
      console.error('Lỗi khi tạo mới bài viết:', error)
      toast.error('Có lỗi xảy ra với bài viết của bạn')
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
          {/* <ReactQuill className='editor' theme='snow' value={title} onChange={setTitle} modules={modules} /> */}
          <Form.Control
            size='lg'
            type='text'
            placeholder='Nhập tiêu đề bài viết'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className='write_wrapper-editer'>
          {/* <ReactQuill className='editor' theme='snow' value={desc} onChange={setDesc} modules={modules} /> */}
          <Form.Control
            size='lg'
            type='text'
            placeholder='Nhập mô tả bài viết'
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
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
              <img src={previewImage} alt='Preview' style={{ width: 170, height: 70, marginTop: '10px' }} />
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
