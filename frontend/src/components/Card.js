import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `elements__like ${
    isLiked && "elements__like_active"
  }`;

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="elements__list" key={card._id}>
      <article className="elements__element">
        <img
          className="elements__img"
          src={card.link}
          alt={card.name}
          onClick={handleClick}
        />
        {isOwn && (
          <button
            type="button"
            className="elements__trash"
            aria-label="Удалить карточку"
            onClick={handleDeleteClick}
          />
        )}
        <div className="elements__container">
          <h2 className="elements__title">{card.name}</h2>
          <div className="elements__like-container">
            <button
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Сердечко"
              onClick={handleLikeClick}
            ></button>
            <span className="elements__like-count">{card.likes.length}</span>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
