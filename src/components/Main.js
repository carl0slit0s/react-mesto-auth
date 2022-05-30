import React, { useEffect, useState } from 'react';
import { api } from '../utils/Api';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete
}) {
  
  const currentUser = React.useContext(CurrentUserContext);




  return (
    <main>
      <section className='profile'>
        <div className='profile__overlay'>
          <img
            onClick={onEditAvatar}
            src={currentUser.avatar}
            alt='аватар автора'
            className='profile__avatar'
          />
        </div>

        <div className='profile__info'>
          <h1 className='profile__name'>{currentUser.name}</h1>
          <p className='profile__about'>{currentUser.about}</p>
          <button
            onClick={onEditProfile}
            type='button'
            className='profile__edit'
          ></button>
        </div>

        <button
          onClick={onAddPlace}
          type='button'
          className='profile__add-button'
        ></button>
      </section>

      <section className='gallery'>
        {cards.map((card) => (
          <Card
            onCardClick={onCardClick}
            card={card}
            key={card._id}
            onDeleteClick={onCardDelete}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}
