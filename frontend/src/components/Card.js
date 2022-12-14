import React, { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { likes, name, link, owner } = card;

  const { currentUser } = useContext(CurrentUserContext);

  const isOwner = owner._id === currentUser._id;

  const isLiked = likes.some(like => like._id === currentUser._id);

  const cardLikeClassName = `like-btn card__like-btn ${isLiked ? 'like-btn_active' : ''}`;

  return (
    <li className="card" >
      <article className="card__container" >
        <h2 className="card__title">{name}</h2>
        <button
          className="card__onclick"
          type="button"
          onClick={() => onCardClick({ name, link })}>
          <img
            src={link}
            alt={name}
            className="card__photo"
          />
        </button>
        <div
          className="card__like"
          onClick={() => onCardLike(card)} >
          <button
            className={cardLikeClassName}
            type="button"
            aria-label="Нравится"
            title="Нравится"
          />
          <p className="card__likes-number">{likes.length}</p>
        </div>
        {isOwner &&
          <button
            onClick={() => onCardDelete(card)}
            className="delete-btn card__delete"
            type="button"
            aria-label="Удалить карточку"
            title="Удалить карточку"
          />}
      </article>
    </li>
  )
}

export default Card