import React, { useState } from "react";
import { useFetch } from "../../hooks/useFetch.jsx";
import { Input } from "../../Componentes/Input/Input.jsx";
import { Header } from "../../Componentes/Header/Header.jsx";

const CadastroMotorista = () => {
  const { loading, data } = useFetch();

  const handleCadastro = async (formData) => {
    try {
      const response = await fetch("URL_DA_API", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log("Dados enviados com sucesso:", responseData);
      } else {
        console.error("Erro ao enviar dados para a API:", responseData);
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    tel: "",
    adress: "",
    CNH: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCadastro(formData);
  };

  return (
    <>
    <Header />
    <div className="cadastro-container">
        <div>
          <h1>FICHA DE CADASTRO</h1>
          <form id="request" onSubmit={handleSubmit}>
            <label>Nome Completo: </label>
            <Input
              placeholder="Digite seu nome completo"
              id="name"
              value={formData.name}
              onChange={handleChange}
              pattern="[A-Za-z ]+"
            />
            <br />
            <label>Telefone: </label>
            <Input
              placeholder="Digite o telefone"
              type="tel"
              id="tel"
              value={formData.tel}
              onChange={handleChange}
            />
            <br />
            <label>Endereço: </label>
            <Input
              placeholder="Digite o endereço completo"
              type="adress"
              id="adress"
              pattern="[0-9]*"
              value={formData.adress}
              onChange={handleChange}
            />
            <br />
            <label>CNH: </label>
            <Input
              placeholder="Digite o número da CNH"
              type="text"
              id="CNH"
              value={formData.CNH}
              onChange={handleChange}
            />
            <br />
            <button type="submit"> Cadastrar </button>
          </form>
        </div>
    </div>
    </>
  );
};

export { CadastroMotorista }
