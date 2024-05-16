import React, { useState, useEffect } from 'react';
import './styles.css'
import { api } from '../../Services/api';
import { Header } from '../../Componentes/Header/Header';
import { Text } from '../../Componentes/Text/Text'
import LabelInput from '../../Componentes/LabelInput/LabelInput';
import { Footer } from '../../Componentes/Footer/Footer';

const ConsultaAdministrador = () => {
  const [consultaNomeUsuario, setConsultaNomeUsuario] = useState('');
  const [consultaMatriculaUsuario, setConsultaMatriculaUsuario] = useState('');
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get(`usuario?nome=${consultaNomeUsuario}&matricula=${consultaMatriculaUsuario}`);
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, [consultaNomeUsuario, consultaMatriculaUsuario]);

 
  const handleConsultaNomeUsuarioChange = (e) => {
    setConsultaNomeUsuario(e.target.value);
  };

  const handleConsultaMatriculaUsuarioChange = (e) => {
    setConsultaMatriculaUsuario(e.target.value);
  };

  const handleUsuarioSelecionado = (usuario) => {
    setUsuarioSelecionado(usuario);
  };

  return (
    <div>
      <Header />
      <div className='adm'>
      <form>
      <h2>Consultar Usuários</h2>
          <div>
            <LabelInput label="Nome" type="text" id="consultaNomeUsuario" value={consultaNomeUsuario} onChange={handleConsultaNomeUsuarioChange} />
            <LabelInput label="Matrícula" type="number" id="consultaMatriculaUsuario" value={consultaMatriculaUsuario} onChange={handleConsultaMatriculaUsuarioChange} />
            <Text text="Busque por nome ou matrícula" />
          </div>
          <ul>
            {usuarios.map((usuario) => (
              <li key={usuario.id} onClick={() => handleUsuarioSelecionado(usuario)}>
                <div>{usuario.nome}</div>
                <div>{usuario.matricula}</div>
              </li>
            ))}
          </ul>
        <button>Consultar Usuário</button>
      </form>
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaAdministrador };


