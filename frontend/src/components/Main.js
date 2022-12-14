import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card'

const Main = ({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete
}) => {
  const { currentUser } = useContext(CurrentUserContext);
  const { name, about: description, avatar } = currentUser;

  return (
    <main className="content">
      <section className="profile">
        <div
          className="profile__avatar-container"
          onClick={onEditAvatar}
          style={{ backgroundImage: `url(${avatar})` }}
        >
        </div>
        <div className="profile__info">
          <div className="profile__name-string">
            <h1 className="profile__name">{name}</h1>
            <button
              onClick={onEditProfile}
              className="edit-btn profile__edit-btn"
              type="button"
              aria-label="Редактировать профиль"
              title="Редактировать профиль"
            />
          </div>
          <p className="profile__description">{description}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="add-btn profile__add-btn"
          type="button"
          aria-label="Добавить карточку"
          title="Добавить карточку"
        />
      </section>
      <section>
        <ul className="cards">
          {cards.map((card) => (
            <Card
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              key={card._id}
            />)
          )}
        </ul>
      </section>
    </main >
  )
}

export default Main