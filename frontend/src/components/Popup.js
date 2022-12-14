import React, { useEffect } from 'react'

function Popup({ className, children, onClose }) {

  useEffect(() => {
    const handleCloseEscKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleCloseEscKey)
    return () => {
      document.removeEventListener('keydown', handleCloseEscKey)
    }
  }, [onClose])

  return (
    <div
      className={`popup ${className}`}
      onClick={onClose}
    >
      {children}
    </div>
  )
}

export default Popup