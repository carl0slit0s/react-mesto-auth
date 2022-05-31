import React from 'react';
import { Switch } from 'react-router-dom';
import { Link, Route } from 'react-router-dom';
import logo from '../images/vector_img/logo.svg';

export default function Header({ handleOut, userData }) {
  return (
    <header className='header'>
      <img
        src={logo}
        alt="лого сайта. Надпись на английском языке 'место'"
        className='header__logo'
      />
      <Switch>
        <Route path={'/sign-up'}>
          <Link className='link' to='/sign-in'>
            Войти
          </Link>
        </Route>
        <Route path={'/sign-in'}>
          <Link className='link' to='/sign-up'>
            Регистрация
          </Link>
        </Route>
        <Route exact path={'/'}>
          <div className='header__bar'>
            <p>{userData.email}</p>
            <Link className='link' onClick={handleOut} to='/sign-in'>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}
