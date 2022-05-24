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

import React, { useEffect, useState } from 'react';

function App() {
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAcceptDeletePopupOpen, setIsAcceptDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfileData()
      .then((profile) => {
        setCurrentUser(profile);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
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
        }
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
        }
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
    setSelectedCard({});
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='content'>
        <Header />

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
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
