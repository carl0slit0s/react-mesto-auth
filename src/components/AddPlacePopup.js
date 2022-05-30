import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [cardLink, setCardLink] = React.useState('')
  const [cardName, setCardName] = React.useState('')

  React.useEffect(() => {
    setCardLink('')
    setCardName('')
  }, [isOpen])
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(cardName, cardLink)
  }

  function handleChangeName(e) {
    setCardName(e.target.value)
  }
  function handleChangeLink(e) {
    setCardLink(e.target.value)
  }


  return (
    <PopupWithForm
      title={'Новое место'}
      name={'add-photo'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <label className='form__field'>
        <input
          onChange={handleChangeName}
          type='text'
          name='place-name'
          id='place-name'
          className='form__input form__input_card_name'
          placeholder='Название'
          required
          value={cardName}
          // minlength={2}
          // maxlength={30}
        />
        <span className='form__input-error place-name-error'></span>
      </label>

      <label className='form__field'>
        <input
          onChange={handleChangeLink}
          type='url'
          name='photo-link'
          id='photo-link'
          className='form__input form__input_card_link'
          placeholder='Ссылка на картинку'
          required
          value={cardLink}
        />
        <span className='form__input-error photo-link-error'></span>
      </label>

    </PopupWithForm>
  );
}
