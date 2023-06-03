import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Form from "./Form";
import Input from "./Input";

function Register({ handleRegister }) {

  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    handleRegister(values);
  }

  return (
    <>
      <Form
        name="Register"
        title="Регистрация"
        className="Register__form"
        handleSubmit={handleSubmit}
        textButton="Зарегистрироваться"
        classNameButton="Register__button"
      >
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
          blockClassName="Register"
          error={errors}
          isValid={isValid}
        />
        <Input
          type="password"
          name="password"
          placeholder="Пароль"
          value={values.password}
          onChange={handleChange}
          required
          blockClassName="Register"
          error={errors}
          isValid={isValid}
        />
      </Form>
      <p className="Register__subtitle">
        Уже зарегистрированы? 
        <Link className="Register__login" to="/sign-in">
          Войти
        </Link>
      </p>
    </>
  );
}

export default Register;
