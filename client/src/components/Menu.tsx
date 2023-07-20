import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import LoginAfter from '../pages/Auth/LoginAfter'
import LoginBefore from '../pages/Auth/LoginBefore'
import { Wrapper } from '../pages/styles'

const Menu: React.FC = () => {
  // currentUser
  const currentUser: any = useContext(AuthContext)
  return (
    <Wrapper>
      {currentUser.currentUser ? (
        <React.Fragment>
          <LoginAfter />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <LoginBefore />
        </React.Fragment>
      )}
    </Wrapper>
  )
}

export default Menu
