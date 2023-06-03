import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
          />
          <button
            type="button"
            className="profile__button profile__button_type_avatar"
            aria-label="Редактировать аватар"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__section">
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>
          </div>
          <button
            type="button"
            className="profile__button profile__button_type_edit-data"
            aria-label="Редактировать профиль"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          type="button"
          className="profile__plus"
          aria-label="Добавить карточку"
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="elements">
          {cards.length ? (
            cards.map((card) => (
              <Card
                card={card}
                key={card._id}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          ) : (
            <p style={{ color: "grey" }}>Увы, карточки не загрузились</p>
          )}
        </ul>
      </section>
    </main>
  );
}
export default Main;
