import { useEffect, useState } from "react";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import api from '../utils/api';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, useNavigate } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from '../utils/auth'
import Header from "./Header/Header";

function App() {
  const initialPopupState = {
    editProfile: false,
    addPlace: false,
    editAvatar: false,
    imagePopup: false,
  };
  const [popupState, setPopupState] = useState(initialPopupState);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(like => like._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log('Не удалось обработать лайк'));
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id,)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log('Не удалось удалить карточку'));
  }

  const handleAvatarClick = () => {
    setPopupState({ ...popupState, editAvatar: true });
  };

  const handleEditProfileClick = () => {
    setPopupState({ ...popupState, editProfile: true });
  };

  const handleAddPlaceClick = () => {
    setPopupState({ ...popupState, addPlace: true });
  };

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setPopupState({ ...popupState, imagePopup: true });
  };

  const closeAllPopups = () => {
    setPopupState(initialPopupState);
  };

  const handleUpdateUser = (user) => {
    api.updateUserInfo(user)
      .then((newUser) => {
        setCurrentUser({
          ...currentUser,
          name: newUser.name,
          about: newUser.about
        })
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Не удалось обновить профиль: ', err);
      })
  }

  const handleUpdateAvatar = (avatar) => {
    api.updateAvatar(avatar)
      .then((newUser) => {
        setCurrentUser({ ...currentUser, avatar: newUser.avatar })
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Не удалось обновить аватар: ', err);
      })
  }

  const handleAddPlace = (card) => {
    api.postCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups();
      })
      .catch((err) => {
        console.log('Не удалось запостить карточку: ', err);
      })
  }

  const handleLogin = () => {
    setLoggedIn(true);
  }

  useEffect(() => {
    api.loadUserInfo()
      .then((user) => {
        setLoggedIn(true)
        setCurrentUser(user)
        navigate('/');
      })
      .catch((err) => {
        setLoggedIn(false)
      })
  }, [])

  useEffect(() => {
    if (loggedIn) {
      api.loadUserInfo()
        .then((user) => {
          setCurrentUser(user)
        })
        .catch((err) => {
          console.log('Не удалось инициализировать профиль: ', err);
        })
      api.getInitialCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log('Не удалось инициализировать карточки: ', err);
        });
    }
  }, [loggedIn])

  return (
    <CurrentUserContext.Provider value={{ currentUser, loggedIn, setLoggedIn }}>
      <div className="page">
        <Header />
        <Routes>
          <Route path='/sign-in' element={
            <Login handleLogin={handleLogin} />
          } />
          <Route path='/sign-up' element={
            <Register />
          } />
          <Route
            path='/'
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
        <EditProfilePopup
          isOpen={popupState.editProfile}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={popupState.addPlace}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />
        <EditAvatarPopup
          isOpen={popupState.editAvatar}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <PopupWithForm name="del" title="Вы уверены?" onClose={closeAllPopups}></PopupWithForm>
        <ImagePopup
          isOpen={popupState.imagePopup}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
