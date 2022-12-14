import React, { useEffect, useRef } from 'react'
import PopupWithForm from './PopupWithForm'

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar }) => {
  const avatar = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateAvatar(avatar.current.value);
  }

  useEffect(() => {
    avatar.current.value = '';
  }, [isOpen])

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatar}
        type="url"
        name="avatar-link"
        id="avatar-link"
        className="popup__field popup__field_type_card-link"
        placeholder="Ссылка на аватар"
        required=""
      />
      <span className="popup__input-error popup__input-error_type_avatar avatar-link-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup