import '../index.css';
import './Header';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

import React, { useEffect, useState } from 'react';
import { Route, Switch, Redirect, useHistory, Link } from 'react-router-dom';

import successImg from '../images/success-img.jpg';
import errorImg from '../images/error-img.jpg';

import * as auth from '../utils/Auth';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAcceptDeletePopupOpen, setIsAcceptDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isStatusAuthPopupOpen, setIsStatusAuthPopupOpen] = useState(false);
  const [dataTooltip, setDataTooltip] = useState({ image: '', message: '' });

  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      api
        .getProfileData()
        .then((profile) => {
          setCurrentUser(profile);
        })
        .catch((err) => console.log(err));

      api
        .getCards()
        .then((cardList) => {
          const formatedData = cardList.map((cardData) => ({
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            _id: cardData._id,
            ownerId: cardData.owner._id,
          }));
          setCards(formatedData);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      api
        .getCards()
        .then((cardList) => {
          const formatedData = cardList.map((cardData) => ({
            name: cardData.name,
            link: cardData.link,
            likes: cardData.likes,
            _id: cardData._id,
            ownerId: cardData.owner._id,
          }));
          setCards(formatedData);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((cardData) => {
        const newCard = {
          name: cardData.name,
          link: cardData.link,
          likes: cardData.likes,
          _id: cardData._id,
          ownerId: cardData.owner._id,
        };
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((i) => i._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  const handleUpdateUser = (userData) => {
    api
      .editProfile(userData)
      .then((data) =>
        setCurrentUser({ ...currentUser, name: data.name, about: data.about })
      )
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .changeAvatar(avatar)
      .then((data) => setCurrentUser({ ...currentUser, avatar: data.avatar }))
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (name, link) => {
    api
      .addCard(name, link)
      .then((cardData) => {
        const newCard = {
          name: cardData.name,
          link: cardData.link,
          likes: cardData.likes,
          _id: cardData._id,
          ownerId: cardData.owner._id,
        };
        setCards([newCard, ...cards]);
      })
      .then(() => closeAllPopups())
      .catch((err) => console.log(err));
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleAcceptDelete = (card) => {
    setIsAcceptDeletePopupOpen(card);
  };

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAcceptDeletePopupOpen(false);
    setIsStatusAuthPopupOpen(false);
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleLogin = ({ email, password }) => {
    return auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setCurrentUser({ ...currentUser, email });

        tokenCheck();
      })
      .catch((err) => {
        setDataTooltip({
          image: errorImg,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsStatusAuthPopupOpen(true);
        console.log(err);
      });
  };

  const tokenCheck = () => {
    let jwt = localStorage.getItem('token');
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            let userData = {
              username: res.username,
              email: res.email,
            };

            setLoggedIn(true);
            history.push('/');
          }
        })
        .catch((err) => {
          setDataTooltip({
            image: errorImg,
            message: 'Что-то пошло не так! Попробуйте ещё раз.',
          });
          setIsStatusAuthPopupOpen(true);
          console.log(err);
        });
    }
  };

  const handleRegister = ({ email, password }) => {
    return auth
      .register(email, password)
      .then((data) => {
        console.log(data);
        const { email } = data.email;
        setCurrentUser({ ...currentUser, email });
        setDataTooltip({
          image: successImg,
          message: 'Регистрация прошла успешно',
        });
        setIsStatusAuthPopupOpen(true);
        history.push('/sign-in');
      })
      .catch(() => {
        setDataTooltip({
          image: errorImg,
          message: 'Что-то пошло не так! Попробуйте ещё раз.',
        });
        setIsStatusAuthPopupOpen(true);
      });
  };

  const handleOut = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  };

  return (
    <Switch>
      <CurrentUserContext.Provider value={currentUser}>
        <div className='content'>
          <Header handleOut={handleOut} userData={currentUser} />
          <Switch>
            <ProtectedRoute exact path='/' loggedIn={loggedIn}>
              <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDeleteClick={handleAcceptDelete}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
              />
            </ProtectedRoute>

            <Route path='/sign-up'>
              <Register handleRegister={handleRegister} />
            </Route>

            <Route path='/sign-in'>
              <Login handleLogin={handleLogin} userData={currentUser} />
            </Route>
          </Switch>

          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <PopupWithForm
            title={'Вы уверенны?'}
            name={'delete-accept'}
            isOpen={isAcceptDeletePopupOpen}
            children={
              <button className='form__submit' type='submit'>
                Да
              </button>
            }
            onClose={closeAllPopups}
          />

          <InfoTooltip
            image={dataTooltip.image}
            message={dataTooltip.message}
            name={'auth-status'}
            isOpen={isStatusAuthPopupOpen}
            onClose={closeAllPopups}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <Route>
            {loggedIn ? <Redirect to='/' /> : <Redirect to='/sign-in' />}
          </Route>
        </div>
      </CurrentUserContext.Provider>
    </Switch>
  );
}

export default App;
