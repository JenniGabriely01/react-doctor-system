import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import imagemDireita from '../../assets/imagens/imagemFundoLogin.png';
import logoVertical from '../../assets/imagens/logoVertical.svg';
import logoForm from '../../assets/imagens/logoMenu.svg';
import Input from '../../components/input/inpux';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        setSuccess("");
    
        if (!email || !password) {
            setError("*Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setError(data.error || "Erro ao realizar login");
                return;
            }
    
            setSuccess("Login bem-sucedido!");
            sessionStorage.setItem("token", data.token);
    
            setTimeout(() => {
                navigate("/Dashboard");
            }, 1000);
        } catch (error) {
            console.error("Erro no login:", error);
            setError("*Erro ao fazer login. Verifique a conexão com o servidor.");
        }
    };
    const handleForgotPassword = () => {
        navigate('/Password'); 
    };

    return (
        <section className="login">
            <div className="conteiner-login">
                <div className="conetudo-login">
                    <img src={logoForm} alt="Logo" />
                    <h1>Bem-vindo de Volta!</h1>
                    <p className="p-title">Por favor, entre em sua conta.</p>
                    <form onSubmit={handleLogin}>
                        <Input
                            placeholder="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="error-message">{error}</p>}
                        {success && <p className="success-message">{success}</p>}
                        {loading ? (
                            <div className="loading-container">
                                {/* Tela de carregamento */}
                                <l-ring size="100" color="white"></l-ring>
                            </div>
                        ) : (
                            <button type="submit">Entrar</button>
                        )}
                    </form>
                    <button
                        className="forgot-password-button"
                        onClick={handleForgotPassword}
                    >
                        Esqueci minha senha
                    </button>
                </div>
            </div>

            <div className="img-login">
                <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                <img className="logo-background" src={logoVertical} alt="Logo" />
            </div>
        </section>
    );
}
