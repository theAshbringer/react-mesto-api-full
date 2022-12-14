import React from 'react'
import './FormTitle.css'

const FormTitle = ({ className, children, inverted = false }) => {

  const titleClassName = `form-title ${inverted ? 'form-title_inverted' : ''} ${className}`;

  return (
    <h1 className={titleClassName}>
      {children}
    </h1>
  )
}

export default FormTitle