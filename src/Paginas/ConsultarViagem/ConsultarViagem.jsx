import { format } from "date-fns"; // Importe a função format
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../Componentes/Footer/Footer.jsx";
import { Header } from "../../Componentes/Header/Header";
import { api } from "../../Services/api";
import "./styles.css";
import jsPDF from 'jspdf';

const ConsultaViagem = () => {
  const [consulta, setConsulta] = useState("");
  const [viagens, setViagens] = useState([]);
  const [viagensFiltradas, setViagensFiltradas] = useState([]);
  const [viagemSelecionada, setViagemSelecionada] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const response = await api.get("viagem/");
        setViagens(response.data);
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };

    fetchViagens();
  }, []);

  const handleConsultaChange = (e) => {
    setConsulta(e.target.value);
  };

  const handlePesquisar = () => {
    const viagensFiltradas = viagens.filter((viagem) =>
      viagem.nome_paciente?.toLowerCase().includes(consulta.toLowerCase())
    );
    setViagensFiltradas(viagensFiltradas);
    if (viagensFiltradas.length === 0) {
      alert("Nenhuma viagem encontrada com o nome do paciente pesquisado.");
    }
  };

  const handleViagemSelecionada = (viagem) => {
    setViagemSelecionada(viagem);
  };

  const handleEditarViagem = () => {
    navigate("/alteracao-viagem", { state: { viagem: viagemSelecionada } });
  };

  const handleDeletarViagem = async () => {
    try {
      const response = await api.delete(`viagem/${viagemSelecionada.id}`);
      if (response.status === 204) {
        setViagens(
          viagens.filter((viagem) => viagem.id !== viagemSelecionada.id)
        );
        setViagemSelecionada(null);
        setViagensFiltradas(
          viagensFiltradas.filter(
            (viagem) => viagem.id !== viagemSelecionada.id
          )
        );
        alert("Viagem deletada com sucesso!");
      } else {
        alert("Erro ao deletar viagem");
      }
    } catch (error) {
      console.error("Erro ao deletar viagem:", error);
    }
  };

  // Função para formatar a data no formato brasileiro
  const formatarData = (data) => {
    return format(new Date(data), "dd/MM/yyyy");
  };

  const handleSalvarPDF = () => {
    if (!viagemSelecionada) return;

    const doc = new jsPDF();

    doc.text('Detalhes da Viagem', 10, 10);
    doc.text(`Data: ${viagemSelecionada.data_select}`, 10, 20);
    doc.text(`Hora: ${viagemSelecionada.hora_select}`, 10, 30);
    doc.text(`Nome do Paciente: ${viagemSelecionada.nome_paciente}`, 10, 40);
    doc.text(`RG do Paciente: ${viagemSelecionada.rg_paciente}`, 10, 50);
    doc.text(`Telefone do Paciente: ${viagemSelecionada.tel_paciente}`, 10, 60);
    doc.text(`Destino: ${viagemSelecionada.destino}`, 10, 70);
    doc.text(`Endereço do Destino: ${viagemSelecionada.end_destino}`, 10, 80);
    doc.text(`Ponto do Paciente: ${viagemSelecionada.ponto_paciente}`, 10, 90);
    doc.text(`Observações: ${viagemSelecionada.obs}`, 10, 100);


    doc.save('viagem.pdf');
  };

  return (
    <div>
      <Header />
      <div className="consul">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Consultar Viagens</h2>
          <label>Nome do Paciente </label>
          <input
            type="text"
            id="consultaNome"
            value={consulta}
            onChange={handleConsultaChange}
          />
          <button type="button" onClick={handlePesquisar}>
            Pesquisar
          </button>
        </form>
        {viagensFiltradas.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Nome do Paciente</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {viagensFiltradas.map((viagem) => (
                <tr key={viagem.id}>
                  <td>{viagem.nome_paciente}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleViagemSelecionada(viagem)}
                    >
                      Selecionar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {viagemSelecionada && (
          <div className="consul">
            <h3>Detalhes da Viagem</h3>
            <table className="detalhes-viagem">
              <tbody>
                <tr>
                  <td>
                    <strong>Data</strong>
                  </td>
                  <td>{formatarData(viagemSelecionada.data_select)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Hora</strong>
                  </td>
                  <td>{viagemSelecionada.hora_select}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Nome do Paciente</strong>
                  </td>
                  <td>{viagemSelecionada.nome_paciente}</td>
                </tr>
                <tr>
                  <td>
                    <strong>RG do Paciente</strong>
                  </td>
                  <td>{viagemSelecionada.rg_paciente}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Telefone do Paciente</strong>
                  </td>
                  <td>{viagemSelecionada.tel_paciente}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Destino</strong>
                  </td>
                  <td>{viagemSelecionada.destino}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Endereço do Destino</strong>
                  </td>
                  <td>{viagemSelecionada.end_destino}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Ponto do Paciente</strong>
                  </td>
                  <td>{viagemSelecionada.ponto_paciente}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Observações</strong>
                  </td>
                  <td>{viagemSelecionada.obs}</td>
                </tr>
              </tbody>
            </table>
            <button type="button" onClick={handleEditarViagem}>
              Editar
            </button>
            <button type="button" onClick={handleDeletarViagem}>
              Deletar
            </button>
            <button type="button" onClick={handleSalvarPDF}>
              Salvar em PDF
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export { ConsultaViagem };
