import React, { useState } from 'react';
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import './styles.css'
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CadastroAcompanhante = () => {
  const [nome_acompanhante, setNomeAcompanhante] = useState('');
  const [rg_acompanhante, setRgAcompanhante] = useState('');
  const [adress_acompanhante, setAdressAcompanhante] = useState('');
  const [ponto_acompanhante, setPontoAcompanhante] = useState('');

  const navigate = useNavigate();

  const handleCadastrarAcompanhante = async () => {
    try {

      const response = await api.post('acompanhante', {
        nome_acompanhante: nome_acompanhante,
        rg_acompanhante: rg_acompanhante,
        adress_acompanhante: adress_acompanhante,
        ponto_acompanhante: ponto_acompanhante,
      });

      if (response.status === 201) {
        navigate('/menu');
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
      <LabelInput label="Nome" value={nome_acompanhante} onChange={e => setNomeAcompanhante(e.target.value)} />
      <LabelInput label="Documento" value={rg_acompanhante} onChange={e => setRgAcompanhante(e.target.value)} />
      <LabelInput label="Endereço" value={adress_acompanhante} onChange={e => setAdressAcompanhante(e.target.value)} />
      <LabelInput label="Ponto" value={ponto_acompanhante} onChange={e => setPontoAcompanhante(e.target.value)} />
      <button onClick={handleCadastrarAcompanhante}>Cadastrar Acompanhante</button>
    </form>  
    </div>
    <Footer />
    </div>
  );
};

export { CadastroAcompanhante }

