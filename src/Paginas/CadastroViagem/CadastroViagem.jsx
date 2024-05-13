import React, { useState } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; 
import { format } from 'date-fns';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';


const CadastroViagem = () => {
  const [dataSelecionada, setDataSelecionada] = useState(null);
  const [horaSelecionada, setHoraSelecionada] = useState(null);
  const [nomePaciente, setNomePaciente] = useState('');
  const [rgPaciente, setRgPaciente] = useState('');
  const [destino, setDestino] = useState('');
  const [enderecoDestino, setEnderecoDestino] = useState('');
  const [pontoPaciente, setPontoPaciente] = useState('');
  const [motoristaDesignado, setMotoristaDesignado] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [acompanhanteNecessario, setAcompanhanteNecessario] = useState(false);

  const navigate = useNavigate();


  const handleDataSelecionada = (date) => {
    setDataSelecionada(date);
  };

  const handleHoraSelecionada = (time) => {
    setHoraSelecionada(time);
  };

  const verificarDisponibilidade = async () => {
    try {
      const response = await api.get(`/verificar-disponibilidade?data=${dataSelecionada}&hora=${horaSelecionada}`);
      return response.data.disponivel;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false; 
    }
  };



  const handleCadastrar = async (formData) => {
    try {
        if (!dataSelecionada || !horaSelecionada) {
          alert('Por favor, selecione uma data e hora.');
          return;
        }
  
        const disponivel = await verificarDisponibilidade();
        if (!disponivel) {
          alert('Data e hora selecionadas não estão disponíveis. Por favor, escolha outra.');
          return;
        }

        const formattedDate = format(new Date(dataSelecionada), 'ddMMyyyy');

        const formData = {
          dataSelecionada,
          nomePaciente,
          rgPaciente,
          destino,
          enderecoDestino,
          pontoPaciente,
          motoristaDesignado,
          observacoes,
          acompanhanteNecessario,
        };

        const response = await api.post('https://api-best-browser-games.vercel.app/users', formData);
  
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
    <>
 
    <Header />
  
    <div className='contain-main'>
      <form>
      <h2> Cadastro de Viagem </h2>
      <div className='horario'>
        <label> Data </label>
            <DatePicker
              selected={dataSelecionada}
              onChange={handleDataSelecionada}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione uma data"
              showYearDropdown
              yearDropdownItemNumber={15}
              scrollableYearDropdown
              todayButton="Hoje"
              minDate={new Date()}
              maxDate={new Date(new Date().getFullYear() + 1, 11, 31)}
            />
        <label> Hora </label>
            <DatePicker
              selected={horaSelecionada}
              onChange={handleHoraSelecionada}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Hora"
              dateFormat="HH:mm"
              placeholderText="Selecione uma hora"
            />
      </div>  
          <LabelInput label="Nome do Paciente" value={nomePaciente} onChange={setNomePaciente} />
          <LabelInput label="RG do Paciente" value={rgPaciente} onChange={setRgPaciente} />
          <LabelInput label="Destino" value={destino} onChange={setDestino} />
          <LabelInput label="Endereço do Destino" value={enderecoDestino} onChange={setEnderecoDestino} />
          <LabelInput label="Ponto do Paciente" value={pontoPaciente} onChange={setPontoPaciente} />
          <LabelInput label="Motorista Designado" value={motoristaDesignado} onChange={setMotoristaDesignado} />
          <LabelInput label="Observações" value={observacoes} onChange={setObservacoes} type="textarea" />
  
        <div>
          <label>Necessita de Acompanhante </label>
          <input type="checkbox" checked={acompanhanteNecessario} onChange={handleAcompanhanteChange} />
        </div>
  
        {acompanhanteNecessario && (
          <Link to="/cadastro-acompanhante">
            <button>Cadastro Acompanhante</button>
          </Link>
        )}
  
        <button type="button" onClick={handleCadastrar}>Cadastrar Viagem </button>
      </form>
    </div>
    <Footer />
  </>
  );
}
  

  export { CadastroViagem }

