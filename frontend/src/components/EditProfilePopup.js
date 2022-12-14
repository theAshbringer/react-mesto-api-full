import React, { useEffect } from 'react'
import { useContext } from 'react';
import { useState } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm'

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser }) => {
  const { currentUser } = useContext(CurrentUserContext)
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name,
      description
    });
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name ?? ''}
        onChange={(e) => setName(e.target.value)}
        type="text"
        name="profile-name"
        id="profile-name"
        className="popup__field popup__field_type_name"
        placeholder="Имя"
        required=""
        minLength={2}
        maxLength={40}
      />
      <span className="popup__input-error profile-name-error" />
      <input
        value={description ?? ''}
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        name="profile-description"
        id="profile-description"
        className="popup__field popup__field_type_description"
        placeholder="Описание"
        required=""
        minLength={2}
        maxLength={200}
      />
      <span className="popup__input-error profile-description-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup