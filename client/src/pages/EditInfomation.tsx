import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { Wrapper } from './styles'
import Button from '../components/Button'

const EditInfomation: React.FC = () => {
  const detailPofile: any = useContext(AuthContext)
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState<string>(detailPofile?.currentUser?.firstName)
  const [userName, setUserName] = useState<string>(detailPofile?.currentUser?.userName)
  const [lastName, setlastName] = useState<string>(detailPofile?.currentUser?.lastName)
  const [yourEmail, setYourEmail] = useState<string>(detailPofile?.currentUser?.email)
  const [yourPhone, setYourPhone] = useState<string>(detailPofile?.currentUser?.phone)
  const [file, setFile] = useState<File | any>()
  const [previewImage, setPreviewImage] = useState<string>(detailPofile?.currentUser?.image)
  console.log('previewImage', previewImage)

  const handleSubmit = async () => {
    try {
      const formData = new FormData()
      formData.append('firstName', firstName)
      formData.append('lastName', lastName)
      formData.append('userName', userName)
      formData.append('email', yourEmail)
      formData.append('phone', yourPhone)
      formData.append('id', detailPofile?.currentUser?.id)
      // Kiểm tra xem tệp change
      if (file) {
        formData.append('image', file) // Thêm tệp mới vào formData nếu có tệp mới
      } else {
        formData.append('image', previewImage ?? '') // Thêm URL hình ảnh từ API chi tiết nếu không có tệp mới
      }

      await axios.put(`http://localhost:6969/api/update-profile`, formData)
      toast.success('Thay đổi thông tin thành công')
      navigate('/')
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra'
      toast.error(`${errorMessage}`)
    }
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
    <Wrapper>
      <div className='edit_info_wrapper'>
        <h3>Thông tin cá nhân</h3>
        <Row>
          <Col xs={4}>
            <Row>
              <div className='edit_info_wrapper-avatar'>
                {previewImage && <img src={previewImage} alt='Hình ảnh profile' />}
                <div className='edit_info_wrapper-avatar-btn'>
                  <input type='file' name='image' onChange={handleImageChange} />
                  <p>Chọn ảnh của bạn</p>
                </div>
                <p className='edit_info_wrapper-avatar-danger'>Chỗ tải ảnh lên, bạn nên tải ảnh có kích thước vuông</p>
              </div>
            </Row>
          </Col>
          <Col xs={8}>
            <div className='edit_info_wrapper-form'>
              <Row>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>First Name:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input
                    className='edit_info_wrapper-input'
                    type='text'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Last Name:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input
                    className='edit_info_wrapper-input'
                    type='text'
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                  />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Email:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input
                    className='edit_info_wrapper-input'
                    type='text'
                    value={yourEmail}
                    onChange={(e) => setYourEmail(e.target.value)}
                  />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>User Name:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input
                    className='edit_info_wrapper-input'
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Phone:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input
                    className='edit_info_wrapper-input'
                    type='text'
                    value={yourPhone}
                    onChange={(e) => setYourPhone(e.target.value)}
                  />
                </Col>
                <Col>
                  <Button onClick={handleSubmit}>Lưu thay đổi thông tin</Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

export default EditInfomation
