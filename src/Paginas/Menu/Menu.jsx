import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import iconMotorista from '../../Assets/Imagens/motorista.png';
import iconViagem from '../../Assets/Imagens/viagem.png';
import iconUsuario from '../../Assets/Imagens/gerir-usuario.png';
import { Header } from '../../Componentes/Header/Header.jsx';
import { Title } from '../../Componentes/Title/Title.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';

const Menu = ({ isAdmin }) => { // Recebe uma propriedade isAdmin para indicar se o usuário é ADM ou não

    return (
        <>
            <Header />
            <body>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>
                                    <Link to="/cadastro-viagem">
                                        <img src= {iconViagem} width="150" height="150" />
                                        <br />
                                        <strong className="menu-link">Cadastrar Viagem</strong>
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/cadastro-motorista" >
                                        <img src={iconMotorista} alt="cadastrarmotorista" width="150" height="150" />
                                        <br/>
                                        <strong className="menu-link">Cadastrar Motorista</strong>
                                    </Link>
                                </td>
                                <td>
                                    {isAdmin ? (
                                        <Link to="/gerir-usuarios">
                                            <img src= {iconUsuario} alt="gerirusuario" width="150" height="150" />
                                            <br />
                                            <strong className="menu-link">Gerir Usuários</strong>
                                        </Link>
                                    ) : (
                                        <div className="disabled-link">
                                            <img src= {iconUsuario} alt="gerirusuario" width="150" height="150" />
                                            <br />
                                            <strong>Gerir Usuários</strong>
                                            <span className="disabled-text">Apenas administradores podem acessar</span>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </body>
        </>
    )
}

export { Menu }
