import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import { FaUser, FaLock } from "react-icons/fa";
import Image from 'next/image';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Simulação de resposta do servidor
  const fakeLogin = (username: string, password: string) => {
    return new Promise<{ token: string }>((resolve, reject) => {
      setTimeout(() => {
        if (username === "admin" && password === "1234") {
          resolve({ token: "fake-token-123" });
        } else {
          reject(new Error("Usuário ou senha inválidos."));
        }
      }, 1000); // Simula atraso do servidor
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fakeLogin(username, password);

      alert(`Login bem-sucedido! Token: ${response.token}`);
      console.log("Login bem-sucedido:", response);

      router.push('/SistemaContigencia');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro inesperado.');
      console.error("Erro no login:", err);
    }
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login-form">
        <div className="flex justify-center items-center">
          <Image
            className="Transparente_13"
            src="/Transparente_13.png"
            alt="Logo"
            width={240}
            height={240}
            priority
          />
        </div>

        <div className="input-group">
          <p>LOGIN</p>
          <div className="input-with-icon">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Digite seu login"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <p>SENHA</p>
          <div className="input-with-icon">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" />
            Lembre de mim
          </label>
          <a href="#">Esqueci a senha</a>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={!username || !password}>
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
