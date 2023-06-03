import Popup from "./Popup";

function ImagePopup({ card, onClose }) {
  return (
    <Popup isOpen={card._id} name="preview" onClose={onClose}>
      <figure className="popup__margin">
        <img className="popup__img" src={card.link} alt={card.name} />
        <figcaption className="popup__caption">{card.name}</figcaption>
      </figure>
    </Popup>
  );
}

export default ImagePopup;
