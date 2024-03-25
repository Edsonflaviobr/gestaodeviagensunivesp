import React, { useState, useEffect } from 'react';
import { api } from '../../Services/api';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header';

const ConsultaViagem = () => {
  const [consulta, setConsulta] = useState('');
  const [viagens, setViagens] = useState([]);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get('https://api-best-browser-games.vercel.app/users');
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

  const handleViagemSelecionada = (viagem) => {
    setViagemSelecionada(viagem);
  };

  const handleEditarViagem = () => {
    Navigate('/CadastroViagem', { state: { viagem: viagemSelecionada } });
  };

  const handleDeletarViagem = async () => {
    try {
      const response = await api.delete(`https://api-best-browser-games.vercel.app/users/${viagemSelecionada.id}`);
      if (response.status === 204) {
        setViagens(viagens.filter((viagem) => viagem.id !== viagemSelecionada.id));
        setViagemSelecionada(null);
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
      <h2>Consultar Viagens</h2>
      <input type="text" value={consulta} onChange={handleConsultaChange} placeholder="Consultar por nome do paciente, cartão do SUS, nome do motorista, placa do veículo ou data da viagem" />
      <ul>
        {viagens.map((viagem) => (
          <li key={viagem.id} onClick={() => handleViagemSelecionada(viagem)}>
            <div>{viagem.nomePaciente}</div>
            <div>{viagem.cartaoSus}</div>
            <div>{viagem.nomeMotorista}</div>
            <div>{viagem.placaVeiculo}</div>
            <div>{viagem.dataViagem}</div>
          </li>
        ))}
      </ul>
      {viagemSelecionada && (
        <div>
          <button onClick={handleEditarViagem}>Editar</button>
          <button onClick={handleDeletarViagem}>Deletar</button>
        </div>
      )}
      <Link to="/CadastroViagem">
        <button>Cadastrar Nova Viagem</button>
      </Link>
    </div>
  );
};

export { ConsultaViagem }
