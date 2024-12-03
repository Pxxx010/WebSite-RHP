import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface DadosPaciente {
  cpf: string;
  nome: string;
  data_nascimento: string;
  endereco?: string;
  cep?: string;
  nome_mae?: string;
}

interface ErroResposta {
  detail: string;
}

const FormConsulta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [dadosPaciente, setDadosPaciente] = useState<DadosPaciente | null>(null);

  const formatarDataBR = (data: string) => {
    const [ano, mes, dia] = data.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const validarCPF = (cpf: string) => {
    return /^\d{11}$/.test(cpf); // CPF com exatamente 11 dígitos
  };

  const handleConsultar = async () => {
    setMensagem(null);
    setDadosPaciente(null);

    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido. Insira um CPF com 11 dígitos.');
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/paciente/${cpf}`);
      if (response.status === 200 && response.data) {
        setDadosPaciente(response.data);
        setMensagem('Consulta realizada com sucesso!');
      } else {
        setMensagem('Não foi possível realizar a consulta. Resposta inválida.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<ErroResposta>;

      if (axiosError.response?.status === 404) {
        setMensagem('Paciente não encontrado. Verifique o CPF informado.');
      } else if (axiosError.response?.data?.detail) {
        setMensagem(axiosError.response.data.detail);
      } else {
        setMensagem('Erro ao consultar o CPF. Verifique a conexão ou o CPF informado.');
      }
      console.error('Erro ao consultar CPF:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Consulta de Paciente</h3>
        
        {/* Campo de CPF */}
        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF aqui"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} // Permite apenas números
            maxLength={11}
          />
        </div>
        
        <button onClick={handleConsultar} disabled={!cpf}>Consultar</button>

        {mensagem && <p className="mensagem">{mensagem}</p>}

        {dadosPaciente && (
          <div className="dados-paciente">
            <h4>Dados do Paciente:</h4>
            <p><strong>CPF:</strong> {dadosPaciente.cpf}</p>
            <p><strong>Nome:</strong> {dadosPaciente.nome}</p>
            <p><strong>Data de Nascimento:</strong> {formatarDataBR(dadosPaciente.data_nascimento)}</p>
            {dadosPaciente.endereco && <p><strong>Endereço:</strong> {dadosPaciente.endereco}</p>}
            {dadosPaciente.cep && <p><strong>CEP:</strong> {dadosPaciente.cep}</p>}
            {dadosPaciente.nome_mae && <p><strong>Nome da Mãe:</strong> {dadosPaciente.nome_mae}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default FormConsulta;
