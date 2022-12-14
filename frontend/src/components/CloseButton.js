import React from 'react'

const CloseButton = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="close-btn popup__close"
      type="button"
      aria-label="Закрыть"
      title="Закрыть"
    />
  )
}

export default CloseButton