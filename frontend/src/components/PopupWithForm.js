import React from 'react'
import CloseButton from './CloseButton'
import Popup from './Popup'

function PopupWithForm({ children, name, title, isOpen, onClose, onSubmit }) {
  const popupClass = `popup_type_${name} ${isOpen && 'popup_opened'}`

  return (
    <Popup className={popupClass} onClose={onClose}>
      <form
        onClick={(e) => { e.stopPropagation() }}
        onSubmit={onSubmit}
        name={name}
        className="popup__container"
        noValidate=""
      >
        <h2 className="popup__title">{title}</h2>
        {children}
        <button
          className="popup__button"
          type="submit"
        >
          {name !== "del" ? "Сохранить" : "Да"}
        </button>
        <CloseButton onClose={onClose} />
      </form>
    </Popup>
  )
}

export default PopupWithForm