import React from 'react';
import './styles.css';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';
import { Input } from '../../Componentes/Input/Input.jsx';
import { Button } from '../../Componentes/Button/Button.jsx';
import { MdEmail } from 'react-icons/md'
import { useForm } from "react-hook-form";
import { api } from '../../Services/api';
import { useNavigate } from 'react-router-dom';


const RecuperarSenha = () => {

    const navigate = useNavigate()

    const { control, handleSubmit, formState: { errors  } } = useForm({
        reValidateMode: 'onChange',
        mode: 'onChange',
    }); 
    
    const onSubmit = async (formData) => {
        try{
            const {data} = await api.get(`/users?email=${formData.email}&senha=${formData.senha}`);
            
            if(data.length && data[0].id){
                navigate('/feed') 
                return
            }

            alert('Usuário ou senha inválido')
        }catch(e){
        }
    };    

    return (
        <>

            <Header />

            <body>
                <div className="body__contentRecuperarSenha">
                    <div className="body__contentRecuperarSenha--text">
                    <Title title={<span style={{ fontWeight: 'bold', fontSize: '35px' }}>Esqueceu a sua senha?</span>}></Title> 
                    </div>
                    <div className="body__contentRecuperarSenha--form">
                    <span style={{ fontWeight: 'bold', fontSize: '20px' }}><br/>Informe o seu e-mail para iniciar o processo de recuperação.</span><br/>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email"  control={control} />
                            {errors.email && <span>E-mail é obrigatório</span>}
                                                
                            <Button title="Continuar" variant="secondary" type="submit"/>
                        </form>
                                               
                    </div>                    
                </div>
            </body>

  
        </>
    )
}

export { RecuperarSenha } 