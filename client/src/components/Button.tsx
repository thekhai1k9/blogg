import React from 'react'
import '../assets/styles/components_local_style.scss'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({ onClick, disabled = false, children }) => {
  return (
    <button className='button-container' onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
