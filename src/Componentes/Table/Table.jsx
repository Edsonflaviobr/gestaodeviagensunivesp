import "./styles.css";

const Table = (props) => {
  return (
    <table className="tabela-container">
      <thead>
        <tr>
          <th colSpan="2">Jogo</th>
          <th>Categoria</th>
        </tr>
      </thead>
      {props.children}
    </table>
  );
};

export default Table;
