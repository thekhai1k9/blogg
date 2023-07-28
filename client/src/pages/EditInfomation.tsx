import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Wrapper } from './styles'
import { AuthContext } from '../context/authContext'

const EditInfomation: React.FC = () => {
  const currentUser: any = useContext(AuthContext)
  console.log(currentUser)

  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setlastName] = useState<string>('')
  const [yourEmail, setYourEmail] = useState<string>('')
  const [yourPhone, setYourPhone] = useState<string>('')

  return (
    <Wrapper>
      <div className='edit_info_wrapper'>
        <h3>Thông tin cá nhân</h3>
        <Row>
          <Col xs={4}>
            <Row>
              <div className='edit_info_wrapper-avatar'>
                <img
                  alt=''
                  src='https://duhocvietglobal.com/wp-content/uploads/2018/12/dat-nuoc-va-con-nguoi-anh-quoc.jpg'
                />
                <div className='edit_info_wrapper-avatar-btn'>
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
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </Wrapper>
  )
}

export default EditInfomation
