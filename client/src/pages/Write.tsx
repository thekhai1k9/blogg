import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useParams } from 'react-router-dom'
import postApi from '../api/Post/postApi'
import Button from '../components/Button'

const Write: React.FC = () => {
  const { id } = useParams<{ id: any }>()
  //check edit mode
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isEditMode, setIsEditMode] = useState<boolean>(!!id)
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [typePost, setTypePost] = useState<string>('')
  // const [image, setImage] = useState('');

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
          image: '',
          user_id: 1
        }
        await postApi.updatePosts(updatedData, id)
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
          image: '',
          user_id: 1,
          date: ''
        }
        console.log('file: Write.tsx:63 ~ handleSubmit ~ createDate:', createDate)
        await postApi.createPost(createDate)
      } catch (error) {
        console.error('Lỗi khi tạo mới bài viết:', error)
      }
    }
  }

  return (
    <div className='write_wrapper'>
      <div className='write_wrapper-content'>
        {/* <input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} /> */}
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={title} onChange={setTitle} />
        </div>
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={desc} onChange={setDesc} />
        </div>
        <div className='write_wrapper-editer'>
          <ReactQuill className='editor' theme='snow' value={content} onChange={setContent} />
        </div>
        <select value={typePost} onChange={(e) => setTypePost(e.target.value)}>
          <option value=''>Select Type</option>
          <option value='CODE'>CODE</option>
          <option value='SHARE'>SHARE</option>
          <option value='PHANMEM'>PHANMEM</option>
          <option value='TIPS'>TIPS</option>
        </select>
      </div>
      <div className='write_wrapper-menu'>
        <div className='write_wrapper-item'>
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: 'none' }} type='file' name='' id='file' />
          <label className='write_wrapper-item--file' htmlFor='file'>
            Upload file
          </label>
          <div className='write_wrapper-item--button'>
            <Button>Save Draft</Button>
            <div onClick={handleSubmit}>{isEditMode ? <Button>Update Post</Button> : <Button>Create Post</Button>}</div>
          </div>
        </div>
        <div className='write_wrapper-item'>
          <h1>Directory Pages</h1>
          <div className='write_wrapper-item--category'>
            <input type='radio' name='cat' value='art' id='art' />
            <label htmlFor='art'>Home</label>
          </div>
          <div className='write_wrapper-item--category'>
            <input type='radio' name='cat' value='art_1' id='art_1' />
            <label htmlFor='art_1'>Phần mềm</label>
          </div>
          <div className='write_wrapper-item--category'>
            <input type='radio' name='cat' value='art_2' id='art_2' />
            <label htmlFor='art_2'>Tips</label>
          </div>
          <div className='write_wrapper-item--category'>
            <input type='radio' name='cat' value='art_3' id='art_3' />
            <label htmlFor='art_3'>Share</label>
          </div>
          <div className='write_wrapper-item--category'>
            <input type='radio' name='cat' value='art_4' id='art_4' />
            <label htmlFor='art_4'>Code</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write
