import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css'; 
import LabelInput from '../../Componentes/LabelInput/LabelInput.jsx';
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom'; 
import { Header } from '../../Componentes/Header/Header.jsx';


const CadastroMotorista = () => {
  const [nameMotorista, setNameMotorista] = useState('');
  const [cnhMotorista, setCnhMotorista] = useState('');
  const [matriculaMotorista, setMatriculaMotorista] = useState('');
  const [telMotorista, setTelMotorista] = useState('');
  const [adressMotorista, setAdressMotorista] = useState('');
  const [observacoes, setObservacoes] = useState('');


  const navigate = useNavigate();

  const handleCadastrar = async (formData) => {
    try {
        const response = await api.post('https://api-best-browser-games.vercel.app/users', {
            nameMotorista: formData.nameMotorista,
            cnhMotorista: formData.cnhMotorista,
            matriculaMotorista: formData.matriculaMotorista,
            telMotorista: formData.telMotorista,
            adressMotorista: formData.adressMotorista,
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
    <>
    <Header />
        <form>
        <div className="page-container">
        <LabelInput label="Nome do Motorista" value={nameMotorista} onChange={setNameMotorista} />
        <LabelInput label="CNH do Motorista" value={cnhMotorista} onChange={setCnhMotorista} />
        <LabelInput label="Matrícula do Motorista" value={matriculaMotorista} onChange={setMatriculaMotorista} />
        <LabelInput label="Telefone do Motorista" value={telMotorista} onChange={setTelMotorista} />
        <LabelInput label="Endereço do Destino" value={adressMotorista} onChange={setAdressMotorista} />
        <LabelInput label="Observações" value={observacoes} onChange={setObservacoes} type="textarea" />
        <button onClick={handleCadastrar}>Cadastrar Motorista </button>
      </div>
      </form>
      </>
  );
}
  

  export { CadastroMotorista }
