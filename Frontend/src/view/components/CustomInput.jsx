import "../../styles/form.css";

const CustomInput = ({ name, type, id, handleChange, styles , value}) => {
  return (
    <div className={styles}>
      <label htmlFor={id}>{name}:</label>
      <input
        type={type}
        id={id}
        onChange={handleChange}
        placeholder={`Enter ${name}`}
        value={value}
      />
    </div>
  );
};

export default CustomInput;
