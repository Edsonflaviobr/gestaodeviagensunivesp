import React from 'react';
import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdEmail, MdLock } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const Login = ({ email, password }) => {
    const navigate = useNavigate();

    const { control, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    });

    const onSubmit = async (formData) => {
        try {
            const response = await api.post('usuario/login', {
                email: formData.email,
                senha: formData.senha,
            });

            if (response.status === 201) {
                const userData = response.data; 
                sessionStorage.setItem('nome', userData.nome);
                sessionStorage.setItem('email', userData.email);
                sessionStorage.setItem('roles', JSON.stringify(userData.roles));
                navigate('/menu');
            } else {
                alert('Usuário ou senha inválido');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            alert('Usuário ou senha inválido');
        }
    };


    return (
        <>
            <Header />

            <body>
                <div className="log">
                    <div className="log--text">
                        <Title title="Login..." color="#0f014d" />
                        <Text text="Caso ainda não possua cadastro, favor clique em 'Criar Conta'." />
                    </div>
                    <div className="log--log">
                    <Text text={<span>Acesse o Gerenciador de Viagens Saúde Tour.</span>} />


                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                type="email"
                                placeholder="Digite seu e-mail"
                                leftIcon={<MdEmail />}
                                id="email"
                                name="email"
                                control={control}
                                rules={{
                                    required: 'E-mail é obrigatório',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Digite um e-mail válido',
                                    },
                                }}
                            />
                            {errors.email && <span>{errors.email.message}</span>}

                            <Input
                                type="password"
                                placeholder="Digite uma senha"
                                leftIcon={<MdLock />}
                                id="senha"
                                name="senha"
                                control={control}
                                rules={{
                                    required: 'Senha é obrigatória'
                                }}
                            />
                            {errors.password && <span>{errors.password.message}</span>}

                            <br />

                            <Button title="Entrar" variant="secondary" type="submit" />
                        </form>

                        <div>
                            <p><Link to="/recuperar-senha"> <span className="esqueci-text">Esqueci minha senha</span> </Link></p>
                            <br/>
                            <p><Link to="/criar-conta"> <span className="criar-text">Criar Conta</span></Link></p>
                        </div>
                    </div>
                </div>
            </body>
            <Footer />
        </>
    );
}

export { Login }
