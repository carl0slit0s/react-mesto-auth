import React, { useState } from 'react';

export default function Login(props) {
  const [formParams, setFormParams] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormParams((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = formParams;
    props.handleLogin({ email, password }).catch((err) => {
      setMessage(err.message);
    });
  };

  return (
      <form onSubmit={handleSubmit} className='form form_auth'>
        <h2 className='form__title form__title_auth'>Вход</h2>
        <label className='form__field'>
          <input
            onChange={handleChange}
            className='form__input form__input_auth'
            placeholder='Email'
            value={formParams.email}
            name='email'
          ></input>
        </label>
        <label className='form__field form__field_auth'>
          <input
            onChange={handleChange}
            className='form__input form__input_auth'
            placeholder='Пароль'
            value={formParams.password}
            name='password'
            type='password'
          ></input>
        </label>
        <button          
          className='form__submit form__submit_auth'
          type='submit'
        >
          Войти
        </button>
      </form>
  );
}
