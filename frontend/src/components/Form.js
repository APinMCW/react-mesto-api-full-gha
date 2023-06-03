function Form({
  name,
  title,
  handleSubmit,
  children,
  textButton,
  classNameButton,
}) {
  return (
    <div className={name}>
      <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
      <form name={name} className={`popup__form`} onSubmit={handleSubmit}>
        {children}
        <button
          className={classNameButton}
          type="submit"
          aria-label={textButton}
        >
          {textButton}
        </button>
      </form>
    </div>
  );
}

export default Form;
