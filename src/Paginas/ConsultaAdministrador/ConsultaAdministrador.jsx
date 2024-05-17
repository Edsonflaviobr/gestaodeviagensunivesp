import React, { useState, useEffect } from 'react';
import './styles.css';
import { api } from '../../Services/api';
import { Header } from '../../Componentes/Header/Header';
import { Footer } from '../../Componentes/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const ConsultaAdministrador = () => {
  const [consultaNomeUsuario, setConsultaNomeUsuario] = useState('');
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [loading, setLoading] = useState(false); // Adicionando um estado para controle de carregamento
  const navigate = useNavigate();

  const handleConsultaNomeUsuarioChange = (e) => {
    setConsultaNomeUsuario(e.target.value);
  };

  const handleConsultarUsuario = async () => {
    try {
      setLoading(true);
      const response = await api.get('usuario');
      const usuarios = response.data;
      const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(consultaNomeUsuario.toLowerCase())
      );
      setUsuariosFiltrados(usuariosFiltrados);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleUsuarioSelecionado = (usuario) => {
    setUsuarioSelecionado(usuario);
  };

  const handleEditarUsuario = () => {
    navigate('/alteracao-cadastro', { state: { usuario: usuarioSelecionado } });
  };

  const handleDeletarUsuario = async () => {
    try {
      const response = await api.delete(`usuario/${usuarioSelecionado.id}`);
      if (response.status === 204) {
        setUsuariosFiltrados(usuariosFiltrados.filter((u) => u.id !== usuarioSelecionado.id));
        setUsuarioSelecionado(null);
        alert('Usuário deletado com sucesso!');
      } else {
        alert('Erro ao deletar usuário');
      }
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleConsultarUsuario();
  };

  return (
    <div>
      <Header />
      <div className='adm'>
        <form onSubmit={handleSubmit}>
          <h2>Consultar Usuários</h2>
          <label> Nome do Usuário </label>
          <input type="text" id="consultaNomeUsuario" value={consultaNomeUsuario} onChange={handleConsultaNomeUsuarioChange} />
          <button type="submit">Pesquisar</button>
        </form>
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {usuariosFiltrados.map((usuario) => (
                <tr key={usuario.id} onClick={() => handleUsuarioSelecionado(usuario)}>
                  <td>{usuario.nome}</td>
                  <td>
                    <button type="button" onClick={handleEditarUsuario}>Editar</button>
                    <button type="button" onClick={handleDeletarUsuario}>Deletar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaAdministrador };




