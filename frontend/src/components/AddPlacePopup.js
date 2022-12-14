import React, { useState } from 'react'
import { useMemo } from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm'

const AddPlacePopup = ({ isOpen, onClose, onAddPlace }) => {
  const initialValues = useMemo(() => ({
    name: '',
    link: '',
  }), [])

  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddPlace(formValues);
  }

  useEffect(() => {
    setFormValues(initialValues);
  }, [isOpen, initialValues])

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={formValues.name}
        onChange={handleChange}
        type="text"
        name="name"
        id="card-name"
        className="popup__field popup__field_type_card-name"
        placeholder="Название"
        required=""
        minLength={2}
        maxLength={30}
      />
      <span className="popup__input-error card-name-error" />
      <input
        value={formValues.link}
        onChange={handleChange}
        type="url"
        name="link"
        id="card-description"
        className="popup__field popup__field_type_card-link"
        placeholder="Ссылка на картинку"
        required=""
      />
      <span className="popup__input-error card-description-error" />
    </PopupWithForm>
  )
}

export default AddPlacePopup