function Input({ error, isValid, onChange, blockClassName, ...props }) {
  return (
    <>
      <input
        name={props.name}
        className={`${blockClassName}__input ${blockClassName}__input_data_email`}
        id={`${props.name}-input`}
        onChange={onChange}
        value={props.value || ""}
        {...props}
      />
      <span
        className={`${blockClassName}__error ${props.name}-input-error ${
            isValid ? "" : "popup__error_visible"
        }`}
      >
        {error[props.name]}
      </span>
    </>
  );
}

export default Input;
