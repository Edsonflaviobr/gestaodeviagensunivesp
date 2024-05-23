import React from 'react';
import './styles.css';
import iconMotorista from '../../Assets/Imagens/motorista.png';
import iconViagem from '../../Assets/Imagens/viagem.png';
import iconUsuario from '../../Assets/Imagens/gerir-usuario.png';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx'


const Menu = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isAdmin = userData && userData[0].roles === 2;
    
    return (
        <div>
            <Header />
            <div className="container">
                <div className="menu-item">
                    <a href="/cadastro-viagem">
                        <img src={iconViagem} alt="viagem" width="150" height="150" />
                        <br />
                        <strong className="menu-link">Cadastrar Viagem</strong>
                    </a>
                </div>
                <div className="menu-item">
                    <a href="/cadastro-motorista">
                        <img src={iconMotorista} alt="motorista" width="150" height="150" />
                        <br />
                        <strong className="menu-link">Cadastrar Motorista</strong>
                    </a>
                </div>
                <div></div>
                <div class="menu-item">
                    {isAdmin ? (
                        <a href="/consulta-administrador">
                            <img src={iconUsuario} alt="usuario" width="150" height="150" />
                            <br />
                            <strong className="menu-link">Gerir Usuários</strong>
                        </a>
                    ) : (
                        <div className="disabled-link">
                            <img src={iconUsuario} alt="usuario" width="150" height="150" />
                            <br/>
                            <strong>Gerir Usuários</strong>
                            <br/>
                            <span className="disabled-text">Apenas administradores podem acessar</span>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
    
}

export { Menu }
