import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    props.handleRegister({ email, password }).catch((err) => {
      setMessage(err.message);
    });
  };

  return (
    
      <form onSubmit={handleSubmit} className='form form_auth'>
        <h2 className='form__title form__title_auth'>Регистрация</h2>
        <label className='form__field'>
          <input
          name='email'
            onChange={handleChange}
            className='form__input form__input_auth'
            placeholder='Email'
            value={formParams.email}
          ></input>
        </label>
        <label className='form__field form__field_auth'>
          <input
            name='password'
            type='password'
            onChange={handleChange}
            className='form__input form__input_auth'
            placeholder='Пароль'
            value={formParams.password}
          ></input>
        </label>
        <button className='form__submit form__submit_auth' type='submit'>
          Зарегистрироваться
        </button>
        <p className='form__note'>{"Уже зарегистрированы? "} 
        <Link className='link' to="/sign-in">Войти</Link></p>
      </form>
  );
}
