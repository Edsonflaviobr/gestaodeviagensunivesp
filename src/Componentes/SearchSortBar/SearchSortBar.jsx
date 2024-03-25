import "./styles.css";

const SearchSortBar = (props) => {
  const { onClick } = props;
  return (
    <>
      {props.children}
      <button className="botao-pesquisar" onClick={onClick}>
        Pesquisar
      </button>
    </>
  );
};

export default SearchSortBar;
