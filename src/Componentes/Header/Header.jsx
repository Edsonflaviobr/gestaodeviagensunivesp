import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import usuerOn from "../../Assets/Imagens/usuerOn.png";
import logo from "../../Assets/Imagens/logo-best.png";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const userDataArray = JSON.parse(userData);
      const { id, nome, email, roles } = userDataArray[0];
      setUserInfo({ id, nome, email, roles });
      setIsAdmin(roles === 2);//alterado 
    } else {
      setUserInfo(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserInfo(null);
    setIsAdmin(false);
  };

  return (
    <>
      <header>
        <div className="header__content">
          <nav>
            <figure>
              <Link to="/">
                <img
                  src={logo}
                  alt="Saúde Tour"
                  title="Saúde Tour"
                />
              </Link>
            </figure>

            <div className="nav__button">
              {userInfo && <Link to="/cadastro-viagem">Cadastro de Viagens</Link>}
              {userInfo && <Link to="/cadastro-motorista">Cadastro de Motorista</Link>}
              {userInfo && <Link to="/consulta-viagem">Consulta</Link>}
              {isAdmin && <Link to="/consulta-administrador">Adm</Link>}  

              {userInfo ? (
                <div className="user-info">
                  <figure>
                    <Link to="/menu">
                      <img
                        className="image-name"
                        src={usuerOn}
                        alt="Online"
                        title="Online"
                      />
                    </Link>
                  </figure>
                  <span className="user-name">{userInfo.nome}</span>
                  <Link to="/login" onClick={handleLogout}>
                    Sair
                  </Link>
                </div>
                
              ) : (
                <Link to="/login">Entrar</Link>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export { Header };

