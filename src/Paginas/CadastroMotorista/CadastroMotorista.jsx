import React, { useState } from 'react';
import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';


const CadastroMotorista = () => {
  const [nome, setNameMotorista] = useState('');
  const [cnh, setCnhMotorista] = useState('');
  const [matricula, setMatriculaMotorista] = useState('');
  const [telefone, setTelMotorista] = useState('');


  const navigate = useNavigate();

  const handleCadastrar = async (formData) => {
    try {
        const response = await api.post('motorista', {
            nome: formData.nome,
            cnh: formData.cnh,
            matricula: formData.matricula,
            telefone: formData.tel,
        });
        if (response.status === 201) {
          alert ('Motorista Cadastrado com sucesso!')
          navigate ('/')
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
        <LabelInput label="Nome" value={nome} onChange={setNameMotorista} />
        <LabelInput label="CNH" value={cnh} onChange={setCnhMotorista} />
        <LabelInput label="Matrícula" value={matricula} onChange={setMatriculaMotorista} />
        <LabelInput label="Telefone" value={telefone} onChange={setTelMotorista} />
        <button onClick={handleCadastrar}>Cadastrar Motorista </button>
    </form>
    </div>
    <Footer />
    </div>
  );
}
  

  export { CadastroMotorista }
