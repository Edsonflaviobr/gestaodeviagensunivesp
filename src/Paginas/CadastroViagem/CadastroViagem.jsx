import React, { useState } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';
import { jsPDF } from 'jspdf';


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
  const [nome_acompanhante, setNomeAcompanhante] = useState('');
  const [rg_acompanhante, setRgAcompanhante] = useState('');
  const [end_acompanhante, setEndAcompanhante] = useState('');
  const [ponto_acompanhante, setPontoAcompanhante] = useState('');

  const navigate = useNavigate();

  const handleDataSelecionada = (date) => {
    setData_Select(date); 
  };

  const handleHoraSelecionada = (time) => {
    setHora_Select(time);
  };

  const handleCadastrar = async (formData) => {
    try {
        if (!data_select || !hora_select) {
          alert('Por favor, selecione uma data e hora.');
          return;
        }
        const dataFormatted = data_select.toISOString().split('T')[0];
        const horaFormatted = hora_select.toTimeString().split(' ')[0];

        const formData = {
          data_select: dataFormatted,
          hora_select: horaFormatted,
          nome_paciente,
          rg_paciente,
          tel_paciente,
          destino,
          end_destino,
          ponto_paciente,
          obs,
          ac,
          ...(ac && {
            nome_acompanhante,
            rg_acompanhante,
            end_acompanhante,
            ponto_acompanhante,
          }),
        };

        let url = 'viagem'; 

        if (ac) {
          url = 'viagem/acompanhante';
        }
        const response = await api.post(url, formData);
  
        if (response.status === 201) {
          alert ('Viagem Cadastrar com sucesso!')
          
          const doc = new jsPDF();
          doc.text('Dados da Viagem Cadastrada', 10, 10);
          doc.text(`Data: ${dataFormatted}`, 10, 20);
          doc.text(`Hora: ${horaFormatted}`, 10, 30);
          doc.text(`Nome do Paciente: ${nome_paciente}`, 10, 40);
          doc.text(`RG do Paciente: ${rg_paciente}`, 10, 50);
          doc.text(`Telefone do Paciente: ${tel_paciente}`, 10, 60);
          doc.text(`Destino: ${destino}`, 10, 70);
          doc.text(`Endereço do Destino: ${end_destino}`, 10, 80);
          doc.text(`Ponto do Paciente: ${ponto_paciente}`, 10, 90);
          doc.text(`Observações: ${obs}`, 10, 100);
          if (ac) {
            doc.text(`Nome do Acompanhante: ${nome_acompanhante}`, 10, 110);
            doc.text(`RG do Acompanhante: ${rg_acompanhante}`, 10, 120);
            doc.text(`Endereço do Acompanhante: ${end_acompanhante}`, 10, 130);
            doc.text(`Ponto do Acompanhante: ${ponto_acompanhante}`, 10, 140);
          }
          doc.save('ViagemCadastrada.pdf');
          
          navigate('/menu');
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
            <>
              <LabelInput label="Nome do Acompanhante" value={nome_acompanhante} onChange={setNomeAcompanhante} />
              <LabelInput label="RG do Acompanhante" value={rg_acompanhante} onChange={setRgAcompanhante} />
              <LabelInput label="Endereço do Acompanhante" value={end_acompanhante} onChange={setEndAcompanhante} />
              <LabelInput label="Ponto do Acompanhante" value={ponto_acompanhante} onChange={setPontoAcompanhante} />
            </>
          )}
  
        <button type="button" onClick={handleCadastrar}>Cadastrar Viagem </button>
      </form>
    </div>
    <Footer />
  </>
  );
}
  

  export { CadastroViagem }

