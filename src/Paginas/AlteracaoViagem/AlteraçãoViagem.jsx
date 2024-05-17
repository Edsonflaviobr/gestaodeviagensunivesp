import React, { useState, useEffect } from 'react';
import './styles.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate, useLocation } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const AlteracaoViagem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data_select, setData_Select] = useState(null);
  const [hora_select, setHora_Select] = useState(null);
  const [nome_paciente, setNomePaciente] = useState('');
  const [rg_paciente, setRgPaciente] = useState('');
  const [tel_paciente, setTelPaciente] = useState('');
  const [destino, setDestino] = useState('');
  const [end_destino, setEnderecoDestino] = useState('');
  const [ponto_paciente, setPontoPaciente] = useState('');
  const [obs, setObservacoes] = useState('');
  const [ac, setAcompanhanteNecessario] = useState(false);
  const [nome_acompanhante, setNomeAcompanhante] = useState('');
  const [rg_acompanhante, setRgAcompanhante] = useState('');
  const [end_acompanhante, setEndAcompanhante] = useState('');
  const [ponto_acompanhante, setPontoAcompanhante] = useState('');

  useEffect(() => {
    if (location.state && location.state.viagem) {
      const viagem = location.state.viagem;
      setData_Select(new Date(viagem.data_select));
      setHora_Select(new Date(`1970-01-01T${viagem.hora_select}`));
      setNomePaciente(viagem.nome_paciente);
      setRgPaciente(viagem.rg_paciente);
      setTelPaciente(viagem.tel_paciente);
      setDestino(viagem.destino);
      setEnderecoDestino(viagem.end_destino);
      setPontoPaciente(viagem.ponto_paciente);
      setObservacoes(viagem.obs);
      setAcompanhanteNecessario(viagem.ac);
      if (viagem.ac) {
        setNomeAcompanhante(viagem.nome_acompanhante);
        setRgAcompanhante(viagem.rg_acompanhante);
        setEndAcompanhante(viagem.end_acompanhante);
        setPontoAcompanhante(viagem.ponto_acompanhante);
      }
    }
  }, [location.state]);

  const handleDataSelecionada = (date) => {
    setData_Select(date); 
  };

  const handleHoraSelecionada = (time) => {
    setHora_Select(time);
  };

  const handleCadastrar = async () => {
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

      let url = `viagem/${location.state.viagem.id}`;
      const response = await api.put(url, formData);

      if (response.status === 204) {
        alert('Viagem Alterada com sucesso!');
        navigate('/consulta-viagem');
      } else {
        console.error('Erro ao alterar viagem', response);
      }
    } catch (error) {
      alert('Erro ao alterar viagem');
      console.error('Erro ao alterar viagem', error);
    }
  };

  const handleAcompanhanteChange = (e) => {
    setAcompanhanteNecessario(e.target.checked);
  };

  return (
    <>
      <Header />
      <div className='contain-master'>
        <form>
          <h2>Alteração de Viagem</h2>
          <div className='horario'>
            <label>Data</label>
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
            <label>Hora</label>
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
          <label> Nome do Paciente: </label>
          <input type='text' value={nome_paciente} onChange={(e) => setNomePaciente(e.target.value)} />
          <label> RG do Paciente: </label>
          <input type='text' value={rg_paciente} onChange={(e) => setRgPaciente(e.target.value)} />
          <label> Telefone do Paciente: </label>
          <input type='text' value={tel_paciente} onChange={(e) => setTelPaciente(e.target.value)} />
          <label> Destino: </label>
          <input type='text' value={destino} onChange={(e) => setDestino(e.target.value)} />
          <label> Endereço do Destino: </label>
          <input type='text' value={end_destino} onChange={(e) => setEnderecoDestino(e.target.value)} />
          <label> Ponto do paciente: </label>
          <input type='text' value={ponto_paciente} onChange={(e) => setPontoPaciente(e.target.value)} />
          <label> Observações: </label>
          <input value={obs} onChange={(e) => setObservacoes(e.target.value)} type="textarea" />
          <div>
            <label>Necessita de Acompanhante</label>
            <input type="checkbox" checked={ac} onChange={handleAcompanhanteChange} />
          </div>
          {ac && (
            <>
              <label> Nome do Acomapanhante: </label>
              <input type='text' value={nome_acompanhante} onChange={(e) => setNomeAcompanhante(e.target.value)} />
              <label> RG do Acomapanhante: </label>
              <input type='text' value={rg_acompanhante} onChange={(e) => setRgAcompanhante(e.target.value)} />
              <label> Endereço do Acomapanhante: </label>
              <input type='text' value={end_acompanhante} onChange={(e) => setEndAcompanhante(e.target.value)} />
              <label> Ponto do Acomapanhante: </label>
              <input type='text'value={ponto_acompanhante} onChange={(e) => setPontoAcompanhante(e.target.value)} />
            </>
          )}
          <button type="button" onClick={handleCadastrar}>Alterar Viagem</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export { AlteracaoViagem };
