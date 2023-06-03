import Form from "./Form";
import Popup from "./Popup";

function PopupWithForm({
  title,
  name,
  textButton,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <Popup isOpen={isOpen} name={name} onClose={onClose}>
      <Form
        name={name}
        title={title}
        handleSubmit={onSubmit}
        textButton={textButton}
        classNameButton="popup__button"
      >
        {children}
      </Form>
    </Popup>
  );
}

export default PopupWithForm;
