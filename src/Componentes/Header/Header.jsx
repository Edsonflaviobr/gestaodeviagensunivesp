import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import usuerOn from "../../Assets/Imagens/usuerOn.png";
import logo from "../../Assets/Imagens/logo-best.png";

const Header = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    const nome = sessionStorage.getItem("nome");
    const email = sessionStorage.getItem("email");
    const roles = sessionStorage.getItem("roles");
    const isLoggedIn = nome !== null;
    
    if (isLoggedIn) {
      const userRoles = roles ? roles : [];
      setUserInfo({ id, nome, email, roles: userRoles });
      setIsAdmin(userRoles && userRoles.includes("1"));
    } else {
      setUserInfo(null);
      setIsAdmin(false);
    }
  }, [isAdmin]);



  const handleLogout = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("roles");
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
              {userInfo && <Link to="/consulta-administrador">Adm</Link>}  

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

