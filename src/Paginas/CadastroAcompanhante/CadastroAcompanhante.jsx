import React, { useState } from 'react';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import './styles.css'
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CadastroAcompanhante = () => {
  const [nomeAcompanhante, setNomeAcompanhante] = useState('');
  const [rgAcompanhante, setRgAcompanhante] = useState('');
  const [adressAcompanhante, setAdressAcompanhante] = useState('');
  const [pontoAcompanhante, sePontoAcompanhante] = useState('');

  const navigate = useNavigate();

  const handleCadastrarAcompanhante = async () => {
    try {

      const response = await api.post('https://api-best-browser-games.vercel.app/users', {
        nameAcompanhante: nomeAcompanhante,
        rgAcompanhante: rgAcompanhante,
        adressAcompanhante: adressAcompanhante,
        pontoAcompanhante: pontoAcompanhante,
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
    <div>
    <Header />
    <div className='acomp'>
    <form>
    <h2> Cadastro de Acompanhante </h2>
      <LabelInput label="Nome" value={nomeAcompanhante} onChange={e => setNomeAcompanhante(e.target.value)} />
      <LabelInput label="Documento" value={rgAcompanhante} onChange={e => setRgAcompanhante(e.target.value)} />
      <LabelInput label="Endereço" value={adressAcompanhante} onChange={e => setAdressAcompanhante(e.target.value)} />
      <LabelInput label="Ponto" value={pontoAcompanhante} onChange={e => sePontoAcompanhante(e.target.value)} />
      <button onClick={handleCadastrarAcompanhante}>Cadastrar Acompanhante</button>
    </form>  
    </div>
    <Footer />
    </div>
  );
};

export { CadastroAcompanhante }

