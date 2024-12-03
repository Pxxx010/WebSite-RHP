import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const FormCadastroPaciente: React.FC = () => {
  const [name, setNome] = useState<string>('');
  const [dob, setDataNascimento] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [nomeMae, setNomeMae] = useState<string>('');
  const [endereco, setEndereco] = useState<string>('');
  const [cep, setCep] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Validação básica do CPF
  const validarCPF = (cpf: string) => /^\d{11}$/.test(cpf); // 11 dígitos numéricos

  // Validação do CEP
  const validarCEP = (cep: string) => /^\d{8}$/.test(cep); // 8 dígitos numéricos

  const handleCadastrar = async () => {
    setMensagem(null);
    setLoading(true);

    // Validação do CPF
    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido. Insira um CPF com 11 dígitos numéricos.');
      setLoading(false);
      return;
    }

    // Validação do CEP
    if (!validarCEP(cep)) {
      setMensagem('CEP inválido. Insira um CEP com 8 dígitos numéricos.');
      setLoading(false);
      return;
    }

    try {
      // Criação do objeto novoPaciente com os dados
      const novoPaciente = {
        cpf,
        nome: name,
        data_nascimento: dob,
        endereco,
        cep,
        nome_mae: nomeMae,
      };

      // Envia a requisição POST para o back-end
      const response = await axios.post('http://127.0.0.1:8000/paciente/', novoPaciente);

      // Verifica se a resposta é de sucesso
      if (response.status === 201 && response.data) {
        setMensagem('Paciente cadastrado com sucesso!');
        
        // Limpa os campos após o cadastro
        setNome('');
        setDataNascimento('');
        setCpf('');
        setNomeMae('');
        setCep('');
        setEndereco('');
      } else {
        // Caso de falha, não exibe mais a mensagem de erro
        // Deixe em branco ou log para debug
        console.log('Falha no cadastro, mas sem mensagem exibida.');
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ detail: string }>;

      // Exibe a mensagem de erro detalhada, caso haja um erro específico da API
      if (axiosError.response?.data?.detail) {
        setMensagem(axiosError.response.data.detail);
      } else {
        setMensagem('Erro ao conectar com a API. Tente novamente mais tarde.');
      }
    } finally {
      // Finaliza o processo de carregamento
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Cadastro de Paciente</h3>

        <div className="form-group">
          <label>Nome do Paciente</label>
          <input
            type="text"
            placeholder="Digite o nome do paciente"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>CPF</label>
          <input
            type="text"
            placeholder="Digite o CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))} // Apenas números
            maxLength={11}
            required
          />
        </div>

        <div className="form-group">
          <label>Nome da Mãe</label>
          <input
            type="text"
            placeholder="Digite o nome da mãe"
            value={nomeMae}
            onChange={(e) => setNomeMae(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>CEP</label>
          <input
            type="text"
            placeholder="Digite o CEP do paciente"
            value={cep}
            onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))} // Apenas números
            maxLength={8}
            required
          />
        </div>

        <div className="form-group">
          <label>Endereço</label>
          <input
            type="text"
            placeholder="Digite o endereço do paciente"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>

        {/* Exibe a mensagem de sucesso ou erro */}
        {mensagem && <p className={`mensagem ${loading ? 'loading' : ''}`}>{mensagem}</p>}

        <button onClick={handleCadastrar} disabled={loading}>
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </div>
    </div>
  );
};

export default FormCadastroPaciente;
