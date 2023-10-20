import "../../styles/form.css";

const CustomButton = ({name, handleEvent, styles, }) => {
  return (
    <div>
      <button className={styles} onClick={handleEvent}>
        {name}
      </button>
    </div>
  );
};

export default CustomButton;
