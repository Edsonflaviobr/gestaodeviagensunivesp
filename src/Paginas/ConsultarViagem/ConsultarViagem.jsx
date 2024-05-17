import React, { useState, useEffect } from 'react';
import './styles.css';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const ConsultaViagem = () => {
  const [consulta, setConsulta] = useState('');
  const [viagens, setViagens] = useState([]);
  const [viagensFiltradas, setViagensFiltradas] = useState([]);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get('viagem/');
        setViagens(response.data);
      } catch (error) {
        console.error('Erro ao buscar viagens:', error);
      }
    };

    fetchViagens();
  }, []);

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const handlePesquisar = () => {
    const viagensFiltradas = viagens.filter((viagem) =>
      viagem.nome_paciente?.toLowerCase().includes(consulta.toLowerCase())
    );
    setViagensFiltradas(viagensFiltradas);
    if (viagensFiltradas.length === 0) {
      alert("Nenhuma viagem encontrada com o nome do paciente pesquisado.");
    }
  };

  const handleViagemSelecionada = (viagem) => {
    setViagemSelecionada(viagem);
  };

  const handleEditarViagem = () => {
    navigate('/alteracao-viagem', { state: { viagem: viagemSelecionada } });
  };

  const handleDeletarViagem = async () => {
    try {
      const response = await api.delete(`viagem/${viagemSelecionada.id}`);
      if (response.status === 204) {
        setViagens(viagens.filter((viagem) => viagem.id !== viagemSelecionada.id));
        setViagemSelecionada(null);
        setViagensFiltradas(viagensFiltradas.filter((viagem) => viagem.id !== viagemSelecionada.id));
        alert('Viagem deletada com sucesso!');
      } else {
        alert('Erro ao deletar viagem');
      }
    } catch (error) {
      console.error('Erro ao deletar viagem:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className='consul'>
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Consultar Viagens</h2>
          <label>Nome do Paciente </label>
          <input type='text' id="consultaNome" value={consulta} onChange={handleConsultaChange} />
          <button type="button" onClick={handlePesquisar}>Pesquisar</button>
        </form>
        {viagensFiltradas.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Nome do Paciente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {viagensFiltradas.map((viagem) => (
                <tr key={viagem.id}>
                  <td>{viagem.nome_paciente}</td>
                  <td>
                    <button type="button" onClick={() => handleViagemSelecionada(viagem)}>Selecionar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viagemSelecionada && (
          <div>
            <h3>Detalhes da Viagem</h3>
            <p>Data: {viagemSelecionada.data_select}</p>
            <p>Hora: {viagemSelecionada.hora_select}</p>
            <p>Nome do Paciente: {viagemSelecionada.nome_paciente}</p>
            <p>RG do Paciente: {viagemSelecionada.rg_paciente}</p>
            <p>Telefone do Paciente: {viagemSelecionada.tel_paciente}</p>
            <p>Destino: {viagemSelecionada.destino}</p>
            <p>Endereço do Destino: {viagemSelecionada.end_destino}</p>
            <p>Ponto do Paciente: {viagemSelecionada.ponto_paciente}</p>
            <p>Observações: {viagemSelecionada.obs}</p>
            {viagemSelecionada.ac && (
              <>
                <p>Nome do Acompanhante: {viagemSelecionada.nome_acompanhante}</p>
                <p>RG do Acompanhante: {viagemSelecionada.rg_acompanhante}</p>
                <p>Endereço do Acompanhante: {viagemSelecionada.end_acompanhante}</p>
                <p>Ponto do Acompanhante: {viagemSelecionada.ponto_acompanhante}</p>
              </>
            )}
            <button type="button" onClick={handleEditarViagem}>Editar</button>
            <button type="button" onClick={handleDeletarViagem}>Deletar</button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaViagem };

