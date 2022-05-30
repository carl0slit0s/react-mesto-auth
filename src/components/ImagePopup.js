import React from 'react';

export default function ImagePopup({card, onClose}) {
  return (
    <div className={`popup popup_terget_add-photo ${(Object.keys(card).length) ? 'popup_opened' : ''}`}>
      <div className='popup__conteiner popup__conteiner_type_photo'>
        <figure className='photo-popup'>
          <img src={card ? card.link : ''} alt={card ? card.name : ''} className='photo-popup__photo' />
          <figcaption className='photo-popup__title'>{card ? card.name : ''}</figcaption>
        </figure>

        <button onClick={onClose} type='button' className='popup__close-icon'></button>
      </div>
    </div>
  );
}
