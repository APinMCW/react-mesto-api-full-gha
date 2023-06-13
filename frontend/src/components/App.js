import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import apiConfig from "../utils/apiConfig";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import * as ApiAuth from "../utils/ApiAuth.js";
import ProtectedRouteElement from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isNoticePopupOpen, setNoticePopupOpen] = useState(false);
  const [dataInfoTooltop, setDataInfoTooltop] = useState({
    title: "",
    icon: "",
  });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [dataUser, setDataUser] = useState({ password: "", email: "" });
  const [cards, setCards] = useState([]);
  const [loggedIn, setloggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, cards]) => {
        setCurrentUser(userData);
        setCards(cards);
      })
      .catch((err) => console.log(`Ошибка при запросе данных: ${err}`));
  }, []);

  function handleDeleteClick(card) {
    api
      .delCard(card._id)
      .then(() => {
        setCards(() => cards.filter((el) => el._id !== card._id));
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`));
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setNoticePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(userInfo) {
    api
      .setUserInfo(userInfo)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => 
        console.log(`Ошибка при обновлении данных профиля: ${err}`)
      );
  }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при обновлении аватара: ${err}`));
  }

  function handleAddPlaceSubmit(card) {
    api
      .setCard(card)
      .then((data) => {
        setCards([data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка при добавлении карточки: ${err}`));
  }

  function handleLogin({ email, password }) {
    return ApiAuth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          apiConfig.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
          setloggedIn(true);
          setDataUser({
            password: password,
            email: email,
          });
          navigate("/");
        }
      })
      .catch(() => {
        setDataInfoTooltop({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: "fail",
        });
        setNoticePopupOpen(true);
      });
  }

  function handleRegister({ email, password }) {
    return ApiAuth.register(email, password)
      .then((res) => {
        res.ok
          ? setDataInfoTooltop({
              title: "Что-то пошло не так! Попробуйте ещё раз.",
              icon: "fail",
            })
          : setDataInfoTooltop({
              title: "Вы успешно зарегистрировались!",
              icon: "succses",
            });
        setNoticePopupOpen(true);
        navigate("/sign-in")
      })
      .catch(() => {
        setDataInfoTooltop({
          title: "Что-то пошло не так! Попробуйте ещё раз.",
          icon: "fail",
        });
        setNoticePopupOpen(true);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("token");
    if (jwt) {
      ApiAuth.checkToken(jwt)
        .then((res) => {
          setloggedIn(true);
          setDataUser({
            password: res.password,
            email: res.email,
          });
          navigate("/");
        })
        .catch((err) => console.log(`Ошибка при проверке токена: ${err}`));
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header dataUser={dataUser} />
      <Routes>
        <Route
          path="*"
          element={
            loggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <Navigate to="/sign-in" replace />
            )
          }
        />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route
          path="/sign-up"
          element={<Register handleRegister={handleRegister} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Main}
              onEditProfile={() => setEditProfilePopupOpen(true)}
              onAddPlace={() => setAddPlacePopupOpen(true)}
              onEditAvatar={() => setEditAvatarPopupOpen(true)}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteClick}
              cards={cards}
              loggedIn={loggedIn}
            />
          }
        />
      </Routes>
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
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm title="Вы уверены?" name="confirmation" textButton="Да" />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <InfoTooltip
        isOpen={isNoticePopupOpen}
        onClose={closeAllPopups}
        data={dataInfoTooltop}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
