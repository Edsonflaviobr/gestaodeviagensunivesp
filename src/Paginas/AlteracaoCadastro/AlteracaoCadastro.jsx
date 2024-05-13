import './styles.css';
import {React, useEffect} from 'react';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { useForm } from 'react-hook-form';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdOutlineCalendarMonth, MdMap } from 'react-icons/md'
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const AlteracaoCadastro = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, formState: { errors, isValid }, watch } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const userId = sessionStorage.getItem('user_id');
  const accessToken = sessionStorage.getItem('accessToken');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`https://api-best-browser-games.vercel.app/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        const userData = response.data;

        setValue('name', userData.name);
        setValue('email', userData.email);
        setValue('birthDate', userData.birthDate);
        setValue('country', userData.country);
        setValue('estado', userData.estado);
      } catch (error) {
        console.error('Erro ao obter os detalhes do usuário', error);
      }
    };

    fetchUserData();
  }, [userId, setValue, accessToken]);

  const onSubmit = async (formData) => {
    try {
      const formattedDate = format(new Date(formData.birthDate), 'ddMMyyyy');

      const response = await api.put(`https://api-best-browser-games.vercel.app/users/${userId}`, {
        name: formData.newName,
        email: formData.newEmail,
        password: formData.password,
        confirmPassword: formData.password,
        birthDate: formattedDate,
        matricula: formData.newMatricula, 
        headers: {
          Authorization: `Bearer ${accessToken}`, 
        },
      });

      if (response.status === 200) {
        alert('Cadastro atualizado com sucesso!');
        navigate('/');
      } else {
        alert('Erro ao atualizar o cadastro');
      }
    } catch (error) {
      console.error('Erro ao atualizar o cadastro', error);
    }
  };

  return (
    <>
            
            <Header />

            <div className="body__contentcriarconta">
                <div className="body__contentcriarconta--text">
                    <Title title={<span>Usúario realize seu cadastro no sistema novamente alterando os itens necessários</span>} />
                </div>
                <div className="body__contentcriarconta--form">
                    <Text text= {<span> ALTERAÇÃO DE CADASTRO </span>} />                   
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" placeholder="Digite seu nome completo" leftIcon={<MdAccountCircle />} id="name" name="name" control={control} rules={{ required: 'Nome é obrigatório' }} />
                        {errors.nome && <span>{errors.nome.message}</span>}

                        <Input type="email" placeholder="Digite seu e-mail" leftIcon={<MdEmail />} id="email" name="email" control={control} rules={{ required: 'E-mail é obrigatório' }} />
                        {errors.email && <span>{errors.email.message}</span>}

                        <Input type="password" placeholder="Digite uma senha" leftIcon={<MdLock />} id="password" name="password" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.senha && <span>{errors.senha.message}</span>}

                        <Input type="password" placeholder="Confirme sua senha" leftIcon={<MdLock />} id="confirmPassword" name="confirmPassword" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.confirma && <span>{errors.confirma.message}</span>}

                        <Input type="text" placeholder="Digite sua data de nascimento" leftIcon={<MdOutlineCalendarMonth />} id="birthDate" name="birthDate" control={control} rules={{ required: 'Data é obrigatório' }} />
                        {errors.data && <span>{errors.data.message}</span>}

                        <Input type="matricula" placeholder="Digite sua matrícula" leftIcon={<MdMap />} id="matricula" name="matricula" control={control} rules={{ required: 'Matrícula é obrigatória' }} />
                        {errors.matricula && <span>{errors.matricula.message}</span>}

                        <Button title="Cadastrar" variant="secondary" type="submit"/>
                    </form>
                                              
                </div>                 
            </div>

            <Footer />
  
        </>
  );
};

export { AlteracaoCadastro }
