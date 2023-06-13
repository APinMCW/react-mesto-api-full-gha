import React, { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Input from "./Input";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: values.name, about: values.about });
  }

  useEffect(() => {
    setValues({ name: currentUser.name, about: currentUser.about });
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      textButton="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        name="name"
        placeholder="Имя"
        value={values.name || ""}
        onChange={handleChange}
        required
        blockClassName="popup"
        error={errors}
        isValid={isValid}
      />
      <Input
        type="text"
        name="about"
        placeholder="О себе"
        value={values.about || ""}
        onChange={handleChange}
        required
        blockClassName="popup"
        error={errors}
        isValid={isValid}
      />
    </PopupWithForm>
  );
}
export default EditProfilePopup;
