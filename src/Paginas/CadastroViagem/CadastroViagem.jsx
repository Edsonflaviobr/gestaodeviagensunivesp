import React, { useState } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { format } from 'date-fns';
import { Header } from '../../Componentes/Header/Header.jsx';

const CadastroViagem = () => {
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [cartaoSus, setCartaoSus] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [rgPaciente, setRgPaciente] = useState('');
  const [destino, setDestino] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [pontoPaciente, setPontoPaciente] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [acompanhanteNecessario, setAcompanhanteNecessario] = useState(false);

  const navigate = useNavigate();


  const handleDataSelecionada = (date) => {
    setDataSelecionada(date);
  };

  const handleCadastrar = async (formData) => {
    try {

        const formattedDate = format(new Date(formData.dataNascimento), 'ddMMyyyy');

        const response = await api.post('https://api-best-browser-games.vercel.app/users', {
            dataSelecionada: formData.dataSelecionada,
            cartaoSus: formData.cartaoSus,
            namePaciente: formData.namePaciente,
            rgPaciente: formData.rgPaciente,
            dataNascimento: formattedDate,
            destino: formData.destino,
            enderecoDestino: formData.enderecoDestino,
            pontoPaciente: formData.pontoPaciente,
            observacoes: formData.observacoes,
            acompanhanteNecessario: formData.acompanhanteNecessario,

        });
        if (response.status === 201) {
          alert ('Viagem Cadastrar com sucesso!')
          navigate ('/')
        } else {
          console.error('Erro ao cadastrar viagem', response);
        }
      } catch (error) {
        alert('Erro ao cadastrar viagem');
        console.error('Erro ao cadastrar viagem', error);
      }
    };

  const handleAcompanhanteChange = (e) => {
    setAcompanhanteNecessario(e.target.checked);
  };

  return (
      <div className="page-container">
        <label>Data:</label>
        <DatePicker
          selected={dataSelecionada}
          onChange={handleDataSelecionada}
          dateFormat="dd/MM/yyyy"
        />
        <LabelInput label="Cartão do SUS" value={cartaoSus} onChange={setCartaoSus} />
        <LabelInput label="Nome do Paciente" value={nomePaciente} onChange={setNomePaciente} />
        <LabelInput label="RG do Paciente" value={rgPaciente} onChange={setRgPaciente} />
        <LabelInput label="Destino" value={destino} onChange={setDestino} />
        <LabelInput label="Endereço do Destino" value={enderecoDestino} onChange={setEnderecoDestino} />
        <LabelInput label="Ponto do Paciente" value={pontoPaciente} onChange={setPontoPaciente} />
        <LabelInput label="Observações" value={observacoes} onChange={setObservacoes} type="textarea" />
  
        <div className="acompanhante-checkbox">
          <label>
            <input type="checkbox" checked={acompanhanteNecessario} onChange={handleAcompanhanteChange} />
            Necessita de Acompanhante
          </label>
        </div>
  
        {acompanhanteNecessario && (
          <Link to="/cadastro-acompanhante">
            <button>Cadastro Acompanhante</button>
          </Link>
        )}
  
        <button onClick={handleCadastrar}>Cadastrar Viagem</button>
      </div>
  );
}
  

  export { CadastroViagem }

