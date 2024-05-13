import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';
import tapi from '../../Assets/Imagens/tapi.jpeg'
import { Header } from '../../Componentes/Header/Header.jsx';
import { Text } from '../../Componentes/Text/Text.jsx';


const Home = () => {

    return (
        <>

            <Header />

            <body>
                <div className="body__content">
                    <div className="body__content--text">
                        <figure>
                            <img src={tapi} alt="Bandeira Tapiratiba" title="Bandeira Tapiratiba" />
                        </figure>
                        <br></br>
                        <Text text="Bem-vindo ao Gerenciador de Viagens Saúde Tour." />
                        <Text text="Essa aplicação web foi desenvolvida para a gestão de logística 
                                    da Secretária de Saúde do Município de Tapiratiba." />
                        <Link to="/login">
                            <button className="button--assine">Começar agora</button>
                        </Link>  
                    </div>              
                </div>
            </body>

        </>
    )
}

export { Home }
