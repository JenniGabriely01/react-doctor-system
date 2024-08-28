import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import logoMain from '../../assets/imagens/logo-main.svg';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError('Por favor, insira todos os campos.');
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
            console.error('Erro ao fazer login:', err);
            setError('Erro ao fazer login');
            setSuccess('');
        }
    };

    return (
        <section className="login">
            <div className="center-login">
                <div className="conteudo-login">
                    <img src={logoMain} alt="Logo" />
                    <form onSubmit={handleLogin}>
                        <input
                            type="text"
                            placeholder="Digite seu e-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Digite sua senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button type="submit">Entrar</button>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{success}</p>}
                </div>
            </div>
        </section>
    );
}

