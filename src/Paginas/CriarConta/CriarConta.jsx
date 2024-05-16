import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdMap } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CriarConta = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    });
    
    const onSubmit = async (formData) => {
        try {
            const response = await api.post('usuario', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                confirma: formData.senha,
                matricula: formData.matricula,
                roles: formData.roles,
            });

            if (response.status === 201) {
                alert ('Conta criada com sucesso!')
                navigate('/login');
            } else {
                alert('Erro ao criar o usuário');
            }
        } catch (error) {
            console.error('Erro ao criar o usuário', error);
        }
    }; 

    return (
        <>

        <div>
            
            <Header />

            <div className="body__contentcriarconta">
                <div className="body__contentcriarconta--text">
                    <Title title={<span>Olá usúario realize seu cadastro no sistema para 
                    ter acesso ao gerenciamento de viagens</span>} />
                </div>
                <div className="body__contentcriarconta--form">
                    <Text text={<span> FICHA DE CADASTRO </span>} />                   
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

                        <Input type="number" placeholder="Digite apenas 1 por padrão" leftIcon={<MdMap />} id="roles" name="roles" control={control} rules={{ required: 'Digite apenas 1' }} />
                        {errors.roles && <span>{errors.roles.message}</span>}

                        <Button title="Cadastrar" variant="secondary" type="submit"/>
                    </form>
                                              
                </div>                 
            </div>
        </div>
  
            <Footer />                
        </>
    )
}

export { CriarConta }
