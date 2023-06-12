import { useEffect } from "react";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import Form from "./Form";
import Input from "./Input";

function Login({ handleLogin }) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }

    handleLogin(values);
  }

  useEffect(() => {
    setValues({ email: "", password: "" });
  }, []);

  return (
    <Form
      name="login"
      title="Вход"
      className="login__form"
      handleSubmit={handleSubmit}
      textButton="Войти"
      classNameButton="login__button"
    >
      <Input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ""}
        onChange={handleChange}
        required
        blockClassName="login"
        error={errors}
        isValid={isValid}
      />
      <Input
        type="password"
        name="password"
        placeholder="Пароль"
        value={values.password || ""}
        onChange={handleChange}
        required
        blockClassName="login"
        error={errors}
        isValid={isValid}
      />
    </Form>
  );
}

export default Login;
