import React from 'react';

export default function InfoTooltip({name, image, message, isOpen, onClose}) {
  return (
    <div
      className={`popup popup_terget_${name} ${isOpen && 'popup_opened'}`}
    >
      <div className='popup__conteiner popup-notify'>
        <img className='popup-notify__image' src={image} alt=''></img>
        <p className='popup-notify__massage'>{message}</p>
        <button
          onClick={onClose}
          type='button'
          className='popup__close-icon'
        ></button>
      </div>
    </div>
  );
}
