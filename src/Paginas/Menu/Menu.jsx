import React from 'react';
import './styles.css';
import iconMotorista from '../../Assets/Imagens/motorista.png';
import iconViagem from '../../Assets/Imagens/viagem.png';
import iconUsuario from '../../Assets/Imagens/gerir-usuario.png';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Footer } from '../../Componentes/Footer/Footer.jsx'


const Menu = () => {
    const isAdmin = sessionStorage.getItem("roles") === "1";
    return (
        <div>
            <Header />
            <div class="container">
                <div class="menu-item">
                    <a href="/cadastro-viagem">
                        <img src={iconViagem} alt="viagem" width="150" height="150" />
                        <br />
                        <strong class="menu-link">Cadastrar Viagem</strong>
                    </a>
                </div>
                <div class="menu-item">
                    <a href="/cadastro-motorista">
                        <img src={iconMotorista} alt="motorista" width="150" height="150" />
                        <br />
                        <strong class="menu-link">Cadastrar Motorista</strong>
                    </a>
                </div>
                <div></div>
                <div class="menu-item">
                    {isAdmin ? (
                        <a href="/consulta-admistrador">
                            <img src={iconUsuario} alt="usuario" width="150" height="150" />
                            <br />
                            <strong class="menu-link">Gerir Usuários</strong>
                        </a>
                    ) : (
                        <div class="disabled-link">
                            <img src={iconUsuario} alt="usuario" width="150" height="150" />
                            <br/>
                            <strong>Gerir Usuários</strong>
                            <br/>
                            <span class="disabled-text">Apenas administradores podem acessar</span>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
    
}

export { Menu }