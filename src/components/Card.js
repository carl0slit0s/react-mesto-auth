import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.ownerId === currentUser._id;
  const cardDeleteButtonClassName = `photo-card__delete ${
    isOwn ? 'photo-card__delete_visible' : ''
  }`;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `photo-card__like ${isLiked ? 'photo-card__like_activate' : ''}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <article className='photo-card'>
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className='photo-card__photo'
      />
      <button
        onClick={handleDeleteClick}
        type='button'
        className={cardDeleteButtonClassName}
      ></button>
      <div className='photo-card__description'>
        <h2 className='photo-card__name'>{card.name}</h2>
        <div className='photo-card__like-info'>
          <button onClick={handleLikeClick} type='button' className={cardLikeButtonClassName}></button>
          <p className='photo-card__like-count'>{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}
