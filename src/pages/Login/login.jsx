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

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('*Por favor, insira todos os campos.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Login bem-sucedido!');
                setError('');

                navigate('/Home');
            } else {
                setError(data.error || 'Erro ao realizar login');
                setSuccess('');
            }
        } catch (err) {
            console.error('*Erro ao fazer login:', err);
            setError('*Erro ao fazer login');
            setSuccess('');
        }
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
                            type="text"
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
                        <button type="submit">Entrar</button>
                    </form>
                </div>
            </div>

            <div className="img-login">
                <img className="background-imagem" src={imagemDireita} alt="Imagem lateral" />
                <img className="logo-background" src={logoVertical} alt="Logo" />
            </div>
        </section>
    );
}
