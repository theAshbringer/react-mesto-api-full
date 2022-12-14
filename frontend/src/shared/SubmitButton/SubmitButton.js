import React from 'react'
import './SubmitButton.css'

const SubmitButton = ({ children, className = "", inverted = false, ...props }) => {
  const btnClassName = `submit-btn ${inverted ? 'submit-btn_inverted' : ''} ${className}`;

  return (
    <button
      className={btnClassName}
      type="submit"
      {...props}
    >
      {children}
    </button>
  )
}

export default SubmitButton