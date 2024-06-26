import './styles.css';
import {React, useEffect} from 'react';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdMap } from 'react-icons/md'
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const AlteracaoCadastro = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, setValue, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  const userData = localStorage.getItem("userData");
  const userDataArray = JSON.parse(userData);
  const { id, nome, email, roles } = userDataArray[0];
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`usuario/${id}`);
        const userData = response.data;

        setValue('nome', userData.nome);
        setValue('email', userData.email);
        setValue('senha', userData.senha);
        setValue('matricula', userData.matricula);
        setValue('roles', userData.roles);
      } catch (error) {
        console.error('Erro ao obter os detalhes do usuário', error);
      }
    };

    fetchUserData();
  }, [id, setValue,]);

  const onSubmit = async (formData) => {
    try {
      const response = await api.put(`usuario/${id}`, {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        confirma: formData.senha,
        matricula: formData.matricula,
        roles: formData.roles, 
      });

      if (response.status === 204) {
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
                        <Input type="text" placeholder="Digite seu nome completo" leftIcon={<MdAccountCircle />} id="nome" name="nome" control={control} rules={{ required: 'Nome é obrigatório' }} />
                        {errors.nome && <span>{errors.nome.message}</span>}

                        <Input type="email" placeholder="Digite seu e-mail" leftIcon={<MdEmail />} id="email" name="email" control={control} rules={{ required: 'E-mail é obrigatório' }} />
                        {errors.email && <span>{errors.email.message}</span>}

                        <Input type="password" placeholder="Digite uma senha" leftIcon={<MdLock />} id="senha" name="senha" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.senha && <span>{errors.senha.message}</span>}

                        <Input type="password" placeholder="Confirme sua senha" leftIcon={<MdLock />} id="confirma" name="confirma" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.confirma && <span>{errors.confirma.message}</span>}

                        <Input type="matricula" placeholder="Digite sua matrícula" leftIcon={<MdMap />} id="matricula" name="matricula" control={control} rules={{ required: 'Matrícula é obrigatória' }} />
                        {errors.matricula && <span>{errors.matricula.message}</span>}

                        <div className="form-group">
                          <div className="radio-group">
                            <Controller
                              name="roles"
                              control={control}
                              rules={{ required: 'Escolha uma opção' }}
                              render={({ field }) => (
                                <>
                                  <label>
                                    <input
                                      type="radio"
                                      value="1"
                                      checked={field.value === "1"}
                                      onChange={field.onChange}
                                    />
                                    1
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      value="2"
                                      checked={field.value === "2"}
                                      onChange={field.onChange}
                                    />
                                    2
                                  </label>
                                </>
                              )}
                            />
                          </div>
                          {errors.roles && <span>{errors.roles.message}</span>}
                        </div>

                        <Button title="Cadastrar" variant="secondary" type="submit"/>
                    </form>
                                              
                </div>                 
            </div>

            <Footer />
  
        </>
  );
};

export { AlteracaoCadastro }
