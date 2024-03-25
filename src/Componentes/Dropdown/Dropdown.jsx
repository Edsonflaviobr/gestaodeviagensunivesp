import "./styles.css";

const Dropdown = (props) => {
  const { value, onChange, options } = props;
  const renderedCategory = options.map((category) => (
    <option key={category._id} value={category.name}>
      {category.name}
    </option>
  ));
  return (
    <select className="lista-categoria" value={value} onChange={onChange}>
      <option disabled hidden value="">
        Por categoria
      </option>
      <option value="todos">Exibir todos</option>
      {renderedCategory}
    </select>
  );
};

export default Dropdown;
