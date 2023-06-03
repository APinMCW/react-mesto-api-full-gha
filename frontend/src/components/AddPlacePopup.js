import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace(values);
  }

  useEffect(() => {
    resetForm();
    setValues({ name: "", link: "" });
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Новое место"
      name="add-card"
      textButton="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="name"
        placeholder="Название"
        value={values.name}
        onChange={handleChange}
        required
        blockClassName="popup"
        id="cardName-input"
        error={errors}
        isValid={isValid}
      />
      <Input
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        value={values.link}
        onChange={handleChange}
        required
        blockClassName="popup"
        id="link-input"
        error={errors}
        isValid={isValid}
      />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
