import Popup from "./Popup";

function InfoTooltip({ isOpen, onClose, data }) {
  return (
    <Popup isOpen={isOpen} name="notice" onClose={onClose}>
      <img
        className={`popup__logo popup__logo_type_${data.icon}`}
        alt={data.title}
      ></img>
      <h2 className="popup__title popup__title_type_notice">{data.title}</h2>
    </Popup>
  );
}

export default InfoTooltip;
