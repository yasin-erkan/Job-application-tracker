const Input = ({
  label,
  name,
  options,
  type = "text",
  handleChange = () => {},
}) => {
  return (
    <div className="field">
      <label>{label}</label>

      {options ? (
        <select name={name} onChange={handleChange}>
          {options.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      ) : (
        <input name={name} type={type} onChange={handleChange} />
      )}
    </div>
  );
};

export default Input;
