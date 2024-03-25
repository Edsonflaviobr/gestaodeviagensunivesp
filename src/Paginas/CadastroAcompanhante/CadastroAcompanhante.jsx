import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useFetch } from '../../hooks/useFetch.jsx';
import { Header } from '../../Componentes/Header/Header.jsx';

const CadastroAcompanhante = () => {
  const [nomeAcompanhante, setNomeAcompanhante] = useState('');
  const [rgAcompanhante, setRgAcompanhante] = useState('');
  const [cartaoSusAcompanhante, setCartaoSusAcompanhante] = useState('');
  const [dataNascimento, setDataNascimento] = useState(null);
  const navigate = useNavigate();

  const { loading, data } = useFetch('https://api-best-browser-games.vercel.app/users');

  const handleDataNascimento = (date) => {
    setDataNascimento(date);
  };

  const handleCadastrarAcompanhante = async () => {
    try {
      const formattedDate = format(dataNascimento, 'ddMMyyyy');

      const response = await api.post('https://api-best-browser-games.vercel.app/users', {
        nameAcompanhante: nomeAcompanhante,
        rgAcompanhante: rgAcompanhante,
        cartaoSusAcompanhante: cartaoSusAcompanhante,
        dataNascimento: formattedDate,
      });

      if (response.status === 201) {
        navigate('/');
      } else {
        alert('Erro ao cadastrar acompanhante');
      }
    } catch (error) {
      console.error('Erro ao cadastrar acompanhante', error);
    }
  }; 

  return (
    <>
    <Header />
    <div className="cadastro-container">
      <LabelInput label="Nome do Acompanhante" value={nomeAcompanhante} onChange={e => setNomeAcompanhante(e.target.value)} />
      <LabelInput label="RG do Acompanhante" value={rgAcompanhante} onChange={e => setRgAcompanhante(e.target.value)} />
      <LabelInput label="Cartão SUS do Acompanhante" value={cartaoSusAcompanhante} onChange={e => setCartaoSusAcompanhante(e.target.value)} />

      <label>Data de Nascimento:</label>
      <DatePicker
        selected={dataNascimento}
        onChange={handleDataNascimento}
        dateFormat="dd/MM/yyyy"
      />

      <Button onClick={handleCadastrarAcompanhante}>Cadastrar Acompanhante</Button>
    </div>
    </>
  );
};

export { CadastroAcompanhante }
