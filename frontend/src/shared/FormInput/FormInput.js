import React from 'react'
import './FormInput.css'

const FormInput = ({
  inverted = false,
  className = '',
  ...props
}) => {

  const inputClassName = `form-input ${inverted ? 'form-input_inverted' : ''} ${className}`;

  return (
    <input
      className={inputClassName}
      minLength={2}
      maxLength={40}
      required={true}
      {...props} />
  )
}

export default FormInput