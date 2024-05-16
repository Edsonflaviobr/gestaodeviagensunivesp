import React, { useState } from 'react';
import './styles.css';
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CadastroMotorista = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cnh: '',
    matricula: '',
    telefone: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (fieldName, value) => {
    setFormData({ ...formData, [fieldName]: value });
  };

  const handleCadastrar = async () => {
    try {
      const response = await api.post('motorista/', formData);
      if (response.status === 201) {
        alert('Motorista cadastrado com sucesso!');
        navigate('/menu');
      } else {
        console.error('Erro ao cadastrar motorista', response);
      }
    } catch (error) {
      alert('Erro ao cadastrar motorista');
      console.error('Erro ao cadastrar motorista', error);
    }
  };

  return (
    <div>
      <Header />
      <div className='contain-moto'>
        <form>
          <h2>Cadastro de Motorista</h2>
          <LabelInput label="Nome" value={formData.nome} onChange={(value) => handleInputChange('nome', value)} />
          <LabelInput label="CNH" value={formData.cnh} onChange={(value) => handleInputChange('cnh', value)} />
          <LabelInput label="Matrícula" value={formData.matricula} onChange={(value) => handleInputChange('matricula', value)} />
          <LabelInput label="Telefone" value={formData.telefone} onChange={(value) => handleInputChange('telefone', value)} />
          <button type="button" onClick={handleCadastrar}>Cadastrar Motorista</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export { CadastroMotorista };