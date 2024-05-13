import React, { useState } from 'react';
import './styles.css'
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx';


const CadastroMotorista = () => {
  const [nameMotorista, setNameMotorista] = useState('');
  const [cnhMotorista, setCnhMotorista] = useState('');
  const [matriculaMotorista, setMatriculaMotorista] = useState('');
  const [telMotorista, setTelMotorista] = useState('');


  const navigate = useNavigate();

  const handleCadastrar = async (formData) => {
    try {
        const response = await api.post('https://api-best-browser-games.vercel.app/users', {
            nameMotorista: formData.nameMotorista,
            cnhMotorista: formData.cnhMotorista,
            matriculaMotorista: formData.matriculaMotorista,
            telMotorista: formData.telMotorista,
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
        <LabelInput label="Nome" value={nameMotorista} onChange={setNameMotorista} />
        <LabelInput label="CNH" value={cnhMotorista} onChange={setCnhMotorista} />
        <LabelInput label="Matrícula" value={matriculaMotorista} onChange={setMatriculaMotorista} />
        <LabelInput label="Telefone" value={telMotorista} onChange={setTelMotorista} />
        <button onClick={handleCadastrar}>Cadastrar Motorista </button>
    </form>
    </div>
    <Footer />
    </div>
  );
}
  

  export { CadastroMotorista }
