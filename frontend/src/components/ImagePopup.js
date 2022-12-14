import React from 'react'
import CloseButton from './CloseButton';
import Popup from './Popup';

function ImagePopup({ isOpen, card, onClose }) {
  const className = `popup_type_img ${isOpen && 'popup_opened'}`;

  return (
    <Popup className={className} onClose={onClose}>
      <figure
        onClick={(e) => { e.stopPropagation() }}
        className="img-popup">
        <img
          src={card.link}
          alt={card.name}
          className="img-popup__image"
        />
        <figcaption className="img-popup__title">{card.name}</figcaption>
        <button
          onClick={onClose}
          className="close-btn popup__close"
          type="button"
          aria-label="Закрыть"
          title="Закрыть"
        />
        <CloseButton onClose={onClose} />
      </figure>
    </Popup >
  )
}

export default ImagePopup