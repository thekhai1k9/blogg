import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Wrapper } from './styles'

const EditInfomation: React.FC = () => {
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
                  <input className='edit_info_wrapper-input' type='text' />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Last Name:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input className='edit_info_wrapper-input' type='text' />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Email:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input className='edit_info_wrapper-input' type='text' />
                </Col>
                <Col xs={3} style={{ marginBottom: 12 }}>
                  <p className='edit_info_wrapper-label'>Phone:</p>
                </Col>
                <Col xs={9} style={{ marginBottom: 12 }}>
                  <input className='edit_info_wrapper-input' type='text' />
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
