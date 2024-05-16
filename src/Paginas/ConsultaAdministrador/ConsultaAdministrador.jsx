import React, { useState, useEffect } from 'react';
import './styles.css'
import { api } from '../../Services/api';
import { Header } from '../../Componentes/Header/Header';
import LabelInput from '../../Componentes/LabelInput/LabelInput';
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
      setLoading(true); // Ativar o estado de loading
      const response = await api.get(`usuario?nome=${consultaNomeUsuario}`);
      setUsuariosFiltrados(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false); // Desativar o estado de loading
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

  return (
    <div>
      <Header />
      <div className='adm'>
        <form onSubmit={(e) => { e.preventDefault(); handleConsultarUsuario(); }}>
          <h2>Consultar Usuários</h2>
          <LabelInput
            label="Nome do Usuário"
            type="text"
            id="consultaNomeUsuario"
            value={consultaNomeUsuario}
            onChange={handleConsultaNomeUsuarioChange}
          />
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



