import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdAccountCircle, MdEmail, MdLock, MdOutlineCalendarMonth, MdMap } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Footer } from '../../Componentes/Footer/Footer.jsx';

const CriarConta = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    });
    
    const onSubmit = async (formData) => {
        try {

            const formattedDate = format(new Date(formData.birthDate), 'ddMMyyyy');

            const response = await api.post('http://localhost:8080/POST/usuario/', {
                nome: formData.nome,
                email: formData.email,
                senha: formData.senha,
                confirma: formData.senha,
                data: formattedDate,
                matricula: formData.matricula,
            });

            if (response.status === 201) {
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
        </div>
  
            <Footer />                
        </>
    )
}

export { CriarConta }
