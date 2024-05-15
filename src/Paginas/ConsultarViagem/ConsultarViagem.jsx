import React, { useState, useEffect } from 'react';
import './styles.css'
import { api } from '../../Services/api';
import { Link, Navigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header';
import { Text } from '../../Componentes/Text/Text';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const ConsultaViagem = () => {
  const [consulta, setConsulta] = useState('');
  const [viagens, setViagens] = useState([]);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get('viagem');
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
      const response = await api.delete(`viagem/${viagemSelecionada.id}`);
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
    <div className='consul'>
    <form>
    <h2>Consultar Viagens</h2>
      <LabelInput label="Nome do Paciente" type="text" id="consultaNome" value={consulta} onChange={handleConsultaChange} />
      <LabelInput label="RG do paciente" type="text" id="consultaRG" value={consulta} onChange={handleConsultaChange} />
      <LabelInput label="Nome do Motorista" type="text" id="consultaNomeMotorista" value={consulta} onChange={handleConsultaChange} />
      <LabelInput label="Data da Viagem" type="date" id="consultaDataViagem" value={consulta} onChange={handleConsultaChange} />
    <ul>
      {viagens.map((viagem) => (
        <li key={viagem.id} onClick={() => handleViagemSelecionada(viagem)}>
          <div>{viagem.nomePaciente}</div>
          <div>{viagem.rgPaciente}</div>
          <div>{viagem.nomeMotorista}</div>
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
     <Text text="Busque por qualquer um dos campos" />
    <Link to="/CadastroViagem">
      <button>Consultar Viagem</button>
    </Link>
  </form>
  </div>
  <Footer />
  </div>
);
};

export { ConsultaViagem }
