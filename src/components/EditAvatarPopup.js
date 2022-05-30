import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const avatarRef = React.useRef()
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(avatarRef.current.value)
  }

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])
  
  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'change-avatar'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={'Сохранить'}
    >
      <label className='form__field'>
        <input
          ref={avatarRef}
          type='url'
          name='avatar'
          id='avatar'
          className='form__input form__input_avatar_link'
          placeholder='Ссылка на аватар'
          required
        />
        <span className='form__input-error avatar-error'></span>
      </label>
    </PopupWithForm>
  );
}
