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
  const [data_select, setData_Select] = useState(null);
  const [hora_select, setHora_Select] = useState(null);
  const [nome_paciente, setNomePaciente] = useState('');
  const [rg_paciente, setRgPaciente] = useState('');
  const [tel_paciente, setTelPaciente] = useState ('');
  const [destino, setDestino] = useState('');
  const [end_destino, setEnderecoDestino] = useState('');
  const [ponto_paciente, setPontoPaciente] = useState('');
  const [obs, setObservacoes] = useState('');
  const [ac, setAcompanhanteNecessario] = useState(false);


  const navigate = useNavigate();


  const handleDataSelecionada = (date) => {
    setData_Select(date);
  };

  const handleHoraSelecionada = (time) => {
    setHora_Select(time);
  };

  const verificarDisponibilidade = async () => {
    try {
      const response = await api.get(`viagem?data=${data_select}&hora=${hora_select}`);
      return response.data.disponivel;
    } catch (error) {
      console.error('Erro ao verificar disponibilidade:', error);
      return false; 
    }
  };



  const handleCadastrar = async (formData) => {
    try {
        if (!data_select || !hora_select) {
          alert('Por favor, selecione uma data e hora.');
          return;
        }
  
        const disponivel = await verificarDisponibilidade();
        if (!disponivel) {
          alert('Data e hora selecionadas não estão disponíveis. Por favor, escolha outra.');
          return;
        }

        const formData = {
          data_select,
          hora_select,
          nome_paciente,
          rg_paciente,
          tel_paciente,
          destino,
          end_destino,
          ponto_paciente,
          obs,
          ac,
        };

        const response = await api.post('viagem/', formData);
  
        if (response.status === 201) {
          alert ('Viagem Cadastrar com sucesso!')
          navigate ('/menu')
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
              selected={data_select}
              onChange={handleDataSelecionada}
              dateFormat="yyyy-MM-dd"
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
              selected={hora_select}
              onChange={handleHoraSelecionada}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Hora"
              dateFormat="HH:mm:ss"
              placeholderText="Selecione uma hora"
            />
      </div>  
          <LabelInput label="Nome do Paciente" value={nome_paciente} onChange={setNomePaciente} />
          <LabelInput label="RG do Paciente" value={rg_paciente} onChange={setRgPaciente} />
          <LabelInput label="Telefone do Paciente" value={tel_paciente} onChange={setTelPaciente} />
          <LabelInput label="Destino" value={destino} onChange={setDestino} />
          <LabelInput label="Endereço do Destino" value={end_destino} onChange={setEnderecoDestino} />
          <LabelInput label="Ponto do Paciente" value={ponto_paciente} onChange={setPontoPaciente} />
          <LabelInput label="Observações" value={obs} onChange={setObservacoes} type="textarea" />
  
        <div>
          <label>Necessita de Acompanhante </label>
          <input type="checkbox" checked={ac} onChange={handleAcompanhanteChange} />
        </div>
  
        {ac && (
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

