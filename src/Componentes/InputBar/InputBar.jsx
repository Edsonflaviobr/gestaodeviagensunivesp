import "./styles.css";

const InputBar = (props) => {
  const { type, searchTerm, onChange, placeholder } = props;
  return (
    <input
      className="barra-de-pesquisa"
      type={type}
      value={searchTerm}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputBar;
