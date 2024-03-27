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

const CriarConta = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors } } = useForm({
    reValidateMode: 'onChange',
    mode: 'onChange',
    });
    
    const onSubmit = async (formData) => {
        try {

            const formattedDate = format(new Date(formData.birthDate), 'ddMMyyyy');

            const response = await api.post('https://api-best-browser-games.vercel.app/users', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.password,
                birthDate: formattedDate,
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
                    <Title title={<span style={{ fontWeight: 'bold', fontSize: '35px' }}>Olá usúario realize seu cadastro no sistema para 
                    ter acesso ao gerenciamento de viagens</span>} />
                </div>
                <div className="body__contentcriarconta--form">
                    <Text text={<span style={{ fontWeight: 'bold', fontSize: '18px' }}>FICHA DE CADASTRO</span>} />                   
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input type="text" placeholder="Digite seu nome completo" leftIcon={<MdAccountCircle />} id="name" name="name" control={control} rules={{ required: 'Nome é obrigatório' }} />
                        {errors.name && <span>{errors.name.message}</span>}

                        <Input type="email" placeholder="Digite seu e-mail" leftIcon={<MdEmail />} id="email" name="email" control={control} rules={{ required: 'E-mail é obrigatório' }} />
                        {errors.email && <span>{errors.email.message}</span>}

                        <Input type="password" placeholder="Digite uma senha" leftIcon={<MdLock />} id="password" name="password" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.password && <span>{errors.password.message}</span>}

                        <Input type="password" placeholder="Confirme sua senha" leftIcon={<MdLock />} id="confirmPassword" name="confirmPassword" control={control} pattern="[0-9]*" rules={{ required: 'Senha é obrigatório' }} />
                        {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}

                        <Input type="date" placeholder="Digite sua data de nascimento" leftIcon={<MdOutlineCalendarMonth />} id="birthDate" name="birthDate" control={control} rules={{ required: 'Data é obrigatório' }} />
                        {errors.birthDate && <span>{errors.birthDate.message}</span>}

                        <Input type="matricula" placeholder="Digite sua matrícula" leftIcon={<MdMap />} id="matricula" name="matricula" control={control} rules={{ required: 'Matrícula é obrigatória' }} />
                        {errors.matricula && <span>{errors.matricula.message}</span>}

                        <br />

                        <Button title="Cadastrar" variant="secondary" type="submit"/>
                    </form>
                                              
                </div>                 
            </div>
        </div>
  
        </>
    )
}

export { CriarConta }
