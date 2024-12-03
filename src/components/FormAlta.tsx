import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';

const FormAlta: React.FC = () => {
  const [cpf, setCpf] = useState<string>('');
  const [dataAlta, setDataAlta] = useState<string>('');
  const [horaAlta, setHoraAlta] = useState<string>('');
  const [motivoAlta, setMotivoAlta] = useState<string>('');
  const [motivoOutro, setMotivoOutro] = useState<string>('');
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const unirDataHora = (data: string, hora: string): string => {
    if (!data || !hora) {
      return '';
    }
    return `${data}T${hora}:00`;
  };

  useEffect(() => {
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toTimeString().split(' ')[0];

    setDataAlta(date);
    setHoraAlta(time.slice(0, 5));
  }, []);

  const validarCPF = (cpf: string): boolean => {
    return cpf.length === 11 && /^[0-9]{11}$/.test(cpf);
  };

  const handleAlta = async () => {
    setMensagem(null);

    if (!validarCPF(cpf)) {
      setMensagem('CPF inválido. Por favor, insira um CPF válido com 11 dígitos.');
      return;
    }

    if (!dataAlta || !horaAlta) {
      setMensagem('Data e hora da alta são obrigatórias.');
      return;
    }

    setLoading(true);

    const altaData = {
      cpf,
      data_hora_alta: unirDataHora(dataAlta, horaAlta),
      motivo_alta: motivoAlta === 'outros' ? motivoOutro : motivoAlta,
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/alta/', altaData);

      if (response.status === 200 || response.status === 201) {
        setMensagem('Alta cadastrada com sucesso!');
        setCpf('');
        setMotivoAlta('');
        setMotivoOutro('');
      } else {
        setMensagem('Ocorreu um erro ao cadastrar a alta.');
      }
    } catch (error) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const status = axiosError.response.status;

        if (status === 404) {
          setMensagem('Paciente não encontrado. Verifique o CPF e tente novamente.');
        } else if (status === 400) {
          setMensagem('Dados inválidos. Verifique os campos e tente novamente.');
        } else {
          setMensagem('Erro inesperado no servidor. Tente novamente mais tarde.');
        }
      } else {
        setMensagem('Erro ao conectar com a API. Verifique sua conexão.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-content">
      <div className="form-card">
        <h3>Alta Hospitalar</h3>

        <div className="form-group">
          <label>CPF do Paciente</label>
          <input
            type="text"
            placeholder="Digite o CPF do paciente (somente números)"
            value={cpf}
            onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
            maxLength={11}
            required
          />
        </div>

        <div className="form-group">
          <label>Data da Alta</label>
          <input
            type="date"
            value={dataAlta}
            onChange={(e) => setDataAlta(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Hora da Alta</label>
          <input
            type="time"
            value={horaAlta}
            onChange={(e) => setHoraAlta(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Motivo da Alta</label>
          <select
            value={motivoAlta}
            onChange={(e) => setMotivoAlta(e.target.value)}
            required
          >
            <option value="">Selecione o motivo</option>
            <option value="cura">Cura</option>
            <option value="melhora">Melhora</option>
            <option value="transferencia">Transferência</option>
            <option value="a-pedido">A pedido</option>
            <option value="obito">Óbito</option>
            <option value="tratamento-concluido">Tratamento concluído</option>
            <option value="outros">Outros</option>
          </select>
        </div>

        {motivoAlta === 'outros' && (
          <div className="form-group">
            <label>Especifique o Motivo</label>
            <input
              type="text"
              placeholder="Digite o motivo específico"
              value={motivoOutro}
              onChange={(e) => setMotivoOutro(e.target.value)}
              required
            />
          </div>
        )}

        {mensagem && <p className="mensagem">{mensagem}</p>}

        <button onClick={handleAlta} disabled={loading}>
          {loading ? 'Confirmando...' : 'Confirmar Alta'}
        </button>
      </div>
    </div>
  );
};

export default FormAlta;
