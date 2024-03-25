import './styles.css';
import {React, useEffect} from 'react';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { useForm } from 'react-hook-form';
import { Input } from '../../Componentes/Input/Input.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdOutlineCalendarMonth, MdMap } from 'react-icons/md'
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

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
        country: formData.newCountry, 
        estado: formData.newEstado, 
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
    <div className="page-container">
      <Header />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="body__content">
          <div className="body__content--text">
            <Title title="Altere seus dados cadastrados!" color="#f7b84b" />
          </div>
          <div className="body__content--form">
            <Text text="Ficha de Cadastro - Alteração" />

            <Input
              type="text"
              placeholder="Digite novo Nome"
              id="newName"
              name="newName"
              leftIcon={<MdAccountCircle />}
              control={control}
            />
            {errors.newName && <span>{errors.newName.message}</span>}

            <Input
              type="text"
              placeholder="Digite novo E-mail"
              id="newEmail"
              name="newEmail"
              leftIcon={<MdEmail />}
              control={control}
            />
            {errors.newEmail && <span>{errors.newEmail.message} </span>}

            <Input
              type="password"
              placeholder="Digite sua senha"
              id="password"
              name="password"
              leftIcon={<MdLock />}
              control={control}
              rules={{ required: 'Senha é obrigatória' }} 
            />
            {errors.password && <span>{errors.password.message}</span>}

            <Input
              type="password"
              placeholder="Confirme sua senha"
              id="confirmPassword"
              name="confirmPassword"
              leftIcon={<MdLock />}
              control={control}
              rules={{ required: 'Confirmação de senha é obrigatória', validate: value => value === watch('password') || 'As senhas não coincidem' }} // Adicione regras de validação conforme necessário
            />
            {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

            <Input
              type="date"
              placeholder="Digite sua data de nascimento"
              id="newBirthDate"
              name="newBirthDate" 
              leftIcon={<MdOutlineCalendarMonth />}
              control={control}
            />
            {errors.newBirthDate && <span>{errors.newBirthDate.message}</span>}

            <Input
              type="text"
              placeholder="Digite novo País"
              id="newCountry"
              name="newCountry" 
              leftIcon={<MdMap />}
              control={control}
            />
            {errors.newCountry && <span>{errors.newCountry.message}</span>}

            <Input
              type="text"
              placeholder="Digite novo Estado"
              id="newEstado"
              name="newEstado" 
              leftIcon={<MdMap />}
              control={control}
            />
            {errors.newEstado && <span>{errors.newEstado.message}</span>}

            <button type="submit">Enviar Alterações</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export { AlteracaoCadastro }
